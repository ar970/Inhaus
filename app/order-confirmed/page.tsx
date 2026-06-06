"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes } from "@/lib/personas";
import Nav from "@/components/Nav";
import { Suspense } from "react";

function OrderConfirmedInner() {
  const params = useSearchParams();
  const orderId = params.get("id") ?? "INH000000";
  const name = params.get("name") ?? "there";
  const { persona } = usePersona();
  const accent = personaThemes[persona ?? "student"].accent;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg, #FFF2DC)", color: "var(--ink, #1E0C04)" }}>
      <Nav />
      <main className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: `${accent}20` }}
        >
          <svg viewBox="0 0 32 32" fill="none" stroke={accent} strokeWidth={2.5} className="h-10 w-10">
            <path d="M6 16l7 7 13-13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4 max-w-md"
        >
          <h1 className="font-serif text-4xl font-medium md:text-5xl">Order placed.</h1>
          <p className="text-base opacity-60 leading-relaxed">
            Thanks {name.split(" ")[0]} — your order <span className="font-medium" style={{ color: accent }}>#{orderId}</span> is confirmed.
            We'll send you a confirmation on email and SMS.
          </p>

          <div className="mt-4 w-full rounded-2xl border border-current/10 p-5" style={{ background: "rgba(128,128,128,0.05)" }}>
            <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">What happens next</p>
            <div className="flex flex-col gap-3 text-sm text-left">
              {[
                { step: "1", text: "Order confirmed — you'll receive an email shortly" },
                { step: "2", text: "Packed and dispatched within 1–2 business days" },
                { step: "3", text: "Delivered to your door in 3–5 business days" },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: accent }}>
                    {s.step}
                  </span>
                  <span className="opacity-70">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-3 flex-wrap justify-center">
            <Link
              href="/"
              className="rounded-full px-8 py-3 text-sm font-semibold text-white"
              style={{ background: accent }}
            >
              Back to home
            </Link>
            <Link
              href="/#products"
              className="rounded-full border border-current/20 px-8 py-3 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              Shop more
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedInner />
    </Suspense>
  );
}
