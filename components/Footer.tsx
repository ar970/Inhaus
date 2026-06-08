import Link from "next/link";
import Image from "next/image";

const SOCIAL = [
  {
    id: "instagram",
    label: "Follow us on Instagram",
    handle: "@inhauscoffeee",
    href: "https://www.instagram.com/inhauscoffeee",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "Connect on LinkedIn",
    handle: "INHAUS Coffee",
    href: "https://www.linkedin.com/company/inhaus-coffee/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="4"/>
        <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>
      </svg>
    ),
  },
];

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Concentrate", href: "/#products" },
      { label: "Bundles",     href: "#" },
      { label: "Gift cards",  href: "#" },
      { label: "Coming soon", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story",      href: "/about" },
      { label: "Sourcing",       href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Stockists",      href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ",               href: "/#faq" },
      { label: "Shipping & returns", href: "#" },
      { label: "Brew guide",        href: "#" },
    ],
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
            <Image
              src="/inhaus-logo.jpeg"
              alt="inhaus"
              width={100}
              height={75}
              className="h-12 w-auto object-contain"
              style={{ filter: "invert(1) brightness(1.15)" }}
            />
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 55%, transparent)" }}>
              Café-style coffee concentrate. Brewed with care, poured at home.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {SOCIAL.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 focusable"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 group-hover:border-[var(--theme-dark-accent)] group-hover:text-[var(--theme-dark-accent)]"
                    style={{
                      borderColor: "color-mix(in srgb, var(--theme-dark-ink) 22%, transparent)",
                      color: "color-mix(in srgb, var(--theme-dark-ink) 55%, transparent)",
                    }}
                  >
                    {s.icon}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[12px] font-semibold transition-colors duration-200 group-hover:text-[var(--theme-dark-accent)]"
                      style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 80%, transparent)" }}>
                      {s.label}
                    </span>
                    <span className="label"
                      style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 38%, transparent)" }}>
                      {s.handle}
                    </span>
                  </span>
                </a>
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
                  <li key={l.label}>
                    <Link href={l.href}
                      className="text-[13px] transition-opacity hover:opacity-100 focusable"
                      style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 65%, transparent)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Help" && (
                  <>
                    <li className="pt-1">
                      <p className="label mb-1.5" style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 38%, transparent)" }}>
                        Support
                      </p>
                      <a href="mailto:admin@inhauscoffee.com"
                        className="block text-[13px] transition-opacity hover:opacity-100 focusable"
                        style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 65%, transparent)" }}
                      >
                        admin@inhauscoffee.com
                      </a>
                      <a href="tel:+919311349922"
                        className="mt-1 block text-[13px] transition-opacity hover:opacity-100 focusable"
                        style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 65%, transparent)" }}
                      >
                        +91 93113 49922
                      </a>
                    </li>
                  </>
                )}
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
            <p className="label" style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 30%, transparent)" }}>
              FSSAI Lic. No. 21526030000986
            </p>
            <div className="flex gap-5">
              <Link href="#" className="label transition-opacity hover:opacity-80 focusable"
                style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 35%, transparent)" }}>
                Privacy
              </Link>
              <Link href="#" className="label transition-opacity hover:opacity-80 focusable"
                style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 35%, transparent)" }}>
                Terms
              </Link>
              <a href="https://www.instagram.com/inhauscoffeee" target="_blank" rel="noopener noreferrer"
                className="label transition-opacity hover:opacity-80 focusable"
                style={{ color: "color-mix(in srgb, var(--theme-dark-ink) 35%, transparent)" }}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
