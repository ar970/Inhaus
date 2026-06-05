"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaContent, personaThemes, type Persona } from "@/lib/personas";

const all: Persona[] = ["student", "creator", "professional"];

export default function PersonaSwitcher() {
  const { persona, setPersona, resetPersona } = usePersona();
  const [open, setOpen] = useState(false);

  if (!persona) return null;

  const current = personaContent[persona];
  const theme = personaThemes[persona];

  function select(p: Persona) {
    setPersona(p);
    setOpen(false);
  }

  function handleReset() {
    resetPersona();
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 overflow-hidden rounded-[18px] border border-white/20 bg-[#0E0B09] p-2 shadow-lift"
          >
            {all.map((p) => {
              const t = personaThemes[p];
              const c = personaContent[p];
              const active = p === persona;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => select(p)}
                  className="flex w-full items-center gap-3 rounded-[12px] px-4 py-2.5 text-left transition-colors hover:bg-white/8"
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: t.accent, opacity: active ? 1 : 0.4 }}
                  />
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest"
                    style={{ color: active ? "#FFFFFF" : "rgba(255,255,255,0.45)" }}
                  >
                    {c.mono}
                  </span>
                  {active && (
                    <span className="ml-auto font-mono text-[10px] text-white/30">✓</span>
                  )}
                </button>
              );
            })}
            <div className="mx-3 my-1 border-t border-white/10" />
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center gap-3 rounded-[12px] px-4 py-2.5 text-left transition-colors hover:bg-white/8"
            >
              <span className="h-3 w-3 shrink-0 rounded-full bg-white/20" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/35">
                Change persona
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-pill border border-white/20 bg-[#0E0B09] px-4 py-2.5 shadow-lift transition-all hover:border-white/30"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: theme.accent }}
        />
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
          {current.mono}
        </span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
    </div>
  );
}
