import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit, sameOrigin } from "@/lib/request-guard";
export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Please send your enquiry from this website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Expected a JSON enquiry." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return NextResponse.json(
      { error: "Your enquiry is too long." },
      { status: 413 },
    );
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 16000)
      return NextResponse.json(
        { error: "Your enquiry is too long." },
        { status: 413 },
      );
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "We could not read the enquiry. Please try again." },
      { status: 400 },
    );
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  const d = parsed.data;
  if (d.website)
    return NextResponse.json(
      { error: "Please leave the website field empty." },
      { status: 400 },
    );
  try {
    if (!(await rateLimit(request, "contact", 6)))
      return NextResponse.json(
        {
          error:
            "Several enquiries have been sent from this connection. Please wait ten minutes or email us directly.",
        },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    const sql = neon(process.env.DATABASE_URL!);
    const [row] =
      await sql`INSERT INTO contact_submissions (name,email,company,budget,project_type,timeline,message,status,submission_key) VALUES (${d.name},${d.email},${d.company || null},${d.budget || "Not sure yet"},${d.projectType},${d.timeline || "Flexible"},${d.message},'new',${d.submissionKey}::uuid) ON CONFLICT (submission_key) DO UPDATE SET submission_key=contact_submissions.submission_key RETURNING id`;
    return NextResponse.json(
      { success: true, reference: "KN-" + String(row.id).padStart(6, "0") },
      { status: 201 },
    );
  } catch {
    console.error("Contact persistence failed");
    return NextResponse.json(
      {
        error:
          "We could not save your enquiry. Please try again or email hello@kliqnetdigital.com.",
      },
      { status: 503 },
    );
  }
}
