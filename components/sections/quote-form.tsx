"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type BaseSyntheticEvent, type ReactNode } from "react";
import { useForm, type FieldPath, type UseFormRegisterReturn } from "react-hook-form";
import { site } from "@/content/site";
import { leadSchema, qualify, type Lead, type LeadInput, type Qualification } from "@/lib/lead-schema";
import { track } from "@/lib/analytics";
import { bookingUrl, whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

const q = site.quote;
const f = q.fields;

const stepFields: FieldPath<LeadInput>[][] = [
  ["category", "description"],
  ["volume", "budget"],
  ["imported", "padron", "timeline"],
  ["name", "company", "whatsapp", "email", "city", "privacy"],
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const META_STORE = "shipply_attribution";

function readAttribution() {
  const meta: Record<string, string> = {};
  try {
    const saved = sessionStorage.getItem(META_STORE);
    if (saved) Object.assign(meta, JSON.parse(saved));
  } catch {}
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) meta[k] = v.slice(0, 200);
  });
  if (!meta.referrer && document.referrer) meta.referrer = document.referrer.slice(0, 500);
  meta.page = window.location.href.slice(0, 500);
  try {
    sessionStorage.setItem(META_STORE, JSON.stringify(meta));
  } catch {}
  return meta;
}

const inputBase =
  "on-light w-full rounded-2xl border border-ink/15 bg-white px-4 text-[1rem] text-ink placeholder:text-stone transition-[border-color,box-shadow] duration-200 focus:border-moss focus:outline-none focus:ring-4 focus:ring-lime/60 aria-[invalid=true]:border-[#b42318]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.8125rem] font-medium text-[#b42318]">
      {message}
    </p>
  );
}

function Legend({ children }: { children: ReactNode }) {
  return <legend className="mb-3 text-[0.9375rem] font-semibold text-ink">{children}</legend>;
}

