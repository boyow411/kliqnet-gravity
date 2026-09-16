import { z } from "zod";
const safeLink = z.string().refine(
  (v) =>
    !v ||
    (() => {
      try {
        return new URL(v).protocol === "https:";
      } catch {
        return false;
      }
    })(),
  "Use an HTTPS URL",
);
const asset = z
  .string()
  .refine(
    (v) => /^\/(?!\/)[a-zA-Z0-9/_ .%-]+\.(png|jpg|jpeg|webp|gif)$/i.test(v),
    "Use a local image path or upload an image",
  );
export const storySchema = z
  .object({
    coverImage: asset,
    coverCaption: z.string().min(3).max(500),
    screenshots: z.array(asset).max(12).default([]),
    captions: z.array(z.string().max(500)).max(12).default([]),
    sector: z.enum([
      "Healthcare",
      "Hospitality",
      "Business software",
      "Creative & community",
      "Education",
    ]),
    relationship: z.string().min(3).max(160),
    stageNote: z.string().min(3).max(800),
    problem: z.string().min(20).max(2000),
    contribution: z.array(z.string().min(3).max(500)).min(1).max(12),
    workflow: z
      .array(
        z.object({
          title: z.string().min(2).max(120),
          text: z.string().min(5).max(800),
        }),
      )
      .min(1)
      .max(6),
    outcome: z.string().min(20).max(2000),
    decision: z.string().min(20).max(2000),
    evidenceDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((v) => Number.isFinite(Date.parse(v)), "Use a valid date"),
    featuredOrder: z.number().int().min(0).max(999).default(99),
    technologies: z.array(z.string().max(80)).max(15).default([]),
  })
  .refine(
    (d) =>
      d.captions.length === d.screenshots.length &&
      d.captions.every((c) => c.trim().length >= 3),
    {
      message: "Add a useful caption for every project image",
      path: ["captions"],
    },
  );
export const portfolioSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(2).max(160),
  category: z.enum(["Venture Studio", "Client Transformation"]),
  industryTags: z.string().max(500).default(""),
  status: z.enum(["Live", "Pilot", "In Development", "Delivered"]),
  tagline: z.string().min(5).max(240),
  shortDescription: z.string().min(10).max(600),
  primaryUrl: safeLink.default(""),
  data: storySchema,
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});
export type PortfolioProject = z.infer<typeof portfolioSchema>;
export type ProjectStory = z.infer<typeof storySchema>;
export function categoryLabel(category: string) {
  return category === "Venture Studio"
    ? "Kliqnet products"
    : "Business & brand websites";
}
