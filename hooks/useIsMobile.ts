"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on mobile/tablet (pointer: coarse or width < 1024px).
 * Defaults to true (mobile-safe) until client hydrates.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1024
      );
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}
