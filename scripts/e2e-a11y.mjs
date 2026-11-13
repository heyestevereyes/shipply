// Verificaciones de teclado, reduced-motion y ruta de embarque.
// Uso: node scripts/e2e-a11y.mjs [baseUrl]
import { chromium } from "@playwright/test";

const base = process.argv[2] || "http://localhost:3001";
const browser = await chromium.launch();
let failures = 0;
const ok = (c, m) => {
  console.log(`${c ? "✓" : "✗"} ${m}`);
  if (!c) failures++;
};

// 1. Teclado: FAQ
{
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(base, { waitUntil: "networkidle" });
  const btn = page.locator("#preguntas button[aria-expanded]").nth(1);
  await btn.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);
  ok((await btn.getAttribute("aria-expanded")) === "true", "FAQ abre con Enter");
  ok((await page.locator("#preguntas button[aria-expanded=true]").count()) === 1, "FAQ: solo un panel abierto");
  await page.keyboard.press("Space");
  await page.waitForTimeout(500);
  ok((await btn.getAttribute("aria-expanded")) === "false", "FAQ cierra con Espacio");
  // foco visible
  const outline = await btn.evaluate((el) => getComputedStyle(el).outlineStyle);
  ok(outline !== "none", `foco visible en botones (outline: ${outline})`);
  // ruta de embarque completa al final de la sección
  await page.evaluate(() => {
    const el = document.getElementById("proceso");
    window.scrollTo({ top: el.offsetTop + el.offsetHeight - window.innerHeight * 0.3, behavior: "instant" });
  });
  await page.waitForTimeout(1500);
  const active = await page.locator("#proceso [data-node][data-active=true]").count();
  ok(active === 6, `ruta de embarque: ${active}/6 nodos activos al final del scroll`);
  await page.close();
}

// 2. Teclado: menú móvil
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base, { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  ok(await page.getByRole("dialog", { name: "Menú" }).isVisible(), "menú móvil abre con Enter");
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  ok(Boolean(focused && focused.includes("Cómo funciona")), `foco entra al menú (${focused})`);
  for (let i = 0; i < 10; i++) await page.keyboard.press("Tab");
  const inside = await page.evaluate(() => Boolean(document.activeElement?.closest("header")));
  ok(inside, "trampa de foco: Tab no sale del menú");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  ok((await page.getByRole("dialog").count()) === 0, "Escape cierra el menú");
  ok((await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"))) === "menu-movil", "foco regresa al botón");
  // barra fija inferior tras el hero
  await page.evaluate(() => window.scrollTo({ top: document.getElementById("proceso").offsetTop, behavior: "instant" }));
  await page.waitForTimeout(700);
  ok(await page.getByRole("link", { name: "Cotizar", exact: true }).isVisible(), "barra inferior 'Cotizar' visible después del hero");
  await page.close();
}

// 3. prefers-reduced-motion
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  const anim = await page.locator(".highlight-block").evaluate((el) => getComputedStyle(el).animationName);
  ok(anim === "none", `highlight sin animación (${anim})`);
  const steps = await page.locator('[aria-label="Estado del embarque"] li').allInnerTexts();
  ok(steps[2]?.includes("en curso"), "widget muestra estado final de inmediato");
  await page.evaluate(() => window.scrollTo({ top: document.getElementById("proceso").offsetTop, behavior: "instant" }));
  await page.waitForTimeout(800);
  ok((await page.locator("#proceso [data-node][data-active=true]").count()) === 6, "ruta completa sin animar");
  const marquee = await page.locator(".marquee-track").evaluate((el) => getComputedStyle(el).animationIterationCount);
  ok(marquee === "1", `marquee detenido (iteraciones: ${marquee})`);
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll("main h2, main h3")].filter((h) => getComputedStyle(h.closest("[style*=opacity]") || h).opacity === "0").length,
  );
  ok(hidden === 0, `contenido visible sin animaciones (${hidden} ocultos)`);
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} fallas` : "\nTodo OK");
process.exit(failures ? 1 : 0);
