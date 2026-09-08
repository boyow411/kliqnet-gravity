import Link from "next/link";
import { site } from "@/lib/site";
export const metadata = {
  title: "Privacy | Kliqnet Digital",
  description:
    "How Kliqnet Digital handles website enquiries and essential service data.",
  alternates: { canonical: "/privacy" },
};
export default function PrivacyPage() {
  return (
    <article className="agency container legal-copy section">
      <p className="eyebrow">
        Website privacy notice · Updated 8 September 2026
      </p>
      <h1>Your information.</h1>
      <p>
        Kliqnet Digital is responsible for the enquiry information collected
        through this website. Contact us at{" "}
        <a href={"mailto:" + site.email}>{site.email}</a> about this notice or
        your information.
      </p>
      <h2>What you send us</h2>
      <p>
        Our project and call-request forms collect your name, email address,
        project details and any company, budget or timing information you choose
        to provide. Please avoid including passwords, payment details or
        sensitive personal information in an enquiry.
      </p>
      <h2>Why we use it</h2>
      <p>
        We use these details to respond, discuss potential work and keep a
        record of the conversation. Where you ask us to prepare a proposal or
        provide a service, processing supports the steps you request before a
        contract. Business enquiries and basic abuse prevention also support our
        legitimate interest in operating and protecting the agency website.
      </p>
      <h2>Storage and service providers</h2>
      <p>
        Enquiries are stored in our database and available to authorised agency
        users. The website uses Vercel for hosting and Neon for database
        infrastructure. Providers may process service data outside the UK under
        their applicable data-processing arrangements. When you follow a link to
        another product or a scheduling service, that service has its own
        privacy notice.
      </p>
      <h2>Essential technical data and measurement</h2>
      <p>
        Hosting systems process technical request information to deliver and
        protect the site. Our enquiry form uses a short-lived hash of a network
        address to limit repeated submissions; records older than 24 hours are
        removed when the next request is processed. Our own measurement records
        daily totals of public page views and enquiry actions, without cookies,
        visitor profiles, query-string contents or the text you enter. Signing
        in to the private workspace requires session cookies.
      </p>
      <h2>How long we keep information</h2>
      <p>
        We keep enquiry records while needed to manage the conversation, any
        resulting work and relevant business-record obligations. You can ask us
        to review or delete a record when it is no longer needed. We do not sell
        enquiry information or add you to a marketing list through these forms.
      </p>
      <h2>Your rights and questions</h2>
      <p>
        You may request access, correction, erasure, restriction or portability
        of your personal information, or object to processing where applicable.
        Contact <a href={"mailto:" + site.email}>{site.email}</a>. You can also
        raise a concern with the{" "}
        <a
          href="https://ico.org.uk/make-a-complaint/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Information Commissioner’s Office
        </a>
        .
      </p>
      <Link className="text-link" href="/terms">
        Website terms →
      </Link>
    </article>
  );
}
