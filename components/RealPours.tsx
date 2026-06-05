import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Cup, Bean, Steam, Drop } from "@/components/Doodles";

/**
 * Illustrated lifestyle frames. Replace each <Scene> with real photography
 * (next/image) when assets are ready — the captions mark the intended shot.
 */
const scenes = [
  { caption: "morning pour", grad: "from-[#EFE2CC] to-[#E3D2B8]", Icon: Steam, rotate: 0 },
  { caption: "iced black, no rules", grad: "from-[#E7D6BE] to-[#D9C3A0]", Icon: Cup, rotate: -2 },
  { caption: "latte at the counter", grad: "from-[#F0E3CD] to-[#E3D2B8]", Icon: Drop, rotate: 2 },
  { caption: "beans, always whole", grad: "from-[#E9D8C0] to-[#DDC8A6]", Icon: Bean, rotate: -1 },
];

export default function RealPours() {
  return (
    <section className="section bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow="Real pours"
          title="Not a photoshoot. Just how we drink it."
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible">
          {scenes.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.06} className="shrink-0 snap-start basis-[78%] sm:basis-[45%] md:basis-auto">
              <figure>
                <div
                  className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px] border border-espresso/10 bg-gradient-to-b ${s.grad} shadow-soft`}
                  style={{ transform: `rotate(${s.rotate}deg)` }}
                >
                  <s.Icon className="h-20 w-20 text-espresso/40" />
                </div>
                <figcaption className="label mt-3 text-center text-espresso/55">[ {s.caption} ]</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
