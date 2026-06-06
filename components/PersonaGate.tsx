"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes, gateCards, type Persona } from "@/lib/personas";

/* ─── Gate copy ────────────────────────────────────────────────────── */
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

/* ─── Energy ripples ──────────────────────────────────────────────── */
const RippleRing = memo(function RippleRing({ color, delay, size }: { color: string; delay: number; size: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, top: "50%", left: "50%", x: "-50%", y: "-50%", border: `1px solid ${color}`, opacity: 0 }}
      animate={{ scale: [0.55, 1.65], opacity: [0.11, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
});

const EnergyRipple = memo(function EnergyRipple({ persona }: { persona: Persona }) {
  const c = ACCENT[persona];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <RippleRing color={c} delay={0}    size={108} />
      <RippleRing color={c} delay={0.93} size={152} />
      <RippleRing color={c} delay={1.86} size={198} />
    </div>
  );
});

/* ─── Persona atmosphere effects ──────────────────────────────────── */

/* Student: soft orange coffee steam wisps drifting upward */
const StudentAtmosphere = memo(function StudentAtmosphere({ color }: { color: string }) {
  const wisps = [
    { left: "36%", delay: 0,   dur: 7,   xDrift: -8 },
    { left: "50%", delay: 1.8, dur: 8.5, xDrift: 6  },
    { left: "62%", delay: 3.2, dur: 6.5, xDrift: -5 },
    { left: "44%", delay: 4.5, dur: 9,   xDrift: 7  },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {wisps.map((w, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            width: 24 + i * 8, height: 40 + i * 10,
            left: w.left, bottom: "28%",
            background: `radial-gradient(ellipse, ${color}18 0%, transparent 70%)`,
            filter: "blur(12px)",
          }}
          animate={{
            y: [0, -(80 + i * 20)],
            x: [0, w.xDrift, 0],
            opacity: [0, 0.55, 0.35, 0],
            scaleX: [1, 1.3, 0.8],
          }}
          transition={{ duration: w.dur, repeat: Infinity, delay: w.delay, ease: "easeOut" }}
        />
      ))}
      {/* Slow drifting particles */}
      {[0,1,2,3].map(i => (
        <motion.div key={`p${i}`} className="absolute rounded-full"
          style={{ width: 2, height: 2, left: `${38 + i * 8}%`, bottom: "32%", background: color, opacity: 0 }}
          animate={{ y: [0, -(50 + i * 18)], opacity: [0, 0.4, 0] }}
          transition={{ duration: 5 + i * 1.2, repeat: Infinity, delay: i * 1.6 + 0.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
});

/* Creator: pink ink-like wisps + tiny sparks */
const CreatorAtmosphere = memo(function CreatorAtmosphere({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ink wisps — curved, fluid */}
      {[0,1,2].map(i => (
        <motion.div key={`w${i}`} className="absolute"
          style={{
            width: 60 + i * 20, height: 80 + i * 15,
            left: `${28 + i * 18}%`, bottom: "30%",
            background: `radial-gradient(ellipse 40% 70% at 50% 80%, ${color}14 0%, transparent 100%)`,
            filter: "blur(14px)",
            borderRadius: "40% 60% 70% 30% / 50% 30% 70% 50%",
          }}
          animate={{
            y: [0, -(60 + i * 25)],
            x: [0, (i % 2 === 0 ? 12 : -10), 0],
            opacity: [0, 0.5, 0.3, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15],
          }}
          transition={{ duration: 7 + i * 1.5, repeat: Infinity, delay: i * 2.2, ease: "easeInOut" }}
        />
      ))}
      {/* Sparks */}
      {[0,1,2,3,4].map(i => (
        <motion.div key={`s${i}`} className="absolute rounded-full"
          style={{
            width: 1.5, height: 1.5,
            left: `${25 + i * 12}%`, bottom: `${28 + (i % 3) * 8}%`,
            background: color, opacity: 0,
          }}
          animate={{ y: [0, -(35 + i * 10)], x: [(i % 2 === 0 ? 8 : -8), 0], opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.9 + 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
});

/* Professional: teal focus lines + energy streaks */
const ProfessionalAtmosphere = memo(function ProfessionalAtmosphere({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Horizontal focus lines that slide in and fade */}
      {[0,1,2,3].map(i => (
        <motion.div key={`l${i}`} className="absolute"
          style={{
            height: 1, left: 0, right: 0,
            top: `${22 + i * 14}%`,
            background: `linear-gradient(90deg, transparent 0%, ${color}00 ${15 + i * 8}%, ${color}22 50%, ${color}00 ${85 - i * 8}%, transparent 100%)`,
            opacity: 0,
          }}
          animate={{ opacity: [0, 0.6, 0], scaleX: [0.4, 1, 0.4], x: [i % 2 === 0 ? -20 : 20, 0] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 1.4, ease: "easeInOut" }}
        />
      ))}
      {/* Energy streaks — diagonal */}
      {[0,1,2].map(i => (
        <motion.div key={`st${i}`} className="absolute"
          style={{
            width: 1, height: 40 + i * 15,
            left: `${30 + i * 20}%`, top: `${15 + i * 10}%`,
            background: `linear-gradient(180deg, transparent, ${color}28, transparent)`,
            opacity: 0,
            filter: "blur(1px)",
          }}
          animate={{ opacity: [0, 0.55, 0], y: [0, 20], scaleY: [0.6, 1.2] }}
          transition={{ duration: 3.5 + i * 0.9, repeat: Infinity, delay: i * 1.8 + 0.4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
});

const ATMOSPHERE: Record<Persona, React.FC<{ color: string }>> = {
  student:      StudentAtmosphere,
  creator:      CreatorAtmosphere,
  professional: ProfessionalAtmosphere,
};

/* ─── Micro-particles ─────────────────────────────────────────────── */
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
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: p.s, height: p.s, left: p.dx, top: p.dy, background: color }}
          animate={{ y: [0, -10, 0], opacity: [0.22, 0.58, 0.22] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
});

/* ─── Persona SVGs ────────────────────────────────────────────────── */
const StudentSVGs = memo(function StudentSVGs({ color }: { color: string }) {
  return (
    <>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 34, top: "14%", left: "16%", opacity: 0.38 }}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 28, top: "42%", right: "16%", opacity: 0.30 }}
        animate={{ y: [0, 5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 24, bottom: "22%", left: "14%", opacity: 0.28 }}
        animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/>
        <circle cx="8" cy="13" r="0.8" fill={color}/><circle cx="12" cy="13" r="0.8" fill={color}/><circle cx="16" cy="13" r="0.8" fill={color}/>
        <circle cx="8" cy="17" r="0.8" fill={color}/><circle cx="12" cy="17" r="0.8" fill={color}/><circle cx="16" cy="17" r="0.8" fill={color}/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, top: "22%", left: "52%", opacity: 0.24 }}
        animate={{ y: [0, -4, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 20, bottom: "32%", left: "42%", opacity: 0.20 }}
        animate={{ y: [0, 5, 0], rotate: [-8, -4, -8] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 26, bottom: "18%", right: "14%", opacity: 0.20 }}
        animate={{ y: [0, -3, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </motion.svg>
    </>
  );
});

const CreatorSVGs = memo(function CreatorSVGs({ color }: { color: string }) {
  return (
    <>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 36, top: "13%", left: "14%", opacity: 0.38 }}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 30, top: "43%", right: "14%", opacity: 0.30 }}
        animate={{ y: [0, 5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 26, bottom: "24%", left: "12%", opacity: 0.28 }}
        animate={{ y: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, top: "64%", right: "24%", opacity: 0.24 }}
        animate={{ y: [0, 4, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}>
        <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, top: "24%", left: "50%", opacity: 0.22 }}
        animate={{ y: [0, -3, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}>
        <rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 20, bottom: "28%", right: "16%", opacity: 0.19 }}
        animate={{ y: [0, 4, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}>
        <path d="M9 21h6M12 3a6 6 0 0 1 6 6 6 6 0 0 1-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 20, top: "52%", left: "28%", opacity: 0.19 }}
        animate={{ y: [0, -3, 0], rotate: [5, 9, 5] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </motion.svg>
    </>
  );
});

const ProfessionalSVGs = memo(function ProfessionalSVGs({ color }: { color: string }) {
  return (
    <>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 32, top: "14%", left: "16%", opacity: 0.38 }}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 30, top: "40%", right: "15%", opacity: 0.30 }}
        animate={{ y: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 26, bottom: "23%", left: "12%", opacity: 0.28 }}
        animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
        <polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, top: "62%", right: "22%", opacity: 0.24 }}
        animate={{ y: [0, 4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 24, top: "23%", left: "50%", opacity: 0.22 }}
        animate={{ y: [0, -3, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}>
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 20, bottom: "35%", left: "40%", opacity: 0.19 }}
        animate={{ y: [0, 4, 0] }} transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}>
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </motion.svg>
      <motion.svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.2}
        className="absolute pointer-events-none" style={{ width: 22, bottom: "18%", right: "18%", opacity: 0.19 }}
        animate={{ y: [0, -3, 0] }} transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </motion.svg>
    </>
  );
});

const PERSONA_SVGS: Record<Persona, React.FC<{ color: string }>> = {
  student: StudentSVGs, creator: CreatorSVGs, professional: ProfessionalSVGs,
};

/* ─── Burst on select ─────────────────────────────────────────────── */
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

/* ─── Exit overlays ───────────────────────────────────────────────── */
function StudentExit({ color }: { color: string }) {
  return (
    <motion.div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: "#050308" }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="absolute inset-x-0"
          style={{ height: "45vh", background: color, bottom: -8, borderRadius: "50% 50% 0 0" }}
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

/* ─── Single card panel ───────────────────────────────────────────── */
const GatePanel = memo(function GatePanel({
  id, index, activeHover, onEnter, onLeave, onSelect,
}: {
  id: Persona; index: number; activeHover: Persona | null;
  onEnter: (p: Persona) => void; onLeave: () => void;
  onSelect: (p: Persona, e: React.MouseEvent) => void;
}) {
  const accent   = ACCENT[id];
  const content  = GATE[id];
  const SVGSet   = PERSONA_SVGS[id];
  const AtmoSet  = ATMOSPHERE[id];

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
        /* Heavier, more intentional spring — expo-out feel */
        flex: isHot ? 1.75 : isDimmed ? 0.75 : 1,
        transition: "flex 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        opacity: isDimmed ? 0.50 : 1,
        transform: isDimmed ? "scale(0.984)" : "scale(1)",
        willChange: "flex, opacity, transform",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDimmed ? 0.50 : 1, y: 0, transition: { duration: 0.55, delay: 0.12 + index * 0.09, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Base */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "#080510", zIndex: 0 }} />

      {/* Spotlight — top-down radial, softer edges */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-600"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% -5%, ${accent}1E 0%, ${accent}08 40%, transparent 70%)`,
          opacity: isHot ? 1 : 0, zIndex: 1,
        }} />

      {/* Bottom bloom — softer */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-600"
        style={{
          background: `radial-gradient(ellipse 100% 50% at 50% 115%, ${accent}24 0%, ${accent}0A 45%, transparent 65%)`,
          opacity: isHot ? 1 : 0, zIndex: 1,
        }} />

      {/* Inset border glow — softer, larger spread */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={{
          boxShadow: isHot
            ? `inset 0 0 0 1px ${accent}30, inset 0 -100px 120px -20px ${accent}1C`
            : `inset 0 0 0 1px rgba(255,255,255,0.08)`,
          zIndex: 2,
        }} />

      {/* Atmosphere — persona-specific ambient above content */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isHot ? 1 : 0, zIndex: 3 }}>
        <AtmoSet color={accent} />
      </div>

      {/* Energy ripples */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isHot ? 1 : 0, zIndex: 3 }}>
        <EnergyRipple persona={id} />
      </div>

      {/* Floating SVG icons */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isHot ? 1 : 0, zIndex: 4 }}>
        <SVGSet color={accent} />
      </div>

      {/* Micro-particles */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isHot ? 1 : 0, zIndex: 4 }}>
        <CardParticles color={accent} />
      </div>

      {/* Ghost number — white watermark, +17% vs previous */}
      <div className="pointer-events-none absolute right-4 top-3 select-none font-serif font-light leading-none
                      text-[80px] md:text-[170px] md:right-5 md:top-5 transition-all duration-600"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          color: isHot ? accent : "rgba(255,255,255,0.90)",
          opacity: isHot ? 0.23 : 0.105,
          zIndex: 5,
        }}
        aria-hidden>
        {content.num}
      </div>

      {/* ── Content ── */}
      <div className="relative flex w-full items-center gap-4 md:block" style={{ zIndex: 10 }}>

        {/* Accent orb */}
        <div className="h-2.5 w-2.5 shrink-0 rounded-full md:mb-5"
          style={{
            background: accent,
            opacity: isHot ? 1 : 0.55,
            boxShadow: isHot ? `0 0 14px ${accent}DD, 0 0 38px ${accent}66` : `0 0 5px ${accent}44`,
            transform: isHot ? "scale(1.4)" : "scale(1)",
            transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }} />

        <div className="flex-1 md:block">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] md:text-[10px]"
            style={{
              color: isHot ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.42)",
              transition: "color 0.35s",
            }}>
            I am a
          </p>
          <h2 className="mt-1 font-serif leading-none tracking-tight md:mt-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(30px, 3.8vw, 50px)",
              color: isHot ? "#FFFFFF" : "rgba(255,255,255,0.92)",
              transition: "color 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}>
            {content.label}
          </h2>
        </div>

        <p className="hidden text-sm leading-snug md:block md:mt-3 md:max-w-[190px]"
          style={{
            color: isHot ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.45)",
            transition: "color 0.35s",
          }}>
          {content.desc}
        </p>

        <p className="text-[11px] leading-snug md:hidden"
          style={{ maxWidth: 110, color: "rgba(255,255,255,0.52)" }}>
          {content.desc}
        </p>

        {/* CTA pill */}
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

        {/* Arrow — mobile */}
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

