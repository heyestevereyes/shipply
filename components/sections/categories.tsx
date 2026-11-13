import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";

export function Categories() {
  const { categories } = site;
  const loop = [...categories.items, ...categories.items];

  return (
    <section aria-labelledby="categorias-title" className="on-light relative overflow-hidden bg-cream pb-[clamp(4.5rem,3rem+6vw,9rem)]">
      <div className="container-site">
        <div className="h-px bg-ink/10" />
        <AnimatedSection className="pt-[clamp(4rem,2.5rem+5vw,7.5rem)] text-center">
          <Eyebrow tone="light">{categories.eyebrow}</Eyebrow>
          <RichTitle
            id="categorias-title"
            text={categories.title}
            className="mx-auto mt-5 max-w-[40rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)] text-ink"
            accentClassName="text-moss"
          />
        </AnimatedSection>
      </div>

      {/* Marquee infinito y lento; pausa al hover/foco */}
      <div className="marquee-pause group/marquee relative mt-14 md:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream to-transparent md:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream to-transparent md:w-32"
        />
        <ul
          className="marquee-track flex w-max animate-marquee gap-4 md:gap-5"
          style={{ ["--marquee-duration" as string]: "70s" }}
        >
          {loop.map((c, i) => (
            <li
              key={`${c.id}-${i}`}
              aria-hidden={i >= categories.items.length ? true : undefined}
              className="group w-[13.5rem] shrink-0 md:w-[16rem] lg:w-[17.5rem]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-paper">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 256px, 216px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-3.5 flex items-center justify-between px-1 text-[1rem] font-medium tracking-[-0.01em] text-ink">
                {c.label}
                <span className="font-mono text-xs text-graphite">{String((i % categories.items.length) + 1).padStart(2, "0")}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <AnimatedSection className="container-site mt-12 text-center">
        <p className="text-[1.0625rem] text-graphite">
          {categories.footer}{" "}
          <a
            href={categories.footerLink.href}
            className="group inline-flex items-center gap-1 font-medium text-ink underline decoration-lime decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-moss"
          >
            {categories.footerLink.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </p>
      </AnimatedSection>
    </section>
  );
}
