"use client";

import { Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";
import { marqueeItems as defaultItems } from "@/lib/data";

export default function Marquee() {
  const { persona } = usePersona();
  const rawItems = persona ? personaContent[persona].marquee : defaultItems;
  const items = [...rawItems, ...rawItems];

  return (
    <div className="group overflow-hidden border-y border-espresso/15 bg-espresso py-3 text-oat">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="label flex items-center gap-6 px-6">
            {item}
            <Sparkle className="h-3 w-3 text-crema" />
          </span>
        ))}
      </div>
    </div>
  );
}
