import Image from "next/image";
import { site } from "@/content/site";
import { PillButton } from "@/components/ui/pill-button";
import { Highlight } from "@/components/ui/highlight";
import { Counter } from "@/components/ui/counter";
import { TrackingWidget } from "./tracking-widget";

const avatarTones = [
  "from-[#2d6a4f] to-[#1b4332]",
  "from-[#c9f26b] to-[#8fd04f]",
  "from-[#e6f8b8] to-[#b9d98a]",
  "from-[#1f5a3f] to-[#12382a]",
];
const avatarInitials = ["MR", "LC", "JA", "SP"];

export function Hero() {
  const { hero, metrics } = site;
  return (
    <section id="inicio" aria-labelledby="hero-title" className="grain bg-hero relative overflow-hidden text-cream">
      {/* foto del puerto, muy integrada al degradado */}
      <div aria-hidden className="absolute inset-0 -z-0">
        <Image
          src={hero.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.16] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_31_22/0.85)_0%,rgb(10_31_22/0.35)_45%,rgb(10_31_22/0.55)_100%)]" />
      </div>

      <div className="container-site relative z-10 pb-10 pt-32 md:pt-36 lg:pb-16 lg:pt-40">
        <div className="grid items-center gap-14 md:gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 xl:gap-16">
          <div className="max-w-[40rem] lg:max-w-none">
            <div className="rise">
              <p className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] py-1 pl-1 pr-3.5 text-[0.8125rem] text-cream/85 backdrop-blur">
                <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink">
                  {hero.chipTag}
                </span>
                {hero.chip}
              </p>
            </div>

            <div className="rise-soft" style={{ animationDelay: "0.13s" }}>
              <h1
                id="hero-title"
                className="mt-7 text-[length:clamp(2.5rem,1.5rem+3.6vw,5rem)] font-semibold leading-[1.02] tracking-[var(--tracking-tightest)]"
              >
                <span className="block">{hero.titleLead}</span>
                <span className="mt-[0.06em] block">
                  <Highlight>{hero.titleAccent}</Highlight>
                </span>
              </h1>
            </div>

            <div className="rise-soft" style={{ animationDelay: "0.21s" }}>
              <p className="mt-7 max-w-[34rem] text-[length:var(--text-lead)] leading-relaxed text-cream/75">
                {hero.subtitle}
              </p>
            </div>

            <div className="rise" style={{ animationDelay: "0.29s" }}>
              <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
                <PillButton href={hero.primary.href} size="lg" location="hero">
                  {hero.primary.label}
                </PillButton>
                <PillButton href={hero.secondary.href} size="lg" variant="outline-dark" location="hero" arrow={false}>
                  {hero.secondary.label}
                </PillButton>
              </div>
            </div>

            <div className="rise" style={{ animationDelay: "0.37s" }}>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {avatarInitials.map((ini, i) => (
                    <span
                      key={ini}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-gradient-to-br font-mono text-[0.6875rem] font-semibold ${avatarTones[i]} ${
                        i === 1 || i === 2 ? "text-ink" : "text-cream"
                      }`}
                    >
                      {ini}
                    </span>
                  ))}
                </div>
                <p className="max-w-[16rem] text-[0.875rem] leading-snug text-cream/75">{hero.social}</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center md:px-10 lg:justify-end lg:px-0">
            <div className="rise w-full max-w-[26rem]" style={{ animationDelay: "0.25s" }}>
              <TrackingWidget />
            </div>
          </div>
        </div>

        {/* Franja de métricas */}
        <dl className="relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-moss/50 bg-moss/40 md:mt-24 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse bg-ink/70 px-5 py-6 backdrop-blur-sm sm:px-7 sm:py-8">
              <dt className="mt-3 text-[0.875rem] leading-snug text-cream/70">{m.label}</dt>
              <dd className="font-mono text-[clamp(1.625rem,1rem+2.4vw,3rem)] whitespace-nowrap font-medium leading-none tracking-[-0.04em] text-lime">
                <Counter value={m.value} display={m.display} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
