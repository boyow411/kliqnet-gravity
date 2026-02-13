"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllIndustryTags } from "@/data/projects";
import type { Project } from "@/data/projects";

const categories = ["All", "Venture Studio", "Client Transformation"] as const;

type FiltersBarProps = {
    projects: Project[];
    onFilter: (filtered: Project[]) => void;
};

export function FiltersBar({ projects, onFilter }: FiltersBarProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [activeTag, setActiveTag] = useState<string>("All");
    const [search, setSearch] = useState("");

    const industryTags = useMemo(() => getAllIndustryTags(), []);

    const applyFilters = (cat: string, tag: string, q: string) => {
        let filtered = [...projects];

        if (cat !== "All") {
            filtered = filtered.filter((p) => p.category === cat);
        }
        if (tag !== "All") {
            filtered = filtered.filter((p) => p.industryTags.includes(tag));
        }
        if (q.trim()) {
            const query = q.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.shortDescription.toLowerCase().includes(query) ||
                    p.industryTags.some((t) => t.toLowerCase().includes(query))
            );
        }

        onFilter(filtered);
    };

    const handleCategory = (cat: string) => {
        setActiveCategory(cat);
        applyFilters(cat, activeTag, search);
    };

    const handleTag = (tag: string) => {
        setActiveTag(tag);
        applyFilters(activeCategory, tag, search);
    };

    const handleSearch = (q: string) => {
        setSearch(q);
        applyFilters(activeCategory, activeTag, q);
    };

    return (
        <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
            </div>

            {/* Category + Tag chips */}
            <div className="flex flex-wrap gap-6 pb-6 border-b border-white/[0.06]">
                <div className="space-y-3">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600">
                        Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all border cursor-pointer",
                                    activeCategory === cat
                                        ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                        : "border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:border-white/[0.12]"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600">
                        Industry
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleTag("All")}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all border cursor-pointer",
                                activeTag === "All"
                                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                    : "border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:border-white/[0.12]"
                            )}
                        >
                            All
                        </button>
                        {industryTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => handleTag(tag)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all border cursor-pointer",
                                    activeTag === tag
                                        ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                        : "border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:border-white/[0.12]"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
