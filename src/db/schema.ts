import { pgTable, text, serial, timestamp, boolean, integer, jsonb, real, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* ═══════════════════════════════════════════════════════════════
   ENUMS
   ═══════════════════════════════════════════════════════════════ */

export const userRoleEnum = pgEnum("user_role", [
    "SUPER_ADMIN",
    "ADMIN",
    "TEAM_MEMBER",
    "CLIENT",
]);

export const projectStatusEnum = pgEnum("project_status", [
    "DRAFT",
    "ONBOARDING",
    "IN_PROGRESS",
    "COMPLETED",
    "ARCHIVED",
]);

export const sessionStatusEnum = pgEnum("session_status", [
    "DRAFT",
    "IN_PROGRESS",
    "COMPLETED",
    "APPROVED",
]);

export const milestoneStatusEnum = pgEnum("milestone_status", [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "OVERDUE",
]);

export const taskStatusEnum = pgEnum("task_status", [
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "BLOCKED",
]);

/* ═══════════════════════════════════════════════════════════════
   ORGANIZATIONS (Multi-Tenant Root)
   ═══════════════════════════════════════════════════════════════ */

export const organizations = pgTable("organizations", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logoUrl: text("logo_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   USERS (Extended)
   ═══════════════════════════════════════════════════════════════ */

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id"),
    email: text("email").notNull().unique(),
    name: text("name"),
    passwordHash: text("password_hash"),
    role: userRoleEnum("role").default("TEAM_MEMBER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   CLIENTS
   ═══════════════════════════════════════════════════════════════ */

export const clients = pgTable("clients", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id").notNull(),
    companyName: text("company_name").notNull(),
    contactName: text("contact_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   ONBOARDING TEMPLATES
   ═══════════════════════════════════════════════════════════════ */

export const onboardingTemplates = pgTable("onboarding_templates", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id").notNull(),
    name: text("name").notNull(),
    serviceType: text("service_type").notNull(),
    version: integer("version").default(1).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    steps: jsonb("steps").notNull(), // TemplateStep[]
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════════ */

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id").notNull(),
    clientId: integer("client_id").notNull(),
    name: text("name").notNull(),
    serviceType: text("service_type").notNull(),
    status: projectStatusEnum("status").default("DRAFT").notNull(),
    onboardingSessionId: integer("onboarding_session_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   ONBOARDING SESSIONS
   ═══════════════════════════════════════════════════════════════ */

export const onboardingSessions = pgTable("onboarding_sessions", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id").notNull(),
    templateId: integer("template_id").notNull(),
    clientId: integer("client_id").notNull(),
    projectId: integer("project_id"),
    status: sessionStatusEnum("status").default("DRAFT").notNull(),
    completionPercentage: real("completion_percentage").default(0).notNull(),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   ONBOARDING RESPONSES
   ═══════════════════════════════════════════════════════════════ */

export const onboardingResponses = pgTable("onboarding_responses", {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").notNull(),
    stepId: text("step_id").notNull(),
    fieldId: text("field_id").notNull(),
    value: jsonb("value"), // flexible — string, array, object
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   FILE UPLOADS
   ═══════════════════════════════════════════════════════════════ */

export const fileUploads = pgTable("file_uploads", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id").notNull(),
    sessionId: integer("session_id"),
    fileName: text("file_name").notNull(),
    url: text("url").notNull(),
    fileType: text("file_type").notNull(),
    sizeBytes: integer("size_bytes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   MILESTONES
   ═══════════════════════════════════════════════════════════════ */

export const milestones = pgTable("milestones", {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: timestamp("due_date"),
    status: milestoneStatusEnum("status").default("PENDING").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   TASKS
   ═══════════════════════════════════════════════════════════════ */

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").notNull(),
    milestoneId: integer("milestone_id"),
    title: text("title").notNull(),
    description: text("description"),
    status: taskStatusEnum("status").default("TODO").notNull(),
    assignedTo: integer("assigned_to"),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   AUDIT LOG (Extended)
   ═══════════════════════════════════════════════════════════════ */

export const auditLog = pgTable("audit_log", {
    id: serial("id").primaryKey(),
    organizationId: integer("organization_id"),
    userId: integer("user_id"),
    action: text("action").notNull(),
    entity: text("entity").notNull(),
    entityId: text("entity_id"),
    details: text("details"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   CONTACT SUBMISSIONS (unchanged)
   ═══════════════════════════════════════════════════════════════ */

export const contactSubmissions = pgTable("contact_submissions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    budget: text("budget"),
    projectType: text("project_type"),
    timeline: text("timeline"),
    businessStage: text("business_stage"),
    message: text("message").notNull(),
    status: text("status").default("new").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   BLOG POSTS (unchanged)
   ═══════════════════════════════════════════════════════════════ */

export const blogPosts = pgTable("blog_posts", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull(),
    authorName: text("author_name").notNull(),
    authorRole: text("author_role").notNull(),
    readingTime: text("reading_time"),
    coverImage: text("cover_image"),
    published: boolean("published").default(false).notNull(),
    date: text("date").notNull(),
    relatedSlugs: text("related_slugs"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   PROJECT CASE STUDIES (unchanged)
   ═══════════════════════════════════════════════════════════════ */

export const projectCaseStudies = pgTable("project_case_studies", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    industryTags: text("industry_tags"),
    status: text("status").notNull(),
    tagline: text("tagline").notNull(),
    shortDescription: text("short_description").notNull(),
    primaryUrl: text("primary_url"),
    data: jsonb("data"),
    featured: boolean("featured").default(false).notNull(),
    published: boolean("published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   SITE SETTINGS (unchanged)
   ═══════════════════════════════════════════════════════════════ */

export const siteSettings = pgTable("site_settings", {
    id: serial("id").primaryKey(),
    key: text("key").notNull().unique(),
    value: text("value"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ═══════════════════════════════════════════════════════════════
   RELATIONS
   ═══════════════════════════════════════════════════════════════ */

export const organizationsRelations = relations(organizations, ({ many }) => ({
    users: many(users),
    clients: many(clients),
    projects: many(projects),
    templates: many(onboardingTemplates),
    sessions: many(onboardingSessions),
}));

export const usersRelations = relations(users, ({ one }) => ({
    organization: one(organizations, {
        fields: [users.organizationId],
        references: [organizations.id],
    }),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [clients.organizationId],
        references: [organizations.id],
    }),
    projects: many(projects),
    sessions: many(onboardingSessions),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [projects.organizationId],
        references: [organizations.id],
    }),
    client: one(clients, {
        fields: [projects.clientId],
        references: [clients.id],
    }),
    onboardingSession: one(onboardingSessions, {
        fields: [projects.onboardingSessionId],
        references: [onboardingSessions.id],
    }),
    milestones: many(milestones),
    tasks: many(tasks),
}));

export const onboardingTemplatesRelations = relations(onboardingTemplates, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [onboardingTemplates.organizationId],
        references: [organizations.id],
    }),
    sessions: many(onboardingSessions),
}));

export const onboardingSessionsRelations = relations(onboardingSessions, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [onboardingSessions.organizationId],
        references: [organizations.id],
    }),
    template: one(onboardingTemplates, {
        fields: [onboardingSessions.templateId],
        references: [onboardingTemplates.id],
    }),
    client: one(clients, {
        fields: [onboardingSessions.clientId],
        references: [clients.id],
    }),
    responses: many(onboardingResponses),
    fileUploads: many(fileUploads),
}));

export const onboardingResponsesRelations = relations(onboardingResponses, ({ one }) => ({
    session: one(onboardingSessions, {
        fields: [onboardingResponses.sessionId],
        references: [onboardingSessions.id],
    }),
}));

export const fileUploadsRelations = relations(fileUploads, ({ one }) => ({
    organization: one(organizations, {
        fields: [fileUploads.organizationId],
        references: [organizations.id],
    }),
    session: one(onboardingSessions, {
        fields: [fileUploads.sessionId],
        references: [onboardingSessions.id],
    }),
}));

export const milestonesRelations = relations(milestones, ({ one, many }) => ({
    project: one(projects, {
        fields: [milestones.projectId],
        references: [projects.id],
    }),
    tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
    project: one(projects, {
        fields: [tasks.projectId],
        references: [projects.id],
    }),
    milestone: one(milestones, {
        fields: [tasks.milestoneId],
        references: [milestones.id],
    }),
    assignee: one(users, {
        fields: [tasks.assignedTo],
        references: [users.id],
    }),
}));
