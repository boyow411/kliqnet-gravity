import {
  FounderSection,
  ProcessSection,
  ContactBand,
} from "@/components/marketing";
export const metadata = {
  alternates: { canonical: "/about" },
  title: "About Kliqnet Digital",
  description:
    "Meet Francis Makanju and the operator-led agency behind Kliqnet’s websites, products and business systems.",
};
export default function About() {
  return (
    <div className="agency page-top">
      <section className="container intro">
        <p className="eyebrow">About the agency</p>
        <h1>
          Good software starts
          <br />
          with understanding
          <br />
          <em>the business.</em>
        </h1>
        <p>
          We bring development, design and the realities of running a business
          into the same conversation.
        </p>
      </section>
      <FounderSection full />
      <section className="section container">
        <div className="section-heading">
          <h2>
            One agency.
            <br />A growing body of work.
          </h2>
          <p>
            Our portfolio brings together Kliqnet products and business
            websites, with the relationship and delivery stage explained in each
            story.
          </p>
        </div>
        <div className="process-grid">
          {[
            [
              "Practical judgment",
              "We shape the scope around the work people need to do.",
            ],
            [
              "Clear ownership",
              "We define responsibilities, handover and support before delivery.",
            ],
            [
              "Evidence over claims",
              "We show what was built and describe its current stage.",
            ],
            [
              "Care after launch",
              "We can keep improving the product as the business changes.",
            ],
          ].map(([t, p]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <ProcessSection />
      <ContactBand />
    </div>
  );
}
