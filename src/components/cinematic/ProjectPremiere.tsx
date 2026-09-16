"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-types";
import { useQuietMotion } from "./MotionStudio";
export function ProjectPremiere({ projects }: { projects: PortfolioProject[] }) {
  const [selected, setSelected] = useState(0);
  const quiet = useQuietMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({target: ref, offset: ["start end", "end start"]});
  const y = useTransform(scrollYProgress, [0,1], [32,-32]);
  const p = projects[selected];
  if (!p) return null;
  return <section ref={ref} className="project-premiere" aria-label="Featured project showcase">
    <div className="premiere-halo" aria-hidden="true"><Image src={p.data.coverImage} fill sizes="100vw" alt="" /></div>
    <div className="premiere-info">
      <p className="eyebrow">Built by Kliqnet / Selected work</p>
      <div className="project-facts"><span>{p.data.sector}</span><span className="status-dot">{p.status}</span></div>
      <div aria-live="polite" aria-atomic="true"><h2>{p.name}</h2><p>{p.tagline}</p></div>
      <Link className="button button-light" href={`/projects/${p.slug}`}>Explore the project <ArrowUpRight size={17} /></Link>
    </div>
    <motion.div className="premiere-visual" style={quiet ? undefined : {y}}>
      <Link href={`/projects/${p.slug}`} aria-label={`View ${p.name} case study`}><Image src={p.data.coverImage} alt={p.data.coverCaption} fill priority sizes="(max-width: 760px) 95vw, 65vw" className="object-contain" /></Link>
    </motion.div>
    <div className="premiere-controls"><span>{String(selected+1).padStart(2,"0")} <i>/ {String(projects.length).padStart(2,"0")}</i></span><div>
      <button onClick={() => setSelected(i => (i - 1 + projects.length) % projects.length)} aria-label="Previous featured project"><ArrowLeft size={20}/></button>
      <button onClick={() => setSelected(i => (i + 1) % projects.length)} aria-label="Next featured project"><ArrowRight size={20}/></button>
    </div><a href="#browse-work">Browse all work <ArrowUpRight size={16}/></a></div>
  </section>;
}
