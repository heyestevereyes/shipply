// Coloca tramos verticales lado a lado: node scripts/montage.mjs screenshots/home-375.png 1500 3
import sharp from "sharp";
import path from "node:path";
import { mkdirSync } from "node:fs";

const [file, hArg, nArg] = process.argv.slice(2);
const h = Number(hArg) || 1500;
const n = Number(nArg) || 3;
const { width, height } = await sharp(file).metadata();
const gap = 24;
const out = path.join(path.dirname(file), "slices");
mkdirSync(out, { recursive: true });
const base = path.basename(file, ".png");
const tiles = [];
for (let top = 0; top < height; top += h) tiles.push({ top, height: Math.min(h, height - top) });
let k = 0;
for (let i = 0; i < tiles.length; i += n, k++) {
  const group = tiles.slice(i, i + n);
  const composites = await Promise.all(
    group.map(async (t, j) => ({
      input: await sharp(file).extract({ left: 0, top: t.top, width, height: t.height }).toBuffer(),
      left: j * (width + gap),
      top: 0,
    })),
  );
  await sharp({ create: { width: n * width + (n - 1) * gap, height: h, channels: 3, background: "#ff00ff" } })
    .composite(composites)
    .png()
    .toFile(path.join(out, `${base}-m${k}.png`));
}
console.log(`${base}: ${k} montajes`);
