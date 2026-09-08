import { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { rateLimit, sameOrigin } from "@/lib/request-guard";
const schema = z.object({
  event: z.enum(["page_view", "enquiry_start", "enquiry_complete"]),
  path: z
    .string()
    .max(180)
    .regex(
      /^\/(?:$|projects(?:\/[a-z0-9-]+)?$|services$|about$|contact$|book-a-call$|blog(?:\/[a-z0-9-]+)?$|[a-z]+-development$|automation$|ai-integration$|crm-operations$|digital-marketing$)/,
    ),
});
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return new Response(null, { status: 403 });
  if (!req.headers.get("content-type")?.includes("application/json"))
    return new Response(null, { status: 415 });
  try {
    const raw = await req.text();
    if (raw.length > 500) return new Response(null, { status: 413 });
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return new Response(null, { status: 400 });
    if (!(await rateLimit(req, "metrics", 100)))
      return new Response(null, { status: 429 });
    const { event, path } = parsed.data;
    if (event !== "page_view" && !["/contact", "/book-a-call"].includes(path))
      return new Response(null, { status: 400 });
    const sql = neon(process.env.DATABASE_URL!);
    await sql`INSERT INTO site_event_counts(event,path,count) VALUES (${event},${path},1) ON CONFLICT(day,event,path) DO UPDATE SET count=site_event_counts.count+1`;
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
