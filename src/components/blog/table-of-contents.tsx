"use client";

import { useEffect, useState } from "react";

type TOCItem = {
    id: string;
    text: string;
    level: number;
};

export function TableOfContents({ content }: { content: string }) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract headings from markdown content
        const regex = /^(#{1,3})\s+(.+)$/gm;
        const matches = [...content.matchAll(regex)];
        const items: TOCItem[] = matches.map((match) => ({
            id: match[2].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
            text: match[2],
            level: match[1].length,
        }));
        setHeadings(items);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-32 hidden lg:block w-64 shrink-0">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                On this page
            </p>
            <ul className="space-y-2 border-l border-white/10">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={`block py-1 text-sm transition-colors border-l-2 -ml-px pl-4 ${activeId === heading.id
                                    ? "border-blue-500 text-white"
                                    : "border-transparent text-gray-500 hover:text-gray-300"
                                } ${heading.level === 3 ? "pl-6" : ""}`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
