"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FileText,
    Briefcase,
    Inbox,
    TrendingUp,
    Plus,
    ArrowRight,
    Clock,
    Eye,
} from "lucide-react";

interface DashboardStats {
    totalBlogPosts: number;
    publishedBlogPosts: number;
    totalProjects: number;
    totalSubmissions: number;
    unreadSubmissions: number;
}

interface RecentSubmission {
    id: number;
    name: string;
    email: string;
    projectType: string;
    status: string;
    createdAt: string;
}

function StatCard({
    label,
    value,
    subValue,
    icon: Icon,
    href,
    accent,
}: {
    label: string;
    value: number | string;
    subValue?: string;
    icon: React.ElementType;
    href: string;
    accent: string;
}) {
    return (
        <Link
            href={href}
            className="group bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:border-white/15 transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15` }}
                >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
            {subValue && (
                <div className="text-xs text-gray-600 mt-1">{subValue}</div>
            )}
        </Link>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        read: "bg-gray-500/15 text-gray-400 border-gray-500/20",
        replied: "bg-green-500/15 text-green-400 border-green-500/20",
        archived: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    };
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colors[status] || colors.new}`}
        >
            {status}
        </span>
    );
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsRes, subsRes] = await Promise.all([
                    fetch("/api/admin/stats"),
                    fetch("/api/admin/submissions?limit=5"),
                ]);
                if (statsRes.ok) setStats(await statsRes.json());
                if (subsRes.ok) {
                    const data = await subsRes.json();
                    setRecentSubmissions(data.submissions || []);
                }
            } catch {
                // Gracefully degrade
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="pt-8 lg:pt-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Overview of your site content and submissions
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Blog Posts"
                    value={stats?.totalBlogPosts ?? "—"}
                    subValue={stats ? `${stats.publishedBlogPosts} published` : undefined}
                    icon={FileText}
                    href="/admin/blog"
                    accent="#3b82f6"
                />
                <StatCard
                    label="Projects"
                    value={stats?.totalProjects ?? "—"}
                    icon={Briefcase}
                    href="/admin/projects"
                    accent="#8b5cf6"
                />
                <StatCard
                    label="Submissions"
                    value={stats?.totalSubmissions ?? "—"}
                    subValue={
                        stats?.unreadSubmissions
                            ? `${stats.unreadSubmissions} unread`
                            : undefined
                    }
                    icon={Inbox}
                    href="/admin/submissions"
                    accent="#10b981"
                />
                <StatCard
                    label="Conversion"
                    value="—"
                    subValue="Coming soon"
                    icon={TrendingUp}
                    href="/admin"
                    accent="#f59e0b"
                />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
                <Link
                    href="/admin/blog/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" /> New Blog Post
                </Link>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                    <Plus className="w-4 h-4" /> New Project
                </Link>
                <Link
                    href="/admin/submissions"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                    <Eye className="w-4 h-4" /> View Submissions
                </Link>
            </div>

            {/* Recent Submissions */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                        Recent Submissions
                    </h2>
                    <Link
                        href="/admin/submissions"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View all →
                    </Link>
                </div>
                <div className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            Loading...
                        </div>
                    ) : recentSubmissions.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No submissions yet. They&apos;ll appear here when someone
                            submits the contact form.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/8">
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                                        Name
                                    </th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                                        Project Type
                                    </th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                                        Date
                                    </th>
                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentSubmissions.map((sub) => (
                                    <tr
                                        key={sub.id}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-5 py-3">
                                            <div className="text-sm font-medium text-white">
                                                {sub.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {sub.email}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-gray-400 hidden sm:table-cell">
                                            {sub.projectType || "—"}
                                        </td>
                                        <td className="px-5 py-3 text-sm text-gray-500 hidden md:table-cell">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(sub.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <StatusBadge status={sub.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
