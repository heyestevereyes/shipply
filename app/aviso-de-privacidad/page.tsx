import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { Wordmark } from "@/components/ui/wordmark";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad integral de Shipply conforme a la LFPDPPP.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: false, follow: true },
};

/**
 * BORRADOR PARA REVISIÓN LEGAL.
 * Texto base conforme a la Ley Federal de Protección de Datos Personales en Posesión
 * de los Particulares (LFPDPPP). Debe validarlo un abogado antes de publicarse.
 */
const sections: { id?: string; title: string; body: string[] }[] = [
  {
    title: "1. Identidad y domicilio del responsable",
    body: [
      "[Razón social completa] [confirmar] (en adelante, “Shipply”), con domicilio en [domicilio fiscal completo] [confirmar], es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, su Reglamento y los Lineamientos del Aviso de Privacidad.",
    ],
  },
  {
    title: "2. Datos personales que recabamos",
    body: [
      "Para las finalidades descritas en este aviso recabamos los siguientes datos: nombre, empresa, número de WhatsApp, correo electrónico, ciudad, así como información comercial sobre el producto que deseas importar, volumen estimado, presupuesto aproximado, experiencia previa en importación y fechas objetivo.",
      "También podemos obtener datos de navegación como fuente de la visita (parámetros UTM), página de referencia y fecha y hora de envío del formulario. No recabamos datos personales sensibles.",
    ],
  },
  {
    title: "3. Finalidades del tratamiento",
    body: [
      "Finalidades primarias (necesarias para la relación que solicitas): contactarte para atender tu solicitud de cotización; elaborar y enviarte una propuesta de importación; dar seguimiento comercial y operativo a tu proyecto; y cumplir obligaciones legales, fiscales y aduaneras aplicables.",
      "Finalidades secundarias (no necesarias): enviarte información comercial, contenidos y promociones relacionados con nuestros servicios, y realizar análisis estadísticos para mejorar nuestro sitio. Si no deseas que tus datos se traten para estas finalidades, puedes indicarlo en cualquier momento escribiendo a [correo de privacidad] [confirmar].",
    ],
  },
  {
    title: "4. Transferencias de datos",
    body: [
      "Para cumplir las finalidades primarias, tus datos podrán compartirse con proveedores que nos prestan servicios (por ejemplo, herramientas de gestión de clientes y comunicación), agentes aduanales, navieras e inspectores de calidad, únicamente en la medida necesaria para ejecutar el servicio contratado. Estas transferencias no requieren tu consentimiento conforme al artículo 37 de la LFPDPPP. No vendemos tus datos personales.",
    ],
  },
  {
    title: "5. Derechos ARCO y revocación del consentimiento",
    body: [
      "Tienes derecho a Acceder, Rectificar y Cancelar tus datos personales, así como a Oponerte a su tratamiento (derechos ARCO), y a revocar el consentimiento otorgado. Para ejercerlos, envía una solicitud a [correo de privacidad] [confirmar] indicando tu nombre, un medio para comunicarte la respuesta, copia de una identificación oficial, la descripción clara de los datos y el derecho que deseas ejercer.",
      "Responderemos en un plazo máximo de 20 días hábiles contados desde la recepción de tu solicitud, y en su caso la haremos efectiva dentro de los 15 días hábiles siguientes.",
    ],
  },
  {
    title: "6. Limitación del uso o divulgación",
    body: [
      "Puedes limitar el uso o divulgación de tus datos enviando tu solicitud al correo indicado. También puedes inscribirte en el Registro Público para Evitar Publicidad (REPEP) de la PROFECO.",
    ],
  },
  {
    title: "7. Cookies y tecnologías de rastreo",
    body: [
      "Nuestro sitio puede utilizar cookies y tecnologías similares (como Google Analytics y Meta Pixel) para medir visitas y mejorar la experiencia. Puedes deshabilitarlas desde la configuración de tu navegador.",
    ],
  },
  {
    title: "8. Cambios al aviso de privacidad",
    body: [
      "Este aviso puede modificarse. Cualquier cambio se publicará en esta misma página. Última actualización: [fecha] [confirmar].",
    ],
  },
  {
    id: "terminos",
    title: "Términos y condiciones",
    body: [
      "Los términos y condiciones del servicio se encuentran en elaboración y se publicarán en esta sección. [confirmar]",
    ],
  },
];

export default function AvisoPrivacidad() {
  return (
    <>
      <header className="bg-ink text-cream">
        <div className="container-site flex h-[4.5rem] items-center justify-between">
          <Link href="/" aria-label={`${site.brand.name}, ir al inicio`}>
            <Wordmark />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[0.9375rem] text-cream/75 hover:text-cream">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {site.legal.back}
          </Link>
        </div>
      </header>
      <main id="contenido" className="on-light bg-cream py-16 md:py-24">
        <article className="container-site max-w-[46rem]">
          <p className="eyebrow inline-flex rounded-full bg-lime-soft px-3 py-2 text-moss">Borrador para revisión legal</p>
          <h1 className="mt-6 text-[length:var(--text-h2)] font-semibold leading-[1.05] tracking-[var(--tracking-tight)] text-ink">
            Aviso de privacidad
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-graphite">
            En {site.brand.name} cuidamos tus datos personales. Este aviso explica qué datos recabamos, para qué los usamos y
            cómo puedes ejercer tus derechos.
          </p>
          <div className="mt-12 grid gap-10">
            {sections.map((s) => (
              <section key={s.title} id={s.id} className="scroll-mt-24">
                <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 text-[1rem] leading-relaxed text-graphite">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer homePrefix="/" />
    </>
  );
}
