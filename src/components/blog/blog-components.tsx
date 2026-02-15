import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-posts";
import { ArrowRight } from "lucide-react";

export function AuthorBlock({ author }: { author: BlogPost["author"] }) {
    return (
        <div className="flex items-center gap-6 p-8 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {author.name.charAt(0)}
            </div>
            <div>
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Written by</p>
                <p className="font-bold text-xl text-white mb-1">{author.name}</p>
                <p className="text-sm text-blue-400">{author.role}</p>
            </div>
        </div>
    );
}

export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return null;

    return (
        <section className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-xs text-blue-400 uppercase tracking-wider mb-3">{post.category}</p>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3 leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                            <span className="flex items-center text-sm font-medium text-white mt-auto group-hover:translate-x-1 transition-transform">
                                Read Article <ArrowRight className="ml-2 w-4 h-4" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
