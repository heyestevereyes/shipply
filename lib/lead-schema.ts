import { z } from "zod";
import { site } from "@/content/site";

const e = site.quote.errors;
const f = site.quote.fields;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const categoryValues = [
  "otro",
  ...site.categories.items.map((c): string => c.id),
] as [string, ...string[]];

export const stepSchemas = [
  z.object({
    category: z.enum(categoryValues, { error: e.category }),
    description: z.string({ error: e.description }).trim().min(10, e.description).max(1000),
  }),
  z.object({
    volume: z.enum(values(f.volume.options), { error: e.volume }),
    budget: z.enum(values(f.budget.options), { error: e.budget }),
  }),
  z.object({
    imported: z.enum(values(f.imported.options), { error: e.imported }),
    padron: z.enum(values(f.padron.options), { error: e.padron }),
    timeline: z.enum(values(f.timeline.options), { error: e.timeline }),
  }),
  z.object({
    name: z.string({ error: e.name }).trim().min(2, e.name).max(80),
    company: z.string({ error: e.company }).trim().min(2, e.company).max(120),
    whatsapp: z
      .string({ error: e.whatsapp })
      .transform((v) => v.replace(/\D/g, ""))
      .pipe(z.string().length(10, e.whatsapp)),
    email: z.email(e.email),
    city: z.string({ error: e.city }).trim().min(2, e.city).max(80),
    privacy: z.literal(true, { error: e.privacy }),
  }),
] as const;

export const leadSchema = stepSchemas[0]
  .extend(stepSchemas[1].shape)
  .extend(stepSchemas[2].shape)
  .extend(stepSchemas[3].shape);

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** Metadatos de atribución que acompañan al lead. */
export const leadMetaSchema = z.object({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  page: z.string().max(500).optional(),
});

export const leadRequestSchema = z.object({
  lead: leadSchema,
  meta: leadMetaSchema.default({}),
  /** honeypot: debe llegar vacío */
  website: z.string().max(500).optional(),
});

export type Qualification = "lcl" | "booking" | "standard";

export function qualify(lead: Pick<Lead, "budget" | "volume">): Qualification {
  if (lead.volume === "recurrente" || lead.budget === "gt80k") return "booking";
  if (lead.budget === "lt10k") return "lcl";
  return "standard";
}
