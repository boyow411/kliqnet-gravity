"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

function estimateReadingTime(content: string): string {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
}

export default function EditBlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "Engineering",
        authorName: "",
        authorRole: "",
        date: "",
        published: false,
    });

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`/api/admin/blog/${id}`);
            if (res.ok) {
                const post = await res.json();
                setForm({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    category: post.category,
                    authorName: post.authorName,
                    authorRole: post.authorRole,
                    date: post.date,
                    published: post.published,
                });
            } else {
                setError("Post not found");
            }
            setLoading(false);
        }
        fetchPost();
    }, [id]);

    function updateField(field: string, value: string | boolean) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);

        const res = await fetch(`/api/admin/blog/${id}`, {
            method: "PUT",
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
            setError(data.error || "Failed to update post");
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this blog post?")) return;
        const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
        if (res.ok) router.push("/admin/blog");
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pt-8 lg:pt-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Edit Post
                    </h1>
                </div>
                <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm rounded-lg transition-all"
                >
                    <Trash2 className="w-4 h-4" /> Delete
                </button>
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
                            type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)} required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
                        <input
                            type="text" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
                        <textarea
                            value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} required rows={2}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm resize-y"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Content (Markdown)</label>
                        <textarea
                            value={form.content} onChange={(e) => updateField("content", e.target.value)} required rows={16}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm font-mono resize-y"
                        />
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                            <select
                                value={form.category} onChange={(e) => updateField("category", e.target.value)}
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
                                type="text" value={form.date} onChange={(e) => updateField("date", e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Name</label>
                            <input
                                type="text" value={form.authorName} onChange={(e) => updateField("authorName", e.target.value)} required
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Author Role</label>
                            <input
                                type="text" value={form.authorRole} onChange={(e) => updateField("authorRole", e.target.value)} required
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox" checked={form.published} onChange={(e) => updateField("published", e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-600 focus:ring-blue-500/30"
                        />
                        <span className="text-sm text-gray-300">Published</span>
                    </label>
                    <button
                        type="submit" disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? "Saving..." : "Update Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
