import { z } from "zod";
export const contactSchema = z.object({
  submissionKey: z.string().uuid(),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254),
  company: z.string().trim().max(160).default(""),
  projectType: z.enum([
    "Website & customer journey",
    "SaaS or digital product",
    "Automation & operations",
    "Not sure yet",
    "Strategy call",
  ]),
  budget: z.string().trim().max(120).default("Not sure yet"),
  timeline: z.string().trim().max(160).default("Flexible"),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000),
  website: z.string().max(300).default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;
