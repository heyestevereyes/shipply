"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { trackCta } from "@/lib/analytics";

const w = site.hero.widget;

/** Widget flotante de tracking: avanza sus estados en secuencia. */
export function TrackingWidget() {
  const reduce = useReducedMotion();
  // progreso: cuántos pasos se han "resuelto" (0..activeStep+1)
  const [progress, setProgress] = useState(0);
  const target = w.activeStep + 1;

  useEffect(() => {
    if (reduce) return;
    const timers = Array.from({ length: target }, (_, i) =>
      window.setTimeout(() => setProgress(i + 1), 900 + i * 650),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduce, target]);

  const shown = reduce ? target : progress;
  const lineFill = Math.max(0, Math.min(shown - 1, w.activeStep)) / (w.steps.length - 1);

  return (
    <div className="relative w-full max-w-[26rem]">
      {/* Línea lima curva que pasa por detrás de la card (como en Mavrin) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[14%] -inset-y-[10%] z-0 hidden h-[120%] w-[128%] sm:block"
        aria-hidden="true"
        fill="none"
      >
        <path
          className="widget-route"
          d="M4 30 C 0 8, 18 -2, 22 6 M 22 6 C 40 40, 60 60, 92 62 C 104 64, 96 92, 70 98"
          pathLength={1}
          stroke="var(--color-lime)"
          strokeWidth="7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 rounded-[28px] border border-moss/50 bg-forest/70 p-2.5 shadow-[var(--shadow-deep)] backdrop-blur-md">
        <div className="rounded-[22px] bg-paper p-5 text-ink sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p className="whitespace-nowrap font-mono text-[0.75rem] uppercase tracking-[0.12em] text-graphite">
              {w.label} <span className="ml-1 font-semibold text-ink">{w.id}</span>
            </p>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-lime-soft px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-moss">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-moss" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-moss" />
              </span>
              {w.status}
            </span>
          </div>

          <dl className="mt-5 grid gap-2.5 text-[0.875rem]">
            {w.rows.map((r) => (
              <div key={r.k} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt className="font-mono text-[0.75rem] uppercase tracking-[0.08em] leading-6 text-graphite">{r.k}</dt>
                <dd className="font-medium leading-6">{r.v}</dd>
              </div>
            ))}
          </dl>

          <div className="my-5 h-px bg-ink/10" />

          <ol className="relative grid gap-3.5" aria-label="Estado del embarque">
            {/* riel vertical */}
            <span aria-hidden className="absolute bottom-2 left-[9px] top-2 w-px bg-ink/12" />
            <m.span
              aria-hidden
              className="absolute left-[9px] top-2 w-px origin-top bg-moss"
              style={{ height: "calc(100% - 1rem)" }}
              initial={false}
              animate={{ scaleY: lineFill }}
              transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
            />
            {w.steps.map((s, i) => {
              const done = i < w.activeStep && shown > i;
              const active = i === w.activeStep && shown > i;
              return (
                <li key={s.label} className="relative flex items-center gap-3 text-[0.9375rem]">
                  <span
                    className={`relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      done
                        ? "border-moss bg-moss text-paper"
                        : active
                          ? "border-moss bg-lime"
                          : "border-ink/20 bg-paper"
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> : null}
                    {active ? (
                      <>
                        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-ink" />
                      </>
                    ) : null}
                  </span>
                  <span className={`font-medium ${done || active ? "text-ink" : "text-graphite"}`}>{s.label}</span>
                  {s.note ? (
                    <span
                      className={`ml-auto font-mono text-[0.75rem] transition-opacity duration-500 ${
                        done || active ? "opacity-100" : "opacity-0"
                      } ${active ? "font-semibold text-moss" : "text-graphite"}`}
                    >
                      {s.note}
                    </span>
                  ) : null}
                  <span className="sr-only">{done ? ", completado" : active ? ", en curso" : ", pendiente"}</span>
                </li>
              );
            })}
          </ol>

          <a
            href="#proceso"
            onClick={() => trackCta("hero_widget", w.cta)}
            className="group on-light mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[0.9375rem] font-medium text-cream transition-colors hover:bg-forest"
          >
            {w.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
