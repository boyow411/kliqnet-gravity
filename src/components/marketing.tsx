import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { faqs } from "@/lib/site";
export const engagements = [
  {
    number: "01",
    title: "Websites that move people to act.",
    href: "/web-development",
    label: "Websites & customer journeys",
    text: "A considered digital presence, from the first impression to the enquiry, booking or purchase.",
    items: [
      "Positioning & content structure",
      "Website design & development",
      "Booking and enquiry journeys",
      "Search foundations & measurement",
    ],
  },
  {
    number: "02",
    title: "Products built around a real need.",
    href: "/saas-development",
    label: "SaaS & digital products",
    text: "Turn a promising idea into a focused product with clear workflows, permissions and a plan beyond launch.",
    items: [
      "Product discovery & MVP scoping",
      "UX, application & platform design",
      "Accounts, billing & integrations",
      "Testing, deployment & handover",
    ],
  },
  {
    number: "03",
    title: "Systems that make the day easier.",
    href: "/automation",
    label: "Automation & operations",
    text: "Connect the work behind the business. Fewer disconnected tools, clearer records and less manual chasing.",
    items: [
      "Workflow mapping & internal tools",
      "CRM and connected operations",
      "Practical AI integrations",
      "Reporting & operational visibility",
    ],
  },
];
export function ServicesSection() {
  return (
    <section className="section container" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">How we can help</p>
          <h2>
            Start with the problem.
            <br />
            Build what matters.
          </h2>
        </div>
        <p>
          Three ways to work with us. Each starts with your business and ends
          with a clear scope.
        </p>
      </div>
      <div className="engagement-grid">
        {engagements.map((s) => (
          <article className="engagement" key={s.number}>
            <span className="index">{s.number} /</span>
            <p className="eyebrow">{s.label}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul>
              {s.items.map((i) => (
                <li key={i}>
                  <Check size={15} />
                  {i}
                </li>
              ))}
            </ul>
            <Link className="text-link" href={s.href}>
              Explore this service <ArrowUpRight size={18} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export function FounderSection({ full = false }: { full?: boolean }) {
  return (
    <section className="founder-section">
      <div className="container founder-grid">
        <div>
          <p className="eyebrow">The people behind the work</p>
          <h2>
            Built with an
            <br />
            operator’s perspective.
          </h2>
          <p className="founder-name">
            Francis Makanju<span>Founder, Kliqnet Digital</span>
          </p>
        </div>
        <div className="founder-copy">
          <p className="large-copy">
            The website is only the beginning. The real question is how the
            business works once someone uses it.
          </p>
          <p>
            Kliqnet brings together years of development work and hands-on
            experience across hospitality, healthcare and digital products. We
            have delivered more than 50 projects over that time.
          </p>
          <p>
            That perspective shapes the questions we ask: who needs access, what
            happens when something changes, how does the team use it, and what
            needs to happen after launch?
          </p>
          {full ? (
            <p>
              Francis leads the agency’s product direction. Our work spans
              independent products developed within Kliqnet and digital projects
              for businesses and brands. We use modern development and AI tools
              where they help, with human judgment guiding scope, design and
              release decisions.
            </p>
          ) : (
            <Link className="text-link" href="/about">
              Meet the agency <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
export function ProcessSection() {
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">From first conversation to handover</p>
          <h2>A clear way forward.</h2>
        </div>
        <p>Scope first. Visible progress. A considered launch.</p>
      </div>
      <ol className="process-grid">
        {[
          [
            "Understand",
            "We map the business problem, the people involved and what success needs to look like.",
          ],
          [
            "Design",
            "We agree the essential journeys, visual direction and delivery scope before building.",
          ],
          [
            "Build & review",
            "We turn the design into working software, with regular reviews and checks along the way.",
          ],
          [
            "Launch & improve",
            "We verify the agreed workflows, hand over the work and plan any ongoing support.",
          ],
        ].map(([title, text], i) => (
          <li key={title}>
            <span className="index">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function FAQSection() {
  return (
    <section className="section container faq-grid">
      <div>
        <p className="eyebrow">Before we begin</p>
        <h2>
          A few useful
          <br />
          answers.
        </h2>
      </div>
      <div>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container">
        <p className="eyebrow">Your next chapter</p>
        <h2>
          What could we
          <br />
          build together?
        </h2>
        <div>
          <p>
            A new website. A product idea. A system that makes work easier.
            <br />
            Tell us where you want to go.
          </p>
          <Link className="button button-light" href="/contact">
            Start a conversation <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
