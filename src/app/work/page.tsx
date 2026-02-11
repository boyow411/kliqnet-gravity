"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies, CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const industries = ["All", "Hospitality", "SaaS", "Agency"];
const services = ["All", "Web Development", "SaaS Architecture", "Digital Marketing", "Automation"];

export default function WorkPage() {
    const [industryFilter, setIndustryFilter] = useState("All");
    const [serviceFilter, setServiceFilter] = useState("All");

    const filteredStudies = caseStudies.filter((study) => {
        const matchesIndustry = industryFilter === "All" || study.industry.toLowerCase().includes(industryFilter.toLowerCase());
        const matchesService = serviceFilter === "All" || study.services.some((s) => s.toLowerCase().includes(serviceFilter.toLowerCase()));
        return matchesIndustry && matchesService;
    });

    return (
        <div className="pt-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-center">Our Work</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto text-center mb-12">
                        Real results for real businesses. Explore how we've helped clients scale.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500 uppercase tracking-wider text-center">Industry</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {industries.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => setIndustryFilter(industry)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        industryFilter === industry
                                            ? "bg-blue-500 text-white"
                                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                                    )}
                                >
                                    {industry}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500 uppercase tracking-wider text-center">Service</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {services.map((service) => (
                                <button
                                    key={service}
                                    onClick={() => setServiceFilter(service)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        serviceFilter === service
                                            ? "bg-blue-500 text-white"
                                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                                    )}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Case Study Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {filteredStudies.map((study, index) => (
                        <motion.div
                            key={study.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <CaseStudyCard study={study} />
                        </motion.div>
                    ))}
                </div>

                {filteredStudies.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No case studies match your filters. Try adjusting your selection.
                    </div>
                )}
            </div>
        </div>
    );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
    return (
        <Link
            href={`/work/${study.slug}`}
            className="group block bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
        >
            {/* Header with Metric */}
            <div className="p-8 pb-0">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <p className="text-sm text-blue-400 font-medium mb-2">{study.industry}</p>
                        <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors">
                            {study.client}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white">{study.heroMetric}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{study.heroMetricLabel}</p>
                    </div>
                </div>
                <p className="text-gray-400 mb-4">{study.title}</p>
            </div>

            {/* Tags & Arrow */}
            <div className="p-8 pt-4 flex items-center justify-between border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                    {study.services.slice(0, 2).map((service) => (
                        <span
                            key={service}
                            className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full"
                        >
                            {service}
                        </span>
                    ))}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    );
}
