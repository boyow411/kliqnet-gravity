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
    <div className="agency page-top">
      <section className="container" style={{ paddingBottom: 80 }}>
        <div className="portfolio-intro">
          <div>
            <p className="eyebrow">The Kliqnet portfolio</p>
            <h1>
              Work with purpose.
              <br />
              <em>Products with a point.</em>
            </h1>
            <p>
              Past work and products we’re building now. More than 50 projects
              delivered over the years.
              <br />
              Explore the work, our contribution and where each project stands.
            </p>
          </div>
          <span className="portfolio-count">
            {projects.length} selected projects ·{" "}
            {projects.filter((p) => p.category === "Venture Studio").length}{" "}
            Kliqnet products
          </span>
        </div>
        <PortfolioExplorer projects={projects} />
      </section>
      <ContactBand />
    </div>
  );
}
