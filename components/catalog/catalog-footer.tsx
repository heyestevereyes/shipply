import type { Catalog } from "@/content/catalogs/types";
import { Wordmark } from "@/components/ui/wordmark";
import { PillButton } from "@/components/ui/pill-button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/contact";

export function CatalogFooter({ catalog }: { catalog: Catalog }) {
  return (
    <footer className="grain relative overflow-hidden bg-ink py-16 text-cream md:py-20">
      <div className="container-site relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[28rem]">
          <Wordmark className="text-cream" />
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-cream/75">
            ¿No ves el modelo que buscas? Lo conseguimos. Cuéntanos qué necesitas y en qué volumen.
          </p>
          <p className="mt-5 text-[0.8125rem] leading-relaxed text-cream/55">{catalog.priceNote}</p>
        </div>
        <PillButton
          href={whatsappUrl(`Hola, vi el catálogo de ${catalog.topic} y busco un modelo que no encontré.`)}
          external
          arrow={false}
          size="lg"
          icon={<WhatsAppIcon className="h-full w-full" />}
          location="catalogo_footer"
        >
          Hablar por WhatsApp
        </PillButton>
      </div>
    </footer>
  );
}
