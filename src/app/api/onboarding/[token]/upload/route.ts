/* ═══════════════════════════════════════════════════════════════
   Public API: Onboarding File Upload — Token-validated uploads
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/modules/onboarding/service";
import { uploadFileToStorage, recordFileUpload } from "@/modules/files/service";
import { eventBus } from "@/modules/automation/event-bus";

const ALLOWED_TYPES = [
    "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
    "application/pdf",
    "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const session = await getSessionByToken(token);

    if (!session) {
        return NextResponse.json({ error: "Invalid onboarding link" }, { status: 404 });
    }

    if (session.expired) {
        return NextResponse.json({ error: "Link expired" }, { status: 410 });
    }

    if (session.status === "COMPLETED" || session.status === "APPROVED") {
        return NextResponse.json({ error: "Session is locked" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: "File type not allowed. Accepted: images, PDF, Word, Excel" },
            { status: 400 }
        );
    }

    // Validate size
    if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: "File too large. Max 10MB" }, { status: 400 });
    }

    // Upload to storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await uploadFileToStorage(buffer, file.name, file.type);

    // Record in database
    const record = await recordFileUpload({
        organizationId: session.organizationId,
        sessionId: session.id,
        url: result.url,
        fileName: result.fileName,
        fileType: file.type,
        sizeBytes: result.sizeBytes,
    });

    // Emit event
    await eventBus.emit("FILE_UPLOADED", {
        sessionId: session.id,
        fileId: record.id,
        organizationId: session.organizationId,
    });

    return NextResponse.json({
        id: record.id,
        url: result.url,
        fileName: result.fileName,
    }, { status: 201 });
}
