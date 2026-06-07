"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type VariantName = "fade" | "slide-up" | "slide-left" | "zoom" | "blur";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: VariantName;
  once?: boolean;
};

// Mobile variants: no blur (blur forces full repaint on every frame)
const mobileVariantMap: Record<VariantName, Variants> = {
  fade:        { hidden: { opacity: 0, y: 18 },               visible: { opacity: 1, y: 0 } },
  "slide-up":  { hidden: { opacity: 0, y: 36 },               visible: { opacity: 1, y: 0 } },
  "slide-left":{ hidden: { opacity: 0, x: 28 },               visible: { opacity: 1, x: 0 } },
  zoom:        { hidden: { opacity: 0, scale: 0.96 },          visible: { opacity: 1, scale: 1 } },
  blur:        { hidden: { opacity: 0, y: 12 },                visible: { opacity: 1, y: 0 } },
};

// Desktop variants: can afford blur
const desktopVariantMap: Record<VariantName, Variants> = {
  fade:        { hidden: { opacity: 0, y: 22, filter: "blur(6px)"  }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
  "slide-up":  { hidden: { opacity: 0, y: 48 },                       visible: { opacity: 1, y: 0 } },
  "slide-left":{ hidden: { opacity: 0, x: 40 },                       visible: { opacity: 1, x: 0 } },
  zoom:        { hidden: { opacity: 0, scale: 0.94, filter: "blur(4px)" }, visible: { opacity: 1, scale: 1, filter: "blur(0px)" } },
  blur:        { hidden: { opacity: 0, y: 14, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
};

export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduce) return <div className={className}>{children}</div>;

  const v = isMobile ? mobileVariantMap[variant] : desktopVariantMap[variant];
  const duration = isMobile ? 0.5 : 0.75;
  const mobileDelay = isMobile ? Math.min(delay, 0.15) : delay; // cap stagger on mobile

  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay: mobileDelay, ease: [0.22, 1, 0.36, 1] }}
      style={isMobile ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
