"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
}

export function ImageUpload({
    value,
    onChange,
    label = "Cover Image",
    description = "Drag and drop an image or click to browse",
}: ImageUploadProps) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFile = useCallback(
        async (file: File) => {
            setError("");
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    onChange(data.url);
                } else {
                    const data = await res.json();
                    setError(data.error || "Upload failed");
                }
            } catch {
                setError("Upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        },
        [onChange]
    );

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            uploadFile(files[0]);
        }
    }

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            uploadFile(files[0]);
        }
        // Reset input so the same file can be re-selected
        e.target.value = "";
    }

    function handleRemove() {
        onChange("");
        setError("");
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <Image
                        src={value}
                        alt="Uploaded image"
                        width={800}
                        height={400}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
                        >
                            Replace
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors backdrop-blur-sm"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
                        <p className="text-xs text-gray-300 truncate">{value}</p>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !uploading && inputRef.current?.click()}
                    className={`
                        relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed
                        px-6 py-10 cursor-pointer transition-all duration-200
                        ${dragging
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/15 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                        }
                        ${uploading ? "pointer-events-none opacity-60" : ""}
                    `}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-3" />
                            <p className="text-sm text-gray-400">Uploading...</p>
                        </>
                    ) : dragging ? (
                        <>
                            <Upload className="w-8 h-8 text-blue-400 mb-3" />
                            <p className="text-sm text-blue-400 font-medium">Drop image here</p>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                                <ImageIcon className="w-5 h-5 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-300 font-medium mb-1">{description}</p>
                            <p className="text-xs text-gray-600">PNG, JPG, WebP, GIF or SVG — Max 5MB</p>
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="text-xs text-red-400 mt-1.5">{error}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={handleFileSelect}
            />
        </div>
    );
}

/* ─── Multi-image variant for project galleries ─── */

interface MultiImageUploadProps {
    values: string[];
    onChange: (urls: string[]) => void;
    label?: string;
    max?: number;
}

export function MultiImageUpload({
    values,
    onChange,
    label = "Gallery Images",
    max = 10,
}: MultiImageUploadProps) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFile = useCallback(
        async (file: File) => {
            setError("");
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    onChange([...values, data.url]);
                } else {
                    const data = await res.json();
                    setError(data.error || "Upload failed");
                }
            } catch {
                setError("Upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        },
        [onChange, values]
    );

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault();
        setDragging(false);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) uploadFile(files[0]);
    }

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) uploadFile(files[0]);
        e.target.value = "";
    }

    function removeImage(index: number) {
        onChange(values.filter((_, i) => i !== index));
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                {label} <span className="text-gray-600">({values.length}/{max})</span>
            </label>

            {values.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                    {values.map((url, i) => (
                        <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <Image src={url} alt={`Image ${i + 1}`} width={300} height={200} className="w-full h-28 object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="absolute top-1.5 right-1.5 p-1 bg-black/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {values.length < max && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !uploading && inputRef.current?.click()}
                    className={`
                        flex items-center justify-center gap-2 rounded-lg border-2 border-dashed
                        px-4 py-6 cursor-pointer transition-all duration-200
                        ${dragging ? "border-blue-500 bg-blue-500/10" : "border-white/15 bg-white/[0.02] hover:border-white/25"}
                        ${uploading ? "pointer-events-none opacity-60" : ""}
                    `}
                >
                    {uploading ? (
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    ) : (
                        <Upload className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-sm text-gray-400">
                        {uploading ? "Uploading..." : "Add image"}
                    </span>
                </div>
            )}

            {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={handleFileSelect}
            />
        </div>
    );
}
