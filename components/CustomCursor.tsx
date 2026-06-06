"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-layer custom cursor:
 *  — inner dot  (8px)  follows mouse exactly
 *  — outer ring (36px) follows with spring lag
 * Expands on link/button hover. Hides on touch devices.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touch, setTouch] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const springConfig = { stiffness: 380, damping: 28, mass: 0.6 };
  const rx = useSpring(mx, springConfig);
  const ry = useSpring(my, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(
        !!(
          t.closest("a") ||
          t.closest("button") ||
          t.closest("[data-cursor-expand]")
        )
      );
    };

    const leave = () => setVisible(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [mx, my]);

  if (touch) return null;

  return (
    <>
      {/* Dot — exact position */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] mix-blend-difference"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>

      {/* Ring — spring lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] mix-blend-difference"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovered ? 1.6 : 1,
          width: hovered ? 48 : 36,
          height: hovered ? 48 : 36,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-full border border-white"
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </>
  );
}
