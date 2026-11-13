import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/contact";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.brand.name}`,
  },
  description: site.seo.description,
  applicationName: site.brand.name,
  alternates: { canonical: "/" },
  keywords: [
    "importar productos de Asia",
    "importación a la medida",
    "importación desde pedidos pequeños",
    "importación por contenedor",
    "importar de Asia a México",
    "importación B2B",
    "agente de compras en Asia",
    "consolidado LCL",
    "contenedor completo FCL",
    "despacho aduanal México",
    "inspección de calidad",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: site.brand.name,
    title: site.seo.ogTitle,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.ogTitle,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1f16",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>
        <a
          href="#contenido"
          className="sr-only z-[100] rounded-full bg-lime px-5 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
