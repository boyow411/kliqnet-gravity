// Deterministic vector tracing of the owner-selected Connected K concept.
// Usage: node scripts/export-brand.mjs /path/to/potrace
// Potrace is an offline build tool, not an application/runtime dependency.
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import sharp from "sharp";
const require = createRequire(import.meta.url);
const { trace } = require(process.argv[2] || "potrace");
const source = "docs/brand-2026-09-16/source/connected-k-approved.png";
const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const traceLayer = async (isMark) => {
  const mask = Buffer.alloc(info.width * info.height, 255);
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) {
      const i = y * info.width + x,
        p = i * 4;
      if (data[p + 3] > 128 && (isMark ? x < 630 : x >= 630)) mask[i] = 0;
    }
  const png = await sharp(mask, {
    raw: { width: info.width, height: info.height, channels: 1 },
  })
    .png()
    .toBuffer();
  const svg = await new Promise((resolve, reject) =>
    trace(png, { threshold: 128, turdSize: 12, optTolerance: 0.4 }, (e, s) =>
      e ? reject(e) : resolve(s),
    ),
  );
  return svg.match(/<path[^>]*d="([^"]+)"/)[1];
};
const mark = await traceLayer(true),
  word = await traceLayer(false);
const path = (d, c) => `<path fill="${c}" fill-rule="evenodd" d="${d}"/>`;
const wrap = (view, body, title = "Kliqnet Digital") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" role="img"><title>${title}</title>${body}</svg>`;
await fs.mkdir("public/brand", { recursive: true });
const variants = {
  logo: wrap("300 275 1176 322", path(mark, "#4326ff") + path(word, "#0c1017")),
  "logo-on-dark": wrap(
    "300 275 1176 322",
    path(mark, "#7866ff") + path(word, "#ffffff"),
  ),
  "logo-black": wrap(
    "300 275 1176 322",
    path(mark, "#000000") + path(word, "#000000"),
  ),
  "logo-white": wrap(
    "300 275 1176 322",
    path(mark, "#ffffff") + path(word, "#ffffff"),
  ),
  symbol: wrap("296 275 326 322", path(mark, "#4326ff")),
  "symbol-white": wrap("296 275 326 322", path(mark, "#ffffff")),
  avatar: wrap(
    "230 209 454 454",
    '<rect x="230" y="209" width="454" height="454" rx="100" fill="#4326ff"/>' +
      path(mark, "#ffffff"),
  ),
};
for (const [name, svg] of Object.entries(variants)) {
  await fs.writeFile(`public/brand/${name}.svg`, svg + "\n");
  await sharp(Buffer.from(svg))
    .resize(name === "avatar" ? 1024 : name.startsWith("symbol") ? 512 : 2400)
    .png()
    .toFile(`public/brand/${name}.png`);
}
await fs.writeFile("public/icon.svg", variants.avatar + "\n");
await sharp(Buffer.from(variants.avatar))
  .resize(180, 180)
  .png()
  .toFile("public/apple-icon.png");
const png32 = await sharp(Buffer.from(variants.avatar))
  .resize(32, 32)
  .png()
  .toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await fs.writeFile("src/app/favicon.ico", Buffer.concat([header, png32]));
const logo = Buffer.from(variants["logo-on-dark"]).toString("base64");
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0c1017"/><image href="data:image/svg+xml;base64,${logo}" x="64" y="54" width="294" height="81"/><text x="64" y="250" font-family="Arial,sans-serif" font-size="19" letter-spacing="4" fill="#a7b2c8">INDEPENDENT AGENCY &amp; PRODUCT STUDIO</text><text x="60" y="343" font-family="Arial,sans-serif" font-weight="bold" font-size="73" letter-spacing="-3" fill="white">We build the digital</text><text x="60" y="428" font-family="Arial,sans-serif" font-weight="bold" font-size="73" letter-spacing="-3" fill="#a99dff">side of your business.</text><path d="M64 499H1136" stroke="#303849"/><text x="64" y="554" font-family="Arial,sans-serif" font-size="24" fill="#bac4d8">Websites · Digital products · Business systems</text><text x="900" y="554" font-family="Arial,sans-serif" font-size="18" fill="#bac4d8">kliqnetdigital.com</text></svg>`;
await sharp(Buffer.from(og)).png().toFile("public/opengraph-image.png");
await fs.writeFile(
  "public/opengraph-image.alt.txt",
  "Kliqnet Digital — We build the digital side of your business. Websites, digital products and business systems.\n",
);
console.log(
  "Exported 7 SVG/PNG brand variants, browser/mobile icons and social sharing card.",
);
await import("./export-sharing.mjs");
