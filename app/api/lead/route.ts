import { leadRequestSchema, qualify } from "@/lib/lead-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 422 },
    );
  }

  const { lead, meta, website } = parsed.data;
  const qualification = qualify(lead);

  // Honeypot: respondemos OK sin reenviar para no dar pistas al bot.
  if (website) {
    return Response.json({ ok: true, qualification });
  }

  const payload = {
    ...lead,
    whatsapp: `+52${lead.whatsapp}`,
    qualification,
    meta: {
      ...meta,
      user_agent: request.headers.get("user-agent") ?? undefined,
    },
    submitted_at: new Date().toISOString(),
    source: "landing-importacion",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[lead] LEAD_WEBHOOK_URL no está configurada. Lead recibido:", payload);
    return Response.json({ ok: true, qualification, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);
  } catch (err) {
    console.error("[lead] Error enviando al webhook", err);
    return Response.json({ ok: false, error: "webhook" }, { status: 502 });
  }

  return Response.json({ ok: true, qualification, delivered: true });
}
