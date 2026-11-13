import { site } from "@/content/site";
import { Wordmark } from "@/components/ui/wordmark";
import { SocialIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/contact";

export function Footer({ homePrefix = "" }: { homePrefix?: string }) {
  const { footer, nav, brand } = site;
  const heading = "font-mono text-[0.75rem] uppercase tracking-[0.14em] text-lime";
  const link = "text-[0.9375rem] text-cream/70 transition-colors hover:text-cream";

  return (
    <footer className="grain relative overflow-hidden bg-ink pb-28 pt-20 text-cream md:pb-12 md:pt-24">
      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-10">
          <div className="col-span-2 max-w-[22rem] md:col-span-4 lg:col-span-1">
            <a href={`${homePrefix}#inicio`} aria-label={`${brand.name}, ir al inicio`}>
              <Wordmark />
            </a>
            <p className="mt-5 text-[1rem] leading-relaxed text-cream/70">{brand.tagline}</p>
          </div>

          <nav aria-label={footer.columns.menu}>
            <p className={heading}>{footer.columns.menu}</p>
            <ul className="mt-5 grid gap-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={`${homePrefix}${l.href}`} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.columns.legal}>
            <p className={heading}>{footer.columns.legal}</p>
            <ul className="mt-5 grid gap-3">
              {footer.legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={heading}>{footer.columns.contact}</p>
            <ul className="mt-5 grid gap-3">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                  <WhatsAppIcon className="h-4 w-4" />
                  {footer.whatsapp}
                </a>
              </li>
              <li className="text-[0.9375rem] text-cream/70">{brand.email}</li>
              <li className="text-[0.9375rem] text-cream/70">{brand.city}</li>
            </ul>
          </div>

          <div>
            <p className={heading}>{footer.columns.social}</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {footer.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-moss text-cream/80 transition-colors hover:border-lime hover:text-lime"
                  >
                    <SocialIcon id={s.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-moss/60 pt-8 text-[0.8125rem] text-cream/70 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <p aria-hidden className="select-none font-serif text-[clamp(3rem,10vw,8rem)] italic leading-none tracking-[-0.02em] text-moss/60">
            {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
