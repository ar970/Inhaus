"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { type Persona, personaThemes } from "@/lib/personas";

interface PersonaContextValue {
  persona: Persona | null;
  setPersona: (p: Persona) => void;
  resetPersona: () => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

const STORAGE_KEY = "inhaus-persona";

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
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Persona | null;
    const valid: Persona[] = ["student", "creator", "professional"];
    const p = stored && valid.includes(stored) ? stored : null;
    setPersonaState(p);
    applyTheme(p);
    setReady(true);
  }, []);

  function setPersona(p: Persona) {
    localStorage.setItem(STORAGE_KEY, p);
    setPersonaState(p);
    applyTheme(p);
  }

  function resetPersona() {
    localStorage.removeItem(STORAGE_KEY);
    setPersonaState(null);
    applyTheme(null);
  }

  /* Suppress flash of wrong theme */
  if (!ready) return null;

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
