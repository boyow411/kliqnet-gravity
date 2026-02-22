export type Project = {
  slug: string
  name: string
  category: "Venture Studio" | "Client Transformation"
  industryTags: string[]
  status: "Live" | "In Development"
  tagline: string
  shortDescription: string
  primaryUrl: string
  screenshots: {
    cardImage: string
    gallery: string[]
  }
  scopeOfExecution: string[]
  about: string
  whatWasDone: string[]
  howItWasDone: string[]
  technologyUsed: {
    frontend: string[]
    backend: string[]
    database: string[]
    integrations: string[]
    hosting: string[]
  }
  timeline: {
    durationLabel: string
    phases: string[]
  }
  challenges: { challenge: string; solution: string }[]
  results: { label: string; value: string; note?: string }[]
  cta: {
    title: string
    copy: string
    buttonLabel: string
    buttonHref: string
  }
}

export const projects: Project[] = [
  /* ───────────────────────────────────────────────── */
  /* 1. PAYTRACK                                       */
  /* ───────────────────────────────────────────────── */
  {
    slug: "paytrack",
    name: "PayTrack",
    category: "Venture Studio",
    industryTags: ["Fintech", "Payroll", "SaaS"],
    status: "Live",
    tagline: "Payroll infrastructure built for modern teams.",
    shortDescription:
      "A payroll and workforce management platform designed to simplify salary processing and compliance.",
    primaryUrl: "https://www.paytrackpro.com/",
    screenshots: {
      cardImage: "/projects/paytrack/paytrack.jpg",
      gallery: [
        "/projects/paytrack/paytract1.jpg",
      ],
    },
    scopeOfExecution: [
      "Product Strategy & Roadmap",
      "UI/UX Design",
      "Backend Architecture",
      "Admin Dashboard Infrastructure",
      "Stripe Billing Integration",
      "Marketing Website Development",
      "Deployment & Optimisation",
    ],
    about:
      "PayTrack is a payroll management platform built to streamline salary processing, workforce tracking, and reporting for modern businesses. The system was designed to reduce administrative overhead while maintaining clarity, scalability, and financial accuracy.",
    whatWasDone: [
      "Designed full product architecture",
      "Built admin payroll dashboard",
      "Implemented subscription-based billing logic",
      "Developed marketing website",
      "Created user authentication & role permissions",
    ],
    howItWasDone: [
      "Defined clear product roadmap and feature prioritisation",
      "Designed clean, compliance-focused UX flows",
      "Structured scalable backend architecture",
      "Integrated secure payment processing via Stripe",
      "Tested payroll calculation flows before launch",
    ],
    technologyUsed: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      backend: ["Node.js", "API Layer"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["Stripe", "Email Service"],
      hosting: ["Vercel"],
    },
    timeline: {
      durationLabel: "6–8 Weeks",
      phases: ["Discovery", "UX Design", "Backend Build", "QA Testing", "Launch"],
    },
    challenges: [
      {
        challenge: "Balancing simplicity with financial accuracy.",
        solution:
          "Designed structured calculation modules with clean UI separation.",
      },
    ],
    results: [
      { label: "Platform Status", value: "Live & Operational" },
      { label: "Architecture", value: "Scalable SaaS Infrastructure" },
    ],
    cta: {
      title: "Building Fintech Infrastructure?",
      copy: "Let's architect a scalable financial product.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 2. TRACCT                                         */
  /* ───────────────────────────────────────────────── */
  {
    slug: "tracct",
    name: "Tracct",
    category: "Venture Studio",
    industryTags: ["Fintech", "SME", "Analytics"],
    status: "Live",
    tagline: "Financial clarity for SMEs.",
    shortDescription:
      "An SME financial tracking platform providing expense management and reporting dashboards.",
    primaryUrl: "https://www.tracct.com/",
    screenshots: {
      cardImage: "/projects/tracct/tracct1.jpg",
      gallery: [
        "/projects/tracct/tracct2.jpg",
      ],
    },
    scopeOfExecution: [
      "Product Strategy",
      "Dashboard UX Design",
      "Backend System Architecture",
      "Admin Controls",
      "Stripe Subscription Logic",
      "Marketing Site Build",
      "Deployment",
    ],
    about:
      "Tracct provides SMEs with structured financial visibility. It enables expense tracking, transaction monitoring, and high-level reporting within a clean, modern interface.",
    whatWasDone: [
      "Designed dashboard analytics system",
      "Built secure authentication model",
      "Structured modular financial reporting system",
      "Developed marketing funnel",
    ],
    howItWasDone: [
      "Mapped SME pain points around financial clarity",
      "Built modular reporting widgets",
      "Ensured scalable database modelling",
      "Focused on clarity-first UX",
    ],
    technologyUsed: {
      frontend: ["Next.js", "React"],
      backend: ["Node.js", "API Server"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["Stripe"],
      hosting: ["Vercel"],
    },
    timeline: {
      durationLabel: "6 Weeks",
      phases: ["Strategy", "Design", "Build", "QA", "Launch"],
    },
    challenges: [
      {
        challenge: "Avoiding dashboard clutter.",
        solution: "Implemented structured card-based analytics layout.",
      },
    ],
    results: [{ label: "Status", value: "Live SaaS Platform" }],
    cta: {
      title: "Need a Financial Dashboard?",
      copy: "We build scalable financial systems.",
      buttonLabel: "Work With Us",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 3. VEEDIOGRAM                                     */
  /* ───────────────────────────────────────────────── */
  {
    slug: "veediogram",
    name: "Veediogram",
    category: "Venture Studio",
    industryTags: ["AI", "Video", "Automation"],
    status: "Live",
    tagline: "AI-powered long-form video creation.",
    shortDescription:
      "A modular AI video generation platform designed for chunk-based production workflows.",
    primaryUrl: "https://www.veediogram.com",
    screenshots: {
      cardImage: "/projects/veediogram/veediogram1.jpg",
      gallery: [
        "/projects/veediogram/veediogram2.jpg",
      ],
    },
    scopeOfExecution: [
      "AI Product Strategy",
      "Frontend UX",
      "Backend Rendering Architecture",
      "Admin Orchestration System",
      "Subscription Logic",
      "Marketing Site",
    ],
    about:
      "Veediogram enables long-form AI video generation through modular chunk rendering. It allows users to generate and merge smaller segments into complete productions.",
    whatWasDone: [
      "Architected chunk-based rendering system",
      "Built user prompt interface",
      "Developed job processing backend",
      "Implemented subscription model",
    ],
    howItWasDone: [
      "Designed asynchronous rendering architecture",
      "Structured task queues for video jobs",
      "Optimised UI for workflow clarity",
    ],
    technologyUsed: {
      frontend: ["React", "Next.js"],
      backend: ["Node.js", "Python"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["AI APIs", "Stripe"],
      hosting: ["Vercel", "Cloud GPU"],
    },
    timeline: {
      durationLabel: "8 Weeks",
      phases: ["Research", "Architecture", "Build", "Testing", "Launch"],
    },
    challenges: [
      {
        challenge: "Managing long rendering tasks.",
        solution: "Implemented modular chunk processing.",
      },
    ],
    results: [{ label: "Status", value: "Live AI Platform" }],
    cta: {
      title: "Building AI Infrastructure?",
      copy: "We architect scalable AI products.",
      buttonLabel: "Start a Build",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 4. MAILVARA                                       */
  /* ───────────────────────────────────────────────── */
  {
    slug: "mailvara",
    name: "Mailvara",
    category: "Venture Studio",
    industryTags: ["Email Marketing", "Automation", "AI"],
    status: "Live",
    tagline: "Email automation built for modern teams.",
    shortDescription:
      "An AI-enhanced email marketing platform with visual builders and automation flows.",
    primaryUrl: "https://www.mailvara.tech/",
    screenshots: {
      cardImage: "/projects/mailvara/Mailvara.jpg",
      gallery: ["/projects/mailvara/mailvara1.jpg"],
    },
    scopeOfExecution: [
      "Product Design",
      "Drag-and-Drop Builder Development",
      "Automation Engine",
      "Backend Architecture",
      "Stripe Integration",
      "Landing Page",
    ],
    about:
      "Mailvara is an email automation platform featuring a visual builder, workflow automation, and AI-assisted content creation.",
    whatWasDone: [
      "Built visual email builder",
      "Developed form builder",
      "Implemented automation flows",
      "Integrated Stripe subscription billing",
    ],
    howItWasDone: [
      "Structured modular block system",
      "Designed intuitive workflow editor",
      "Focused on performance and scalability",
    ],
    technologyUsed: {
      frontend: ["React", "Next.js"],
      backend: ["NestJS", "Node.js"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["Stripe", "Email APIs"],
      hosting: ["Cloud Infrastructure"],
    },
    timeline: {
      durationLabel: "7 Weeks",
      phases: ["Design", "Builder Dev", "Automation Logic", "QA", "Launch"],
    },
    challenges: [
      {
        challenge: "Ensuring builder flexibility without complexity.",
        solution: "Developed reusable content blocks.",
      },
    ],
    results: [{ label: "Status", value: "Live SaaS Platform" }],
    cta: {
      title: "Need Marketing Automation?",
      copy: "Let's build your marketing infrastructure.",
      buttonLabel: "Start Now",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 5. CUEREQ                                         */
  /* ───────────────────────────────────────────────── */
  {
    slug: "cuereq",
    name: "CueReq",
    category: "Venture Studio",
    industryTags: ["Hospitality Tech", "Real-Time Systems"],
    status: "Live",
    tagline: "Real-time music request platform.",
    shortDescription:
      "A real-time system connecting guests and DJs inside venues.",
    primaryUrl: "https://www.cuereq.com/",
    screenshots: {
      cardImage: "/projects/cuereq/cuereq1.jpg",
      gallery: ["/projects/cuereq/cuereq2.jpg"],
    },
    scopeOfExecution: [
      "Product Strategy",
      "UX Design",
      "Real-Time Architecture",
      "Admin Moderation System",
      "Stripe Monetisation",
      "Deployment",
    ],
    about:
      "CueReq allows venue guests to request music directly from DJs through a real-time interface.",
    whatWasDone: [
      "Designed dual-app architecture",
      "Built moderation system",
      "Implemented monetisation logic",
    ],
    howItWasDone: [
      "Structured event-driven backend",
      "Optimised for low-latency interactions",
    ],
    technologyUsed: {
      frontend: ["React", "PWA"],
      backend: ["Node.js", "WebSocket"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["Stripe"],
      hosting: ["Cloud Hosting"],
    },
    timeline: {
      durationLabel: "6 Weeks",
      phases: ["Architecture", "Build", "Testing", "Launch"],
    },
    challenges: [
      {
        challenge: "Ensuring stable real-time communication.",
        solution: "Implemented event-based server architecture.",
      },
    ],
    results: [{ label: "Status", value: "Live Platform" }],
    cta: {
      title: "Building Real-Time Apps?",
      copy: "We build scalable interactive systems.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 6. MONIKA RESTAURANT                              */
  /* ───────────────────────────────────────────────── */
  {
    slug: "monika-restaurant",
    name: "Monika Restaurant",
    category: "Client Transformation",
    industryTags: ["Hospitality", "Website Redesign", "AI Chatbot"],
    status: "Live",
    tagline: "AI-enhanced restaurant website redesign.",
    shortDescription:
      "Full website redesign with AI receptionist integration.",
    primaryUrl: "https://monikarestaurants.com/",
    screenshots: {
      cardImage: "/projects/monika/monika1.jpg",
      gallery: ["/projects/monika/monika2.jpg"],
    },
    scopeOfExecution: [
      "UX Redesign",
      "Brand Modernisation",
      "AI Chatbot Integration",
      "Conversion Optimisation",
      "Deployment",
    ],
    about:
      "Monika Restaurant's website was redesigned to modernise brand presentation and integrate an AI receptionist for better engagement.",
    whatWasDone: [
      "Redesigned layout and structure",
      "Integrated AI chatbot",
      "Optimised booking flow",
    ],
    howItWasDone: [
      "Mapped customer journey",
      "Improved visual hierarchy",
      "Implemented conversational AI system",
    ],
    technologyUsed: {
      frontend: ["Modern Web Stack"],
      backend: ["API Layer"],
      database: ["CMS"],
      integrations: ["AI Chatbot"],
      hosting: ["Cloud Hosting"],
    },
    timeline: {
      durationLabel: "4 Weeks",
      phases: ["Audit", "Design", "Build", "Launch"],
    },
    challenges: [
      {
        challenge: "Improving engagement without overwhelming users.",
        solution: "Introduced conversational AI strategically.",
      },
    ],
    results: [{ label: "Outcome", value: "Modernised Digital Presence" }],
    cta: {
      title: "Need a Digital Transformation?",
      copy: "Let's modernise your platform.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 7. SHNC                                           */
  /* ───────────────────────────────────────────────── */
  {
    slug: "shnc",
    name: "Safe Hands Nursing Care",
    category: "Client Transformation",
    industryTags: ["Healthcare", "Lead Generation"],
    status: "Live",
    tagline: "Healthcare website built for trust and clarity.",
    shortDescription:
      "Structured healthcare website designed for compliance, trust and lead capture.",
    primaryUrl: "https://www.shnc.org.uk/",
    screenshots: {
      cardImage: "/projects/shnc/shnc.jpg",
      gallery: ["/projects/shnc/shnc1.jpg"],
    },
    scopeOfExecution: [
      "Full Website Development",
      "Trust-Focused UX",
      "Lead Capture Architecture",
      "Compliance-Oriented Structure",
      "Deployment",
    ],
    about:
      "SHNC required a professional healthcare website aligned with regulatory standards while maintaining clarity and warmth for families.",
    whatWasDone: [
      "Structured service segmentation",
      "Implemented lead capture forms",
      "Designed professional healthcare aesthetic",
    ],
    howItWasDone: [
      "Focused on clarity and hierarchy",
      "Built trust-first content structure",
    ],
    technologyUsed: {
      frontend: ["Modern Web Stack"],
      backend: ["CMS / API"],
      database: ["CMS DB"],
      integrations: ["Contact Forms"],
      hosting: ["Cloud Hosting"],
    },
    timeline: {
      durationLabel: "5 Weeks",
      phases: ["Planning", "Design", "Build", "Launch"],
    },
    challenges: [
      {
        challenge: "Balancing medical authority with warmth.",
        solution: "Used structured layout and soft design language.",
      },
    ],
    results: [{ label: "Outcome", value: "Professional Healthcare Presence" }],
    cta: {
      title: "Need a Healthcare Platform?",
      copy: "We build structured, trust-first digital systems.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 8. ESQ                                            */
  /* ───────────────────────────────────────────────── */
  {
    slug: "esq",
    name: "ESQ Cocktail Bar & Grill",
    category: "Client Transformation",
    industryTags: ["Hospitality", "Brand", "Bookings"],
    status: "Live",
    tagline: "Digital ecosystem for a hospitality brand.",
    shortDescription:
      "Full digital presence built around bookings, events and brand positioning.",
    primaryUrl: "https://esqgrill.com/",
    screenshots: {
      cardImage: "/projects/esq/esq1.jpg",
      gallery: ["/projects/esq/esq2.jpg"],
    },
    scopeOfExecution: [
      "Brand Positioning",
      "Website Build",
      "Booking Architecture",
      "Event Marketing Structure",
      "Conversion Optimisation",
    ],
    about:
      "ESQ's digital presence was built to reflect its vibrant hospitality identity while driving bookings and event engagement.",
    whatWasDone: [
      "Designed immersive landing experience",
      "Optimised booking flows",
      "Structured event-driven pages",
    ],
    howItWasDone: [
      "Aligned web structure with nightlife brand tone",
      "Focused on conversion-first UX",
    ],
    technologyUsed: {
      frontend: ["Next.js", "React"],
      backend: ["Node.js", "Prisma"],
      database: ["PostgreSQL"],
      integrations: ["Stripe", "Booking System"],
      hosting: ["Vercel"],
    },
    timeline: {
      durationLabel: "5 Weeks",
      phases: ["Discovery", "Design", "Build", "Launch"],
    },
    challenges: [
      {
        challenge: "Translating nightlife energy into digital format.",
        solution: "Used immersive visuals and strong hierarchy.",
      },
    ],
    results: [
      { label: "Outcome", value: "Conversion-Optimised Hospitality Site" },
    ],
    cta: {
      title: "Building a Hospitality Brand?",
      copy: "We build digital ecosystems that convert.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 9. AIDESK                                         */
  /* ───────────────────────────────────────────────── */
  {
    slug: "aidesk",
    name: "AIDesk",
    category: "Venture Studio",
    industryTags: ["AI", "Local Business", "SaaS", "Automation"],
    status: "Live",
    tagline: "Your AI receptionist — never miss a call, booking, or lead.",
    shortDescription:
      "An all-in-one AI-powered platform helping local businesses manage customers, automate tasks, and grow revenue.",
    primaryUrl: "https://aidesk-gravity.vercel.app/",
    screenshots: {
      cardImage: "/projects/AIDesk/aidesk.jpg",
      gallery: ["/projects/AIDesk/aidesk1.jpg"],
    },
    scopeOfExecution: [
      "AI Product Strategy",
      "UI/UX Design",
      "Backend Architecture",
      "AI Receptionist Engine",
      "CRM & Unified Inbox",
      "Stripe Billing Integration",
      "Marketing Website Development",
      "Deployment & Optimisation",
    ],
    about:
      "AIDesk is an all-in-one platform for local businesses — from salons and clinics to restaurants and repair shops. It replaces front-desk chaos with an AI receptionist that handles enquiries, books appointments, and qualifies leads around the clock. The platform unifies SMS, email, and chat into a single inbox, automates follow-ups and reminders, and provides real-time analytics dashboards to drive data-informed decisions.",
    whatWasDone: [
      "Built AI receptionist with natural-language conversation handling",
      "Developed smart booking system with availability management and calendar sync",
      "Implemented unified inbox aggregating SMS, email, and live chat",
      "Created CRM with automatic contact enrichment and audience segmentation",
      "Built automation engine for welcome messages, follow-ups, and review requests",
      "Designed funnel builder for landing pages and lead capture",
      "Developed real-time analytics dashboard",
    ],
    howItWasDone: [
      "Designed conversational AI pipeline for human-like customer interactions",
      "Built event-driven automation engine with configurable triggers",
      "Structured scalable multi-tenant backend architecture",
      "Integrated secure payment processing via Stripe",
      "Implemented HMAC-signed webhook system for external integrations",
    ],
    technologyUsed: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      backend: ["Node.js", "API Layer"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["Stripe", "AI APIs", "SES Email", "Webhooks"],
      hosting: ["Vercel"],
    },
    timeline: {
      durationLabel: "8–10 Weeks",
      phases: ["Discovery", "AI Architecture", "Build", "QA Testing", "Launch"],
    },
    challenges: [
      {
        challenge: "Making AI conversations feel natural and context-aware.",
        solution:
          "Designed a multi-turn conversation engine with context retention and fallback routing.",
      },
      {
        challenge: "Unifying multiple communication channels without message loss.",
        solution:
          "Built a centralised message bus aggregating SMS, email, and chat into a single thread-based inbox.",
      },
    ],
    results: [
      { label: "Platform Status", value: "Live & Operational" },
      { label: "AI Coverage", value: "80% of enquiries handled automatically" },
      { label: "Architecture", value: "Multi-Tenant SaaS Infrastructure" },
    ],
    cta: {
      title: "Need an AI-Powered Business Platform?",
      copy: "Let's build intelligent automation for your business.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 10. VERALLEY                                      */
  /* ───────────────────────────────────────────────── */
  {
    slug: "veralley",
    name: "Veralley",
    category: "Venture Studio",
    industryTags: ["FaithTech", "AI", "Mobile App", "Community"],
    status: "Live",
    tagline: "Experience Scripture like never before.",
    shortDescription:
      "An AI-powered faith platform with personalised devotionals, Bible study tools, trivia battles, and community circles.",
    primaryUrl: "https://www.veralley.com/",
    screenshots: {
      cardImage: "/projects/Veralley/veralley.jpg",
      gallery: ["/projects/Veralley/veralley1.jpg"],
    },
    scopeOfExecution: [
      "Product Strategy & Roadmap",
      "Mobile-First UI/UX Design",
      "AI Engine Development",
      "Community & Social Features",
      "Gamification System",
      "PWA Architecture",
      "Marketing Website Development",
      "Deployment & Optimisation",
    ],
    about:
      "Veralley transforms how people engage with Scripture through AI-powered devotionals, a smart Bible reader, and interactive community features. The platform offers mood-based devotionals, WWJD scenario simulations, and a trivia arena — all designed to make faith growth personal, consistent, and communal. Users build streaks, join faith circles, and explore Scripture with three AI engines as their study partner.",
    whatWasDone: [
      "Built AI Bible companion with three integrated AI engines",
      "Developed smart Bible reader with listen, highlight, and note features",
      "Created mood-based devotional generator",
      "Implemented trivia arena for interactive Bible learning",
      "Built WWJD scenario simulation engine",
      "Designed faith circles for community engagement",
      "Developed streak and gamification system",
    ],
    howItWasDone: [
      "Designed personalised AI pipelines for devotional and study content",
      "Built mobile-first PWA architecture for cross-platform access",
      "Structured gamification system with streaks, milestones, and leaderboards",
      "Implemented social features for community-driven faith growth",
      "Optimised onboarding flow for rapid personalisation",
    ],
    technologyUsed: {
      frontend: ["Next.js", "React", "Tailwind CSS", "PWA"],
      backend: ["Node.js", "API Layer"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["AI APIs", "Stripe"],
      hosting: ["Vercel"],
    },
    timeline: {
      durationLabel: "10–12 Weeks",
      phases: ["Research", "UX Design", "AI Integration", "Build", "Testing", "Launch"],
    },
    challenges: [
      {
        challenge: "Generating contextually accurate AI devotionals from Scripture.",
        solution:
          "Developed structured prompt engineering with verse-level validation and mood-context mapping.",
      },
      {
        challenge: "Maintaining engagement through daily habit formation.",
        solution:
          "Implemented a multi-layered gamification system with streaks, milestones, and social accountability.",
      },
    ],
    results: [
      { label: "Platform Status", value: "Live & Growing" },
      { label: "Architecture", value: "Mobile-First PWA" },
      { label: "AI Engines", value: "3 Integrated AI Study Partners" },
    ],
    cta: {
      title: "Building a Community Platform?",
      copy: "Let's create an engaging, AI-powered experience.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },

  /* ───────────────────────────────────────────────── */
  /* 11. SIGNOFF360                                    */
  /* ───────────────────────────────────────────────── */
  {
    slug: "signoff360",
    name: "Signoff360",
    category: "Venture Studio",
    industryTags: ["Healthcare", "Compliance", "SaaS", "HR Tech"],
    status: "Live",
    tagline: "Total workforce compliance for UK care providers.",
    shortDescription:
      "A workforce compliance and clinical governance platform purpose-built for UK care providers and CQC readiness.",
    primaryUrl: "https://www.signoff360.com/",
    screenshots: {
      cardImage: "/projects/Signoff360/signoff360.jpg",
      gallery: ["/projects/Signoff360/signoff360-1.jpg"],
    },
    scopeOfExecution: [
      "Product Strategy & Compliance Mapping",
      "UI/UX Design",
      "Backend Architecture",
      "Compliance Engine",
      "Training Management System",
      "Clinical Competency Tracking",
      "Stripe Billing Integration",
      "Marketing Website Development",
      "Deployment & Optimisation",
    ],
    about:
      "Signoff360 is a workforce compliance platform built specifically for UK care providers. It replaces spreadsheet chaos with real-time compliance visibility, automated renewal protection, and clinical competency sign-off. The platform covers the full compliance lifecycle — from recruitment and onboarding through training management, DBS tracking, and CQC inspection readiness — ensuring care providers never miss a renewal or allocate unqualified staff.",
    whatWasDone: [
      "Built compliance gating engine with automated renewal alerts",
      "Developed clinical competency sign-off and tracking system",
      "Implemented training management with live training matrix",
      "Created recruitment and onboarding workflow",
      "Built client package authorisation module",
      "Designed audit trail and DBS expiry reporting",
      "Developed real-time compliance dashboard",
    ],
    howItWasDone: [
      "Mapped CQC inspection requirements into digital compliance rules",
      "Designed automated alerting for document expirations and renewals",
      "Built role-based access for care managers and clinical leads",
      "Structured tiered subscription model via Stripe",
      "Focused on clarity-first UX for non-technical care staff",
    ],
    technologyUsed: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      backend: ["Node.js", "Prisma"],
      database: ["PostgreSQL", "Neon"],
      integrations: ["Stripe", "Email Notifications"],
      hosting: ["Vercel"],
    },
    timeline: {
      durationLabel: "10–12 Weeks",
      phases: ["Compliance Mapping", "UX Design", "Backend Build", "QA Testing", "Launch"],
    },
    challenges: [
      {
        challenge: "Translating complex CQC compliance rules into an intuitive interface.",
        solution:
          "Designed a structured compliance gating system with traffic-light status indicators and automated alerts.",
      },
      {
        challenge: "Ensuring care managers can use the system without technical training.",
        solution:
          "Built clarity-first UX with guided workflows and contextual help throughout.",
      },
    ],
    results: [
      { label: "Platform Status", value: "Live & Operational" },
      { label: "Compliance Coverage", value: "Full CQC Inspection Readiness" },
      { label: "Architecture", value: "Multi-Tenant SaaS Infrastructure" },
    ],
    cta: {
      title: "Building a Compliance Platform?",
      copy: "Let's architect a system that keeps your workforce compliant.",
      buttonLabel: "Start a Project",
      buttonHref: "/contact",
    },
  },
]

/* ── Helper functions ── */

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectsByCategory(
  category: Project["category"]
): Project[] {
  return projects.filter((p) => p.category === category)
}

export function getProjectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const idx = getProjectIndex(slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}

export function getAllIndustryTags(): string[] {
  const tags = new Set<string>()
  projects.forEach((p) => p.industryTags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}
