"use client";

import Button from "@/components/ui/Button";
import Sticker from "@/components/Sticker";
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
          <div className="relative mx-auto flex max-w-[360px] items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-[36px] shadow-soft"
              style={{ background: "radial-gradient(130% 120% at 50% 10%, var(--theme-surface) 0%, var(--theme-accent-soft) 65%, var(--theme-accent-soft) 100%)" }}
            />

            <Steam className="absolute left-[10%] top-4 h-10 w-8 text-clay/50" />
            <Bean className="absolute right-[8%] top-8 h-8 w-8 -rotate-12 text-espresso/30" />

            <InhausBottle className="relative z-10 px-4 py-8 w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
