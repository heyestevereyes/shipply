"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { site } from "@/content/site";

const d = site.services.featured.dashboard;

/** Mini dashboard ilustrado en UI (no imagen). */
export function MiniDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="rounded-[20px] border border-moss/60 bg-forest/70 p-4 backdrop-blur sm:p-5" role="group" aria-label={d.title}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-cream/70">{d.title}</p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-lime">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          {d.live}
        </span>
      </div>

      <ul className="mt-4 grid gap-2.5">
        {d.shipments.map((s, i) => (
          <li key={s.id} className="rounded-2xl bg-ink/60 p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[0.8125rem]">
              <span className="font-mono font-medium text-cream">{s.id}</span>
              <span className="text-cream/70">{s.route}</span>
              <span className="hidden font-mono text-cream/70 sm:inline">{s.load}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] ${
                  s.progress === 100 ? "bg-moss text-cream" : "bg-lime text-ink"
                }`}
              >
                {s.status}
              </span>
            </div>
            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-moss/50"
              role="progressbar"
              aria-label={`${s.id} ${s.status}`}
              aria-valuenow={s.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <m.div
                className="h-full rounded-full bg-lime"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: inView || reduce ? `${s.progress}%` : 0 }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={reduce ? { width: `${s.progress}%` } : undefined}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-3 border-t border-moss/50 pt-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime font-mono text-[0.6875rem] font-semibold text-ink" aria-hidden>
          AR
        </span>
        <div className="text-[0.8125rem] leading-tight">
          <p className="text-cream/70">{d.exec}</p>
          <p className="font-medium text-cream">{d.execName}</p>
        </div>
      </div>
    </div>
  );
}
