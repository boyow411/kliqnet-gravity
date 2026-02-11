import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudy, caseStudies } from "@/lib/case-studies";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
    return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return { title: "Project | Kliqnet Digital" };
    return {
        title: `${study.client} — Project Case Study | Kliqnet Digital`,
        description: study.challenge.slice(0, 160),
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);

    if (!study) return notFound();

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white relative">
            {/* Dot grid bg */}
            <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link href="/projects" className="inline-flex items-center text-gray-500 hover:text-white mb-12 transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> All Projects
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
                            {study.industry}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-[1.1]">
                            {study.client}
                        </h1>
                        <p className="text-xl text-gray-400">{study.title}</p>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-16">
                        {study.kpis.map((kpi, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center"
                            >
                                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{kpi.value}</p>
                                <p className="text-[11px] text-gray-500 uppercase tracking-wider">{kpi.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Project Metadata */}
                    <div className="flex flex-wrap gap-8 mb-16 pb-8 border-b border-white/[0.06]">
                        <div>
                            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600 mb-2">Duration</p>
                            <p className="text-white font-medium">{study.duration}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600 mb-2">Services Delivered</p>
                            <div className="flex flex-wrap gap-2">
                                {study.services.map((service) => (
                                    <span key={service} className="text-[11px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-1">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Challenge Section */}
                    <section className="mb-16">
                        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">The Challenge</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">{study.challenge}</p>
                    </section>

                    {/* Solution Section */}
                    <section className="mb-16">
                        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">The Solution</h2>
                        <div className="space-y-4">
                            {study.solution.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300 leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Results Section */}
                    <section className="mb-16">
                        <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">The Results</h2>
                        <div className="space-y-4">
                            {study.results.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                    <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-green-400" />
                                    </div>
                                    <span className="text-gray-300 leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section className="mb-16 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                        <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">Tech Stack</h3>
                        <div className="flex flex-wrap gap-3">
                            {study.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/[0.04] border border-white/[0.08] rounded-lg"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                        <h3 className="text-2xl font-bold mb-4">Ready to achieve similar results?</h3>
                        <p className="text-gray-500 mb-8">Let&apos;s discuss how we can help your business grow.</p>
                        <Button size="lg" className="h-14 px-8 text-base" asChild>
                            <Link href="/book-a-call">
                                Book a Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </section>
                </div>
            </div>
        </div>
    );
}
