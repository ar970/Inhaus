"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [touch,   setTouch]     = useState(false);
  const [trail,   setTrail]     = useState<{ id: number; x: number; y: number }[]>([]);
  const trailId = useRef(0);
  const lastPos = useRef({ x: -100, y: -100 });

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  // Lagged position for the blob
  const rx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.8 });
  const ry = useSpring(my, { stiffness: 220, damping: 22, mass: 0.8 });
  // Very lagged for the glow halo
  const hx = useSpring(mx, { stiffness: 80,  damping: 18, mass: 1.2 });
  const hy = useSpring(my, { stiffness: 80,  damping: 18, mass: 1.2 });

  // Stretch blob based on velocity
  const velX = useMotionValue(0);
  const velY = useMotionValue(0);
  const scaleX = useTransform(velX, [-30, 0, 30], [0.6, 1, 1.5]);
  const scaleY = useTransform(velX, [-30, 0, 30], [1.4, 1, 0.65]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }

    let raf = 0;
    const move = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      velX.set(dx * 2.2);
      velY.set(dy * 2.2);
      lastPos.current = { x: e.clientX, y: e.clientY };
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);

      // Trail drops every ~60px of movement
      const dist = Math.hypot(dx, dy);
      if (dist > 18) {
        const id = ++trailId.current;
        setTrail(t => [...t.slice(-5), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setTrail(t => t.filter(d => d.id !== id)), 420);
      }

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { velX.set(0); velY.set(0); });
    };

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
      cancelAnimationFrame(raf);
    };
  }, [mx, my, velX, velY]);

  if (touch) return null;

  return (
    <>
      {/* ── Glow halo — very lagged ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99996]"
        style={{ x: hx, y: hy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 0.22 : 0, scale: hovered ? 2.2 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "radial-gradient(circle, #C8761E 0%, transparent 70%)",
          filter: "blur(12px)",
        }} />
      </motion.div>

      {/* ── Trail drops ── */}
      {trail.map((d) => (
        <motion.div
          key={d.id}
          className="pointer-events-none fixed left-0 top-0 z-[99995]"
          style={{ x: d.x, y: d.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0.55, scale: 0.6 }}
          animate={{ opacity: 0, scale: 0.1, y: d.y + 10 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
        >
          {/* Teardrop */}
          <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
            <path d="M5 0 C5 0 0 5.5 0 8.5 A5 4.5 0 0 0 10 8.5 C10 5.5 5 0 5 0Z"
              fill="#C8761E" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* ── Main coffee-drop blob ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          scaleX: hovered ? 1 : scaleX,
          scaleY: hovered ? 1 : scaleY,
        }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 1.7 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" style={{ overflow: "visible" }}>
          <defs>
            <radialGradient id="cg" cx="38%" cy="28%" r="65%">
              <stop stopColor="#F0A050" />
              <stop offset="0.5" stopColor="#C8761E" />
              <stop offset="1" stopColor="#7A3A08" />
            </radialGradient>
          </defs>
          {/* Drop shape */}
          <path
            d="M14 0 C14 0 0 14 0 22 A14 14 0 0 0 28 22 C28 14 14 0 14 0Z"
            fill="url(#cg)"
            style={{ filter: "drop-shadow(0 3px 10px rgba(200,118,30,0.7))" }}
          />
          {/* Crema highlight */}
          <ellipse cx="9" cy="17" rx="4" ry="5.5" fill="white" opacity="0.18"
            transform="rotate(-12 9 17)" />
          {/* Centre swirl line */}
          <path d="M14 10 Q11 18 14 24 Q17 18 14 10Z" fill="white" opacity="0.1" />
        </svg>
      </motion.div>

      {/* ── Hover ring ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99997]"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovered && visible ? 1 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: "1.5px solid #C8761E",
          opacity: 0.6,
        }} />
      </motion.div>
    </>
  );
}
