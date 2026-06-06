"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { DoodleIcon } from "@/components/Doodles";
import { steps } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";

export default function HowItWorks() {
  const { persona } = usePersona();

  /* Video ring / glow colour per persona */
  const accentColor =
    persona === "student"      ? "#F56B00"
    : persona === "creator"    ? "#FF2D78"
    : persona === "professional" ? "#00A896"
    : "var(--theme-accent)";

  const glowColor =
    persona === "student"      ? "rgba(245,107,0,0.28)"
    : persona === "creator"    ? "rgba(255,45,120,0.28)"
    : persona === "professional" ? "rgba(0,168,150,0.28)"
    : "rgba(200,118,30,0.22)";

  return (
    <section id="how" className="section overflow-hidden" style={{ background: "var(--theme-bg)" }}>
      <div className="container-x">

        {/* ── Section header ── */}
        <Reveal>
          <p className="label" style={{ color: accentColor }}>How it works</p>
          <h2
            className="mt-3 text-[38px] font-normal leading-[1.0] tracking-tight md:text-[58px]"
            style={{
              fontFamily: "var(--vibe-head-font)",
              fontStyle: "var(--vibe-head-style)",
              fontWeight: "var(--vibe-head-weight)",
              color: "var(--theme-ink)",
            }}
          >
            Pour. Add milk or water. Sip.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--theme-ink)", opacity: 0.55 }}>
            No grinder, no machine, no waiting. Good coffee shouldn&apos;t be complicated.
          </p>
        </Reveal>

        {/* ── Two-column: steps left, video right ── */}
        <div className="mt-14 grid items-center gap-10 md:grid-cols-[1fr_1.1fr] lg:gap-16">

          {/* Left — vertical steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.13} variant="slide-up">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-5 py-7"
                  style={{
                    borderBottom: i < steps.length - 1
                      ? "1px solid color-mix(in srgb, var(--theme-ink) 9%, transparent)"
                      : "none",
                  }}
                >
                  {/* Step number + connector line */}
                  <div className="flex flex-col items-center gap-0">
                    <div
                      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border"
                      style={{
                        borderColor: `${accentColor}40`,
                        background: `${accentColor}0D`,
                        color: accentColor,
                      }}
                    >
                      <DoodleIcon name={step.icon} className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col justify-center">
                    {/* Ghost number */}
                    <span
                      className="label mb-1"
                      style={{ color: accentColor, opacity: 0.45 }}
                    >{step.n}</span>
                    <h3
                      className="text-[20px] font-semibold leading-tight tracking-tight"
                      style={{ color: "var(--theme-ink)" }}
                    >{step.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--theme-ink)", opacity: 0.58 }}>
                      {step.copy}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Right — looping video */}
          <Reveal variant="slide-up" delay={0.18} className="relative flex items-center justify-center">
            <motion.div
              className="relative w-full overflow-hidden rounded-[28px]"
              style={{
                aspectRatio: "9/16",
                maxHeight: 560,
                background: "#0A0A0A",
                boxShadow: `0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px ${accentColor}25`,
              }}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ambient glow behind video */}
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 h-[50%] w-[80%] -translate-x-1/2 blur-[70px]"
                style={{ background: glowColor }}
              />

              <video
                src="/how-it-works.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="relative z-10 h-full w-full object-cover"
              />

              {/* Inset ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[28px]"
                style={{ boxShadow: `inset 0 0 0 1px ${accentColor}28` }}
              />
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
