import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogs, getCatalog } from "@/lib/catalogs";
import { CatalogHeader } from "@/components/catalog/catalog-header";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { CatalogFooter } from "@/components/catalog/catalog-footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalogs.map((c) => ({ slug: c.slug }));
}

/**
 * Los catálogos son enlaces privados para compartir: noindex, sin canonical y fuera de sitemap y robots.txt.
 * La imagen Open Graph es la que se ve al pegar el enlace en WhatsApp.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCatalog(slug);
  if (!catalog) return { robots: { index: false, follow: false } };
  return {
    title: catalog.metaTitle,
    description: catalog.description,
    robots: { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: "es_MX",
      title: catalog.metaTitle,
      description: catalog.description,
      images: [{ url: catalog.cover, width: 1200, height: 630, alt: catalog.metaTitle }],
    },
    twitter: { card: "summary_large_image", title: catalog.metaTitle, description: catalog.description, images: [catalog.cover] },
  };
}

export default async function CatalogPage({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalog(slug);
  if (!catalog) notFound();

  return (
    <div className="catalog-root">
      <CatalogHeader catalog={catalog} />
      <main id="contenido">
        <CatalogBrowser catalog={catalog} />
      </main>
      <CatalogFooter catalog={catalog} />
    </div>
  );
}
