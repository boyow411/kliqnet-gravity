"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="agency container intro section">
      <p className="eyebrow">Please try again</p>
      <h1>This page couldn’t load.</h1>
      <p>
        We couldn’t retrieve the page content. You can retry or contact us
        directly.
      </p>
      <div className="hero-actions">
        <button className="button button-light" onClick={reset}>
          Try again
        </button>
        <Link className="text-link" href="mailto:hello@kliqnetdigital.com">
          Email Kliqnet →
        </Link>
      </div>
    </section>
  );
}
