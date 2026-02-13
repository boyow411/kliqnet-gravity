"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type TocItem = {
    id: string;
    label: string;
};

type TableOfContentsProps = {
    items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        );

        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [items]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav
            className="hidden xl:block sticky top-32 self-start"
            aria-label="Table of contents"
        >
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-600 mb-4">
                On this page
            </p>
            <ul className="space-y-1 border-l border-white/[0.06]">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => scrollTo(item.id)}
                            className={cn(
                                "block w-full text-left pl-4 py-1.5 text-sm transition-all border-l-2 -ml-px cursor-pointer",
                                activeId === item.id
                                    ? "border-blue-500 text-blue-400"
                                    : "border-transparent text-gray-600 hover:text-gray-300 hover:border-white/[0.2]"
                            )}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
