// Static file server with clean routes. Run: bun server.ts
import { readdir } from "node:fs/promises";

const ROOT = import.meta.dir;
const PORT = Number(Bun.env.PORT) || 3000;

const slug = (name: string) =>
  name.replace(/\.dc\.html$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// slug -> "Real File Name.dc.html"
const routes = new Map<string, string>();
for (const f of await readdir(ROOT)) {
  if (f.endsWith(".dc.html")) routes.set(slug(f), f);
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    if (path.includes("..")) return new Response("Forbidden", { status: 403 });

    // "/" serves home; clean route /work -> "Work.dc.html"; also raw "/Work.dc.html"
    const key = path === "/" ? "home" : path.slice(1);
    const hit = routes.get(key) ?? (path.endsWith(".dc.html") ? path.slice(1) : null);
    if (hit) return new Response(rewrite(await Bun.file(ROOT + "/" + hit).text()), {
      headers: { "content-type": "text/html;charset=utf-8" },
    });

    const file = Bun.file(ROOT + path);
    if (await file.exists()) return new Response(file);
    return new Response("Not found", { status: 404 });
  },
});

// rewrite any "Name.dc.html" link/redirect to its clean /slug ("home" -> "/")
function rewrite(html: string) {
  return html.replace(/(["'])([^"']+?)\.dc\.html\1/g, (m, q, name) => {
    const s = slug(name + ".dc.html");
    return `${q}${s === "home" ? "/" : "/" + s}${q}`;
  });
}

console.log(`http://localhost:${PORT}`);
