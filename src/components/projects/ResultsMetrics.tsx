"use client";

import { RevealSection } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";

type ResultsMetricsProps = {
    results: Project["results"];
};

export function ResultsMetrics({ results }: ResultsMetricsProps) {
    if (!results.length) return null;

    return (
        <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((r, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center"
                    >
                        <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {r.value}
                        </p>
                        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                            {r.label}
                        </p>
                        {r.note && (
                            <p className="text-xs text-gray-600 mt-2">{r.note}</p>
                        )}
                    </div>
                ))}
            </div>
        </RevealSection>
    );
}
