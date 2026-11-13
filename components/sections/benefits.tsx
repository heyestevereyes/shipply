import Image from "next/image";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";

export function Benefits() {
  const { benefits } = site;
  return (
    <section aria-labelledby="beneficios-title" className="on-light relative bg-cream pb-[clamp(4.5rem,3rem+6vw,9rem)]">
      <div className="container-site">
        <div className="h-px bg-ink/10" />
        <AnimatedSection className="pt-[clamp(4rem,2.5rem+5vw,7.5rem)] text-center">
          <Eyebrow tone="light">{benefits.eyebrow}</Eyebrow>
          <RichTitle
            id="beneficios-title"
            text={benefits.title}
            className="mx-auto mt-5 max-w-[46rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)] text-ink"
            accentClassName="text-moss"
          />
        </AnimatedSection>

        <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {benefits.items.map((b, i) => (
            <AnimatedSection
              as="li"
              key={b.title}
              delay={i * 0.08}
              className={`group overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/[0.08] bg-paper shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] ${
                i === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 2 ? "aspect-[4/3] md:aspect-[21/9] lg:aspect-[4/3]" : "aspect-[4/3]"}`}>
                <Image
                  src={b.image}
                  alt={b.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-lime backdrop-blur">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-[1.3125rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{b.title}</h3>
                <p className="mt-3 text-[0.9688rem] leading-relaxed text-graphite">{b.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
