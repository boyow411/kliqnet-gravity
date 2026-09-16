import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brand assets | Kliqnet Digital",
  description:
    "The Kliqnet Digital identity: approved logos, symbols and usage guidance.",
  alternates: { canonical: "/brand" },
};
const assets = [
  { file: "logo", title: "Primary logo", dark: false, square: false },
  {
    file: "logo-on-dark",
    title: "Logo for dark backgrounds",
    dark: true,
    square: false,
  },
  {
    file: "logo-black",
    title: "Single-colour black",
    dark: false,
    square: false,
  },
  {
    file: "logo-white",
    title: "Single-colour white",
    dark: true,
    square: false,
  },
  { file: "symbol", title: "Connected K symbol", dark: false, square: true },
  { file: "avatar", title: "Profile icon", dark: true, square: true },
];
export default function BrandPage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="max-w-2xl mb-12">
        <p className="eyebrow">Kliqnet Digital</p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-6">
          One connected identity.
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Our Connected K brings the agency and the products we build together.
          Download the approved artwork for use in project credits, partnerships
          and press.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {assets.map((asset) => (
          <section
            key={asset.file}
            className="overflow-hidden rounded-2xl border border-white/15"
          >
            <div
              className={`flex h-56 sm:h-64 items-center justify-center p-8 ${asset.dark ? "bg-[#0c1017]" : "bg-[#f8f8fb]"}`}
            >
              <Image
                src={`/brand/${asset.file}.svg`}
                alt={`Kliqnet Digital — ${asset.title}`}
                width={asset.square ? 144 : 440}
                height={asset.square ? 144 : 120}
                className={
                  asset.square ? "h-36 w-36" : "h-auto w-full max-w-md"
                }
                unoptimized
              />
            </div>
            <div className="p-6">
              <h2 className="font-semibold text-xl mb-4">{asset.title}</h2>
              <div className="flex gap-6">
                <a
                  className="text-link"
                  href={`/brand/${asset.file}.svg`}
                  download
                >
                  Download SVG
                </a>
                <a
                  className="text-link"
                  href={`/brand/${asset.file}.png`}
                  download
                >
                  Download PNG
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="max-w-3xl mt-16 space-y-6">
        <h2 className="text-3xl font-semibold">Keep it clear.</h2>
        <p className="text-slate-300 leading-relaxed">
          Use the supplied artwork without stretching, rotating or redrawing it.
          Leave clear space around the logo equal to at least half the symbol’s
          width. For small placements, use the symbol on its own.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Our primary colours are cobalt (#4326FF), ink (#0C1017) and white. The
          dark-background logo uses a lighter violet (#7866FF) for visibility.
          The wordmark is outlined artwork; Inter is used for website text.
        </p>
        <a
          className="text-link"
          href="/brand/kliqnet-digital-brand-kit.zip"
          download
        >
          Download the complete brand kit
        </a>
      </section>
    </div>
  );
}
