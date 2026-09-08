import { NextResponse } from "next/server";
import { db } from "@/db";
import { projectCaseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAuth } from "@/modules/auth/rbac";
import { portfolioSchema } from "@/lib/portfolio-types";
export const GET = withAuth(
  async (_req, _ctx, params) => {
    const id = Number(params?.id);
    if (!Number.isSafeInteger(id) || id < 1)
      return NextResponse.json({ error: "Invalid project." }, { status: 400 });
    try {
      const [p] = await db
        .select()
        .from(projectCaseStudies)
        .where(eq(projectCaseStudies.id, id));
      return p
        ? NextResponse.json(p)
        : NextResponse.json({ error: "Project not found." }, { status: 404 });
    } catch {
      return NextResponse.json(
        { error: "Could not load project." },
        { status: 503 },
      );
    }
  },
  { permissions: ["manage:projects"] },
);
export const PUT = withAuth(
  async (req, _ctx, params) => {
    const id = Number(params?.id);
    if (!Number.isSafeInteger(id) || id < 1)
      return NextResponse.json({ error: "Invalid project." }, { status: 400 });
    try {
      const parsed = portfolioSchema.safeParse(await req.json());
      if (!parsed.success)
        return NextResponse.json(
          {
            error: parsed.error.issues
              .map((i) => i.path.join(".") + ": " + i.message)
              .join("; "),
          },
          { status: 400 },
        );
      const [p] = await db
        .update(projectCaseStudies)
        .set({ ...parsed.data, updatedAt: new Date() })
        .where(eq(projectCaseStudies.id, id))
        .returning();
      return p
        ? NextResponse.json(p)
        : NextResponse.json({ error: "Project not found." }, { status: 404 });
    } catch {
      return NextResponse.json(
        { error: "Could not save project. Check that the slug is unique." },
        { status: 400 },
      );
    }
  },
  { permissions: ["manage:projects"] },
);
// Removing from the catalogue is reversible through the editor.
export const DELETE = withAuth(
  async (_req, _ctx, params) => {
    const id = Number(params?.id);
    if (!Number.isSafeInteger(id) || id < 1)
      return NextResponse.json({ error: "Invalid project." }, { status: 400 });
    try {
      await db
        .update(projectCaseStudies)
        .set({ published: false, featured: false, updatedAt: new Date() })
        .where(eq(projectCaseStudies.id, id));
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json(
        { error: "Could not unpublish project." },
        { status: 503 },
      );
    }
  },
  { permissions: ["manage:projects"] },
);
