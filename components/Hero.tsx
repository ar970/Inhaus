"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import InhausBottle from "@/components/InhausBottle";
import { Stars } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";
import { Arrow } from "@/components/Doodles";

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
      {/* Background glow — adapts per persona */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[70%] w-[55%] -translate-y-[10%] translate-x-[10%]"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 60% 40%, var(--theme-accent-soft) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />

      <div className="container-x grid min-h-[88vh] items-center gap-6 py-12 md:grid-cols-[1fr_0.9fr] md:gap-0 md:py-0">

        {/* ── Copy ─────────────────────────────────────────────── */}
        <Reveal className="order-2 md:order-1 md:py-20">
          <p className="label text-crema">{c.eyebrow}</p>

          <h1 className="display-serif mt-4 text-[52px] md:text-[88px] lg:text-[104px]">
            {headlineLines.map((line, i) => (
              <span key={i} className="block vibe-accent-word">{line}</span>
            ))}
          </h1>

          <p className="mt-6 max-w-[440px] text-[17px] leading-[1.65] text-espresso/72">{c.sub}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#products"
              className="group inline-flex items-center gap-2 rounded-pill bg-espresso px-7 py-3.5 text-[13px] font-semibold text-oat transition-all hover:-translate-y-0.5 hover:shadow-lift focusable"
            >
              {c.cta}
              <Arrow className="h-3.5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center gap-2 rounded-pill border border-espresso/20 px-7 py-3.5 text-[13px] font-semibold text-espresso/80 transition-all hover:border-espresso/50 hover:text-espresso focusable"
            >
              {c.ctaSecondary}
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Stars />
            <span className="text-sm text-espresso/55">Loved by 2,000+ home baristas</span>
          </div>

          {/* Quick facts — subtle, horizontal */}
          <div className="mt-8 flex flex-wrap gap-5 border-t border-espresso/10 pt-7">
            {["₹22 / cup", "20+ drinks", "60-sec brew", "No machine needed"].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crema" />
                <span className="label text-espresso/50">{f}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Bottle visual ──────────────────────────────────── */}
        <Reveal className="order-1 md:order-2" delay={0.12}>
          <div className="relative mx-auto flex max-w-[440px] items-center justify-center md:max-w-full md:py-12">
            {/* Warm glow behind bottle */}
            <div
              className="absolute inset-[10%] -z-10 blur-[60px]"
              style={{
                background: "radial-gradient(ellipse at 50% 55%, var(--theme-accent-soft) 0%, transparent 70%)",
                opacity: 0.9,
              }}
            />
            <InhausBottle className="relative z-10 w-full max-h-[600px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
