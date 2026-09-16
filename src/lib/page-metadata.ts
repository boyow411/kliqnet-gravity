import type { Metadata } from "next";
import { site } from "./site";
import cards from "@/data/share-cards.json";

export const defaultTitle = "Kliqnet Digital | Websites, Products & Business Systems";
export const defaultDescription = "Independent digital agency and product studio. Websites, SaaS and automation, built by people who understand what it takes to run them.";
export const defaultShareImage = "/share/kliqnet-digital-20260916.png";

// A newly published or changed project still gets a valid branded fallback.
export function contentShareImage(path: string, title: string, cover: string) {
  const card = cards.find(card => card.path === path && card.title === title && card.cover === cover);
  return card?.image || defaultShareImage;
}

export function pageMetadata({ title = defaultTitle, description = defaultDescription, path, image = defaultShareImage, imageAlt = "Kliqnet Digital — websites, digital products and business systems", type = "website" }: {
  title?: string; description?: string; path: string; image?: string; imageAlt?: string; type?: "website" | "article";
}): Metadata {
  const url = new URL(path, site.url).href;
  const imageUrl = new URL(image, site.url).href;
  const shareImage = { url: imageUrl, secureUrl: imageUrl, width: 1200, height: 630, type: "image/png", alt: imageAlt };
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: "en_GB", type, images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: imageUrl, alt: imageAlt }] },
  };
}
