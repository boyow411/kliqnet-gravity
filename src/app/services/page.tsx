import { pageMetadata } from "@/lib/page-metadata";
import {
  ServicesSection,
  ProcessSection,
  FAQSection,
  ContactBand,
} from "@/components/marketing";
export const metadata = pageMetadata({
  path: "/services",
  title: "Services | Kliqnet Digital",
  description:
    "Website design, SaaS development and practical automation. Start with a clear scope around your business.",
});
export default function Services() {
  return (
    <div className="agency page-top">
      <section className="container intro">
        <p className="eyebrow">Work with Kliqnet</p>
        <h1>
          Your ambition.
          <br />A practical
          <br />
          <em>plan to build it.</em>
        </h1>
        <p>
          From the first customer-facing page to the systems behind the scenes,
          we help you make the next move.
        </p>
      </section>
      <ServicesSection />
      <ProcessSection />
      <FAQSection />
      <ContactBand />
    </div>
  );
}
