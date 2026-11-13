import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";
import { iconMap } from "@/components/ui/icons";

export function Problem() {
  const { problem } = site;
  return (
    <section aria-labelledby="problema-title" className="section-y on-light relative bg-cream">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow tone="light">{problem.eyebrow}</Eyebrow>
            <RichTitle
              id="problema-title"
              text={problem.title}
              className="mt-5 max-w-[32rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)] text-ink"
              accentClassName="text-moss"
            />
          </AnimatedSection>

          <ul className="grid gap-4 sm:grid-cols-2 md:gap-5">
            {problem.items.map((it, i) => {
              const Icon = iconMap[it.icon];
              return (
                <AnimatedSection
                  as="li"
                  key={it.title}
                  delay={i * 0.07}
                  className="group relative rounded-[var(--radius-card)] border border-ink/[0.08] bg-paper p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[var(--shadow-lift)] md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-lime">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-graphite">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-[1.1875rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite">{it.text}</p>
                </AnimatedSection>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
