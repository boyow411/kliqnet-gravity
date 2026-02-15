/* ═══════════════════════════════════════════════════════════════
   Handler: Onboarding Completed
   Creates default milestones and tasks when a session completes.
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { milestones, tasks, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logAuditEvent } from "@/modules/audit/service";

/**
 * Default milestones created when onboarding is completed.
 * These can be customized per service type in the future.
 */
const DEFAULT_MILESTONES = [
    {
        title: "Discovery & Analysis",
        description: "Review onboarding data and conduct deep-dive analysis",
        sortOrder: 1,
        tasks: [
            "Review onboarding responses",
            "Identify key requirements",
            "Create project brief",
        ],
    },
    {
        title: "Design & Architecture",
        description: "Create wireframes, prototypes, and technical architecture",
        sortOrder: 2,
        tasks: [
            "Create wireframes",
            "Design system setup",
            "Technical architecture document",
        ],
    },
    {
        title: "Development Sprint 1",
        description: "Core feature implementation",
        sortOrder: 3,
        tasks: [
            "Set up project repository",
            "Implement core features",
            "Internal QA review",
        ],
    },
    {
        title: "Client Review & Launch",
        description: "Client UAT, final revisions, and deployment",
        sortOrder: 4,
        tasks: [
            "Deploy to staging",
            "Client review session",
            "Final revisions",
            "Production deployment",
        ],
    },
];

export async function handleOnboardingCompleted(payload: {
    sessionId: number;
    organizationId: number;
    projectId: number | null;
}) {
    if (!payload.projectId) {
        console.warn("[Automation] SESSION_COMPLETED but no projectId — skipping milestone creation");
        return;
    }

    // Update project status
    await db
        .update(projects)
        .set({ status: "IN_PROGRESS", updatedAt: new Date() })
        .where(eq(projects.id, payload.projectId));

    // Create milestones + tasks
    for (const ms of DEFAULT_MILESTONES) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + ms.sortOrder * 14); // 2-week sprints

        const [milestone] = await db
            .insert(milestones)
            .values({
                projectId: payload.projectId,
                title: ms.title,
                description: ms.description,
                dueDate,
                sortOrder: ms.sortOrder,
            })
            .returning();

        for (let i = 0; i < ms.tasks.length; i++) {
            await db.insert(tasks).values({
                projectId: payload.projectId,
                milestoneId: milestone.id,
                title: ms.tasks[i],
                sortOrder: i + 1,
            });
        }
    }

    // Audit log
    await logAuditEvent({
        organizationId: payload.organizationId,
        action: "automation:milestones_created",
        entity: "project",
        entityId: String(payload.projectId),
        details: `Auto-created ${DEFAULT_MILESTONES.length} milestones and ${DEFAULT_MILESTONES.reduce((sum, ms) => sum + ms.tasks.length, 0)} tasks`,
    });
}
