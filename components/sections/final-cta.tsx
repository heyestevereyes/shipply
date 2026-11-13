import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { RichTitle } from "@/components/ui/rich-title";
import { PillButton } from "@/components/ui/pill-button";
import { Diagonals } from "@/components/ui/diagonals";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/contact";

export function FinalCta() {
  const { finalCta } = site;
  return (
    <section aria-labelledby="cta-final-title" className="on-light bg-cream pb-[clamp(3rem,2rem+3vw,5rem)]">
      <div className="container-site">
        <div className="bg-final relative overflow-hidden rounded-[clamp(24px,3vw,40px)] px-6 py-20 text-center text-ink md:px-16 md:py-28 lg:py-32">
          <Diagonals variant="cta" className="hidden xl:block" />
          <AnimatedSection className="relative z-10 mx-auto max-w-[46rem]">
            <RichTitle
              id="cta-final-title"
              text={finalCta.title}
              className="text-[length:var(--text-h2)] font-semibold leading-[1.02] tracking-[var(--tracking-tight)]"
              accentClassName="text-forest"
            />
            <p className="mx-auto mt-6 max-w-[32rem] text-[length:var(--text-lead)] leading-relaxed text-ink/80">{finalCta.subtitle}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <PillButton href={finalCta.primary.href} variant="ink" size="lg" location="cta_final">
                {finalCta.primary.label}
              </PillButton>
              <PillButton
                href={whatsappUrl()}
                external
                variant="outline-light"
                size="lg"
                icon={<WhatsAppIcon />}
                arrow={false}
                location="cta_final_whatsapp"
                className="!border-ink/40"
              >
                {finalCta.whatsapp}
              </PillButton>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
