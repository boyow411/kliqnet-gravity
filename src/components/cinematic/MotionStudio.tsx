"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
const MotionContext = createContext(false);
export const useQuietMotion = () => useContext(MotionContext);
export function MotionStudio({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const quiet = paused || !!reduced;
  const privatePage = /^\/(admin|onboarding)(\/|$)/.test(path);
  useEffect(() => {
    document.documentElement.dataset.motion = quiet ? "quiet" : "full";
    if (quiet || privatePage) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        animations.push(el.animate([
          { opacity: 0.35, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 700, easing: "cubic-bezier(.2,.7,.2,1)" }));
        observer.unobserve(el);
      }
    }, { threshold: 0.08 });
    document.querySelectorAll(".agency .section-heading, .agency .engagement, .agency .work-card, .agency .workflow-list article, .agency .story-content section, .agency .intro, .agency .founder-grid, .agency .contact-band").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); };
  }, [path, quiet, privatePage]);
  return <MotionContext.Provider value={quiet}>
    <MotionConfig reducedMotion={quiet ? "always" : "user"}>
      {children}
      {!privatePage && !reduced && <button className="motion-control" onClick={() => setPaused(p => !p)} aria-pressed={paused} aria-label={paused ? "Enable animations" : "Reduce animations"}>
        {paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? "Motion off" : "Motion on"}</span>
      </button>}
    </MotionConfig>
  </MotionContext.Provider>;
}
