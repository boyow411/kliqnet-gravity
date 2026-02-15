import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts, projectCaseStudies, contactSubmissions } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function GET() {
    try {
        const [blogResult] = await db.select({ count: count() }).from(blogPosts);
        const [publishedBlogResult] = await db
            .select({ count: count() })
            .from(blogPosts)
            .where(eq(blogPosts.published, true));
        const [projectResult] = await db.select({ count: count() }).from(projectCaseStudies);
        const [submissionResult] = await db.select({ count: count() }).from(contactSubmissions);
        const [unreadResult] = await db
            .select({ count: count() })
            .from(contactSubmissions)
            .where(eq(contactSubmissions.status, "new"));

        return NextResponse.json({
            totalBlogPosts: blogResult.count,
            publishedBlogPosts: publishedBlogResult.count,
            totalProjects: projectResult.count,
            totalSubmissions: submissionResult.count,
            unreadSubmissions: unreadResult.count,
        });
    } catch (error) {
        console.error("Stats fetch error:", error);
        // Return fallback zeros if tables don't exist
        return NextResponse.json({
            totalBlogPosts: 0,
            publishedBlogPosts: 0,
            totalProjects: 0,
            totalSubmissions: 0,
            unreadSubmissions: 0,
        });
    }
}
