/* ═══════════════════════════════════════════════════════════════
   Project Service — Org-scoped project management
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { projects, clients, onboardingSessions } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function createProject(data: {
    organizationId: number;
    clientId: number;
    name: string;
    serviceType: string;
    status?: "DRAFT" | "ONBOARDING" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
    onboardingSessionId?: number;
}) {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
}

export async function getProjectById(id: number, organizationId: number) {
    const [project] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.organizationId, organizationId)));
    return project || null;
}

export async function listProjects(organizationId: number) {
    return db
        .select({
            id: projects.id,
            name: projects.name,
            serviceType: projects.serviceType,
            status: projects.status,
            onboardingSessionId: projects.onboardingSessionId,
            clientId: projects.clientId,
            clientCompany: clients.companyName,
            clientContact: clients.contactName,
            completionPercentage: onboardingSessions.completionPercentage,
            sessionStatus: onboardingSessions.status,
            createdAt: projects.createdAt,
        })
        .from(projects)
        .leftJoin(clients, eq(projects.clientId, clients.id))
        .leftJoin(onboardingSessions, eq(projects.onboardingSessionId, onboardingSessions.id))
        .where(eq(projects.organizationId, organizationId))
        .orderBy(desc(projects.createdAt));
}

export async function updateProject(
    id: number,
    organizationId: number,
    data: Partial<{
        name: string;
        serviceType: string;
        status: "DRAFT" | "ONBOARDING" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
        onboardingSessionId: number;
    }>
) {
    const [project] = await db
        .update(projects)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.organizationId, organizationId)))
        .returning();
    return project;
}

export async function deleteProject(id: number, organizationId: number) {
    const [project] = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.organizationId, organizationId)))
        .returning();
    return project;
}
