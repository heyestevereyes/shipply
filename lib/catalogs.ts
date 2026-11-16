import type { Catalog, Product } from "@/content/catalogs/types";
import { arbolesDeNavidad } from "@/content/catalogs/arboles-de-navidad";

/**
 * Registro de catálogos. Para agregar uno nuevo: crea su archivo en content/catalogs/
 * y súmalo aquí. Cada catálogo vive en /catalogo/<slug>. No se enlazan desde la landing,
 * no se listan en el sitemap ni en robots.txt y se marcan noindex: son enlaces para compartir.
 */
export const catalogs: Catalog[] = [arbolesDeNavidad];

export const getCatalog = (slug: string) => catalogs.find((c) => c.slug === slug);

const mxn = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
export const formatMXN = (n: number) => mxn.format(n);

/** Etiquetas de rango para la tabla de precios por volumen: "6 a 23 pzas", "60 o más". */
export function tierLabel(tiers: NonNullable<Product["tiers"]>, i: number) {
  const t = tiers[i];
  const next = tiers[i + 1];
  return next ? `${t.min} a ${next.min - 1} pzas` : `${t.min} o más pzas`;
}
