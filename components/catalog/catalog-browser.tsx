"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Catalog } from "@/content/catalogs/types";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductLightbox } from "@/components/catalog/product-lightbox";

type Sort = "featured" | "price-asc" | "price-desc";

const hashId = () => decodeURIComponent(window.location.hash.slice(1));

/**
 * Listado filtrable + lightbox. El producto abierto vive en el #hash de la URL:
 * así se puede compartir el enlace directo a un modelo y el botón Atrás cierra el lightbox.
 */
export function CatalogBrowser({ catalog }: { catalog: Catalog }) {
  const types = useMemo(() => Array.from(new Set(catalog.products.map((p) => p.type))), [catalog.products]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [activeId, setActiveId] = useState<string | null>(null);
  const pushed = useRef(false);

  const visible = useMemo(() => {
    const list = filter === "all" ? catalog.products : catalog.products.filter((p) => p.type === filter);
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [catalog.products, filter, sort]);

  useEffect(() => {
    const sync = () => {
      const id = hashId();
      setActiveId(catalog.products.some((p) => p.id === id) ? id : null);
    };
    const raf = requestAnimationFrame(sync); // enlace directo a un producto
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [catalog.products]);

  const open = useCallback((id: string) => {
    pushed.current = true;
    window.location.hash = id;
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
    } else {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      setActiveId(null);
    }
  }, []);

  // El lightbox navega sobre la lista visible; si el producto del enlace no está en ella, sobre el catálogo completo.
  const list = activeId && !visible.some((p) => p.id === activeId) ? catalog.products : visible;
  const index = activeId ? list.findIndex((p) => p.id === activeId) : -1;
  const product = index >= 0 ? list[index] : null;

  const step = (dir: -1 | 1) => {
    const next = list[(index + dir + list.length) % list.length];
    window.history.replaceState(window.history.state, "", `#${next.id}`);
    setActiveId(next.id);
  };

  const chip = (active: boolean) =>
    `on-light shrink-0 rounded-full border px-4 py-2 text-[0.9375rem] font-medium transition-colors ${
      active ? "border-ink bg-ink text-cream" : "border-ink/15 bg-paper text-ink hover:border-ink/50"
    }`;

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
        <div className="container-site flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-4">
          <div role="group" aria-label="Filtrar por tipo" className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={chip(filter === "all")}>
              Todos <span className="ml-1 opacity-60">{catalog.products.length}</span>
            </button>
            {types.map((t) => (
              <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)} className={chip(filter === t)}>
                {t} <span className="ml-1 opacity-60">{catalog.products.filter((p) => p.type === t).length}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p className="text-[0.9375rem] text-graphite" aria-live="polite">
              {visible.length} {visible.length === 1 ? "modelo" : "modelos"}
            </p>
            <label className="relative">
              <span className="sr-only">Ordenar por</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="on-light h-10 appearance-none rounded-full border border-ink/15 bg-paper pl-4 pr-10 text-[0.9375rem] font-medium text-ink"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden />
            </label>
          </div>
        </div>
      </div>

      <div className="container-site section-y !pt-10 md:!pt-14">
        <ul key={`${filter}-${sort}`} className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} delay={Math.min(i, 8) * 55} onOpen={() => open(p.id)} />
          ))}
        </ul>
      </div>

      {product ? (
        <ProductLightbox
          key="lightbox"
          catalog={catalog}
          product={product}
          position={index + 1}
          total={list.length}
          onClose={close}
          onStep={step}
        />
      ) : null}
    </>
  );
}
