"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-types";
import { projectKind, projectStyle } from "@/lib/portfolio-presentation";
import { useQuietMotion } from "./MotionStudio";

export function ProjectPremiere({ projects, home = false }: { projects: PortfolioProject[]; home?: boolean }) {
  const [selected, setSelected] = useState(0);
  const quiet = useQuietMotion();
  const ref = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const p = projects[selected] || projects[0];
  if (!p) return null;
  const Heading = home ? "h3" : "h2";
  function choose(index: number, focus = false) {
    const next = (index + projects.length) % projects.length;
    setSelected(next);
    const button = buttons.current[next];
    const reel = button?.parentElement;
    if (button && reel && (button.offsetLeft < reel.scrollLeft || button.offsetLeft + button.offsetWidth > reel.scrollLeft + reel.clientWidth)) {
      reel.scrollTo({ left: button.offsetLeft - (reel.clientWidth - button.offsetWidth) / 2, behavior: "instant" });
    }
    if (focus) buttons.current[next]?.focus({ preventScroll: true });
  }
  return <section ref={ref} className={`project-theatre ${home ? "theatre-home" : ""}`} aria-label="Featured project showcase" style={projectStyle(p)}>
    <div className="premiere-reel" role="group" aria-label="Choose a featured project">
      {projects.map((project, index) => <button ref={el => { buttons.current[index] = el; }} key={project.slug} aria-pressed={selected === index} onClick={() => choose(index)} onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        choose(event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1), true);
      }}>
        <span className="reel-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="reel-image"><Image src={project.data.coverImage} alt="" fill sizes="64px" /></span>
        <span className="reel-label"><strong>{project.name}</strong><small>{projectKind(project)}</small></span>
      </button>)}
    </div>
    <div className="project-premiere">
      <div className="premiere-atmosphere" aria-hidden="true"><Image src={p.data.coverImage} alt="" fill sizes="100vw" /></div>
      <div className="premiere-topline"><span>Built by Kliqnet</span><span>{String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
      <motion.div className="premiere-visual" style={quiet ? undefined : { y }}>
        {projects.map((project, index) => <div key={project.slug} className={`premiere-screen ${selected === index ? "is-current" : ""}`} aria-hidden={selected !== index} inert={selected !== index}>
          <Link href={`/projects/${project.slug}`} tabIndex={selected === index ? 0 : -1} aria-label={`View ${project.name} case study`}>
            <Image src={project.data.coverImage} alt={project.data.coverCaption} fill sizes="(max-width: 760px) 92vw, 70vw" priority={!home && index === 0} />
          </Link>
        </div>)}
      </motion.div>
      <div className="premiere-info">
        <p className="premiere-category">{projectKind(p)} <span> / {p.data.sector}</span></p>
        <div aria-live="polite" aria-atomic="true">
          <Heading>{p.name}</Heading>
          <p className="premiere-description">{p.shortDescription}</p>
          <p className="premiere-stage"><span className="status-dot">{p.status}</span><span>Designed & developed by Kliqnet</span></p>
        </div>
        <Link className="button button-light" href={`/projects/${p.slug}`}>Inside the project <ArrowUpRight size={17} /></Link>
      </div>
      <div className="premiere-controls">
        <span>Explore the work</span>
        <div><button onClick={() => choose(selected - 1)} aria-label="Previous featured project"><ArrowLeft size={19} /></button><button onClick={() => choose(selected + 1)} aria-label="Next featured project"><ArrowRight size={19} /></button></div>
        {home ? <Link href="/projects">All work & products <ArrowUpRight size={16} /></Link> : <a href="#browse-work">Browse the collection <ArrowUpRight size={16} /></a>}
      </div>
    </div>
  </section>;
}
