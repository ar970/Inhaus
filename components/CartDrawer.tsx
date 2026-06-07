"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes } from "@/lib/personas";

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const RECOMMENDED = [
  { name: "Study Fuel",   handle: "study-fuel",   image: "/product-study.jpeg",   price: 499, color: "#F04E12", persona: "Student" },
  { name: "Creator Fuel", handle: "creator-fuel", image: "/creator flow.jpeg", price: 499, color: "#FF2D78", persona: "Creator" },
  { name: "WorkFlow",     handle: "workflow",     image: "/product-workflow.jpeg", price: 499, color: "#00A896", persona: "Professional" },
];

export default function CartDrawer() {
  const { state, dispatch, total, count } = useCart();
  const { persona } = usePersona();
  const theme  = personaThemes[persona ?? "student"];
  const accent = theme.accent;

  /* Creator uses a dark bg — ensure ink is always legible */
  const bg  = theme.bg;
  const ink = theme.ink;

  return (
    <AnimatePresence>
      {state.open && (
        <>
          {/* Backdrop — 30% more blur for isolation */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dispatch({ type: "CLOSE" })}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-[201] flex h-full w-full max-w-[420px] flex-col"
            style={{ background: bg, color: ink }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* ── Header ── */}
            <div className="flex items-start justify-between border-b px-6 py-5"
              style={{ borderColor: `${ink}14` }}>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-xl font-medium" style={{ color: ink }}>
                    Your cart
                  </span>
                  {count > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: accent }}>
                      {count}
                    </span>
                  )}
                </div>
                {/* Trust signal */}
                <p className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: `${ink}70` }}>
                  <svg viewBox="0 0 16 16" className="h-3 w-3 flex-shrink-0" fill="none"
                    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7z"/>
                  </svg>
                  Free shipping across India · Ships in 2–5 days
                </p>
              </div>
              {/* Close — ~15% smaller (h-5→h-[17px]) */}
              <button
                onClick={() => dispatch({ type: "CLOSE" })}
                className="rounded-full p-1.5 transition-opacity hover:opacity-100"
                style={{ opacity: 0.45 }}
                aria-label="Close cart"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}
                  className="h-[17px] w-[17px]">
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5">

              {state.items.length === 0 ? (
                /* ── Empty state ── */
                <div className="flex flex-col gap-8">
                  {/* Brand-driven empty copy */}
                  <div className="flex flex-col items-center gap-3 pt-10 pb-2 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full"
                      style={{ background: `${accent}14` }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={1.4}
                        className="h-7 w-7">
                        <path d="M6 8h12l1 12H5z" /><path d="M9 8a3 3 0 0 1 6 0" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-xl font-medium leading-snug" style={{ color: ink }}>
                        Your next great cup<br />starts here.
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed"
                        style={{ color: `${ink}60` }}>
                        Explore Study Fuel, Creator Fuel, or Work Flow.
                      </p>
                    </div>
                  </div>

                  {/* Recommended for you */}
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: `${ink}50` }}>
                      Recommended for you
                    </p>
                    <div className="flex flex-col gap-2">
                      {RECOMMENDED.map(p => (
                        <Link
                          key={p.handle}
                          href={`/products/${p.handle}`}
                          onClick={() => dispatch({ type: "CLOSE" })}
                          className="flex items-center gap-3 rounded-2xl p-2.5 transition-opacity hover:opacity-80"
                          style={{ background: `${p.color}0C`, border: `1px solid ${p.color}18` }}
                        >
                          <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl"
                            style={{ background: `${p.color}18` }}>
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-[14px] font-medium leading-tight"
                                style={{ color: ink }}>
                                {p.name}
                              </span>
                              <span className="rounded-full px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-wide"
                                style={{ background: `${p.color}18`, color: p.color }}>
                                {p.persona}
                              </span>
                            </div>
                            <span className="text-[11px]" style={{ color: `${ink}55` }}>
                              From {formatPrice(p.price)}
                            </span>
                          </div>
                          <svg viewBox="0 0 16 16" className="h-4 w-4 flex-shrink-0"
                            fill="none" stroke={p.color} strokeWidth={1.8}
                            strokeLinecap="round" strokeLinejoin="round"
                            style={{ opacity: 0.7 }}>
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Subtotal at ₹0 */}
                  <div className="rounded-2xl p-4" style={{ background: `${ink}07` }}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: `${ink}65` }}>Subtotal</span>
                      <span className="font-serif text-base font-medium" style={{ color: ink }}>
                        {formatPrice(0)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px]" style={{ color: `${ink}45` }}>
                      Taxes & shipping calculated at checkout.
                    </p>
                  </div>
                </div>

              ) : (
                /* ── Items ── */
                <AnimatePresence>
                  <div className="flex flex-col gap-3.5">
                    {state.items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 rounded-2xl p-4"
                        style={{ background: `${ink}08`, border: `1px solid ${ink}0E` }}
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl"
                          style={{ background: `${accent}14` }}>
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <span className="font-serif text-base font-medium leading-tight"
                            style={{ color: ink }}>
                            {item.name}
                          </span>
                          <span className="text-xs" style={{ color: `${ink}55` }}>
                            {item.variant}
                          </span>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-sm font-semibold" style={{ color: accent }}>
                              {formatPrice(item.price * item.qty)}
                            </span>
                            <div className="flex items-center gap-2 rounded-full px-2 py-1"
                              style={{ border: `1px solid ${ink}18` }}>
                              <button
                                onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })}
                                className="flex h-5 w-5 items-center justify-center text-lg leading-none transition-opacity hover:opacity-100"
                                style={{ opacity: 0.55, color: ink }}>−</button>
                              <span className="w-4 text-center text-sm font-medium" style={{ color: ink }}>
                                {item.qty}
                              </span>
                              <button
                                onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })}
                                className="flex h-5 w-5 items-center justify-center text-lg leading-none transition-opacity hover:opacity-100"
                                style={{ opacity: 0.55, color: ink }}>+</button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                          className="self-start transition-opacity hover:opacity-70"
                          style={{ opacity: 0.28, color: ink }}
                          aria-label="Remove">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}
                            className="h-4 w-4">
                            <path d="M3 3l10 10M13 3L3 13" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="border-t px-6 py-5 flex flex-col gap-3.5"
              style={{ borderColor: `${ink}12` }}>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: `${ink}65` }}>Subtotal</span>
                <span className="font-serif text-lg font-medium" style={{ color: ink }}>
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-[11px]" style={{ color: `${ink}45` }}>
                Taxes & shipping calculated at checkout
              </p>

              {state.items.length > 0 ? (
                <>
                  <Link
                    href="/checkout"
                    onClick={() => dispatch({ type: "CLOSE" })}
                    className="flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: accent }}
                  >
                    Checkout — {formatPrice(total)}
                  </Link>
                  <button
                    onClick={() => dispatch({ type: "CLOSE" })}
                    className="text-center text-sm transition-opacity hover:opacity-70"
                    style={{ color: `${ink}50` }}
                  >
                    Continue shopping
                  </button>
                </>
              ) : (
                <Link
                  href="/#products"
                  onClick={() => dispatch({ type: "CLOSE" })}
                  className="flex w-full items-center justify-center rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: accent }}
                >
                  Find Your Fuel →
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
