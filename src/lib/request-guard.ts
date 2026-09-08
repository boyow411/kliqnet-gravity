import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
export async function rateLimit(
  request: NextRequest,
  scope: string,
  limit: number,
) {
  const ip =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";
  const bucket = Math.floor(Date.now() / 600000);
  const key = createHash("sha256")
    .update(
      scope +
        ":" +
        bucket +
        ":" +
        ip +
        ":" +
        (process.env.NEXTAUTH_SECRET || "local"),
    )
    .digest("hex");
  const sql = neon(process.env.DATABASE_URL!);
  const rows =
    await sql`INSERT INTO public_request_limits(key,count) VALUES (${key},1) ON CONFLICT(key) DO UPDATE SET count=public_request_limits.count+1 WHERE public_request_limits.count<${limit} RETURNING count`;
  // This table only holds short-lived, salted network hashes; discard old windows.
  await sql`DELETE FROM public_request_limits WHERE window_start < now()-interval '24 hours'`;
  return rows.length > 0;
}
