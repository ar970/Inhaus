"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { type Persona, personaThemes } from "@/lib/personas";

interface PersonaContextValue {
  persona: Persona | null;
  setPersona: (p: Persona) => void;
  resetPersona: () => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

function applyTheme(p: Persona | null) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (!p) {
    root.removeAttribute("data-persona");
    return;
  }
  root.setAttribute("data-persona", p);
  const t = personaThemes[p];
  root.style.setProperty("--theme-bg", t.bg);
  root.style.setProperty("--theme-surface", t.surface);
  root.style.setProperty("--theme-ink", t.ink);
  root.style.setProperty("--theme-accent", t.accent);
  root.style.setProperty("--theme-accent-soft", t.accentSoft);
  root.style.setProperty("--theme-accent-2", t.accentSecondary);
  /* dark-section tokens */
  const darkBgs: Record<string, [string, string]> = {
    student:      ["#1E0C04", "#FFF2DC"],
    creator:      ["#0E0208", "#FFE8F2"],
    professional: ["#050D1F", "#EEF2F8"],
  };
  const [dbg, dink] = darkBgs[p] ?? ["#1C0E06", "#F5EBD8"];
  root.style.setProperty("--theme-dark-bg", dbg);
  root.style.setProperty("--theme-dark-ink", dink);
  root.style.setProperty("--theme-dark-accent", t.accent);
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  /*
   * The gate is shown on EVERY visit by design — persona always starts null,
   * so the "Who are you?" screen appears each time the site is opened.
   * The choice lives only in memory for the current session.
   */
  const [persona, setPersonaState] = useState<Persona | null>(null);

  /* Ensure any previously-applied theme is cleared on a fresh load */
  useEffect(() => {
    applyTheme(null);
  }, []);

  function setPersona(p: Persona) {
    setPersonaState(p);
    applyTheme(p);
  }

  function resetPersona() {
    setPersonaState(null);
    applyTheme(null);
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona, resetPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used inside <PersonaProvider>");
  return ctx;
}
