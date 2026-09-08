"use client";
import { recordSiteEvent } from "@/components/site-measurement";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
export function MultiStepForm({
  call = false,
  project = "",
}: {
  call?: boolean;
  project?: string;
}) {
  const key = useRef("");
  const started = useRef(false);
  const path = call ? "/book-a-call" : "/contact";
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [reference, setReference] = useState("");
  const success = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    key.current ||= crypto.randomUUID();
    const data = Object.fromEntries(f.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submissionKey: key.current }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(
          body.error ||
            "We could not save your enquiry. Please try again or email us.",
        );
        return;
      }
      recordSiteEvent("enquiry_complete", path);
      setReference(body.reference);
      requestAnimationFrame(() => success.current?.focus());
    } catch {
      setError(
        "We could not confirm your enquiry. Your details are still here. Please retry, or email us directly.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (reference)
    return (
      <div ref={success} tabIndex={-1} className="form-success" role="status">
        <CheckCircle2 size={32} className="mb-5 text-blue-300" />
        <h2>Your enquiry is with us.</h2>
        <p>
          Reference <strong>{reference}</strong>. We’ll review your brief and
          reply to the email address you provided.
        </p>
        {call && (
          <p>
            This is a call request. A date and time will be agreed with you by
            email.
          </p>
        )}
        <p className="form-hint">
          Keep this reference for any follow-up. No appointment or project has
          been confirmed yet.
        </p>
        <Link href="/projects" className="text-link mt-6">
          Explore our work <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  return (
    <form
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          recordSiteEvent("enquiry_start", path);
        }
      }}
      onSubmit={submit}
      className="enquiry-form"
      aria-label={call ? "Request a strategy call" : "Project enquiry"}
    >
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="enquiry-name">Your name *</label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
          />
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-email">Email address *</label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </div>
        <div className="form-field full">
          <label htmlFor="enquiry-company">
            Business or product name <span>(optional)</span>
          </label>
          <input
            id="enquiry-company"
            name="company"
            autoComplete="organization"
            maxLength={160}
          />
        </div>
        <div className="form-field full">
          <label htmlFor="enquiry-type">What would you like help with? *</label>
          <select
            id="enquiry-type"
            name="projectType"
            defaultValue={call ? "Strategy call" : "Not sure yet"}
          >
            {[
              "Not sure yet",
              "Website & customer journey",
              "SaaS or digital product",
              "Automation & operations",
              "Strategy call",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-budget">
            Budget in mind <span>(optional)</span>
          </label>
          <input
            id="enquiry-budget"
            name="budget"
            maxLength={120}
            placeholder="Not sure yet, or amount + currency"
          />
          <p className="form-hint">
            For example, GBP £10,000. This helps us scope the work; it isn’t a
            price quote.
          </p>
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-timeline">
            {call ? "Preferred call times" : "Timing"} <span>(optional)</span>
          </label>
          <input
            id="enquiry-timeline"
            name="timeline"
            maxLength={160}
            placeholder={
              call ? "Days, times and timezone" : "Flexible, or a target date"
            }
          />
        </div>
        <div className="form-field full">
          <label htmlFor="enquiry-message">
            Tell us what you want to achieve *
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            required
            minLength={20}
            maxLength={5000}
            rows={5}
            defaultValue={
              project
                ? `I’m interested in a project similar to ${project}. `
                : ""
            }
            placeholder="What are you building or improving? What is getting in the way?"
            aria-describedby="enquiry-hint"
          />
          <p id="enquiry-hint" className="form-hint">
            A short outline is enough. Please don’t include passwords, payment
            details or sensitive personal records.
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {error && (
        <div className="form-error" role="alert">
          {error}{" "}
          <a href={`mailto:${site.email}`} className="underline">
            Email Kliqnet
          </a>
        </div>
      )}
      <p className="form-hint mt-6" style={{ marginTop: 24 }}>
        We use these details to respond to your enquiry. Read our{" "}
        <Link className="underline" href="/privacy">
          privacy notice
        </Link>
        .
      </p>
      <button
        className="button button-light mt-6 w-full"
        disabled={busy}
        type="submit"
      >
        {busy ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Saving your enquiry…
          </>
        ) : (
          <>
            {call ? "Request a strategy call" : "Send your project brief"}
            <ArrowUpRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
