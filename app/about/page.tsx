import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About INHAUS — Our Story",
  description:
    "INHAUS makes cold-extracted speciality coffee concentrate for students, creators, and professionals across India. No machine, no barista — café-grade coffee in 60 seconds. Learn about who we are, what we make, and why.",
  openGraph: {
    title: "About INHAUS — Our Story",
    description: "INHAUS makes cold-extracted speciality coffee concentrate. Café-grade at home. No machine. Ready in 60 seconds.",
    type: "website",
    locale: "en_IN",
    siteName: "INHAUS Coffee",
  },
  alternates: { canonical: "https://inhauscoffee.com/about" },
};

const brandSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About INHAUS Coffee",
  description:
    "INHAUS is an Indian speciality coffee concentrate brand. We cold-extract 100% Arabica beans into a concentrated liquid that gives you café-grade coffee at home — no machine, no barista, no wasted time.",
  url: "https://inhauscoffee.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "INHAUS Coffee",
    url: "https://inhauscoffee.com",
    logo: "https://inhauscoffee.com/inhaus-logo.jpeg",
    description:
      "INHAUS makes cold-extracted speciality coffee concentrate — 100% Arabica, no added sugar, no preservatives. Designed for students, creators, and professionals across India.",
    email: "admin@inhauscoffee.com",
    telephone: "+919311349922",
    areaServed: "IN",
    foundingLocation: "India",
    sameAs: ["https://www.instagram.com/inhauscoffee"],
  },
};

const values = [
  {
    label: "Real coffee, no shortcuts",
    body: "INHAUS is built on 100% Arabica speciality beans, cold-extracted slowly to preserve the natural aroma, body, and flavour. No robusta filler. No artificial flavours. No added sugar.",
  },
  {
    label: "Designed for real life",
    body: "We made INHAUS for the 2 AM study session, the 6 AM pre-call routine, the mid-edit flow state. A great cup of coffee shouldn't require a machine, a barista, or a 20-minute queue.",
  },
  {
    label: "Transparent and honest",
    body: "What's in the bottle is what's on the label. Speciality coffee, concentrated. That's it. FSSAI licensed, cold-extracted, no preservatives.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF2DC] text-[#1E0C04]">
      <Nav />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pb-16 pt-20 md:px-8 md:pt-28">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] opacity-50">Our story</p>
          <h1 className="font-serif text-5xl font-light italic leading-tight tracking-tight md:text-7xl">
            Coffee concentrate<br />
            <span className="not-italic font-medium">built for India.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-65">
            INHAUS was started for one reason: the best cup of coffee you can make at home takes too long and costs too much. We fixed that. Cold-extracted speciality Arabica, concentrated into a bottle — café-grade in 60 seconds, no machine needed.
          </p>
        </section>

        {/* Image band */}
        <section className="relative h-[380px] overflow-hidden md:h-[500px]">
          <Image
            src="/product-study.jpeg"
            alt="INHAUS Study Fuel — speciality coffee concentrate for students"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF2DC]/60 via-transparent to-[#1E0C04]/40" />
        </section>

        {/* What we make */}
        <section className="mx-auto max-w-5xl px-4 py-20 md:px-8">
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <div>
              <h2 className="font-serif text-3xl font-medium leading-snug md:text-4xl">
                What is INHAUS?
              </h2>
              <p className="mt-5 text-base leading-relaxed opacity-65">
                INHAUS is a cold-extracted speciality coffee concentrate made in India. We brew 100% Arabica beans at low temperature over an extended period, then concentrate the resulting liquid to a ratio of roughly 1:3 — meaning a 15ml pour makes a full-strength café cup when combined with milk or water.
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-65">
                The result is the same quality you'd get at a well-run specialty café — naturally complex, no bitterness, no added sugar — ready in under 60 seconds, from a bottle that fits in your fridge.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-medium leading-snug md:text-4xl">
                Who is it for?
              </h2>
              <p className="mt-5 text-base leading-relaxed opacity-65">
                We built three variants for the three versions of yourself that need great coffee the most.
              </p>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  { color: "#F04E12", name: "Study Fuel", for: "Students — late nights, deadlines, exam seasons." },
                  { color: "#FF2D78", name: "Creator Fuel", for: "Creators — design sprints, editing sessions, flow states." },
                  { color: "#00A896", name: "WorkFlow", for: "Professionals — 6 AM routines, back-to-back meetings, no café run." },
                ].map((v) => (
                  <li key={v.name} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: v.color }} />
                    <span className="text-sm leading-relaxed opacity-70">
                      <strong className="font-medium opacity-100">{v.name}</strong> — {v.for}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-[#1E0C04]/10 bg-[#1E0C04] px-4 py-20 text-[#FFF2DC] md:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.28em] opacity-40">What we stand for</p>
            <div className="grid gap-10 md:grid-cols-3">
              {values.map((v) => (
                <div key={v.label}>
                  <h3 className="font-serif text-xl font-medium leading-snug">{v.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-55">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="mx-auto max-w-5xl px-4 py-20 md:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-[#1E0C04]/5 p-8">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] opacity-40">Product</p>
              <dl className="flex flex-col gap-3 text-sm">
                {[
                  ["Coffee", "100% Arabica speciality"],
                  ["Process", "Cold extraction"],
                  ["Sugar", "None added"],
                  ["Preservatives", "None"],
                  ["Shelf life", "1 year sealed"],
                  ["Storage", "Refrigerate after opening"],
                  ["FSSAI", "Lic. No. 21526030000986"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[#1E0C04]/8 pb-3 last:border-0 last:pb-0">
                    <span className="opacity-50">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-[#1E0C04]/5 p-8">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] opacity-40">Contact & support</p>
              <dl className="flex flex-col gap-3 text-sm">
                {[
                  ["Email", "admin@inhauscoffee.com", `mailto:admin@inhauscoffee.com`],
                  ["Phone", "+91 93113 49922", `tel:+919311349922`],
                  ["Shipping", "All India, 2–5 days", null],
                ].map(([k, v, href]) => (
                  <div key={k as string} className="flex justify-between border-b border-[#1E0C04]/8 pb-3 last:border-0 last:pb-0">
                    <span className="opacity-50">{k}</span>
                    {href ? (
                      <a href={href as string} className="font-medium hover:opacity-70 transition-opacity">{v}</a>
                    ) : (
                      <span className="font-medium">{v}</span>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#1E0C04]/10 px-4 py-20 text-center md:px-8">
          <h2 className="font-serif text-3xl font-medium md:text-4xl">Try it for yourself.</h2>
          <p className="mx-auto mt-3 max-w-md text-base opacity-60">
            60 seconds. No machine. Café-grade coffee at home.
          </p>
          <Link
            href="/#products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F04E12] px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Shop now
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
    </div>
  );
}
