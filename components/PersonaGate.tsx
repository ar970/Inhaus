"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaContent, personaThemes, gateCards, type Persona } from "@/lib/personas";

function GatePanel({ id, onSelect, index }: { id: Persona; onSelect: (p: Persona) => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  const theme = personaThemes[id];
  const content = personaContent[id];
  const num = id === "student" ? "01" : id === "creator" ? "02" : "03";

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      /* Desktop: expand on hover; Mobile: no flex animation */
      whileHover={{ flex: 1.8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative flex flex-1 flex-col items-start justify-end overflow-hidden focusable
        /* mobile: full row card */
        border-b last:border-b-0 px-6 py-7
        /* desktop: tall column panel */
        md:border-b-0 md:border-r md:last:border-r-0 md:px-10 md:pb-16 md:pt-24"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        minHeight: 0,
        background: hovered
          ? `linear-gradient(160deg, color-mix(in srgb, ${theme.gateHover} 28%, #080510) 0%, ${theme.gateHover} 100%)`
          : "rgba(255,255,255,0.02)",
        transition: "background 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Big faint number — desktop only */}
      <div
        className="pointer-events-none absolute right-5 top-4 select-none font-serif font-light leading-none opacity-[0.07]
          text-[80px] md:text-[180px] md:right-6 md:top-6"
        style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: theme.gateHover }}
        aria-hidden="true"
      >
        {num}
      </div>

      {/* Mobile: horizontal layout; Desktop: vertical */}
      <div className="flex w-full items-center gap-4 md:block">
        {/* Accent dot */}
        <div
          className="h-3 w-3 shrink-0 rounded-full transition-all duration-500 md:mb-6"
          style={{
            background: theme.gateHover,
            opacity: hovered ? 1 : 0.45,
            boxShadow: hovered ? `0 0 20px ${theme.gateHover}` : "none",
          }}
        />

        <div className="flex-1 md:block">
          {/* I AM A label */}
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 md:text-[10px] md:tracking-[0.3em]">
            I am a
          </p>

          {/* Persona name */}
          <h2
            className="mt-1 font-serif leading-none tracking-tight text-white/90
              text-[32px] md:text-[52px] md:mt-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.88)",
            }}
          >
            {content.label}
          </h2>
        </div>

        {/* Tagline — inline on mobile */}
        <p
          className="hidden text-sm leading-snug transition-all duration-300 md:block md:mt-3 md:max-w-[200px]"
          style={{ color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.28)" }}
        >
          {content.gateDescription}
        </p>

        {/* Mobile: short tagline */}
        <p
          className="text-[12px] leading-snug text-white/40 md:hidden"
          style={{ maxWidth: 120 }}
        >
          {content.gateDescription}
        </p>

        {/* Arrow — mobile always visible, desktop hover */}
        <div className="flex shrink-0 items-center gap-1 md:mt-6 md:gap-2"
          style={{
            opacity: hovered ? 1 : 0.45,
            transition: "opacity 0.3s, transform 0.3s",
            transform: hovered ? "translateX(0)" : "translateX(-4px)",
          }}>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke={theme.gateHover}
            strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M12 6l4 4-4 4" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

export default function PersonaGate() {
  const { persona, setPersona } = usePersona();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);

  if (persona) return null;

  function handleSelect(p: Persona) {
    setSelectedColor(personaThemes[p].gateHover);
    setExiting(true);
    setTimeout(() => setPersona(p), 750);
  }

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
          style={{ background: "#080510" }}
          exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } }}
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between px-6 py-5 md:px-12 md:py-6">
            <span
              className="font-serif text-[18px] tracking-tight text-white/70 md:text-[20px]"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              INHAUS
            </span>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 md:block">
              Choose your world
            </p>
          </div>

          {/* Headline */}
          <motion.div
            className="shrink-0 px-6 pb-5 pt-1 md:px-12 md:pb-8 md:pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-serif font-light italic leading-none tracking-tight text-white/90
                text-[42px] md:text-[80px]"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Who are you?
            </h1>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/25 md:mt-3 md:text-[11px] md:tracking-[0.25em]">
              INHAUS brews differently for each of us
            </p>
          </motion.div>

          {/* Panels — vertical on mobile, horizontal on desktop */}
          <motion.div
            className="flex min-h-0 flex-1 flex-col border-t md:flex-row"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {gateCards.map(({ id }, i) => (
              <GatePanel key={id} id={id} onSelect={handleSelect} index={i} />
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="exit-flash"
          className="fixed inset-0 z-[9999]"
          style={{ background: selectedColor ?? "#080510" }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        />
      )}
    </AnimatePresence>
  );
}
