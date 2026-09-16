import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { site } from "@/lib/site";
export const metadata = pageMetadata({
  title: "Website terms | Kliqnet Digital",
  description:
    "Website use, project enquiries and the scope of portfolio examples.",
  path: "/terms",
});
export default function TermsPage() {
  return (
    <article className="agency container legal-copy section">
      <p className="eyebrow">Website terms · Updated 8 September 2026</p>
      <h1>A clear starting point.</h1>
      <h2>Using this website</h2>
      <p>
        This website describes Kliqnet Digital’s services, products and project
        work. Please do not misuse it, interfere with its operation or attempt
        unauthorised access to private accounts or records.
      </p>
      <h2>Enquiries and call requests</h2>
      <p>
        Sending an enquiry or requesting a call does not confirm a booking,
        project availability, price or delivery date. We agree scope, fees,
        timings, ownership and support separately in the proposal or project
        agreement.
      </p>
      <h2>Project agreements</h2>
      <p>
        Services and deliverables are governed by the written agreement for that
        project. Those terms take priority for the work they cover. Third-party
        subscriptions, provider fees, domains and ongoing support are included
        only where the scope says so.
      </p>
      <h2>Our work and other people’s work</h2>
      <p>
        Branding, designs and project materials belong to Kliqnet Digital or the
        relevant rights holder. The portfolio includes Kliqnet products and work
        for businesses and brands, with the relationship and stage described on
        each case study.
      </p>
      <h2>Examples and availability</h2>
      <p>
        Case studies describe particular work and design decisions. They do not
        promise identical commercial results for another business. Product
        features and availability can change; check the linked product website
        or speak with us before relying on an example for a purchase decision.
      </p>
      <h2>Contact</h2>
      <p>
        For questions about these terms or a project agreement, email{" "}
        <a href={"mailto:" + site.email}>{site.email}</a>.
      </p>
      <Link className="text-link" href="/privacy">
        Privacy notice →
      </Link>
    </article>
  );
}
