"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes, gateCards, type Persona } from "@/lib/personas";

/* ─── Gate copy ──────────────────────────────────────────────────── */
const GATE: Record<Persona, { label: string; desc: string; cta: string; num: string }> = {
  student:      { label: "Student",      desc: "Late nights. Deadlines. Ambition.",  cta: "Enter Study Mode",   num: "01" },
  creator:      { label: "Creator",      desc: "Ideas. Flow state. Creation.",       cta: "Enter Creator Mode", num: "02" },
  professional: { label: "Professional", desc: "Focus. Execution. Momentum.",        cta: "Enter Focus Mode",   num: "03" },
};

const ACCENT: Record<Persona, string> = {
  student:      "#F04E12",
  creator:      "#FF2D78",
  professional: "#00A896",
};

/* ─── CSS keyframe float — zero JS overhead ──────────────────────── */
const floatStyle = (dur: number, delay: number, dy = 7): React.CSSProperties => ({
  animation: `inhausFloat ${dur}s ${delay}s ease-in-out infinite`,
  "--dy": `-${dy}px`,
} as React.CSSProperties);

/* Inject once — avoids styled-components / external dep */
if (typeof document !== "undefined" && !document.getElementById("inhaus-float-kf")) {
  const s = document.createElement("style");
  s.id = "inhaus-float-kf";
  s.textContent = `
    @keyframes inhausFloat {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(var(--dy, -7px)); }
    }
    @media (prefers-reduced-motion: reduce) {
      [style*="inhausFloat"] { animation: none !important; }
    }
  `;
  document.head.appendChild(s);
}

/* ─── Energy ripples — 2 rings, CSS animation ────────────────────── */
const rippleStyle = (dur: number, delay: number): React.CSSProperties => ({
  animation: `inhausRipple ${dur}s ${delay}s ease-out infinite`,
} as React.CSSProperties);

if (typeof document !== "undefined" && !document.getElementById("inhaus-ripple-kf")) {
  const s = document.createElement("style");
  s.id = "inhaus-ripple-kf";
  s.textContent = `
    @keyframes inhausRipple {
      0%   { transform: translate(-50%,-50%) scale(0.55); opacity: 0.11; }
      100% { transform: translate(-50%,-50%) scale(1.7);  opacity: 0; }
    }
  `;
  document.head.appendChild(s);
}

const EnergyRipple = memo(function EnergyRipple({ persona }: { persona: Persona }) {
  const c = ACCENT[persona];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[{ size: 110, dur: 2.8, delay: 0 }, { size: 170, dur: 2.8, delay: 1.4 }].map(({ size, dur, delay }) => (
        <div key={size} className="absolute rounded-full"
          style={{
            width: size, height: size,
            top: "50%", left: "50%",
            border: `1px solid ${c}`,
            ...rippleStyle(dur, delay),
          }} />
      ))}
    </div>
  );
});

/* ─── Particles — CSS only, 4 per card ──────────────────────────── */
const PCFG = [
  { dx: "20%", dy: "22%", s: 2.5, dur: 4.2, delay: 0   },
  { dx: "70%", dy: "32%", s: 1.5, dur: 5.5, delay: 0.8 },
  { dx: "40%", dy: "68%", s: 2,   dur: 4.8, delay: 1.6 },
  { dx: "80%", dy: "58%", s: 1.5, dur: 6,   delay: 0.4 },
];

const CardParticles = memo(function CardParticles({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {PCFG.map((p, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: p.s, height: p.s,
            left: p.dx, top: p.dy,
            background: color,
            opacity: 0.4,
            ...floatStyle(p.dur, p.delay, 9),
          }} />
      ))}
    </div>
  );
});

/* ─── Persona SVGs — 4 per card, CSS float ──────────────────────── */
const StudentSVGs = memo(function StudentSVGs({ color }: { color: string }) {
  return (
    <>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 34, top: "14%", left: "16%", opacity: 0.38, ...floatStyle(5.5, 0, 6) }}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 28, top: "42%", right: "16%", opacity: 0.28, ...floatStyle(7, 1.2, 5) }}>
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 22, top: "22%", left: "52%", opacity: 0.22, ...floatStyle(6.5, 2, 4) }}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 24, bottom: "20%", left: "14%", opacity: 0.24, ...floatStyle(8, 0.6, 5) }}>
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/>
        <circle cx="8" cy="13" r="0.8" fill={color}/><circle cx="12" cy="13" r="0.8" fill={color}/><circle cx="16" cy="13" r="0.8" fill={color}/>
        <circle cx="8" cy="17" r="0.8" fill={color}/><circle cx="12" cy="17" r="0.8" fill={color}/>
      </svg>
    </>
  );
});

