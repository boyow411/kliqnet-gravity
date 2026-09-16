import { pageMetadata, contentShareImage } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getPublicProject, getPublicProjects } from "@/lib/portfolio";
import { CaseGallery } from "@/components/projects/CaseGallery";
import { PortfolioCard } from "@/components/projects/PortfolioCard";
import { ContactBand } from "@/components/marketing";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPublicProject(slug);
  if (!p) return { title: "Project not found" };
  const path = "/projects/" + p.slug;
  return pageMetadata({
    title: p.name + " — Built by Kliqnet",
    description: p.shortDescription,
    path,
    image: contentShareImage(path, p.name, p.data.coverImage),
    imageAlt: p.name + " — a Kliqnet Digital project",
  });
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPublicProject(slug);
  if (!p) notFound();
  const d = p.data;
  const related = (await getPublicProjects())
    .filter((r) => r.slug !== slug && r.data.sector === d.sector)
    .slice(0, 2);
  return (
    <div className="agency page-top cinema-case">
      <div className="case-atmosphere" aria-hidden="true"><Image src={d.coverImage} alt="" fill sizes="100vw" /></div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.name,
          description: p.shortDescription,
          url: site.url + "/projects/" + p.slug,
          image: site.url + d.coverImage,
          dateModified: d.evidenceDate,
          creator: { "@id": site.url + "/#organization" },
        }}
      />
      <div className="container">
        <Link className="text-link" href="/projects">
          <ArrowLeft size={16} />
          All work & products
        </Link>
        <div className="case-opening"><div className="project-head">
          <div className="project-facts">
            <span>{d.sector}</span>
            <span className="status-dot">{p.status}</span>
          </div>
          <h1>{p.name}</h1>
          <p>{p.shortDescription}</p>
          <div className="project-facts">
            <span>{d.relationship}</span>
          </div>
          <div className="hero-actions">
            <Link
              className="button button-light"
              href={"/contact?project=" + encodeURIComponent(p.name)}
            >
              Discuss a similar project <ArrowUpRight size={18} />
            </Link>
            {p.primaryUrl && (
              <a
                className="text-link"
                href={p.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit{" "}
                {p.status === "Delivered" && p.primaryUrl.includes(".vercel.app")
                  ? "the preview"
                  : "the website"}{" "}
                <ArrowUpRight size={17} />
                <span className="sr-only">(opens a new tab)</span>
              </a>
            )}
          </div>
        </div>
        <figure className="case-preview"><div className="case-cover">
          <Image
            src={d.coverImage}
            alt={d.coverCaption}
            fill
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>
        <figcaption className="case-caption">{d.coverCaption}</figcaption></figure></div>
        <div className="story-grid">
          <nav className="story-nav" aria-label="Case study sections">
            <a href="#challenge">The challenge</a>
            <a href="#contribution">Our contribution</a>
            <a href="#workflow">The experience</a>
            <a href="#decision">A considered decision</a>
            <a href="#outcome">What was delivered</a>
            {d.screenshots.length > 0 && <a href="#screens">Project screens</a>}
          </nav>
          <div className="story-content">
            <section id="challenge">
              <p className="eyebrow">01 / The challenge</p>
              <h2>The problem worth solving.</h2>
              <p>{d.problem}</p>
            </section>
            <section id="contribution">
              <p className="eyebrow">02 / Kliqnet’s contribution</p>
              <h2>What we brought to the project.</h2>
              <ul>
                {d.contribution.map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
            </section>
            <section id="workflow">
              <p className="eyebrow">03 / The experience</p>
              <h2>How the work connects.</h2>
              <div className="workflow-list">
                {d.workflow.map((s, i) => (
                  <article key={s.title}>
                    <span className="index">0{i + 1}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section id="decision">
              <p className="eyebrow">04 / A considered decision</p>
              <h2>The thinking behind the build.</h2>
              <p>{d.decision}</p>
            </section>
            <section id="outcome">
              <p className="eyebrow">05 / What was delivered</p>
              <h2>A concrete result.</h2>
              <p>{d.outcome}</p>
              <div className="stage-note">
                <strong>{p.status}</strong>
                <p>{d.stageNote}</p>
              </div>
              <p className="case-caption">
                Case study updated{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(d.evidenceDate + "T12:00:00Z"))}
                .
              </p>
            </section>
            {d.screenshots.length > 0 && (
              <section id="screens">
                <p className="eyebrow">06 / A closer look</p>
                <h2>Inside the project.</h2>
                <CaseGallery
                  images={d.screenshots}
                  captions={d.captions}
                  name={p.name}
                />
              </section>
            )}
            {d.technologies.length > 0 && (
              <details>
                <summary>Technical foundations</summary>
                <p>{d.technologies.join(" · ")}</p>
              </details>
            )}
          </div>
        </div>
        {related.length > 0 && (
          <section className="section">
            <div className="section-heading">
              <h2>More in {d.sector.toLowerCase()}.</h2>
            </div>
            <div className="work-grid">
              {related.map((r) => (
                <PortfolioCard key={r.slug} project={r} />
              ))}
            </div>
          </section>
        )}
      </div>
      <ContactBand />
    </div>
  );
}
