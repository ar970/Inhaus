import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#211712",
        oat: "#F6EFE3",
        paper: "#FBF7EF",
        crema: "#C8761E",
        clay: "#B5654A",
        latte: "#E3D2B8",
        sage: "#8A9A7B",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(33,23,18,0.10)",
        sticker: "2px 3px 0 rgba(33,23,18,0.20)",
        lift: "0 18px 50px rgba(33,23,18,0.16)",
      },
      borderRadius: {
        pill: "999px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(var(--r, 0deg))" },
          "50%": { transform: "rotate(calc(var(--r, 0deg) + 3deg)) scale(1.04)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
