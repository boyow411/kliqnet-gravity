/* ═══════════════════════════════════════════════════════════════
   Admin API: Clients — CRUD for client management
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/modules/auth/rbac";
import { createClient, listClients } from "@/modules/clients/service";
import { logAuditEvent } from "@/modules/audit/service";

export const GET = withAuth(
    async (req, ctx) => {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || undefined;
        const clientList = await listClients(ctx.organizationId!, search);
        return NextResponse.json(clientList);
    },
    { permissions: ["manage:clients"], orgScoped: true }
);

export const POST = withAuth(
    async (req, ctx) => {
        const body = await req.json();

        if (!body.companyName || !body.contactName || !body.email) {
            return NextResponse.json(
                { error: "companyName, contactName, and email are required" },
                { status: 400 }
            );
        }

        const client = await createClient({
            organizationId: ctx.organizationId!,
            companyName: body.companyName,
            contactName: body.contactName,
            email: body.email,
            phone: body.phone,
            notes: body.notes,
        });

        await logAuditEvent({
            organizationId: ctx.organizationId,
            userId: Number(ctx.userId),
            action: "client:created",
            entity: "client",
            entityId: String(client.id),
            details: `Created client: ${client.companyName}`,
        });

        return NextResponse.json(client, { status: 201 });
    },
    { permissions: ["manage:clients"], orgScoped: true }
);
