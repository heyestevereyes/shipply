import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { iconMap } from "@/components/ui/icons";

/** Logos genéricos de ejemplo (estilo logoipsum). Reemplazar solo por aliados reales confirmados. */
function LogoPlaceholder({ variant }: { variant: number }) {
  const marks = [
    <circle key="a" cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />,
    <path key="b" d="M3 19 12 4l9 15H3Z" fill="currentColor" />,
    <rect key="c" x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />,
    <path key="d" d="M4 12a8 8 0 0 1 16 0M4 12a8 8 0 0 0 16 0" fill="none" stroke="currentColor" strokeWidth="2.5" />,
    <path key="e" d="M3 6h18M3 12h12M3 18h18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />,
    <path key="f" d="M12 3 21 12 12 21 3 12Z" fill="none" stroke="currentColor" strokeWidth="2.5" />,
  ];
  return (
    <svg viewBox="0 0 120 24" className="h-6 w-auto md:h-7" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="24" height="24">
        {marks[variant % marks.length]}
      </svg>
      <text x="32" y="17.5" fontFamily="var(--font-geist-sans)" fontWeight="600" fontSize="16" letterSpacing="-0.5" fill="currentColor">
        logoipsum
      </text>
    </svg>
  );
}

export function Backing() {
  const { backing } = site;
  return (
    <section aria-labelledby="respaldo-title" className="section-y on-light bg-cream !pt-[clamp(3rem,2rem+3vw,5rem)]">
      <div className="container-site">
        <AnimatedSection className="text-center">
          <h3
            id="respaldo-title"
            className="mx-auto max-w-[44rem] text-[length:var(--text-h3)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink"
          >
            {backing.title}
          </h3>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <ul
            className="mt-12 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 text-stone/80 sm:grid-cols-3 lg:grid-cols-6"
            aria-label={backing.logosNote}
          >
            {Array.from({ length: backing.logoCount }).map((_, i) => (
              <li key={i} className="grayscale transition-colors duration-300 hover:text-ink">
                <LogoPlaceholder variant={i} />
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <ul className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {backing.guarantees.map((g, i) => {
            const Icon = iconMap[g.icon];
            return (
              <AnimatedSection
                as="li"
                key={g.title}
                delay={i * 0.07}
                className="flex items-start gap-4 rounded-[var(--radius-card)] border border-ink/[0.08] bg-paper p-6 shadow-[var(--shadow-soft)] md:flex-col lg:flex-row"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">{g.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-graphite">{g.text}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
