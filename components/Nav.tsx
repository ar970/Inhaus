"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "#products", label: "Shop" },
  { href: "#how", label: "How it works" },
  { href: "#make", label: "What you can make" },
  { href: "#faq", label: "FAQ" },
];

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8h12l1 12H5z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, dispatch: cartDispatch } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-espresso/8 bg-oat/80 shadow-[0_1px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-x flex items-center justify-between py-[14px]">
        <Link href="#top" className="focusable flex items-center">
          <Image
            src="/inhaus-logo.jpeg"
            alt="inhaus"
            width={80}
            height={60}
            className="h-10 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-espresso/60 transition-colors hover:text-espresso focusable"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button href="#products" size="sm" className="hidden sm:inline-flex">Shop now</Button>
          <button
            onClick={() => cartDispatch({ type: "OPEN" })}
            aria-label={`Cart (${count} items)`}
            className="relative rounded-pill p-2 text-espresso/65 transition-colors hover:text-espresso focusable"
          >
            <BagIcon className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-p,#F04E12)] text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-pill p-2 md:hidden focusable"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-espresso/8 bg-oat/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-espresso/6 py-3.5 font-serif text-lg focusable"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
