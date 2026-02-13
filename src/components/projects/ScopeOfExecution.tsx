"use client";

import { Check } from "lucide-react";
import { RevealSection } from "@/components/motion/reveal";

type ScopeOfExecutionProps = {
    items: string[];
};

export function ScopeOfExecution({ items }: ScopeOfExecutionProps) {
    return (
        <RevealSection>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                    Scope of Execution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01]"
                        >
                            <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-blue-400" />
                            </div>
                            <span className="text-sm text-gray-300">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </RevealSection>
    );
}
