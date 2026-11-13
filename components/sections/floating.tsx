"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { trackCta } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/contact";

/** Barra fija inferior con CTA en móvil (después del hero) + botón flotante de WhatsApp. */
export function Floating() {
  const [pastHero, setPastHero] = useState(false);
  const [atQuote, setAtQuote] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const quote = document.getElementById("cotizar");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) setPastHero(!e.isIntersecting);
          if (e.target === quote) setAtQuote(e.isIntersecting);
        });
      },
      { threshold: 0 },
    );
    if (hero) io.observe(hero);
    if (quote) io.observe(quote);
    return () => io.disconnect();
  }, []);

  const showBar = pastHero && !atQuote;

  return (
    <>
      <AnimatePresence>
        {showBar ? (
          <m.div
            key="bar"
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "110%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-moss/50 bg-ink/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center gap-3">
              <a
                href="#cotizar"
                onClick={() => trackCta("barra_movil", site.nav.mobileCta)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-lime font-medium text-ink"
              >
                {site.nav.mobileCta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={site.whatsappFab}
                onClick={() => trackCta("barra_movil_whatsapp", "WhatsApp")}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      {/* Botón flotante de WhatsApp (tablet y escritorio; en móvil vive en la barra inferior) */}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={site.whatsappFab}
        onClick={() => trackCta("whatsapp_flotante", "WhatsApp")}
        className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_14px_30px_-8px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:scale-105 md:flex"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#128C7E]/40 [animation-duration:2.6s]" aria-hidden />
        <WhatsAppIcon className="relative h-7 w-7" />
        <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[0.8125rem] font-medium text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {site.whatsappFab}
        </span>
      </a>
    </>
  );
}
