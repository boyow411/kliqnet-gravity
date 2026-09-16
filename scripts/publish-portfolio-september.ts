/** Publish this approved portfolio update without overwriting other CMS edits.
 * Run after deploying the new image assets and Education sector support.
 * Dry run is the default; --apply performs one atomic transaction.
 */
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { portfolioSchema } from "../src/lib/portfolio-types";
dotenv.config({ path: ".env.local", quiet: true });
async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const catalogue = JSON.parse(await readFile("src/data/portfolio-seed.json", "utf8"))
    .map((row: unknown) => portfolioSchema.parse(row));
  const slugs = ["crate-companion", "homeskolar", "enzi"];
  const additions = catalogue.filter((row: {slug: string}) => slugs.includes(row.slug));
  const wazobia = catalogue.find((row: {slug: string}) => row.slug === "wazobia-old-kent-road")!;
  if (additions.length !== 3) throw new Error("Expected three additions");
  for (const row of [...additions, wazobia]) await readFile("public" + row.data.coverImage);
  const before = await sql`SELECT * FROM project_case_studies ORDER BY id`;
  if (before.some(row => slugs.includes(row.slug))) throw new Error("A new project already exists; review rather than overwrite");
  if (!before.some(row => row.slug === wazobia.slug)) throw new Error("Wazobia record missing");
  const dir = process.env.PORTFOLIO_BACKUP_DIR || "/tmp/kliqnet-portfolio-backups";
  await mkdir(dir, { recursive: true });
  const file = `${dir}/september-${Date.now()}.json`;
  await writeFile(file, JSON.stringify(before, null, 2), { mode: 0o600 });
  console.log("Validated three additions and Wazobia image-only correction. Backup:", file);
  if (!process.argv.includes("--apply")) return;
  const patch = { coverImage: wazobia.data.coverImage, coverCaption: wazobia.data.coverCaption, evidenceDate: wazobia.data.evidenceDate };
  await sql.transaction([
    ...additions.map((p: ReturnType<typeof portfolioSchema.parse>) => sql`INSERT INTO project_case_studies (slug,name,category,industry_tags,status,tagline,short_description,primary_url,data,featured,published) VALUES (${p.slug},${p.name},${p.category},${p.industryTags},${p.status},${p.tagline},${p.shortDescription},${p.primaryUrl},${JSON.stringify(p.data)}::jsonb,${p.featured},${p.published})`),
    sql`UPDATE project_case_studies SET data=data || ${JSON.stringify(patch)}::jsonb, updated_at=now() WHERE slug=${wazobia.slug}`,
  ]);
  const result = await sql`SELECT slug,name,status,published FROM project_case_studies WHERE slug IN ('crate-companion','homeskolar','enzi','wazobia-old-kent-road') ORDER BY slug`;
  console.log(JSON.stringify(result, null, 2));
}
main().catch(() => { console.error("Publication stopped. Check validated content, existing project slugs and database access; no credentials are logged."); process.exitCode = 1; });
