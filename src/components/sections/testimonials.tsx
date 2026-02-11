"use client";

import { RevealSection, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Kliqnet didn't just build our website — they rebuilt our entire digital operation. Bookings tripled within the first month.",
        name: "ESQ Management",
        role: "Operations Director",
        company: "ESQ Cocktail Bar & Grill",
    },
    {
        quote: "They turned a vague product idea into a clear, fundable MVP. The speed and quality of execution was exactly what we needed.",
        name: "TrackAcct Founder",
        role: "Founder & CEO",
        company: "TrackAcct",
    },
    {
        quote: "Working with Kliqnet felt like having a CTO on demand. They understand both the tech and the business side.",
        name: "Agency Partner",
        role: "Managing Director",
        company: "Multi-Client Portfolio",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 md:py-32 bg-zinc-950 border-t border-white/[0.04]">
            <div className="container mx-auto px-4">
                <RevealSection className="text-center mb-16">
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        What Clients Say
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Results that speak louder
                    </h2>
                </RevealSection>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <StaggerItem key={i}>
                            <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col">
                                <Quote className="h-6 w-6 text-blue-500/40 mb-6 shrink-0" />
                                <blockquote className="text-gray-300 leading-relaxed mb-8 flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <div className="border-t border-white/[0.06] pt-6">
                                    <div className="font-semibold text-white text-sm">{t.name}</div>
                                    <div className="text-[12px] text-gray-500 mt-1">
                                        {t.role} · {t.company}
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
