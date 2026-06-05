import Button from "@/components/ui/Button";
import Bottle from "@/components/Bottle";
import Sticker from "@/components/Sticker";
import Reveal from "@/components/Reveal";
import { Stars, Steam, Bean, Cup } from "@/components/Doodles";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-10 py-14 md:grid-cols-2 md:gap-8 md:py-20">
        {/* Copy */}
        <Reveal className="order-2 md:order-1">
          <p className="label text-clay">Liquid coffee concentrate</p>
          <h1 className="mt-4 font-serif text-[44px] font-normal leading-[0.95] tracking-tight md:text-[88px]">
            Café in
            <br />a bottle.
          </h1>
          <p className="mt-6 max-w-md text-lg text-espresso/80">
            Barista coffee at home in ten seconds. Pour, add milk or water, sip — no machine, no mess.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#products" withArrow>Shop the pour</Button>
            <Button href="#how" variant="secondary">How it works</Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Stars />
            <span className="text-sm text-espresso/70">Loved by 2,000+ home baristas</span>
          </div>
        </Reveal>

        {/* Visual */}
        <Reveal className="order-1 md:order-2" delay={0.1}>
          <div className="relative mx-auto flex max-w-md items-center justify-center">
            <div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(120%_120%_at_50%_15%,#FBF7EF_0%,#EFE2CC_60%,#E3D2B8_100%)] shadow-soft" />

            {/* doodle accents */}
            <Steam className="absolute left-[18%] top-6 h-12 w-9 text-clay/70" />
            <Bean className="absolute right-[16%] top-12 h-9 w-9 -rotate-12 text-espresso/50" />
            <Cup className="absolute bottom-10 left-8 h-12 w-12 text-espresso/55" />

            <Bottle className="relative z-10 w-[180px] py-8 md:w-[230px]" />

            {/* stickers */}
            <Sticker className="absolute -left-2 top-10" rotate={-8} tone="crema">20 cups</Sticker>
            <Sticker className="absolute -right-1 top-24" rotate={7}>10-sec brew</Sticker>
            <Sticker className="absolute bottom-8 right-2" rotate={-5} tone="sage">No sugar</Sticker>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
