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
  return (
    <Reveal className={cn(isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("label", tone === "dark" ? "text-clay" : "text-crema")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "mt-3 font-serif text-[34px] font-normal leading-[1.02] tracking-tight md:text-[56px]",
          tone === "dark" ? "text-espresso" : "text-oat"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg", tone === "dark" ? "text-espresso/75" : "text-oat/75")}>{subtitle}</p>
      )}
    </Reveal>
  );
}
