"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { ImageUpload, MultiImageUpload } from "@/components/admin/image-upload";

function generateSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function NewProjectPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        slug: "",
        category: "Venture Studio" as string,
        industryTags: "",
        status: "Live" as string,
        tagline: "",
        shortDescription: "",
        primaryUrl: "",
        published: true,
        featured: false,
    });

    const [coverImage, setCoverImage] = useState("");
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    function updateField(field: string, value: string | boolean) {
        setForm((prev) => {
            const updated = { ...prev, [field]: value };
            if (field === "name" && typeof value === "string" && !prev.slug) {
                updated.slug = generateSlug(value);
            }
            return updated;
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);

        const res = await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                data: {
                    coverImage,
                    screenshots: galleryImages,
                },
            }),
        });

        if (res.ok) {
            router.push("/admin/projects");
        } else {
            const data = await res.json();
            setError(data.error || "Failed to create project");
            setSaving(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4 pt-8 lg:pt-4">
                <Link href="/admin/projects" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-2xl font-bold text-white tracking-tight">New Project</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
                )}

                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label>
                        <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            placeholder="Project Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Slug</label>
                        <input type="text" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm font-mono"
                            placeholder="project-name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Tagline</label>
                        <input type="text" value={form.tagline} onChange={(e) => updateField("tagline", e.target.value)} required
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            placeholder="A short, punchy tagline" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Short Description</label>
                        <textarea value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} required rows={3}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm resize-y"
                            placeholder="Brief project overview..." />
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-5">
                    <ImageUpload
                        value={coverImage}
                        onChange={setCoverImage}
                        label="Cover Image"
                        description="Drag and drop a cover image or click to browse"
                    />
                    <MultiImageUpload
                        values={galleryImages}
                        onChange={setGalleryImages}
                        label="Gallery / Screenshots"
                        max={10}
                    />
                </div>

                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                            <select value={form.category} onChange={(e) => updateField("category", e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm">
                                <option value="Venture Studio">Venture Studio</option>
                                <option value="Client Transformation">Client Transformation</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Status</label>
                            <select value={form.status} onChange={(e) => updateField("status", e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm">
                                <option value="Live">Live</option>
                                <option value="In Development">In Development</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Industry Tags (comma-separated)</label>
                        <input type="text" value={form.industryTags} onChange={(e) => updateField("industryTags", e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            placeholder="Fintech, SaaS, AI" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Primary URL</label>
                        <input type="url" value={form.primaryUrl} onChange={(e) => updateField("primaryUrl", e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500/50 outline-none text-sm"
                            placeholder="https://www.example.com" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={form.published} onChange={(e) => updateField("published", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-600" />
                            <span className="text-sm text-gray-300">Published</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-600 bg-white/5 text-blue-600" />
                            <span className="text-sm text-gray-300">Featured</span>
                        </label>
                    </div>
                    <button type="submit" disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? "Saving..." : "Save Project"}
                    </button>
                </div>
            </form>
        </div>
    );
}
