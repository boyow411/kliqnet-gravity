"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-posts";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";

type BlogListProps = {
    posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories
    const categories = ["All", ...new Set(posts.map((post) => post.category))];

    // Filter posts
    const filteredPosts =
        selectedCategory === "All"
            ? posts
            : posts.filter((post) => post.category === selectedCategory);

    // Featured post is the first one, but only shown prominently when "All" is selected
    const featuredPost = selectedCategory === "All" ? filteredPosts[0] : null;
    const gridPosts = selectedCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="space-y-12">
                {/* Featured Post */}
                <AnimatePresence mode="wait">
                    {featuredPost && (
                        <motion.div
                            key="featured"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                href={`/blog/${featuredPost.slug}`}
                                className="group relative block bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all"
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="relative h-64 md:h-full min-h-[400px] overflow-hidden">
                                        <Image
                                            src={featuredPost.coverImage}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
                                                {featuredPost.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Clock className="w-4 h-4" /> {featuredPost.readingTime}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-blue-200 transition-colors leading-tight">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-gray-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform">
                                            Read Article <ArrowRight className="ml-2 w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Grid Posts */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {gridPosts.map((post) => (
                            <motion.div
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                                                <Clock className="w-3 h-3" /> {post.readingTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                            <span className="text-xs text-gray-500">{post.date}</span>
                                            <span className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                                                Read <ArrowRight className="ml-1 w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No articles found in this category.</p>
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className="mt-4 text-blue-400 hover:text-blue-300 underline"
                        >
                            View all articles
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
