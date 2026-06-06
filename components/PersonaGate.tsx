"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes, gateCards, type Persona } from "@/lib/personas";

/* ─── Persona-specific gate copy ──────────────────────────────────── */
const GATE: Record<Persona, { label: string; desc: string; cta: string; num: string }> = {
  student:      { label: "Student",      desc: "Late nights. Deadlines. Ambition.",  cta: "Enter Study Mode",    num: "01" },
  creator:      { label: "Creator",      desc: "Ideas. Flow state. Creation.",       cta: "Enter Creator Mode",  num: "02" },
  professional: { label: "Professional", desc: "Focus. Execution. Momentum.",        cta: "Enter Focus Mode",    num: "03" },
};

/* Accent colors — kept intentionally dim for dark-card aesthetic */
const ACCENT: Record<Persona, string> = {
  student:      "#F04E12",
  creator:      "#FF2D78",
  professional: "#00A896",
};

/* ─── Ambient energy ripple — size -30%, opacity more elegant ─────── */
const RippleRing = memo(function RippleRing({
  color, delay, size,
}: { color: string; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        x: "-50%", y: "-50%",
        border: `1px solid ${color}`,
        opacity: 0,
      }}
      animate={{ scale: [0.6, 1.6], opacity: [0.12, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
});

/* Ripple cluster — sizes reduced 30% */
const EnergyRipple = memo(function EnergyRipple({ persona }: { persona: Persona }) {
  const c = ACCENT[persona];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <RippleRing color={c} delay={0}    size={112} />
      <RippleRing color={c} delay={0.85} size={154} />
      <RippleRing color={c} delay={1.7}  size={203} />
    </div>
  );
});

/* ─── Floating micro-particles per card — GPU transforms only ──────── */
const PARTICLE_CONFIG = [
  { dx: "22%", dy: "18%", s: 2.5, dur: 4.2, delay: 0    },
  { dx: "72%", dy: "28%", s: 1.5, dur: 5.1, delay: 0.7  },
  { dx: "38%", dy: "65%", s: 2,   dur: 4.8, delay: 1.4  },
  { dx: "82%", dy: "55%", s: 1.5, dur: 5.8, delay: 0.3  },
  { dx: "15%", dy: "78%", s: 2,   dur: 4.4, delay: 1.9  },
  { dx: "60%", dy: "82%", s: 1.5, dur: 5.5, delay: 0.9  },
];

const CardParticles = memo(function CardParticles({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {PARTICLE_CONFIG.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.s, height: p.s, left: p.dx, top: p.dy, background: color }}
          animate={{ y: [0, -10, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
});

/* ─── Floating persona SVGs ─────────────────────────────────────────── */
/* Icons: opacity +40% vs previous values */
const StudentSVGs = memo(function StudentSVGs({ color }: { color: string }) {
  return (
    <>
      {/* Book */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 34, top: "15%", left: "18%", opacity: 0.38 }}
        animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </motion.svg>
      {/* Notebook */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 28, top: "40%", right: "14%", opacity: 0.30 }}
        animate={{ y: [0, 6, 0], rotate: [0, 4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
      </motion.svg>
      {/* Calculator */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 24, bottom: "24%", left: "12%", opacity: 0.28 }}
        animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="8" y2="12" strokeLinecap="round"/><line x1="12" y1="12" x2="12" y2="12" strokeLinecap="round"/><line x1="16" y1="12" x2="16" y2="12" strokeLinecap="round"/><line x1="8" y1="16" x2="8" y2="16" strokeLinecap="round"/><line x1="12" y1="16" x2="12" y2="16" strokeLinecap="round"/><line x1="16" y1="16" x2="16" y2="16" strokeLinecap="round"/>
      </motion.svg>
    </>
  );
});

const CreatorSVGs = memo(function CreatorSVGs({ color }: { color: string }) {
  return (
    <>
      {/* Camera */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 36, top: "14%", left: "16%", opacity: 0.38 }}
        animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </motion.svg>
      {/* Headphones */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 30, top: "44%", right: "12%", opacity: 0.30 }}
        animate={{ y: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </motion.svg>
      {/* Music notes */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 26, bottom: "26%", left: "14%", opacity: 0.28 }}
        animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </motion.svg>
      {/* Microphone */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, top: "65%", right: "22%", opacity: 0.24 }}
        animate={{ y: [0, 5, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}>
        <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </motion.svg>
    </>
  );
});

const ProfessionalSVGs = memo(function ProfessionalSVGs({ color }: { color: string }) {
  return (
    <>
      {/* Analytics / bar chart */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 32, top: "16%", left: "18%", opacity: 0.38 }}
        animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </motion.svg>
      {/* Calendar */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 30, top: "38%", right: "13%", opacity: 0.30 }}
        animate={{ y: [0, 6, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </motion.svg>
      {/* Checklist */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 26, bottom: "25%", left: "12%", opacity: 0.28 }}
        animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
        <polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/>
      </motion.svg>
      {/* Dashboard / trending */}
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, top: "62%", right: "20%", opacity: 0.24 }}
        animate={{ y: [0, 5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </motion.svg>
    </>
  );
});

const PERSONA_SVGS: Record<Persona, React.FC<{ color: string }>> = {
  student: StudentSVGs,
  creator: CreatorSVGs,
  professional: ProfessionalSVGs,
};

/* ─── Particle burst on select ──────────────────────────────────────── */
function BurstParticles({ accent, origin }: { accent: string; origin: { x: number; y: number } }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (360 / 20) * i;
        const dist  = 70 + (i % 4) * 30;
        const rad   = (angle * Math.PI) / 180;
        return (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 3 + (i % 3), height: 3 + (i % 3), background: accent, left: origin.x, top: origin.y }}
            initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 1.4, x: `calc(-50% + ${Math.cos(rad) * dist}px)`, y: `calc(-50% + ${Math.sin(rad) * dist}px)` }}
            transition={{ duration: 0.55 + (i % 3) * 0.1, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* ─── Exit overlays — cinematic, dark-to-color ──────────────────────── */
function StudentExit({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: "#050308" }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="absolute inset-x-0" style={{ height: "45vh", background: color, bottom: -8, borderRadius: "50% 50% 0 0" }}
          initial={{ y: "100%" }} animate={{ y: `${-i * 35}%` }}
          transition={{ duration: 0.65, delay: i * 0.07, ease: [0.65, 0, 0.35, 1] }} />
      ))}
    </motion.div>
  );
}
function CreatorExit({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999]" style={{ background: color }}
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }} />
  );
}
function ProfessionalExit({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "#050308" }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: 180, height: 180, border: `1.5px solid ${color}` }}
          initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 7 + i * 3, opacity: 0 }}
          transition={{ duration: 0.75, delay: i * 0.09, ease: "easeOut" }} />
      ))}
      <motion.div className="absolute inset-0" style={{ background: color }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.28 }} />
    </motion.div>
  );
}

