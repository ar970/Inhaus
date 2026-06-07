"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { type Recipe } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";

interface Props {
  drink: { name: string; mood: string; time: string; image: string; recipe: Recipe } | null;
  onClose: () => void;
}

export default function DrinkModal({ drink, onClose }: Props) {
  const { persona } = usePersona();

  const accent =
    persona === "student"        ? "#F56B00"
    : persona === "creator"      ? "#FF2D78"
    : persona === "professional" ? "#00A896"
    : "#C8761E";

  /* Close on Escape */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  /* Lock scroll while open */
  useEffect(() => {
    if (drink) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drink]);

  return (
    <AnimatePresence>
      {drink && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1000] bg-black/60"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[1001] mx-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] md:inset-0 md:m-auto md:h-auto md:max-h-[88vh] md:rounded-[28px]"
            style={{ background: "var(--theme-bg)" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pb-1 pt-3 md:hidden">
              <div className="h-1 w-10 rounded-full"
                style={{ background: "color-mix(in srgb, var(--theme-ink) 18%, transparent)" }} />
            </div>

            {/* Hero image */}
            <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-64">
              <Image src={drink.image} alt={drink.name} fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, var(--theme-bg) 0%, transparent 55%)" }} />
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full focusable"
                style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}
                aria-label="Close"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor"
                  strokeWidth={2.2} strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-2 md:px-8" style={{ WebkitOverflowScrolling: "touch" }}>

              {/* Name + mood */}
              <p className="label" style={{ color: accent }}>{drink.mood} · {drink.time}</p>
              <h2 className="mt-1 text-[32px] font-bold leading-tight tracking-tight md:text-[38px]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--theme-ink)" }}>
                {drink.name}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed"
                style={{ color: "var(--theme-ink)", opacity: 0.62 }}>
                {drink.recipe.description}
              </p>

              {/* Divider */}
              <div className="my-6 h-px"
                style={{ background: "color-mix(in srgb, var(--theme-ink) 9%, transparent)" }} />

              {/* Ingredients */}
              <p className="label mb-4" style={{ color: "var(--theme-ink)", opacity: 0.42 }}>Ingredients</p>
              <ul className="flex flex-col gap-2.5">
                {drink.recipe.ingredients.map((ing) => (
                  <li key={ing} className="flex items-center gap-3">
                    <span className="h-[2px] w-5 shrink-0 rounded-full"
                      style={{ background: accent }} />
                    <span className="text-[15px] font-medium"
                      style={{ color: "var(--theme-ink)" }}>{ing}</span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-6 h-px"
                style={{ background: "color-mix(in srgb, var(--theme-ink) 9%, transparent)" }} />

              {/* Steps */}
              <p className="label mb-4" style={{ color: "var(--theme-ink)", opacity: 0.42 }}>Steps</p>
              <ol className="flex flex-col gap-4">
                {drink.recipe.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                      style={{ background: accent }}
                    >{i + 1}</span>
                    <span className="pt-0.5 text-[15px] leading-relaxed"
                      style={{ color: "var(--theme-ink)", opacity: step.startsWith("(opt)") ? 0.52 : 0.82 }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
