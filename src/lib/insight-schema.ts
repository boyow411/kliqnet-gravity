import { z } from "zod";
export const insightSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(5).max(240),
  excerpt: z.string().min(10).max(600),
  content: z.string().min(50).max(80000),
  category: z.string().min(2).max(100),
  authorName: z.string().min(2).max(160),
  authorRole: z.string().min(2).max(160),
  readingTime: z.string().max(80).default(""),
  coverImage: z
    .string()
    .refine(
      (v) => !v || /^\/(?!\/)[a-zA-Z0-9/_ .%-]+\.(png|jpg|jpeg|webp)$/i.test(v),
      "Use a local image or upload a PNG, JPEG or WebP.",
    )
    .default(""),
  published: z.boolean().default(false),
  date: z
    .string()
    .refine(
      (v) => Number.isFinite(Date.parse(v)),
      "Choose a valid publication date.",
    ),
  relatedSlugs: z.string().max(1000).default(""),
});
