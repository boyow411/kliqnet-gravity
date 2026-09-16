import { cache } from "react";
import { db } from "@/db";
import { blogPosts as table } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
  coverImage: string;
  author: { name: string; role: string; avatar?: string };
  relatedSlugs: string[];
};
export const getPublicPosts = cache(async (): Promise<BlogPost[]> => {
  const rows = await db
    .select()
    .from(table)
    .where(eq(table.published, true))
    .orderBy(desc(table.createdAt));
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    date: r.date,
    readingTime:
      r.readingTime ||
      `${Math.max(1, Math.ceil(r.content.split(/\s+/).length / 200))} min read`,
    category: r.category,
    coverImage: r.coverImage || "/brand/avatar.png",
    author: { name: r.authorName, role: r.authorRole },
    relatedSlugs: (r.relatedSlugs || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  }));
});
export async function getBlogPost(slug: string) {
  return (await getPublicPosts()).find((p) => p.slug === slug);
}
export async function getRelatedPosts(slug: string) {
  const posts = await getPublicPosts();
  const current = posts.find((p) => p.slug === slug);
  return posts
    .filter(
      (p) =>
        p.slug !== slug &&
        (current?.relatedSlugs.includes(p.slug) ||
          p.category === current?.category),
    )
    .slice(0, 2);
}
export const insightRedirects: Record<string, string> = {
  "why-scalable-architecture-matters": "build-the-operating-workflow-first",
  "seo-in-2026": "a-restaurant-website-is-a-guest-journey",
  "design-systems-guide": "build-the-operating-workflow-first",
  "roi-custom-software": "build-the-operating-workflow-first",
  "nextjs-vs-react": "build-the-operating-workflow-first",
  "brand-converts": "a-restaurant-website-is-a-guest-journey",
  "web-performance-mistakes": "a-restaurant-website-is-a-guest-journey",
  "api-first-development": "build-the-operating-workflow-first",
  "pwa-benefits": "build-the-operating-workflow-first",
  "idea-to-launch-process": "from-ai-generation-to-creative-workflow",
};
