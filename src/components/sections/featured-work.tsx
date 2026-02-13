"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

const featured = projects.slice(0, 4);

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

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featured.map((project) => (
                        <StaggerItem key={project.slug}>
                            <ProjectCard project={project} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
