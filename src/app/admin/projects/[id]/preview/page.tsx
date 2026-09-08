import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projectCaseStudies } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { hasPermission, isValidRole } from "@/modules/auth/types";
import { portfolioSchema } from "@/lib/portfolio-types";
import { CaseGallery } from "@/components/projects/CaseGallery";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Private case-study preview",
  robots: { index: false, follow: false },
};
export default async function Preview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role || !isValidRole(role) || !hasPermission(role, "manage:projects"))
    redirect("/admin/login");
  const { id } = await params;
  const key = Number(id);
  if (!Number.isSafeInteger(key) || key < 1) notFound();
  const [row] = await db
    .select()
    .from(projectCaseStudies)
    .where(eq(projectCaseStudies.id, key));
  if (!row) notFound();
  const p = portfolioSchema.parse(row);
  const d = p.data;
  return (
    <article className="agency max-w-4xl mx-auto py-8">
      <p className="p-4 mb-8 border border-blue-500/40 bg-blue-950/30">
        Private preview of the saved record ·{" "}
        {p.published ? "Published" : "Draft"}. Unsaved editor changes are not
        shown.
      </p>
      <Link href={"/admin/projects/" + id + "/edit"} className="text-link">
        ← Return to editor
      </Link>
      <h1 className="text-5xl my-8">{p.name}</h1>
      <p className="text-xl">{p.tagline}</p>
      <p className="my-4">
        {d.relationship} · {p.status} · {d.sector}
      </p>
      <div className="case-cover">
        <Image
          src={d.coverImage}
          alt={d.coverCaption}
          fill
          sizes="900px"
          className="object-contain"
        />
      </div>
      <p className="case-caption">{d.coverCaption}</p>
      <div className="story-content">
        {[
          ["The challenge", d.problem],
          ["Design decision", d.decision],
          ["What was delivered", d.outcome],
          ["Current stage", d.stageNote],
        ].map(([title, copy]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}
        <section>
          <h2>Our contribution</h2>
          <ul>
            {d.contribution.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>The experience</h2>
          {d.workflow.map((s) => (
            <div className="mb-6" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </section>
        <section>
          <h2>Project screens</h2>
          <CaseGallery
            name={p.name}
            images={d.screenshots}
            captions={d.captions}
          />
        </section>
      </div>
    </article>
  );
}
