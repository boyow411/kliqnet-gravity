import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFile, writeFile, mkdir } from "node:fs/promises";
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ path: ".env", quiet: true });
async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = JSON.parse(
    await readFile("src/data/insights-seed.json", "utf8"),
  );
  const old = await sql`SELECT * FROM blog_posts ORDER BY id`;
  const dir = "/tmp/kliqnet-portfolio-backups";
  await mkdir(dir, { recursive: true });
  const backup = dir + "/insights-" + Date.now() + ".json";
  await writeFile(backup, JSON.stringify(old, null, 2));
  for (const p of rows) {
    await readFile("public" + p.coverImage);
    if (!p.slug || p.content.length < 200) throw Error("Invalid article");
  }
  if (!process.argv.includes("--apply")) {
    console.log("Validated", rows.length, "articles; backup:", backup);
    return;
  }
  const obsolete = [
    "why-scalable-architecture-matters",
    "seo-in-2026",
    "design-systems-guide",
    "roi-custom-software",
    "nextjs-vs-react",
    "brand-converts",
    "web-performance-mistakes",
    "api-first-development",
    "pwa-benefits",
    "idea-to-launch-process",
  ];
  await sql.transaction([
    ...obsolete.map(
      (s) =>
        sql`UPDATE blog_posts SET published=false,updated_at=now() WHERE slug=${s}`,
    ),
    ...rows.map(
      (p: Record<string, string | boolean>) =>
        sql`INSERT INTO blog_posts(slug,title,excerpt,content,category,author_name,author_role,reading_time,cover_image,published,date,related_slugs) VALUES (${p.slug},${p.title},${p.excerpt},${p.content},${p.category},${p.authorName},${p.authorRole},${p.readingTime},${p.coverImage},true,${p.date},${p.relatedSlugs}) ON CONFLICT(slug) DO UPDATE SET title=excluded.title,excerpt=excluded.excerpt,content=excluded.content,category=excluded.category,cover_image=excluded.cover_image,published=true,date=excluded.date,author_name=excluded.author_name,author_role=excluded.author_role,reading_time=excluded.reading_time,related_slugs=excluded.related_slugs,updated_at=now()`,
    ),
  ]);
  console.log(
    "Published",
    rows.length,
    "articles. Archived superseded editorial records. Backup:",
    backup,
  );
}
main().catch(() => {
  console.error("Insights publication failed.");
  process.exitCode = 1;
});
