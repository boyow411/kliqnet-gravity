"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScaleIn } from "@/components/motion/reveal";

export function CTABand() {
    return (
        <section className="py-32 md:py-40 bg-black text-white relative overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            {/* Blue glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_50%,_rgba(59,130,246,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <ScaleIn>
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                            Tell us what you&apos;re building
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Ready to turn the idea, funnel or workflow into{" "}
                            <span className="text-blue-500">a real system?</span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                            Whether you need a website, mobile app, SaaS platform, CRM, AI workflow or automation system — we&apos;ll help you scope it, build it and launch it with a clear commercial purpose.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-base"
                                asChild
                            >
                                <Link href="/book-a-call">
                                    Book a Free Strategy Call
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <span className="text-sm text-gray-600">
                                24hr response • practical scope before build
                            </span>
                        </div>
                    </div>
                </ScaleIn>
            </div>
        </section>
    );
}
