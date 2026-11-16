"use client";

import Image from "next/image";
import { Images, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/content/catalogs/types";
import { formatMXN } from "@/lib/catalogs";

type Props = { product: Product; priority?: boolean; delay?: number; onOpen: () => void };

/** Card de producto estilo ecommerce. Al hacer clic abre el lightbox. */
export function ProductCard({ product, priority, delay = 0, onOpen }: Props) {
  const [first, second] = product.images;
  // La segunda foto solo se descarga cuando alguien pasa el cursor o enfoca la card.
  const [peek, setPeek] = useState(false);

  return (
    <li className="rise" style={{ animationDelay: `${delay}ms` }}>
      <button
        type="button"
        onClick={onOpen}
        onPointerEnter={() => setPeek(true)}
        onFocus={() => setPeek(true)}
        aria-haspopup="dialog"
        className="on-light group block w-full rounded-[var(--radius-card)] text-left outline-offset-4"
      >
        <span className="relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-forest shadow-[var(--shadow-soft)] ring-1 ring-ink/5 transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]">
          <Image
            src={first.src}
            alt={first.alt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
            quality={75}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {second && peek ? (
            <Image
              src={second.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
              quality={75}
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          ) : null}

          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink">
              {product.badge}
            </span>
          ) : null}

          {product.images.length > 1 ? (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-cream backdrop-blur">
              <Images className="h-3.5 w-3.5" aria-hidden />
              {product.images.length}
            </span>
          ) : null}

          <span
            aria-hidden
            className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-soft transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            <Plus className="h-5 w-5" />
          </span>
        </span>

        <span className="mt-4 block">
          <span className="eyebrow block text-[0.6875rem] text-graphite">{product.type}</span>
          <span className="mt-2 block text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em]">{product.name}</span>
          <span className="mt-1 hidden text-[0.9375rem] leading-snug text-graphite sm:block">{product.summary}</span>
          <span className="mt-3 flex items-baseline gap-2">
            <span className="text-[1.25rem] font-semibold tracking-[-0.03em] tabular-nums">{formatMXN(product.price)}</span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-graphite">MXN</span>
          </span>
          {product.minOrder ? <span className="mt-1 block text-[0.8125rem] text-graphite">Mín. {product.minOrder} piezas</span> : <span className="mt-1 block text-[0.8125rem] text-graphite">Más IVA</span>}
        </span>
      </button>
    </li>
  );
}
