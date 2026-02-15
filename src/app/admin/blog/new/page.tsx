"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function estimateReadingTime(content: string): string {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
}

export default function NewBlogPostPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Engineering",
        authorName: "Kliqnet Team",
        authorRole: "Engineering",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        published: false,
    });

    function updateField(field: string, value: string | boolean) {
        setForm((prev) => {
            const updated = { ...prev, [field]: value };
            if (field === "title" && typeof value === "string" && !prev.slug) {
                updated.slug = generateSlug(value);
            }
            return updated;
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);

        const res = await fetch("/api/admin/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                readingTime: estimateReadingTime(form.content),
                relatedSlugs: "",
            }),
        });

        if (res.ok) {
            router.push("/admin/blog");
        } else {
            const data = await res.json();
            setError(data.error || "Failed to create post");
            setSaving(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4 pt-8 lg:pt-4">
                <Link
                    href="/admin/blog"
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    New Blog Post
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm"
                            placeholder="Why Scalable Architecture Matters for Your Startup"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => updateField("slug", e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm font-mono"
                            placeholder="why-scalable-architecture-matters"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => updateField("excerpt", e.target.value)}
                            required
                            rows={2}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm resize-y"
                            placeholder="A short summary for the blog listing page..."
                        />
                    </div>

                    <ImageUpload
                        value={form.coverImage}
                        onChange={(url) => updateField("coverImage", url)}
                        label="Cover Image"
                        description="Drag and drop a cover image or click to browse"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Content <span className="text-gray-600">(Markdown supported)</span>
                        </label>
                        <textarea
                            value={form.content}
                            onChange={(e) => updateField("content", e.target.value)}
                            required
                            rows={16}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm font-mono resize-y"
                            placeholder="## Introduction&#10;&#10;Start writing your blog post here..."
                        />
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                            <select
                                value={form.category}
                                onChange={(e) => updateField("category", e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            >
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                                <option value="AI">AI</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Date</label>
                            <input
                                type="text"
                                value={form.date}
                                onChange={(e) => updateField("date", e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Name</label>
                            <input
                                type="text"
                                value={form.authorName}
                                onChange={(e) => updateField("authorName", e.target.value)}
                                required
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Role</label>
                            <input
                                type="text"
                                value={form.authorRole}
                                onChange={(e) => updateField("authorRole", e.target.value)}
                                required
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) => updateField("published", e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-600 focus:ring-blue-500/30"
                        />
                        <span className="text-sm text-gray-300">Publish immediately</span>
                    </label>
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
