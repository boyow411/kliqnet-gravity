"use client";

/* ═══════════════════════════════════════════════════════════════
   Field Renderer — Renders a single field based on type
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef } from "react";
import type { TemplateField } from "@/modules/onboarding/types";
import { Upload, X, Check, FileText, Loader2 } from "lucide-react";

interface FieldRendererProps {
    field: TemplateField;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    error?: string;
    uploadToken?: string;
}

export function FieldRenderer({ field, value, onChange, onBlur, error, uploadToken }: FieldRendererProps) {
    const baseInputClass = `
        w-full px-4 py-3 rounded-xl border bg-white/[0.03] text-white
        placeholder:text-gray-500 transition-all duration-200 outline-none
        focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50
        ${error ? "border-red-500/50" : "border-white/10 hover:border-white/20"}
    `;

    switch (field.type) {
        case "text":
            return (
                <div>
                    <FieldLabel field={field} />
                    <input
                        type="text"
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder={field.placeholder}
                        className={baseInputClass}
                    />
                    {error && <FieldError error={error} />}
                </div>
            );

        case "textarea":
            return (
                <div>
                    <FieldLabel field={field} />
                    <textarea
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder={field.placeholder}
                        rows={4}
                        className={`${baseInputClass} resize-y min-h-[100px]`}
                    />
                    {error && <FieldError error={error} />}
                </div>
            );

        case "select":
            return (
                <div>
                    <FieldLabel field={field} />
                    <select
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className={`${baseInputClass} appearance-none cursor-pointer`}
                    >
                        <option value="" className="bg-gray-900">Select...</option>
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-gray-900">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {error && <FieldError error={error} />}
                </div>
            );

        case "multi-select":
            return (
                <div>
                    <FieldLabel field={field} />
                    <MultiSelectField
                        options={field.options || []}
                        value={(value as string[]) || []}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {error && <FieldError error={error} />}
                </div>
            );

        case "number":
            return (
                <div>
                    <FieldLabel field={field} />
                    <input
                        type="number"
                        value={(value as number) ?? ""}
                        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
                        onBlur={onBlur}
                        placeholder={field.placeholder}
                        min={field.validation?.min}
                        max={field.validation?.max}
                        className={baseInputClass}
                    />
                    {error && <FieldError error={error} />}
                </div>
            );

        case "date":
            return (
                <div>
                    <FieldLabel field={field} />
                    <input
                        type="date"
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className={`${baseInputClass} [color-scheme:dark]`}
                    />
                    {error && <FieldError error={error} />}
                </div>
            );

        case "boolean":
            return (
                <div>
                    <FieldLabel field={field} />
                    <BooleanField value={value as boolean} onChange={onChange} onBlur={onBlur} />
                    {error && <FieldError error={error} />}
                </div>
            );

        case "file":
            return (
                <div>
                    <FieldLabel field={field} />
                    <FileUploadField
                        value={value as string}
                        onChange={onChange}
                        onBlur={onBlur}
                        uploadToken={uploadToken || ""}
                        validation={field.validation}
                    />
                    {error && <FieldError error={error} />}
                </div>
            );

        default:
            return null;
    }
}

/* ─── Sub-components ──────────────────────────────────────────── */

function FieldLabel({ field }: { field: TemplateField }) {
    return (
        <div className="mb-2">
            <label className="text-sm font-medium text-gray-200">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {field.helpText && (
                <p className="text-xs text-gray-500 mt-0.5">{field.helpText}</p>
            )}
        </div>
    );
}

function FieldError({ error }: { error: string }) {
    return <p className="text-xs text-red-400 mt-1.5">{error}</p>;
}

function MultiSelectField({
    options,
    value,
    onChange,
    onBlur,
}: {
    options: { label: string; value: string }[];
    value: string[];
    onChange: (value: unknown) => void;
    onBlur: () => void;
}) {
    const toggle = (optValue: string) => {
        const next = value.includes(optValue)
            ? value.filter((v) => v !== optValue)
            : [...value, optValue];
        onChange(next);
        onBlur();
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
                const selected = value.includes(opt.value);
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggle(opt.value)}
                        className={`
                            px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                            ${selected
                                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                                : "bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300"
                            }
                        `}
                    >
                        {selected && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

function BooleanField({
    value,
    onChange,
    onBlur,
}: {
    value: boolean;
    onChange: (value: unknown) => void;
    onBlur: () => void;
}) {
    return (
        <div className="flex gap-3">
            {["Yes", "No"].map((label) => {
                const isSelected = label === "Yes" ? value === true : value === false;
                return (
                    <button
                        key={label}
                        type="button"
                        onClick={() => { onChange(label === "Yes"); onBlur(); }}
                        className={`
                            flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200
                            ${isSelected
                                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                                : "bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20"
                            }
                        `}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

function FileUploadField({
    value,
    onChange,
    onBlur,
    uploadToken,
    validation,
}: {
    value: string;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    uploadToken: string;
    validation?: TemplateField["validation"];
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        setError(null);
        setUploading(true);

        try {
            // Client-side validation
            if (validation?.fileTypes && !validation.fileTypes.includes(file.type)) {
                throw new Error("File type not supported");
            }
            if (validation?.maxFileSize && file.size > validation.maxFileSize) {
                throw new Error(`File too large (max ${Math.round(validation.maxFileSize / 1024 / 1024)}MB)`);
            }

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`/api/onboarding/${uploadToken}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Upload failed");
            }

            const data = await res.json();
            onChange(data.url);
            onBlur();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    if (value) {
        return (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-sm text-gray-300 truncate flex-1">{value}</span>
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="p-1 rounded-lg hover:bg-white/10 text-gray-500 hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div>
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                className={`
                    flex items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed
                    cursor-pointer transition-all duration-200
                    ${uploading
                        ? "border-blue-500/30 bg-blue-500/5 pointer-events-none"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                    }
                `}
            >
                {uploading ? (
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                ) : (
                    <Upload className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-sm text-gray-400">
                    {uploading ? "Uploading..." : "Click to upload"}
                </span>
            </div>
            {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={validation?.fileTypes?.join(",")}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                }}
            />
        </div>
    );
}
