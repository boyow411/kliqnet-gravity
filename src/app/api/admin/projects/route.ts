import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projectCaseStudies } from "@/db/schema";
import { and, desc, eq, ilike, or, count } from "drizzle-orm";
import { withAuth } from "@/modules/auth/rbac";
import { portfolioSchema } from "@/lib/portfolio-types";
export const GET = withAuth(
  async (request: NextRequest) => {
    try {
      const q = new URL(request.url).searchParams;
      const page = Math.max(1, Math.min(10000, Number(q.get("page")) || 1));
      const limit = Math.max(1, Math.min(100, Number(q.get("limit")) || 20));
      const search = (q.get("search") || "").slice(0, 150);
      const category = q.get("category");
      const where = and(
        search
          ? or(
              ilike(projectCaseStudies.name, `%${search}%`),
              ilike(projectCaseStudies.slug, `%${search}%`),
            )
          : undefined,
        category ? eq(projectCaseStudies.category, category) : undefined,
      );
      const [projects, [total]] = await Promise.all([
        db
          .select()
          .from(projectCaseStudies)
          .where(where)
          .orderBy(desc(projectCaseStudies.createdAt))
          .limit(limit)
          .offset((page - 1) * limit),
        db.select({ count: count() }).from(projectCaseStudies).where(where),
      ]);
      return NextResponse.json({
        projects,
        total: total.count,
        page,
        totalPages: Math.ceil(total.count / limit),
      });
    } catch {
      return NextResponse.json(
        { error: "Could not load projects." },
        { status: 503 },
      );
    }
  },
  { permissions: ["manage:projects"] },
);
export const POST = withAuth(
  async (request: NextRequest) => {
    try {
      const parsed = portfolioSchema.safeParse(await request.json());
      if (!parsed.success)
        return NextResponse.json(
          {
            error: parsed.error.issues
              .map((i) => i.path.join(".") + ": " + i.message)
              .join("; "),
          },
          { status: 400 },
        );
      const [project] = await db
        .insert(projectCaseStudies)
        .values(parsed.data)
        .returning();
      return NextResponse.json(project, { status: 201 });
    } catch {
      return NextResponse.json(
        { error: "Could not create project. Check that the slug is unique." },
        { status: 400 },
      );
    }
  },
  { permissions: ["manage:projects"] },
);
