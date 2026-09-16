// Technical exports from the approved brand and existing public screenshots.
// Run when portfolio seed imagery changes; live edits safely use the brand card.
import fs from "node:fs/promises";
import sharp from "sharp";
import { createHash } from "node:crypto";

await fs.mkdir("public/share", { recursive: true });
await fs.mkdir("public/icons", { recursive: true });
const avatar = await fs.readFile("public/brand/avatar.svg");
await fs.writeFile("public/icons/kliqnet-20260916.svg", avatar);
for (const size of [16, 32, 48, 180, 192, 512]) {
  await sharp(avatar).resize(size, size).png().toFile(`public/icons/kliqnet-${size}-20260916.png`);
}
// Multi-resolution ICO also supports browsers which request /favicon.ico directly.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(size => sharp(avatar).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const at = 6 + i * 16;
  header[at] = sizes[i]; header[at + 1] = sizes[i];
  header.writeUInt16LE(1, at + 4); header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(png.length, at + 8); header.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
await fs.writeFile("src/app/favicon.ico", Buffer.concat([header, ...pngs]));
await fs.copyFile("src/app/favicon.ico", "public/icons/kliqnet-20260916.ico");
await fs.copyFile("public/opengraph-image.png", "public/share/kliqnet-digital-20260916.png");
const logo = await sharp("public/brand/logo-on-dark.svg").resize(270).png().toBuffer();
const xml = value => value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]));
function lines(value, length) {
  const out = [""];
  for (const word of value.split(/\s+/)) {
    if ((out.at(-1) + " " + word).trim().length > length && out.at(-1)) out.push(word);
    else out[out.length - 1] = (out.at(-1) + " " + word).trim();
  }
  return out;
}
const projects = JSON.parse(await fs.readFile("src/data/portfolio-seed.json", "utf8"));
const posts = JSON.parse(await fs.readFile("src/data/insights-seed.json", "utf8"));
const items = [
  ...projects.filter(p => p.published).map(p => ({ path: `/projects/${p.slug}`, title: p.name, cover: p.data.coverImage, label: "BUILT BY KLIQNET", description: p.shortDescription })),
  ...posts.filter(p => p.published).map(p => ({ path: `/blog/${p.slug}`, title: p.title, cover: p.coverImage, label: "KLIQNET STUDIO NOTES", description: p.excerpt })),
];
const manifest = [];
for (const item of items) {
  const heading = lines(item.title, 22);
  const fontSize = heading.length > 3 ? 36 : 46;
  const title = heading.map((line, i) => `<text x="52" y="252" dy="${i * (fontSize + 8)}" font-family="Arial,sans-serif" font-weight="bold" font-size="${fontSize}" fill="white">${xml(line)}</text>`).join("");
  const screen = await sharp("public" + item.cover).resize(620, 402, { fit: "contain", background: "#14151d" }).png().toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0c1017"/><rect x="0" width="8" height="630" fill="#7866ff"/><text x="52" y="192" font-family="Arial,sans-serif" font-size="15" letter-spacing="2" fill="#b6a4df">${item.label}</text>${title}<path d="M52 545H1148" stroke="#343644"/><text x="52" y="589" font-family="Arial,sans-serif" font-size="21" fill="#bac4d8">Websites · Digital products · Business systems</text><text x="950" y="589" font-family="Arial,sans-serif" font-size="18" fill="#bac4d8">kliqnetdigital.com</text></svg>`;
  const png = await sharp(Buffer.from(svg)).composite([{ input: logo, left: 52, top: 48 }, { input: screen, left: 540, top: 122 }]).png({ compressionLevel: 9 }).toBuffer();
  const hash = createHash("sha256").update(png).digest("hex").slice(0, 10);
  const image = `/share/${item.path.slice(1).replaceAll("/", "-")}-${hash}.png`;
  await fs.writeFile("public" + image, png);
  manifest.push({ path: item.path, title: item.title, cover: item.cover, image });
}
await fs.writeFile("src/data/share-cards.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Exported brand icons and ${manifest.length} project/article sharing cards.`);
