import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kliqnet Digital",
  description: "Privacy policy placeholder for Kliqnet Digital while the final legal copy is prepared.",
};

const privacySections = [
  {
    title: "Information we collect",
    body: "When you contact Kliqnet Digital, book a call or submit a project enquiry, we may collect your name, email address, phone number, company details and the information you choose to share about your project.",
  },
  {
    title: "How we use information",
    body: "We use enquiry information to respond to you, scope potential work, provide services, improve our website and maintain basic business records. We do not sell personal information.",
  },
  {
    title: "Third-party services",
    body: "Our website may use trusted tools for hosting, analytics, forms, scheduling, email and payment workflows. Those providers process data under their own privacy and security terms.",
  },
  {
    title: "Your choices",
    body: "You can ask us to update, export or delete personal information we hold about you where applicable. Email hello@kliqnet.com and we will respond as soon as reasonably possible.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">
            Legal
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            This page is a practical placeholder while Kliqnet Digital prepares its final legal copy. It explains, in plain language, how enquiries and basic website data are handled.
          </p>
          <p className="text-sm text-gray-600 mb-12">
            Last updated: 26 May 2026
          </p>

          <div className="space-y-6">
            {privacySections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-6">
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-400 leading-relaxed">
              Questions about privacy or data handling? Email hello@kliqnet.com or use the contact form and we will direct your request to the right person.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-gray-200 transition-colors"
            >
              Contact Kliqnet
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center rounded-lg border border-white/[0.12] px-6 py-3 font-medium text-white hover:bg-white/[0.06] transition-colors"
            >
              View Terms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
