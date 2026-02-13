"use client";

import { RevealSection } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";

type TechStackBlockProps = {
    tech: Project["technologyUsed"];
};

const categoryLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    integrations: "Integrations",
    hosting: "Hosting",
};

export function TechStackBlock({ tech }: TechStackBlockProps) {
    const entries = Object.entries(tech).filter(
        ([, items]) => items.length > 0
    );

    return (
        <RevealSection>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                    Technology Stack
                </h3>
                <div className="space-y-5">
                    {entries.map(([key, items]) => (
                        <div key={key}>
                            <p className="text-xs text-gray-500 font-medium mb-2">
                                {categoryLabels[key] || key}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-white/[0.04] border border-white/[0.08] rounded-lg"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </RevealSection>
    );
}
