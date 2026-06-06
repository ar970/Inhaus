"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import { usePersona } from "@/context/PersonaContext";

// ─── Product data ──────────────────────────────────────────────────────────
const products = {
  creator: {
    id: "creator",
    name: "Creator\nFuel",
    tagline: "For the restless creative",
    desc: "Espresso-grade concentrate brewed for long sessions. Smooth, dark, relentless — pour it, stay in the zone, keep making. Your best work has never been this close.",
    color: "#FF2D78",
    colorSoft: "rgba(255,45,120,0.18)",
    image: "/product-creator.jpeg",
    stats: [
      { label: "Pour & create", value: "60 sec" },
      { label: "Sessions per pack", value: "~20" },
      { label: "Equipment needed", value: "None" },
      { label: "Flow state", value: "Instant" },
    ],
  },
  professional: {
    id: "workflow",
    name: "Work\nFlow",
    tagline: "For the sharp professional",
    desc: "Clean, precise concentration calibrated for deep focus and sustained output. No noise, no machine, no wasted minutes. The same premium cup, every single morning.",
    color: "#00A896",
    colorSoft: "rgba(0,168,150,0.18)",
    image: "/product-workflow.jpeg",
    stats: [
      { label: "Brew time", value: "60 sec" },
      { label: "Cups per pack", value: "20" },
      { label: "Equipment", value: "Zero" },
      { label: "Consistency", value: "Every cup" },
    ],
  },
  student: {
    id: "study",
    name: "Study\nFuel",
    tagline: "For the ambitious student",
    desc: "Bold, affordable, and ready before your laptop wakes up. Pull an all-nighter without leaving your desk. Every sip buys you another hour — deadline or not.",
    color: "#F56B00",
    colorSoft: "rgba(245,107,0,0.18)",
    image: "/product-study.jpeg",
    stats: [
      { label: "Ready in", value: "60 sec" },
      { label: "Makes", value: "~20 cups" },
      { label: "No machine needed", value: "Ever" },
      { label: "Per cup", value: "~₹22" },
    ],
  },
};

