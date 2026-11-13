// Divide capturas de página completa en tramos para revisarlas.
// Uso: node scripts/slice.mjs screenshots/home-1366.png [alturaTramo]
import sharp from "sharp";
import path from "node:path";
import { mkdirSync } from "node:fs";

const [file, hArg] = process.argv.slice(2);
const img = sharp(file);
const { width, height } = await img.metadata();
const h = Number(hArg) || Math.round(width * 1.25);
const out = path.join(path.dirname(file), "slices");
mkdirSync(out, { recursive: true });
const base = path.basename(file, ".png");
let i = 0;
for (let top = 0; top < height; top += h, i++) {
  const name = path.join(out, `${base}-${String(i).padStart(2, "0")}.png`);
  await sharp(file).extract({ left: 0, top, width, height: Math.min(h, height - top) }).toFile(name);
}
console.log(`${base}: ${height}px → ${i} tramos`);
