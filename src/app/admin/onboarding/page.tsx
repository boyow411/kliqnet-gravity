"use client";

/* ═══════════════════════════════════════════════════════════════
   Admin: Onboarding Projects — Table with status, completion, risk
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus, Search, ChevronRight, Loader2, Briefcase,
    AlertTriangle, AlertCircle, CheckCircle2, Clock,
} from "lucide-react";

interface Project {
    id: number;
    name: string;
    serviceType: string;
    status: string;
    clientCompany: string | null;
    clientContact: string | null;
    completionPercentage: number | null;
    sessionStatus: string | null;
    createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
    DRAFT: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    ONBOARDING: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    IN_PROGRESS: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    COMPLETED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    ARCHIVED: "bg-gray-500/15 text-gray-500 border-gray-500/20",
};

export default function OnboardingProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showNewModal, setShowNewModal] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/admin/onboarding-projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (e) {
                console.error("Failed to load projects:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filtered = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.clientCompany?.toLowerCase().includes(search.toLowerCase()) ||
        p.serviceType.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Onboarding Projects</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage client projects and onboarding sessions</p>
                </div>
                <button
                    onClick={() => setShowNewModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                        bg-blue-500 hover:bg-blue-400 text-white transition-all duration-200"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03]
                        text-white placeholder:text-gray-600 text-sm outline-none focus:border-blue-500/50"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <Briefcase className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">No projects yet</p>
                    <p className="text-gray-600 text-xs">Create your first project to get started</p>
                </div>
            ) : (
                <div className="border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Project</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Client</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Service</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Completion</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((project) => (
                                <tr
                                    key={project.id}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-white">{project.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-300">{project.clientCompany || "—"}</p>
                                        <p className="text-xs text-gray-500">{project.clientContact}</p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-sm text-gray-400">{project.serviceType}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${STATUS_STYLES[project.status] || STATUS_STYLES.DRAFT}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <CompletionBar percentage={project.completionPercentage || 0} />
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <Link
                                            href={`/admin/onboarding/${project.id}`}
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* New Project Modal */}
            {showNewModal && (
                <NewProjectModal
                    onClose={() => setShowNewModal(false)}
                    onCreated={(p) => {
                        setProjects((prev) => [p, ...prev]);
                        setShowNewModal(false);
                    }}
                />
            )}
        </div>
    );
}

/* ─── Completion Bar ──────────────────────────────────────────── */

function CompletionBar({ percentage }: { percentage: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${percentage === 100
                            ? "bg-emerald-500"
                            : percentage >= 50
                                ? "bg-blue-500"
                                : "bg-amber-500"
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-xs text-gray-500 font-mono w-8">{percentage}%</span>
        </div>
    );
}

/* ─── New Project Modal ──────────────────────────────────────── */

function NewProjectModal({
    onClose,
    onCreated,
}: {
    onClose: () => void;
    onCreated: (project: Project) => void;
}) {
    const [clients, setClients] = useState<{ id: number; companyName: string }[]>([]);
    const [form, setForm] = useState({ clientId: "", name: "", serviceType: "" });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/clients")
            .then((r) => r.json())
            .then(setClients)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.clientId || !form.name || !form.serviceType) {
            setError("All fields are required");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/onboarding-projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientId: Number(form.clientId),
                    name: form.name,
                    serviceType: form.serviceType,
                }),
            });

            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error);
            }

            const data = await res.json();
            onCreated(data.project);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create project");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03]
        text-white placeholder:text-gray-600 text-sm outline-none focus:border-blue-500/50`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-white mb-6">New Onboarding Project</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Client</label>
                        <select
                            value={form.clientId}
                            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value="" className="bg-gray-900">Select client...</option>
                            {clients.map((c) => (
                                <option key={c.id} value={c.id} className="bg-gray-900">{c.companyName}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. Website Redesign"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Type</label>
                        <select
                            value={form.serviceType}
                            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value="" className="bg-gray-900">Select service...</option>
                            <option value="web-development" className="bg-gray-900">Web Development</option>
                            <option value="app-development" className="bg-gray-900">App Development</option>
                            <option value="ecommerce" className="bg-gray-900">E-Commerce</option>
                            <option value="saas" className="bg-gray-900">SaaS Platform</option>
                            <option value="branding" className="bg-gray-900">Branding</option>
                            <option value="consulting" className="bg-gray-900">Consulting</option>
                        </select>
                    </div>

                    {error && (
                        <p className="text-xs text-red-400">{error}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400
                                border border-white/10 hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold
                                bg-blue-500 hover:bg-blue-400 text-white transition-all
                                disabled:opacity-50 disabled:cursor-not-allowed
                                flex items-center justify-center gap-2"
                        >
                            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
