import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

/* ─── Users ─── */
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    passwordHash: text("password_hash"),
    role: text("role").default("user").notNull(), // user, admin
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ─── Contact Submissions ─── */
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
    status: text("status").default("new").notNull(), // new, read, replied, archived
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Blog Posts ─── */
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
    published: boolean("published").default(false).notNull(),
    date: text("date").notNull(),
    relatedSlugs: text("related_slugs"), // comma-separated slugs
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ─── Project Case Studies ─── */
export const projectCaseStudies = pgTable("project_case_studies", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    category: text("category").notNull(), // "Venture Studio" | "Client Transformation"
    industryTags: text("industry_tags"), // comma-separated
    status: text("status").notNull(), // "Live" | "In Development"
    tagline: text("tagline").notNull(),
    shortDescription: text("short_description").notNull(),
    primaryUrl: text("primary_url"),
    data: jsonb("data"), // full project JSON data (screenshots, scope, tech, etc.)
    featured: boolean("featured").default(false).notNull(),
    published: boolean("published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ─── Audit Log ─── */
export const auditLog = pgTable("audit_log", {
    id: serial("id").primaryKey(),
    userId: integer("user_id"),
    action: text("action").notNull(), // create, update, delete, login, export
    entity: text("entity").notNull(), // blog, project, submission, settings
    entityId: text("entity_id"),
    details: text("details"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Site Settings ─── */
export const siteSettings = pgTable("site_settings", {
    id: serial("id").primaryKey(),
    key: text("key").notNull().unique(),
    value: text("value"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
