"use client";

import { FormEvent, useState } from "react";
import { Arrow, Sparkle } from "@/components/Doodles";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-clay px-6 py-14 text-center text-oat md:px-12 md:py-20">
          <Sparkle className="absolute left-8 top-8 h-6 w-6 text-oat/30" />
          <Sparkle className="absolute bottom-10 right-10 h-8 w-8 text-oat/20" />

          <p className="label text-oat/70">Welcome gift</p>
          <h2 className="mx-auto mt-3 max-w-xl font-serif text-[32px] font-normal leading-tight md:text-[48px]">
            Get 10% off your first pour.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-oat/80">
            Join the list for the discount, brew ideas, and first dibs on new roasts.
          </p>

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
                placeholder="you@email.com"
                aria-label="Email address"
                className="focusable h-12 w-full rounded-pill border border-oat/25 bg-oat/10 px-5 text-oat placeholder:text-oat/50 focus-visible:ring-offset-clay"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="focusable flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-oat text-espresso transition-transform duration-150 hover:-translate-y-0.5 focus-visible:ring-offset-clay"
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
