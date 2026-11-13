# Shipply · Landing de importación por volumen

Landing B2B (Next.js 16 App Router + Tailwind v4) cuyo único objetivo es convertir visitas en solicitudes de cotización o llamadas agendadas.

## Arranque

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev                   # http://localhost:3000
```

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Todo el copy | `content/site.ts` (un solo objeto tipado). En titulares, `*texto*` se muestra como acento en Instrument Serif. |
| Colores, tipografía, escalas | `app/globals.css` (bloque `@theme`) |
| Imágenes | `public/images/` (mismos nombres; ver tabla abajo) |
| Envío de leads | `app/api/lead/route.ts` → POST a `LEAD_WEBHOOK_URL` |
| Esquema y calificación del lead | `lib/lead-schema.ts` |
| Analítica | `lib/analytics.ts` (dataLayer) y `components/analytics-scripts.tsx` (GA4 / Meta Pixel) |

## Variables de entorno

| Variable | Uso |
|---|---|
| `LEAD_WEBHOOK_URL` | n8n, Make o CRM. Sin ella, el lead solo se registra en el log del servidor. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Formato `52` + 10 dígitos. |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Mensaje prellenado. |
| `NEXT_PUBLIC_BOOKING_URL` | URL embebible de Calendly o Cal.com. Sin ella, el éxito de alto volumen ofrece WhatsApp. |
| `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_META_PIXEL_ID` | Si están vacías, los scripts no se cargan. |
| `NEXT_PUBLIC_SITE_URL` | Dominio final (canonical, OG, sitemap, JSON-LD). |

## Lead que recibe el webhook

```json
{
  "category": "hogar-cocina", "description": "…", "volume": "consolidado|20|40|recurrente",
  "budget": "lt10k|10-30k|30-80k|gt80k", "imported": "si|no", "padron": "si|no|nose",
  "timeline": "lt2|2-4|gt4", "name": "…", "company": "…", "whatsapp": "+52XXXXXXXXXX",
  "email": "…", "city": "…", "privacy": true,
  "qualification": "lcl|booking|standard",
  "meta": { "utm_source": "…", "utm_medium": "…", "utm_campaign": "…", "referrer": "…", "page": "…", "user_agent": "…" },
  "submitted_at": "ISO 8601", "source": "landing-importacion"
}
```

Calificación: `lcl` si el presupuesto es menor a $10,000 (el éxito sugiere Consolidado). `booking` si eligen "Varios contenedores al año" o más de $80,000 (el éxito muestra la agenda). Honeypot: campo oculto `website`.

Eventos en `dataLayer`: `cta_click` (`cta_location`, `cta_label`), `form_start`, `form_step` (`step`), `generate_lead` (`volume`, `budget`, `category`, `qualification`). `generate_lead` también dispara `Lead` en Meta Pixel.

## Imágenes

Hoy son placeholders (fondo forest con el nombre del archivo). Reemplázalas conservando el nombre exacto: `hero-port.jpg`, `warehouse-pallets.jpg`, `qc-inspection.jpg`, `container-loading.jpg`, `cargo-ship.jpg`, `distribution-team.jpg`, `retail-shelf.jpg`, `industrial-supplies.jpg`, `customs-docs.jpg` y `cat-{hogar-cocina,ferreteria,empaque,textil,electronica,belleza,juguetes,mobiliario}.jpg`. `npm run placeholders` regenera solo las que falten.

## Verificación

```bash
npm run build && npm start            # producción local en :3000
npm run screenshots                   # capturas 375/768/1024/1366/1920 en /screenshots
npm run test:form -- http://localhost:3000   # E2E del cotizador (requiere LEAD_WEBHOOK_URL)
npm run test:a11y -- http://localhost:3000   # teclado, reduced-motion, ruta de embarque
```

## Despliegue

Vercel: importa el repo, define las variables de entorno y despliega. No requiere configuración extra.
