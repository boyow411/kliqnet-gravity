"use client";

import { RevealSection } from "@/components/motion/reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        number: "01",
        title: "Discovery & Strategy",
        description: "We start by understanding your business, audience, and goals inside out. Through stakeholder interviews, competitor analysis, and market research, we build a clear strategic roadmap — so every build decision is backed by real insight, not assumptions.",
        details: ["Stakeholder interviews", "Competitor audit", "User persona mapping", "Technical feasibility"],
    },
    {
        number: "02",
        title: "Design & Architecture",
        description: "High-fidelity wireframes, interactive prototypes, and robust technical architecture — all validated with you before a single line of code is written. We design systems, not just screens.",
        details: ["UI/UX wireframes", "Interactive prototypes", "Database schema design", "API architecture"],
    },
    {
        number: "03",
        title: "Build & Iterate",
        description: "Agile sprints with weekly demos. We build using production-grade tools (Next.js, React Native, Prisma, Stripe) and ship features continuously — so you see real progress, not just status updates.",
        details: ["Agile sprints", "Weekly demos", "CI/CD pipeline", "Code review & QA"],
    },
    {
        number: "04",
        title: "Launch & Scale",
        description: "Deployment to production with zero-downtime releases, performance monitoring, and post-launch optimization. We don't disappear after launch — we help you measure, iterate, and scale based on real user data.",
        details: ["Zero-downtime deploy", "Performance monitoring", "Analytics setup", "Ongoing support"],
    },
];

function TimelineStep({ step, index }: { step: typeof steps[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex gap-8 group"
        >
            {/* Timeline column */}
            <div className="flex flex-col items-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-blue-500 timeline-dot relative z-10" />
                {index < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-blue-500/40 to-white/[0.04] mt-2" />
                )}
            </div>

            {/* Content */}
            <div className="pb-16 last:pb-0">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md px-2 py-0.5">
                        Step {step.number}
                    </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-5 max-w-lg">
                    {step.description}
                </p>

                {/* Detail chips */}
                <div className="flex flex-wrap gap-2">
                    {step.details.map((d) => (
                        <span
                            key={d}
                            className="text-[11px] font-medium text-gray-500 border border-white/[0.06] rounded-full px-3 py-1"
                        >
                            {d}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export function ProcessSteps() {
    return (
        <section className="py-24 md:py-32 bg-black text-white border-t border-white/[0.04]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <RevealSection className="lg:sticky lg:top-32">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                            Our Process
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            How we take you from idea to launch
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-8">
                            An operator-led process designed to cut through noise and deliver tangible business outcomes — fast, transparent, and with zero waste.
                        </p>
                        <div className="flex flex-col gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Average delivery: 4–8 weeks
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Weekly progress demos
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Dedicated project lead
                            </div>
                        </div>
                    </RevealSection>

                    <div className="space-y-0">
                        {steps.map((step, index) => (
                            <TimelineStep key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
