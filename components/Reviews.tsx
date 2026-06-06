"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Stars } from "@/components/Doodles";
import { reviews as defaultReviews } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

export default function Reviews() {
  const { persona } = usePersona();
  const reviewList = persona ? personaContent[persona].reviews : defaultReviews;

  return (
    <section id="reviews" className="section overflow-hidden bg-oat">
      <div className="container-x">
        <Reveal>
          <p className="label text-crema">The verdict</p>
          <h2 className="mt-3 font-serif text-[38px] font-normal leading-none tracking-tight md:text-[58px]">
            4.9&thinsp;/&thinsp;5 from<br className="hidden md:block" /> 2,000+ pours
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviewList.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1} variant="blur">
              <motion.div
                className="card relative flex h-full cursor-default flex-col overflow-hidden p-7"
                whileHover={{ y: -7, boxShadow: "0 24px 60px rgba(0,0,0,0.11)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="pointer-events-none absolute -top-3 right-5 select-none font-serif text-[110px] leading-none opacity-[0.05]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <Stars />
                <blockquote className="relative z-10 mt-5 flex-1 font-serif text-[20px] italic leading-[1.45] tracking-tight text-espresso/90">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <div className="mt-7 flex items-center gap-3 border-t border-espresso/8 pt-5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-oat"
                    style={{ background: "var(--theme-accent)" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold">{r.name}</div>
                    <div className="label mt-0.5 text-espresso/45">{r.role}</div>
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
