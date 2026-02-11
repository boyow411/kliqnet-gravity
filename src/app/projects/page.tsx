"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const industries = ["All", "Hospitality", "SaaS", "Agency"];
const services = ["All", "Web Development", "SaaS Architecture", "Digital Marketing", "Automation"];

export default function ProjectsPage() {
    const [industryFilter, setIndustryFilter] = useState("All");
    const [serviceFilter, setServiceFilter] = useState("All");

    const filteredStudies = caseStudies.filter((study) => {
        const matchesIndustry = industryFilter === "All" || study.industry.toLowerCase().includes(industryFilter.toLowerCase());
        const matchesService = serviceFilter === "All" || study.services.some((s) => s.toLowerCase().includes(serviceFilter.toLowerCase()));
        return matchesIndustry && matchesService;
    });

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white relative">
            {/* Dot grid bg */}
            <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        Our Projects
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Real results for real businesses
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Explore how we&apos;ve helped clients build digital products, automate operations, and scale their businesses. Every project tells a story of strategic execution and measurable outcomes.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-8 mb-12 pb-8 border-b border-white/[0.06]">
                    <div className="space-y-3">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600">Industry</p>
                        <div className="flex flex-wrap gap-2">
                            {industries.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => setIndustryFilter(industry)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                        industryFilter === industry
                                            ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                            : "border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:border-white/[0.12]"
                                    )}
                                >
                                    {industry}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600">Service</p>
                        <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                                <button
                                    key={service}
                                    onClick={() => setServiceFilter(service)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                        serviceFilter === service
                                            ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                            : "border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:border-white/[0.12]"
                                    )}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredStudies.map((study, index) => (
                        <motion.div
                            key={study.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <ProjectCard study={study} />
                        </motion.div>
                    ))}
                </div>

                {filteredStudies.length === 0 && (
                    <div className="text-center py-20 text-gray-600">
                        No projects match your filters. Try adjusting your selection.
                    </div>
                )}
            </div>
        </div>
    );
}

function ProjectCard({ study }: { study: CaseStudy }) {
    return (
        <Link
            href={`/projects/${study.slug}`}
            className="group block h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
        >
            {/* Header */}
            <div className="p-8 pb-0">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <span className="text-[11px] font-medium text-gray-600 tracking-wider uppercase">
                            {study.industry}
                        </span>
                        <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-blue-300 transition-colors">
                            {study.client}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white">{study.heroMetric}</p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{study.heroMetricLabel}</p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{study.title}</p>
            </div>

            {/* Footer */}
            <div className="p-8 pt-4 flex items-center justify-between border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-2">
                    {study.services.slice(0, 2).map((service) => (
                        <span
                            key={service}
                            className="text-[10px] font-medium text-gray-500 bg-white/[0.03] border border-white/[0.06] rounded-md px-2.5 py-0.5"
                        >
                            {service}
                        </span>
                    ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
        </Link>
    );
}
