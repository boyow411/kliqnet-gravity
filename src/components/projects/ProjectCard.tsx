"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

function ProjectPlaceholder({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-400/60 tracking-wider">
                {initials}
            </span>
        </div>
    );
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden flex flex-col">
            {/* Screenshot / Placeholder */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.02]">
                <Image
                    src={project.screenshots.cardImage}
                    alt={`${project.name} screenshot`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                            const placeholder = parent.querySelector("[data-placeholder]") as HTMLElement;
                            if (placeholder) placeholder.style.display = "flex";
                        }
                    }}
                />
                <div data-placeholder="" className="absolute inset-0 hidden">
                    <ProjectPlaceholder name={project.name} />
                </div>

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.1]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-gray-300">{project.status}</span>
                    </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.1] text-gray-300">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {project.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {project.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.industryTags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] rounded-full px-2.5 py-0.5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View Case Study
                    </Link>
                    <a
                        href={project.primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        Visit <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}
