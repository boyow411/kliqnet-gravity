import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc, like, or, and, count } from "drizzle-orm";
import { insightSchema } from "@/lib/insight-schema";
import { withAuth } from "@/modules/auth/rbac";

export const GET = withAuth(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const search = searchParams.get("search") || "";
      const category = searchParams.get("category") || "";
      const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
      const limit = Math.min(
        100,
        Math.max(1, parseInt(searchParams.get("limit") || "20") || 20),
      );
      const offset = (page - 1) * limit;

      const query = db.select().from(blogPosts);
      const conditions = [];

      if (search) {
        conditions.push(
          or(
            like(blogPosts.title, `%${search}%`),
            like(blogPosts.slug, `%${search}%`),
          ),
        );
      }
      if (category) {
        conditions.push(eq(blogPosts.category, category));
      }

      const whereClause =
        conditions.length > 0 ? and(...conditions) : undefined;

      const posts = whereClause
        ? await query
            .where(whereClause)
            .orderBy(desc(blogPosts.createdAt))
            .limit(limit)
            .offset(offset)
        : await query
            .orderBy(desc(blogPosts.createdAt))
            .limit(limit)
            .offset(offset);

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
      return NextResponse.json(
        { error: "Could not load articles." },
        { status: 503 },
      );
    }
  },
  { permissions: ["manage:blog"] },
);

export const POST = withAuth(
  async (request: NextRequest) => {
    try {
      const result = insightSchema.safeParse(await request.json());
      if (!result.success)
        return NextResponse.json(
          {
            error: result.error.issues
              .map((i) => i.path.join(".") + ": " + i.message)
              .join("; "),
          },
          { status: 400 },
        );
      const body = result.data;
      const {
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
        coverImage,
      } = body;

      if (
        !title ||
        !slug ||
        !excerpt ||
        !content ||
        !category ||
        !authorName ||
        !authorRole ||
        !date
      ) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      const [newPost] = await db
        .insert(blogPosts)
        .values({
          coverImage,
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
        })
        .returning();

      return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
      console.error("Blog create error:", error);
      return NextResponse.json(
        { error: "Failed to create blog post" },
        { status: 500 },
      );
    }
  },
  { permissions: ["manage:blog"] },
);
