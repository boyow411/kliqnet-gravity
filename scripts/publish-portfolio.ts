import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { portfolioSchema } from "../src/lib/portfolio-types";
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ path: ".env", quiet: true });
async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const catalogue = JSON.parse(
    await readFile("src/data/portfolio-seed.json", "utf8"),
  ).map((p: unknown) => portfolioSchema.parse(p));
  for (const p of catalogue) {
    for (const image of [p.data.coverImage, ...p.data.screenshots])
      if (image.startsWith("/")) await readFile("public" + image);
  }
  const backup = await sql`SELECT * FROM project_case_studies ORDER BY id`;
  const backupDir =
    process.env.PORTFOLIO_BACKUP_DIR || "/tmp/kliqnet-portfolio-backups";
  await mkdir(backupDir, { recursive: true });
  const filename = backupDir + "/portfolio-" + Date.now() + ".json";
  await writeFile(filename, JSON.stringify(backup, null, 2));
  if (!process.argv.includes("--apply")) {
    console.log(
      "Validated",
      catalogue.length,
      "projects. Read-only preview; add --apply to publish. Backup:",
      filename,
    );
    return;
  }
  const statements = (await readFile("scripts/agency-schema.sql", "utf8"))
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  await sql.transaction(statements.map((s) => sql.query(s)));
  await sql.transaction(
    catalogue.map(
      (p: ReturnType<typeof portfolioSchema.parse>) =>
        sql`INSERT INTO project_case_studies (slug,name,category,industry_tags,status,tagline,short_description,primary_url,data,featured,published) VALUES (${p.slug},${p.name},${p.category},${p.industryTags},${p.status},${p.tagline},${p.shortDescription},${p.primaryUrl},${JSON.stringify(p.data)}::jsonb,${p.featured},${p.published}) ON CONFLICT (slug) DO UPDATE SET name=excluded.name,category=excluded.category,industry_tags=excluded.industry_tags,status=excluded.status,tagline=excluded.tagline,short_description=excluded.short_description,primary_url=excluded.primary_url,data=excluded.data,featured=excluded.featured,published=excluded.published,updated_at=now()`,
    ),
  );
  console.log(
    "Published",
    catalogue.length,
    "curated records. Prior records saved:",
    filename,
  );
}
main().catch(() => {
  console.error(
    "Portfolio publication failed; check database access and validated content.",
  );
  process.exitCode = 1;
});
