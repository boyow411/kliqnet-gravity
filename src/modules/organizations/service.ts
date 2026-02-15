/* ═══════════════════════════════════════════════════════════════
   Organization Service — Multi-tenant org management
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createOrganization(data: {
    name: string;
    slug: string;
    logoUrl?: string;
}) {
    const [org] = await db.insert(organizations).values(data).returning();
    return org;
}

export async function getOrganizationById(id: number) {
    const [org] = await db.select().from(organizations).where(eq(organizations.id, id));
    return org || null;
}

export async function getOrganizationBySlug(slug: string) {
    const [org] = await db.select().from(organizations).where(eq(organizations.slug, slug));
    return org || null;
}

export async function listOrganizations() {
    return db.select().from(organizations).orderBy(organizations.createdAt);
}

export async function updateOrganization(id: number, data: Partial<{ name: string; slug: string; logoUrl: string }>) {
    const [org] = await db
        .update(organizations)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(organizations.id, id))
        .returning();
    return org;
}
