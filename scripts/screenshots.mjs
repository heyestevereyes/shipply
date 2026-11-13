// Capturas de página completa a 375, 768, 1024, 1366 y 1920px.
// Uso: node scripts/screenshots.mjs [baseUrl] [--only=375,1366] [--path=/]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) || "http://localhost:3000";
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1]?.split(",").map(Number);
const route = args.find((a) => a.startsWith("--path="))?.split("=")[1] || "/";
const widths = only ?? [375, 768, 1024, 1366, 1920];
const outDir = path.join(process.cwd(), "screenshots");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 812 : 900 }, deviceScaleFactor: 1 });
  await page.goto(base + route, { waitUntil: "networkidle" });
  // recorre la página para disparar animaciones de viewport y carga diferida
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 2600));
  });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const name = `${route === "/" ? "home" : route.replace(/\W+/g, "")}-${width}.png`;
  await page.screenshot({ path: path.join(outDir, name), fullPage: true });
  console.log(`✓ ${name}${overflow > 0 ? `  ⚠ overflow horizontal ${overflow}px` : ""}`);
  await page.close();
}
await browser.close();
