// Prueba E2E del cotizador: validación por paso, regreso, calificación, envío y dataLayer.
// Uso: node scripts/e2e-form.mjs [baseUrl]
import { chromium } from "@playwright/test";

const base = process.argv[2] || "http://localhost:3001";
const browser = await chromium.launch();
let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) failures++;
};

async function run({ budget, volume, expect }) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${base}/?utm_source=test&utm_campaign=e2e#cotizar`, { waitUntil: "networkidle" });
  const form = page.locator("#cotizar form");

  // Paso 1: validación vacía
  await form.getByRole("button", { name: "Continuar" }).click();
  ok((await form.getByRole("alert").count()) >= 2, `[${expect}] paso 1 muestra errores si está vacío`);
  await form.getByLabel("Categoría").selectOption("hogar-cocina");
  await form.getByLabel("Describe tu producto").fill("5,000 juegos de vasos de vidrio con empaque personalizado");
  await form.getByRole("button", { name: "Continuar" }).click();

  // Paso 2
  await page.getByRole("heading", { name: "¿De qué volumen hablamos?" }).waitFor();
  await form.getByRole("button", { name: "Continuar" }).click();
  ok((await form.getByRole("alert").count()) >= 2, `[${expect}] paso 2 valida volumen y presupuesto`);
  await form.locator(`input[name=volume][value="${volume}"]`).check({ force: true });
  await form.locator(`input[name=budget][value="${budget}"]`).check({ force: true });
  // regresar y volver: los valores se conservan
  await form.getByRole("button", { name: "Atrás" }).click();
  await page.getByRole("heading", { name: "¿Qué quieres importar?" }).waitFor();
  ok((await form.getByLabel("Categoría").inputValue()) === "hogar-cocina", `[${expect}] al regresar se conservan los datos`);
  await form.getByRole("button", { name: "Continuar" }).click();
  await form.getByRole("button", { name: "Continuar" }).click();

  // Paso 3: navegación con teclado en radios
  await page.getByRole("heading", { name: "Tu operación." }).waitFor();
  await form.locator('input[name=imported][value="si"]').focus();
  await page.keyboard.press("Space");
  await form.locator('input[name=padron][value="nose"]').check({ force: true });
  await form.locator('input[name=timeline][value="2-4"]').check({ force: true });
  await form.getByRole("button", { name: "Continuar" }).click();

  // Paso 4
  await page.getByRole("heading", { name: "Tus datos." }).waitFor();
  await form.getByLabel("Nombre").fill("Laura Méndez");
  await form.getByLabel("Empresa").fill("Distribuidora Prueba");
  await form.getByLabel("WhatsApp").fill("33 1234 567"); // 9 dígitos: inválido
  await form.getByLabel("Correo").fill("laura@prueba.mx");
  await form.getByLabel("Ciudad").fill("Guadalajara");
  await form.getByRole("button", { name: "Enviar y recibir mi cotización" }).click();
  ok((await form.getByRole("alert").count()) >= 2, `[${expect}] valida WhatsApp y aviso de privacidad`);
  await form.getByLabel("WhatsApp").fill("33 1234 5678");
  await form.getByRole("checkbox").check();
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().endsWith("/api/lead")),
    form.getByRole("button", { name: "Enviar y recibir mi cotización" }).click(),
  ]);
  const body = await resp.json();
  ok(resp.status() === 200 && body.ok && body.delivered, `[${expect}] /api/lead respondió ok y entregó al webhook`);
  ok(body.qualification === expect, `[${expect}] calificación = ${body.qualification}`);

  await page.getByText("Listo, Laura.").waitFor();
  ok(true, `[${expect}] estado de éxito visible`);
  if (expect === "lcl") ok(await page.getByText(/modelo Consolidado/).isVisible(), "[lcl] sugiere Consolidado");
  if (expect === "booking") ok(await page.getByText(/agenda ahora una llamada/).isVisible(), "[booking] muestra bloque de agenda");

  const events = await page.evaluate(() => (window.dataLayer || []).map((e) => e.event));
  ok(events.includes("form_step") && events.includes("generate_lead"), `[${expect}] dataLayer: ${[...new Set(events)].join(", ")}`);
  ok(errors.length === 0, `[${expect}] sin errores de JS ${errors.join(" | ")}`);
  await page.close();
}

await run({ budget: "lt10k", volume: "consolidado", expect: "lcl" });
await run({ budget: "30-80k", volume: "recurrente", expect: "booking" });
await run({ budget: "10-30k", volume: "20", expect: "standard" });

// Honeypot
const res = await fetch(`${base}/api/lead`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
ok(res.status === 422, "API rechaza payload inválido (422)");

await browser.close();
console.log(failures ? `\n${failures} fallas` : "\nTodo OK");
process.exit(failures ? 1 : 0);
