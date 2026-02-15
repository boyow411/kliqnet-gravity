import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projectCaseStudies } from "@/db/schema";
import { eq, desc, like, or, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = (page - 1) * limit;

        const conditions = [];
        if (search) {
            conditions.push(
                or(
                    like(projectCaseStudies.name, `%${search}%`),
                    like(projectCaseStudies.slug, `%${search}%`)
                )
            );
        }
        if (category) {
            conditions.push(eq(projectCaseStudies.category, category));
        }

        const whereClause = conditions.length > 0
            ? conditions.reduce((a, b) => (a && b ? or(a, b)! : a || b!))
            : undefined;

        const projects = whereClause
            ? await db.select().from(projectCaseStudies).where(whereClause).orderBy(desc(projectCaseStudies.createdAt)).limit(limit).offset(offset)
            : await db.select().from(projectCaseStudies).orderBy(desc(projectCaseStudies.createdAt)).limit(limit).offset(offset);

        const [totalResult] = whereClause
            ? await db.select({ count: count() }).from(projectCaseStudies).where(whereClause)
            : await db.select({ count: count() }).from(projectCaseStudies);

        return NextResponse.json({
            projects,
            total: totalResult.count,
            page,
            totalPages: Math.ceil(totalResult.count / limit),
        });
    } catch (error) {
        console.error("Projects list error:", error);
        return NextResponse.json({ projects: [], total: 0, page: 1, totalPages: 0 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            slug, name, category, industryTags, status, tagline,
            shortDescription, primaryUrl, data, featured, published,
        } = body;

        if (!slug || !name || !category || !status || !tagline || !shortDescription) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const [newProject] = await db.insert(projectCaseStudies).values({
            slug,
            name,
            category,
            industryTags: industryTags || "",
            status,
            tagline,
            shortDescription,
            primaryUrl: primaryUrl || "",
            data: data || {},
            featured: featured ?? false,
            published: published ?? true,
        }).returning();

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("Project create error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
