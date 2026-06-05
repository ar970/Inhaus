"use client";

import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import InhausBottle from "@/components/InhausBottle";
import { Stars, Steam, Bean } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const defaultContent = {
  eyebrow: "Speciality coffee concentrate",
  headline: "Café coffee,\nin seconds.",
  sub: "Pour, add milk or water, and sip. Café-grade coffee at home — no machine, no mess.",
  cta: "Explore",
  ctaSecondary: "How it works",
};

const chips = ["₹22 / cup", "20+ drinks", "60-sec brew", "No machine"];

export default function Hero() {
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].hero : defaultContent;
  const label = persona ? personaContent[persona].label : null;
  const tagline = persona ? personaContent[persona].tagline : "Café coffee, in seconds.";
  const headlineLines = c.headline.split("\n");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-8 py-10 md:grid-cols-[1.04fr_0.96fr] md:gap-4 md:py-14">
        {/* Copy */}
        <Reveal className="order-2 md:order-1">
          {label && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-pill border border-espresso/15 bg-paper px-3.5 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--theme-accent)" }} />
              <span className="label text-espresso/65">{label} · {tagline}</span>
            </div>
          )}

          <p className="label text-clay">{c.eyebrow}</p>
          <h1
            className="mt-3 font-serif text-[46px] tracking-tight md:text-[84px]"
            style={{ lineHeight: "var(--vibe-head-line)" }}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className={i === headlineLines.length - 1 ? "vibe-accent-word" : undefined}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-espresso/80">{c.sub}</p>

          {/* Quick-fact chips — fills the dead space, adds substance */}
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="vibe-shape border border-espresso/12 bg-paper px-3.5 py-1.5 text-sm font-medium text-espresso/75"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="#products" withArrow>{c.cta}</Button>
            <Button href="#how" variant="secondary">{c.ctaSecondary}</Button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Stars />
            <span className="text-sm text-espresso/65">Loved by 2,000+ home baristas</span>
          </div>
        </Reveal>

        {/* Visual */}
        <Reveal className="order-1 md:order-2" delay={0.1}>
          <div className="relative mx-auto flex max-w-[380px] items-center justify-center">
            <div
              className="absolute inset-0 -z-10 vibe-shape shadow-soft"
              style={{ background: "radial-gradient(130% 120% at 50% 8%, var(--theme-surface) 0%, var(--theme-accent-soft) 60%, var(--theme-accent-soft) 100%)" }}
            />
            <Steam className="absolute left-[9%] top-3 h-10 w-8 text-clay/50" />
            <Bean className="absolute right-[7%] top-7 h-8 w-8 -rotate-12 text-espresso/30" />
            <InhausBottle className="relative z-10 w-full px-3 py-6" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
