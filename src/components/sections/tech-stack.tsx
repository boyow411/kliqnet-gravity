"use client";

import { RevealSection } from "@/components/motion/reveal";

const row1 = [
    "Next.js", "React", "React Native", "Node.js", "TypeScript",
    "PostgreSQL", "Prisma", "Stripe", "Neon", "Vercel",
    "Tailwind CSS", "Framer Motion",
];

const row2 = [
    "n8n", "Zapier", "HubSpot", "Google Ads", "Meta Ads",
    "Figma", "NestJS", "Docker", "GitHub Actions", "Redis",
    "AWS", "Cloudflare",
];

function MarqueeRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
    const doubled = [...items, ...items];
    return (
        <div className="relative overflow-hidden py-3">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className={`flex gap-4 w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
                {doubled.map((tech, i) => (
                    <div
                        key={`${tech}-${i}`}
                        className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-sm text-gray-400 font-medium whitespace-nowrap hover:border-blue-500/20 hover:text-white transition-all shrink-0"
                    >
                        {tech}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TechStack() {
    return (
        <section className="py-20 md:py-28 bg-black border-t border-white/[0.04]">
            <div className="container mx-auto px-4 mb-12">
                <RevealSection className="text-center">
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        Our Stack
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Built with the best tools
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        We use modern, battle-tested technologies to build fast, secure, and scalable products.
                    </p>
                </RevealSection>
            </div>

            <div className="space-y-4">
                <MarqueeRow items={row1} direction="left" />
                <MarqueeRow items={row2} direction="right" />
            </div>
        </section>
    );
}
