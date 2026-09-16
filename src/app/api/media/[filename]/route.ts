import { neon } from "@neondatabase/serverless";
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  if (!/^[a-f0-9-]{36}\.webp$/.test(filename))
    return new Response("Not found", { status: 404 });
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const [file] =
      await sql`SELECT body,mime_type FROM portfolio_media WHERE id=${filename.slice(0, -5)}`;
    if (!file) return new Response("Not found", { status: 404 });
    return new Response(Buffer.from(file.body, "base64"), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public,max-age=31536000,immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'",
      },
    });
  } catch {
    return new Response("Media unavailable", { status: 503 });
  }
}
