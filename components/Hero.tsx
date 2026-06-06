"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import InhausBottle from "@/components/InhausBottle";
import { Stars, Arrow } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const defaultContent = {
  eyebrow: "Speciality coffee concentrate",
  headline: "Café coffee,\nin seconds.",
  sub: "Pour, add milk or water, and sip. Café-grade coffee at home — no machine, no mess.",
  cta: "Explore",
  ctaSecondary: "How it works",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const itemFast = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].hero : defaultContent;
  const headlineLines = c.headline.split("\n");
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bottleY     = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden">
      {/* Ambient glow behind bottle */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-[80%] w-[55%]"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 65% 35%, var(--theme-accent-soft) 0%, transparent 70%)",
          opacity: 0.65,
          y: reduce ? 0 : useTransform(scrollYProgress, [0, 1], [0, 40]),
        }}
      />

      <div className="container-x grid min-h-[90vh] items-center gap-6 py-12 md:grid-cols-[1fr_0.88fr] md:gap-0 md:py-0">

        {/* ── Copy ── */}
        <motion.div
          className="order-2 md:order-1 md:py-20"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="label text-crema">
            {c.eyebrow}
          </motion.p>

          <h1
            className="mt-4 font-serif text-[52px] leading-none tracking-tight md:text-[88px] lg:text-[104px]"
            style={{ fontFamily: "var(--vibe-head-font)", fontStyle: "var(--vibe-head-style)", fontWeight: "var(--vibe-head-weight)" }}
          >
            {headlineLines.map((line, i) => (
              <motion.span key={i} variants={item} className="block vibe-accent-word overflow-hidden">
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-6 max-w-[440px] text-[17px] leading-[1.65] text-espresso/72">
            {c.sub}
          </motion.p>

          <motion.div variants={itemFast} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-espresso px-7 py-3.5 text-[13px] font-semibold text-oat transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focusable"
            >
              <span className="relative z-10 flex items-center gap-2">
                {c.cta}
                <Arrow className="h-3.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>

            <Link
              href="#how"
              className="inline-flex items-center gap-2 rounded-pill border border-espresso/20 px-7 py-3.5 text-[13px] font-semibold text-espresso/80 transition-all duration-300 hover:border-espresso/50 hover:bg-espresso/4 hover:text-espresso focusable"
            >
              {c.ctaSecondary}
            </Link>
          </motion.div>

          <motion.div variants={itemFast} className="mt-7 flex items-center gap-3">
            <Stars />
            <span className="text-sm text-espresso/50">Loved by 2,000+ home baristas</span>
          </motion.div>

          <motion.div variants={itemFast} className="mt-7 flex flex-wrap gap-2 border-t border-espresso/10 pt-6">
            {["₹22 / cup", "20+ drinks", "60-sec brew", "No machine"].map((f) => (
              <span
                key={f}
                className="vibe-shape border border-espresso/12 px-3.5 py-1.5 text-[12px] font-medium text-espresso/55 transition-colors duration-200 hover:border-espresso/30 hover:text-espresso/80"
                style={{ background: "color-mix(in srgb, var(--theme-ink) 4%, transparent)" }}
              >
                {f}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bottle — scroll parallax ── */}
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1,   filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative mx-auto flex max-w-[440px] items-center justify-center md:max-w-full md:py-12"
            style={{ y: reduce ? 0 : bottleY, scale: reduce ? 1 : bottleScale }}
          >
            {/* Warm glow halo */}
            <motion.div
              className="absolute inset-[15%] -z-10 blur-[70px]"
              style={{ background: "radial-gradient(ellipse at 50% 60%, var(--theme-accent-soft) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <InhausBottle className="relative z-10 w-full max-h-[620px]" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
