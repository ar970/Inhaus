"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaContent, personaThemes, gateCards, type Persona } from "@/lib/personas";
import { Cup, House, Sparkle } from "@/components/Doodles";

const icons = { cup: Cup, star: Sparkle, house: House } as const;

function GateCard({
  id,
  onSelect,
}: {
  id: Persona;
  onSelect: (p: Persona) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const theme = personaThemes[id];
  const content = personaContent[id];
  const cardDef = gateCards.find((c) => c.id === id)!;
  const Icon = icons[cardDef.Icon as keyof typeof icons];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center justify-between overflow-hidden rounded-[24px] border border-white/10 p-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:h-[400px]"
      style={{
        background: hovered
          ? theme.gateHover
          : "rgba(255,255,255,0.04)",
        transition: "background 0.38s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Glow blob */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 rounded-[24px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: theme.gateHover }}
      />

      {/* Icon */}
      <div
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border transition-colors duration-300"
        style={{
          borderColor: hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
          color: hovered ? theme.gateText : "rgba(255,255,255,0.6)",
        }}
      >
        <Icon className="h-10 w-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}
        >
          I AM A
        </p>
        <h3
          className="mt-2 font-serif text-[34px] font-normal leading-none md:text-[40px]"
          style={{ color: hovered ? theme.gateText : "rgba(255,255,255,0.90)" }}
        >
          {content.label}
        </h3>
        <p
          className="mt-3 text-sm leading-snug transition-all duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.40)" }}
        >
          {content.tagline}
          <br />
          <span className="text-xs">{content.gateDescription}</span>
        </p>
      </div>

      {/* Bottom arrow */}
      <div
        className="relative z-10 mt-8 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300"
        style={{
          borderColor: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)",
          color: hovered ? theme.gateText : "rgba(255,255,255,0.3)",
        }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>
    </motion.button>
  );
}

export default function PersonaGate() {
  const { persona, setPersona } = usePersona();
  const [exiting, setExiting] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState<string | null>(null);

  if (persona) return null;

  function handleSelect(p: Persona) {
    setSelectedAccent(personaThemes[p].gateHover);
    setExiting(true);
    setTimeout(() => setPersona(p), 700);
  }

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[9999] flex flex-col overflow-y-auto bg-[#0E0B09]"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
        >
          {/* Flash overlay on exit */}
          {selectedAccent && (
            <div
              className="pointer-events-none fixed inset-0 z-50 opacity-0 animate-[fadeOut_0.6s_ease_forwards]"
              style={{ background: selectedAccent }}
            />
          )}

          {/* Logo */}
          <div className="flex items-center justify-center pt-8">
            <span className="font-serif text-2xl text-white/80 tracking-tight">INHAUS</span>
          </div>

          {/* Headline */}
          <motion.div
            className="mt-12 px-5 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-[48px] font-normal leading-none tracking-tight text-white md:text-[80px]">
              Who are you?
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-white/40">
              INHAUS brews differently for each of us. Choose your world.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 px-5 pb-12 md:grid-cols-3 md:mt-14">
            {gateCards.map(({ id }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <GateCard id={id} onSelect={handleSelect} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Exiting flash */
        <motion.div
          key="exit-flash"
          className="fixed inset-0 z-[9999]"
          style={{ background: selectedAccent ?? "#0E0B09" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onAnimationComplete={() => setExiting(false)}
        />
      )}
    </AnimatePresence>
  );
}