// ─── Student stage deco: notebook paper + study doodles ────────────────────
function StudentDecorations({ color }: { color: string }) {
  const doodles = [
    { x: 7,  y: 10, text: "E = mc²",   rotate: -9,  size: 10.5, op: 0.32 },
    { x: 70, y: 7,  text: "∑ study",   rotate:  6,  size: 9.5,  op: 0.28 },
    { x: 4,  y: 76, text: "✓ done",    rotate: -5,  size: 11,   op: 0.30 },
    { x: 73, y: 79, text: "deadline!", rotate:  8,  size: 9.5,  op: 0.26 },
    { x: 12, y: 48, text: "∫∂x",       rotate: -13, size: 12,   op: 0.20 },
    { x: 78, y: 43, text: "π = 3.14",  rotate:  5,  size: 9.5,  op: 0.24 },
    { x: 38, y: 6,  text: "2:17 AM",   rotate: -3,  size: 9.5,  op: 0.28 },
    { x: 53, y: 84, text: "★★★★",     rotate:  7,  size: 9.5,  op: 0.20 },
    { x: 63, y: 16, text: "pg 47",     rotate: -4,  size: 9,    op: 0.18 },
    { x: 4,  y: 34, text: "reread!",   rotate:  10, size: 9,    op: 0.20 },
  ];
  return (
    <>
      {/* Notebook ruled lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 540"
        preserveAspectRatio="none" style={{ opacity: 0.065 }}>
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} x1="0" x2="400" y1={26 + i * 22} y2={26 + i * 22}
            stroke={color} strokeWidth="0.65" />
        ))}
        {/* Red margin line */}
        <line x1="54" y1="0" x2="54" y2="540" stroke="#FF6B6B" strokeWidth="0.9" opacity="0.38" />
      </svg>
      {/* Doodle labels */}
      {doodles.map((d, i) => (
        <span key={i} className="pointer-events-none absolute select-none"
          style={{
            left: `${d.x}%`, top: `${d.y}%`,
            fontSize: d.size, color, opacity: d.op,
            transform: `rotate(${d.rotate}deg)`,
            fontFamily: "'Space Mono', monospace",
            lineHeight: 1,
          }}>{d.text}</span>
      ))}
      {/* Sticky note — orange tint */}
      <div className="pointer-events-none absolute left-[6%] top-[18%] rotate-[-8deg]"
        style={{ width: 50, height: 46, background: `${color}22`, borderRadius: 3, opacity: 0.6 }}>
        <div style={{ height: 8, background: `${color}38`, borderRadius: "3px 3px 0 0" }} />
        <div style={{ margin: "6px 6px 0", height: 2, background: `${color}30`, borderRadius: 2 }} />
        <div style={{ margin: "4px 6px 0", height: 2, background: `${color}20`, borderRadius: 2 }} />
      </div>
      {/* Sticky note — yellow */}
      <div className="pointer-events-none absolute right-[6%] top-[22%] rotate-[6deg]"
        style={{ width: 46, height: 42, background: "rgba(255,220,80,0.15)", borderRadius: 3, opacity: 0.55 }}>
        <div style={{ height: 7, background: "rgba(255,200,40,0.25)", borderRadius: "3px 3px 0 0" }} />
        <div style={{ margin: "5px 5px 0", height: 2, background: "rgba(255,200,40,0.2)", borderRadius: 2 }} />
      </div>
      {/* Page fold bottom-right */}
      <div className="pointer-events-none absolute bottom-0 right-0" style={{
        width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 36px 36px",
        borderColor: `transparent transparent rgba(255,255,255,0.07) transparent`,
      }} />
      {/* Checkmark doodle */}
      <svg className="absolute bottom-[18%] left-[7%]" width="28" height="20"
        viewBox="0 0 28 20" fill="none" style={{ opacity: 0.3 }}>
        <path d="M3 10 L10 17 L25 3" stroke={color} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

// ─── Professional stage deco: dashboard + productivity visuals ─────────────
function ProfessionalDecorations({ color }: { color: string }) {
  const bars = [38, 55, 42, 68, 50, 72, 44];
  return (
    <>
      {/* Subtle grid */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 540"
        preserveAspectRatio="none" style={{ opacity: 0.055 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2="400" y1={i * 40} y2={i * 40}
            stroke={color} strokeWidth="0.55" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="540"
            stroke={color} strokeWidth="0.55" />
        ))}
      </svg>
      {/* Mini dashboard — top right */}
      <div className="pointer-events-none absolute right-[6%] top-[7%]"
        style={{
          width: 76, height: 56, background: "rgba(0,0,0,0.50)",
          borderRadius: 9, border: `1px solid ${color}28`, padding: "7px 8px",
        }}>
        <div style={{ fontSize: 6.5, color, opacity: 0.55, fontFamily: "monospace",
          letterSpacing: "0.06em", marginBottom: 5 }}>FOCUS SCORE</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 30 }}>
          {bars.map((h, i) => (
            <motion.div key={i}
              initial={{ height: 0 }}
              animate={{ height: h * 0.36 }}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 6, background: i === 5 ? color : `${color}50`, borderRadius: 2, flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
      {/* Calendar block — top left */}
      <div className="pointer-events-none absolute left-[5%] top-[9%]"
        style={{
          width: 62, height: 64, background: "rgba(0,0,0,0.45)",
          borderRadius: 9, border: `1px solid ${color}20`, padding: "6px 7px",
        }}>
        <div style={{ fontSize: 6.5, color, opacity: 0.5, fontFamily: "monospace",
          letterSpacing: "0.06em", marginBottom: 4 }}>CALENDAR</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2.5 }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} style={{
              height: 7, borderRadius: 2,
              background: i === 7 || i === 8 ? color : "rgba(255,255,255,0.07)",
            }} />
          ))}
        </div>
      </div>
      {/* Deep work indicator — bottom left */}
      <div className="pointer-events-none absolute bottom-[9%] left-[6%]"
        style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <motion.div
          style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }}
          animate={{ opacity: [1, 0.28, 1] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        />
        <span style={{ fontSize: 8.5, color, opacity: 0.5, fontFamily: "monospace",
          letterSpacing: "0.07em" }}>DEEP WORK</span>
      </div>
      {/* Timeline — bottom right */}
      <div className="pointer-events-none absolute bottom-[11%] right-[6%]"
        style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {["09:00 — standup", "11:30 — sprint", "14:00 — ship"].map((t, i) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              background: i === 0 ? color : "rgba(255,255,255,0.12)",
              border: `1px solid ${color}50`,
            }} />
            <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.35)",
              fontFamily: "monospace" }}>{t}</span>
          </div>
        ))}
      </div>
      {/* Meeting icon — mid left */}
      <div className="pointer-events-none absolute left-[5%] top-[52%]"
        style={{ width: 38, height: 28, background: "rgba(0,0,0,0.38)", borderRadius: 7,
          border: `1px solid ${color}18`, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 4 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%",
            background: `${color}${i === 1 ? "88" : "44"}` }} />
        ))}
      </div>
    </>
  );
}

