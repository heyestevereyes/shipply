import { Check } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";
import { PillButton } from "@/components/ui/pill-button";
import { Diagonals } from "@/components/ui/diagonals";

export function Plans() {
  const { plans } = site;
  return (
    <section id={plans.id} aria-labelledby="modelos-title" className="section-y on-light relative overflow-hidden bg-cream">
      <Diagonals className="top-[18%] h-[82%]" />
      <div className="container-site relative z-10">
        <AnimatedSection className="text-center">
          <Eyebrow tone="light">{plans.eyebrow}</Eyebrow>
          <RichTitle
            id="modelos-title"
            text={plans.title}
            className="mx-auto mt-5 max-w-[40rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)] text-ink"
            accentClassName="text-moss"
          />
        </AnimatedSection>

        <ul className="mx-auto mt-14 grid max-w-[34rem] items-center gap-5 md:mt-16 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {plans.items.map((p, i) => {
            const dark = p.featured;
            return (
              <AnimatedSection
                as="li"
                key={p.id}
                delay={i * 0.08}
                className={`relative flex h-full flex-col rounded-[var(--radius-card-lg)] p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 md:p-8 lg:p-6 xl:p-8 ${
                  dark
                    ? "grain order-first bg-ink text-cream shadow-[var(--shadow-deep)] md:col-span-2 lg:order-none lg:col-span-1 lg:-my-6 lg:py-12"
                    : "border border-ink/[0.08] bg-paper text-ink shadow-[var(--shadow-lift)]"
                }`}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex flex-wrap-reverse items-start justify-between gap-3">
                    <h3 className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">{p.name}</h3>
                    {"badge" in p && p.badge ? (
                      <span className="shrink-0 rounded-full bg-lime px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink">
                        ★ {p.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className={`mt-3 text-[0.9688rem] leading-relaxed ${dark ? "text-cream/70" : "text-graphite"}`}>{p.description}</p>

                  <div className={`mt-7 border-y py-5 ${dark ? "border-moss/70" : "border-ink/10"}`}>
                    <p className={`font-mono text-[0.75rem] uppercase tracking-[0.12em] ${dark ? "text-cream/70" : "text-graphite"}`}>
                      {p.priceLabel}
                    </p>
                    <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
                      <span
                        className={`text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] ${
                          dark ? "text-lime" : "text-ink"
                        }`}
                      >
                        {p.price}
                      </span>
                      {p.priceNote ? (
                        <span className={`font-mono text-[0.75rem] ${dark ? "text-cream/70" : "text-graphite"}`}>{p.priceNote}</span>
                      ) : null}
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-3 text-[0.9375rem]">
                    {plans.features.map((feat, fi) => {
                      const has = (p.includes as readonly number[]).includes(fi);
                      return (
                        <li key={feat} className="flex items-center gap-3">
                          {has ? (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                            </span>
                          ) : (
                            <span
                              className={`h-5 w-5 shrink-0 rounded-full border-[1.5px] border-dashed ${dark ? "border-cream/40" : "border-ink/30"}`}
                              aria-hidden
                            />
                          )}
                          <span className={has ? "" : dark ? "text-cream/55 line-through decoration-cream/30" : "text-graphite/80 line-through decoration-ink/20"}>
                            {feat}
                          </span>
                          <span className="sr-only">{has ? plans.included : plans.notIncluded}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-auto pt-8">
                    <PillButton
                      href={p.cta.href}
                      variant={dark ? "lime" : "ink"}
                      location={`modelos_${p.id}`}
                      className="w-full"
                    >
                      {p.cta.label}
                    </PillButton>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