const CreatorSVGs = memo(function CreatorSVGs({ color }: { color: string }) {
  return (
    <>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 36, top: "13%", left: "14%", opacity: 0.38, ...floatStyle(6, 0, 6) }}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 30, top: "43%", right: "14%", opacity: 0.28, ...floatStyle(7.5, 1, 5) }}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 26, bottom: "24%", left: "12%", opacity: 0.26, ...floatStyle(5, 0.8, 5) }}>
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 22, top: "24%", left: "50%", opacity: 0.20, ...floatStyle(8, 2.2, 4) }}>
        <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    </>
  );
});

const ProfessionalSVGs = memo(function ProfessionalSVGs({ color }: { color: string }) {
  return (
    <>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 32, top: "14%", left: "16%", opacity: 0.38, ...floatStyle(5.5, 0, 6) }}>
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 30, top: "40%", right: "15%", opacity: 0.28, ...floatStyle(7, 1, 5) }}>
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 26, bottom: "23%", left: "12%", opacity: 0.26, ...floatStyle(5.5, 0.6, 5) }}>
        <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
        <polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none"
        style={{ width: 22, top: "23%", left: "50%", opacity: 0.20, ...floatStyle(8, 2.1, 4) }}>
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    </>
  );
});

const PERSONA_SVGS: Record<Persona, React.FC<{ color: string }>> = {
  student: StudentSVGs, creator: CreatorSVGs, professional: ProfessionalSVGs,
};

/* ─── Burst on select ────────────────────────────────────────────── */
function BurstParticles({ accent, origin }: { accent: string; origin: { x: number; y: number } }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (360 / 16) * i;
        const dist  = 60 + (i % 4) * 25;
        const rad   = (angle * Math.PI) / 180;
        return (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 3 + (i % 3), height: 3 + (i % 3), background: accent, left: origin.x, top: origin.y }}
            initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 1.2, x: `calc(-50% + ${Math.cos(rad) * dist}px)`, y: `calc(-50% + ${Math.sin(rad) * dist}px)` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* ─── Exit overlay — single fast fade, no GPU-heavy shapes ──────── */
