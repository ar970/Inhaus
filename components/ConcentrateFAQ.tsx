"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { usePersona } from "@/context/PersonaContext";

const CARDS = [
  {
    q: "Is this the same as instant coffee?",
    a: "Not even close. Instant coffee is spray-dried powder — the process strips most of the flavour and aroma. INHAUS is brewed liquid concentrate made from speciality Arabica. It tastes like real coffee, because it is real coffee.",
  },
  {
    q: "Do I need any special equipment?",
    a: "Nothing at all. No espresso machine, no French press, no filter setup. Just the concentrate, a cup, and whatever liquid you have — milk, water, oat milk, anything. Pour, stir, done.",
  },
];

export default function ConcentrateFAQ() {
  const { persona } = usePersona();
  const accent =
    persona === "student"      ? "#F56B00"
    : persona === "creator"    ? "#FF2D78"
    : persona === "professional" ? "#00A896"
    : "var(--theme-dark-accent)";

  return (
    <section className="section-dark section">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-24">

          {/* ── Left: hero explainer ── */}
          <Reveal>
            <div>
              <p className="label mb-4" style={{ color: accent }}>
                What you&rsquo;re buying
              </p>
              <h2
                className="text-[28px] font-extrabold uppercase leading-tight tracking-tight md:text-[34px]"
                style={{ color: "var(--theme-dark-ink)" }}
              >
                What is liquid coffee concentrate?
              </h2>

              <p className="mt-6 text-[16px] leading-[1.78]"
                style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 68%, transparent)" }}>
                Liquid coffee concentrate is brewed coffee reduced down to its purest, most potent form. Think of it like the essence of espresso — but without the machine. A small amount goes a long way: just 15 ml of INHAUS makes a full café-style cup. No grinding, no brewing, no waiting.
              </p>

              <p className="mt-4 text-[16px] leading-[1.78]"
                style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 68%, transparent)" }}>
                It&rsquo;s new to most Indian homes, but it&rsquo;s been the quiet secret of specialty coffee lovers worldwide for years. Now it&rsquo;s yours.
              </p>

              {/* Accent divider */}
              <div
                className="mt-8 h-[2px] w-12 rounded-full"
                style={{ background: accent }}
              />
            </div>
          </Reveal>

          {/* ── Right: two FAQ cards ── */}
          <div className="flex flex-col gap-5">
            {CARDS.map((card, i) => (
              <Reveal key={card.q}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-6 md:p-7"
                  style={{
                    background: "color-mix(in srgb, var(--theme-dark-ink) 5%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--theme-dark-ink) 10%, transparent)",
                  }}
                >
                  <p
                    className="label mb-3"
                    style={{ color: accent }}
                  >
                    {card.q}
                  </p>
                  <p
                    className="text-[15px] leading-[1.72]"
                    style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 68%, transparent)" }}
                  >
                    {card.a}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
