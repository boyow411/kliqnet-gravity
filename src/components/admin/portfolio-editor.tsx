"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageUpload, MultiImageUpload } from "./image-upload";
import { portfolioSchema, type PortfolioProject } from "@/lib/portfolio-types";
const blank: PortfolioProject = {
  name: "",
  slug: "",
  tagline: "",
  shortDescription: "",
  category: "Venture Studio",
  industryTags: "",
  status: "In Development",
  primaryUrl: "",
  published: false,
  featured: false,
  data: {
    coverImage: "",
    coverCaption: "",
    screenshots: [],
    captions: [],
    sector: "Business software",
    relationship: "Kliqnet venture",
    stageNote: "",
    problem: "",
    contribution: [""],
    workflow: [{ title: "", text: "" }],
    outcome: "",
    decision: "",
    evidenceDate: new Date().toISOString().slice(0, 10),
    featuredOrder: 99,
    technologies: [],
  },
};
const input =
  "w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white mt-1";
export function PortfolioEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<PortfolioProject>(blank);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    let active = true;
    fetch("/api/admin/projects/" + id)
      .then(async (r) => {
        if (!r.ok) throw Error("Could not load project.");
        return r.json();
      })
      .then((p) => {
        if (active) {
          setForm(portfolioSchema.parse(p));
          setLoading(false);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [id]);
  function field<K extends keyof PortfolioProject>(
    key: K,
    value: PortfolioProject[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function story<K extends keyof PortfolioProject["data"]>(
    key: K,
    value: PortfolioProject["data"][K],
  ) {
    setForm((f) => ({ ...f, data: { ...f.data, [key]: value } }));
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = portfolioSchema.safeParse(form);
    if (!result.success) {
      setError(
        result.error.issues
          .map((i) => i.path.join(".") + ": " + i.message)
          .join("; "),
      );
      return;
    }
    setSaving(true);
    try {
      const r = await fetch("/api/admin/projects" + (id ? "/" + id : ""), {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = await r.json();
      if (!r.ok)
        throw Error(
          body.error || "Could not save. Your changes are still here.",
        );
      router.push("/admin/projects");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }
  if (loading) return <p role="status">Loading project…</p>;
  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href="/admin/projects">← All projects</Link>
      {id && (
        <Link
          href={`/admin/projects/${id}/preview`}
          className="ml-6 text-blue-300"
        >
          Preview saved version →
        </Link>
      )}
      <h1 className="text-3xl my-6">
        {id ? "Edit case study" : "New case study"}
      </h1>
      <p className="text-gray-400 mb-6">
        The public portfolio uses these records. Keep availability, claims and
        screenshots current. New projects start as drafts.
      </p>
      <form onSubmit={save} className="space-y-7">
        {error && (
          <p role="alert" className="p-4 bg-red-950 text-red-100 rounded-lg">
            {error}
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-5">
          {(
            ["name", "slug", "tagline", "primaryUrl", "industryTags"] as const
          ).map((key) => (
            <label key={key}>
              {
                {
                  name: "Project name",
                  slug: "URL slug",
                  tagline: "Card headline",
                  primaryUrl: "Public website (HTTPS, optional)",
                  industryTags: "Search tags",
                }[key]
              }
              <input
                className={input}
                required={!["primaryUrl", "industryTags"].includes(key)}
                value={form[key]}
                onChange={(e) => field(key, e.target.value)}
              />
            </label>
          ))}
          <label>
            Category
            <select
              className={input}
              value={form.category}
              onChange={(e) =>
                field(
                  "category",
                  e.target.value as PortfolioProject["category"],
                )
              }
            >
              <option>Venture Studio</option>
              <option>Client Transformation</option>
            </select>
          </label>
          <label>
            Sector
            <select
              className={input}
              value={form.data.sector}
              onChange={(e) =>
                story(
                  "sector",
                  e.target.value as PortfolioProject["data"]["sector"],
                )
              }
            >
              {[
                "Healthcare",
                "Hospitality",
                "Business software",
                "Creative & community",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Current stage
            <select
              className={input}
              value={form.status}
              onChange={(e) =>
                field("status", e.target.value as PortfolioProject["status"])
              }
            >
              {["Live", "Pilot", "In Development", "Delivered"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          Short overview
          <textarea
            className={input}
            rows={3}
            required
            value={form.shortDescription}
            onChange={(e) => field("shortDescription", e.target.value)}
          />
        </label>
        {(
          [
            "relationship",
            "stageNote",
            "problem",
            "decision",
            "outcome",
          ] as const
        ).map((key) => (
          <label className="block" key={key}>
            {
              {
                relationship: "Relationship to Kliqnet",
                stageNote: "Availability and scope of the release",
                problem: "The challenge",
                decision: "Key design or engineering decision",
                outcome: "What was delivered — evidence, not invented metrics",
              }[key]
            }
            <textarea
              className={input}
              rows={key === "relationship" ? 1 : 3}
              required
              value={form.data[key]}
              onChange={(e) => story(key, e.target.value)}
            />
          </label>
        ))}
        <label className="block">
          What we built (one item per line)
          <textarea
            className={input}
            rows={5}
            required
            value={form.data.contribution.join("\n")}
            onChange={(e) => story("contribution", e.target.value.split("\n"))}
          />
        </label>
        <fieldset className="space-y-4">
          <legend className="text-xl mb-3">The user journey</legend>
          {form.data.workflow.map((step, i) => (
            <div key={i} className="border border-white/15 p-4 rounded-lg">
              <label>
                Step {i + 1} title
                <input
                  className={input}
                  required
                  value={step.title}
                  onChange={(e) =>
                    story(
                      "workflow",
                      form.data.workflow.map((v, j) =>
                        j === i ? { ...v, title: e.target.value } : v,
                      ),
                    )
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  className={input}
                  required
                  value={step.text}
                  onChange={(e) =>
                    story(
                      "workflow",
                      form.data.workflow.map((v, j) =>
                        j === i ? { ...v, text: e.target.value } : v,
                      ),
                    )
                  }
                />
              </label>
              {form.data.workflow.length > 1 && (
                <button
                  type="button"
                  className="mt-3 text-red-300"
                  onClick={() =>
                    story(
                      "workflow",
                      form.data.workflow.filter((_, j) => j !== i),
                    )
                  }
                >
                  Remove step {i + 1}
                </button>
              )}
            </div>
          ))}
          {form.data.workflow.length < 6 && (
            <button
              type="button"
              className="p-3 bg-white/10 rounded-lg"
              onClick={() =>
                story("workflow", [
                  ...form.data.workflow,
                  { title: "", text: "" },
                ])
              }
            >
              Add step
            </button>
          )}
        </fieldset>
        <ImageUpload
          value={form.data.coverImage}
          onChange={(v) => story("coverImage", v)}
          label="Cover image"
          description="Upload a real project screen. PNG, JPEG or WebP, up to 5 MB."
        />
        <label className="block">
          Cover caption / alternative text
          <input
            className={input}
            required
            value={form.data.coverCaption}
            onChange={(e) => story("coverCaption", e.target.value)}
          />
        </label>
        <MultiImageUpload
          values={form.data.screenshots}
          onChange={(images) =>
            setForm((f) => ({
              ...f,
              data: {
                ...f.data,
                screenshots: images,
                captions: images.map(
                  (url) =>
                    f.data.captions[f.data.screenshots.indexOf(url)] || "",
                ),
              },
            }))
          }
          max={12}
          label="Project screens"
        />
        {form.data.screenshots.map((url, i) => (
          <label className="block" key={url}>
            Caption for screen {i + 1}
            <input
              className={input}
              required
              value={form.data.captions[i] || ""}
              onChange={(e) =>
                story(
                  "captions",
                  form.data.screenshots.map((_, j) =>
                    j === i ? e.target.value : form.data.captions[j] || "",
                  ),
                )
              }
            />
          </label>
        ))}
        <div className="grid sm:grid-cols-2 gap-5">
          <label>
            Evidence reviewed
            <input
              type="date"
              required
              className={input}
              value={form.data.evidenceDate}
              onChange={(e) => story("evidenceDate", e.target.value)}
            />
          </label>
          <label>
            Display order (lower appears first)
            <input
              type="number"
              min={0}
              max={999}
              className={input}
              value={form.data.featuredOrder}
              onChange={(e) => story("featuredOrder", Number(e.target.value))}
            />
          </label>
          <label>
            Technology (comma separated, optional)
            <input
              className={input}
              value={form.data.technologies.join(", ")}
              onChange={(e) =>
                story(
                  "technologies",
                  e.target.value
                    .split(",")
                    .map((v) => v.trim())
                    .filter(Boolean),
                )
              }
            />
          </label>
        </div>
        <div className="flex gap-6">
          <label>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => field("published", e.target.checked)}
            />{" "}
            Published
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => field("featured", e.target.checked)}
            />{" "}
            Featured on home
          </label>
        </div>
        <button
          disabled={saving}
          className="px-6 py-3 rounded-lg bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save case study"}
        </button>
      </form>
    </div>
  );
}
