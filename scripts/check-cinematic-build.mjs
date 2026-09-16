import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

// Inspect the CSS actually referenced by each route, not leftover cache files.
// Missing cinematic styles otherwise leave a full-size native video above the copy.
const buildDir = path.resolve(process.argv[2] || '.next');
const routes = [
  ['page', '/page', ['.journey-stage', '.journey-film', '.journey-copy', '.journey-chapters', '.journey-quiet', '.selected-work-section', '.premiere-reel']],
  ['projects/page', '/projects/page', ['.project-premiere', '.premiere-controls', '.premiere-reel', '.cinema-card', '.work-poster-screen', '.case-opening']],
];

for (const [file, route, selectors] of routes) {
  const context = {};
  const manifestPath = path.join(buildDir, 'server/app', `${file}_client-reference-manifest.js`);
  vm.runInNewContext(await readFile(manifestPath, 'utf8'), context, { timeout: 1000 });
  const manifest = context.__RSC_MANIFEST?.[route];
  const files = [...new Set(Object.values(manifest?.entryCSSFiles ?? {}).flat().map(entry => entry.path))];
  if (!files.length) throw new Error(`No referenced CSS found for ${route}`);
  const css = (await Promise.all(files.map(file => readFile(path.join(buildDir, file), 'utf8')))).join('\n');
  const missing = selectors.filter(selector => !css.includes(selector));
  if (missing.length) throw new Error(`Cinematic CSS missing from ${route}: ${missing.join(', ')}`);
  console.log(`Cinematic release check passed: ${route} (${selectors.length} required styles)`);
}
