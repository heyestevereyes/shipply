/** Formas diagonales lima (referencias ForYou y blueprint). Usar con moderación. */
export function Diagonals({ variant = "plans", className = "" }: { variant?: "plans" | "cta"; className?: string }) {
  if (variant === "cta") {
    return (
      <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M-5 0 L 22 0 L 6 100 L -5 100 Z" fill="var(--color-ink)" opacity="0.92" />
        <path d="M22 0 L 27 0 L 11 100 L 6 100 Z" fill="var(--color-moss)" />
        <path d="M105 0 L 86 0 L 98 100 L 105 100 Z" fill="var(--color-ink)" opacity="0.92" />
        <path d="M86 0 L 82 0 L 94 100 L 98 100 Z" fill="var(--color-moss)" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M-10 62 L 110 34 L 110 46 L -10 76 Z" fill="var(--color-lime)" />
      <path d="M-10 80 L 110 52 L 110 55 L -10 83 Z" fill="var(--color-lime)" opacity="0.55" />
    </svg>
  );
}
