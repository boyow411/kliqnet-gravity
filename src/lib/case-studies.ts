export type CaseStudy = {
    slug: string;
    client: string;
    title: string;
    industry: string;
    services: string[];
    duration: string;
    heroMetric: string;
    heroMetricLabel: string;
    challenge: string;
    solution: string[];
    results: string[];
    techStack: string[];
    kpis: { value: string; label: string }[];
    thumbnail?: string;
};

export const caseStudies: CaseStudy[] = [
    {
        slug: "esq-cocktail-bar",
        client: "ESQ Cocktail Bar & Grill",
        title: "Hospitality Digital Transformation",
        industry: "Hospitality",
        services: ["Web Development", "Branding Support", "Digital Strategy"],
        duration: "4 weeks",
        heroMetric: "3x",
        heroMetricLabel: "Increase in Booking Enquiries",
        challenge: "ESQ Cocktail Bar & Grill needed a modern digital presence to support event-heavy operations (brunches, DJ nights, themed events), table bookings, and brand repositioning to attract a younger, high-spend audience. Their previous setup lacked clarity, conversion flow, and brand consistency.",
        solution: [
            "Redesigned the website with a conversion-first structure",
            "Implemented clear booking CTAs and event promotion sections",
            "Refined brand presentation to match premium nightlife positioning",
            "Structured the site for scalability (future events, sister venues)",
        ],
        results: [
            "Increased online booking enquiries",
            "Clearer customer journey from social → website → booking",
            "Stronger brand perception aligned with live events & DJ culture",
        ],
        techStack: ["Next.js", "Headless CMS", "Conversion-focused UI"],
        kpis: [
            { value: "3x", label: "Booking Enquiries" },
            { value: "45%", label: "Lower Bounce Rate" },
            { value: "4 weeks", label: "Delivery Time" },
        ],
    },
    {
        slug: "trackacct",
        client: "TrackAcct",
        title: "Financial Tracking Platform MVP",
        industry: "SaaS / FinTech",
        services: ["SaaS Architecture", "Web App Development", "UX Design"],
        duration: "MVP Phase",
        heroMetric: "60%",
        heroMetricLabel: "Reduction in Feature Scope",
        challenge: "TrackAcct was conceived as a financial tracking platform for SMEs and accountants. The challenge was turning a complex financial concept into a clear, usable MVP without overbuilding.",
        solution: [
            "Defined MVP scope and feature lock",
            "Designed a clean UX for non-technical users",
            "Structured the platform for scalability (future integrations, dashboards)",
            "Focused on usability and clarity over feature bloat",
        ],
        results: [
            "Clear MVP roadmap ready for development and funding conversations",
            "Platform positioned for SME adoption",
            "Reduced technical debt by prioritising core value",
        ],
        techStack: ["React", "Node.js", "PostgreSQL", "Modular Architecture"],
        kpis: [
            { value: "60%", label: "Scope Reduction" },
            { value: "MVP", label: "Ready for Funding" },
            { value: "$0", label: "Tech Debt at Launch" },
        ],
    },
    {
        slug: "mailvara",
        client: "Mailvara",
        title: "Email Automation SaaS for Agencies",
        industry: "SaaS / MarTech",
        services: ["Product Positioning", "UX Strategy", "Landing Page Architecture"],
        duration: "Product Definition Phase",
        heroMetric: "2x",
        heroMetricLabel: "Faster Onboarding",
        challenge: "Mailvara aimed to simplify email campaigns, forms, and automations for agencies and freelancers—but needed clear differentiation, strong onboarding flow, and a product story investors and users could understand quickly.",
        solution: [
            "Defined product positioning and naming",
            "Designed onboarding flows and feature hierarchy",
            "Created a high-conversion SaaS landing page structure",
            "Mapped pricing logic aligned with COGS",
        ],
        results: [
            "Clear go-to-market positioning",
            "Investor-ready product narrative",
            "Reduced friction in onboarding and feature discovery",
        ],
        techStack: ["Next.js", "NestJS", "Stripe Integration", "SaaS UX Patterns"],
        kpis: [
            { value: "2x", label: "Faster Onboarding" },
            { value: "3", label: "Pricing Tiers Defined" },
            { value: "✓", label: "Investor Ready" },
        ],
    },
    {
        slug: "agency-projects",
        client: "Multi-Client Portfolio",
        title: "Web & Growth Systems for SMEs",
        industry: "Agency / SMEs",
        services: ["Web Development", "Automation", "Digital Marketing"],
        duration: "Ongoing",
        heroMetric: "40%",
        heroMetricLabel: "Avg. Lead Quality Improvement",
        challenge: "Multiple SME clients needed websites that actually convert, systems that reduce manual work, and clear ROI from digital spend.",
        solution: [
            "Conversion-optimised websites",
            "CRM and email automation workflows",
            "Performance-focused landing pages",
            "Clear reporting structures",
        ],
        results: [
            "Higher quality inbound leads",
            "Reduced admin overhead",
            "Improved digital ROI for clients across sectors",
        ],
        techStack: ["Next.js", "Zapier", "HubSpot", "Custom Dashboards"],
        kpis: [
            { value: "40%", label: "Lead Quality Improvement" },
            { value: "10+", label: "Hours Saved Weekly" },
            { value: "5x", label: "Avg. ROI on Ads" },
        ],
    },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
    return caseStudies.filter((cs) => cs.industry.toLowerCase().includes(industry.toLowerCase()));
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
    return caseStudies.filter((cs) => cs.services.some((s) => s.toLowerCase().includes(service.toLowerCase())));
}
