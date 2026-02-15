/* ═══════════════════════════════════════════════════════════════
   Onboarding Response Service — Save/load client responses
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { onboardingResponses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Upsert a single response — creates or updates based on session+step+field.
 * Used for autosave on field blur.
 */
export async function saveResponse(data: {
    sessionId: number;
    stepId: string;
    fieldId: string;
    value: unknown;
}) {
    // Check if response already exists
    const [existing] = await db
        .select()
        .from(onboardingResponses)
        .where(
            and(
                eq(onboardingResponses.sessionId, data.sessionId),
                eq(onboardingResponses.stepId, data.stepId),
                eq(onboardingResponses.fieldId, data.fieldId)
            )
        );

    if (existing) {
        const [updated] = await db
            .update(onboardingResponses)
            .set({ value: data.value, updatedAt: new Date() })
            .where(eq(onboardingResponses.id, existing.id))
            .returning();
        return updated;
    }

    const [created] = await db
        .insert(onboardingResponses)
        .values(data)
        .returning();
    return created;
}

/**
 * Bulk save responses — used when submitting a full step.
 */
export async function saveStepResponses(
    sessionId: number,
    stepId: string,
    responses: { fieldId: string; value: unknown }[]
) {
    const results = [];
    for (const resp of responses) {
        const result = await saveResponse({
            sessionId,
            stepId,
            fieldId: resp.fieldId,
            value: resp.value,
        });
        results.push(result);
    }
    return results;
}

/**
 * Load all responses for a session — used to pre-fill the wizard.
 */
export async function getSessionResponses(sessionId: number) {
    return db
        .select()
        .from(onboardingResponses)
        .where(eq(onboardingResponses.sessionId, sessionId));
}

/**
 * Load responses grouped by step — for the admin detail view.
 */
export async function getResponsesGroupedByStep(sessionId: number) {
    const responses = await getSessionResponses(sessionId);

    const grouped: Record<string, { fieldId: string; value: unknown }[]> = {};
    for (const r of responses) {
        if (!grouped[r.stepId]) grouped[r.stepId] = [];
        grouped[r.stepId].push({ fieldId: r.fieldId, value: r.value });
    }

    return grouped;
}
