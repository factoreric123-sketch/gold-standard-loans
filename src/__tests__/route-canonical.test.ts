import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Static check: every indexable page route must declare a self-referencing
 * canonical link and og:url built from SITE_URL.
 */

const ROUTES_DIR = join(process.cwd(), "src", "routes");

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.tsx$/.test(entry.name) ? [full] : [];
  });
}

/** src/routes/blog.$slug.tsx -> /blog/${params.slug} */
function expectedPath(file: string): string {
  const rel = file
    .slice(ROUTES_DIR.length + 1)
    .replace(/\.tsx$/, "")
    .split(/[\\/]/)
    .join(".");

  const segments = rel
    .split(".")
    .filter((s) => s !== "index" && s !== "route" && !s.startsWith("_"))
    .map((s) => (s.startsWith("$") ? `\${params.${s.slice(1)}}` : s));

  return segments.length ? `/${segments.join("/")}` : "";
}

const files = walk(ROUTES_DIR).filter((f) => {
  const rel = f.slice(ROUTES_DIR.length + 1);
  if (rel.startsWith("__root")) return false; // sitewide defaults only
  if (rel.startsWith("api")) return false; // not pages
  const src = readFileSync(f, "utf8");
  if (/robots["']?\s*,\s*content:\s*["']noindex/.test(src)) return false; // intentionally hidden
  if (/_authenticated/.test(rel)) return false; // private, gated
  return /head\s*:/.test(src);
});

describe("route SEO tags", () => {
  it("finds page routes to check", () => {
    expect(files.length).toBeGreaterThan(5);
  });

  it.each(files.map((f) => [f.slice(ROUTES_DIR.length + 1), f] as const))(
    "%s declares a self-referencing canonical and og:url",
    (_name, file) => {
      const src = readFileSync(file, "utf8");
      const path = expectedPath(file);
      const expected = path ? "${SITE_URL}" + path : "SITE_URL";

      expect(src, "missing SITE_URL import").toMatch(
        /import\s*{[^}]*\bSITE_URL\b[^}]*}\s*from\s*["']@\/lib\/site-data["']/,
      );

      const canonical = src.match(/rel:\s*["']canonical["'],\s*href:\s*(`[^`]*`|SITE_URL)/);
      expect(canonical, "no canonical link in head()").not.toBeNull();

      const ogUrl = src.match(/property:\s*["']og:url["'],\s*content:\s*(`[^`]*`|SITE_URL)/);
      expect(ogUrl, "no og:url meta in head()").not.toBeNull();

      const norm = (v: string) => v.trim().replace(/^`|`$/g, "");
      expect(norm(canonical![1])).toBe(expected);
      expect(norm(ogUrl![1])).toBe(expected);
    },
  );

  it("SITE_URL uses the canonical www domain over https", async () => {
    const src = readFileSync(join(process.cwd(), "src", "lib", "site-data.ts"), "utf8");
    expect(src).toMatch(/SITE_URL\s*=\s*["']https:\/\/www\.thediscountmortgagestore\.com["']/);
  });
});
