"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { DoodleIcon } from "@/components/Doodles";
import { drinks } from "@/lib/data";

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" /><path d="M8 5v3l2 1.5" />
    </svg>
  );
}

export default function WhatCanYouMake() {
  return (
    <section id="make" className="section bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="What can you make?"
          title="One concentrate. Endless orders."
          subtitle="Hot or iced, comforting or indulgent — your whole café menu starts from a single pour."
        />
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
          {drinks.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.07} variant="zoom" className="shrink-0 snap-start basis-[70%] sm:basis-[40%] md:basis-auto">
              <motion.div
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border border-espresso/10 bg-oat"
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.13)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative flex h-44 items-center justify-center overflow-hidden"
                  style={{ background: "radial-gradient(130% 130% at 50% 10%, var(--theme-surface) 0%, var(--theme-accent-soft) 100%)" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.12, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DoodleIcon name={d.icon} className="h-16 w-16 text-espresso/50" />
                  </motion.div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="label text-crema">{d.mood}</span>
                  <h3 className="mt-2 font-serif text-xl leading-tight">{d.name}</h3>
                  <div className="mt-auto flex items-center gap-1.5 pt-4 text-espresso/50">
                    <ClockIcon className="h-3.5 w-3.5" />
                    <span className="label">{d.time}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
