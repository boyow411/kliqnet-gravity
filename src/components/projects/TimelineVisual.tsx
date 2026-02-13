"use client";

import { RevealSection } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";

type TimelineVisualProps = {
    timeline: Project["timeline"];
};

export function TimelineVisual({ timeline }: TimelineVisualProps) {
    return (
        <RevealSection>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                        Timeline
                    </h3>
                    <span className="text-sm font-semibold text-white">
                        {timeline.durationLabel}
                    </span>
                </div>

                {/* Visual timeline */}
                <div className="relative">
                    {/* Line */}
                    <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.08]" />

                    <div className="flex justify-between relative">
                        {timeline.phases.map((phase, i) => (
                            <div
                                key={phase}
                                className="flex flex-col items-center text-center"
                                style={{ width: `${100 / timeline.phases.length}%` }}
                            >
                                {/* Dot */}
                                <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center relative z-10 ${i === timeline.phases.length - 1
                                            ? "border-blue-500 bg-blue-500/20 timeline-dot"
                                            : "border-white/20 bg-background"
                                        }`}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${i === timeline.phases.length - 1
                                                ? "bg-blue-500"
                                                : "bg-white/40"
                                            }`}
                                    />
                                </div>

                                {/* Label */}
                                <span className="text-[11px] text-gray-500 mt-3 font-medium">
                                    {phase}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </RevealSection>
    );
}
