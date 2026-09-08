import Link from "next/link";
import { site } from "@/lib/site";
export default function AdminSettings() {
  const scheduler = process.env.STRATEGY_CALL_URL;
  return (
    <div className="py-8 max-w-3xl space-y-8">
      <h1 className="text-3xl">Website configuration</h1>
      <section className="p-6 border border-white/15 rounded-xl space-y-3">
        <h2 className="text-xl">Public contact</h2>
        <p>{site.name}</p>
        <p>{site.email}</p>
        <p>{site.url}</p>
        <p className="text-gray-400">
          Identity and contact defaults are maintained in the site configuration
          so every page stays consistent.
        </p>
      </section>
      <section className="p-6 border border-white/15 rounded-xl space-y-3">
        <h2 className="text-xl">Enquiries and strategy calls</h2>
        <p>
          Project briefs and call requests are saved to the submissions inbox.
          Review and reply from your agency mailbox. The website does not send
          an automated email confirmation.
        </p>
        <p>
          {scheduler
            ? "A scheduling URL is configured. Verify its availability before directing customers to it."
            : "Calls use a request form. No calendar slot is confirmed automatically."}
        </p>
        <Link className="text-blue-300" href="/admin/submissions">
          Review enquiries →
        </Link>
      </section>
      <section className="p-6 border border-white/15 rounded-xl space-y-3">
        <h2 className="text-xl">Content and measurement</h2>
        <p>
          Published project and article records appear directly on the public
          website. Unpublish a case study to remove it from public browsing. Use
          a real project screen and describe the current release stage.
        </p>
        <div className="flex flex-wrap gap-5">
          <Link className="text-blue-300" href="/admin/projects">
            Edit the portfolio →
          </Link>
          <Link className="text-blue-300" href="/admin/blog">
            Edit studio notes →
          </Link>
          <Link className="text-blue-300" href="/admin/site-performance">
            View website performance →
          </Link>
        </div>
      </section>
    </div>
  );
}
