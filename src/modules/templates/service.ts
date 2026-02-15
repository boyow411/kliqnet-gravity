/* ═══════════════════════════════════════════════════════════════
   Template Service — Onboarding template management
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { onboardingTemplates } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import type { TemplateSteps } from "@/modules/onboarding/types";

export async function createTemplate(data: {
    organizationId: number;
    name: string;
    serviceType: string;
    steps: TemplateSteps;
    isActive?: boolean;
}) {
    const [template] = await db
        .insert(onboardingTemplates)
        .values({ ...data, version: 1 })
        .returning();
    return template;
}

export async function getTemplateById(id: number, organizationId: number) {
    const [template] = await db
        .select()
        .from(onboardingTemplates)
        .where(and(eq(onboardingTemplates.id, id), eq(onboardingTemplates.organizationId, organizationId)));
    return template || null;
}

export async function listTemplates(organizationId: number) {
    return db
        .select()
        .from(onboardingTemplates)
        .where(eq(onboardingTemplates.organizationId, organizationId))
        .orderBy(desc(onboardingTemplates.updatedAt));
}

/**
 * Get the active template for a service type.
 * Used when creating a new onboarding session.
 */
export async function getActiveTemplate(organizationId: number, serviceType: string) {
    const [template] = await db
        .select()
        .from(onboardingTemplates)
        .where(
            and(
                eq(onboardingTemplates.organizationId, organizationId),
                eq(onboardingTemplates.serviceType, serviceType),
                eq(onboardingTemplates.isActive, true)
            )
        )
        .orderBy(desc(onboardingTemplates.version))
        .limit(1);
    return template || null;
}

export async function updateTemplate(
    id: number,
    organizationId: number,
    data: Partial<{ name: string; serviceType: string; steps: TemplateSteps; isActive: boolean }>
) {
    const [template] = await db
        .update(onboardingTemplates)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(onboardingTemplates.id, id), eq(onboardingTemplates.organizationId, organizationId)))
        .returning();
    return template;
}

/**
 * Create a new version of a template.
 * Deactivates the old version and creates a new active one.
 */
export async function versionTemplate(id: number, organizationId: number) {
    const existing = await getTemplateById(id, organizationId);
    if (!existing) return null;

    // Deactivate current version
    await db
        .update(onboardingTemplates)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(onboardingTemplates.id, id));

    // Create new version
    const steps = existing.steps as TemplateSteps;
    const [newVersion] = await db
        .insert(onboardingTemplates)
        .values({
            organizationId,
            name: existing.name,
            serviceType: existing.serviceType,
            steps,
            version: existing.version + 1,
            isActive: true,
        })
        .returning();

    return newVersion;
}

export async function deleteTemplate(id: number, organizationId: number) {
    const [template] = await db
        .delete(onboardingTemplates)
        .where(and(eq(onboardingTemplates.id, id), eq(onboardingTemplates.organizationId, organizationId)))
        .returning();
    return template;
}
