/** Wordmark provisional en texto hasta tener el logo final. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[1.375rem] font-semibold tracking-[-0.04em] ${className}`}>
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect width="28" height="28" rx="9" fill="var(--color-lime)" />
        <path
          d="M7 18.5c3.5 0 4-9 7-9s3.5 9 7 9"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="21" cy="18.5" r="2.2" fill="var(--color-ink)" />
      </svg>
      Shipply
    </span>
  );
}
