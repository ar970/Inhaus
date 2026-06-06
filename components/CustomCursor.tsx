"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touch, setTouch] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const rx = useSpring(mx, { stiffness: 280, damping: 26, mass: 0.7 });
  const ry = useSpring(my, { stiffness: 280, damping: 26, mass: 0.7 });

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
      {/* Inner dot — exact position */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#C8761E]" />
      </motion.div>

      {/* Coffee bean — spring lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 1.5 : 1, rotate: hovered ? 20 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          width="32" height="32"
          viewBox="0 0 32 32"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* Bean outer shape */}
          <ellipse cx="16" cy="16" rx="10" ry="13"
            fill="#C8761E" opacity="0.92"
            style={{ filter: "drop-shadow(0 2px 8px rgba(200,118,30,0.55))" }}
          />
          {/* Centre crease */}
          <path
            d="M16 4 C10 9 10 23 16 28 C22 23 22 9 16 4Z"
            fill="#A05A10" opacity="0.55"
          />
          {/* Highlight */}
          <ellipse cx="12" cy="11" rx="2.5" ry="3.5"
            fill="white" opacity="0.18" transform="rotate(-15 12 11)"
          />
        </svg>
      </motion.div>
    </>
  );
}
