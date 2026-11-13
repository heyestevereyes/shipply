import Image from "next/image";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";

export function Audience() {
  const { audience } = site;
  return (
    <section aria-labelledby="audiencia-title" className="grain section-y relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-moss/40 blur-[120px]"
      />
      <div className="container-site relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <AnimatedSection>
            <Eyebrow>{audience.eyebrow}</Eyebrow>
            <RichTitle
              id="audiencia-title"
              text={audience.title}
              className="mt-5 max-w-[36rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)]"
              accentClassName="text-lime"
            />
          </AnimatedSection>
        </div>

        <ul className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-3 lg:gap-6">
          {audience.items.map((a, i) => (
            <AnimatedSection
              as="li"
              key={a.title}
              delay={i * 0.08}
              className="group relative flex flex-col rounded-[var(--radius-card-lg)] border border-moss/60 bg-forest/60 p-6 transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1.5 hover:border-lime/50 hover:bg-forest md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-x-8 md:p-7 lg:flex lg:p-7"
            >
              <div className="flex items-center gap-4 md:row-span-2 md:flex-col md:items-start lg:row-span-1 lg:flex-row lg:items-center">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-moss ring-offset-4 ring-offset-forest transition-[box-shadow] duration-500 group-hover:ring-lime md:h-28 md:w-28 lg:h-24 lg:w-24">
                  <Image src={a.image} alt={a.alt} fill sizes="96px" className="object-cover" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-lime">{audience.profileLabel} 0{i + 1}</span>
              </div>
              <h3 className="mt-7 text-[1.3125rem] md:mt-0 md:self-end lg:mt-7 lg:self-auto font-semibold leading-tight tracking-[-0.02em]">{a.title}</h3>
              <p className="mt-3 text-[0.9688rem] leading-relaxed text-cream/70 md:self-start lg:self-auto">{a.text}</p>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
