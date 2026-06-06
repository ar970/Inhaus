"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { drinks } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor"
      strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" /><path d="M8 5v3l2 1.5" />
    </svg>
  );
}

function ArrowBtn({
  dir, onClick, disabled, accent,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  accent: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all focusable"
      style={{
        borderColor: disabled ? "color-mix(in srgb, var(--theme-ink) 10%, transparent)"
          : `${accent}55`,
        background: disabled ? "transparent" : `${accent}12`,
        color: disabled ? "color-mix(in srgb, var(--theme-ink) 25%, transparent)" : accent,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      aria-label={dir === "left" ? "Previous drinks" : "Next drinks"}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor"
        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <path d="M10 3L5 8l5 5" />
          : <path d="M6 3l5 5-5 5" />}
      </svg>
    </motion.button>
  );
}

const VISIBLE = 4; // cards visible at once on desktop

export default function WhatCanYouMake() {
  const { persona } = usePersona();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const maxPage = Math.ceil(drinks.length / VISIBLE) - 1;

  const accent =
    persona === "student"      ? "#F56B00"
    : persona === "creator"    ? "#FF2D78"
    : persona === "professional" ? "#00A896"
    : "var(--theme-accent)";

  const scroll = (dir: "left" | "right") => {
    const next = dir === "right" ? Math.min(page + 1, maxPage) : Math.max(page - 1, 0);
    setPage(next);
    if (scrollRef.current) {
      const cardW = scrollRef.current.scrollWidth / drinks.length;
      scrollRef.current.scrollTo({ left: next * VISIBLE * cardW, behavior: "smooth" });
    }
  };

  return (
    <section id="make" className="section overflow-hidden" style={{ background: "var(--theme-bg)" }}>
      <div className="container-x">

        {/* Header row with arrows */}
        <div className="flex items-end justify-between gap-4">
          <Reveal className="flex-1">
            <SectionHeading
              eyebrow="What can you make?"
              title="One concentrate. Endless orders."
              subtitle="Hot or iced, comforting or indulgent — your whole café menu starts from a single pour."
            />
          </Reveal>

          {/* Desktop arrows */}
          <div className="hidden shrink-0 items-center gap-2 pb-1 md:flex">
            <ArrowBtn dir="left"  onClick={() => scroll("left")}  disabled={page === 0}       accent={accent} />
            <ArrowBtn dir="right" onClick={() => scroll("right")} disabled={page === maxPage}  accent={accent} />
          </div>
        </div>

        {/* Cards */}
        <div className="relative mt-10">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {drinks.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % VISIBLE) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group shrink-0 snap-start basis-[72%] sm:basis-[44%] md:basis-[calc(25%-12px)]"
              >
                <motion.div
                  className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border"
                  style={{
                    borderColor: "color-mix(in srgb, var(--theme-ink) 9%, transparent)",
                    background: "var(--theme-surface)",
                  }}
                  whileHover={{ y: -8, boxShadow: `0 24px 56px rgba(0,0,0,0.14), 0 0 0 1px ${accent}28` }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Image area */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 25vw"
                    />
                    {/* Gradient overlay for text legibility */}
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)" }} />
                  </div>

                  {/* Copy */}
                  <div className="flex flex-1 flex-col p-4">
                    <span className="label" style={{ color: accent }}>{d.mood}</span>
                    <h3 className="mt-2 text-[18px] font-semibold leading-tight tracking-tight"
                      style={{ color: "var(--theme-ink)", fontFamily: "'Fraunces', Georgia, serif" }}>
                      {d.name}
                    </h3>
                    <div className="mt-auto flex items-center gap-1.5 pt-4"
                      style={{ color: "color-mix(in srgb, var(--theme-ink) 45%, transparent)" }}>
                      <ClockIcon className="h-3.5 w-3.5" />
                      <span className="label">{d.time}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="mt-5 flex items-center justify-between md:hidden">
            <div className="flex gap-2">
              <ArrowBtn dir="left"  onClick={() => scroll("left")}  disabled={page === 0}       accent={accent} />
              <ArrowBtn dir="right" onClick={() => scroll("right")} disabled={page === maxPage}  accent={accent} />
            </div>
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {Array.from({ length: maxPage + 1 }, (_, i) => (
                <button key={i} onClick={() => { setPage(i); scroll(i > page ? "right" : "left"); }}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === page ? 20 : 6,
                    background: i === page ? accent : "color-mix(in srgb, var(--theme-ink) 20%, transparent)",
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop dot indicators */}
          <div className="mt-6 hidden justify-center gap-1.5 md:flex">
            {Array.from({ length: maxPage + 1 }, (_, i) => (
              <button key={i}
                onClick={() => {
                  setPage(i);
                  if (scrollRef.current) {
                    const cardW = scrollRef.current.scrollWidth / drinks.length;
                    scrollRef.current.scrollTo({ left: i * VISIBLE * cardW, behavior: "smooth" });
                  }
                }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === page ? 24 : 6,
                  background: i === page ? accent : "color-mix(in srgb, var(--theme-ink) 18%, transparent)",
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
