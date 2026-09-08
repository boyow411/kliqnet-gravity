export const serviceLandingPages = [
  {
    slug: "web-development",
    title: "Websites & customer journeys",
    headline: "A website that earns its place in your business.",
    subheadline:
      "From positioning and content to an enquiry, booking or purchase journey, we shape the website around what visitors need to do.",
    benefits: [
      {
        title: "Clear content",
        description:
          "A page structure and copy that make your offer easy to understand.",
      },
      {
        title: "Useful journeys",
        description:
          "Enquiries, menus, booking routes and integrations appropriate to your business.",
      },
      {
        title: "Search foundations",
        description:
          "Semantic pages, useful metadata, sitemap and accessible navigation.",
      },
      {
        title: "A maintainable handover",
        description: "An agreed editing workflow, deployment and support plan.",
      },
    ],
    projectSlugs: ["esq", "shnc"],
  },
  {
    slug: "saas-development",
    title: "SaaS & digital products",
    headline: "Turn a real problem into a useful product.",
    subheadline:
      "We help define the first release, design the user journeys and build the application behind them.",
    benefits: [
      {
        title: "Product definition",
        description:
          "Clear users, essential workflows and a scoped first release.",
      },
      {
        title: "Accounts and permissions",
        description:
          "Access decisions designed around teams, organisations and ownership.",
      },
      {
        title: "Connected operations",
        description:
          "Billing, external services and reporting scoped to the product.",
      },
      {
        title: "Release evidence",
        description:
          "Checks for critical workflows, failure handling and a practical handover.",
      },
    ],
    projectSlugs: ["rotdule", "kliqpos"],
  },
  {
    slug: "automation",
    title: "Automation & operations",
    headline: "Make the work behind the business work better.",
    subheadline:
      "Bring disconnected tools, records and repetitive tasks into a clearer operational flow.",
    benefits: [
      {
        title: "Workflow mapping",
        description: "Understand the current handoffs before automating them.",
      },
      {
        title: "Connected records",
        description:
          "Integrations and internal tools that reduce duplicate work.",
      },
      {
        title: "Human checkpoints",
        description: "Keep decisions, exceptions and approvals visible.",
      },
      {
        title: "Operational feedback",
        description: "Show what ran, what failed and what needs attention.",
      },
    ],
    projectSlugs: ["signoff360", "skeduda"],
  },
  {
    slug: "ai-integration",
    title: "Practical AI integration",
    headline: "Put AI to work on a specific job.",
    subheadline:
      "We design AI features around a useful workflow, with visible costs, review points and recovery when a provider fails.",
    benefits: [
      {
        title: "A defined task",
        description: "Start with the use case, inputs and expected output.",
      },
      {
        title: "Provider integration",
        description:
          "Connect suitable models and services without hiding their constraints.",
      },
      {
        title: "Review and control",
        description:
          "Let people inspect, edit and approve outputs before they are used.",
      },
      {
        title: "Cost and failure handling",
        description:
          "Account for generation costs, retries and unfinished jobs.",
      },
    ],
    projectSlugs: ["cinekliq"],
  },
  {
    slug: "crm-operations",
    title: "CRM & internal tools",
    headline: "Give your team a clearer view of the work.",
    subheadline:
      "Build practical systems for enquiries, client records, assignments and operational follow-up.",
    benefits: [
      {
        title: "The right data model",
        description: "Agree what belongs in each record and who owns it.",
      },
      {
        title: "Team workflows",
        description:
          "Make handoffs, responsibilities and status easy to understand.",
      },
      {
        title: "Permissions",
        description: "Give people the access their role requires.",
      },
      {
        title: "Useful reporting",
        description:
          "Surface the next action, rather than another disconnected spreadsheet.",
      },
    ],
    projectSlugs: ["rotdule", "signoff360"],
  },
  {
    slug: "app-development",
    title: "Application development",
    headline: "Software built around how people actually work.",
    subheadline:
      "From browser applications to a mobile experience, we scope the platform around your users and the job they need to complete.",
    benefits: [
      {
        title: "A focused first release",
        description:
          "Define the essential workflow before expanding the feature list.",
      },
      {
        title: "Responsive product design",
        description:
          "Make the core experience usable on the devices that matter.",
      },
      {
        title: "A dependable backend",
        description: "Design data, authentication and integrations together.",
      },
      {
        title: "Platform decisions",
        description:
          "Agree browser, installable web or native requirements during discovery.",
      },
    ],
    projectSlugs: ["cinekliq", "rotdule"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile experiences",
    headline: "Start with the mobile task.",
    subheadline:
      "We help decide whether your users need a responsive website, an installable web app or a native application, then agree a realistic delivery scope.",
    benefits: [
      {
        title: "Mobile journeys",
        description:
          "Design for touch, smaller screens and interrupted attention.",
      },
      {
        title: "Platform assessment",
        description:
          "Check device, offline and notification requirements before choosing technology.",
      },
      {
        title: "Connected data",
        description:
          "Plan sign-in, permissions and API behaviour for the intended experience.",
      },
      {
        title: "Release planning",
        description:
          "Agree testing devices and any store submission dependencies in the proposal.",
      },
    ],
    projectSlugs: ["esq", "rotdule"],
  },
  {
    slug: "digital-marketing",
    title: "Digital launch foundations",
    headline: "Give your next launch a stronger starting point.",
    subheadline:
      "Connect positioning, a convincing website and useful product stories so your wider marketing has somewhere effective to lead.",
    benefits: [
      {
        title: "Clear positioning",
        description: "Explain who the offer is for and why it matters.",
      },
      {
        title: "Campaign destinations",
        description: "Build focused pages and clear next steps.",
      },
      {
        title: "Useful proof",
        description:
          "Turn real product work into case studies and demonstration material.",
      },
      {
        title: "Measurement",
        description:
          "Agree the enquiries and actions that matter before choosing reporting tools.",
      },
    ],
    projectSlugs: ["esq", "cinekliq"],
  },
];
export function getServiceLandingData(slug: string) {
  return serviceLandingPages.find((s) => s.slug === slug);
}
