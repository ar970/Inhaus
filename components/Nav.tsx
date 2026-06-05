"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";

const links = [
  { href: "#products", label: "Shop" },
  { href: "#how", label: "How it works" },
  { href: "#compare", label: "Find your pour" },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-espresso/10 bg-oat/85 backdrop-blur-md" : "border-b border-transparent bg-oat"
      )}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <Link href="#top" className="font-serif text-2xl tracking-tight focusable">INHAUS</Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors hover:text-crema focusable">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button href="#products" size="sm" className="hidden sm:inline-flex">Shop the pour</Button>
          <Link href="#products" aria-label="Cart" className="relative rounded-pill p-2 text-espresso transition-colors hover:text-crema focusable">
            <BagIcon className="h-6 w-6" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-crema" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-pill p-2 md:hidden focusable"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-espresso/10 bg-oat md:hidden">
          <div className="container-x flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-espresso/5 py-3 font-serif text-lg focusable"
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
