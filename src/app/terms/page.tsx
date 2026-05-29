import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Kliqnet Digital",
  description: "Terms of service placeholder for Kliqnet Digital while the final legal copy is prepared.",
};

const termsSections = [
  {
    title: "Website use",
    body: "The Kliqnet Digital website is provided for general information about our services, projects and ways to contact us. Do not misuse the website, interfere with its security or attempt unauthorised access.",
  },
  {
    title: "Project enquiries",
    body: "Submitting an enquiry or booking a call does not create a client relationship, guarantee availability or confirm pricing. Scope, timings, deliverables and fees are agreed separately in writing.",
  },
  {
    title: "Services and deliverables",
    body: "Any design, development, automation, AI or growth work is governed by the proposal, statement of work or agreement accepted for that project. Those project terms take priority over this general website page.",
  },
  {
    title: "Content and intellectual property",
    body: "Kliqnet Digital branding, website content, designs, copy and project materials shown on this website remain the property of Kliqnet Digital or the relevant rights holder unless agreed otherwise.",
  },
  {
    title: "No guarantees",
    body: "We aim to build practical, high-quality systems, but website content and examples are not a promise of identical commercial results. Outcomes depend on scope, market, operations, traffic and many external factors.",
  },
];

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">
            Legal
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            This page is a practical placeholder while Kliqnet Digital prepares its final legal copy. It keeps the footer legal links live and sets out basic website-use terms.
          </p>
          <p className="text-sm text-gray-600 mb-12">
            Last updated: 26 May 2026
          </p>

          <div className="space-y-6">
            {termsSections.map((section) => (
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
            <h2 className="text-xl font-semibold mb-3">Questions</h2>
            <p className="text-gray-400 leading-relaxed">
              For service terms, proposals or project-specific agreements, contact hello@kliqnet.com and we will point you to the right document.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-gray-200 transition-colors"
            >
              Book a Free Strategy Call
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center rounded-lg border border-white/[0.12] px-6 py-3 font-medium text-white hover:bg-white/[0.06] transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
