import { pageMetadata } from "@/lib/page-metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceLandingData } from "@/lib/service-landing-data";
import { getPublicProjects } from "@/lib/portfolio";
import { PortfolioCard } from "@/components/projects/PortfolioCard";
import {
  ProcessSection,
  FAQSection,
  ContactBand,
} from "@/components/marketing";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = getServiceLandingData(service);
  return s
    ? pageMetadata({
        title: s.title + " | Kliqnet Digital",
        description: s.subheadline,
        path: "/" + service,
      })
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = getServiceLandingData(service);
  if (!s) notFound();
  const projects = (await getPublicProjects()).filter((p) =>
    s.projectSlugs.includes(p.slug),
  );
  return (
    <div className="agency">
      <section className="container intro page-top">
        <Link className="text-link" href="/services">
          ← All services
        </Link>
        <p className="eyebrow">{s.title}</p>
        <h1>{s.headline}</h1>
        <p className="intro-copy">{s.subheadline}</p>
        <Link
          className="button button-light"
          href={"/contact?project=" + encodeURIComponent(s.title)}
        >
          Discuss your project ↗
        </Link>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>What we can deliver.</h2>
          <p>
            We agree the scope, timeline and fees in writing before work begins.
          </p>
        </div>
        <div className="process-grid">
          {s.benefits.map((b) => (
            <article key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </article>
          ))}
        </div>
      </section>
      {projects.length > 0 && (
        <section className="container section">
          <div className="section-heading">
            <h2>See the thinking in practice.</h2>
          </div>
          <div className="work-grid">
            {projects.map((p) => (
              <PortfolioCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
      <ProcessSection />
      <FAQSection />
      <ContactBand />
    </div>
  );
}
