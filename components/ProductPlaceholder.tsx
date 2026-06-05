import { cn } from "@/lib/cn";
import { Cup, Steam } from "@/components/Doodles";

type Props = {
  className?: string;
  label?: string;
  variant?: "light" | "dark";
};

/**
 * Placeholder for the real product visual, which the client is still designing.
 * Intentionally styled (not blank) — drop in the final product art / photography
 * here when it's ready.
 */
export default function ProductPlaceholder({
  className,
  label = "Product reveal coming soon",
  variant = "light",
}: Props) {
  const dark = variant === "dark";
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "relative flex aspect-[4/5] w-full max-w-[260px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed",
          dark ? "border-oat/25" : "border-espresso/25"
        )}
        style={{ background: dark ? "rgba(255,255,255,0.05)" : "var(--theme-accent-soft)" }}
      >
        <Steam className={cn("absolute top-7 h-10 w-8", dark ? "text-oat/20" : "text-espresso/20")} />
        <Cup className={cn("h-20 w-20", dark ? "text-oat/30" : "text-espresso/30")} />
        <span className={cn("label mt-5 px-6 text-center leading-relaxed", dark ? "text-oat/45" : "text-espresso/45")}>
          {label}
        </span>
      </div>
    </div>
  );
}
