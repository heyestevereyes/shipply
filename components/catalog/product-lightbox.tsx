"use client";

import { Check, ChevronLeft, ChevronRight, Link2, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Catalog, Product } from "@/content/catalogs/types";
import { PillButton } from "@/components/ui/pill-button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { formatMXN, tierLabel } from "@/lib/catalogs";
import { whatsappUrl } from "@/lib/contact";
import { track } from "@/lib/analytics";

type Props = {
  catalog: Catalog;
  product: Product;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (dir: -1 | 1) => void;
};

const CLOSE_MS = 180;
const noopSubscribe = () => () => {};
const pageBase = () => window.location.origin + window.location.pathname;

/** Lightbox del producto sobre <dialog> nativo: foco atrapado, Esc y fondo inerte sin código extra. */
export function ProductLightbox({ catalog, product, position, total, onClose, onStep }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<number>(0);
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const base = useSyncExternalStore(noopSubscribe, pageBase, () => "");
  const link = base ? `${base}#${product.id}` : "";

  useEffect(() => {
    const d = dialog.current;
    if (d && !d.open) d.showModal();
    return () => {
      window.clearTimeout(timer.current);
      if (d?.open) d.close();
    };
  }, []);

  useEffect(() => {
    track("catalog_product_open", { catalog: catalog.slug, product: product.id });
  }, [catalog.slug, product.id]);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    timer.current = window.setTimeout(onClose, CLOSE_MS);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* sin permiso de portapapeles: no hacemos nada */
    }
  };

  const message =
    `Hola, me interesa el modelo "${product.name}" del catálogo de ${catalog.topic}. Quisiera cotizar ___ piezas.` +
    (link ? ` ${link}` : "");

  const iconBtn =
    "grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-paper text-ink transition-colors hover:bg-cream disabled:opacity-40";

  const cta = (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      <PillButton
        href={whatsappUrl(message)}
        external
        arrow={false}
        icon={<WhatsAppIcon className="h-full w-full" />}
        location="catalogo_producto"
        className="w-full sm:w-auto"
      >
        Cotizar este modelo
      </PillButton>
      <button
        type="button"
        onClick={copyLink}
        className="on-light inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-5 text-[0.9375rem] font-medium transition-colors hover:border-ink hover:bg-ink/[0.04]"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        {copied ? "Enlace copiado" : "Copiar enlace"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Enlace copiado" : ""}
      </span>
    </div>
  );

  return (
    <dialog
      ref={dialog}
      aria-labelledby="producto-titulo"
      data-closing={closing}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      className="catalog-dialog on-light fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
    >
      <div
        className="flex h-full items-end justify-center md:items-center md:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) requestClose();
        }}
      >
        <div className="catalog-panel relative flex h-[100dvh] w-full flex-col overflow-hidden bg-paper shadow-[var(--shadow-deep)] md:h-[min(46rem,calc(100dvh-3rem))] md:max-w-[72rem] md:rounded-[var(--radius-card-lg)]">
          <button
            type="button"
            onClick={requestClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full bg-ink text-cream shadow-soft transition-transform hover:scale-105 active:scale-95 md:right-4 md:top-4"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain md:flex-row md:overflow-hidden">
            <ProductGallery key={product.id} images={product.images} className="md:w-[54%] md:shrink-0" />

            <div className="flex flex-col md:min-h-0 md:flex-1 md:overflow-y-auto md:overscroll-contain">
              <div className="flex-1 p-5 pb-8 sm:p-7 md:p-9">
                <div className="flex items-center justify-between gap-3 md:pr-12">
                  <p className="eyebrow text-moss">{product.type}</p>
                  {total > 1 ? (
                    <div className="flex items-center gap-1.5" role="group" aria-label="Cambiar de modelo">
                      <button type="button" className={iconBtn} aria-label="Modelo anterior" onClick={() => onStep(-1)}>
                        <ChevronLeft className="h-4 w-4" aria-hidden />
                      </button>
                      <span className="min-w-[3.25rem] text-center font-mono text-[0.75rem] tracking-[0.08em] text-graphite" aria-live="polite">
                        {position} / {total}
                      </span>
                      <button type="button" className={iconBtn} aria-label="Modelo siguiente" onClick={() => onStep(1)}>
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  ) : null}
                </div>

                <h2
                  id="producto-titulo"
                  className="mt-4 text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[var(--tracking-tight)]"
                >
                  {product.name}
                </h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-graphite">{product.summary}</p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">{formatMXN(product.price)}</p>
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-graphite">MXN por pieza</p>
                </div>
                <p className="mt-2 text-[0.9375rem] text-graphite">{product.minOrder ? `Pedido mínimo: ${product.minOrder} piezas` : "Más IVA"}</p>

                {product.tiers && product.tiers.length > 1 ? (
                  <div className="mt-6 rounded-2xl border border-ink/10 bg-cream/60 p-4">
                    <p className="eyebrow text-graphite">Precio por volumen</p>
                    <ul className="mt-3 grid gap-2">
                      {product.tiers.map((t, i) => (
                        <li key={t.min} className="flex items-baseline justify-between gap-3 text-[0.9375rem]">
                          <span className="text-graphite">{tierLabel(product.tiers!, i)}</span>
                          <span className="font-semibold tabular-nums">{formatMXN(t.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="mt-7 text-[1rem] leading-relaxed">{product.description}</p>

                <dl className="mt-7 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {product.specs.map((s) => (
                    <div key={s.label} className="border-t border-ink/10 py-3">
                      <dt className="eyebrow text-graphite">{s.label}</dt>
                      <dd className="mt-1.5 text-[0.9375rem] font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 text-[0.8125rem] leading-relaxed text-graphite">{catalog.priceNote}</p>
              </div>

              <div className="sticky bottom-0 hidden border-t border-ink/10 bg-paper/95 p-5 backdrop-blur md:block md:px-9">{cta}</div>
            </div>
          </div>

          <div className="shrink-0 border-t border-ink/10 bg-paper p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">{cta}</div>
        </div>
      </div>
    </dialog>
  );
}
