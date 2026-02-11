"use client";

import {
    Globe, Smartphone, Layout, Zap,
    BarChart3, Megaphone, Workflow, Bot
} from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/motion/reveal";

/*
 * Desktop bento layout (4 columns, 3 rows):
 *
 *  ┌───────────────┬───────────┬───────────┐
 *  │  Web Dev      │  Mobile   │  SaaS     │
 *  │  (2col)       │           │  (2row)   │
 *  ├───────┬───────┤───────────┤           │
 *  │ Auto  │  AI   │ SEO       │           │
 *  ├───────┴───────┴─────┬─────┴───────────┤
 *  │  Paid Ads (2col)    │ CRM (2col)      │
 *  └─────────────────────┴─────────────────┘
 *
 * Tablet (md): 2 columns, Web Dev spans full width
 * Mobile: single column, all cards stacked
 */

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "High-performance websites and web applications built on Next.js. We focus on speed, SEO, accessibility, and conversion — delivering sites that load in under 2 seconds and rank on page one.",
        features: ["Next.js / React", "Headless CMS", "SEO-optimised", "Sub-2s load times"],
        href: "/web-development",
        id: "svc-webdev",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        description: "Native-quality mobile applications for iOS and Android using React Native. From consumer apps to internal business tools — we ship cross-platform apps that feel native on every device.",
        features: ["React Native", "iOS & Android", "Push notifications", "Offline-capable"],
        href: "/app-development",
        id: "svc-mobile",
    },
    {
        icon: Layout,
        title: "SaaS Platforms",
        description: "Full-stack SaaS products with multi-tenant architecture, billing integration via Stripe, role-based access control, and admin dashboards built to scale from MVP to 10k+ users.",
        features: ["Multi-tenant", "Stripe billing", "RBAC", "Admin dashboards"],
        href: "/saas-development",
        id: "svc-saas",
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "Eliminate repetitive tasks with custom automation workflows. We connect your tools — CRM, email, payments, scheduling — into seamless processes using n8n, Zapier, and custom APIs.",
        features: ["n8n / Zapier", "API integrations", "CRM automation", "Custom pipelines"],
        href: "/automation",
        id: "svc-automation",
    },
    {
        icon: Bot,
        title: "AI Integration",
        description: "Embed AI into your products and operations — from intelligent chatbots and document processing to recommendation engines and automated content generation powered by LLMs.",
        features: ["LLM integration", "Chatbots", "Document AI", "Custom agents"],
        href: "/ai-integration",
        id: "svc-ai",
    },
    {
        icon: BarChart3,
        title: "SEO & Growth",
        description: "Data-driven SEO and content strategies that drive organic traffic. We handle technical SEO, on-page optimisation, keyword strategy, and performance tracking to get you found.",
        features: ["Technical SEO", "Content strategy", "Analytics", "Rank tracking"],
        href: "/digital-marketing",
        id: "svc-seo",
    },
    {
        icon: Megaphone,
        title: "Paid Advertising",
        description: "Performance marketing on Google Ads and Meta that delivers measurable ROI. We build, test, and optimise campaigns with clear attribution from click to conversion.",
        features: ["Google Ads", "Meta Ads", "A/B testing", "ROAS tracking"],
        href: "/digital-marketing",
        id: "svc-paidads",
    },
    {
        icon: Zap,
        title: "CRM & Operations",
        description: "Streamline your sales pipeline and operations with custom CRM setups, lead scoring, automated follow-ups, and reporting dashboards that give you real-time visibility into your business.",
        features: ["HubSpot / Custom CRM", "Lead scoring", "Auto follow-ups", "Dashboards"],
        href: "/crm-operations",
        id: "svc-crm",
    },
];

export function ServicesGrid() {
    return (
        <section className="py-24 md:py-32 bg-black text-white relative" id="services">
            {/* Responsive bento grid styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .bento-grid {
                    display: grid;
                    gap: 16px;
                    grid-template-columns: 1fr;
                }
                /* Tablet: 2 columns */
                @media (min-width: 768px) {
                    .bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    #svc-webdev { grid-column: 1 / -1; }
                    #svc-paidads { grid-column: 1 / -1; }
                }
                /* Desktop: full 4-column bento */
                @media (min-width: 1024px) {
                    .bento-grid {
                        grid-template-columns: repeat(4, 1fr);
                        grid-template-rows: auto auto auto;
                    }
                    #svc-webdev    { grid-area: 1 / 1 / 2 / 3; }
                    #svc-mobile    { grid-area: 1 / 3 / 2 / 4; }
                    #svc-saas      { grid-area: 1 / 4 / 3 / 5; }
                    #svc-automation { grid-area: 2 / 1 / 3 / 2; }
                    #svc-ai        { grid-area: 2 / 2 / 3 / 3; }
                    #svc-seo       { grid-area: 2 / 3 / 3 / 4; }
                    #svc-paidads   { grid-area: 3 / 1 / 4 / 3; }
                    #svc-crm       { grid-area: 3 / 3 / 4 / 5; }
                }
            `}} />

            {/* Dot grid continuation */}
            <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <RevealSection className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        What We Do
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        End-to-end digital services
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        From product strategy to launch and growth — we cover the full stack of digital services so you can focus on running your business.
                    </p>
                </RevealSection>

                <StaggerContainer className="bento-grid">
                    {services.map((service, index) => (
                        <StaggerItem key={index} id={service.id}>
                            <Link
                                href={service.href}
                                className="group flex flex-col h-full p-5 md:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4 md:mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                        <service.icon className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-700 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                                </div>

                                <h3 className="text-base md:text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 md:mb-5 flex-1">
                                    {service.description}
                                </p>

                                {/* Feature chips */}
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {service.features.map((f) => (
                                        <span
                                            key={f}
                                            className="text-[10px] font-medium text-gray-500 bg-white/[0.03] border border-white/[0.06] rounded-md px-2 py-0.5"
                                        >
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

