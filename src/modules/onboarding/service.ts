/* ═══════════════════════════════════════════════════════════════
   Onboarding Session Service — Session lifecycle management
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { onboardingSessions, onboardingResponses, onboardingTemplates } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import type { TemplateSteps, TemplateField } from "./types";

const SESSION_TTL_DAYS = 14; // token expires after 14 days

export async function createSession(data: {
    organizationId: number;
    templateId: number;
    clientId: number;
    projectId?: number;
}) {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

    const [session] = await db
        .insert(onboardingSessions)
        .values({
            ...data,
            token,
            expiresAt,
            status: "DRAFT",
            completionPercentage: 0,
        })
        .returning();
    return session;
}

export async function getSessionById(id: number, organizationId: number) {
    const [session] = await db
        .select()
        .from(onboardingSessions)
        .where(and(eq(onboardingSessions.id, id), eq(onboardingSessions.organizationId, organizationId)));
    return session || null;
}

/**
 * Get a session by its public token — used by the client-facing wizard.
 * Also validates that the token has not expired.
 */
export async function getSessionByToken(token: string) {
    const [session] = await db
        .select({
            id: onboardingSessions.id,
            organizationId: onboardingSessions.organizationId,
            templateId: onboardingSessions.templateId,
            clientId: onboardingSessions.clientId,
            projectId: onboardingSessions.projectId,
            status: onboardingSessions.status,
            completionPercentage: onboardingSessions.completionPercentage,
            token: onboardingSessions.token,
            expiresAt: onboardingSessions.expiresAt,
            createdAt: onboardingSessions.createdAt,
            templateSteps: onboardingTemplates.steps,
            templateName: onboardingTemplates.name,
        })
        .from(onboardingSessions)
        .leftJoin(onboardingTemplates, eq(onboardingSessions.templateId, onboardingTemplates.id))
        .where(eq(onboardingSessions.token, token));

    if (!session) return null;

    // Check expiry
    if (session.expiresAt && new Date() > new Date(session.expiresAt)) {
        return { ...session, expired: true as const };
    }

    return { ...session, expired: false as const };
}

/**
 * Calculate and update completion percentage based on responses vs required fields.
 */
export async function recalculateCompletion(sessionId: number) {
    // Get the session + template steps
    const [session] = await db
        .select({
            id: onboardingSessions.id,
            templateId: onboardingSessions.templateId,
            steps: onboardingTemplates.steps,
        })
        .from(onboardingSessions)
        .leftJoin(onboardingTemplates, eq(onboardingSessions.templateId, onboardingTemplates.id))
        .where(eq(onboardingSessions.id, sessionId));

    if (!session || !session.steps) return 0;

    const steps = session.steps as TemplateSteps;

    // Count required fields
    const requiredFields: { stepId: string; fieldId: string }[] = [];
    for (const step of steps) {
        for (const field of step.fields) {
            if (field.required) {
                requiredFields.push({ stepId: step.id, fieldId: field.id });
            }
        }
    }

    if (requiredFields.length === 0) return 100;

    // Get all responses for this session
    const responses = await db
        .select()
        .from(onboardingResponses)
        .where(eq(onboardingResponses.sessionId, sessionId));

    // Count filled required fields
    let filled = 0;
    for (const rf of requiredFields) {
        const resp = responses.find((r) => r.stepId === rf.stepId && r.fieldId === rf.fieldId);
        if (resp && resp.value !== null && resp.value !== "") {
            filled++;
        }
    }

    const percentage = Math.round((filled / requiredFields.length) * 100);

    // Update session
    await db
        .update(onboardingSessions)
        .set({ completionPercentage: percentage, updatedAt: new Date() })
        .where(eq(onboardingSessions.id, sessionId));

    return percentage;
}

export async function updateSessionStatus(
    sessionId: number,
    status: "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "APPROVED"
) {
    const [session] = await db
        .update(onboardingSessions)
        .set({ status, updatedAt: new Date() })
        .where(eq(onboardingSessions.id, sessionId))
        .returning();
    return session;
}

/**
 * Get all required fields that are missing responses.
 * Used by the risk scoring engine.
 */
export async function getMissingRequiredFields(sessionId: number): Promise<TemplateField[]> {
    const [session] = await db
        .select({
            steps: onboardingTemplates.steps,
        })
        .from(onboardingSessions)
        .leftJoin(onboardingTemplates, eq(onboardingSessions.templateId, onboardingTemplates.id))
        .where(eq(onboardingSessions.id, sessionId));

    if (!session?.steps) return [];

    const steps = session.steps as TemplateSteps;
    const responses = await db
        .select()
        .from(onboardingResponses)
        .where(eq(onboardingResponses.sessionId, sessionId));

    const missing: TemplateField[] = [];
    for (const step of steps) {
        for (const field of step.fields) {
            if (field.required) {
                const resp = responses.find((r) => r.stepId === step.id && r.fieldId === field.id);
                if (!resp || resp.value === null || resp.value === "") {
                    missing.push(field);
                }
            }
        }
    }

    return missing;
}
