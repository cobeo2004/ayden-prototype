// Pre-render the .dc.html portfolio into ./dist for static hosting.
// Reuses the same slug/rewrite logic the dev server uses.
import { readdir, mkdir, rm, cp, writeFile } from "node:fs/promises";

const ROOT = import.meta.dir;
const DIST = ROOT + "/dist";

const slug = (name: string) =>
  name.replace(/\.dc\.html$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// rewrite "Name.dc.html" links to clean /slug ("home" -> "/")
const rewrite = (html: string) =>
  html.replace(/(["'])([^"']+?)\.dc\.html\1/g, (_m, q, name) => {
    const s = slug(name + ".dc.html");
    return `${q}${s === "home" ? "/" : "/" + s}${q}`;
  });

const SITE = "https://aydennguyen.site";
const DESC = "Ayden Nguyen — marketing, strategy and community portfolio.";

// inject per-page <title>, description and canonical into <head>
function injectMeta(html: string, name: string): string {
  const title = name.replace(/\.dc\.html$/, "");
  const s = slug(name);
  const url = s === "home" ? SITE + "/" : `${SITE}/${s}`;
  const tags =
    `<title>${title} · Ayden's Portfolio</title>` +
    `<meta name="description" content="${DESC}">` +
    `<link rel="canonical" href="${url}">`;
  return html.replace("</head>", tags + "</head>");
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const entries = await readdir(ROOT, { withFileTypes: true });
  const pages = entries.filter((e) => e.isFile() && e.name.endsWith(".dc.html"));

  // pages -> dist/<slug>/index.html (home -> dist/index.html), links rewritten
  for (const p of pages) {
    const html = injectMeta(rewrite(await Bun.file(ROOT + "/" + p.name).text()), p.name);
    const s = slug(p.name);
    const out = s === "home" ? `${DIST}/index.html` : `${DIST}/${s}/index.html`;
    await mkdir(out.slice(0, out.lastIndexOf("/")), { recursive: true });
    await writeFile(out, html);
  }

  // static deps the pages load directly
  for (const asset of ["support.js", "pagefx.js", "image-slot.js", "assets", "vendor"]) {
    await cp(ROOT + "/" + asset, DIST + "/" + asset, { recursive: true });
  }

  console.log(`Built ${pages.length} pages -> dist/`);
}

main();
