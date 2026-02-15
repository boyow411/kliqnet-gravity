"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, ExternalLink } from "lucide-react";

interface Project {
    id: number;
    slug: string;
    name: string;
    category: string;
    status: string;
    tagline: string;
    published: boolean;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    async function fetchProjects(pageNum = 1, searchQuery = "", cat = "") {
        setLoading(true);
        const params = new URLSearchParams({
            page: String(pageNum),
            search: searchQuery,
            ...(cat ? { category: cat } : {}),
        });
        const res = await fetch(`/api/admin/projects?${params}`);
        if (res.ok) {
            const data = await res.json();
            setProjects(data.projects);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProjects(page, search, categoryFilter);
    }, [page, categoryFilter]);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setPage(1);
        fetchProjects(1, search, categoryFilter);
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this project?")) return;
        const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
        if (res.ok) fetchProjects(page, search, categoryFilter);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 lg:pt-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
                    <p className="text-sm text-gray-500 mt-1">{total} case stud{total !== 1 ? "ies" : "y"}</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                >
                    <Plus className="w-4 h-4" /> New Project
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
                        Search
                    </button>
                </form>
                <select
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500/50 outline-none"
                >
                    <option value="">All Categories</option>
                    <option value="Venture Studio">Venture Studio</option>
                    <option value="Client Transformation">Client Transformation</option>
                </select>
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
                ) : projects.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No projects found.</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/8">
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Name</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Category</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Status</th>
                                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="text-sm font-medium text-white">{project.name}</div>
                                        <div className="text-xs text-gray-600">{project.tagline}</div>
                                    </td>
                                    <td className="px-5 py-3 hidden md:table-cell">
                                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${project.category === "Venture Studio"
                                                ? "bg-purple-500/15 text-purple-400 border-purple-500/20"
                                                : "bg-blue-500/15 text-blue-400 border-blue-500/20"
                                            }`}>
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-gray-400 hidden sm:table-cell">
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === "Live" ? "bg-green-400" : "bg-yellow-400"}`} />
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/work/${project.slug}`}
                                                target="_blank"
                                                className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-md transition-all"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
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

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                        className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                        Previous
                    </button>
                    <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                    <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
