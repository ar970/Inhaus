import Link from "next/link";
import { House } from "@/components/Doodles";

const columns = [
  {
    title: "Shop",
    links: ["Black", "Classic", "Bundles", "Gift cards"],
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
    <footer className="bg-espresso text-oat">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <House className="h-6 w-6 text-crema" />
              <span className="font-serif text-3xl">INHAUS</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-oat/70">
              Café-style coffee concentrate. Brewed with care, poured at home.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label text-oat/50">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-oat/80 transition-colors hover:text-crema focusable">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-oat/15 pt-6 text-center md:flex-row md:text-left">
          <p className="label text-oat/50">© {new Date().getFullYear()} INHAUS · Made for home baristas</p>
          <div className="flex gap-5">
            {["Instagram", "Privacy", "Terms"].map((l) => (
              <Link key={l} href="#" className="label text-oat/50 transition-colors hover:text-crema focusable">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
