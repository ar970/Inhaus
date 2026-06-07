"use client";

import { FormEvent, useState } from "react";
import { Arrow, Sparkle } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const defaultContent = {
  headline: "Get 10% off your first pour.",
  sub: "Join the list for the discount, brew ideas, and first dibs on new roasts.",
};

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].newsletter : defaultContent;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="join" className="section">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-[28px] px-6 py-14 text-center md:px-12 md:py-20"
          style={{ background: "var(--theme-accent)", color: "var(--theme-bg)" }}
        >
          <Sparkle className="absolute left-8 top-8 h-6 w-6 opacity-30" />
          <Sparkle className="absolute bottom-10 right-10 h-8 w-8 opacity-20" />

          <p className="label opacity-70">Welcome gift</p>
          <h2 className="mx-auto mt-3 max-w-xl font-serif text-[32px] font-normal leading-tight md:text-[48px]">
            {c.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-md opacity-80">{c.sub}</p>

          {/* Coupon callout */}
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ background: "rgba(0,0,0,0.15)" }}>
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-90">
              Use coupon <strong className="font-bold tracking-widest">WELCOME10</strong> to get 10% off
            </span>
          </div>

          {submitted ? (
            <p className="mx-auto mt-8 max-w-md font-serif text-xl italic">
              You&apos;re in — check your inbox for the code. ☕
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="focusable h-12 w-full rounded-pill border border-current/25 bg-current/10 px-5 placeholder:opacity-50 focus-visible:ring-offset-2"
                style={{ color: "var(--theme-bg)" }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="focusable flex h-12 w-12 shrink-0 items-center justify-center rounded-pill transition-transform duration-150 hover:-translate-y-0.5"
                style={{ background: "var(--theme-bg)", color: "var(--theme-ink)" }}
              >
                <Arrow className="h-4 w-6" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
