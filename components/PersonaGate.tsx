"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaContent, personaThemes, gateCards, type Persona } from "@/lib/personas";

function GatePanel({ id, onSelect }: { id: Persona; onSelect: (p: Persona) => void }) {
  const [hovered, setHovered] = useState(false);
  const theme = personaThemes[id];
  const content = personaContent[id];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ flex: 1.8 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-1 flex-col items-start justify-end overflow-hidden border-r px-7 pb-12 pt-24 md:px-10 md:pb-16 last:border-r-0 focusable"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        background: hovered
          ? `linear-gradient(160deg, color-mix(in srgb, ${theme.gateHover} 28%, #080510) 0%, ${theme.gateHover} 100%)`
          : "rgba(255,255,255,0.02)",
        transition: "background 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Big faint number */}
      <div
        className="pointer-events-none absolute right-6 top-6 select-none font-serif text-[120px] font-light leading-none opacity-[0.06] md:text-[180px]"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.gateHover }}
        aria-hidden="true"
      >
        {id === "student" ? "01" : id === "creator" ? "02" : "03"}
      </div>

      {/* Accent dot */}
      <div
        className="mb-6 h-3 w-3 rounded-full transition-all duration-500"
        style={{
          background: theme.gateHover,
          opacity: hovered ? 1 : 0.35,
          boxShadow: hovered ? `0 0 20px ${theme.gateHover}` : "none",
        }}
      />

      {/* I AM A label */}
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">I am a</p>

      {/* Persona name */}
      <h2
        className="mt-2 font-serif text-[40px] leading-none tracking-tight text-white/90 transition-all duration-300 md:text-[52px]"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.85)",
        }}
      >
        {content.label}
      </h2>

      {/* Tagline */}
      <p
        className="mt-3 max-w-[200px] text-sm leading-snug transition-all duration-400"
        style={{ color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.28)" }}
      >
        {content.gateDescription}
      </p>

      {/* Arrow */}
      <div
        className="mt-6 flex items-center gap-2 transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)" }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: theme.gateHover }}>
          Enter
        </span>
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ color: theme.gateHover }}>
          <path d="M4 10h12M12 6l4 4-4 4" />
        </svg>
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
          <div className="flex shrink-0 items-center justify-between px-8 py-6 md:px-12">
            <span
              className="font-serif text-[20px] tracking-tight text-white/70"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              INHAUS
            </span>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 md:block">
              Choose your world
            </p>
          </div>

          {/* Headline */}
          <motion.div
            className="shrink-0 px-8 pb-8 pt-2 md:px-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-serif text-[52px] font-light italic leading-none tracking-tight text-white/90 md:text-[80px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Who are you?
            </h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
              INHAUS brews differently for each of us
            </p>
          </motion.div>

          {/* Three panels */}
          <motion.div
            className="flex min-h-0 flex-1 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {gateCards.map(({ id }) => (
              <GatePanel key={id} id={id} onSelect={handleSelect} />
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
