import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const repoRoot = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(join(repoRoot, path), "utf8");

const middleware = read("src/middleware.ts");
assert.match(
  middleware,
  /\/api\/admin\/:path\*/,
  "middleware matcher must include /api/admin/:path* so admin APIs are protected centrally"
);
assert.match(
  middleware,
  /pathname\.startsWith\("\/api\/admin"\)/,
  "middleware authorization callback must explicitly handle /api/admin requests"
);
assert.match(
  middleware,
  /SUPER_ADMIN|ADMIN/,
  "admin middleware must require an admin-capable role, not just any authenticated token"
);

const auth = read("src/lib/auth.ts");
assert.doesNotMatch(auth, /admin@kliqnet\.com/, "fallback admin email must not exist in auth code");
assert.doesNotMatch(auth, /credentials\.password\s*===\s*["']admin["']/, "fallback admin password must not exist in auth code");
assert.doesNotMatch(auth, /Fallback: hardcoded admin/i, "fallback admin comments must be removed");

const sourceFilesToScan = [
  ...typescriptFiles(join(repoRoot, "src/app")),
  join(repoRoot, "src/lib/auth.ts"),
  join(repoRoot, "src/middleware.ts"),
];
const fallbackCredentialReferences = sourceFilesToScan
  .map((full) => [relative(repoRoot, full), readFileSync(full, "utf8")])
  .filter(([, source]) => /admin@kliqnet\.com|credentials\.password\s*===\s*["']admin["']|Fallback: hardcoded admin/i.test(source))
  .map(([path]) => path);

assert.deepEqual(
  fallbackCredentialReferences,
  [],
  `fallback admin credentials must not appear in auth/admin UI source; found: ${fallbackCredentialReferences.join(", ")}`
);

function typescriptFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...typescriptFiles(full));
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

function routeFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...routeFiles(full));
    else if (entry === "route.ts") out.push(full);
  }
  return out;
}

const adminApiDir = join(repoRoot, "src/app/api/admin");
const unwrappedRoutes = routeFiles(adminApiDir)
  .map((full) => [relative(repoRoot, full), readFileSync(full, "utf8")])
  .filter(([, source]) => !source.includes("withAuth") && !source.includes("getServerSession"))
  .map(([path]) => path);

assert.deepEqual(
  unwrappedRoutes,
  [],
  `all admin API route handlers should have route-level auth in addition to middleware; unwrapped: ${unwrappedRoutes.join(", ")}`
);

const envExample = read(".env.example");
for (const name of ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL", "ADMIN_SEED_EMAIL", "ADMIN_SEED_PASSWORD"]) {
  assert.match(envExample, new RegExp(`^${name}=`, "m"), `.env.example must document ${name}`);
}

console.log("security regression checks passed");
