import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBlock, RelatedArticles } from "@/components/blog/blog-components";
import { Clock, ArrowLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return { title: "Blog | Kliqnet Digital" };
    return {
        title: `${post.title} | Kliqnet Digital`,
        description: post.excerpt,
        openGraph: {
            images: [post.coverImage],
        },
    };
}

// Simple markdown to HTML (for demo - use MDX or a proper parser in production)
function renderContent(content: string) {
    return content
        .split("\n")
        .map((line, i) => {
            if (line.startsWith("## ")) {
                const text = line.replace("## ", "");
                const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
                return (
                    <h2 key={i} id={id} className="text-3xl font-bold mt-16 mb-6 text-white scroll-mt-32 border-l-4 border-blue-500 pl-4">
                        {text}
                    </h2>
                );
            }
            if (line.startsWith("### ")) {
                const text = line.replace("### ", "");
                const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
                return (
                    <h3 key={i} id={id} className="text-2xl font-semibold mt-10 mb-4 text-white scroll-mt-32">
                        {text}
                    </h3>
                );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
                return (
                    <p key={i} className="text-lg font-semibold text-white mt-8 mb-3">
                        {line.replace(/\*\*/g, "")}
                    </p>
                );
            }
            if (line.startsWith("- ")) {
                return (
                    <li key={i} className="text-gray-300 ml-6 list-disc mb-2 pl-2 marker:text-blue-500">
                        {line.replace("- ", "")}
                    </li>
                );
            }
            if (line.startsWith("*   ")) {
                return (
                    <li key={i} className="text-gray-300 ml-6 list-disc mb-2 pl-2 marker:text-blue-500">
                        {line.replace("*   ", "")}
                    </li>
                );
            }
            if (line.startsWith("1. ")) {
                return (
                    <li key={i} className="text-gray-300 ml-6 list-decimal mb-2 pl-2 marker:text-blue-500">
                        {line.replace("1. ", "")}
                    </li>
                );
            }
            if (line.trim() === "") return <br key={i} />;
            return (
                <p key={i} className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {line}
                </p>
            );
        });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) return notFound();

    const relatedPosts = getRelatedPosts(slug);

    return (
        <article className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

                <div className="absolute inset-0 flex flex-col justify-end pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                        </Link>

                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/90 text-white text-sm font-semibold uppercase tracking-wider shadow-lg shadow-blue-900/20 backdrop-blur-sm">
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-sm">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm md:text-base text-gray-200 font-medium">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> {post.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {post.readingTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto flex gap-12 lg:gap-20">
                    {/* Main Content */}
                    <div className="flex-1 max-w-4xl">
                        <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white mb-16">
                            {renderContent(post.content)}
                        </div>

                        <hr className="border-white/10 my-12" />

                        <AuthorBlock author={post.author} />
                        <RelatedArticles posts={relatedPosts} />
                    </div>

                    {/* Sidebar / Table of Contents */}
                    <div className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-32">
                            <TableOfContents content={post.content} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
