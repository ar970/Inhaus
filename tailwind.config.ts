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
        /* Semantic design tokens — all resolve to CSS vars so persona swaps re-theme everything */
        oat:     "var(--theme-bg)",
        paper:   "var(--theme-surface)",
        espresso:"var(--theme-ink)",
        crema:   "var(--theme-accent)",
        latte:   "var(--theme-accent-soft)",
        clay:    "var(--theme-accent-2)",
        /* Keep literal values for permanent surfaces (e.g. dark gate) */
        gate:    "#0E0B09",
        /* Convenience aliases */
        "theme-bg":     "var(--theme-bg)",
        "theme-surface":"var(--theme-surface)",
        "theme-ink":    "var(--theme-ink)",
        "theme-accent": "var(--theme-accent)",
        "theme-soft":   "var(--theme-accent-soft)",
        "theme-2":      "var(--theme-accent-2)",
        /* Legacy colour names for components that haven't been updated */
        sage: "#8A9A7B",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
        mono:  ["'Space Mono'", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft:    "0 12px 40px rgba(0,0,0,0.09)",
        sticker: "2px 3px 0 rgba(0,0,0,0.18)",
        lift:    "0 18px 50px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
