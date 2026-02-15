/* ═══════════════════════════════════════════════════════════════
   File Service — Upload management (local → S3-ready adapter)
   ═══════════════════════════════════════════════════════════════ */

import { db } from "@/db";
import { fileUploads } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Upload adapter interface — swap to S3/R2 in production.
 */
interface UploadResult {
    url: string;
    fileName: string;
    sizeBytes: number;
}

/**
 * Local file upload — writes to public/uploads/.
 * Replace this function body with S3/R2 SDK calls for production.
 */
export async function uploadFileToStorage(
    file: Buffer,
    originalName: string,
    mimeType: string
): Promise<UploadResult> {
    await mkdir(UPLOAD_DIR, { recursive: true });

    const ext = originalName.split(".").pop() || "bin";
    const hash = crypto.randomBytes(8).toString("hex");
    const fileName = `${Date.now()}-${hash}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    await writeFile(filePath, file);

    return {
        url: `/uploads/${fileName}`,
        fileName,
        sizeBytes: file.length,
    };
}

/**
 * Record a file upload in the database.
 */
export async function recordFileUpload(data: {
    organizationId: number;
    sessionId: number;
    url: string;
    fileName: string;
    fileType: string;
    sizeBytes: number;
}) {
    const [record] = await db.insert(fileUploads).values(data).returning();
    return record;
}

/**
 * Get all files for an onboarding session.
 */
export async function getSessionFiles(sessionId: number, organizationId: number) {
    return db
        .select()
        .from(fileUploads)
        .where(
            and(
                eq(fileUploads.sessionId, sessionId),
                eq(fileUploads.organizationId, organizationId)
            )
        );
}

/**
 * Delete a file record (does not delete from storage — add cleanup job for production).
 */
export async function deleteFileRecord(id: number, organizationId: number) {
    const [record] = await db
        .delete(fileUploads)
        .where(and(eq(fileUploads.id, id), eq(fileUploads.organizationId, organizationId)))
        .returning();
    return record;
}
