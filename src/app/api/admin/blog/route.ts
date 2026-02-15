import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc, like, or, count } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = (page - 1) * limit;

        let query = db.select().from(blogPosts);
        const conditions = [];

        if (search) {
            conditions.push(
                or(
                    like(blogPosts.title, `%${search}%`),
                    like(blogPosts.slug, `%${search}%`)
                )
            );
        }
        if (category) {
            conditions.push(eq(blogPosts.category, category));
        }

        const whereClause = conditions.length > 0
            ? conditions.reduce((a, b) => (a && b ? or(a, b)! : a || b!))
            : undefined;

        const posts = whereClause
            ? await query.where(whereClause).orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset)
            : await query.orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset);

        const [totalResult] = whereClause
            ? await db.select({ count: count() }).from(blogPosts).where(whereClause)
            : await db.select({ count: count() }).from(blogPosts);

        return NextResponse.json({
            posts,
            total: totalResult.count,
            page,
            totalPages: Math.ceil(totalResult.count / limit),
        });
    } catch (error) {
        console.error("Blog list error:", error);
        return NextResponse.json({ posts: [], total: 0, page: 1, totalPages: 0 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, slug, excerpt, content, category, authorName, authorRole, readingTime, published, date, relatedSlugs } = body;

        if (!title || !slug || !excerpt || !content || !category || !authorName || !authorRole || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const [newPost] = await db.insert(blogPosts).values({
            title,
            slug,
            excerpt,
            content,
            category,
            authorName,
            authorRole,
            readingTime: readingTime || "",
            published: published ?? false,
            date,
            relatedSlugs: relatedSlugs || "",
        }).returning();

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Blog create error:", error);
        return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    }
}
