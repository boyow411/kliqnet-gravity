/* ═══════════════════════════════════════════════════════════════
   Client Service — Org-scoped client management
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, and, ilike, desc } from "drizzle-orm";

export async function createClient(data: {
    organizationId: number;
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    notes?: string;
}) {
    const [client] = await db.insert(clients).values(data).returning();
    return client;
}

export async function getClientById(id: number, organizationId: number) {
    const [client] = await db
        .select()
        .from(clients)
        .where(and(eq(clients.id, id), eq(clients.organizationId, organizationId)));
    return client || null;
}

export async function listClients(organizationId: number, search?: string) {
    let query = db
        .select()
        .from(clients)
        .where(eq(clients.organizationId, organizationId))
        .orderBy(desc(clients.createdAt));

    if (search) {
        query = db
            .select()
            .from(clients)
            .where(
                and(
                    eq(clients.organizationId, organizationId),
                    ilike(clients.companyName, `%${search}%`)
                )
            )
            .orderBy(desc(clients.createdAt));
    }

    return query;
}

export async function updateClient(
    id: number,
    organizationId: number,
    data: Partial<{ companyName: string; contactName: string; email: string; phone: string; notes: string }>
) {
    const [client] = await db
        .update(clients)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(clients.id, id), eq(clients.organizationId, organizationId)))
        .returning();
    return client;
}

export async function deleteClient(id: number, organizationId: number) {
    const [client] = await db
        .delete(clients)
        .where(and(eq(clients.id, id), eq(clients.organizationId, organizationId)))
        .returning();
    return client;
}
