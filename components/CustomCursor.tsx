"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touch,   setTouch]   = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Blob lags behind — feels like liquid
  const rx = useSpring(mx, { stiffness: 160, damping: 20, mass: 1.1 });
  const ry = useSpring(my, { stiffness: 160, damping: 20, mass: 1.1 });

  // Slow halo even further behind
  const hx = useSpring(mx, { stiffness: 55, damping: 16, mass: 1.5 });
  const hy = useSpring(my, { stiffness: 55, damping: 16, mass: 1.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true); };
    const over  = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("a") || t.closest("button") || t.closest("[data-cursor-expand]")));
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
      {/* Outer liquid spread — very slow, blurs into page like a spill */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99996]"
        style={{ x: hx, y: hy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 0.14 : 0, scale: hovered ? 3.5 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "radial-gradient(circle, #A0521A 0%, transparent 72%)",
          filter: "blur(18px)",
        }} />
      </motion.div>

      {/* Main liquid drop — smooth circle, mix-blend tints whatever's beneath */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          mixBlendMode: "multiply",
        }}
        animate={{
          opacity: visible ? 0.82 : 0,
          scale: hovered ? 2.6 : 1,
          width: 22, height: 22,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          width: 22, height: 22,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #D4854A, #7B3410)",
        }} />
      </motion.div>

      {/* Tiny sharp center dot — exact mouse position */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hovered ? 0.9 : 0 }}
        transition={{ duration: 0.12 }}
      >
        <div style={{
          width: 5, height: 5,
          borderRadius: "50%",
          background: "#5C2008",
        }} />
      </motion.div>
    </>
  );
}
