"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes, gateCards, type Persona } from "@/lib/personas";

/* ─── Per-persona content ──────────────────────────────────────────── */
const gateContent: Record<Persona, { label: string; desc: string; cta: string; num: string }> = {
  student: {
    label: "Student",
    desc: "Late nights. Deadlines. Ambition.",
    cta: "Enter Study Mode",
    num: "01",
  },
  creator: {
    label: "Creator",
    desc: "Ideas. Flow state. Creation.",
    cta: "Enter Creator Mode",
    num: "02",
  },
  professional: {
    label: "Professional",
    desc: "Focus. Execution. Momentum.",
    cta: "Enter Focus Mode",
    num: "03",
  },
};

/* ─── Floating SVG icons per persona ─────────────────────────────── */
function StudentIcons() {
  return (
    <>
      {/* Book */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-8 w-8 opacity-25"
        style={{ top: "18%", left: "22%" }}
        animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </motion.svg>
      {/* Calculator */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-7 w-7 opacity-20"
        style={{ top: "35%", right: "18%" }}
        animate={{ y: [0, 6, 0], rotate: [3, -3, 3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="8" y2="10" strokeLinecap="round" /><line x1="12" y1="10" x2="12" y2="10" strokeLinecap="round" /><line x1="16" y1="10" x2="16" y2="10" strokeLinecap="round" /><line x1="8" y1="14" x2="8" y2="14" strokeLinecap="round" /><line x1="12" y1="14" x2="12" y2="14" strokeLinecap="round" /><line x1="16" y1="14" x2="16" y2="14" strokeLinecap="round" /><line x1="8" y1="18" x2="12" y2="18" />
      </motion.svg>
      {/* Pencil */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-6 w-6 opacity-20"
        style={{ bottom: "28%", left: "15%" }}
        animate={{ y: [0, -5, 0], rotate: [15, 20, 15] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </motion.svg>
      {/* Sticky note */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-7 w-7 opacity-15"
        style={{ top: "55%", left: "30%" }}
        animate={{ y: [0, 7, 0], rotate: [-8, 2, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </motion.svg>
    </>
  );
}

function CreatorIcons() {
  return (
    <>
      {/* Camera */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-9 w-9 opacity-25"
        style={{ top: "16%", left: "20%" }}
        animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
      </motion.svg>
      {/* Headphones */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-8 w-8 opacity-20"
        style={{ top: "38%", right: "16%" }}
        animate={{ y: [0, 6, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </motion.svg>
      {/* Music note */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-7 w-7 opacity-22"
        style={{ bottom: "26%", left: "18%" }}
        animate={{ y: [0, -6, 0], rotate: [-10, 5, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </motion.svg>
      {/* Lightbulb */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-7 w-7 opacity-18"
        style={{ top: "58%", left: "32%" }}
        animate={{ y: [0, 8, 0], rotate: [4, -4, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}>
        <path d="M9 21h6M12 3a6 6 0 0 1 6 6 6 6 0 0 1-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z" />
      </motion.svg>
    </>
  );
}

function ProfessionalIcons() {
  return (
    <>
      {/* Bar chart */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-8 w-8 opacity-25"
        style={{ top: "18%", left: "22%" }}
        animate={{ y: [0, -7, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </motion.svg>
      {/* Calendar */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-8 w-8 opacity-20"
        style={{ top: "36%", right: "17%" }}
        animate={{ y: [0, 6, 0], rotate: [3, -3, 3] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </motion.svg>
      {/* Checklist */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-7 w-7 opacity-20"
        style={{ bottom: "27%", left: "16%" }}
        animate={{ y: [0, -5, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><polyline points="3 6 4 7 6 5" /><polyline points="3 12 4 13 6 11" /><polyline points="3 18 4 19 6 17" />
      </motion.svg>
      {/* Trending arrow */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}
        className="absolute h-7 w-7 opacity-15"
        style={{ top: "56%", left: "28%" }}
        animate={{ y: [0, 7, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </motion.svg>
    </>
  );
}

const personaIcons: Record<Persona, React.FC> = {
  student: StudentIcons,
  creator: CreatorIcons,
  professional: ProfessionalIcons,
};

/* ─── Product image map (low-opacity background) ─────────────────── */
const productImages: Record<Persona, string> = {
  student: "/images/study-fuel.jpg",
  creator: "/images/creator-fuel.jpg",
  professional: "/images/workflow.jpg",
};

/* ─── Floating background particles ─────────────────────────────── */
function BackgroundParticles({ accent }: { accent: string }) {
  const particles = Array.from({ length: 12 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${10 + (i * 7.3) % 80}%`,
            top: `${5 + (i * 11.7) % 90}%`,
            background: accent,
            opacity: 0.3 + (i % 4) * 0.1,
          }}
          animate={{
            y: [0, -15 - (i % 5) * 5, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * (3 + i % 4), 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: (i * 0.4) % 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Burst particles on select ─────────────────────────────────── */
function BurstParticles({ active, accent, origin }: { active: boolean; accent: string; origin: { x: number; y: number } }) {
  const count = 24;
  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[10000]">
          {Array.from({ length: count }).map((_, i) => {
            const angle = (360 / count) * i;
            const dist = 80 + Math.random() * 120;
            const rad = (angle * Math.PI) / 180;
            const tx = Math.cos(rad) * dist;
            const ty = Math.sin(rad) * dist;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 4 + (i % 3) * 2,
                  height: 4 + (i % 3) * 2,
                  background: accent,
                  left: origin.x,
                  top: origin.y,
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1, x: tx, y: ty }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Central coffee droplet ─────────────────────────────────────── */
function CoffeeDroplet({ hovered }: { hovered: Persona | null }) {
  const accent = hovered ? personaThemes[hovered].gateHover : "#ffffff";
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ top: "12%", zIndex: 10 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg
        viewBox="0 0 40 52" fill="none"
        className="h-10 w-8"
        animate={{ filter: `drop-shadow(0 0 ${hovered ? "16px" : "4px"} ${accent})` }}
        transition={{ duration: 0.5 }}
      >
        <motion.path
          d="M20 2 C20 2, 36 22, 36 34 A16 16 0 0 1 4 34 C4 22, 20 2 20 2Z"
          animate={{ fill: hovered ? accent : "rgba(255,255,255,0.15)", stroke: accent }}
          transition={{ duration: 0.4 }}
          strokeWidth={1.5}
        />
        <motion.ellipse cx="15" cy="30" rx="4" ry="6"
          animate={{ fill: "rgba(255,255,255,0.12)", opacity: hovered ? 0.6 : 0.2 }}
          transition={{ duration: 0.4 }}
        />
      </motion.svg>
    </motion.div>
  );
}

/* ─── Single card panel ──────────────────────────────────────────── */
function GatePanel({
  id, index, hoveredPersona, onHover, onLeave, onSelect,
}: {
  id: Persona;
  index: number;
  hoveredPersona: Persona | null;
  onHover: (p: Persona) => void;
  onLeave: () => void;
  onSelect: (p: Persona, e: React.MouseEvent) => void;
}) {
  const theme = personaThemes[id];
  const content = gateContent[id];
  const IconsComponent = personaIcons[id];

  const isHovered = hoveredPersona === id;
  const isShrunk = hoveredPersona !== null && !isHovered;

  return (
    <motion.button
      type="button"
      onClick={(e) => onSelect(id, e)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      className="group relative flex flex-col items-start justify-end overflow-hidden cursor-pointer
        border-b last:border-b-0 px-6 py-7 text-left
        md:border-b-0 md:border-r md:last:border-r-0 md:px-10 md:pb-16 md:pt-24"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        minHeight: 0,
        flex: isHovered ? 1.8 : isShrunk ? 0.7 : 1,
        transition: "flex 0.55s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: isShrunk ? 0.45 : 1,
        y: 0,
        scale: isShrunk ? 0.97 : 1,
        transition: { duration: 0.55, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: isHovered
            ? `linear-gradient(160deg, color-mix(in srgb, ${theme.gateHover} 28%, #080510) 0%, ${theme.gateHover}CC 100%)`
            : "rgba(255,255,255,0.02)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Product image — low opacity behind content */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          src={productImages[id]}
          alt=""
          className="absolute bottom-0 right-0 h-full w-full object-cover object-center"
          animate={{ opacity: isHovered ? 0.08 : 0.03 }}
          transition={{ duration: 0.5 }}
          style={{ mixBlendMode: "luminosity" }}
          aria-hidden
        />
      </div>

      {/* Floating persona icons */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ color: theme.gateHover }}
      >
        <IconsComponent />
      </motion.div>

      {/* Floating particles (visible on hover) */}
      <AnimatePresence>
        {isHovered && <BackgroundParticles accent={theme.gateHover} />}
      </AnimatePresence>

      {/* Glow ring on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-none"
        animate={{
          boxShadow: isHovered ? `inset 0 0 60px ${theme.gateHover}30, inset 0 0 0 1px ${theme.gateHover}40` : "inset 0 0 0 0px transparent",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Big faint number */}
      <div
        className="pointer-events-none absolute right-5 top-4 select-none font-serif font-light leading-none
          text-[80px] md:text-[180px] md:right-6 md:top-6"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          color: theme.gateHover,
          opacity: isHovered ? 0.12 : 0.05,
          transition: "opacity 0.4s",
        }}
        aria-hidden
      >
        {content.num}
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full items-center gap-4 md:block">
        {/* Accent dot */}
        <motion.div
          className="h-3 w-3 shrink-0 rounded-full md:mb-6"
          animate={{
            background: theme.gateHover,
            opacity: isHovered ? 1 : 0.4,
            boxShadow: isHovered ? `0 0 24px ${theme.gateHover}, 0 0 48px ${theme.gateHover}60` : "none",
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="flex-1 md:block">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 md:text-[10px] md:tracking-[0.3em]">
            I am a
          </p>
          <motion.h2
            className="mt-1 font-serif leading-none tracking-tight md:mt-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 52px)",
            }}
            animate={{ color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.88)" }}
            transition={{ duration: 0.3 }}
          >
            {content.label}
          </motion.h2>
        </div>

        {/* Description — desktop */}
        <motion.p
          className="hidden text-sm leading-snug md:block md:mt-3 md:max-w-[200px]"
          animate={{ color: isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.3 }}
        >
          {content.desc}
        </motion.p>

        {/* Description — mobile */}
        <p className="text-[12px] leading-snug text-white/40 md:hidden" style={{ maxWidth: 120 }}>
          {content.desc}
        </p>

        {/* CTA button — appears on hover (desktop) */}
        <motion.div
          className="hidden md:flex md:mt-5 items-center gap-2"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -8,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
            style={{ background: theme.gateHover }}
          >
            {content.cta}
          </span>
        </motion.div>

        {/* Arrow fallback on mobile */}
        <div
          className="flex shrink-0 items-center gap-1 md:hidden"
          style={{ opacity: isHovered ? 1 : 0.4 }}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke={theme.gateHover}
            strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M12 6l4 4-4 4" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

/* ─── Exit overlays per persona ──────────────────────────────────── */
function StudentWave({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: "#080510" }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute inset-x-0"
          style={{ height: "40vh", background: color, bottom: -10, borderRadius: "60% 60% 0 0" }}
          initial={{ y: "100%" }}
          animate={{ y: `${-i * 30}%` }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </motion.div>
  );
}

function CreatorSplash({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999]" style={{ background: color }}
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    />
  );
}

function ProfessionalPulse({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "#080510" }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: 200, height: 200, border: `2px solid ${color}` }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 6 + i * 3, opacity: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
      <motion.div className="absolute inset-0" style={{ background: color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </motion.div>
  );
}

/* ─── Main gate ──────────────────────────────────────────────────── */
export default function PersonaGate() {
  const { persona, setPersona } = usePersona();
  const [hoveredPersona, setHoveredPersona] = useState<Persona | null>(null);
  const [exiting, setExiting] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [burst, setBurst] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });

  if (persona) return null;

  function handleSelect(p: Persona, e: React.MouseEvent) {
    setBurstOrigin({ x: e.clientX, y: e.clientY });
    setBurst(true);
    setSelectedPersona(p);
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => setPersona(p), 900);
    }, 150);
  }

  const exitColor = selectedPersona ? personaThemes[selectedPersona].gateHover : "#ffffff";

  function ExitOverlay() {
    if (!selectedPersona) return null;
    if (selectedPersona === "student") return <StudentWave color={exitColor} />;
    if (selectedPersona === "creator") return <CreatorSplash color={exitColor} />;
    return <ProfessionalPulse color={exitColor} />;
  }

  return (
    <>
      <BurstParticles active={burst} accent={exitColor} origin={burstOrigin} />

      <AnimatePresence>
        {!exiting && (
          <motion.div
            key="gate"
            className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
            style={{ background: "#080510" }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.5 } }}
          >
            {/* Top bar */}
            <div className="flex shrink-0 items-center justify-between px-6 py-5 md:px-12 md:py-6">
              <span className="font-serif text-[18px] tracking-tight text-white/70 md:text-[20px]"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
                INHAUS
              </span>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 md:block">
                Luxury instant coffee
              </p>
            </div>

            {/* Headline section */}
            <motion.div
              className="relative shrink-0 px-6 pb-3 pt-1 md:px-12 md:pb-6 md:pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Central coffee droplet above headline */}
              <CoffeeDroplet hovered={hoveredPersona} />

              <h1
                className="font-serif font-light italic leading-none tracking-tight text-white/90
                  text-[42px] pt-6 md:text-[80px] md:pt-8"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                Choose Your Fuel.
              </h1>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/25 md:mt-3 md:text-[11px] md:tracking-[0.25em]">
                Every ambition deserves a different brew.
              </p>
            </motion.div>

            {/* Panels */}
            <motion.div
              className="flex min-h-0 flex-1 flex-col border-t md:flex-row"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {gateCards.map(({ id }, i) => (
                <GatePanel
                  key={id}
                  id={id}
                  index={i}
                  hoveredPersona={hoveredPersona}
                  onHover={setHoveredPersona}
                  onLeave={() => setHoveredPersona(null)}
                  onSelect={handleSelect}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exiting && <ExitOverlay />}
      </AnimatePresence>
    </>
  );
}
