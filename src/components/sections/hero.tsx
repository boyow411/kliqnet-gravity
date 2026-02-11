"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─── Floating UI Cards (decorative) ─── */
const floatingCards = [
    {
        id: "code",
        className: "float-1 top-[18%] left-[4%] w-52 hidden lg:block",
        delay: 0.3,
        content: (
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500/60" />
                    <span className="ml-1">page.tsx</span>
                </div>
                <div className="font-mono text-[11px] leading-relaxed">
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-blue-400">Calculator</span>{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-green-400">&apos;./calc&apos;</span>
                    <br />
                    <br />
                    <span className="text-purple-400">export default</span>{" "}
                    <span className="text-yellow-400">function</span>{" "}
                    <span className="text-blue-400">Page</span>
                    {"() {"}
                    <br />
                    {"  "}
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-blue-400">&lt;Calculator /&gt;</span>
                    <br />
                    {"}"}
                </div>
            </div>
        ),
    },
    {
        id: "analytics",
        className: "float-2 top-[12%] right-[3%] w-56 hidden lg:block",
        delay: 0.5,
        content: (
            <div className="space-y-3">
                <div className="text-[11px] font-semibold text-gray-300">Scalable by Design</div>
                <div className="text-[10px] text-gray-500 leading-relaxed">
                    Build systems that grow with your business — automated, optimised, and production-ready.
                </div>
                <div className="flex gap-1 mt-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div
                            key={i}
                            className="w-3 rounded-sm bg-blue-500/40"
                            style={{ height: `${h * 0.3}px` }}
                        />
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: "ui-card",
        className: "float-3 bottom-[12%] left-[2%] w-60 hidden lg:block",
        delay: 0.7,
        content: (
            <div className="space-y-2">
                <div className="text-[10px] text-gray-500 font-mono">August 10, 2025 at 10:41 AM</div>
                <div className="grid grid-cols-2 gap-1">
                    <div className="h-8 rounded bg-white/[0.04] border border-white/[0.06]" />
                    <div className="h-8 rounded bg-white/[0.04] border border-white/[0.06]" />
                    <div className="h-5 rounded bg-white/[0.04] border border-white/[0.06] col-span-2" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-green-400">✓</span>
                    <span className="text-[10px] text-gray-500">Generated</span>
                </div>
            </div>
        ),
    },
    {
        id: "nav-preview",
        className: "float-4 bottom-[18%] right-[2%] w-48 hidden lg:block",
        delay: 0.9,
        content: (
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                        <span className="text-[8px] text-blue-400">K</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Project Dashboard</span>
                </div>
                {["New chat", "Search", "Community", "Projects"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600">→</span>
                        <span className="text-[10px] text-gray-500">{item}</span>
                    </div>
                ))}
            </div>
        ),
    },
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 dot-grid opacity-100" />

            {/* Blue radial glow — centre */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_500px_at_50%_45%,_rgba(59,130,246,0.12)_0%,_rgba(59,130,246,0.04)_50%,_transparent_80%)] pointer-events-none" />
            {/* Blue side glows fading outward */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_400px_600px_at_0%_50%,_rgba(59,130,246,0.06)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_400px_600px_at_100%_50%,_rgba(59,130,246,0.06)_0%,_transparent_70%)] pointer-events-none" />

            {/* Vignette overlay — dark edges */}
            <div className="absolute inset-0 hero-vignette pointer-events-none" />

            {/* Floating UI Cards */}
            {floatingCards.map((card) => (
                <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: card.delay, ease: "easeOut" }}
                    className={`absolute ${card.className} rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 pointer-events-none`}
                >
                    {card.content}
                </motion.div>
            ))}

            {/* Centre Content */}
            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    {/* Pill Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
                        >
                            Full-service digital agency
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        Building Digital Products &{" "}
                        <span className="text-blue-500">Growth Systems</span> That Scale
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Web, mobile and software solutions designed to convert, automate and
                        grow your business.
                    </p>

                    {/* CTA */}
                    <div className="pt-2">
                        <Button size="lg" className="text-base h-12 px-8 rounded-lg" asChild>
                            <Link href="/book-a-call">
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
