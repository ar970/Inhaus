"use client";

import { Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

export default function AnnouncementBar() {
  const { persona } = usePersona();
  const text = persona ? personaContent[persona].announcement : "Free shipping over ₹999 · Welcome gift: 10% off your first pour";

  return (
    <div className="section-dark">
      <div className="container-x flex items-center justify-center gap-3 py-2.5 text-center">
        <span className="label opacity-70">{text}</span>
        <Sparkle className="h-2.5 w-2.5 opacity-50" style={{ color: "var(--theme-dark-accent)" }} />
      </div>
    </div>
  );
}
