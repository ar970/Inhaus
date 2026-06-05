"use client";

import Button from "@/components/ui/Button";
import Sticker from "@/components/Sticker";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProductPlaceholder from "@/components/ProductPlaceholder";
import { DoodleIcon } from "@/components/Doodles";
import { benefits } from "@/lib/data";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";

const defaultContent = {
  headline: "Speciality coffee concentrate.",
  sub: "Pour, add milk or water, sip. Café-grade coffee in seconds — no machine, no mess.",
};

export default function Products() {
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].products : defaultContent;

  return (
    <section id="products" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="The product" title={c.headline} subtitle={c.sub} />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="card grid items-center gap-8 p-6 md:grid-cols-2 md:p-10">
            {/* product visual — placeholder until final art lands */}
            <ProductPlaceholder className="py-2" />

            {/* details */}
            <div>
              <span className="label text-clay">Speciality coffee concentrate</span>
              <h3 className="mt-2 font-serif text-[34px] italic leading-none">INHAUS Concentrate</h3>
              <p className="mt-4 text-espresso/75">
                Real brewed speciality coffee, concentrated. Just pour, add milk or water, and stir — a café-grade cup in seconds.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
                {benefits.slice(0, 4).map((b) => (
                  <li key={b.title} className="flex items-center gap-2.5 text-sm text-espresso/80">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-espresso/15 text-crema">
                      <DoodleIcon name={b.icon} className="h-4 w-4" />
                    </span>
                    {b.title}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button href="#join">Notify me</Button>
                <Sticker tone="espresso" rotate={-3}>Coming soon</Sticker>
              </div>
              <p className="mt-3 text-xs text-espresso/50">Pricing & pack details dropping shortly.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
