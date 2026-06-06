"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { usePersona } from "@/context/PersonaContext";
import { personaThemes } from "@/lib/personas";
import Nav from "@/components/Nav";

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const SHIPPING = 49;
const FREE_SHIPPING_THRESHOLD = 599;

export default function CheckoutPage() {
  const { state, dispatch, total } = useCart();
  const { persona } = usePersona();
  const accent = personaThemes[persona ?? "student"].accent;
  const router = useRouter();

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (form.pincode.length !== 6) e.pincode = "6-digit pincode required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // Simulate order processing
    await new Promise(r => setTimeout(r, 1500));

    const orderId = "INH" + Date.now().toString().slice(-6);
    dispatch({ type: "CLEAR" });
    router.push(`/order-confirmed?id=${orderId}&name=${encodeURIComponent(form.name)}`);
  }

  function Field({ id, label, half }: { id: keyof typeof form; label: string; half?: boolean }) {
    return (
      <div className={half ? "col-span-1" : "col-span-2"}>
        <label className="mb-1 block text-xs opacity-50">{label}</label>
        <input
          type={id === "email" ? "email" : id === "phone" ? "tel" : "text"}
          value={form[id]}
          onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrors(er => ({ ...er, [id]: "" })); }}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: "rgba(128,128,128,0.06)",
            borderColor: errors[id] ? "#ef4444" : "rgba(128,128,128,0.2)",
          }}
          onFocus={e => (e.target.style.borderColor = accent)}
          onBlur={e => (e.target.style.borderColor = errors[id] ? "#ef4444" : "rgba(128,128,128,0.2)")}
        />
        {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg, #FFF2DC)", color: "var(--ink, #1E0C04)" }}>
        <Nav />
        <div className="flex flex-col items-center justify-center gap-6 py-32">
          <p className="font-serif text-2xl opacity-50">Your cart is empty</p>
          <Link href="/#products" className="rounded-full px-8 py-3 text-sm font-medium text-white" style={{ background: accent }}>
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg, #FFF2DC)", color: "var(--ink, #1E0C04)" }}>
      <Nav />

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium md:text-4xl">Checkout</h1>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_380px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Contact */}
            <section>
              <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Contact</h2>
              <div className="grid grid-cols-2 gap-3">
                <Field id="name" label="Full name" />
                <div className="col-span-1"><Field id="email" label="Email" half /></div>
                <div className="col-span-1"><Field id="phone" label="Phone" half /></div>
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Delivery address</h2>
              <div className="grid grid-cols-2 gap-3">
                <Field id="address" label="Address" />
                <div className="col-span-1"><Field id="city" label="City" half /></div>
                <div className="col-span-1"><Field id="state" label="State" half /></div>
                <div className="col-span-1"><Field id="pincode" label="Pincode" half /></div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Payment</h2>
              <div className="flex flex-col gap-2">
                {[
                  { id: "cod", label: "Cash on delivery", desc: "Pay when your order arrives" },
                  { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                  { id: "card", label: "Credit / Debit card", desc: "Visa, Mastercard, RuPay" },
                ].map(p => (
                  <label
                    key={p.id}
                    className="flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3 transition-all"
                    style={{
                      borderColor: form.paymentMethod === p.id ? accent : "rgba(128,128,128,0.2)",
                      background: form.paymentMethod === p.id ? `${accent}10` : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={p.id}
                      checked={form.paymentMethod === p.id}
                      onChange={() => setForm(f => ({ ...f, paymentMethod: p.id }))}
                      className="accent-current"
                      style={{ accentColor: accent }}
                    />
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-xs opacity-50">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <motion.button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full py-4 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: accent }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Placing order…" : `Place order — ${formatPrice(grandTotal)}`}
            </motion.button>
          </form>

          {/* Order summary */}
          <div className="h-fit rounded-3xl border border-current/8 p-6" style={{ background: "rgba(128,128,128,0.04)" }}>
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Order summary</h2>
            <div className="flex flex-col gap-4 mb-5">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: accent }}>
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs opacity-50">{item.variant}</p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-current/10 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Shipping</span>
                <span>{shipping === 0 ? <span style={{ color: accent }}>Free</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs opacity-40">Add {formatPrice(FREE_SHIPPING_THRESHOLD - total)} more for free shipping</p>
              )}
              <div className="flex justify-between font-medium mt-2 border-t border-current/10 pt-3">
                <span>Total</span>
                <span className="font-serif text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
