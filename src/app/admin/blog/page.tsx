"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    category: string;
    date: string;
    published: boolean;
    createdAt: string;
}

function StatusBadge({ published }: { published: boolean }) {
    return published ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/20">
            <Eye className="w-3 h-3" /> Published
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
            <EyeOff className="w-3 h-3" /> Draft
        </span>
    );
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    async function fetchPosts(pageNum = 1, searchQuery = "") {
        setLoading(true);
        const params = new URLSearchParams({ page: String(pageNum), search: searchQuery });
        const res = await fetch(`/api/admin/blog?${params}`);
        if (res.ok) {
            const data = await res.json();
            setPosts(data.posts);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPosts(page, search);
    }, [page]);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setPage(1);
        fetchPosts(1, search);
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this blog post?")) return;
        const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
        if (res.ok) fetchPosts(page, search);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 lg:pt-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Blog Posts
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {total} total post{total !== 1 ? "s" : ""}
                    </p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                >
                    <Plus className="w-4 h-4" /> New Post
                </Link>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search posts..."
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
                >
                    Search
                </button>
            </form>

            {/* Table */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No blog posts found. Create your first post to get started.
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/8">
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                                    Title
                                </th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                                    Category
                                </th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                                    Date
                                </th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                                    Status
                                </th>
                                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="text-sm font-medium text-white">{post.title}</div>
                                        <div className="text-xs text-gray-600">/{post.slug}</div>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-gray-400 hidden md:table-cell">
                                        {post.category}
                                    </td>
                                    <td className="px-5 py-3 text-sm text-gray-500 hidden sm:table-cell">
                                        {post.date}
                                    </td>
                                    <td className="px-5 py-3">
                                        <StatusBadge published={post.published} />
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/admin/blog/${post.id}/edit`}
                                                className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
