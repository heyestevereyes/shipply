/**
 * Palabra resaltada con bloque lima que se "pinta" de izquierda a derecha al cargar.
 * CSS puro (no espera a la hidratación): es el elemento LCP del hero.
 */
export function Highlight({ children }: { children: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap px-[0.12em] pb-[0.04em]">
      <span aria-hidden className="highlight-block absolute inset-x-0 bottom-[0.02em] top-[0.12em] origin-left rounded-[0.12em] bg-lime" />
      <em className="highlight-text relative font-serif font-normal italic" style={{ fontSize: "1.12em", letterSpacing: "-0.01em" }}>
        {children}
      </em>
    </span>
  );
}
