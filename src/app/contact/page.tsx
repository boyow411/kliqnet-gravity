import { MultiStepForm } from "@/components/forms/multi-step-form";
import { site } from "@/lib/site";
export const metadata = {
  title: "Start a Project | Kliqnet Digital",
  description:
    "Tell Kliqnet what you want to build or improve. Start a conversation about your website, software or operations.",
  alternates: { canonical: "/contact" },
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project } = await searchParams;
  return (
    <div className="agency page-top">
      <div className="container enquiry-layout">
        <div className="enquiry-aside">
          <p className="eyebrow">A good place to start</p>
          <h1>
            Tell us what
            <br />
            comes <em>next.</em>
          </h1>
          <p>
            A new idea, an existing product, or a business process that needs to
            work better. Give us a little context and we’ll help shape the next
            step.
          </p>
          <p>No finished specification needed.</p>
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
          </a>
          <div className="mt-10">
            <p className="eyebrow">What happens next</p>
            <p>
              We review your brief, come back with any questions, and agree
              whether a discovery conversation is the right next step.
            </p>
          </div>
        </div>
        <MultiStepForm project={(project || "").slice(0, 160)} />
      </div>
    </div>
  );
}