/* ─── Main gate ───────────────────────────────────────────────────── */
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
    setTimeout(() => { setExiting(true); setTimeout(() => setPersona(p), 900); }, 120);
  }

  const accent = selected ? ACCENT[selected] : "#ffffff";

  function ExitOverlay() {
    if (!selected) return null;
    if (selected === "student")  return <StudentExit color={accent} />;
    if (selected === "creator")  return <CreatorExit color={accent} />;
    return <ProfessionalExit color={accent} />;
  }

  return (
    <>
      <AnimatePresence>{burst && <BurstParticles accent={accent} origin={burstOrigin} />}</AnimatePresence>

      <AnimatePresence>
        {!exiting && (
          <motion.div key="gate" className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
            style={{ background: "#080510" }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.55 } }}
          >
            {/* Top bar */}
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

            {/* Headline */}
            <motion.div className="shrink-0 px-6 pb-4 pt-1 md:px-12 md:pb-6 md:pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif font-light italic leading-none tracking-tight text-[40px] md:text-[76px]"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "#F8F8F8" }}>
                Choose Your Fuel.
              </h1>
              {/* Subtitle: 48 → 58% opacity — +21% */}
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] md:mt-3 md:text-[11px] md:tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.58)" }}>
                Every ambition deserves a different brew.
              </p>
            </motion.div>

            {/* Panels */}
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

      <AnimatePresence>{exiting && <ExitOverlay />}</AnimatePresence>
    </>
  );
}
