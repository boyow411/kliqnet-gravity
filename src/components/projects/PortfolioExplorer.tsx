"use client";
import { useState } from "react";
import type { PortfolioProject } from "@/lib/portfolio-types";
import { PortfolioCard } from "./PortfolioCard";
const sectors = [
  "All sectors",
  "Healthcare",
  "Hospitality",
  "Business software",
  "Creative & community",
  "Education",
];
export function PortfolioExplorer({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [kind, setKind] = useState("All work"),
    [sector, setSector] = useState("All sectors"),
    [query, setQuery] = useState("");
  const filtered = projects.filter(
    (p) =>
      (kind === "All work" ||
        (kind === "Our products"
          ? p.category === "Venture Studio"
          : p.category === "Client Transformation")) &&
      (sector === "All sectors" || p.data.sector === sector) &&
      [p.name, p.tagline, p.shortDescription, p.industryTags]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="portfolio-tools">
        <div className="portfolio-tabs" role="group" aria-label="Project type">
          {["All work", "Our products", "Business websites"].map((k) => (
            <button
              key={k}
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="portfolio-search">
          <label className="sr-only" htmlFor="work-search">
            Search projects
          </label>
          <input
            id="work-search"
            placeholder="Search the work"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label className="sr-only" htmlFor="work-sector">
            Project sector
          </label>
          <select
            id="work-sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            {sectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="results-count" role="status">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {kind !== "All work" ? " · " + kind : ""}
        {sector !== "All sectors" ? " · " + sector : ""}
      </p>
      {filtered.length ? (
        <div className="work-grid">
          {filtered.map((p, i) => (
            <PortfolioCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching projects.</h2>
          <p>Try another search or explore the complete portfolio.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setKind("All work");
              setSector("All sectors");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
