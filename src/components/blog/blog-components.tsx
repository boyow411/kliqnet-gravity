import Link from "next/link";
import { BlogPost } from "@/lib/blog-posts";
import { ArrowRight } from "lucide-react";

export function AuthorBlock({ author }: { author: BlogPost["author"] }) {
    return (
        <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {author.name.charAt(0)}
            </div>
            <div>
                <p className="font-semibold text-white">{author.name}</p>
                <p className="text-sm text-gray-400">{author.role}</p>
            </div>
        </div>
    );
}

export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return null;

    return (
        <section className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all"
                    >
                        <p className="text-xs text-blue-400 uppercase tracking-wider mb-2">{post.category}</p>
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                        <span className="flex items-center text-sm text-white mt-4 group-hover:translate-x-1 transition-transform">
                            Read more <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