function ExitFade({ color }: { color: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999]"
      style={{ background: color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeIn" }}
    />
  );
}

/* ─── Card panel ─────────────────────────────────────────────────── */
const GatePanel = memo(function GatePanel({
  id, index, activeHover, onEnter, onLeave, onSelect,
}: {
  id: Persona; index: number; activeHover: Persona | null;
  onEnter: (p: Persona) => void; onLeave: () => void;
  onSelect: (p: Persona, e: React.MouseEvent) => void;
}) {
  const accent  = ACCENT[id];
  const content = GATE[id];
  const SVGSet  = PERSONA_SVGS[id];

  const isHot    = activeHover === id;
  const isDimmed = activeHover !== null && !isHot;

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
        /* CSS transition — no Framer Motion JS loop for flex */
        transition: "flex 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        opacity: isDimmed ? 0.50 : 1,
        transform: isDimmed ? "scale(0.984)" : "scale(1)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDimmed ? 0.50 : 1, y: 0, transition: { duration: 0.55, delay: 0.12 + index * 0.09 } }}
    >
      {/* Dark base */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "#080510" }} />

      {/* Spotlight — top radial, opacity-only transition (no blur, no repaint) */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% -5%, ${accent}1E 0%, ${accent}08 40%, transparent 70%)`,
          opacity: isHot ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />

      {/* Bottom bloom */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 50% at 50% 115%, ${accent}24 0%, ${accent}0A 45%, transparent 65%)`,
          opacity: isHot ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />

      {/* Inset border glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: isHot
            ? `inset 0 0 0 1px ${accent}30, inset 0 -100px 120px -20px ${accent}1C`
            : `inset 0 0 0 1px rgba(255,255,255,0.08)`,
          transition: "box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />

      {/* Ripples */}
      <div className="pointer-events-none absolute inset-0"
        style={{ opacity: isHot ? 1 : 0, transition: "opacity 0.5s" }}>
        <EnergyRipple persona={id} />
      </div>

      {/* SVG icons */}
      <div className="pointer-events-none absolute inset-0"
        style={{ opacity: isHot ? 1 : 0, transition: "opacity 0.5s" }}>
        <SVGSet color={accent} />
      </div>

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0"
        style={{ opacity: isHot ? 1 : 0, transition: "opacity 0.5s" }}>
        <CardParticles color={accent} />
      </div>

      {/* Ghost number */}
      <div className="pointer-events-none absolute right-4 top-3 select-none font-serif font-light leading-none
                      text-[80px] md:text-[170px] md:right-5 md:top-5"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          color: isHot ? accent : "rgba(255,255,255,0.90)",
          opacity: isHot ? 0.22 : 0.105,
          transition: "opacity 0.5s, color 0.4s",
        }}
        aria-hidden>
        {content.num}
      </div>

      {/* Content */}
      <div className="relative flex w-full items-center gap-4 md:block" style={{ zIndex: 10 }}>
        <div className="h-2.5 w-2.5 shrink-0 rounded-full md:mb-5"
          style={{
            background: accent,
            opacity: isHot ? 1 : 0.55,
            boxShadow: isHot ? `0 0 14px ${accent}DD, 0 0 38px ${accent}66` : `0 0 5px ${accent}44`,
            transform: isHot ? "scale(1.4)" : "scale(1)",
            transition: "opacity 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }} />

        <div className="flex-1 md:block">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] md:text-[10px]"
            style={{ color: isHot ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.42)", transition: "color 0.3s" }}>
            I am a
          </p>
          <h2 className="mt-1 font-serif leading-none tracking-tight md:mt-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(30px, 3.8vw, 50px)",
              color: isHot ? "#FFFFFF" : "rgba(255,255,255,0.92)",
              transition: "color 0.3s",
            }}>
            {content.label}
          </h2>
        </div>

        <p className="hidden text-sm leading-snug md:block md:mt-3 md:max-w-[190px]"
          style={{ color: isHot ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>
          {content.desc}
        </p>

        <p className="text-[11px] leading-snug md:hidden"
          style={{ maxWidth: 110, color: "rgba(255,255,255,0.52)" }}>
          {content.desc}
        </p>

        <div className="hidden md:block md:mt-5"
          style={{
            opacity: isHot ? 1 : 0,
            transform: isHot ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wide text-white"
            style={{ background: accent }}>
            {content.cta}
            <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="flex shrink-0 items-center md:hidden"
          style={{ opacity: isHot ? 1 : 0.35, transition: "opacity 0.3s" }}>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke={accent}
            strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M12 6l4 4-4 4" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
});

/* ─── Main gate ──────────────────────────────────────────────────── */
export default function PersonaGate() {
  const { persona, setPersona } = usePersona();
  const [activeHover, setActiveHover] = useState<Persona | null>(null);
  const [selected, setSelected]       = useState<Persona | null>(null);
  const [exiting, setExiting]         = useState(false);
  const [burst, setBurst]             = useState(false);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });

  const handleEnter = useCallback((p: Persona) => setActiveHover(p), []);
  const handleLeave = useCallback(() => setActiveHover(null), []);

  if (persona) return null;

  function handleSelect(p: Persona, e: React.MouseEvent) {
    setBurstOrigin({ x: e.clientX, y: e.clientY });
    setBurst(true);
    setSelected(p);
    setExiting(true);
    setTimeout(() => setPersona(p), 320);
  }

  const accent = selected ? ACCENT[selected] : "#ffffff";

  return (
    <>
      <AnimatePresence>{burst && <BurstParticles accent={accent} origin={burstOrigin} />}</AnimatePresence>

      <AnimatePresence>
        {!exiting && (
          <motion.div key="gate" className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
            style={{ background: "#080510" }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.55 } }}
          >
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

            <motion.div className="shrink-0 px-6 pb-4 pt-1 md:px-12 md:pb-6 md:pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif font-light italic leading-none tracking-tight text-[40px] md:text-[76px]"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "#F8F8F8" }}>
                Choose Your Fuel.
              </h1>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] md:mt-3 md:text-[11px] md:tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.58)" }}>
                One Coffee. Three Identities. Which One Are You?
              </p>
            </motion.div>

            <motion.div className="flex min-h-0 flex-1 flex-col border-t md:flex-row"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              {gateCards.map(({ id }, i) => (
                <GatePanel key={id} id={id} index={i}
                  activeHover={activeHover}
                  onEnter={handleEnter} onLeave={handleLeave} onSelect={handleSelect}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{exiting && <ExitFade color={accent} />}</AnimatePresence>
    </>
  );
}
