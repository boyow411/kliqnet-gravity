import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-types";
import { projectKind, projectStyle } from "@/lib/portfolio-presentation";

export function PortfolioCard({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  return <article className="work-card cinema-card" style={projectStyle(project)}>
    <Link href={`/projects/${project.slug}`} className="work-image" aria-label={`Explore ${project.name}`}>
      <span className="work-poster-top"><span>{projectKind(project)}</span><span className="status-dot">{project.status}</span></span>
      <span className="work-poster-screen"><Image src={project.data.coverImage} alt={project.data.coverCaption} fill sizes="(max-width: 760px) 90vw, 46vw" priority={priority} /></span>
      <span className="work-poster-bottom"><span>{project.data.sector}</span><span>View case study <ArrowUpRight size={18} /></span></span>
    </Link>
    <div className="work-card-copy">
      <Link href={`/projects/${project.slug}`} className="work-title"><h3>{project.name}</h3><ArrowUpRight size={22} /></Link>
      <p>{project.shortDescription}</p>
      <p className="work-scope">{project.data.contribution[0]}</p>
    </div>
  </article>;
}