// ─── Creator stage deco: particles + audio waves + creative sparks ─────────
function CreatorDecorations({ color }: { color: string }) {
  const waveHeights = [8, 18, 12, 24, 10, 22, 14, 20, 8, 16];
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 37 + 11) % 90,
    y: (i * 53 + 7)  % 88,
    s: 1.5 + (i % 4) * 1.1,
    dur: 2.8 + (i % 5) * 1.0,
    del: (i * 0.36) % 4.2,
    drop: i % 4 === 0,
  }));
  return (
    <>
      {/* Ink splash overlay */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: `radial-gradient(ellipse 55% 42% at 18% 82%, ${color}16 0%, transparent 68%),
                     radial-gradient(ellipse 42% 38% at 88% 12%, ${color}12 0%, transparent 62%)`,
      }} />
      {/* Floating pink particles */}
      {particles.map((p, i) => (
        <motion.div key={i} className="pointer-events-none absolute"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.drop ? p.s * 2.2 : p.s,
            background: color,
            borderRadius: p.drop ? "50% 50% 50% 0" : "50%",
            opacity: 0.32,
          }}
          animate={{ y: [-9, 9, -9], opacity: [0.12, 0.42, 0.12] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Audio waveform — bottom left */}
      <svg className="absolute bottom-[9%] left-[4%]" width="68" height="34"
        viewBox="0 0 68 34" fill="none" style={{ opacity: 0.35 }}>
        {[4, 11, 18, 25, 32, 39, 46, 53, 60].map((x, i) => (
          <motion.rect key={x} x={x} width="5" rx="2.5" fill={color}
            animate={{
              height: [waveHeights[i], waveHeights[i] * 0.35, waveHeights[i]],
              y: [17 - waveHeights[i] / 2, 17 - waveHeights[i] * 0.175, 17 - waveHeights[i] / 2],
            }}
            transition={{ duration: 0.55 + i * 0.08, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
          />
        ))}
      </svg>
      {/* Music notes */}
      <span className="pointer-events-none absolute right-[8%] top-[8%] select-none"
        style={{ fontSize: 24, color, opacity: 0.32 }}>♪</span>
      <span className="pointer-events-none absolute left-[9%] top-[15%] select-none"
        style={{ fontSize: 17, color, opacity: 0.22 }}>♫</span>
      <span className="pointer-events-none absolute right-[12%] bottom-[22%] select-none"
        style={{ fontSize: 14, color, opacity: 0.20 }}>♩</span>
      {/* Sketch stroke — bottom right */}
      <svg className="absolute right-[5%] bottom-[13%]" width="54" height="44"
        viewBox="0 0 54 44" fill="none" style={{ opacity: 0.28 }}>
        <path d="M4 34 Q14 8 24 22 Q34 36 46 10"
          stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M7 40 Q17 26 28 32"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55" />
      </svg>
      {/* Camera lens ring */}
      <div className="pointer-events-none absolute left-[5%] bottom-[17%]" style={{
        width: 40, height: 40, borderRadius: "50%",
        border: `1.5px solid ${color}35`,
        background: `radial-gradient(circle at 36% 34%, ${color}22 0%, transparent 72%)`,
      }} />
      {/* Lightbulb sketch — top left with animated sparks */}
      <svg className="absolute left-[6%] top-[7%]" width="30" height="38"
        viewBox="0 0 30 38" fill="none" style={{ opacity: 0.30 }}>
        <path d="M8 17 Q8 8 15 7 Q22 8 22 17 Q22 22 18 25 L12 25 Q8 22 8 17Z"
          stroke={color} strokeWidth="1.6" fill="none" />
        <line x1="12" y1="25" x2="12" y2="29" stroke={color} strokeWidth="1.3" />
        <line x1="18" y1="25" x2="18" y2="29" stroke={color} strokeWidth="1.3" />
        <line x1="11" y1="29" x2="19" y2="29" stroke={color} strokeWidth="1.3" />
        <line x1="11" y1="33" x2="19" y2="33" stroke={color} strokeWidth="1.1" />
        {[
          { x1: 15, y1: 3, x2: 15, y2: 1, d: 0.3 },
          { x1: 23, y1: 5, x2: 25, y2: 3, d: 0.7 },
          { x1: 7,  y1: 5, x2: 5,  y2: 3, d: 1.1 },
        ].map((s, i) => (
          <motion.line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={color} strokeWidth="1.6" strokeLinecap="round"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: s.d }} />
        ))}
      </svg>
    </>
  );
}

