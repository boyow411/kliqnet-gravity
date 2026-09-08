import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getPublicProjects } from "@/lib/portfolio";
import { PortfolioCard } from "@/components/projects/PortfolioCard";
import {
  ServicesSection,
  FounderSection,
  ProcessSection,
  FAQSection,
  ContactBand,
} from "@/components/marketing";
export const metadata = { alternates: { canonical: "/" } };
export const dynamic = "force-dynamic";
export default async function Home() {
  const projects = await getPublicProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const hero = projects.find((p) => p.slug === "cinekliq") || featured[0];
  return (
    <div className="agency">
      <section className="hero container">
        <div className="hero-topline">
          <p className="eyebrow">Independent digital agency & product studio</p>
          <span>London · Working beyond borders</span>
        </div>
        <div className="hero-grid">
          <div>
            <h1>
              We build the
              <br />
              digital side of
              <br />
              <em>your business.</em>
            </h1>
            <p className="hero-copy">
              Websites, products and systems. Built by people who understand
              what it takes to run them.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact">
                Let’s talk about your project <ArrowUpRight size={18} />
              </Link>
              <Link className="text-link" href="#selected-work">
                Explore the work <ArrowDown size={17} />
              </Link>
            </div>
          </div>
          {hero && (
            <Link href={`/projects/${hero.slug}`} className="hero-project">
              <div className="hero-project-label">
                <span>Inside the Kliqnet portfolio</span>
                <ArrowUpRight size={20} />
              </div>
              <div className="hero-project-image">
                <Image
                  src={hero.data.coverImage}
                  alt={hero.data.coverCaption}
                  fill
                  sizes="(max-width: 850px) 100vw, 52vw"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="hero-project-caption">
                <strong>{hero.name}</strong>
                <span>{hero.tagline}</span>
              </div>
            </Link>
          )}
        </div>
        <div className="proof-line">
          <strong>
            50+ <span>projects delivered over the years</span>
          </strong>
          <span>Healthcare</span>
          <span>Hospitality</span>
          <span>Business software</span>
          <span>AI & creative tools</span>
        </div>
      </section>
      <section id="selected-work" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              Selected work / {String(featured.length).padStart(2, "0")}
            </p>
            <h2>
              Different businesses.
              <br />
              The same care in the build.
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            View the portfolio <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="work-grid">
          {featured.map((p) => (
            <PortfolioCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <ServicesSection />
      <FounderSection />
      <ProcessSection />
      <FAQSection />
      <ContactBand />
    </div>
  );
}
