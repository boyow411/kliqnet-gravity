import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getBlogPost,
  getRelatedPosts,
  insightRedirects,
} from "@/lib/blog-posts";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  return p
    ? {
        title: p.title + " | Kliqnet Digital",
        description: p.excerpt,
        alternates: { canonical: "/blog/" + p.slug },
        openGraph: {
          title: p.title,
          description: p.excerpt,
          images: [p.coverImage],
          type: "article",
        },
      }
    : {};
}
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (insightRedirects[slug])
    permanentRedirect("/blog/" + insightRedirects[slug]);
  const p = await getBlogPost(slug);
  if (!p) notFound();
  const related = await getRelatedPosts(slug);
  return (
    <article className="agency container legal-copy section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.excerpt,
          datePublished: new Date(p.date).toISOString(),
          image: site.url + p.coverImage,
          author: { "@type": "Organization", name: p.author.name },
          publisher: { "@id": site.url + "/#organization" },
          mainEntityOfPage: site.url + "/blog/" + p.slug,
        }}
      />
      <Link href="/blog" className="text-link">
        ← Studio notes
      </Link>
      <p className="eyebrow mt-8">
        {p.category} · {p.readingTime}
      </p>
      <h1 style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}>{p.title}</h1>
      <p>
        {p.author.name} ·{" "}
        {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
          new Date(p.date),
        )}
      </p>
      <div className="work-image mb-10">
        <Image
          src={p.coverImage}
          alt={p.title}
          fill
          sizes="820px"
          priority
          className="object-contain"
        />
      </div>
      {p.content
        .split(/\n\s*\n|\n(?=## )|(?<=.)\n(?=[^#\n])/)
        .filter(Boolean)
        .map((block, i) =>
          block.startsWith("## ") ? (
            <h2 key={i}>{block.slice(3)}</h2>
          ) : (
            <p key={i}>{block}</p>
          ),
        )}
      <p>
        <Link className="text-link" href="/projects">
          Explore the project case studies →
        </Link>
      </p>
      {related.length > 0 && (
        <aside className="border-t border-white/20 pt-8 mt-10">
          <h2>Continue reading</h2>
          {related.map((r) => (
            <p key={r.slug}>
              <Link href={"/blog/" + r.slug}>{r.title} →</Link>
            </p>
          ))}
        </aside>
      )}
    </article>
  );
}
