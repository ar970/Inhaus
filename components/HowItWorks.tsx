"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { DoodleIcon } from "@/components/Doodles";
import { steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how" className="section overflow-hidden bg-oat">
      <div className="container-x">
        <Reveal>
          <p className="label text-crema">How it works</p>
          <h2 className="mt-3 font-serif text-[38px] font-normal leading-[1.0] tracking-tight md:text-[58px]">
            Pour. Add milk or water. Sip.
          </h2>
          <p className="mt-4 max-w-lg text-espresso/60">
            No grinder, no machine, no waiting. Good coffee shouldn&apos;t be complicated.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-0 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-espresso/8 md:block" />

          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12} variant="slide-up" className="relative px-0 pb-10 md:px-8 md:pb-0 md:first:pl-0 md:last:pr-0">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Ghost number */}
                <div
                  className="pointer-events-none select-none text-[88px] font-light leading-none tracking-tight opacity-[0.06] md:text-[110px]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--theme-accent)" }}
                  aria-hidden="true"
                >
                  0{step.n}
                </div>

                <div className="relative -mt-8 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-espresso/15 bg-paper text-espresso shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <DoodleIcon name={step.icon} className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-serif text-[22px] font-normal leading-tight">{step.title}</h3>
                <p className="mt-2 pr-4 text-sm leading-relaxed text-espresso/60">{step.copy}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
