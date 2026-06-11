"use client";

import { Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const SHORT_TEXT = "Free shipping · Use WELCOME10 for 10% off";

export default function AnnouncementBar() {
  const { persona } = usePersona();
  const full = persona ? personaContent[persona].announcement : "Limited to 200 bottles · Free shipping · Use code WELCOME10 for 10% off";

  return (
    <div className="section-dark">
      <div className="container-x flex items-center justify-center gap-3 py-2.5 text-center">
        <span className="label opacity-70 md:hidden">{SHORT_TEXT}</span>
        <span className="label opacity-70 hidden md:inline">{full}</span>
        <Sparkle className="h-2.5 w-2.5 opacity-50 shrink-0" style={{ color: "var(--theme-dark-accent)" }} />
      </div>
    </div>
  );
}
