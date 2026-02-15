/* ═══════════════════════════════════════════════════════════════
   Seed Script — Creates default org, admin user, and example template
   ═══════════════════════════════════════════════════════════════ */

import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const EXAMPLE_TEMPLATE_STEPS = [
    {
        id: "business_overview",
        title: "Business Overview",
        description: "Tell us about your company and goals",
        fields: [
            {
                id: "company_name",
                label: "Company Name",
                type: "text" as const,
                required: true,
                placeholder: "Acme Corp",
            },
            {
                id: "industry",
                label: "Industry",
                type: "select" as const,
                required: true,
                options: [
                    { label: "Technology", value: "technology" },
                    { label: "Healthcare", value: "healthcare" },
                    { label: "Finance", value: "finance" },
                    { label: "Retail", value: "retail" },
                    { label: "Education", value: "education" },
                    { label: "Other", value: "other" },
                ],
            },
            {
                id: "company_size",
                label: "Company Size",
                type: "select" as const,
                required: true,
                options: [
                    { label: "1-10 employees", value: "1-10" },
                    { label: "11-50 employees", value: "11-50" },
                    { label: "51-200 employees", value: "51-200" },
                    { label: "200+ employees", value: "200+" },
                ],
            },
            {
                id: "business_goals",
                label: "Business Goals",
                type: "textarea" as const,
                required: true,
                placeholder: "Tell us what you want to achieve...",
                helpText: "Be as specific as possible about your objectives",
            },
        ],
    },
    {
        id: "project_requirements",
        title: "Project Requirements",
        description: "Detail your technical and functional needs",
        fields: [
            {
                id: "target_audience",
                label: "Target Audience",
                type: "textarea" as const,
                required: true,
                placeholder: "Describe your ideal users / customers...",
            },
            {
                id: "key_features",
                label: "Key Features Needed",
                type: "multi-select" as const,
                required: true,
                options: [
                    { label: "User Authentication", value: "auth" },
                    { label: "Payment Processing", value: "payments" },
                    { label: "Admin Dashboard", value: "admin" },
                    { label: "Real-time Chat", value: "chat" },
                    { label: "Email Notifications", value: "email" },
                    { label: "Analytics", value: "analytics" },
                    { label: "API Integrations", value: "api" },
                    { label: "File Upload", value: "file-upload" },
                ],
            },
            {
                id: "has_existing_system",
                label: "Do you have an existing system?",
                type: "boolean" as const,
                required: true,
            },
            {
                id: "existing_system_url",
                label: "Existing System URL",
                type: "text" as const,
                required: false,
                placeholder: "https://...",
                condition: {
                    dependsOn: "has_existing_system",
                    value: true,
                    operator: "equals" as const,
                },
            },
        ],
    },
    {
        id: "design_preferences",
        title: "Design Preferences",
        description: "Help us understand your visual requirements",
        fields: [
            {
                id: "brand_colors",
                label: "Brand Colors",
                type: "text" as const,
                required: false,
                placeholder: "#000000, #FFFFFF",
                helpText: "Comma-separated hex codes",
            },
            {
                id: "reference_sites",
                label: "Reference Websites",
                type: "textarea" as const,
                required: false,
                placeholder: "List websites whose design you admire...",
            },
            {
                id: "brand_guidelines",
                label: "Brand Guidelines (PDF)",
                type: "file" as const,
                required: false,
                validation: {
                    fileTypes: ["application/pdf", "image/png", "image/jpeg"],
                    maxFileSize: 10 * 1024 * 1024,
                },
            },
        ],
    },
    {
        id: "timeline_budget",
        title: "Timeline & Budget",
        description: "Set expectations for delivery and investment",
        fields: [
            {
                id: "target_launch_date",
                label: "Target Launch Date",
                type: "date" as const,
                required: true,
            },
            {
                id: "budget_range",
                label: "Budget Range",
                type: "select" as const,
                required: true,
                options: [
                    { label: "Under £5,000", value: "under-5k" },
                    { label: "£5,000 – £15,000", value: "5k-15k" },
                    { label: "£15,000 – £50,000", value: "15k-50k" },
                    { label: "£50,000+", value: "50k-plus" },
                ],
            },
            {
                id: "additional_notes",
                label: "Additional Notes",
                type: "textarea" as const,
                required: false,
                placeholder: "Anything else we should know?",
            },
        ],
    },
];

async function seed() {
    console.log("🌱 Seeding onboarding system...\n");

    // 1. Create default organization
    const [existingOrg] = await db
        .select()
        .from(schema.organizations)
        .where(eq(schema.organizations.slug, "kliqnet"));

    let orgId: number;
    if (existingOrg) {
        orgId = existingOrg.id;
        console.log(`✓ Organization 'kliqnet' already exists (ID: ${orgId})`);
    } else {
        const [org] = await db
            .insert(schema.organizations)
            .values({ name: "Kliqnet Digital", slug: "kliqnet" })
            .returning();
        orgId = org.id;
        console.log(`✓ Created organization 'Kliqnet Digital' (ID: ${orgId})`);
    }

    // 2. Create admin user with hashed password
    const [existingUser] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, "admin@kliqnet.com"));

    if (existingUser) {
        // Update existing user with org and role
        await db
            .update(schema.users)
            .set({
                organizationId: orgId,
                role: "SUPER_ADMIN",
                passwordHash: await bcrypt.hash("admin", 12),
                updatedAt: new Date(),
            })
            .where(eq(schema.users.id, existingUser.id));
        console.log(`✓ Updated admin user (ID: ${existingUser.id})`);
    } else {
        const [user] = await db
            .insert(schema.users)
            .values({
                email: "admin@kliqnet.com",
                name: "Admin",
                passwordHash: await bcrypt.hash("admin", 12),
                role: "SUPER_ADMIN",
                organizationId: orgId,
            })
            .returning();
        console.log(`✓ Created admin user (ID: ${user.id})`);
    }

    // 3. Create example template
    const [existingTemplate] = await db
        .select()
        .from(schema.onboardingTemplates)
        .where(eq(schema.onboardingTemplates.name, "Web Development Onboarding"));

    if (existingTemplate) {
        console.log(`✓ Template 'Web Development Onboarding' already exists (ID: ${existingTemplate.id})`);
    } else {
        const [template] = await db
            .insert(schema.onboardingTemplates)
            .values({
                organizationId: orgId,
                name: "Web Development Onboarding",
                serviceType: "web-development",
                version: 1,
                isActive: true,
                steps: EXAMPLE_TEMPLATE_STEPS,
            })
            .returning();
        console.log(`✓ Created template 'Web Development Onboarding' (ID: ${template.id})`);
    }

    // 4. Create example client
    const [existingClient] = await db
        .select()
        .from(schema.clients)
        .where(eq(schema.clients.email, "demo@example.com"));

    if (existingClient) {
        console.log(`✓ Demo client already exists (ID: ${existingClient.id})`);
    } else {
        const [client] = await db
            .insert(schema.clients)
            .values({
                organizationId: orgId,
                companyName: "Demo Corp",
                contactName: "John Demo",
                email: "demo@example.com",
                phone: "+44 7700 900000",
            })
            .returning();
        console.log(`✓ Created demo client (ID: ${client.id})`);
    }

    console.log("\n✅ Onboarding system seeded successfully!");
}

seed()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ Seed error:", err);
        process.exit(1);
    });
