import { Quote as QuoteIcon, Star } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";

export function Testimonials() {
  const { testimonials } = site;
  return (
    <section aria-labelledby="clientes-title" className="on-light bg-cream pb-[clamp(3rem,2rem+3vw,5rem)]">
      <div className="container-site">
        <div className="grain relative overflow-hidden rounded-[clamp(24px,3vw,40px)] bg-forest px-5 py-14 text-cream sm:px-8 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div aria-hidden className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-moss/70 blur-[110px]" />
          <div aria-hidden className="absolute -bottom-40 right-0 h-[24rem] w-[24rem] rounded-full bg-lime/10 blur-[120px]" />

          <div className="relative z-10">
            <AnimatedSection className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow>{testimonials.eyebrow}</Eyebrow>
                <RichTitle
                  id="clientes-title"
                  text={testimonials.title}
                  className="mt-5 max-w-[34rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)]"
                  accentClassName="text-lime"
                />
              </div>
              <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2">
                <p className="font-mono text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-lime">
                  {testimonials.rating}
                  <span className="text-[0.5em] text-cream/70">{testimonials.ratingOutOf}</span>
                </p>
                <div>
                  <div className="flex gap-0.5 text-lime" role="img" aria-label="Calificación de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[0.875rem] text-cream/70">{testimonials.reviews}</p>
                </div>
              </div>
            </AnimatedSection>

            <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden">
              {testimonials.items.map((t, i) => (
                <AnimatedSection
                  as="li"
                  key={i}
                  delay={i * 0.08}
                  className={`group flex w-[85%] shrink-0 snap-center flex-col rounded-[var(--radius-card)] border border-moss/70 bg-ink/50 p-6 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-lime/40 sm:w-[70%] md:w-auto md:p-7 ${
                    i === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <figure className="flex h-full flex-col" data-placeholder={t.placeholder ? "true" : undefined}>
                    <QuoteIcon className="h-7 w-7 text-lime" aria-hidden />
                    <blockquote className="mt-5 text-[1.0625rem] leading-relaxed text-cream/90">
                      <p>“{t.quote}”</p>
                    </blockquote>
                    <span className="mb-6 mt-6 inline-flex w-fit rounded-full bg-lime px-3 py-1 text-[0.8125rem] font-semibold text-ink">
                      {t.chip}
                    </span>
                    <figcaption className="mt-auto flex items-center gap-3 border-t border-moss/60 pt-5">
                      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss font-mono text-xs text-lime">
                        {t.initials}
                      </span>
                      <span className="text-[0.875rem] leading-snug">
                        <span className="block font-semibold text-cream">{t.name}</span>
                        <span className="block text-cream/70">
                          {t.role}, {t.company}, {t.city}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
