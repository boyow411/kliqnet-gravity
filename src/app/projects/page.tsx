import { ProjectPremiere } from "@/components/cinematic/ProjectPremiere";
import { getPublicProjects } from "@/lib/portfolio";
import { PortfolioExplorer } from "@/components/projects/PortfolioExplorer";
import { ContactBand } from "@/components/marketing";
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
      <div className="portfolio-opening container"><p className="eyebrow">The Kliqnet portfolio</p><h1>Ideas into <em>impact.</em></h1><p>Explore the things we build. And the thinking behind them.</p></div>
      <ProjectPremiere projects={projects.filter(p => ["cinekliq", "crate-companion", "homeskolar", "enzi"].includes(p.slug))} />
      <section id="browse-work" className="container section">
        <div className="section-heading"><div><p className="eyebrow">Explore the collection</p><h2>Every project.<br/>A different possibility.</h2></div><p>{projects.length} selected projects. Products and websites, with our contribution and each project’s current stage.</p></div>
        <PortfolioExplorer projects={projects} />
      </section>
      <ContactBand />
    </div>
  );
}
