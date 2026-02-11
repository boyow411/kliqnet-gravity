import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceLandingPages, getServiceLandingData } from "@/lib/service-landing-data";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

// Generate static paths for all landing pages
export async function generateStaticParams() {
    return serviceLandingPages.map((page) => ({ service: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
    const { service } = await params;
    const data = getServiceLandingData(service);
    if (!data) return { title: "Services | Kliqnet Digital" };
    return {
        title: `${data.title} | Kliqnet Digital`,
        description: data.subheadline,
    };
}

export default async function ServiceLandingPage({ params }: { params: Promise<{ service: string }> }) {
    const { service } = await params;
    const data = getServiceLandingData(service);

    if (!data) return notFound();

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white">
            {/* Dot grid bg */}
            <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Back */}
                <Link href="/services" className="inline-flex items-center text-gray-500 hover:text-white mb-12 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" /> All Services
                </Link>

                {/* Hero */}
                <div className="max-w-3xl mb-20">
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
                        {data.title}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
                        {data.headline}
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
                        {data.subheadline}
                    </p>
                    <Button size="lg" className="h-14 px-8 text-base" asChild>
                        <Link href="/book-a-call">
                            {data.cta} <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                {/* Benefits */}
                <section className="mb-24">
                    <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-8">
                        Why Choose Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {data.benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/20 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed pl-11">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process */}
                <section className="mb-24">
                    <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-8">
                        Our Process
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {data.process.map((step, index) => (
                            <div key={index} className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                <div className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md w-fit px-2 py-0.5 mb-4">
                                    Step {String(index + 1).padStart(2, "0")}
                                </div>
                                <p className="text-white font-semibold">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-24 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                    <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                        Technologies We Use
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {data.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/[0.04] border border-white/[0.08] rounded-lg"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-24 max-w-3xl">
                    <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {data.faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                            >
                                <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="max-w-2xl mx-auto text-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                    <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
                    <p className="text-gray-500 mb-8">
                        Let&apos;s discuss your project and build something great together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-8" asChild>
                            <Link href="/book-a-call">{data.cta}</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/projects">See Our Projects</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
