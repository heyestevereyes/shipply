import type { Catalog } from "@/content/catalogs/types";
import { Wordmark } from "@/components/ui/wordmark";
import { RichTitle, Eyebrow } from "@/components/ui/rich-title";
import { PillButton } from "@/components/ui/pill-button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { formatMXN } from "@/lib/catalogs";
import { whatsappUrl } from "@/lib/contact";

/** Barra superior + encabezado del catálogo. Sin enlaces hacia la landing: el catálogo es un enlace aparte. */
export function CatalogHeader({ catalog }: { catalog: Catalog }) {
  const prices = catalog.products.map((p) => p.price);
  const facts = [
    { k: "Modelos", v: String(catalog.products.length) },
    { k: "Desde", v: `${formatMXN(Math.min(...prices))} MXN` },
    { k: "Precios", v: "Más IVA" },
  ];

  return (
    <header className="bg-hero grain relative overflow-hidden text-cream">
      {catalog.sample ? (
        <p className="relative z-10 bg-lime px-4 py-2 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink">
          Catálogo de muestra: los modelos y precios son ejemplos
        </p>
      ) : null}

      <div className="container-site relative z-10 flex items-center justify-between py-5 md:py-6">
        <Wordmark className="text-cream" />
        <PillButton
          href={whatsappUrl(`Hola, vi el catálogo de ${catalog.topic} y quiero cotizar.`)}
          external
          arrow={false}
          icon={<WhatsAppIcon className="h-full w-full" />}
          location="catalogo_header"
        >
          Cotizar
        </PillButton>
      </div>

      <div className="container-site relative z-10 pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="rise">
          <Eyebrow>{catalog.eyebrow}</Eyebrow>
          <RichTitle
            as="h1"
            text={catalog.title}
            accentClassName="text-lime"
            className="mt-6 max-w-[16ch] text-[clamp(2.75rem,1.5rem+4.6vw,5.5rem)] font-semibold leading-[0.98] tracking-[var(--tracking-tightest)]"
          />
          <p className="mt-6 max-w-[38rem] text-[length:var(--text-lead)] leading-relaxed text-cream/75">{catalog.intro}</p>
        </div>

        <dl className="rise mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-moss/60 pt-6" style={{ animationDelay: "0.12s" }}>
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-lime">{f.k}</dt>
              <dd className="mt-1.5 text-[1.25rem] font-semibold tracking-[-0.02em] tabular-nums">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
