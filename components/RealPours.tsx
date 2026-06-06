"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Cup, Bean, Steam, Drop } from "@/components/Doodles";

const scenes = [
  { caption: "morning pour",        grad: "from-[#EFE2CC] to-[#E3D2B8]", Icon: Steam, rotate: 0  },
  { caption: "iced black, no rules", grad: "from-[#E7D6BE] to-[#D9C3A0]", Icon: Cup,   rotate: -2 },
  { caption: "latte at the counter", grad: "from-[#F0E3CD] to-[#E3D2B8]", Icon: Drop,  rotate: 2  },
  { caption: "beans, always whole",  grad: "from-[#E9D8C0] to-[#DDC8A6]", Icon: Bean,  rotate: -1 },
];

export default function RealPours() {
  return (
    <section className="section bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="Real pours"
          title="Not a photoshoot. Just how we drink it."
        />
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible">
          {scenes.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.07} variant="zoom" className="shrink-0 snap-start basis-[78%] sm:basis-[45%] md:basis-auto">
              <motion.figure
                whileHover={{ y: -8, rotate: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ rotate: s.rotate }}
              >
                <motion.div
                  className={`relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-espresso/10 bg-gradient-to-b ${s.grad} shadow-soft`}
                  whileHover={{ boxShadow: "0 24px 60px rgba(0,0,0,0.14)" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <s.Icon className="h-20 w-20 text-espresso/40" />
                  </motion.div>
                </motion.div>
                <figcaption className="label mt-3 text-center text-espresso/50">
                  [ {s.caption} ]
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
