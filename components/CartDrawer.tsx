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

export default function CartDrawer() {
  const { state, dispatch, total, count } = useCart();
  const { persona } = usePersona();
  const accent = personaThemes[persona ?? "student"].accent;

  return (
    <AnimatePresence>
      {state.open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "CLOSE" })}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-[201] flex h-full w-full max-w-md flex-col"
            style={{ background: "var(--bg, #FFF2DC)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-current/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl font-medium">Your cart</span>
                {count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: accent }}>
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: "CLOSE" })}
                className="rounded-full p-1.5 opacity-50 transition-opacity hover:opacity-100"
                aria-label="Close cart"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 opacity-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-12 w-12">
                    <path d="M6 8h12l1 12H5z" /><path d="M9 8a3 3 0 0 1 6 0" />
                  </svg>
                  <p className="font-serif text-lg">Your cart is empty</p>
                  <button onClick={() => dispatch({ type: "CLOSE" })}
                    className="text-sm underline opacity-60">Keep browsing</button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {state.items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 rounded-2xl border border-current/8 p-4"
                      style={{ background: "rgba(128,128,128,0.05)" }}
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="font-serif text-base font-medium leading-tight">{item.name}</span>
                        <span className="text-xs opacity-50">{item.variant}</span>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: accent }}>
                            {formatPrice(item.price * item.qty)}
                          </span>
                          <div className="flex items-center gap-2 rounded-full border border-current/15 px-2 py-1">
                            <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })}
                              className="flex h-5 w-5 items-center justify-center text-lg leading-none opacity-60 hover:opacity-100">−</button>
                            <span className="w-4 text-center text-sm font-medium">{item.qty}</span>
                            <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })}
                              className="flex h-5 w-5 items-center justify-center text-lg leading-none opacity-60 hover:opacity-100">+</button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                        className="self-start opacity-30 transition-opacity hover:opacity-70"
                        aria-label="Remove"
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                          <path d="M3 3l10 10M13 3L3 13" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-current/10 px-6 py-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-60">Subtotal</span>
                  <span className="font-serif text-lg font-medium">{formatPrice(total)}</span>
                </div>
                <p className="text-xs opacity-40">Shipping & taxes calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={() => dispatch({ type: "CLOSE" })}
                  className="flex w-full items-center justify-center rounded-full py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: accent }}
                >
                  Checkout — {formatPrice(total)}
                </Link>
                <button
                  onClick={() => dispatch({ type: "CLOSE" })}
                  className="text-center text-sm opacity-40 hover:opacity-70 transition-opacity"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
