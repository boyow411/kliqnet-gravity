import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission, isValidRole } from "@/modules/auth/types";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (
    !role ||
    !isValidRole(role) ||
    (!hasPermission(role, "manage:projects") &&
      !hasPermission(role, "manage:blog"))
  )
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (Number(req.headers.get("content-length")) > 6 * 1024 * 1024)
    return NextResponse.json(
      { error: "Maximum upload is 5 MB." },
      { status: 413 },
    );
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (
      !(file instanceof File) ||
      file.size > 5 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    )
      return NextResponse.json(
        { error: "Choose a PNG, JPEG or WebP image, up to 5 MB." },
        { status: 400 },
      );
    const source = Buffer.from(await file.arrayBuffer());
    const meta = await sharp(source, { limitInputPixels: 30000000 }).metadata();
    if (!["png", "jpeg", "webp"].includes(meta.format || ""))
      return NextResponse.json(
        { error: "The image format does not match a supported raster image." },
        { status: 400 },
      );
    const body = (
      await sharp(source, { limitInputPixels: 30000000 })
        .rotate()
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toBuffer()
    ).toString("base64");
    const id = randomUUID();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`INSERT INTO portfolio_media (id,body,mime_type) VALUES (${id},${body},'image/webp')`;
    return NextResponse.json({
      url: "/api/media/" + id + ".webp",
      filename: id + ".webp",
    });
  } catch {
    return NextResponse.json(
      { error: "Upload failed. Please try a valid image again." },
      { status: 400 },
    );
  }
}
