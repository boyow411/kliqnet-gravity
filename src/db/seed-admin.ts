import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { blogPosts as blogPostsTable, projectCaseStudies } from "./schema";
import { blogPosts as staticBlogPosts } from "../lib/blog-posts";
import { projects as staticProjects } from "../data/projects";
import { eq } from "drizzle-orm";

async function seed() {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, { schema });

    console.log("🌱 Seeding admin database...\n");

    // Seed blog posts
    console.log("📝 Seeding blog posts...");
    for (const post of staticBlogPosts) {
        const existing = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, post.slug));
        if (existing.length === 0) {
            await db.insert(blogPostsTable).values({
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                authorName: post.author.name,
                authorRole: post.author.role,
                readingTime: post.readingTime,
                published: true,
                date: post.date,
                relatedSlugs: post.relatedSlugs.join(","),
            });
            console.log(`  ✅ Created: ${post.title}`);
        } else {
            console.log(`  ⏭️  Skipped (exists): ${post.title}`);
        }
    }

    // Seed projects
    console.log("\n📦 Seeding projects...");
    for (const project of staticProjects) {
        const existing = await db.select().from(projectCaseStudies).where(eq(projectCaseStudies.slug, project.slug));
        if (existing.length === 0) {
            await db.insert(projectCaseStudies).values({
                slug: project.slug,
                name: project.name,
                category: project.category,
                industryTags: project.industryTags.join(","),
                status: project.status,
                tagline: project.tagline,
                shortDescription: project.shortDescription,
                primaryUrl: project.primaryUrl,
                data: {
                    screenshots: project.screenshots,
                    scopeOfExecution: project.scopeOfExecution,
                    about: project.about,
                    whatWasDone: project.whatWasDone,
                    howItWasDone: project.howItWasDone,
                    technologyUsed: project.technologyUsed,
                    projectTimeline: project.timeline,
                    challenges: project.challenges,
                    results: project.results,
                    cta: project.cta,
                },
                featured: false,
                published: true,
            });
            console.log(`  ✅ Created: ${project.name}`);
        } else {
            console.log(`  ⏭️  Skipped (exists): ${project.name}`);
        }
    }

    console.log("\n✨ Seed complete!");
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
