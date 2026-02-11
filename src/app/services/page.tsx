import Link from "next/link";
import {
    Globe, Smartphone, Layout, Zap,
    BarChart3, Megaphone, Workflow, Bot
} from "lucide-react";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "High-performance websites and web apps built on Next.js. Optimised for speed, SEO, and conversion.",
        href: "/web-development",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        description: "Native-quality cross-platform apps for iOS and Android using React Native.",
        href: "/app-development",
    },
    {
        icon: Layout,
        title: "SaaS Platforms",
        description: "Multi-tenant SaaS products with Stripe billing, RBAC, and admin dashboards built to scale.",
        href: "/saas-development",
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "Custom automation that connects your CRM, email, payments, and scheduling into seamless pipelines.",
        href: "/automation",
    },
    {
        icon: Bot,
        title: "AI Integration",
        description: "Intelligent chatbots, document processing, and recommendation engines powered by LLMs.",
        href: "/ai-integration",
    },
    {
        icon: BarChart3,
        title: "SEO & Growth",
        description: "Technical SEO, content strategy, and organic growth tactics that get you found and drive traffic.",
        href: "/digital-marketing",
    },
    {
        icon: Megaphone,
        title: "Paid Advertising",
        description: "Google Ads and Meta campaigns built, tested, and optimised for measurable ROI.",
        href: "/digital-marketing",
    },
    {
        icon: Zap,
        title: "CRM & Operations",
        description: "Custom CRM setups, lead scoring, automated follow-ups, and real-time operational dashboards.",
        href: "/crm-operations",
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white relative">
            {/* Dot grid bg */}
            <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-16">
                    <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                        What We Do
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        End-to-end digital services
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        We don&apos;t just build websites — we build engineered growth systems. From product strategy to launch and ongoing optimization, we cover the full stack of digital services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className="group block p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <service.icon className="h-5 w-5 text-blue-400" />
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-gray-700 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
