// Genera imágenes placeholder (fondo forest + nombre de archivo centrado).
// Uso: node scripts/placeholders.mjs  (no sobrescribe archivos existentes; usa --force para regenerar)
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const out = path.join(process.cwd(), "public", "images");
mkdirSync(out, { recursive: true });
const force = process.argv.includes("--force");

const files = [
  ["hero-port.jpg", 1600, 1100],
  ["warehouse-pallets.jpg", 1200, 900],
  ["qc-inspection.jpg", 1200, 900],
  ["container-loading.jpg", 1200, 900],
  ["cargo-ship.jpg", 1200, 900],
  ["distribution-team.jpg", 900, 900],
  ["retail-shelf.jpg", 900, 900],
  ["industrial-supplies.jpg", 900, 900],
  ["customs-docs.jpg", 1200, 900],
  ...[
    "hogar-cocina",
    "ferreteria",
    "empaque",
    "textil",
    "electronica",
    "belleza",
    "juguetes",
    "mobiliario",
  ].map((c) => [`cat-${c}.jpg`, 800, 800]),
];

// Catálogos: toda imagen /images/catalogo/**.jpg citada en content/catalogs/*.ts (cover = 1200x630, el resto 1000x1250).
const catDir = path.join(process.cwd(), "content", "catalogs");
for (const f of existsSync(catDir) ? readdirSync(catDir).filter((x) => x.endsWith(".ts") && x !== "types.ts") : []) {
  const src = readFileSync(path.join(catDir, f), "utf8");
  for (const m of src.matchAll(/"\/images\/(catalogo\/[^"]+\.jpg)"/g)) {
    files.push([m[1], m[1].endsWith("cover.jpg") ? 1200 : 1000, m[1].endsWith("cover.jpg") ? 630 : 1250]);
  }
}

for (const [name, w, h] of files) {
  const dest = path.join(out, name);
  mkdirSync(path.dirname(dest), { recursive: true });
  if (existsSync(dest) && !force) continue;
  const fs = Math.round(Math.min(w, h) / 16);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><radialGradient id="g" cx="50%" cy="60%" r="75%">
      <stop offset="0" stop-color="#1F5A3F"/><stop offset="1" stop-color="#12382A"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Consolas, monospace" font-size="${fs}" fill="#C9F26B" opacity="0.85">${path.basename(name)}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(dest);
  console.log("✓", name);
}
