"use client";

/* ═══════════════════════════════════════════════════════════════
   Admin: Project Detail — Full view with responses, files, milestones
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
    ArrowLeft, Loader2, Copy, ExternalLink, Check,
    FileText, Target, ListTodo, AlertTriangle,
    CheckCircle2, Clock, Circle,
} from "lucide-react";
import type { RiskScore, TemplateStep, TemplateSteps } from "@/modules/onboarding/types";

interface ProjectDetail {
    project: {
        id: number;
        name: string;
        serviceType: string;
        status: string;
        createdAt: string;
    };
    client: { companyName: string; contactName: string; email: string; phone: string } | null;
    session: {
        id: number;
        token: string;
        status: string;
        completionPercentage: number;
        expiresAt: string;
    } | null;
    templateSteps: TemplateSteps | null;
    responses: Record<string, { fieldId: string; value: unknown }[]> | null;
    files: { id: number; fileName: string; url: string; fileType: string; createdAt: string }[] | null;
    riskScore: RiskScore | null;
    milestones: { id: number; title: string; description: string; status: string; dueDate: string; sortOrder: number }[];
    tasks: { id: number; title: string; status: string; milestoneId: number | null; sortOrder: number }[];
}

const RISK_STYLES: Record<string, string> = {
    LOW: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    MEDIUM: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    HIGH: "bg-red-500/15 text-red-400 border-red-500/20",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
    PENDING: <Circle className="w-3.5 h-3.5 text-gray-500" />,
    TODO: <Circle className="w-3.5 h-3.5 text-gray-500" />,
    IN_PROGRESS: <Clock className="w-3.5 h-3.5 text-amber-400" />,
    COMPLETED: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
    BLOCKED: <AlertTriangle className="w-3.5 h-3.5 text-red-400" />,
    OVERDUE: <AlertTriangle className="w-3.5 h-3.5 text-red-400" />,
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [data, setData] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/admin/onboarding-projects/${id}`);
                if (res.ok) setData(await res.json());
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const copyLink = () => {
        if (data?.session) {
            navigator.clipboard.writeText(`${window.location.origin}/onboarding/${data.session.token}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
        );
    }

    if (!data) {
        return <p className="text-gray-400 text-center py-20">Project not found</p>;
    }

    const { project, client, session, templateSteps, responses, files, riskScore, milestones, tasks } = data;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link href="/admin/onboarding" className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 mb-3">
                        <ArrowLeft className="w-3 h-3" /> Back to Projects
                    </Link>
                    <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-400">{project.serviceType}</span>
                        {riskScore && (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${RISK_STYLES[riskScore.level]}`}>
                                {riskScore.level === "HIGH" && <AlertTriangle className="w-3 h-3" />}
                                Risk: {riskScore.level} ({riskScore.score})
                            </span>
                        )}
                    </div>
                </div>

                {session && (
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium
                            border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy Onboarding Link"}
                    </button>
                )}
            </div>

            {/* Top cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Client */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Client</h3>
                    {client ? (
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-white">{client.companyName}</p>
                            <p className="text-xs text-gray-400">{client.contactName}</p>
                            <p className="text-xs text-gray-500">{client.email}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">No client</p>
                    )}
                </div>

                {/* Session */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Onboarding</h3>
                    {session ? (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Status</span>
                                <span className="text-xs text-white font-medium">{session.status}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Completion</span>
                                <span className="text-xs text-white font-mono">{session.completionPercentage}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${session.completionPercentage}%` }} />
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">No session</p>
                    )}
                </div>

                {/* Risk */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Risk Factors</h3>
                    {riskScore && riskScore.factors.length > 0 ? (
                        <ul className="space-y-1.5">
                            {riskScore.factors.map((f, i) => (
                                <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                                    <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xs text-emerald-400">No risk factors detected</p>
                    )}
                </div>
            </div>

            {/* Onboarding Responses */}
            {templateSteps && responses && (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <h3 className="text-sm font-semibold text-white">Onboarding Responses</h3>
                    </div>
                    <div className="space-y-6">
                        {(templateSteps as TemplateStep[]).map((step) => (
                            <div key={step.id}>
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{step.title}</h4>
                                <div className="space-y-2">
                                    {step.fields.map((field) => {
                                        const stepResponses = responses[step.id] || [];
                                        const response = stepResponses.find((r) => r.fieldId === field.id);
                                        const value = response?.value;

                                        return (
                                            <div key={field.id} className="flex items-start gap-4 py-2">
                                                <span className="text-xs text-gray-500 w-40 shrink-0">{field.label}</span>
                                                <span className="text-sm text-gray-300">
                                                    {value === undefined || value === null || value === ""
                                                        ? "—"
                                                        : Array.isArray(value)
                                                            ? value.join(", ")
                                                            : typeof value === "boolean"
                                                                ? value ? "Yes" : "No"
                                                                : String(value)
                                                    }
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Uploaded Files */}
            {files && files.length > 0 && (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <h3 className="text-sm font-semibold text-white">Uploaded Files</h3>
                    </div>
                    <div className="space-y-2">
                        {files.map((file) => (
                            <a
                                key={file.id}
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5
                                    hover:bg-white/[0.03] transition-colors group"
                            >
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-300 flex-1 truncate">{file.fileName}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400" />
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Milestones & Tasks */}
            {milestones.length > 0 && (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <Target className="w-4 h-4 text-blue-400" />
                        <h3 className="text-sm font-semibold text-white">Milestones & Tasks</h3>
                    </div>
                    <div className="space-y-6">
                        {milestones
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((ms) => (
                                <div key={ms.id}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {STATUS_ICONS[ms.status] || STATUS_ICONS.PENDING}
                                        <span className="text-sm font-medium text-white">{ms.title}</span>
                                        {ms.dueDate && (
                                            <span className="text-xs text-gray-600 ml-auto">
                                                Due {new Date(ms.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    {ms.description && (
                                        <p className="text-xs text-gray-500 ml-5.5 mb-2">{ms.description}</p>
                                    )}
                                    <div className="ml-5 space-y-1">
                                        {tasks
                                            .filter((t) => t.milestoneId === ms.id)
                                            .sort((a, b) => a.sortOrder - b.sortOrder)
                                            .map((task) => (
                                                <div key={task.id} className="flex items-center gap-2 py-1">
                                                    {STATUS_ICONS[task.status] || STATUS_ICONS.TODO}
                                                    <span className="text-xs text-gray-400">{task.title}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
