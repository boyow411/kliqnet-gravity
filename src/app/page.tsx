import { pageMetadata } from "@/lib/page-metadata";
import { JourneyHero } from "@/components/cinematic/JourneyHero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublicProjects } from "@/lib/portfolio";
import { ProjectPremiere } from "@/components/cinematic/ProjectPremiere";
import { showcaseProjects } from "@/lib/portfolio-presentation";
import {
  ServicesSection,
  FounderSection,
  ProcessSection,
  FAQSection,
  ContactBand,
} from "@/components/marketing";
export const metadata = pageMetadata({ path: "/" });
export const dynamic = "force-dynamic";
export default async function Home() {
  const projects = await getPublicProjects();
  const featured = showcaseProjects(projects);
  return (
    <div className="agency">
      <JourneyHero />
      <div className="proof-line cinematic-proof container"><strong>50+ <span>projects delivered over the years</span></strong><span>Websites</span><span>Digital products</span><span>Connected operations</span></div>
      <section id="selected-work" className="selected-work-section">
        <div className="section-heading container selected-work-heading">
          <div>
            <p className="eyebrow">
              Selected work / {String(featured.length).padStart(2, "0")}
            </p>
            <h2>
              Products with purpose.
              <br />
              Websites with presence.
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            View the portfolio <ArrowUpRight size={18} />
          </Link>
        </div>
        <ProjectPremiere projects={featured} home />
      </section>
      <ServicesSection />
      <FounderSection />
      <ProcessSection />
      <FAQSection />
      <ContactBand />
    </div>
  );
}
