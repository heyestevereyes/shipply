"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";
import { PillButton } from "@/components/ui/pill-button";

type Pt = { x: number; y: number };

/** Posiciones en escritorio: fila 2 en orden inverso para formar la serpiente. */
const serpentine = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-1 lg:row-start-2",
];

/** Construye la ruta que conecta los nodos: recta en vertical, serpenteante en escritorio. */
function buildSegments(pts: Pt[], width: number): string[] {
  const segs: string[] = [];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const sameRow = Math.abs(a.y - b.y) < 24;
    const sameCol = Math.abs(a.x - b.x) < 24;
    if (sameCol) {
      segs.push(`L ${b.x} ${b.y}`);
    } else if (sameRow) {
      const mid = (a.x + b.x) / 2;
      const wave = (i % 2 ? -1 : 1) * 34;
      segs.push(`C ${mid} ${a.y + wave} ${mid} ${b.y - wave} ${b.x} ${b.y}`);
    } else {
      // cambio de fila: vuelta en U por el costado
      const side = a.x > width / 2 ? 1 : -1;
      const r = Math.max(70, Math.min(140, width * 0.09));
      const edge = side > 0 ? Math.max(a.x, b.x) + r : Math.min(a.x, b.x) - r;
      segs.push(`C ${edge} ${a.y} ${edge} ${b.y} ${b.x} ${b.y}`);
    }
  }
  return segs;
}

export function Process() {
  const { process } = site;
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);

  const setup = (gsap: typeof import("gsap").gsap, ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger) => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const base = baseRef.current;
    const draw = drawRef.current;
    const marker = markerRef.current;
    if (!wrap || !svg || !base || !draw || !marker) return;

    const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-node]"));
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-step]"));
    let fractions: number[] = [];
    let total = 0;

    const layout = () => {
      const box = wrap.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      const segs = buildSegments(pts, box.width);
      const start = `M ${pts[0].x} ${pts[0].y}`;
      const d = `${start} ${segs.join(" ")}`;
      base.setAttribute("d", d);
      draw.setAttribute("d", d);
      total = draw.getTotalLength();
      // fracción de la ruta en la que cae cada nodo
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.appendChild(probe);
      fractions = pts.map((_, i) => {
        if (i === 0) return 0;
        probe.setAttribute("d", `${start} ${segs.slice(0, i).join(" ")}`);
        return probe.getTotalLength() / total;
      });
      probe.remove();
      draw.style.strokeDasharray = `${total}`;
    };

    const render = (p: number) => {
      draw.style.strokeDashoffset = `${total * (1 - p)}`;
      const pt = draw.getPointAtLength(total * p);
      const ahead = draw.getPointAtLength(Math.min(total, total * p + 1));
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      marker.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${p >= 1 ? 0 : angle})`);
      fractions.forEach((f, i) => {
        const on = p >= f - 0.005;
        nodes[i].dataset.active = on ? "true" : "false";
        cards[i].dataset.active = on ? "true" : "false";
      });
    };

    layout();
    const mm = gsap.matchMedia();
    const state = { p: 0 };

    mm.add(
      { reduce: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (ctx.conditions?.reduce) {
          render(1);
          return;
        }
        render(0);
        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => render(state.p),
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 62%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      },
    );

    const ro = new ResizeObserver(() => {
      layout();
      render(state.p || (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0));
      ScrollTrigger.refresh();
    });
    ro.observe(wrap);

    return () => {
      ro.disconnect();
      mm.revert();
    };
  };

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    // GSAP se carga bajo demanda para no inflar el JS inicial
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      cleanup = setup(gsap, ScrollTrigger);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);


  return (
    <section
      id={process.id}
      aria-labelledby="proceso-title"
      className="grain section-y relative overflow-hidden bg-[radial-gradient(90%_60%_at_50%_0%,var(--color-forest)_0%,var(--color-ink)_70%)] text-cream"
    >
      <div className="container-site relative z-10">
        <AnimatedSection className="max-w-[44rem]">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <RichTitle
            id="proceso-title"
            text={process.title}
            className="mt-5 text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)]"
            accentClassName="text-lime"
          />
        </AnimatedSection>

        <div ref={wrapRef} className="relative mt-16 md:mt-20">
          <svg ref={svgRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <path ref={baseRef} fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
            <path ref={drawRef} fill="none" stroke="var(--color-lime)" strokeWidth="2.5" strokeLinecap="round" />
            <g ref={markerRef}>
              <rect x="-11" y="-7" width="22" height="14" rx="3.5" fill="var(--color-lime)" />
              <path d="M-5 -7v14M0 -7v14M5 -7v14" stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.55" />
            </g>
          </svg>

          <ol className="relative grid gap-6 pl-14 md:pl-16 lg:grid-cols-3 lg:gap-x-[clamp(3.5rem,6vw,7rem)] lg:gap-y-24 lg:pl-0">
            {process.steps.map((s, i) => {
              // fila 2 en orden inverso en escritorio para formar la serpiente
              const lgPos = serpentine[i];
              return (
                <li key={s.n} data-step data-active="false" className={`group relative ${lgPos}`}>
                  <span
                    data-node
                    data-active="false"
                    aria-hidden
                    className="absolute -left-[2.4rem] top-7 h-4 w-4 rounded-full border-2 border-moss bg-ink transition-[background-color,border-color,box-shadow] duration-500 data-[active=true]:border-lime data-[active=true]:bg-lime data-[active=true]:shadow-[0_0_0_6px_rgb(201_242_107/0.15)] md:-left-[2.65rem] lg:left-7 lg:top-0 lg:-translate-y-1/2"
                  />
                  <div className="rounded-[var(--radius-card)] border border-moss/50 bg-forest/50 p-6 backdrop-blur-sm transition-[border-color,background-color,transform] duration-500 group-data-[active=true]:border-lime/35 group-data-[active=true]:bg-forest/80 md:p-7 lg:mt-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[2rem] font-medium leading-none tracking-[-0.04em] text-cream/30 transition-colors duration-500 group-data-[active=true]:text-lime">
                        {s.n}
                      </span>
                      <span className="rounded-full border border-moss px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-cream/70">
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[1.25rem] font-semibold leading-tight tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-2.5 text-[0.9688rem] leading-relaxed text-cream/70">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <AnimatedSection className="mt-16 flex justify-center md:mt-20">
          <PillButton href={process.cta.href} size="lg" location="proceso">
            {process.cta.label}
          </PillButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
