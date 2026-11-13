"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { PillButton } from "@/components/ui/pill-button";
import { trackCta } from "@/lib/analytics";
import { Wordmark } from "@/components/ui/wordmark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { nav } = site;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueo de scroll, Escape y trampa de foco en el menú móvil
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const focusables = () =>
      (toggle ? [toggle as HTMLElement] : []).concat(Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid
          ? "border-b border-moss/40 bg-ink/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#inicio" className="relative z-10 text-cream" aria-label={`${site.brand.name}, ir al inicio`}>
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[0.9375rem] text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <span className="hidden xl:contents">
            <PillButton
              href={nav.secondary.href}
              variant="outline-dark"
              location="navbar"
              arrow={false}
              className="!h-10 !px-5 !text-sm"
            >
              {nav.secondary.label}
            </PillButton>
          </span>
          <span className="hidden md:contents">
            <PillButton href={nav.primary.href} location="navbar" className="!h-10 !px-5 !text-sm">
              {nav.primary.label}
            </PillButton>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-lime hover:text-lime lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="menu-movil"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="grain bg-hero fixed inset-0 top-0 flex h-[100dvh] flex-col px-[clamp(1.25rem,0.6rem+3vw,3rem)] pb-10 pt-28 lg:hidden"
          >
            <ul className="relative z-10 flex flex-col gap-1">
              {nav.links.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2 text-[clamp(2.25rem,8vw,3.5rem)] font-semibold tracking-[-0.03em] text-cream"
                  >
                    <span className="font-mono text-sm font-normal tracking-normal text-lime">0{i + 1}</span>
                    <span className="transition-colors group-hover:text-lime">{l.label}</span>
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="relative z-10 mt-auto flex flex-col gap-3 sm:flex-row">
              <a
                href={nav.primary.href}
                onClick={() => {
                  trackCta("menu_movil", nav.primary.label);
                  setOpen(false);
                }}
                className="inline-flex h-14 items-center justify-center rounded-full bg-lime px-7 font-medium text-ink"
              >
                {nav.primary.label}
              </a>
              <a
                href={nav.secondary.href}
                onClick={() => {
                  trackCta("menu_movil", nav.secondary.label);
                  setOpen(false);
                }}
                className="inline-flex h-14 items-center justify-center rounded-full border border-cream/30 px-7 font-medium text-cream"
              >
                {nav.secondary.label}
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
