import Link from "next/link";
export default function NotFound() {
  return (
    <section className="agency container intro section">
      <p className="eyebrow">404 / Page not found</p>
      <h1>
        Let’s find your
        <br />
        next step.
      </h1>
      <p>
        This page may have moved. Explore the current portfolio or tell us what
        you’re looking for.
      </p>
      <div className="hero-actions">
        <Link className="button button-light" href="/projects">
          Explore our work
        </Link>
        <Link className="text-link" href="/contact">
          Contact Kliqnet →
        </Link>
      </div>
    </section>
  );
}
