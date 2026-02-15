/* ═══════════════════════════════════════════════════════════════
   Risk Scoring Engine (v1)
   Calculates project risk based on onboarding completeness.
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { onboardingSessions, onboardingResponses, fileUploads, onboardingTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { RiskScore, TemplateSteps } from "@/modules/onboarding/types";

const HIGH_COMPLEXITY_SERVICES = ["ecommerce", "saas", "enterprise", "ai-ml"];

interface RiskInput {
    sessionId: number;
    serviceType: string;
    createdAt: Date;
}

/**
 * Calculate risk score for a project based on:
 * 1. Missing required fields (weight: 40%)
 * 2. Missing file uploads (weight: 20%)
 * 3. Delayed completion (weight: 20%)
 * 4. Service complexity (weight: 20%)
 */
export async function calculateRiskScore(input: RiskInput): Promise<RiskScore> {
    const factors: string[] = [];
    let score = 0;

    // 1. Missing required fields
    const [session] = await db
        .select({
            steps: onboardingTemplates.steps,
            completionPercentage: onboardingSessions.completionPercentage,
        })
        .from(onboardingSessions)
        .leftJoin(onboardingTemplates, eq(onboardingSessions.templateId, onboardingTemplates.id))
        .where(eq(onboardingSessions.id, input.sessionId));

    if (session?.steps) {
        const steps = session.steps as TemplateSteps;
        const totalRequired = steps.reduce(
            (count, step) => count + step.fields.filter((f) => f.required).length,
            0
        );

        const responses = await db
            .select()
            .from(onboardingResponses)
            .where(eq(onboardingResponses.sessionId, input.sessionId));

        const filledRequired = responses.filter((r) => {
            const step = steps.find((s) => s.id === r.stepId);
            const field = step?.fields.find((f) => f.id === r.fieldId);
            return field?.required && r.value !== null && r.value !== "";
        }).length;

        const missingCount = totalRequired - filledRequired;

        if (missingCount > 0) {
            const fieldScore = Math.min(40, (missingCount / Math.max(totalRequired, 1)) * 40);
            score += fieldScore;
            factors.push(`${missingCount} required field(s) missing`);
        }
    }

    // 2. Missing file uploads
    const fileFields = session?.steps
        ? (session.steps as TemplateSteps).flatMap((s) =>
            s.fields.filter((f) => f.type === "file" && f.required)
        )
        : [];

    if (fileFields.length > 0) {
        const uploadedFiles = await db
            .select()
            .from(fileUploads)
            .where(eq(fileUploads.sessionId, input.sessionId));

        const missingFiles = fileFields.length - uploadedFiles.length;
        if (missingFiles > 0) {
            score += Math.min(20, (missingFiles / fileFields.length) * 20);
            factors.push(`${missingFiles} required file(s) not uploaded`);
        }
    }

    // 3. Delayed completion
    const daysSinceCreation = Math.floor(
        (Date.now() - new Date(input.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceCreation > 7 && (session?.completionPercentage ?? 0) < 100) {
        const delayScore = Math.min(20, ((daysSinceCreation - 7) / 14) * 20);
        score += delayScore;
        factors.push(`${daysSinceCreation} days since creation, still incomplete`);
    }

    // 4. High complexity service type
    if (HIGH_COMPLEXITY_SERVICES.includes(input.serviceType.toLowerCase())) {
        score += 10;
        factors.push(`High-complexity service type: ${input.serviceType}`);
    }

    // Determine level
    const level = score >= 60 ? "HIGH" : score >= 30 ? "MEDIUM" : "LOW";

    return {
        score: Math.round(score),
        level,
        factors,
    };
}

/**
 * Get CSS class for risk badge display.
 */
export function getRiskBadgeClass(level: "LOW" | "MEDIUM" | "HIGH"): string {
    switch (level) {
        case "LOW":
            return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
        case "MEDIUM":
            return "bg-amber-500/15 text-amber-400 border-amber-500/20";
        case "HIGH":
            return "bg-red-500/15 text-red-400 border-red-500/20";
    }
}
