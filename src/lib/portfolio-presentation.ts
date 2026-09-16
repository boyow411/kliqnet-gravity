import type { CSSProperties } from "react";
import type { PortfolioProject } from "./portfolio-types";

export function showcaseProjects(projects: PortfolioProject[]) {
  const order = ["cinekliq", "crate-companion", "enzi", "signoff360", "homeskolar", "esq"];
  return order.flatMap(slug => {
    const project = projects.find(p => p.slug === slug);
    return project ? [project] : [];
  });
}

export function projectStyle(project: PortfolioProject): CSSProperties {
  const tones: Record<string, string> = {
    cinekliq: "#77d5bc", "crate-companion": "#bf9bf7", enzi: "#cfac78",
    signoff360: "#8cc8bf", homeskolar: "#9fd8ce", esq: "#d5a180",
  };
  return { "--project-accent": tones[project.slug] || "#b6a4df" } as CSSProperties;
}

export function projectKind(project: PortfolioProject) {
  return project.category === "Venture Studio" ? "Kliqnet product" : "Business website";
}
