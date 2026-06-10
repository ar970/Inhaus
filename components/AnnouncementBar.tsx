"use client";

import { Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

export default function AnnouncementBar() {
  const { persona } = usePersona();
  const text = persona ? personaContent[persona].announcement : "Batch 001 — Limited to 200 bottles · Free shipping across India · Use code WELCOME10 for 10% off";

  return (
    <div className="section-dark">
      <div className="container-x flex items-center justify-center gap-3 py-2.5 text-center">
        <span className="label opacity-70">{text}</span>
        <Sparkle className="h-2.5 w-2.5 opacity-50" style={{ color: "var(--theme-dark-accent)" }} />
      </div>
    </div>
  );
}
