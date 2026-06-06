"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { usePersona } from "@/context/PersonaContext";

const products = [
  {
    id: "creator",
    name: "Creator\nFuel",
    tagline: "For the restless creative",
    desc: "Espresso-grade concentrate brewed for long sessions. Smooth, dark, relentless.",
    color: "#FF2D78",
    colorSoft: "rgba(255,45,120,0.18)",
    image: "/product-creator.jpeg",
    persona: "creator",
    ml: "200ml",
    cups: "~20 cups",
  },
  {
    id: "workflow",
    name: "Work\nFlow",
    tagline: "For the sharp professional",
    desc: "Clean, precise concentration. Every drop calibrated for deep focus.",
    color: "#00C4A0",
    colorSoft: "rgba(0,196,160,0.18)",
    image: "/product-workflow.jpeg",
    persona: "professional",
    ml: "200ml",
    cups: "~20 cups",
  },
  {
    id: "study",
    name: "Study\nFuel",
    tagline: "For the ambitious student",
    desc: "Bold and affordable. Pull an all-nighter without leaving your desk.",
    color: "#F56B00",
    colorSoft: "rgba(245,107,0,0.18)",
    image: "/product-study.jpeg",
    persona: "student",
    ml: "200ml",
    cups: "~20 cups",
  },
];

function ProductCard({
  product,
  active,
  index,
}: {
  product: (typeof products)[0];
  active: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [30, 70]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [30, 70]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal delay={index * 0.12} variant="slide-up">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[20px]"
        data-cursor-expand
      >
        {/* Card background */}
        <div
          className="absolute inset-0 rounded-[20px]"
          style={{ background: "#0C0C0C" }}
        />

        {/* Active persona ring */}
        {active && (
          <motion.div
            className="absolute inset-0 rounded-[20px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              boxShadow: `0 0 0 2px ${product.color}, 0 0 40px ${product.color}55`,
            }}
          />
        )}

        {/* Dynamic glow that follows mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 55% 50% at ${glowX}% ${glowY}%, ${product.colorSoft} 0%, transparent 70%)`,
          }}
        />

        {/* Static ambient glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[55%] w-[80%] -translate-x-1/2 blur-[60px]"
          style={{ background: `${product.color}28` }}
        />

        {/* Product image */}
        <div className="relative mx-auto mt-8 w-[78%] aspect-square">
          {/* Glow halo behind pouch */}
          <div
            className="absolute inset-[10%] -z-0 blur-[48px] transition-all duration-500 group-hover:blur-[64px] group-hover:opacity-80"
            style={{ background: `radial-gradient(ellipse at 50% 60%, ${product.color}70 0%, transparent 70%)`, opacity: 0.5 }}
          />
          <motion.div
            className="relative z-10 h-full w-full"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={product.image}
              alt={product.name.replace("\n", " ")}
              fill
              className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.8)]"
              style={{
                filter: `contrast(1.08) saturate(1.15) brightness(1.05) drop-shadow(0 0 32px ${product.color}60)`,
              }}
              sizes="(max-width: 768px) 70vw, 25vw"
            />
          </motion.div>
        </div>

        {/* Card copy */}
        <div className="relative z-10 flex flex-1 flex-col px-6 pb-7 pt-5">
          {/* Label */}
          <p
            className="label"
            style={{ color: product.color, opacity: 0.85 }}
          >
            {product.tagline}
          </p>

          {/* Product name */}
          <h3
            className="mt-2 whitespace-pre-line leading-none tracking-[-0.03em]"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 42px)",
              color: "#FFFFFF",
            }}
          >
            {product.name}
          </h3>

          <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
            {product.desc}
          </p>

          {/* Divider */}
          <div className="my-5 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{ background: `${product.color}22`, color: product.color }}
              >
                {product.ml}
              </span>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {product.cups}
              </span>
            </div>

            {/* CTA arrow */}
            <motion.button
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-[12px] font-semibold focusable"
              style={{ color: product.color }}
            >
              Notify me
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Products() {
  const { persona } = usePersona();

  return (
    <section id="products" className="section">
      <div className="container-x">
        {/* Heading */}
        <Reveal>
          <div className="mb-12 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label" style={{ color: "var(--theme-accent)" }}>The lineup</p>
              <h2
                className="mt-2 text-[36px] leading-none tracking-[-0.03em] md:text-[52px]"
                style={{
                  fontFamily: "var(--vibe-head-font)",
                  fontStyle: "var(--vibe-head-style)",
                  fontWeight: "var(--vibe-head-weight)",
                }}
              >
                Three blends.<br />One obsession.
              </h2>
            </div>
            <p className="max-w-[320px] text-[14px] leading-relaxed" style={{ color: "var(--theme-ink)", opacity: 0.55 }}>
              Each concentrate is tuned to a different kind of day — pick yours and pour.
            </p>
          </div>
        </Reveal>

        {/* Product grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              active={persona === p.persona}
              index={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-[12px]" style={{ color: "var(--theme-ink)", opacity: 0.35 }}>
            All blends · Coffee concentrate · 200ml · ~20 cups · Just pour & sip
          </p>
        </Reveal>
      </div>
    </section>
  );
}
