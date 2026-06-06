"use client";

import { AnimatePresence, motion } from "framer-motion";
import Sticker from "@/components/Sticker";
import Reveal from "@/components/Reveal";
import { DoodleIcon } from "@/components/Doodles";
import { benefits } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const collage = [
  { text: "No sugar",          tone: "crema"  as const, className: "left-0 top-6",    rotate: -9 },
  { text: "Speciality",        tone: "paper"  as const, className: "right-2 top-2",   rotate:  7 },
  { text: "No machine",        tone: "sage"   as const, className: "right-0 top-28",  rotate: -5 },
  { text: "No preservatives",  tone: "paper"  as const, className: "left-2 top-32",   rotate:  8 },
  { text: "Stir & sip",        tone: "clay"   as const, className: "left-6 bottom-10",rotate: -7 },
  { text: "3-sec stir",        tone: "paper"  as const, className: "right-4 bottom-8",rotate:  6 },
];

const personaVideos: Record<string, string> = {
  creator:      "/animation-creator.mp4",
  student:      "/animation-student.mp4",
  professional: "/animation-proffesional.mp4",
};

const defaultContent = {
  headline: "Good coffee shouldn't need a machine.",
  sub: "Just cold-extracted coffee and water, bottled at peak flavour. No sugar, no preservatives, no fuss — only the good part of your café order.",
};

export default function WhyInhaus() {
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].why : defaultContent;
  const videoSrc = persona ? personaVideos[persona] : null;

  return (
    <section id="why" className="section section-dark">
      <div className="container-x grid items-center gap-12 md:grid-cols-2">

        {/* ── Video / placeholder ── */}
        <Reveal className="relative mx-auto flex h-[380px] w-full max-w-sm items-center justify-center md:order-2">
          <AnimatePresence mode="wait">
            {videoSrc ? (
              /* Persona video — blends into dark section via mix-blend-mode screen */
              <motion.div
                key={videoSrc}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
                exit={{    opacity: 0, scale: 0.96,  filter: "blur(8px)"  }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  maskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, black 50%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, black 50%, transparent 100%)",
                }}
              >
                <video
                  key={videoSrc}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              </motion.div>
            ) : (
              /* No persona — show sticker collage placeholder */
              <motion.div
                key="placeholder"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{    opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="absolute inset-0 rounded-[36px]"
                  style={{ background: "radial-gradient(120% 120% at 50% 20%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.20) 100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="label text-center opacity-30" style={{ color: "var(--theme-dark-ink)" }}>
                    Select a persona<br />to see your blend
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stickers always float above */}
          {collage.map((s) => (
            <Sticker key={s.text} className={`absolute z-20 ${s.className}`} rotate={s.rotate} tone={s.tone}>
              {s.text}
            </Sticker>
          ))}
        </Reveal>

        {/* ── Copy + benefits ── */}
        <Reveal className="md:order-1">
          <p className="label opacity-60" style={{ color: "var(--theme-dark-accent)" }}>Why INHAUS</p>
          <h2 className="mt-3 font-serif text-[34px] font-normal leading-[1.02] tracking-tight md:text-[52px]">
            {c.headline}
          </h2>
          <p className="mt-4 max-w-md opacity-65">{c.sub}</p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/20"
                  style={{ color: "var(--theme-dark-accent)" }}
                >
                  <DoodleIcon name={b.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm opacity-85">{b.title}</span>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
