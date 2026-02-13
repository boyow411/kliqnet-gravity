"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

const featured = projects.slice(0, 3);

export function FeaturedWork() {
    return (
        <section className="py-24 md:py-32 bg-black" id="work">
            <div className="container mx-auto px-4">
                <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                            Selected Projects
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Projects that speak for themselves
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 shrink-0"
                    >
                        View all projects <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </RevealSection>

                <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {featured.map((project) => (
                        <StaggerItem key={project.slug}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group block h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
                            >
                                {/* Category chip */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[11px] font-medium text-gray-500 tracking-wider uppercase">
                                        {project.category}
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-gray-600 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                                </div>

                                {/* Name + Description */}
                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                    {project.shortDescription}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                                    {project.industryTags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
