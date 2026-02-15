import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id)));
        if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(post);
    } catch (error) {
        console.error("Blog get error:", error);
        return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, slug, excerpt, content, category, authorName, authorRole, readingTime, published, date, relatedSlugs } = body;

        const [updated] = await db
            .update(blogPosts)
            .set({
                title,
                slug,
                excerpt,
                content,
                category,
                authorName,
                authorRole,
                readingTime,
                published,
                date,
                relatedSlugs,
                updatedAt: new Date(),
            })
            .where(eq(blogPosts.id, parseInt(id)))
            .returning();

        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Blog update error:", error);
        return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Blog delete error:", error);
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}
