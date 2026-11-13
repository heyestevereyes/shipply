"use client";

import { useEffect } from "react";

/**
 * Al entrar con un ancla en la URL (ej. anuncios que apuntan a /#cotizar),
 * asegura que la vista llegue a la sección una vez que la página hidrató.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    const raf = requestAnimationFrame(go);
    // segundo intento por si cargó contenido diferido (fuentes, formulario)
    const t = window.setTimeout(go, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);
  return null;
}
