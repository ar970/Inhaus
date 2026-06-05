"use client";

import Button from "@/components/ui/Button";
import Sticker from "@/components/Sticker";
import Reveal from "@/components/Reveal";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import { Stars, Steam, Bean, Cup } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const defaultContent = {
  eyebrow: "Speciality coffee concentrate",
  headline: "Café coffee,\nin seconds.",
  sub: "Pour, add milk or water, and sip. Café-grade coffee at home — no machine, no mess.",
  cta: "Explore",
  ctaSecondary: "How it works",
};

export default function Hero() {
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].hero : defaultContent;
  const headlineLines = c.headline.split("\n");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-10 py-14 md:grid-cols-2 md:gap-8 md:py-20">
        {/* Copy */}
        <Reveal className="order-2 md:order-1">
          <p className="label text-clay">{c.eyebrow}</p>
          <h1 className="mt-4 font-serif text-[44px] font-normal leading-[0.95] tracking-tight md:text-[80px]">
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg text-espresso/80">{c.sub}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#products" withArrow>{c.cta}</Button>
            <Button href="#how" variant="secondary">{c.ctaSecondary}</Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Stars />
            <span className="text-sm text-espresso/70">Loved by 2,000+ home baristas</span>
          </div>
        </Reveal>

        {/* Visual */}
        <Reveal className="order-1 md:order-2" delay={0.1}>
          <div className="relative mx-auto flex max-w-md items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-[36px] shadow-soft"
              style={{ background: "radial-gradient(120% 120% at 50% 15%, var(--theme-surface) 0%, var(--theme-accent-soft) 70%, var(--theme-accent-soft) 100%)" }}
            />

            <Steam className="absolute left-[15%] top-6 h-12 w-9 text-clay/60" />
            <Bean className="absolute right-[13%] top-12 h-9 w-9 -rotate-12 text-espresso/45" />
            <Cup className="absolute bottom-10 left-7 h-12 w-12 text-espresso/50" />

            <ProductPlaceholder className="relative z-10 py-10" />

            <Sticker className="absolute -left-2 top-12" rotate={-8} tone="crema">3-sec stir</Sticker>
            <Sticker className="absolute -right-1 top-28" rotate={7}>No machine</Sticker>
            <Sticker className="absolute bottom-10 right-1" rotate={-5} tone="sage">No sugar</Sticker>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