/* ─── Single panel ──────────────────────────────────────────────────── */
const GatePanel = memo(function GatePanel({
  id, index, activeHover, onEnter, onLeave, onSelect,
}: {
  id: Persona;
  index: number;
  activeHover: Persona | null;
  onEnter: (p: Persona) => void;
  onLeave: () => void;
  onSelect: (p: Persona, e: React.MouseEvent) => void;
}) {
  const accent  = ACCENT[id];
  const content = GATE[id];
  const SVGSet  = PERSONA_SVGS[id];

  const isHot     = activeHover === id;
  const isDimmed  = activeHover !== null && !isHot;

  return (
    <motion.button
      type="button"
      onClick={e => onSelect(id, e)}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
      className="group relative flex flex-col items-start justify-end overflow-hidden cursor-pointer text-left
                 border-b last:border-b-0 px-6 py-7
                 md:border-b-0 md:border-r md:last:border-r-0 md:px-10 md:pb-16 md:pt-24"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        minHeight: 0,
        flex: isHot ? 1.75 : isDimmed ? 0.75 : 1,
        transition: "flex 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, transform 0.35s ease",
        opacity: isDimmed ? 0.52 : 1,
        transform: isDimmed ? "scale(0.985)" : "scale(1)",
        willChange: "flex, opacity, transform",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDimmed ? 0.42 : 1, y: 0, transition: { duration: 0.5, delay: 0.12 + index * 0.09, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Base dark surface */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "#080510", zIndex: 0 }} />

      {/* Spotlight — radial from top-center, persona-colored, appears on hover */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% -10%, ${accent}22 0%, transparent 65%)`,
          opacity: isHot ? 1 : 0,
          zIndex: 1,
        }} />

      {/* Accent bottom-up bloom */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 110%, ${accent}28 0%, transparent 60%)`,
          opacity: isHot ? 1 : 0,
          zIndex: 1,
        }} />

      {/* Edge glow — stronger on hover */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={{
          boxShadow: isHot
            ? `inset 0 0 0 1px ${accent}35, inset 0 -80px 100px ${accent}22`
            : `inset 0 0 0 1px rgba(255,255,255,0.07)`,
          zIndex: 2,
        }} />

      {/* Energy ripples — only render when hovered */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-400"
        style={{ opacity: isHot ? 1 : 0, zIndex: 3 }}>
        <EnergyRipple persona={id} />
      </div>

      {/* Floating persona icons */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-400"
        style={{ opacity: isHot ? 1 : 0, zIndex: 4 }}>
        <SVGSet color={accent} />
      </div>

      {/* Micro-particles */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-400"
        style={{ opacity: isHot ? 1 : 0, zIndex: 4 }}>
        <CardParticles color={accent} />
      </div>

      {/* Large ghost number — much more visible */}
      <div className="pointer-events-none absolute right-4 top-3 select-none font-serif font-light leading-none
                      text-[80px] md:text-[170px] md:right-5 md:top-5 transition-opacity duration-500"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          color: accent,
          opacity: isHot ? 0.22 : 0.11,
          zIndex: 5,
        }}
        aria-hidden>
        {content.num}
      </div>

      {/* ── Content ── */}
      <div className="relative flex w-full items-center gap-4 md:block" style={{ zIndex: 10 }}>

        {/* Accent orb */}
        <div className="h-2.5 w-2.5 shrink-0 rounded-full md:mb-5 transition-all duration-400"
          style={{
            background: accent,
            opacity: isHot ? 1 : 0.55,
            boxShadow: isHot ? `0 0 16px ${accent}EE, 0 0 40px ${accent}77` : `0 0 6px ${accent}44`,
            transform: isHot ? "scale(1.4)" : "scale(1)",
          }} />

        <div className="flex-1 md:block">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] md:text-[10px]"
            style={{ color: isHot ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.42)" }}>
            I am a
          </p>
          <h2 className="mt-1 font-serif leading-none tracking-tight md:mt-2 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(30px, 3.8vw, 50px)",
              color: isHot ? "#FFFFFF" : "rgba(255,255,255,0.92)",
            }}>
            {content.label}
          </h2>
        </div>

        {/* Description — desktop */}
        <p className="hidden text-sm leading-snug md:block md:mt-3 md:max-w-[190px] transition-colors duration-300"
          style={{ color: isHot ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.45)" }}>
          {content.desc}
        </p>

        {/* Description — mobile */}
        <p className="text-[11px] leading-snug md:hidden" style={{ maxWidth: 110, color: "rgba(255,255,255,0.52)" }}>
          {content.desc}
        </p>

        {/* CTA — fades in on hover, desktop only */}
        <div className="hidden md:block md:mt-5 transition-all duration-300"
          style={{ opacity: isHot ? 1 : 0, transform: isHot ? "translateY(0)" : "translateY(4px)" }}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wide text-white"
            style={{ background: accent }}>
            {content.cta}
            <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Arrow — mobile */}
        <div className="flex shrink-0 items-center md:hidden transition-opacity duration-300"
          style={{ opacity: isHot ? 1 : 0.35 }}>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke={accent}
            strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M12 6l4 4-4 4" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
});

