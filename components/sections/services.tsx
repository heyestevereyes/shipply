import Image from "next/image";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";
import { iconMap } from "@/components/ui/icons";
import { MiniDashboard } from "./mini-dashboard";

const card =
  "group relative flex flex-col rounded-[var(--radius-card)] border border-ink/[0.08] bg-paper p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[var(--shadow-lift)] md:p-7";

function Service({ item, delay }: { item: (typeof site.services.items)[number]; delay: number }) {
  const Icon = iconMap[item.icon];
  return (
    <AnimatedSection as="li" delay={delay} className={card}>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-soft text-moss transition-colors duration-500 group-hover:bg-lime group-hover:text-ink">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-10 text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-ink">{item.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite">{item.text}</p>
    </AnimatedSection>
  );
}

export function Services() {
  const { services } = site;
  const [s1, s2, s3, s4, s5, s6] = services.items;
  return (
    <section id={services.id} aria-labelledby="servicios-title" className="section-y on-light relative bg-cream">
      <div className="container-site">
        <AnimatedSection className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="light">{services.eyebrow}</Eyebrow>
            <RichTitle
              id="servicios-title"
              text={services.title}
              className="mt-5 max-w-[42rem] text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)] text-ink"
              accentClassName="text-moss"
            />
          </div>
        </AnimatedSection>

        <ul className="mt-14 grid auto-rows-[minmax(0,auto)] gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Card grande: seguimiento en tiempo real */}
          <AnimatedSection
            as="li"
            className="grain relative overflow-hidden rounded-[var(--radius-card-lg)] bg-ink p-6 text-cream shadow-[var(--shadow-lift)] md:col-span-2 md:p-8 lg:row-span-2"
          >
            <div aria-hidden className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-moss/60 blur-[90px]" />
            <div className="relative z-10 flex h-full flex-col">
              <span className="eyebrow text-lime">{services.featured.label}</span>
              <h3 className="mt-4 text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                {services.featured.title}
              </h3>
              <p className="mt-3 max-w-[28rem] text-[0.9688rem] leading-relaxed text-cream/70">{services.featured.text}</p>
              <div className="mt-8 lg:mt-auto lg:pt-8">
                <MiniDashboard />
              </div>
            </div>
          </AnimatedSection>

          <Service item={s1} delay={0.05} />
          <Service item={s2} delay={0.1} />
          <Service item={s3} delay={0.15} />
          <Service item={s4} delay={0.2} />
          <Service item={s5} delay={0.05} />
          <Service item={s6} delay={0.1} />

          <AnimatedSection
            as="li"
            delay={0.15}
            className="relative min-h-[14rem] overflow-hidden rounded-[var(--radius-card)] md:col-span-2"
          >
            <Image
              src={services.image.src}
              alt={services.image.alt}
              fill
              sizes="(min-width: 1024px) 46vw, (min-width: 768px) 92vw, 92vw"
              className="object-cover"
            />
          </AnimatedSection>
        </ul>
      </div>
    </section>
  );
}
