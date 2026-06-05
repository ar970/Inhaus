"use client";

import { Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

export default function AnnouncementBar() {
  const { persona } = usePersona();
  const text = persona ? personaContent[persona].announcement : "Free shipping over ₹999 · Welcome gift: 10% off your first pour";

  return (
    <div className="bg-espresso text-oat">
      <div className="container-x flex items-center justify-center gap-3 py-2 text-center">
        <span className="label">{text}</span>
        <Sparkle className="h-3 w-3 text-crema" />
      </div>
    </div>
  );
}
