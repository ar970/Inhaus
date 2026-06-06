import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/Doodles";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  withArrow?: boolean;
  className?: string;
};

const variants = {
  primary:   "bg-espresso text-oat hover:bg-crema hover:text-espresso hover:-translate-y-0.5 shadow-soft",
  secondary: "border border-espresso/80 text-espresso hover:bg-espresso hover:text-oat",
  ghost:     "text-espresso hover:text-crema underline-offset-4 hover:underline",
};

const sizes = {
  md: "min-h-[48px] px-7 py-3 text-sm",
  sm: "min-h-[40px] px-5 py-2 text-[13px]",
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-pill text-[13px] font-semibold tracking-wide transition-all duration-200 focusable",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {withArrow && (
        <Arrow className="h-3.5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
