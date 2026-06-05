import Bottle from "@/components/Bottle";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { products, comparisonRows } from "@/lib/data";

const [black, classic] = products;

function ColumnHead({ accent, variant, name, altName }: { accent: string; variant: string; name: string; altName: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-44 items-center justify-center">
        <Bottle className="w-[92px]" accent={accent} variant={variant} />
      </div>
      <h3 className="font-serif text-3xl italic">{name}</h3>
      <span className="label text-espresso/50">{altName}</span>
    </div>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Find your pour"
          title="Black or Classic?"
          subtitle="Same ten-second ritual, two different moods. Here's how they stack up."
        />

        {/* desktop table */}
        <Reveal className="mt-12 hidden md:block">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-8">
            <ColumnHead accent={black.accent} variant={black.variantLabel} name={black.name} altName={black.altName} />
            <div />
            <ColumnHead accent={classic.accent} variant={classic.variantLabel} name={classic.name} altName={classic.altName} />
          </div>

          <dl className="mt-6">
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 border-t border-espresso/10 py-4">
                <dd className="text-right text-espresso/85">{row.black}</dd>
                <dt className="label w-36 text-center text-espresso/45">{row.label}</dt>
                <dd className="text-left text-espresso/85">{row.classic}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
            <Button href="#" className="justify-self-end">Add Black · ₹{black.price}</Button>
            <div />
            <Button href="#" variant="secondary" className="justify-self-start">Add Classic · ₹{classic.price}</Button>
          </div>
        </Reveal>

        {/* mobile cards */}
        <div className="mt-10 grid gap-6 md:hidden">
          {[black, classic].map((p) => (
            <Reveal key={p.id} className="card p-6">
              <ColumnHead accent={p.accent} variant={p.variantLabel} name={p.name} altName={p.altName} />
              <dl className="mt-4">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 border-t border-espresso/10 py-2.5">
                    <dt className="label text-espresso/45">{row.label}</dt>
                    <dd className="text-right text-sm text-espresso/85">{p.id === "black" ? row.black : row.classic}</dd>
                  </div>
                ))}
              </dl>
              <Button href="#" className="mt-5 w-full">Add {p.name} · ₹{p.price}</Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
