import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudy, caseStudies } from "@/lib/case-studies";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

export async function generateStaticParams() {
    return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);
    if (!study) return { title: "Case Study | Kliqnet Digital" };
    return {
        title: `${study.client} Case Study | Kliqnet Digital`,
        description: study.challenge.slice(0, 160),
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudy(slug);

    if (!study) return notFound();

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link href="/work" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Work
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-blue-400 font-medium mb-3">{study.industry}</p>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{study.client}</h1>
                        <p className="text-xl text-gray-400">{study.title}</p>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-16">
                        {study.kpis.map((kpi, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-900/30 to-blue-950/50 border border-blue-500/20 rounded-2xl p-6 text-center">
                                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{kpi.value}</p>
                                <p className="text-sm text-blue-200 uppercase tracking-wider">{kpi.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Project Metadata */}
                    <div className="flex flex-wrap gap-6 mb-16 pb-8 border-b border-white/10">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                            <p className="text-white font-medium">{study.duration}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Services</p>
                            <div className="flex flex-wrap gap-2">
                                {study.services.map((service) => (
                                    <span key={service} className="text-sm bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Challenge Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-red-400">The Challenge</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">{study.challenge}</p>
                    </section>

                    {/* Solution Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">The Solution</h2>
                        <ul className="space-y-4">
                            {study.solution.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-300 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Results Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-green-400">The Results</h2>
                        <ul className="space-y-4">
                            {study.results.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-300 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Tech Stack */}
                    <section className="mb-16 p-8 bg-zinc-900/50 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-semibold mb-4 text-gray-400">Tech Stack</h3>
                        <div className="flex flex-wrap gap-3">
                            {study.techStack.map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="text-center p-12 bg-blue-900/20 rounded-2xl border border-blue-500/20">
                        <h3 className="text-2xl font-bold mb-4">Ready to achieve similar results?</h3>
                        <p className="text-gray-400 mb-8">Let's discuss how we can help your business grow.</p>
                        <Button size="lg" asChild>
                            <Link href="/book-a-call">Book a Strategy Call</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
