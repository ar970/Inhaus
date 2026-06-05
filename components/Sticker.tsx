import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StickerProps = {
  children: ReactNode;
  className?: string;
  rotate?: number;
  tone?: "paper" | "crema" | "clay" | "sage" | "espresso";
};

const tones: Record<NonNullable<StickerProps["tone"]>, string> = {
  paper:   "bg-paper text-espresso",
  crema:   "bg-crema text-espresso",
  clay:    "bg-clay text-oat",
  sage:    "bg-[#8A9A7B] text-oat",
  espresso:"bg-espresso text-oat",
};

export default function Sticker({ children, className, rotate = -4, tone = "paper" }: StickerProps) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-pill border border-espresso/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] shadow-sticker",
        tones[tone],
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
