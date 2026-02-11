import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    budget: text("budget"),
    projectType: text("project_type"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    role: text("role").default("user"), // user, admin
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
