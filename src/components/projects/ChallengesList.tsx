"use client";

import { Lightbulb, Wrench } from "lucide-react";
import { RevealSection } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";

type ChallengesListProps = {
    challenges: Project["challenges"];
};

export function ChallengesList({ challenges }: ChallengesListProps) {
    if (!challenges.length) return null;

    return (
        <RevealSection>
            <div className="space-y-4">
                {challenges.map((item, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Challenge */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Lightbulb className="w-4 h-4 text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-orange-400/80 mb-1">
                                        Challenge
                                    </p>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {item.challenge}
                                    </p>
                                </div>
                            </div>

                            {/* Solution */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Wrench className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-green-400/80 mb-1">
                                        Solution
                                    </p>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {item.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </RevealSection>
    );
}
