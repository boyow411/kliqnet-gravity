import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, budget, projectType, timeline, businessStage, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const [submission] = await db.insert(contactSubmissions).values({
            name,
            email,
            company: company || null,
            budget: budget || null,
            projectType: projectType || null,
            timeline: timeline || null,
            businessStage: businessStage || null,
            message,
            status: "new",
        }).returning();

        return NextResponse.json(
            { success: true, id: submission.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact submit error:", error);
        return NextResponse.json(
            { error: "Failed to submit. Please try again." },
            { status: 500 }
        );
    }
}
