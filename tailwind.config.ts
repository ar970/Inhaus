import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oat:      "var(--theme-bg)",
        paper:    "var(--theme-surface)",
        espresso: "var(--theme-ink)",
        crema:    "var(--theme-accent)",
        latte:    "var(--theme-accent-soft)",
        clay:     "var(--theme-accent-2)",
        /* Always-dark surface tokens */
        "ink-bg":  "var(--theme-dark-bg)",
        "ink-fg":  "var(--theme-dark-ink)",
        /* Permanent gate */
        gate:      "#0A0608",
        sage:      "#8A9A7B",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        serif:   ["Fraunces", "Georgia", "serif"],
        sans:    ["'DM Sans'", "system-ui", "sans-serif"],
        mono:    ["'Space Mono'", "ui-monospace", "monospace"],
      },
      maxWidth:      { content: "1240px" },
      boxShadow: {
        soft:    "0 8px 32px rgba(0,0,0,0.08)",
        sticker: "2px 3px 0 rgba(0,0,0,0.20)",
        lift:    "0 20px 60px rgba(0,0,0,0.18)",
        glow:    "0 0 80px rgba(var(--glow-rgb,200,118,30),0.35)",
      },
      borderRadius: { pill: "999px" },
    },
  },
  plugins: [],
};

export default config;
