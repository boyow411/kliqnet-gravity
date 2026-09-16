import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import Image from "next/image";
import { getPublicPosts } from "@/lib/blog-posts";
import { ContactBand } from "@/components/marketing";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata({
  title: "Studio notes | Kliqnet Digital",
  description:
    "Practical lessons from building websites, creative tools and business systems.",
  path: "/blog",
});
export default async function Insights() {
  const posts = await getPublicPosts();
  return (
    <div className="agency">
      <section className="container intro page-top">
        <p className="eyebrow">Studio notes</p>
        <h1>
          Thinking from
          <br />
          the work.
        </h1>
        <p>
          Practical lessons from the websites, products and business systems we
          build.
        </p>
      </section>
      <section className="container section">
        <div className="work-grid">
          {posts.map((p) => (
            <article className="work-card" key={p.slug}>
              <Link className="work-image" href={"/blog/" + p.slug}>
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  sizes="(max-width:640px) 100vw,50vw"
                  className="object-cover object-top"
                />
              </Link>
              <p className="eyebrow mt-5">
                {p.category} · {p.readingTime}
              </p>
              <Link href={"/blog/" + p.slug} className="work-title">
                <h2 className="text-2xl">{p.title}</h2>
              </Link>
              <p>{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </div>
  );
}
