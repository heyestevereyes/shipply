export type CatalogImage = { src: string; alt: string };

/** Precio por volumen: desde `min` piezas el precio por pieza es `price`. */
export type PriceTier = { min: number; price: number };

export type ProductSpec = { label: string; value: string };

export type Product = {
  /** slug único dentro del catálogo; también se usa como #hash para compartir un producto */
  id: string;
  name: string;
  /** grupo para los filtros (Clásico, Nevado, etc.) */
  type: string;
  /** una línea para la card */
  summary: string;
  /** precio por pieza en MXN (primer escalón) */
  price: number;
  /** pedido mínimo en piezas */
  minOrder?: number;
  tiers?: PriceTier[];
  badge?: string;
  /** images[0] es el thumbnail de la card; el resto solo se ve en el lightbox */
  images: CatalogImage[];
  description: string;
  specs: ProductSpec[];
};

export type Catalog = {
  /** parte final de la URL: /catalogo/<slug> */
  slug: string;
  /** true mientras los modelos y precios sean de muestra: muestra un aviso en la página */
  sample: boolean;
  eyebrow: string;
  /** *texto* entre asteriscos se renderiza como acento serif itálica */
  title: string;
  /** cómo se nombra el catálogo en mensajes: "árboles de Navidad" */
  topic: string;
  metaTitle: string;
  description: string;
  intro: string;
  /** imagen para la vista previa al compartir el enlace (1200x630) */
  cover: string;
  priceNote: string;
  products: Product[];
};
