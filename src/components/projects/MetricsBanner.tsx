"use client";

import { RevealSection } from "@/components/motion/reveal";

const metrics = [
    { value: "8", label: "Live Projects" },
    { value: "5", label: "Venture Studio Products" },
    { value: "End-to-End", label: "Delivery Model" },
];

export function MetricsBanner() {
    return (
        <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center"
                    >
                        <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                            {m.value}
                        </p>
                        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                            {m.label}
                        </p>
                    </div>
                ))}
            </div>
        </RevealSection>
    );
}
