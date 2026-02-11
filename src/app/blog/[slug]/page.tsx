import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBlock, RelatedArticles } from "@/components/blog/blog-components";
import { Clock, ArrowLeft } from "lucide-react";

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
                    <h2 key={i} id={id} className="text-2xl font-bold mt-12 mb-4 text-white scroll-mt-32">
                        {text}
                    </h2>
                );
            }
            if (line.startsWith("### ")) {
                const text = line.replace("### ", "");
                const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
                return (
                    <h3 key={i} id={id} className="text-xl font-semibold mt-8 mb-3 text-white scroll-mt-32">
                        {text}
                    </h3>
                );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
                return (
                    <p key={i} className="text-lg font-semibold text-white mt-6 mb-2">
                        {line.replace(/\*\*/g, "")}
                    </p>
                );
            }
            if (line.startsWith("- ")) {
                return (
                    <li key={i} className="text-gray-300 ml-6 list-disc">
                        {line.replace("- ", "")}
                    </li>
                );
            }
            if (line.trim() === "") return <br key={i} />;
            return (
                <p key={i} className="text-gray-300 leading-relaxed mb-4">
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
        <div className="pt-32 pb-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto flex gap-12">
                    {/* Main Content */}
                    <article className="flex-1 max-w-3xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                        </Link>

                        <div className="mb-8">
                            <span className="text-blue-500 font-medium uppercase tracking-wider text-sm">
                                {post.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">{post.title}</h1>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <span>{post.date}</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> {post.readingTime}
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none mb-12">
                            {renderContent(post.content)}
                        </div>

                        <AuthorBlock author={post.author} />
                        <RelatedArticles posts={relatedPosts} />
                    </article>

                    {/* Table of Contents */}
                    <TableOfContents content={post.content} />
                </div>
            </div>
        </div>
    );
}