/* ─── Main PersonaGate ──────────────────────────────────────────────── */
export default function PersonaGate() {
  const { persona, setPersona } = usePersona();
  const [activeHover, setActiveHover]   = useState<Persona | null>(null);
  const [selected, setSelected]         = useState<Persona | null>(null);
  const [exiting, setExiting]           = useState(false);
  const [burst, setBurst]               = useState(false);
  const [burstOrigin, setBurstOrigin]   = useState({ x: 0, y: 0 });

  const handleEnter = useCallback((p: Persona) => setActiveHover(p), []);
  const handleLeave = useCallback(() => setActiveHover(null), []);

  if (persona) return null;

  function handleSelect(p: Persona, e: React.MouseEvent) {
    setBurstOrigin({ x: e.clientX, y: e.clientY });
    setBurst(true);
    setSelected(p);
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => setPersona(p), 900);
    }, 120);
  }

  const accent = selected ? ACCENT[selected] : "#ffffff";

  function ExitOverlay() {
    if (!selected) return null;
    if (selected === "student")      return <StudentExit color={accent} />;
    if (selected === "creator")      return <CreatorExit color={accent} />;
    return <ProfessionalExit color={accent} />;
  }

  return (
    <>
      <AnimatePresence>{burst && <BurstParticles accent={accent} origin={burstOrigin} />}</AnimatePresence>

      <AnimatePresence>
        {!exiting && (
          <motion.div
            key="gate"
            className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
            style={{ background: "#080510" }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.55 } }}
          >
            {/* ── Top bar ── */}
            <div className="flex shrink-0 items-center justify-between px-6 py-5 md:px-12 md:py-6">
              <span className="font-serif text-[18px] tracking-tight md:text-[20px]"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "rgba(255,255,255,0.75)" }}>
                INHAUS
              </span>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] md:block"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                Specialty instant coffee
              </p>
            </div>

            {/* ── Headline ── */}
            <motion.div
              className="shrink-0 px-6 pb-4 pt-1 md:px-12 md:pb-6 md:pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif font-light italic leading-none tracking-tight text-[40px] md:text-[76px]"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "#F8F8F8" }}>
                Choose Your Fuel.
              </h1>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] md:mt-3 md:text-[11px] md:tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.48)" }}>
                Every ambition deserves a different brew.
              </p>
            </motion.div>

            {/* ── Panels ── */}
            <motion.div
              className="flex min-h-0 flex-1 flex-col border-t md:flex-row"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.22 }}
            >
              {gateCards.map(({ id }, i) => (
                <GatePanel
                  key={id}
                  id={id}
                  index={i}
                  activeHover={activeHover}
                  onEnter={handleEnter}
                  onLeave={handleLeave}
                  onSelect={handleSelect}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{exiting && <ExitOverlay />}</AnimatePresence>
    </>
  );
}
