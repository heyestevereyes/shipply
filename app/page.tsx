import { site } from "@/content/site";
import { siteUrl } from "@/lib/contact";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Benefits } from "@/components/sections/benefits";
import { Audience } from "@/components/sections/audience";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Categories } from "@/components/sections/categories";
import { Testimonials } from "@/components/sections/testimonials";
import { Backing } from "@/components/sections/backing";
import { Plans } from "@/components/sections/plans";
import { Quote } from "@/components/sections/quote";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Floating } from "@/components/sections/floating";
import { HashScroll } from "@/components/hash-scroll";

/** Quita marcas internas como [confirmar] del texto que se expone a buscadores. */
const clean = (s: string) => s.replace(/\s*\[[^\]]*\]/g, "").trim();

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: site.brand.description,
    areaServed: { "@type": "Country", name: "México" },
    knowsLanguage: "es-MX",
    sameAs: site.footer.socials.map((s) => s.href).filter((h) => h.startsWith("http")),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: clean(f.a) },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Problem />
        <Benefits />
        <Audience />
        <Process />
        <Services />
        <Categories />
        <Testimonials />
        <Backing />
        <Plans />
        <Quote />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Floating />
      <HashScroll />
    </>
  );
}
