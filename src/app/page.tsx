import { JourneyHero } from "@/components/cinematic/JourneyHero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
  return (
    <div className="agency">
      <JourneyHero />
      <div className="proof-line cinematic-proof container"><strong>50+ <span>projects delivered over the years</span></strong><span>Websites</span><span>Digital products</span><span>Connected operations</span></div>
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
        <div className="work-grid cinema-grid">
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
