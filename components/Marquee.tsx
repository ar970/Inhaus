import { Sparkle } from "@/components/Doodles";
import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="group overflow-hidden border-y border-espresso/15 bg-espresso py-3 text-oat">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="label flex items-center gap-6 px-6">
            {item}
            <Sparkle className="h-3 w-3 text-crema" />
          </span>
        ))}
      </div>
    </div>
  );
}
