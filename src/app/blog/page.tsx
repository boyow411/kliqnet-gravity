import { blogPosts } from "@/lib/blog-posts";
import { BlogList } from "@/components/blog/blog-list";

export const metadata = {
    title: "Insights & Articles | Kliqnet Digital",
    description: "Thoughts on technology, design, and growth from the Kliqnet Digital team.",
};

export default function BlogPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Insights
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Deep dives into scalable architecture, design systems, and digital strategy.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <BlogList posts={blogPosts} />
                </div>
            </div>
        </div>
    );
}
