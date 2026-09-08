import type { MetadataRoute } from "next";
import { getPublicProjects } from "@/lib/portfolio";
import { getPublicPosts } from "@/lib/blog-posts";
import { serviceLandingPages } from "@/lib/service-landing-data";
import { site } from "@/lib/site";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    getPublicProjects(),
    getPublicPosts(),
  ]);
  return [
    ...[
      "",
      "/projects",
      "/services",
      "/about",
      "/contact",
      "/book-a-call",
      "/blog",
      "/privacy",
      "/terms",
      ...serviceLandingPages.map((s) => "/" + s.slug),
    ].map((path) => ({ url: site.url + path })),
    ...projects.map((p) => ({
      url: site.url + "/projects/" + p.slug,
      lastModified: new Date(p.data.evidenceDate),
    })),
    ...posts.map((p) => ({
      url: site.url + "/blog/" + p.slug,
      lastModified: new Date(p.date),
    })),
  ];
}
