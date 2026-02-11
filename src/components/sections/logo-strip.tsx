"use client";

import { RevealSection } from "@/components/motion/reveal";

const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "4", label: "Countries Served" },
    { value: "98%", label: "Client Retention" },
    { value: "24hr", label: "Response Time" },
];

export function LogoStrip() {
    return (
        <section className="py-16 bg-black border-t border-white/[0.06]">
            <div className="container mx-auto px-4">
                <RevealSection>
                    <div className="text-center mb-10">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 border border-white/[0.08] rounded-full px-4 py-1.5">
                            Trusted by Operators
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}
