"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touch,   setTouch]   = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Very stiff spring — barely any lag, just enough to feel smooth not robotic
  const rx = useSpring(mx, { stiffness: 700, damping: 38, mass: 0.3 });
  const ry = useSpring(my, { stiffness: 700, damping: 38, mass: 0.3 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true); };
    const over  = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("a") || t.closest("button") || t.closest("[data-cursor-expand]")));
    };
    const leave = () => setVisible(false);
    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
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
      {/* Outer ring — follows with minimal lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovered ? 1.6 : 1,
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          width: "100%", height: "100%",
          borderRadius: "50%",
          border: "1.5px solid #C8761E",
          opacity: 0.75,
          background: hovered ? "rgba(200,118,30,0.12)" : "transparent",
        }} />
      </motion.div>

      {/* Center dot — exact position, no spring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          x: mx, y: my,
          translateX: "-50%", translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C8761E" }} />
      </motion.div>
    </>
  );
}
