import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { insightSchema } from "@/lib/insight-schema";
import { withAuth } from "@/modules/auth/rbac";

export const GET = withAuth(
  async (_request: NextRequest, _ctx, params) => {
    try {
      const id = params?.id;
      const [post] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, parseInt(id || "")));
      if (!post)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(post);
    } catch (error) {
      console.error("Blog get error:", error);
      return NextResponse.json(
        { error: "Failed to fetch blog post" },
        { status: 500 },
      );
    }
  },
  { permissions: ["manage:blog"] },
);

export const PUT = withAuth(
  async (request: NextRequest, _ctx, params) => {
    try {
      const id = params?.id;
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

      const [updated] = await db
        .update(blogPosts)
        .set({
          coverImage,
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
        .where(eq(blogPosts.id, parseInt(id || "")))
        .returning();

      if (!updated)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(updated);
    } catch (error) {
      console.error("Blog update error:", error);
      return NextResponse.json(
        { error: "Failed to update blog post" },
        { status: 500 },
      );
    }
  },
  { permissions: ["manage:blog"] },
);

export const DELETE = withAuth(
  async (_request: NextRequest, _ctx, params) => {
    try {
      const id = params?.id;
      await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id || "")));
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Blog delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete blog post" },
        { status: 500 },
      );
    }
  },
  { permissions: ["manage:blog"] },
);
