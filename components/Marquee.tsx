"use client";

import { Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";
import { marqueeItems as defaultItems } from "@/lib/data";

export default function Marquee() {
  const { persona } = usePersona();
  const rawItems = persona ? personaContent[persona].marquee : defaultItems;
  const items = [...rawItems, ...rawItems, ...rawItems];

  return (
    <div className="section-dark group overflow-hidden py-4">
      <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-8">
            <span
              className="font-serif text-[15px] tracking-[0.06em] opacity-80"
              style={{ color: "var(--theme-dark-ink)" }}
            >
              {item}
            </span>
            <Sparkle
              className="h-3 w-3 shrink-0 opacity-40"
              style={{ color: "var(--theme-dark-accent)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
