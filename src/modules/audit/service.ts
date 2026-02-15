/* ═══════════════════════════════════════════════════════════════
   Audit Service — Org-scoped audit logging
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export interface AuditEvent {
    organizationId?: number | null;
    userId?: number | null;
    action: string;
    entity: string;
    entityId?: string;
    details?: string;
}

/**
 * Log an audit event.
 */
export async function logAuditEvent(event: AuditEvent) {
    const [record] = await db
        .insert(auditLog)
        .values({
            organizationId: event.organizationId ?? null,
            userId: event.userId ?? null,
            action: event.action,
            entity: event.entity,
            entityId: event.entityId,
            details: event.details,
        })
        .returning();
    return record;
}

/**
 * Retrieve audit logs for an organization.
 */
export async function getAuditLogs(organizationId: number, limit = 50) {
    return db
        .select()
        .from(auditLog)
        .where(eq(auditLog.organizationId, organizationId))
        .orderBy(desc(auditLog.createdAt))
        .limit(limit);
}

/**
 * Retrieve audit logs for a specific entity.
 */
export async function getEntityAuditLogs(entity: string, entityId: string) {
    return db
        .select()
        .from(auditLog)
        .where(and(eq(auditLog.entity, entity), eq(auditLog.entityId, entityId)))
        .orderBy(desc(auditLog.createdAt));
}
