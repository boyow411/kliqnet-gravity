/* ═══════════════════════════════════════════════════════════════
   Admin API: Onboarding Projects — Project + Session lifecycle
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/modules/auth/rbac";
import { createProject, listProjects } from "@/modules/projects/service";
import { createSession } from "@/modules/onboarding/service";
import { getActiveTemplate } from "@/modules/templates/service";
import { logAuditEvent } from "@/modules/audit/service";
import { eventBus } from "@/modules/automation/event-bus";
import { initializeAutomation } from "@/modules/automation";

// Register automation handlers
initializeAutomation();

export const GET = withAuth(
    async (_req, ctx) => {
        const projectList = await listProjects(ctx.organizationId!);
        return NextResponse.json(projectList);
    },
    { permissions: ["manage:projects"], orgScoped: true }
);

/**
 * Create a new project + onboarding session.
 * Flow:
 * 1. Find active template for the given service type
 * 2. Create project
 * 3. Create onboarding session with secure token
 * 4. Link session to project
 * 5. Emit SESSION_CREATED event
 */
export const POST = withAuth(
    async (req, ctx) => {
        const body = await req.json();

        if (!body.clientId || !body.name || !body.serviceType) {
            return NextResponse.json(
                { error: "clientId, name, and serviceType are required" },
                { status: 400 }
            );
        }

        // 1. Find active template
        const template = await getActiveTemplate(ctx.organizationId!, body.serviceType);
        if (!template) {
            return NextResponse.json(
                { error: `No active template found for service type: ${body.serviceType}` },
                { status: 400 }
            );
        }

        // 2. Create project
        const project = await createProject({
            organizationId: ctx.organizationId!,
            clientId: body.clientId,
            name: body.name,
            serviceType: body.serviceType,
            status: "ONBOARDING",
        });

        // 3. Create onboarding session
        const session = await createSession({
            organizationId: ctx.organizationId!,
            templateId: template.id,
            clientId: body.clientId,
            projectId: project.id,
        });

        // 4. Link session to project (circular reference — update project)
        const { updateProject } = await import("@/modules/projects/service");
        await updateProject(project.id, ctx.organizationId!, {
            onboardingSessionId: session.id,
        });

        // 5. Emit event
        await eventBus.emit("SESSION_CREATED", {
            sessionId: session.id,
            organizationId: ctx.organizationId!,
            projectId: project.id,
        });

        // Audit
        await logAuditEvent({
            organizationId: ctx.organizationId,
            userId: Number(ctx.userId),
            action: "project:created_with_onboarding",
            entity: "project",
            entityId: String(project.id),
            details: `Project '${project.name}' created with onboarding session (token: ${session.token})`,
        });

        return NextResponse.json(
            {
                project,
                session,
                onboardingUrl: `/onboarding/${session.token}`,
            },
            { status: 201 }
        );
    },
    { permissions: ["manage:projects"], orgScoped: true }
);
