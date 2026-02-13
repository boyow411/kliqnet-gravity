"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealSection } from "@/components/motion/reveal";

type GalleryLightboxProps = {
    images: string[];
    projectName: string;
};

export function GalleryLightbox({ images, projectName }: GalleryLightboxProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (i: number) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    }, [lightboxIndex, images.length]);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex(
            (lightboxIndex - 1 + images.length) % images.length
        );
    }, [lightboxIndex, images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };

        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [lightboxIndex, goNext, goPrev]);

    if (!images.length) return null;

    return (
        <RevealSection>
            {/* Thumbnail grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((src, i) => (
                    <button
                        key={src}
                        onClick={() => openLightbox(i)}
                        className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        aria-label={`Open ${projectName} screenshot ${i + 1}`}
                    >
                        <Image
                            src={src}
                            alt={`${projectName} screenshot ${i + 1}`}
                            fill
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = "none";
                            }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="text-white/0 group-hover:text-white/80 transition-colors text-sm font-medium">
                                View Full Image
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Lightbox modal */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${projectName} gallery lightbox`}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/[0.1] flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
                        aria-label="Close lightbox"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Prev button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 border border-white/[0.1] flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="relative max-w-5xl max-h-[85vh] w-full mx-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[lightboxIndex]}
                            alt={`${projectName} screenshot ${lightboxIndex + 1}`}
                            width={1600}
                            height={1000}
                            className="object-contain w-full h-auto max-h-[85vh] rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-500 mt-4">
                            {lightboxIndex + 1} / {images.length}
                        </p>
                    </div>

                    {/* Next button */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 border border-white/[0.1] flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}
        </RevealSection>
    );
}