// ─── Section background per persona ───────────────────────────────────────
function SectionBg({ persona }: { persona: string }) {
  if (persona === "student") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none"
        style={{ opacity: 0.032 }}>
        {Array.from({ length: 32 }, (_, i) => (
          <line key={i} x1="0%" x2="100%" y1={`${2 + i * 3.1}%`} y2={`${2 + i * 3.1}%`}
            stroke="#F56B00" strokeWidth="0.75" />
        ))}
      </svg>
    </div>
  );
  if (persona === "professional") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none"
        style={{ opacity: 0.028 }}>
        {Array.from({ length: 22 }, (_, i) => (
          <line key={`h${i}`} x1="0%" x2="100%" y1={`${i * 4.7}%`} y2={`${i * 4.7}%`}
            stroke="#00A896" strokeWidth="0.55" />
        ))}
        {Array.from({ length: 22 }, (_, i) => (
          <line key={`v${i}`} x1={`${i * 4.7}%`} y1="0%" x2={`${i * 4.7}%`} y2="100%"
            stroke="#00A896" strokeWidth="0.55" />
        ))}
      </svg>
    </div>
  );
  if (persona === "creator") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 62% 52% at 88% 18%, rgba(255,45,120,0.055) 0%, transparent 68%),
                     radial-gradient(ellipse 52% 62% at 8% 84%, rgba(255,45,120,0.045) 0%, transparent 62%)`,
      }} />
    </div>
  );
  return null;
}

// ─── ProductShowcase ───────────────────────────────────────────────────────
function ProductShowcase({
  product, persona,
}: {
  product: (typeof products)[keyof typeof products];
  persona: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX  = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]),   { stiffness: 280, damping: 28 });
  const rotY  = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 280, damping: 28 });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [28, 72]),  { stiffness: 180, damping: 24 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [28, 72]),  { stiffness: 180, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };

  const stageBg =
    persona === "student"      ? "linear-gradient(155deg, #1a0e02 0%, #0D0800 55%, #110900 100%)"
    : persona === "creator"    ? "linear-gradient(148deg, #1c0612 0%, #0E0208 55%, #18040f 100%)"
    : /* professional */         "linear-gradient(152deg, #020f0d 0%, #030F0D 58%, #041310 100%)";

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
      exit={{    opacity: 0, y: -30, filter: "blur(8px)"  }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_1fr] lg:gap-20"
    >
      {/* ── Pouch visual ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
        className="group relative flex items-center justify-center"
      >
        <div
          className="relative flex h-[440px] w-full items-center justify-center overflow-hidden rounded-[28px] md:h-[540px]"
          style={{ background: stageBg }}
        >
          {/* Persona-specific decorations */}
          {persona === "student"      && <StudentDecorations      color={product.color} />}
          {persona === "professional" && <ProfessionalDecorations color={product.color} />}
          {persona === "creator"      && <CreatorDecorations      color={product.color} />}

          {/* Wide ambient glow at base */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[65%] w-[90%] -translate-x-1/2 blur-[90px]"
            style={{ background: `${product.color}40` }} />
          {/* Tight glow directly behind pouch */}
          <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-[52%] w-[58%] -translate-x-1/2 blur-[56px]"
            style={{ background: `${product.color}58` }} />

          {/* Mouse-tracked glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `radial-gradient(ellipse 62% 58% at ${glowX}% ${glowY}%, ${product.colorSoft} 0%, transparent 70%)` }}
          />

          {/* Inset accent ring */}
          <div className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{ boxShadow: `inset 0 0 0 1px ${product.color}30` }} />

          {/* Pouch image — ~13% bigger than before */}
          <motion.div
            className="relative z-10 h-[93%] w-[76%]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src={product.image}
              alt={product.name.replace("\n", " ")}
              fill
              className="object-contain"
              style={{
                filter: `contrast(1.12) saturate(1.25) brightness(1.06)
                         drop-shadow(0 38px 76px rgba(0,0,0,0.96))
                         drop-shadow(0 0 52px ${product.color}68)
                         drop-shadow(0 18px 44px ${product.color}42)`,
              }}
              sizes="(max-width: 768px) 85vw, 42vw"
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Copy ── */}
      <div className="flex flex-col">
        <motion.p
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="label" style={{ color: product.color }}
        >{product.tagline}</motion.p>

        <motion.h3
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 whitespace-pre-line leading-none tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--theme-ink)",
          }}
        >{product.name}</motion.h3>

        <motion.p
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[380px] text-[16px] leading-[1.72]"
          style={{ color: "var(--theme-ink)", opacity: 0.65 }}
        >{product.desc}</motion.p>

        {/* Benefit-driven stats in 2×2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t pt-8"
          style={{ borderColor: "color-mix(in srgb, var(--theme-ink) 10%, transparent)" }}
        >
          {product.stats.map((s) => (
            <div key={s.label}>
              <p className="label" style={{ color: "var(--theme-ink)", opacity: 0.36 }}>{s.label}</p>
              <p className="mt-1 text-[18px] font-semibold tracking-tight"
                style={{ color: "var(--theme-ink)" }}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <motion.a href="#join"
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold text-white focusable"
            style={{ background: product.color, boxShadow: `0 8px 30px ${product.color}55` }}
          >
            Get yours
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor"
              strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </motion.a>
          <motion.a href="#why"
            whileHover={{ opacity: 1, y: -1 }}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[12px] font-semibold uppercase tracking-widest transition-all focusable"
            style={{
              borderColor: `${product.color}40`,
              color: product.color,
              background: `${product.color}0D`,
              opacity: 0.82,
            }}
          >
            See how it works
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Products ──────────────────────────────────────────────────────────────
export default function Products() {
  const { persona } = usePersona();
  const product = persona ? products[persona] : null;

  const headlines: Record<string, string> = {
    student:      "Your exam season fuel.",
    professional: "Built for peak output.",
    creator:      "Fuel your creative flow.",
  };

  return (
    <section id="products" className="section relative overflow-hidden">
      <AnimatePresence>{persona && <SectionBg key={persona} persona={persona} />}</AnimatePresence>

      <div className="container-x relative">
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
              <AnimatePresence mode="wait">
                <motion.span
                  key={persona ?? "default"}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {persona ? headlines[persona] : "Made for you."}
                </motion.span>
              </AnimatePresence>
            </h2>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {product ? (
            <ProductShowcase key={product.id} product={product} persona={persona!} />
          ) : (
            <motion.p
              key="no-persona"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
