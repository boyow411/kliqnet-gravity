import { cache } from "react";
import { db } from "@/db";
import { projectCaseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { portfolioSchema } from "./portfolio-types";
export const getPublicProjects = cache(async () => {
  const rows = await db
    .select()
    .from(projectCaseStudies)
    .where(eq(projectCaseStudies.published, true));
  return rows
    .map((row) =>
      portfolioSchema.parse({
        ...row,
        primaryUrl: row.primaryUrl || "",
        industryTags: row.industryTags || "",
      }),
    )
    .sort(
      (a, b) =>
        a.data.featuredOrder - b.data.featuredOrder ||
        a.name.localeCompare(b.name),
    );
});
export const getPublicProject = async (slug: string) =>
  (await getPublicProjects()).find((p) => p.slug === slug);
