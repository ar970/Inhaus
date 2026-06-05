import Bottle from "@/components/Bottle";
import Sticker from "@/components/Sticker";
import Reveal from "@/components/Reveal";
import { DoodleIcon } from "@/components/Doodles";
import { benefits } from "@/lib/data";

const collage = [
  { text: "No sugar", tone: "crema" as const, className: "left-0 top-6", rotate: -9 },
  { text: "100% Arabica", tone: "paper" as const, className: "right-2 top-2", rotate: 7 },
  { text: "20 cups", tone: "sage" as const, className: "right-0 top-28", rotate: -5 },
  { text: "No preservatives", tone: "paper" as const, className: "left-2 top-32", rotate: 8 },
  { text: "BYOB", tone: "clay" as const, className: "left-6 bottom-10", rotate: -7 },
  { text: "10-sec brew", tone: "paper" as const, className: "right-4 bottom-8", rotate: 6 },
];

export default function WhyInhaus() {
  return (
    <section id="why" className="section bg-espresso text-oat">
      <div className="container-x grid items-center gap-12 md:grid-cols-2">
        {/* collage */}
        <Reveal className="relative mx-auto flex h-[360px] w-full max-w-sm items-center justify-center md:order-2">
          <div className="absolute inset-0 -z-0 rounded-[36px] bg-[radial-gradient(120%_120%_at_50%_20%,#3A271C_0%,#2A1C14_60%,#211712_100%)]" />
          <Bottle className="relative z-10 w-[170px]" accent="#C8761E" variant="INHAUS" />
          {collage.map((s) => (
            <Sticker key={s.text} className={`absolute z-20 ${s.className}`} rotate={s.rotate} tone={s.tone}>
              {s.text}
            </Sticker>
          ))}
        </Reveal>

        {/* copy + benefits */}
        <Reveal className="md:order-1">
          <p className="label text-crema">Why INHAUS</p>
          <h2 className="mt-3 font-serif text-[34px] font-normal leading-[1.02] tracking-tight md:text-[52px]">
            Good coffee shouldn&apos;t need a machine.
          </h2>
          <p className="mt-4 max-w-md text-oat/75">
            Just cold-extracted coffee and water, bottled at peak flavour. No sugar, no preservatives, no fuss — only the good part of your café order.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oat/20 text-crema">
                  <DoodleIcon name={b.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm text-oat/90">{b.title}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
