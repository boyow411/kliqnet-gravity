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
        title: "Website Growth Builds",
        description: "For businesses that need a website customers can trust and take action on. We shape the positioning, pages, booking/contact funnel, technical SEO and launch plan around stronger enquiries.",
        features: ["Positioning", "Premium UI", "Booking funnels", "Technical SEO"],
        href: "/web-development",
        id: "svc-webdev",
    },
    {
        icon: Smartphone,
        title: "Mobile App Builds",
        description: "For customer apps, internal tools and app-based product ideas. We design reliable mobile flows around speed, clarity, retention and the core action users need to take.",
        features: ["React Native", "iOS & Android", "User accounts", "Store launch"],
        href: "/app-development",
        id: "svc-mobile",
    },
    {
        icon: Layout,
        title: "SaaS / MVP Builds",
        description: "For founders and teams that need a real product, not just a prototype. We define the MVP, design the UX, build the core platform and prepare it for launch without overbuilding.",
        features: ["MVP scoping", "Full-stack build", "Stripe billing", "Admin dashboards"],
        href: "/saas-development",
        id: "svc-saas",
    },
    {
        icon: Workflow,
        title: "Automation & CRM Sprints",
        description: "For teams drowning in manual admin, scattered tools and missed follow-ups. We map the workflow, connect the right systems and make your pipeline easier to manage.",
        features: ["Workflow mapping", "CRM setup", "Lead routing", "Dashboards"],
        href: "/automation",
        id: "svc-automation",
    },
    {
        icon: Bot,
        title: "AI Workflow Integration",
        description: "For businesses that want AI doing useful work inside support, bookings, documents or operations. We scope the use case, design guardrails and connect AI to real workflows.",
        features: ["Use-case scoping", "AI chatbots", "Document AI", "Guardrails"],
        href: "/ai-integration",
        id: "svc-ai",
    },
    {
        icon: BarChart3,
        title: "SEO & Growth Systems",
        description: "For brands that need the technical foundation, content structure and measurement layer to turn a polished build into discoverable, trackable growth.",
        features: ["Technical SEO", "Content strategy", "Analytics", "Rank tracking"],
        href: "/digital-marketing",
        id: "svc-seo",
    },
    {
        icon: Megaphone,
        title: "Paid Growth Funnels",
        description: "For teams ready to test acquisition with a clearer click-to-conversion path. We connect landing pages, campaigns and attribution so performance is easier to judge.",
        features: ["Google Ads", "Meta Ads", "A/B testing", "ROAS tracking"],
        href: "/digital-marketing",
        id: "svc-paidads",
    },
    {
        icon: Zap,
        title: "CRM & Operations Systems",
        description: "For operators who need visibility across leads, follow-ups, customer status and delivery. We build the dashboards and automations that reduce manual chasing.",
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
                        Choose the build that matches the business problem
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Clear packages for websites, apps, SaaS, automation and AI.
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        You do not need to decode a long agency service menu. Start with the outcome you need, then Kliqnet shapes the strategy, design and build around it.
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

