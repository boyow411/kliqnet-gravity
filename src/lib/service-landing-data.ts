export type ServiceLandingData = {
    slug: string;
    title: string;
    headline: string;
    subheadline: string;
    benefits: { title: string; description: string }[];
    process: string[];
    techStack: string[];
    faqs: { q: string; a: string }[];
    cta: string;
};

export const serviceLandingPages: ServiceLandingData[] = [
    {
        slug: "web-development",
        title: "Web Development Services",
        headline: "High-Performance Websites That Convert",
        subheadline: "Custom web development built on modern frameworks. Designed for speed, SEO, and conversion.",
        benefits: [
            { title: "Blazing Fast Performance", description: "Sub-second load times with Next.js and edge deployment." },
            { title: "SEO-First Architecture", description: "Semantic HTML, metadata optimization, and crawlability built in." },
            { title: "Conversion Focused", description: "Strategic CTAs, user flows, and analytics integration." },
            { title: "Scalable & Future-Proof", description: "Component-based architecture ready for growth." },
        ],
        process: ["Discovery & Strategy", "Wireframing & Design", "Development & QA", "Launch & Optimization"],
        techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Headless CMS"],
        faqs: [
            { q: "How long does a website project take?", a: "Most projects take 4-8 weeks from kick-off to launch, depending on complexity." },
            { q: "Do you offer ongoing maintenance?", a: "Yes, we offer retainer packages for updates, hosting, and performance monitoring." },
            { q: "Can you work with our existing brand?", a: "Absolutely. We can work from existing brand guidelines or help refine them." },
        ],
        cta: "Get a Free Website Audit",
    },
    {
        slug: "app-development",
        title: "App Development Services",
        headline: "Cross-Platform Apps Built for Scale",
        subheadline: "Native-quality mobile applications for iOS and Android using React Native and modern tooling.",
        benefits: [
            { title: "Single Codebase, Dual Platforms", description: "Ship to iOS and Android simultaneously with React Native." },
            { title: "Offline-First Architecture", description: "Apps that work reliably without constant connectivity." },
            { title: "Push Notifications & Engagement", description: "Keep users engaged with smart notification strategies." },
            { title: "App Store Optimization", description: "Guidance on metadata, screenshots, and launch strategy." },
        ],
        process: ["Product Definition", "UI/UX Design", "Agile Development", "Testing & Launch"],
        techStack: ["React Native", "Expo", "TypeScript", "Firebase", "Supabase"],
        faqs: [
            { q: "React Native or fully native?", a: "React Native covers 95% of use cases. We recommend native for highly specialized hardware features." },
            { q: "Can you integrate with our backend?", a: "Yes, we work with REST APIs, GraphQL, and can build custom backends." },
        ],
        cta: "Discuss Your App Idea",
    },
    {
        slug: "mobile-app-development",
        title: "Mobile App Development",
        headline: "Mobile Apps That Users Love",
        subheadline: "From concept to App Store. We build mobile experiences that drive engagement and retention.",
        benefits: [
            { title: "User-Centric Design", description: "Intuitive interfaces tested with real users." },
            { title: "Rapid MVP Development", description: "Launch your first version in weeks, not months." },
            { title: "Analytics & Iteration", description: "Built-in tracking to learn and improve continuously." },
            { title: "Security & Compliance", description: "GDPR-ready, secure authentication, encrypted storage." },
        ],
        process: ["Ideation & Scoping", "Prototype & Validate", "Build & Test", "Launch & Scale"],
        techStack: ["React Native", "Swift", "Kotlin", "Firebase", "AWS Amplify"],
        faqs: [
            { q: "What's included in an MVP?", a: "Core user flows, authentication, key features—enough to validate and gather feedback." },
            { q: "Do you handle App Store submissions?", a: "Yes, we manage the entire submission process for both iOS and Android." },
        ],
        cta: "Start Your Mobile Project",
    },
    {
        slug: "saas-development",
        title: "SaaS Development Services",
        headline: "Scalable SaaS Platforms Built to Grow",
        subheadline: "Multi-tenant architecture, subscription billing, and dashboards—designed for recurring revenue.",
        benefits: [
            { title: "Multi-Tenant Architecture", description: "Serve thousands of customers from a single codebase." },
            { title: "Stripe & Billing Integration", description: "Subscriptions, usage metering, and invoicing out of the box." },
            { title: "Role-Based Access Control", description: "Granular permissions for teams and organizations." },
            { title: "Analytics Dashboards", description: "Give users insights with beautiful data visualization." },
        ],
        process: ["Product Strategy", "Architecture Design", "Iterative Development", "Launch & Scale"],
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Redis", "Docker"],
        faqs: [
            { q: "How do you handle data isolation?", a: "We use row-level security and tenant isolation patterns for secure multi-tenancy." },
            { q: "Can you integrate with enterprise tools?", a: "Yes, we've built integrations with Salesforce, Slack, Zapier, and more." },
        ],
        cta: "Build Your SaaS",
    },
    {
        slug: "digital-marketing",
        title: "Digital Marketing Services",
        headline: "Growth Marketing That Delivers ROI",
        subheadline: "SEO, paid ads, and content strategy—all focused on measurable business outcomes.",
        benefits: [
            { title: "SEO & Organic Growth", description: "Sustainable traffic through technical SEO and content." },
            { title: "Paid Media Management", description: "Google Ads and Meta campaigns optimized for ROAS." },
            { title: "Conversion Rate Optimization", description: "A/B testing and funnel analysis to maximize conversions." },
            { title: "Analytics & Reporting", description: "Clear dashboards showing what's working and why." },
        ],
        process: ["Audit & Strategy", "Campaign Setup", "Optimization", "Scaling"],
        techStack: ["Google Ads", "Meta Ads", "GA4", "Hotjar", "SEMrush", "HubSpot"],
        faqs: [
            { q: "What's your minimum ad spend recommendation?", a: "We typically recommend $3k+/month for meaningful data and optimization." },
            { q: "How long until we see results?", a: "SEO takes 3-6 months; paid ads can show results within weeks." },
        ],
        cta: "Get a Marketing Audit",
    },
    {
        slug: "automation",
        title: "Workflow Automation Services",
        headline: "Automate the Work That Slows You Down",
        subheadline: "Custom automation workflows that connect your tools, eliminate manual tasks, and free your team to focus on what matters.",
        benefits: [
            { title: "End-to-End Workflow Design", description: "We map your entire operation and identify every bottleneck that can be automated — from lead capture to fulfilment." },
            { title: "Multi-Tool Integration", description: "Connect CRM, email, payments, scheduling, and databases into seamless automated pipelines using n8n, Zapier, or custom APIs." },
            { title: "Error Handling & Monitoring", description: "Every workflow includes fallback handling, retry logic, and alerting so nothing falls through the cracks silently." },
            { title: "Cost Reduction at Scale", description: "Clients typically save 10–20 hours per week of manual work within the first month of implementation." },
        ],
        process: ["Operations Audit", "Workflow Design", "Build & Test", "Deploy & Monitor"],
        techStack: ["n8n", "Zapier", "Make", "Node.js", "REST APIs", "Webhooks"],
        faqs: [
            { q: "What can be automated?", a: "Almost anything repetitive: email sequences, data entry, lead routing, invoicing, status updates, report generation, and more." },
            { q: "n8n or Zapier — which do you recommend?", a: "n8n for complex, self-hosted workflows with full control. Zapier for simpler integrations with faster setup. We'll advise based on your needs." },
            { q: "How quickly can automation be deployed?", a: "Simple workflows in days, complex multi-system automations in 2–4 weeks." },
        ],
        cta: "Automate Your Operations",
    },
    {
        slug: "ai-integration",
        title: "AI Integration Services",
        headline: "Embed AI Into Your Products & Operations",
        subheadline: "From intelligent chatbots to document processing and recommendation engines — we build AI features that deliver measurable business value.",
        benefits: [
            { title: "Custom AI Agents", description: "Build conversational agents powered by GPT-4, Claude, or Gemini that understand your business context and handle customer queries 24/7." },
            { title: "Document Intelligence", description: "Automated extraction, summarisation, and classification of documents — contracts, invoices, forms — reducing manual processing by up to 90%." },
            { title: "Recommendation Engines", description: "Personalised product, content, or action recommendations that increase engagement and conversion rates." },
            { title: "RAG & Knowledge Bases", description: "Retrieval-augmented generation systems that let your AI answer questions using your proprietary data accurately." },
        ],
        process: ["Use Case Scoping", "Data & Model Selection", "Integration & Testing", "Deployment & Iteration"],
        techStack: ["OpenAI API", "Anthropic Claude", "LangChain", "Pinecone", "Next.js", "Python"],
        faqs: [
            { q: "Do we need our own data to use AI?", a: "Not necessarily. Many AI features work with pre-trained models. Custom data improves accuracy for specialised use cases." },
            { q: "How do you handle AI hallucinations?", a: "We implement guardrails, source attribution, and RAG patterns to ground AI responses in verified data." },
            { q: "What about data privacy?", a: "We prioritise data security — options include self-hosted models, Azure OpenAI for enterprise compliance, and strict data handling policies." },
        ],
        cta: "Explore AI for Your Business",
    },
    {
        slug: "crm-operations",
        title: "CRM & Operations Services",
        headline: "Streamline Your Sales Pipeline & Operations",
        subheadline: "Custom CRM setups, lead scoring, automated follow-ups, and real-time dashboards — built for how your team actually works.",
        benefits: [
            { title: "Custom CRM Configuration", description: "We set up HubSpot, or build custom CRM solutions tailored to your sales process — not a generic template." },
            { title: "Automated Lead Management", description: "Lead scoring, qualification, and routing that ensures your sales team focuses on the highest-value prospects." },
            { title: "Pipeline Visibility", description: "Real-time dashboards showing deal stages, forecasts, and team performance at a glance." },
            { title: "Automated Follow-Ups", description: "Trigger-based email sequences and task creation so no lead goes cold and no follow-up is missed." },
        ],
        process: ["Sales Process Mapping", "CRM Setup & Migration", "Automation Rules", "Training & Handoff"],
        techStack: ["HubSpot", "Custom Dashboards", "Node.js", "PostgreSQL", "n8n", "Stripe"],
        faqs: [
            { q: "Can you migrate our existing CRM data?", a: "Yes, we handle full data migration including contacts, deals, notes, and activity history." },
            { q: "Do you provide training?", a: "Every implementation includes hands-on training sessions and documentation for your team." },
            { q: "What if we outgrow HubSpot?", a: "We can build custom CRM solutions when off-the-shelf tools no longer fit your needs." },
        ],
        cta: "Optimise Your Pipeline",
    },
];

export function getServiceLandingData(slug: string): ServiceLandingData | undefined {
    return serviceLandingPages.find((page) => page.slug === slug);
}
