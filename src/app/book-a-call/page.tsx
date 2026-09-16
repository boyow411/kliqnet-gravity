import { pageMetadata } from "@/lib/page-metadata";
import { MultiStepForm } from "@/components/forms/multi-step-form";
import { site } from "@/lib/site";
export const metadata = pageMetadata({
  path: "/book-a-call",
  title: "Request a Strategy Call | Kliqnet Digital",
  description:
    "Request an introductory conversation about your next website, product or operational system.",
});
export default function BookCall() {
  const raw = process.env.STRATEGY_CALL_URL;
  let booking = "";
  try {
    if (raw) {
      const u = new URL(raw);
      if (
        u.protocol === "https:" &&
        ["cal.com", "calendly.com"].includes(u.hostname)
      )
        booking = u.href;
    }
  } catch {}
  return (
    <div className="agency page-top">
      <div className="container enquiry-layout">
        <div className="enquiry-aside">
          <p className="eyebrow">Let’s think it through</p>
          <h1>
            A conversation
            <br />
            about <em>your next move.</em>
          </h1>
          <p>
            We’ll talk about the business, the people using the product, and
            what a sensible first scope could look like.
          </p>
          <p>
            The introductory conversation is free. Share your preferred times
            and timezone; we’ll reply to arrange a time together.
          </p>
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
          </a>
          {booking && (
            <p className="mt-8">
              <a
                className="button button-light"
                href={booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Choose an available time ↗
              </a>
            </p>
          )}
        </div>
        <MultiStepForm call />
      </div>
    </div>
  );
}
