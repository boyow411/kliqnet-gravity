/* ═══════════════════════════════════════════════════════════════
   Admin API: Template by ID — Read / Update / Delete
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/modules/auth/rbac";
import { getTemplateById, updateTemplate, deleteTemplate, versionTemplate } from "@/modules/templates/service";
import { logAuditEvent } from "@/modules/audit/service";

export const GET = withAuth(
    async (_req, ctx, params) => {
        const id = Number(params?.id);
        const template = await getTemplateById(id, ctx.organizationId!);

        if (!template) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        return NextResponse.json(template);
    },
    { permissions: ["manage:templates"], orgScoped: true }
);

export const PUT = withAuth(
    async (req, ctx, params) => {
        const id = Number(params?.id);
        const body = await req.json();

        // If versioning is requested
        if (body.createVersion) {
            const newVersion = await versionTemplate(id, ctx.organizationId!);
            if (!newVersion) {
                return NextResponse.json({ error: "Template not found" }, { status: 404 });
            }

            await logAuditEvent({
                organizationId: ctx.organizationId,
                userId: Number(ctx.userId),
                action: "template:versioned",
                entity: "template",
                entityId: String(newVersion.id),
                details: `New version ${newVersion.version} created from template ${id}`,
            });

            return NextResponse.json(newVersion);
        }

        const template = await updateTemplate(id, ctx.organizationId!, {
            name: body.name,
            serviceType: body.serviceType,
            steps: body.steps,
            isActive: body.isActive,
        });

        if (!template) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        await logAuditEvent({
            organizationId: ctx.organizationId,
            userId: Number(ctx.userId),
            action: "template:updated",
            entity: "template",
            entityId: String(template.id),
        });

        return NextResponse.json(template);
    },
    { permissions: ["manage:templates"], orgScoped: true }
);

export const DELETE = withAuth(
    async (_req, ctx, params) => {
        const id = Number(params?.id);
        const template = await deleteTemplate(id, ctx.organizationId!);

        if (!template) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        await logAuditEvent({
            organizationId: ctx.organizationId,
            userId: Number(ctx.userId),
            action: "template:deleted",
            entity: "template",
            entityId: String(template.id),
        });

        return NextResponse.json({ success: true });
    },
    { permissions: ["manage:templates"], orgScoped: true }
);
