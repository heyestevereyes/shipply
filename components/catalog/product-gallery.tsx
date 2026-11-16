"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CatalogImage } from "@/content/catalogs/types";

type Props = { images: CatalogImage[]; className?: string };

/**
 * Galería del lightbox. El carrusel es scroll horizontal con scroll-snap:
 * en móvil se desliza con el dedo, en escritorio con flechas, miniaturas o teclado.
 */
export function ProductGallery({ images, className = "" }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [index, setIndex] = useState(0);
  const last = images.length - 1;

  const goTo = useCallback(
    (i: number) => {
      const el = scroller.current;
      if (!el) return;
      const next = Math.max(0, Math.min(last, i));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    },
    [last],
  );

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = scroller.current;
      if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
    });
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-paper/90 text-ink shadow-soft backdrop-blur transition-[opacity,transform,background-color] hover:bg-paper active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:grid";

  return (
    <div className={`flex min-h-0 flex-col bg-cream ${className}`}>
      <div className="relative min-h-0 flex-1">
        <div
          ref={scroller}
          onScroll={onScroll}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Fotos del producto"
          className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="relative aspect-[4/5] w-full shrink-0 snap-center md:aspect-auto md:h-full"
              role="group"
              aria-roledescription="foto"
              aria-label={`${i + 1} de ${images.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 52vw, 100vw"
                quality={80}
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 ? (
          <>
            <button type="button" aria-label="Foto anterior" disabled={index === 0} onClick={() => goTo(index - 1)} className={`${arrow} left-4`}>
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button type="button" aria-label="Foto siguiente" disabled={index === last} onClick={() => goTo(index + 1)} className={`${arrow} right-4`}>
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <p className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.1em] text-cream backdrop-blur" aria-hidden>
              {index + 1} / {images.length}
            </p>
            <span className="sr-only" aria-live="polite">
              Foto {index + 1} de {images.length}
            </span>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex shrink-0 justify-center gap-2 overflow-x-auto bg-paper p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-paper transition-[box-shadow,opacity] ${
                i === index ? "opacity-100 ring-moss" : "opacity-60 ring-transparent hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="56px" quality={70} className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
