/* ═══════════════════════════════════════════════════════════════
   Admin API: Templates — CRUD for onboarding templates
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/modules/auth/rbac";
import { createTemplate, listTemplates } from "@/modules/templates/service";
import { logAuditEvent } from "@/modules/audit/service";

export const GET = withAuth(
    async (_req, ctx) => {
        const templates = await listTemplates(ctx.organizationId!);
        return NextResponse.json(templates);
    },
    { permissions: ["manage:templates"], orgScoped: true }
);

export const POST = withAuth(
    async (req, ctx) => {
        const body = await req.json();

        if (!body.name || !body.serviceType || !body.steps) {
            return NextResponse.json(
                { error: "name, serviceType, and steps are required" },
                { status: 400 }
            );
        }

        const template = await createTemplate({
            organizationId: ctx.organizationId!,
            name: body.name,
            serviceType: body.serviceType,
            steps: body.steps,
            isActive: body.isActive ?? true,
        });

        await logAuditEvent({
            organizationId: ctx.organizationId,
            userId: Number(ctx.userId),
            action: "template:created",
            entity: "template",
            entityId: String(template.id),
            details: `Created template: ${template.name}`,
        });

        return NextResponse.json(template, { status: 201 });
    },
    { permissions: ["manage:templates"], orgScoped: true }
);
