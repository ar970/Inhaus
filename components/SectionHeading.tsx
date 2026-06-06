import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "dark", className }: Props) {
  const isCenter = align === "center";
  const isLight = tone === "light";
  return (
    <Reveal className={cn(isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <p
          className="label"
          style={{ color: isLight ? "var(--theme-dark-accent)" : "var(--theme-accent)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "mt-3 font-serif text-[36px] font-normal leading-[1.0] tracking-tight md:text-[56px]",
        isLight ? "text-[var(--theme-dark-ink)]" : "text-espresso"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg leading-relaxed",
          isLight ? "opacity-60" : "text-espresso/65"
        )}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
