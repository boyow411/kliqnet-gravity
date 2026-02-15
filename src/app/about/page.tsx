"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Layers, Handshake, Code, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    RevealSection,
    SlideInLeft,
    SlideInRight,
    FadeIn,
    ScaleIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/motion/reveal";

/* ─── Values data ─── */
const values = [
    {
        icon: Zap,
        title: "No Buzzwords",
        description:
            "We speak plain English and focus on metrics that actually matter to your bottom line. Every recommendation is backed by data, not jargon.",
    },
    {
        icon: Layers,
        title: "Full-Stack Expertise",
        description:
            "From Figma to Postgres, we understand the entire lifecycle of a digital product — design, engineering, deployment, and growth.",
    },
    {
        icon: Handshake,
        title: "Partners, Not Vendors",
        description:
            "We work as an extension of your team, caring about the product as much as you do. Your success is our success.",
    },
];

/* ─── Stats data ─── */
const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "4–8", label: "Week Avg. Delivery" },
    { value: "100%", label: "Remote-First Team" },
    { value: "24/7", label: "Support & Monitoring" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white">

            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
                {/* Dot grid */}
                <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

                {/* Blue radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_500px_at_50%_35%,_rgba(59,130,246,0.10)_0%,_rgba(59,130,246,0.03)_50%,_transparent_80%)] pointer-events-none" />

                {/* Vignette */}
                <div className="absolute inset-0 hero-vignette pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <RevealSection className="max-w-3xl mx-auto text-center space-y-6">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                            About Us
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Operator-Led{" "}
                            <span className="text-blue-500">Digital Excellence.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
                            We are not just a creative agency. We are product builders and
                            system architects obsessed with scalability, performance, and
                            real business outcomes.
                        </p>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════════ MISSION ═══════════════ */}
            <section className="py-24 md:py-32 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <SlideInLeft>
                            <div className="space-y-6">
                                <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                                    Our Mission
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Bridging the gap between{" "}
                                    <span className="text-blue-500">stunning design</span> and
                                    robust engineering.
                                </h2>
                                <div className="w-12 h-0.5 bg-blue-500/50 rounded-full" />
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    Too many agencies deliver pretty sites that don&apos;t convert,
                                    or complex systems that are unusable. We solve both sides of
                                    the equation — building products that look exceptional and
                                    perform flawlessly at scale.
                                </p>
                                <div className="flex flex-col gap-3 pt-2">
                                    {["Design that converts", "Engineering that scales", "Strategy that compounds"].map((item) => (
                                        <div key={item} className="flex items-center gap-3 text-sm text-gray-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SlideInLeft>

                        <SlideInRight>
                            <div className="relative group">
                                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                                    <Image
                                        src="/images/about/team-collaboration.png"
                                        alt="Kliqnet team collaborating in a modern workspace"
                                        width={640}
                                        height={480}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* ═══════════════ VALUES ═══════════════ */}
            <section className="py-24 md:py-32 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <RevealSection className="text-center mb-16">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                            Our Principles
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Why We Are Different
                        </h2>
                    </RevealSection>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <StaggerItem key={value.title}>
                                    <div className="relative group h-full">
                                        {/* Gradient top accent */}
                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                                        <div className="p-8 bg-white/[0.03] rounded-xl border border-white/[0.06] h-full hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                                                <Icon className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-3">
                                                {value.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            {/* ═══════════════ APPROACH ═══════════════ */}
            <section className="py-24 md:py-32 border-t border-white/[0.04]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <SlideInLeft className="order-2 lg:order-1">
                            <div className="relative group">
                                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                                    <Image
                                        src="/images/about/dev-workstation.png"
                                        alt="Premium development workstation with multiple monitors"
                                        width={640}
                                        height={480}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </SlideInLeft>

                        <SlideInRight className="order-1 lg:order-2">
                            <div className="space-y-6">
                                <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                                    Our Approach
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Production-grade from{" "}
                                    <span className="text-blue-500">day one.</span>
                                </h2>
                                <div className="w-12 h-0.5 bg-blue-500/50 rounded-full" />
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    We don&apos;t build prototypes and call them products. Every
                                    line of code is written to production standards — tested,
                                    scalable, and ready for real users from the very first sprint.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    {[
                                        { icon: Code, label: "Clean, maintainable code" },
                                        { icon: BarChart3, label: "Data-driven decisions" },
                                        { icon: Layers, label: "Modular architecture" },
                                        { icon: Users, label: "Transparent collaboration" },
                                    ].map((item) => {
                                        const ItemIcon = item.icon;
                                        return (
                                            <div key={item.label} className="flex items-center gap-3 text-sm text-gray-400">
                                                <ItemIcon className="w-4 h-4 text-blue-400 shrink-0" />
                                                {item.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </SlideInRight>
                    </div>
                </div>
            </section>

            {/* ═══════════════ STATS ═══════════════ */}
            <section className="py-16 md:py-20 border-t border-b border-white/[0.04] bg-white/[0.01]">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto text-center">
                            {stats.map((stat) => (
                                <div key={stat.label} className="space-y-2">
                                    <div className="text-3xl md:text-4xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════ CTA ═══════════════ */}
            <section className="py-32 md:py-40 relative overflow-hidden">
                {/* Dot grid */}
                <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

                {/* Blue glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_50%,_rgba(59,130,246,0.08)_0%,_transparent_70%)] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScaleIn>
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Let&apos;s Talk
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Ready to build something{" "}
                                <span className="text-blue-500">that works?</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                                Whether you need a web app, mobile app, SaaS platform, or
                                automation system — we&apos;ll help you scope it, build it, and
                                ship it.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className="h-14 px-8 text-base" asChild>
                                    <Link href="/book-a-call">
                                        Book a Strategy Call
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <span className="text-sm text-gray-600">
                                    Free 30-minute consultation
                                </span>
                            </div>
                        </div>
                    </ScaleIn>
                </div>
            </section>
        </div>
    );
}
