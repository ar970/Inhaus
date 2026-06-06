"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const scenes = [
  { caption: "morning pour",         image: "/morning pour.png",          rotate: 0  },
  { caption: "iced black, no rules", image: "/iced balck.png",            rotate: -2 },
  { caption: "latte at the counter", image: "/latte at the counter.png",  rotate: 2  },
  { caption: "beans, always whole",  image: "/beans.always whole.png",    rotate: -1 },
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
                  className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[20px] border border-espresso/10 shadow-soft"
                  whileHover={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
                >
                  <Image
                    src={s.image}
                    alt={s.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 25vw"
                  />
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
