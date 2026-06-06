import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: ["Concentrate", "Bundles", "Gift cards", "Coming soon"],
  },
  {
    title: "Company",
    links: ["Our story", "Sourcing", "Sustainability", "Stockists"],
  },
  {
    title: "Help",
    links: ["FAQ", "Shipping & returns", "Brew guide", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="section-dark overflow-hidden">
      <div className="container-x pt-16 pb-0">
        {/* Top nav columns */}
        <div className="grid gap-10 border-b pb-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]"
          style={{ borderColor: "color-mix(in srgb, var(--theme-dark-ink) 12%, transparent)" }}>
          <div>
            <p className="font-serif text-[28px] tracking-tight" style={{ color: "var(--theme-dark-ink)" }}>
              INHAUS
            </p>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 55%, transparent)" }}>
              Café-style coffee concentrate. Brewed with care, poured at home.
            </p>
            <div className="mt-6 flex gap-4">
              {["IG", "TW", "YT"].map((s) => (
                <Link key={s} href="#"
                  className="label flex h-8 w-8 items-center justify-center rounded-full border transition-colors focusable"
                  style={{
                    borderColor: "color-mix(in srgb, var(--theme-dark-ink) 18%, transparent)",
                    color: "color-mix(in srgb, var(--theme-dark-ink) 50%, transparent)",
                  }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label" style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 40%, transparent)" }}>
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#"
                      className="text-[13px] transition-opacity hover:opacity-100 focusable"
                      style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 65%, transparent)" }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand stamp */}
        <div className="relative overflow-hidden pb-0 pt-10">
          <p
            className="select-none text-center font-serif leading-none tracking-[-0.04em] opacity-[0.055]"
            style={{
              fontSize: "clamp(68px, 16vw, 220px)",
              color: "var(--theme-dark-ink)",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
            }}
            aria-hidden="true"
          >
            inhaus
          </p>

          {/* Actual bottom bar over the stamp */}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-3 px-0 pb-6 pt-0 text-center md:flex-row md:text-left"
          >
            <p className="label" style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 35%, transparent)" }}>
              © {new Date().getFullYear()} INHAUS · Made for home baristas
            </p>
            <div className="flex gap-5">
              {["Privacy", "Terms", "Instagram"].map((l) => (
                <Link key={l} href="#"
                  className="label transition-opacity hover:opacity-80 focusable"
                  style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 35%, transparent)" }}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
