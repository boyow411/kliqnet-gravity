import { ProjectPremiere } from "@/components/cinematic/ProjectPremiere";
import { getPublicProjects } from "@/lib/portfolio";
import { PortfolioExplorer } from "@/components/projects/PortfolioExplorer";
import { ContactBand } from "@/components/marketing";
import { showcaseProjects } from "@/lib/portfolio-presentation";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Our Work & Products | Kliqnet Digital",
  description:
    "Explore Kliqnet’s websites, software products and operational systems across healthcare, hospitality, business and creative production.",
  alternates: { canonical: "/projects" },
};
export default async function Projects() {
  const projects = await getPublicProjects();
  return (
    <div className="agency cinema-portfolio">
      <div className="portfolio-opening container"><p className="eyebrow">The Kliqnet portfolio</p><h1>Made by <em>Kliqnet.</em></h1><p>Digital products. Business websites. See what we built, why it matters and where it stands.</p></div>
      <ProjectPremiere projects={showcaseProjects(projects)} />
      <section id="browse-work" className="container section">
        <div className="section-heading"><div><p className="eyebrow">Explore the collection / {String(projects.length).padStart(2, "0")}</p><h2>Find your kind<br/>of possibility.</h2></div><p>Explore our own products and the websites we build for businesses. Every story explains our contribution and the current delivery stage.</p></div>
        <PortfolioExplorer projects={projects} />
      </section>
      <ContactBand />
    </div>
  );
}
