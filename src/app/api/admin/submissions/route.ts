import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { eq, desc, like, or, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = (page - 1) * limit;

        const conditions = [];
        if (search) {
            conditions.push(
                or(
                    like(contactSubmissions.name, `%${search}%`),
                    like(contactSubmissions.email, `%${search}%`),
                    like(contactSubmissions.company, `%${search}%`)
                )
            );
        }
        if (status) {
            conditions.push(eq(contactSubmissions.status, status));
        }

        const whereClause = conditions.length > 0
            ? conditions.reduce((a, b) => (a && b ? or(a, b)! : a || b!))
            : undefined;

        const submissions = whereClause
            ? await db.select().from(contactSubmissions).where(whereClause).orderBy(desc(contactSubmissions.createdAt)).limit(limit).offset(offset)
            : await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(limit).offset(offset);

        const [totalResult] = whereClause
            ? await db.select({ count: count() }).from(contactSubmissions).where(whereClause)
            : await db.select({ count: count() }).from(contactSubmissions);

        return NextResponse.json({
            submissions,
            total: totalResult.count,
            page,
            totalPages: Math.ceil(totalResult.count / limit),
        });
    } catch (error) {
        console.error("Submissions list error:", error);
        return NextResponse.json({ submissions: [], total: 0, page: 1, totalPages: 0 });
    }
}
