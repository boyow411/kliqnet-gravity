"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FiltersBar } from "@/components/projects/FiltersBar";
import { MetricsBanner } from "@/components/projects/MetricsBanner";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white relative">
            {/* Dot grid bg */}
            <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

            {/* Blue glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_20%,_rgba(59,130,246,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        Our Projects
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Products we&apos;ve built.{" "}
                        <span className="text-blue-500">Brands we&apos;ve transformed.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                        From venture studio SaaS products to client digital transformations — every project is architected for scale, built for production, and designed to convert.
                    </p>
                </motion.div>

                {/* Metrics Banner */}
                <MetricsBanner />

                {/* Filters */}
                <FiltersBar projects={projects} onFilter={setFilteredProjects} />

                {/* Venture Studio Section */}
                {filteredProjects.some((p) => p.category === "Venture Studio") && (
                    <section className="mb-16">
                        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                            Venture Studio Products
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects
                                .filter((p) => p.category === "Venture Studio")
                                .map((project, index) => (
                                    <motion.div
                                        key={project.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                        </div>
                    </section>
                )}

                {/* Client Transformations Section */}
                {filteredProjects.some((p) => p.category === "Client Transformation") && (
                    <section className="mb-16">
                        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                            Client Transformations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects
                                .filter((p) => p.category === "Client Transformation")
                                .map((project, index) => (
                                    <motion.div
                                        key={project.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                        </div>
                    </section>
                )}

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-600">
                        No projects match your filters. Try adjusting your selection.
                    </div>
                )}

                {/* CTA Section */}
                <section className="mt-24 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_300px_at_50%_50%,_rgba(59,130,246,0.06)_0%,_transparent_70%)] pointer-events-none" />
                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                            Start a Project
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Ready to build something{" "}
                            <span className="text-blue-500">that works?</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                            From product strategy to production deployment — we&apos;ll help you scope it, build it, and ship it. No fluff, no waste.
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
                </section>
            </div>
        </div>
    );
}
