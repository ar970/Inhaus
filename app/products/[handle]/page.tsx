"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProduct } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { usePersona } from "@/context/PersonaContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 flex-shrink-0">
      <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductPage() {
  const params = useParams();
  const handle = params?.handle as string;
  const productData = getProduct(handle);

  const { dispatch } = useCart();
  const { setPersona } = usePersona();
  const defaultVariant = productData?.variants.find(v => !v.comingSoon) ?? productData?.variants[0] ?? { id: "", name: "", price: 0, cups: 0, ml: 0 };
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!productData) { notFound(); return null; }
  const product = productData;
  const accent = product.color;

  function addToCart() {
    setPersona(product.persona);
    dispatch({
      type: "ADD",
      item: {
        id: selectedVariant.id,
        name: product.name,
        variant: selectedVariant.name,
        price: selectedVariant.price,
        qty: 1,
        image: product.image,
        persona: product.persona,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg, #FFF2DC)", color: "var(--ink, #1E0C04)" }}>
      <Nav />

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs opacity-40">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl aspect-square" style={{ background: `${accent}08` }}>
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <Image
                  src={product.images[activeImg]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Prev arrow */}
              <button
                onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-opacity hover:opacity-100"
                style={{ opacity: 0.65 }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M10 4L6 8l4 4" />
                </svg>
              </button>

              {/* Next arrow */}
              <button
                onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-opacity hover:opacity-100"
                style={{ opacity: 0.65 }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: i === activeImg ? 20 : 6, background: i === activeImg ? accent : `${accent}40` }}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}>
                INHAUS
              </p>
              <h1 className="font-serif text-4xl font-medium leading-tight md:text-5xl">{product.name}</h1>
              <p className="mt-3 text-base opacity-60 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {selectedVariant.comingSoon ? (
                <span className="font-serif text-3xl font-medium opacity-40">Coming Soon</span>
              ) : (
                <>
                  <span className="font-serif text-3xl font-medium" style={{ color: accent }}>
                    ₹{selectedVariant.price}
                  </span>
                  {selectedVariant.originalPrice && (
                    <span className="text-lg line-through opacity-30">₹{selectedVariant.originalPrice}</span>
                  )}
                  <span className="text-sm opacity-50">· ₹{Math.round(selectedVariant.price / selectedVariant.cups)} per cup</span>
                </>
              )}
            </div>

            {/* Variants */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest opacity-50">Select size</p>
              <div className="flex flex-col gap-2">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => !v.comingSoon && setSelectedVariant(v)}
                    disabled={v.comingSoon}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all"
                    style={{
                      border: `1.5px solid ${v.id === selectedVariant.id ? accent : "rgba(128,128,128,0.2)"}`,
                      background: v.id === selectedVariant.id ? `${accent}10` : "transparent",
                      opacity: v.comingSoon ? 0.6 : 1,
                      cursor: v.comingSoon ? "default" : "pointer",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-medium">{v.name}</span>
                      {v.comingSoon && (
                        <span className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                          style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
                          Launching Soon
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {v.originalPrice && (
                        <span className="text-xs line-through opacity-30">₹{v.originalPrice}</span>
                      )}
                      {v.comingSoon ? (
                        <span className="text-xs opacity-40">Coming Soon</span>
                      ) : (
                        <span style={{ color: accent }}>₹{v.price}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              onClick={addToCart}
              disabled={selectedVariant.comingSoon}
              className="flex w-full items-center justify-center rounded-full py-4 text-sm font-semibold text-white transition-all"
              style={{ background: selectedVariant.comingSoon ? "rgba(128,128,128,0.3)" : accent, cursor: selectedVariant.comingSoon ? "default" : "pointer" }}
              whileTap={selectedVariant.comingSoon ? {} : { scale: 0.98 }}
              animate={added ? { scale: [1, 1.02, 1] } : {}}
            >
              {added ? "Added to cart ✓" : selectedVariant.comingSoon ? "Coming Soon" : `Add to cart — ₹${selectedVariant.price}`}
            </motion.button>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-2">
              {product.benefits.map(b => (
                <div key={b} className="flex items-center gap-2 text-sm opacity-70">
                  <span style={{ color: accent }}><CheckIcon /></span>
                  {b}
                </div>
              ))}
            </div>

            {/* How to use */}
            <div className="rounded-2xl p-5" style={{ background: `${accent}10` }}>
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.15em] opacity-60">How to make it</p>
              <ol className="flex flex-col gap-2">
                {product.howTo.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: accent }}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Specs */}
            <div className="border-t border-current/10 pt-5">
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.15em] opacity-50">Details</p>
              <div className="flex flex-col gap-2">
                {product.specs.map(s => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span className="opacity-50">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="mt-16 max-w-2xl">
          <h2 className="mb-4 font-serif text-2xl font-medium">About {product.name}</h2>
          <p className="text-base leading-relaxed opacity-65">{product.longDescription}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
