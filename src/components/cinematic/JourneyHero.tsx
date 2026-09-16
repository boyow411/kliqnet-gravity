"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useQuietMotion } from "./MotionStudio";
import { JourneyFilm } from "./JourneyFilm";
const chapters = [
  { name: "The challenge", title: "You bring the challenge.", accent: "We build what comes next.", text: "A website. A product. A better way of working. It starts with what you need.", image: "01-challenge" },
  { name: "The conversation", title: "First, we listen.", accent: "Then, it becomes clear.", text: "Your ambition. Your customers. The things getting in the way. Together, we shape the right brief.", image: "02-conversation" },
  { name: "The build", title: "An idea takes shape.", accent: "A solution comes to life.", text: "Strategy becomes design. Design becomes a working product. Built around the people who will use it.", image: "03-build" },
  { name: "The launch", title: "Built with purpose.", accent: "Ready for the world.", text: "Tested, refined and ready for the next chapter. From the first screen to the real customer journey.", image: "04-launch" },
  { name: "Beyond launch", title: "Launch is a beginning.", accent: "We keep moving with you.", text: "Support, maintenance and thoughtful improvements. A digital partner for what comes next.", image: "05-evolve" },
];
export function JourneyHero() {
  const ref = useRef<HTMLElement>(null);
  const quiet = useQuietMotion();
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  useMotionValueEvent(scrollYProgress, "change", value => setChapter(Math.min(4, Math.floor(value * 5))));
  const current = quiet ? 0 : chapter;
  function seek(index: number) {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const distance = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * ((index + 0.25) / 5), behavior: "instant" });
  }
  return <section ref={ref} className={`journey ${quiet ? "journey-quiet" : ""}`} aria-label="From your challenge to what comes next">
    <noscript><style>{`.journey{height:auto!important}.journey-stage{position:relative!important;top:0!important}.journey-chapters{display:none!important}.journey-transcript{position:static!important;width:auto!important;height:auto!important;clip:auto!important;clip-path:none!important;overflow:visible!important;white-space:normal!important;padding:40px 24px!important}`}</style></noscript>
    <div className="journey-stage">
      <motion.div className="journey-world" style={quiet ? undefined : { scale }} aria-hidden="true">
        {chapters.map((scene, index) => <div className={`journey-image ${index === current ? "is-active" : ""}`} key={scene.image}>
          <Image src={`/cinematic/${scene.image}.webp`} alt="" fill sizes="100vw" priority={index === 0} loading={index === 0 ? undefined : "lazy"} />
        </div>)}
        {!quiet && <JourneyFilm progress={scrollYProgress} />}
      </motion.div>
      <div className="journey-scrim" />
      <div className="journey-top container"><span>Independent digital agency & product studio</span><span>London · Beyond borders</span></div>
      <div className="journey-copy container">
        <p className="eyebrow">From the first conversation. Through every next chapter.</p>
        <h1 className="sr-only">You bring the challenge. We build what comes next.</h1>
        <div className="journey-titles">
          {chapters.map((scene, index) => <div className={`journey-title ${index === current ? "is-active" : ""}`} key={scene.name} aria-hidden={index !== current}>
            <p className="journey-headline">{scene.title}<em>{scene.accent}</em></p>
            <p className="journey-description">{scene.text}</p>
          </div>)}
        </div>
        <div className="hero-actions">
          <Link href="/contact" className="button button-light">Start your next chapter <ArrowUpRight size={17} /></Link>
          <a href="#selected-work" className="text-link">See the work <ArrowDown size={16} /></a>
        </div>
      </div>
      <div className="journey-bottom container">
        <div className="journey-caption"><span>0{current + 1} / 05</span><span>{quiet ? "Your journey, from idea to beyond launch" : "Scroll to follow the journey"}</span><ArrowDown size={14} /></div>
        {!quiet && <nav className="journey-chapters" aria-label="Journey chapters">{chapters.map((scene, index) => <button key={scene.name} onClick={() => seek(index)} aria-current={index === current ? "step" : undefined}><span>0{index + 1}</span>{scene.name}</button>)}</nav>}
        <p className="journey-disclosure">An illustrated journey. Real work below.</p>
      </div>
      {!quiet && <motion.div className="journey-progress" style={{ scaleX: scrollYProgress }} />}
    </div>
    <div className="journey-transcript sr-only">{chapters.slice(1).map(scene => <section key={scene.name}><h2>{scene.name}</h2><p>{scene.title} {scene.accent} {scene.text}</p></section>)}</div>
  </section>;
}
