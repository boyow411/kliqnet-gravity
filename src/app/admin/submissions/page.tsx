"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Search,
    Download,
    Clock,
    MessageSquare,
    Trash2,
    X,
    ChevronDown,
} from "lucide-react";

interface Submission {
    id: number;
    name: string;
    email: string;
    company: string | null;
    budget: string | null;
    projectType: string | null;
    timeline: string | null;
    businessStage: string | null;
    message: string;
    status: string;
    notes: string | null;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    read: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    replied: "bg-green-500/15 text-green-400 border-green-500/20",
    archived: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
};

function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusColors[status] || statusColors.new}`}>
            {status}
        </span>
    );
}

export default function AdminSubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [notes, setNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);

    const fetchSubmissions = useCallback(async (pageNum = 1, searchQuery = "", status = "") => {
        setLoading(true);
        const params = new URLSearchParams({
            page: String(pageNum),
            search: searchQuery,
            ...(status ? { status } : {}),
        });
        const res = await fetch(`/api/admin/submissions?${params}`);
        if (res.ok) {
            const data = await res.json();
            setSubmissions(data.submissions);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSubmissions(page, search, statusFilter);
    }, [page, statusFilter, fetchSubmissions]);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setPage(1);
        fetchSubmissions(1, search, statusFilter);
    }

    async function updateStatus(id: number, newStatus: string) {
        const res = await fetch(`/api/admin/submissions/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
            fetchSubmissions(page, search, statusFilter);
            if (selectedSubmission?.id === id) {
                setSelectedSubmission((prev) => prev ? { ...prev, status: newStatus } : null);
            }
        }
    }

    async function saveNotes() {
        if (!selectedSubmission) return;
        setSavingNotes(true);
        const res = await fetch(`/api/admin/submissions/${selectedSubmission.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes }),
        });
        if (res.ok) {
            setSelectedSubmission((prev) => prev ? { ...prev, notes } : null);
        }
        setSavingNotes(false);
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this submission permanently?")) return;
        const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
        if (res.ok) {
            fetchSubmissions(page, search, statusFilter);
            if (selectedSubmission?.id === id) setSelectedSubmission(null);
        }
    }

    function handleCSVExport() {
        const headers = ["Name", "Email", "Company", "Project Type", "Budget", "Timeline", "Stage", "Message", "Status", "Date"];
        const rows = submissions.map((s) => [
            s.name, s.email, s.company || "", s.projectType || "", s.budget || "",
            s.timeline || "", s.businessStage || "", s.message.replace(/"/g, '""'), s.status,
            new Date(s.createdAt).toLocaleDateString(),
        ]);
        const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `kliqnet-submissions-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function openDetail(sub: Submission) {
        setSelectedSubmission(sub);
        setNotes(sub.notes || "");
        if (sub.status === "new") updateStatus(sub.id, "read");
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 lg:pt-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Contact Submissions</h1>
                    <p className="text-sm text-gray-500 mt-1">{total} total submission{total !== 1 ? "s" : ""}</p>
                </div>
                <button
                    onClick={handleCSVExport}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, or company..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
                        Search
                    </button>
                </form>
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-blue-500/50 outline-none"
                >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
                ) : submissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No submissions found.</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/8">
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Contact</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Project</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Budget</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Date</th>
                                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {submissions.map((sub) => (
                                <tr
                                    key={sub.id}
                                    onClick={() => openDetail(sub)}
                                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                                >
                                    <td className="px-5 py-3">
                                        <div className="text-sm font-medium text-white">{sub.name}</div>
                                        <div className="text-xs text-gray-500">{sub.email}</div>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-gray-400 hidden md:table-cell">{sub.projectType || "—"}</td>
                                    <td className="px-5 py-3 text-sm text-gray-400 hidden lg:table-cell">{sub.budget || "—"}</td>
                                    <td className="px-5 py-3 text-sm text-gray-500 hidden sm:table-cell">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3"><StatusBadge status={sub.status} /></td>
                                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-1">
                                            <div className="relative group">
                                                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all">
                                                    <ChevronDown className="w-4 h-4" />
                                                </button>
                                                <div className="absolute right-0 top-full mt-1 bg-[#0f0f15] border border-white/10 rounded-lg shadow-xl z-10 hidden group-hover:block min-w-[140px]">
                                                    {["new", "read", "replied", "archived"].map((s) => (
                                                        <button
                                                            key={s}
                                                            onClick={() => updateStatus(sub.id, s)}
                                                            className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg capitalize"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(sub.id)}
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

            {/* Detail Side Panel */}
            {selectedSubmission && (
                <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelectedSubmission(null)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div
                        className="relative w-full max-w-lg bg-[#0a0a0f] border-l border-white/8 h-full overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Submission Detail</h2>
                                <button onClick={() => setSelectedSubmission(null)}
                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Contact</span>
                                    <p className="text-white font-medium mt-1">{selectedSubmission.name}</p>
                                    <p className="text-sm text-gray-400">{selectedSubmission.email}</p>
                                    {selectedSubmission.company && (
                                        <p className="text-sm text-gray-500">{selectedSubmission.company}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Project Type</span>
                                        <p className="text-sm text-white mt-1">{selectedSubmission.projectType || "—"}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Budget</span>
                                        <p className="text-sm text-white mt-1">{selectedSubmission.budget || "—"}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Timeline</span>
                                        <p className="text-sm text-white mt-1">{selectedSubmission.timeline || "—"}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Stage</span>
                                        <p className="text-sm text-white mt-1">{selectedSubmission.businessStage || "—"}</p>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Message</span>
                                    <div className="mt-1 bg-white/5 border border-white/8 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap">
                                        {selectedSubmission.message}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Status</span>
                                    <div className="flex gap-2 mt-2">
                                        {["new", "read", "replied", "archived"].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => updateStatus(selectedSubmission.id, s)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize ${selectedSubmission.status === s
                                                        ? statusColors[s]
                                                        : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                            <MessageSquare className="w-3 h-3" /> Admin Notes
                                        </span>
                                        <button
                                            onClick={saveNotes}
                                            disabled={savingNotes}
                                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            {savingNotes ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={4}
                                        placeholder="Add internal notes about this submission..."
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none text-sm resize-y"
                                    />
                                </div>

                                <div>
                                    <span className="text-xs text-gray-500">
                                        Submitted on {new Date(selectedSubmission.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