export function QuoteForm() {
  const reduce = useReducedMotion();
  const uid = useId();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<{ name: string; qualification: Qualification } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: { privacy: false as unknown as true },
  });

  useEffect(() => {
    readAttribution();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    track("form_step", { step: step + 1, step_name: q.steps[step].title });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const next = async () => {
    const ok = await trigger(stepFields[step], { shouldFocus: true });
    if (!ok) return;
    if (step === 0) track("form_start", {});
    setDir(1);
    setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (lead: Lead, e?: BaseSyntheticEvent) => {
    const form = e?.target instanceof HTMLFormElement ? e.target : null;
    const website = form ? String(new FormData(form).get("website") ?? "") : "";
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, meta: readAttribution(), website }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; qualification?: Qualification };
      if (!res.ok || !data.ok) throw new Error("lead");
      const qualification = data.qualification ?? qualify(lead);
      track("generate_lead", {
        volume: lead.volume,
        budget: lead.budget,
        category: lead.category,
        qualification,
      });
      setDone({ name: lead.name.split(" ")[0], qualification });
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  /** Selección (radio, select, checkbox): limpia el error al elegir, sin esperar al blur. */
  const choice = <K extends "category" | "volume" | "budget" | "imported" | "padron" | "timeline" | "privacy">(k: K) =>
    register(k, { onChange: () => clearErrors(k) });

  const err = (k: keyof LeadInput) => errors[k]?.message as string | undefined;
  const aria = (k: keyof LeadInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -32 }),
  };

  if (done) {
    return <Success name={done.name} qualification={done.qualification} onAgain={() => { reset(); setDone(null); setStep(0); }} />;
  }

  const progress = ((step + 1) / 4) * 100;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="on-light relative rounded-[var(--radius-card-lg)] bg-paper p-5 text-ink shadow-[var(--shadow-deep)] sm:p-8 lg:p-10"
      aria-labelledby={`${uid}-title`}
    >
      {/* Honeypot anti spam */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Sitio web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Progreso */}
      <div className="flex items-center justify-between font-mono text-[0.75rem] uppercase tracking-[0.12em] text-graphite">
        <span>
          {q.stepLabel} {step + 1} {q.of} 4
        </span>
        <span aria-hidden>{Math.round(progress)}%</span>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-label="Progreso del formulario"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={4}
      >
        <m.div
          className="h-full rounded-full bg-moss"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol className="mt-4 hidden grid-cols-4 gap-2 sm:grid" aria-hidden>
        {q.steps.map((s, i) => (
          <li
            key={s.title}
            className={`truncate font-mono text-[0.6875rem] uppercase tracking-[0.1em] ${i <= step ? "text-ink" : "text-graphite"}`}
          >
            {s.short}
          </li>
        ))}
      </ol>

      <div className="relative mt-8 min-h-[22rem]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              id={`${uid}-title`}
              ref={headingRef}
              tabIndex={-1}
              className="text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-semibold tracking-[-0.03em] focus:outline-none"
            >
              {q.steps[step].title}
            </h3>

            {step === 0 ? (
              <div className="mt-6 grid gap-5">
                <div>
                  <label htmlFor={`${uid}-category`} className="mb-2 block text-[0.9375rem] font-semibold">
                    {f.category.label}
                  </label>
                  <div className="relative">
                    <select
                      id={`${uid}-category`}
                      defaultValue=""
                      className={`${inputBase} h-14 appearance-none pr-12`}
                      {...choice("category")}
                      {...aria("category")}
                    >
                      <option value="" disabled>
                        {f.category.placeholder}
                      </option>
                      {site.categories.items.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                      <option value="otro">{f.category.other}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite" aria-hidden />
                  </div>
                  <FieldError id={`${uid}-category-err`} message={err("category")} />
                </div>
                <div>
                  <label htmlFor={`${uid}-description`} className="mb-2 block text-[0.9375rem] font-semibold">
                    {f.description.label}
                  </label>
                  <textarea
                    id={`${uid}-description`}
                    rows={4}
                    placeholder={f.description.placeholder}
                    className={`${inputBase} resize-none py-3.5 leading-relaxed`}
                    {...register("description")}
                    {...aria("description")}
                  />
                  <FieldError id={`${uid}-description-err`} message={err("description")} />
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-6 grid gap-7">
                <fieldset {...aria("volume")}>
                  <Legend>{f.volume.label}</Legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {f.volume.options.map((o) => (
                      <label key={o.value} className="group relative cursor-pointer">
                        <input type="radio" value={o.value} className="peer sr-only" {...choice("volume")} />
                        <span className="flex h-full min-h-[5.25rem] flex-col justify-between gap-3 rounded-2xl border border-ink/15 bg-white p-4 transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-ink/40 peer-checked:border-moss peer-checked:bg-lime-soft peer-checked:shadow-[0_0_0_1px_var(--color-moss)] peer-focus-visible:ring-4 peer-focus-visible:ring-lime/70">
                          <span className="flex items-center justify-between">
                            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-graphite">{o.hint}</span>
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ink/25 bg-white text-transparent transition-colors group-has-[:checked]:border-moss group-has-[:checked]:bg-moss group-has-[:checked]:text-paper">
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                            </span>
                          </span>
                          <span className="text-[1rem] font-semibold leading-snug">{o.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <FieldError id={`${uid}-volume-err`} message={err("volume")} />
                </fieldset>

                <fieldset {...aria("budget")}>
                  <Legend>{f.budget.label}</Legend>
                  <PillRadios options={f.budget.options} field={choice("budget")} />
                  <FieldError id={`${uid}-budget-err`} message={err("budget")} />
                </fieldset>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-6 grid gap-7">
                {(["imported", "padron", "timeline"] as const).map((k) => (
                  <fieldset key={k} {...aria(k)}>
                    <Legend>{f[k].label}</Legend>
                    <PillRadios options={f[k].options} field={choice(k)} />
                    <FieldError id={`${uid}-${k}-err`} message={err(k)} />
                  </fieldset>
                ))}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {(["name", "company"] as const).map((k) => (
                  <div key={k}>
                    <label htmlFor={`${uid}-${k}`} className="mb-2 block text-[0.9375rem] font-semibold">
                      {f[k].label}
                    </label>
                    <input
                      id={`${uid}-${k}`}
                      type="text"
                      autoComplete={k === "name" ? "name" : "organization"}
                      placeholder={f[k].placeholder}
                      className={`${inputBase} h-14`}
                      {...register(k)}
                      {...aria(k)}
                    />
                    <FieldError id={`${uid}-${k}-err`} message={err(k)} />
                  </div>
                ))}
                <div>
                  <label htmlFor={`${uid}-whatsapp`} className="mb-2 block text-[0.9375rem] font-semibold">
                    {f.whatsapp.label}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[0.9375rem] text-graphite">
                      {f.whatsapp.prefix}
                    </span>
                    <input
                      id={`${uid}-whatsapp`}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder={f.whatsapp.placeholder}
                      className={`${inputBase} h-14 pl-14`}
                      {...register("whatsapp")}
                      {...aria("whatsapp")}
                    />
                  </div>
                  <FieldError id={`${uid}-whatsapp-err`} message={err("whatsapp")} />
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className="mb-2 block text-[0.9375rem] font-semibold">
                    {f.email.label}
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    autoComplete="email"
                    placeholder={f.email.placeholder}
                    className={`${inputBase} h-14`}
                    {...register("email")}
                    {...aria("email")}
                  />
                  <FieldError id={`${uid}-email-err`} message={err("email")} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-city`} className="mb-2 block text-[0.9375rem] font-semibold">
                    {f.city.label}
                  </label>
                  <input
                    id={`${uid}-city`}
                    type="text"
                    autoComplete="address-level2"
                    placeholder={f.city.placeholder}
                    className={`${inputBase} h-14`}
                    {...register("city")}
                    {...aria("city")}
                  />
                  <FieldError id={`${uid}-city-err`} message={err("city")} />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-graphite">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-[var(--color-moss)]"
                      {...choice("privacy")}
                      {...aria("privacy")}
                    />
                    <span>
                      {f.privacy.before}
                      <a href="/aviso-de-privacidad" target="_blank" className="font-medium text-ink underline underline-offset-4">
                        {f.privacy.link}
                      </a>
                      {f.privacy.after}
                    </span>
                  </label>
                  <FieldError id={`${uid}-privacy-err`} message={err("privacy")} />
                </div>
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-6 rounded-2xl bg-[#fde8e6] px-4 py-3 text-[0.9375rem] text-[#8a1c12]">
          {q.error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 font-medium text-ink transition-colors hover:bg-ink/5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {q.back}
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink px-8 font-medium text-cream transition-colors hover:bg-forest"
          >
            {q.next}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink px-8 font-medium text-cream transition-colors hover:bg-forest disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {q.sending}
              </>
            ) : (
              <>
                {q.submit}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

type PillRadiosProps = {
  options: readonly { value: string; label: string }[];
  field: UseFormRegisterReturn;
};

function PillRadios({ options, field }: PillRadiosProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <label key={o.value} className="group relative cursor-pointer">
          <input type="radio" value={o.value} className="peer sr-only" {...field} />
          <span className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-white px-5 text-[0.9375rem] font-medium transition-[border-color,background-color] duration-200 group-hover:border-ink/40 peer-checked:border-moss peer-checked:bg-lime-soft peer-focus-visible:ring-4 peer-focus-visible:ring-lime/70">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-ink/30 bg-white group-has-[:checked]:border-moss group-has-[:checked]:bg-moss">
              <span className="h-1.5 w-1.5 rounded-full bg-paper opacity-0 group-has-[:checked]:opacity-100" />
            </span>
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function Success({ name, qualification, onAgain }: { name: string; qualification: Qualification; onAgain: () => void }) {
  const reduce = useReducedMotion();
  const s = q.success;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <m.div
      ref={ref}
      tabIndex={-1}
      role="status"
      initial={reduce ? false : { opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="on-light rounded-[var(--radius-card-lg)] bg-paper p-6 text-ink shadow-[var(--shadow-deep)] focus:outline-none sm:p-10"
    >
      <m.span
        className="flex h-16 w-16 items-center justify-center rounded-full bg-lime"
        initial={reduce ? false : { scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
          <m.path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </svg>
      </m.span>
      <h3 className="mt-7 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-semibold tracking-[-0.03em]">
        {s.title.replace("{name}", name)}
      </h3>
      <p className="mt-3 max-w-[34rem] text-[1.0625rem] leading-relaxed text-graphite">{s.text}</p>

      {qualification === "lcl" ? (
        <p className="mt-6 rounded-2xl border border-moss/30 bg-lime-soft px-5 py-4 text-[0.9688rem] leading-relaxed text-ink">
          {s.lcl}
        </p>
      ) : null}

      {qualification === "booking" ? (
        <div className="mt-6">
          <p className="text-[0.9688rem] font-medium leading-relaxed text-ink">{s.booking}</p>
          {bookingUrl ? (
            <iframe
              src={bookingUrl}
              title={s.bookingTitle}
              loading="lazy"
              className="mt-4 h-[640px] w-full rounded-2xl border border-ink/10 bg-white"
            />
          ) : (
            // Sin NEXT_PUBLIC_BOOKING_URL: CTA directo a WhatsApp como respaldo
            <a
              href={whatsappUrl(s.bookingWhatsapp.replace("{name}", name))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_click", { cta_location: "success_booking", cta_label: s.bookingFallback })}
              className="mt-4 inline-flex h-14 items-center gap-2.5 rounded-full bg-lime px-7 font-medium text-ink"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {s.bookingFallback}
            </a>
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={onAgain}
        className="mt-8 text-[0.9375rem] font-medium text-graphite underline underline-offset-4 hover:text-ink"
      >
        {s.again}
      </button>
    </m.div>
  );
}
