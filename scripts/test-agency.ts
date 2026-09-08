import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { portfolioSchema } from "../src/lib/portfolio-types";
import { insightSchema } from "../src/lib/insight-schema";
import { contactSchema } from "../src/lib/contact-schema";
async function main() {
  const rows = JSON.parse(
    await fs.readFile("src/data/portfolio-seed.json", "utf8"),
  ).map((p: unknown) => portfolioSchema.parse(p));
  assert.equal(
    new Set(rows.map((p: { slug: string }) => p.slug)).size,
    rows.length,
    "Slugs must be unique",
  );
  for (const p of rows) {
    for (const image of [p.data.coverImage, ...p.data.screenshots])
      await fs.access("public" + image);
    assert.equal(
      p.data.screenshots.length,
      p.data.captions.length,
      p.slug + " must caption every screen",
    );
  }
  assert(
    !portfolioSchema.safeParse({
      ...rows[0],
      primaryUrl: "javascript:alert(1)",
    }).success,
  );
  assert(
    !portfolioSchema.safeParse({
      ...rows[0],
      data: { ...rows[0].data, coverImage: "//example.com/image.png" },
    }).success,
  );
  assert(
    !portfolioSchema.safeParse({
      ...rows[0],
      data: { ...rows[0].data, coverImage: "https://example.com/image.png" },
    }).success,
  );
  assert(
    !portfolioSchema.safeParse({
      ...rows[0],
      data: { coverImage: rows[0].data.coverImage },
    }).success,
    "An image-only edit must not erase the case story",
  );
  const draft = portfolioSchema.parse({
    ...rows[0],
    published: undefined,
    featured: undefined,
  });
  assert.equal(draft.published, false);
  assert.equal(draft.featured, false);
  const form = {
    submissionKey: crypto.randomUUID(),
    name: "QA Review",
    email: "qa@example.invalid",
    projectType: "Not sure yet",
    message: "A sufficiently detailed test enquiry.",
  };
  assert(contactSchema.safeParse(form).success);
  assert(!contactSchema.safeParse({ ...form, message: "" }).success);
  assert(!contactSchema.safeParse({ ...form, email: "broken" }).success);
  for (const p of JSON.parse(
    await fs.readFile("src/data/insights-seed.json", "utf8"),
  )) {
    assert(insightSchema.safeParse(p).success);
    await fs.access("public" + p.coverImage);
  }
  console.log(
    "Agency content and boundary checks passed:",
    rows.length,
    "projects, 3 studio notes, safe links, draft defaults and enquiry validation.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
