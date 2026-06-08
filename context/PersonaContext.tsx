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
    student:      ["#0F0400", "#FFF2DC"],
    creator:      ["#0E0208", "#FFE8F2"],
    professional: ["#020B14", "#EEF2F8"],
  };
  const [dbg, dink] = darkBgs[p] ?? ["#1C0E06", "#F5EBD8"];
  root.style.setProperty("--theme-dark-bg", dbg);
  root.style.setProperty("--theme-dark-ink", dink);
  root.style.setProperty("--theme-dark-accent", t.accent);
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(null);

  /* Clear theme on fresh load */
  useEffect(() => {
    applyTheme(null);
  }, []);

  /* Back button: when browser navigates back, return to the gate */
  useEffect(() => {
    const onPopState = () => {
      setPersonaState(null);
      applyTheme(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function setPersona(p: Persona) {
    /* Push a history entry so the back button returns to the gate */
    window.history.pushState({ persona: p }, "");
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
