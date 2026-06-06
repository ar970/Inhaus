"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { usePersona } from "@/context/PersonaContext";

const products = {
  creator: {
    id: "creator",
    name: "Creator\nFuel",
    tagline: "For the restless creative",
    desc: "Espresso-grade concentrate brewed for long sessions. Smooth, dark, relentless. Pour it. Feel it. Make something.",
    color: "#FF2D78",
    colorSoft: "rgba(255,45,120,0.18)",
    image: "/product-creator.jpeg",
    ml: "200ml",
    cups: "~20 cups",
  },
  professional: {
    id: "workflow",
    name: "Work\nFlow",
    tagline: "For the sharp professional",
    desc: "Clean, precise concentration. Every drop calibrated for deep focus and long output. No noise. Just results.",
    color: "#00C4A0",
    colorSoft: "rgba(0,196,160,0.18)",
    image: "/product-workflow.jpeg",
    ml: "200ml",
    cups: "~20 cups",
  },
  student: {
    id: "study",
    name: "Study\nFuel",
    tagline: "For the ambitious student",
    desc: "Bold and affordable. Pull an all-nighter without leaving your desk. Every sip buys you another hour.",
    color: "#F56B00",
    colorSoft: "rgba(245,107,0,0.18)",
    image: "/product-study.jpeg",
    ml: "200ml",
    cups: "~20 cups",
  },
};

function ProductShowcase({ product }: { product: (typeof products)[keyof typeof products] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [30, 70]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [30, 70]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_1fr] lg:gap-20"
    >
      {/* ── Pouch visual ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
        className="group relative flex items-center justify-center"
        data-cursor-expand
      >
        {/* Dark stage */}
        <div
          className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[28px] md:h-[520px]"
          style={{ background: "#0A0A0A" }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-[60%] w-[90%] -translate-x-1/2 blur-[80px]"
            style={{ background: `${product.color}35` }}
          />

          {/* Mouse-tracked glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(ellipse 60% 55% at ${glowX}% ${glowY}%, ${product.colorSoft} 0%, transparent 70%)`,
            }}
          />

          {/* Colored ring */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{ boxShadow: `inset 0 0 0 1px ${product.color}30` }}
          />

          {/* Pouch image */}
          <motion.div
            className="relative z-10 h-[85%] w-[70%]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.04 }}
          >
            <Image
              src={product.image}
              alt={product.name.replace("\n", " ")}
              fill
              className="object-contain"
              style={{
                filter: `contrast(1.1) saturate(1.2) brightness(1.05) drop-shadow(0 32px 64px rgba(0,0,0,0.9)) drop-shadow(0 0 40px ${product.color}55)`,
              }}
              sizes="(max-width: 768px) 80vw, 40vw"
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Copy ── */}
      <div className="flex flex-col">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="label"
          style={{ color: product.color }}
        >
          {product.tagline}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 whitespace-pre-line leading-none tracking-[-0.03em]"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--theme-ink)",
          }}
        >
          {product.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[380px] text-[16px] leading-[1.7]"
          style={{ color: "var(--theme-ink)", opacity: 0.65 }}
        >
          {product.desc}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex gap-6 border-t pt-8"
          style={{ borderColor: "color-mix(in srgb, var(--theme-ink) 10%, transparent)" }}
        >
          {[
            { label: "Volume", value: product.ml },
            { label: "Yield", value: product.cups },
            { label: "Brew time", value: "60 sec" },
            { label: "Machine", value: "None" },
          ].map((s) => (
            <div key={s.label}>
              <p className="label" style={{ color: "var(--theme-ink)", opacity: 0.38 }}>{s.label}</p>
              <p className="mt-1 text-[18px] font-semibold tracking-tight" style={{ color: "var(--theme-ink)" }}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <motion.a
            href="#join"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold text-white transition-shadow focusable"
            style={{ background: product.color, boxShadow: `0 8px 30px ${product.color}55` }}
          >
            Get notified
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.a>

          <span
            className="rounded-full border px-4 py-3 text-[11px] font-semibold uppercase tracking-widest"
            style={{
              borderColor: `${product.color}40`,
              color: product.color,
              background: `${product.color}0D`,
            }}
          >
            Coming soon
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { persona } = usePersona();
  const product = persona ? products[persona] : null;

  return (
    <section id="products" className="section">
      <div className="container-x">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="label" style={{ color: "var(--theme-accent)" }}>The product</p>
            <h2
              className="mt-2 text-[36px] leading-none tracking-[-0.03em] md:text-[50px]"
              style={{
                fontFamily: "var(--vibe-head-font)",
                fontStyle: "var(--vibe-head-style)",
                fontWeight: "var(--vibe-head-weight)",
              }}
            >
              Made for you.
            </h2>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {product ? (
            <ProductShowcase key={product.id} product={product} />
          ) : (
            <motion.p
              key="no-persona"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-[15px]"
              style={{ color: "var(--theme-ink)", opacity: 0.4 }}
            >
              Select your persona above to see your blend.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
