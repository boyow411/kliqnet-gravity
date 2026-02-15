import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projectCaseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [project] = await db.select().from(projectCaseStudies).where(eq(projectCaseStudies.id, parseInt(id)));
        if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(project);
    } catch (error) {
        console.error("Project get error:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const {
            slug, name, category, industryTags, status, tagline,
            shortDescription, primaryUrl, data, featured, published,
        } = body;

        const [updated] = await db
            .update(projectCaseStudies)
            .set({
                slug,
                name,
                category,
                industryTags,
                status,
                tagline,
                shortDescription,
                primaryUrl,
                data,
                featured,
                published,
                updatedAt: new Date(),
            })
            .where(eq(projectCaseStudies.id, parseInt(id)))
            .returning();

        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Project update error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(projectCaseStudies).where(eq(projectCaseStudies.id, parseInt(id)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Project delete error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
