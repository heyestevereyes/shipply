import { CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Eyebrow, RichTitle } from "@/components/ui/rich-title";
import { iconMap, WhatsAppIcon } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/pill-button";
import { bookingUrl, whatsappUrl } from "@/lib/contact";
import { QuoteFormLazy } from "./quote-form-lazy";

export function Quote() {
  const { quote } = site;
  return (
    <section
      id={quote.id}
      aria-labelledby="cotizar-title"
      className="grain section-y relative overflow-hidden bg-[radial-gradient(80%_60%_at_100%_0%,var(--color-moss)_0%,transparent_60%),radial-gradient(70%_60%_at_0%_100%,var(--color-forest)_0%,var(--color-ink)_70%)] text-cream"
    >
      <div className="container-site relative z-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-16 lg:gap-y-10 xl:gap-x-24">
        <AnimatedSection className="lg:col-start-1 lg:row-start-1">
          <Eyebrow>{quote.eyebrow}</Eyebrow>
          <RichTitle
            id="cotizar-title"
            text={quote.title}
            className="mt-5 text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)]"
            accentClassName="text-lime"
          />
          <p className="mt-6 max-w-[30rem] text-[length:var(--text-lead)] leading-relaxed text-cream/75">{quote.subtitle}</p>
        </AnimatedSection>

        <AnimatedSection className="lg:col-start-2 lg:row-span-2 lg:row-start-1" y={40}>
          <QuoteFormLazy />
        </AnimatedSection>

        <AnimatedSection className="lg:col-start-1 lg:row-start-2 lg:self-start" delay={0.1}>
          <ul className="grid gap-4">
            {quote.trust.map((t) => {
              const Icon = iconMap[t.icon];
              return (
                <li key={t.text} className="flex items-start gap-3.5 text-[1rem] leading-relaxed text-cream/85">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {t.text}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-[var(--radius-card)] border border-moss/60 bg-forest/60 p-6 backdrop-blur-sm">
            <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">{quote.talk.title}</p>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-cream/70">{quote.talk.text}</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <PillButton href={whatsappUrl()} external icon={<WhatsAppIcon />} location="cotizador_whatsapp" arrow={false}>
                {quote.talk.whatsapp}
              </PillButton>
              <PillButton
                href={bookingUrl || whatsappUrl()}
                external
                variant="outline-dark"
                icon={<CalendarDays aria-hidden />}
                location="cotizador_agenda"
                arrow={false}
              >
                {quote.talk.booking}
              </PillButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
