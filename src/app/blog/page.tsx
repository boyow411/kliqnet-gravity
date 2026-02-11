import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

export const metadata = {
    title: "Insights & Articles | Kliqnet Digital",
    description: "Thoughts on technology, design, and growth from the Kliqnet Digital team.",
};

export default function BlogPage() {
    return (
        <div className="pt-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-center">Insights</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto text-center mb-20">
                    Thoughts on technology, design, and growth from our team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {blogPosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all h-full flex flex-col"
                        >
                            <div className="h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                                <span className="text-6xl font-bold text-white/10">{index + 1}</span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" /> {post.readingTime}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-200 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <span className="text-xs text-gray-500">{post.date}</span>
                                    <span className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
