/* ═══════════════════════════════════════════════════════════════
   Admin API: Project Detail — Read project with full context
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/modules/auth/rbac";
import { getProjectById } from "@/modules/projects/service";
import { getSessionById } from "@/modules/onboarding/service";
import { getResponsesGroupedByStep } from "@/modules/onboarding/response-service";
import { getSessionFiles } from "@/modules/files/service";
import { calculateRiskScore } from "@/modules/risk/scoring";
import { db } from "@/db";
import { milestones, tasks, clients, onboardingTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { TemplateSteps } from "@/modules/onboarding/types";

export const GET = withAuth(
    async (_req, ctx, params) => {
        const id = Number(params?.id);
        const project = await getProjectById(id, ctx.organizationId!);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Get client
        const [client] = await db
            .select()
            .from(clients)
            .where(eq(clients.id, project.clientId));

        // Get session + responses + files
        let session = null;
        let responses = null;
        let files = null;
        let riskScore = null;
        let templateSteps = null;

        if (project.onboardingSessionId) {
            session = await getSessionById(project.onboardingSessionId, ctx.organizationId!);
            responses = await getResponsesGroupedByStep(project.onboardingSessionId);
            files = await getSessionFiles(project.onboardingSessionId, ctx.organizationId!);

            // Get template steps for labelling
            if (session) {
                const [template] = await db
                    .select()
                    .from(onboardingTemplates)
                    .where(eq(onboardingTemplates.id, session.templateId));
                if (template) {
                    templateSteps = template.steps as TemplateSteps;
                }
            }

            // Calculate risk
            riskScore = await calculateRiskScore({
                sessionId: project.onboardingSessionId,
                serviceType: project.serviceType,
                createdAt: project.createdAt,
            });
        }

        // Get milestones + tasks
        const projectMilestones = await db
            .select()
            .from(milestones)
            .where(eq(milestones.projectId, id));

        const projectTasks = await db
            .select()
            .from(tasks)
            .where(eq(tasks.projectId, id));

        return NextResponse.json({
            project,
            client,
            session,
            templateSteps,
            responses,
            files,
            riskScore,
            milestones: projectMilestones,
            tasks: projectTasks,
        });
    },
    { permissions: ["manage:projects"], orgScoped: true }
);
