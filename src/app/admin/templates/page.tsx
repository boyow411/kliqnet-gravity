"use client";

/* ═══════════════════════════════════════════════════════════════
   Admin: Template Management — List, create, edit, version
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";
import {
    Plus, Search, Loader2, FileCode, ToggleLeft, ToggleRight,
    Copy, Trash2, Pencil, X, ChevronDown, ChevronUp,
} from "lucide-react";
import type { TemplateStep } from "@/modules/onboarding/types";

interface Template {
    id: number;
    name: string;
    serviceType: string;
    version: number;
    isActive: boolean;
    steps: TemplateStep[];
    createdAt: string;
    updatedAt: string;
}

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        loadTemplates();
    }, []);

    async function loadTemplates() {
        try {
            const res = await fetch("/api/admin/templates");
            if (res.ok) setTemplates(await res.json());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const filteredTemplates = templates.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.serviceType.toLowerCase().includes(search.toLowerCase())
    );

    const toggleActive = async (id: number, current: boolean) => {
        const res = await fetch(`/api/admin/templates/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: !current }),
        });
        if (res.ok) {
            setTemplates((prev) =>
                prev.map((t) => (t.id === id ? { ...t, isActive: !current } : t))
            );
        }
    };

    const createVersion = async (id: number) => {
        const res = await fetch(`/api/admin/templates/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ createVersion: true }),
        });
        if (res.ok) {
            loadTemplates(); // Refresh to show new version
        }
    };

    const deleteTemplate = async (id: number) => {
        if (!confirm("Delete this template? This cannot be undone.")) return;
        const res = await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
        if (res.ok) {
            setTemplates((prev) => prev.filter((t) => t.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Onboarding Templates</h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage onboarding questionnaire templates</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                        bg-blue-500 hover:bg-blue-400 text-white transition-all duration-200"
                >
                    <Plus className="w-4 h-4" />
                    New Template
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search templates..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03]
                        text-white placeholder:text-gray-600 text-sm outline-none focus:border-blue-500/50"
                />
            </div>

            {/* Templates */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
            ) : filteredTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <FileCode className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">No templates yet</p>
                    <p className="text-gray-600 text-xs">Create your first template to start onboarding clients</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            expanded={editingId === template.id}
                            onToggleExpand={() => setEditingId(editingId === template.id ? null : template.id)}
                            onToggleActive={() => toggleActive(template.id, template.isActive)}
                            onCreateVersion={() => createVersion(template.id)}
                            onDelete={() => deleteTemplate(template.id)}
                            onUpdated={loadTemplates}
                        />
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showCreate && (
                <CreateTemplateModal
                    onClose={() => setShowCreate(false)}
                    onCreated={() => {
                        setShowCreate(false);
                        loadTemplates();
                    }}
                />
            )}
        </div>
    );
}

/* ─── Template Card ──────────────────────────────────────────── */

function TemplateCard({
    template,
    expanded,
    onToggleExpand,
    onToggleActive,
    onCreateVersion,
    onDelete,
    onUpdated,
}: {
    template: Template;
    expanded: boolean;
    onToggleExpand: () => void;
    onToggleActive: () => void;
    onCreateVersion: () => void;
    onDelete: () => void;
    onUpdated: () => void;
}) {
    return (
        <div className="border border-white/5 rounded-2xl overflow-hidden">
            {/* Header row */}
            <div
                className="flex items-center px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={onToggleExpand}
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-white truncate">{template.name}</h3>
                        <span className="text-xs text-gray-500 font-mono">v{template.version}</span>
                        <span className={`
                            inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium
                            ${template.isActive
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-gray-500/15 text-gray-500"
                            }
                        `}>
                            {template.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        {template.serviceType} · {template.steps.length} step(s) · {template.steps.reduce((c, s) => c + s.fields.length, 0)} field(s)
                    </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleActive(); }}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        title={template.isActive ? "Deactivate" : "Activate"}
                    >
                        {template.isActive
                            ? <ToggleRight className="w-5 h-5 text-emerald-400" />
                            : <ToggleLeft className="w-5 h-5" />
                        }
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onCreateVersion(); }}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        title="Create new version"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    {expanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
            </div>

            {/* Expanded step/field preview */}
            {expanded && (
                <div className="border-t border-white/5 px-5 py-4 bg-white/[0.01]">
                    <div className="space-y-4">
                        {template.steps.map((step, i) => (
                            <div key={step.id}>
                                <h4 className="text-xs font-medium text-gray-400 mb-2">
                                    Step {i + 1}: {step.title}
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {step.fields.map((field) => (
                                        <div key={field.id} className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                                            <p className="text-xs text-gray-300 truncate">{field.label}</p>
                                            <p className="text-[10px] text-gray-600 mt-0.5">
                                                {field.type}{field.required ? " · required" : ""}
                                            </p>
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

/* ─── Create Template Modal ──────────────────────────────────── */

function CreateTemplateModal({
    onClose,
    onCreated,
}: {
    onClose: () => void;
    onCreated: () => void;
}) {
    const [form, setForm] = useState({
        name: "",
        serviceType: "",
        stepsJson: JSON.stringify(
            [
                {
                    id: "step_1",
                    title: "Getting Started",
                    description: "Basic information",
                    fields: [
                        { id: "field_1", label: "Your Name", type: "text", required: true },
                    ],
                },
            ],
            null,
            2
        ),
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        let steps;
        try {
            steps = JSON.parse(form.stepsJson);
        } catch {
            setError("Invalid JSON in steps");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/admin/templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    serviceType: form.serviceType,
                    steps,
                }),
            });

            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error);
            }

            onCreated();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03]
        text-white placeholder:text-gray-600 text-sm outline-none focus:border-blue-500/50`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white">New Template</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Template Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. E-Commerce Onboarding"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Type</label>
                        <select
                            value={form.serviceType}
                            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                            className={`${inputClass} appearance-none cursor-pointer`}
                            required
                        >
                            <option value="" className="bg-gray-900">Select...</option>
                            <option value="web-development" className="bg-gray-900">Web Development</option>
                            <option value="app-development" className="bg-gray-900">App Development</option>
                            <option value="ecommerce" className="bg-gray-900">E-Commerce</option>
                            <option value="saas" className="bg-gray-900">SaaS Platform</option>
                            <option value="branding" className="bg-gray-900">Branding</option>
                            <option value="consulting" className="bg-gray-900">Consulting</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Steps (JSON)</label>
                        <textarea
                            value={form.stepsJson}
                            onChange={(e) => setForm({ ...form, stepsJson: e.target.value })}
                            rows={12}
                            className={`${inputClass} font-mono text-xs`}
                        />
                    </div>

                    {error && <p className="text-xs text-red-400">{error}</p>}

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
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                                bg-blue-500 hover:bg-blue-400 text-white transition-all disabled:opacity-50"
                        >
                            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            Create Template
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
