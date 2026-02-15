import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, parseInt(id)));
        if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(submission);
    } catch (error) {
        console.error("Submission get error:", error);
        return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status, notes } = body;

        const updateData: Record<string, unknown> = {};
        if (status !== undefined) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const [updated] = await db
            .update(contactSubmissions)
            .set(updateData)
            .where(eq(contactSubmissions.id, parseInt(id)))
            .returning();

        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Submission update error:", error);
        return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.delete(contactSubmissions).where(eq(contactSubmissions.id, parseInt(id)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submission delete error:", error);
        return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
    }
}
