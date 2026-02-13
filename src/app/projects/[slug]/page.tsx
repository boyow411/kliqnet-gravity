import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { projects, getProject, getAdjacentProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ScopeOfExecution } from "@/components/projects/ScopeOfExecution";
import { TechStackBlock } from "@/components/projects/TechStackBlock";
import { TimelineVisual } from "@/components/projects/TimelineVisual";
import { ChallengesList } from "@/components/projects/ChallengesList";
import { ResultsMetrics } from "@/components/projects/ResultsMetrics";
import { GalleryLightbox } from "@/components/projects/GalleryLightbox";
import { PrevNextNav } from "@/components/projects/PrevNextNav";
import { TableOfContents } from "@/components/projects/TableOfContents";

/* ── Static Params ── */

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

/* ── Metadata ── */

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return { title: "Project | Kliqnet Digital" };

    return {
        title: `${project.name} — Case Study | Kliqnet Digital`,
        description: project.shortDescription,
        openGraph: {
            title: `${project.name} — Case Study | Kliqnet Digital`,
            description: project.shortDescription,
            images: [{ url: project.screenshots.cardImage }],
        },
    };
}

/* ── TOC items ── */

const tocItems = [
    { id: "about", label: "About" },
    { id: "scope", label: "Scope" },
    { id: "what-was-done", label: "What Was Done" },
    { id: "how-it-was-done", label: "How It Was Done" },
    { id: "technology", label: "Technology" },
    { id: "timeline", label: "Timeline" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "gallery", label: "Gallery" },
    { id: "cta", label: "Contact" },
];

/* ── Page ── */

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) return notFound();

    const { prev, next } = getAdjacentProjects(slug);

    // Filter TOC items based on available data
    const activeTocItems = tocItems.filter((item) => {
        if (item.id === "gallery" && project.screenshots.gallery.length === 0)
            return false;
        return true;
    });

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        description: project.shortDescription,
        url: project.primaryUrl,
        creator: {
            "@type": "Organization",
            name: "Kliqnet Digital",
            url: "https://kliqnetdigital.com",
        },
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white relative">
            {/* Dot grid bg */}
            <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none" />

            {/* Blue glow */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_800px_400px_at_50%_10%,_rgba(59,130,246,0.06)_0%,_transparent_70%)] pointer-events-none" />

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Back Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center text-gray-500 hover:text-white mb-12 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> All Projects
                </Link>

                {/* Hero */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400">
                            {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {project.status}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-[1.1]">
                        {project.name}
                    </h1>

                    {project.tagline && (
                        <p className="text-xl md:text-2xl text-gray-400 mb-6 max-w-2xl">
                            {project.tagline}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="md" asChild>
                            <a
                                href={project.primaryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Website
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </a>
                        </Button>

                        <div className="flex flex-wrap gap-2 ml-2">
                            {project.industryTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Layout: TOC sidebar + Content */}
                <div className="flex gap-16">
                    {/* Sticky TOC — desktop only */}
                    <aside className="hidden xl:block w-48 shrink-0">
                        <TableOfContents items={activeTocItems} />
                    </aside>

                    {/* Main content */}
                    <div className="flex-1 max-w-4xl space-y-16">
                        {/* About */}
                        <section id="about">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                                About the App
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.about}
                            </p>
                        </section>

                        {/* Scope of Execution */}
                        <section id="scope">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Scope of Execution
                            </h2>
                            <ScopeOfExecution items={project.scopeOfExecution} />
                        </section>

                        {/* What Was Done */}
                        <section id="what-was-done">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                What Was Done
                            </h2>
                            <div className="space-y-3">
                                {project.whatWasDone.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-blue-400" />
                                        </div>
                                        <span className="text-gray-300 leading-relaxed">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* How It Was Done */}
                        <section id="how-it-was-done">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                How It Was Done
                            </h2>
                            <div className="space-y-3">
                                {project.howItWasDone.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-[10px] font-bold text-gray-400">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <span className="text-gray-300 leading-relaxed">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Technology */}
                        <section id="technology">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Technology Used
                            </h2>
                            <TechStackBlock tech={project.technologyUsed} />
                        </section>

                        {/* Timeline */}
                        <section id="timeline">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Timeline
                            </h2>
                            <TimelineVisual timeline={project.timeline} />
                        </section>

                        {/* Challenges */}
                        <section id="challenges">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Challenges & Solutions
                            </h2>
                            <ChallengesList challenges={project.challenges} />
                        </section>

                        {/* Results */}
                        <section id="results">
                            <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Results & Impact
                            </h2>
                            <ResultsMetrics results={project.results} />
                        </section>

                        {/* Gallery */}
                        {project.screenshots.gallery.length > 0 && (
                            <section id="gallery">
                                <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-6">
                                    Gallery
                                </h2>
                                <GalleryLightbox
                                    images={project.screenshots.gallery}
                                    projectName={project.name}
                                />
                            </section>
                        )}

                        {/* CTA */}
                        <section id="cta">
                            <div className="text-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_400px_200px_at_50%_50%,_rgba(59,130,246,0.06)_0%,_transparent_70%)] pointer-events-none" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3">
                                        {project.cta.title}
                                    </h3>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                        {project.cta.copy}
                                    </p>
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 text-base"
                                        asChild
                                    >
                                        <Link href={project.cta.buttonHref}>
                                            {project.cta.buttonLabel}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Prev/Next Navigation */}
                        <PrevNextNav prev={prev} next={next} />
                    </div>
                </div>
            </div>
        </div>
    );
}
