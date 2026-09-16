import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-types";
export function PortfolioCard({
  project,
  priority = false,
}: {
  project: PortfolioProject;
  priority?: boolean;
}) {
  return (
    <article className="work-card cinema-card">
      <Link
        href={`/projects/${project.slug}`}
        className="work-image"
        aria-label={`Explore ${project.name}`}
      >
        <Image
          src={project.data.coverImage}
          alt={project.data.coverCaption}
          fill
          sizes="(max-width: 760px) 100vw, 65vw"
          className="object-cover object-top"
          priority={priority}
        />
        <span className="work-image-label">Explore project</span>
        <span className="work-image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="work-meta">
        <span>{project.data.sector}</span>
        <span className="status-dot">{project.status}</span>
      </div>
      <Link href={`/projects/${project.slug}`} className="work-title">
        <h3>{project.name}</h3>
        <ArrowUpRight size={22} />
      </Link>
      <p>{project.tagline}</p>
    </article>
  );
}
