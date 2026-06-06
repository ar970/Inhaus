import React from "react";
import { cn } from "@/lib/cn";

type DoodleProps = { className?: string; style?: React.CSSProperties };

const base = "stroke-current";

export function Bean({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
      <ellipse cx="24" cy="24" rx="12" ry="17" transform="rotate(30 24 24)" />
      <path d="M18 13c7 6 3 13 11 21" />
    </svg>
  );
}

export function Cup({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 56 56" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 22h27l-2.5 24a4 4 0 0 1-4 3.6H19.5a4 4 0 0 1-4-3.6z" />
      <path d="M40 27a7 7 0 0 1 0 13" />
      <path d="M20 13c-2 2.5-2 4.5 0 7M28 11c-2 2.5-2 4.5 0 7M36 13c-2 2.5-2 4.5 0 7" />
    </svg>
  );
}

export function Steam({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 40" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
      <path d="M9 36c-3-6 4-9 0-15M22 36c-3-6 4-9 0-15M9 18c-3-6 4-9 0-14M22 18c-3-6 4-9 0-14" />
    </svg>
  );
}

export function Drop({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 48" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 5c0 0-12 15-12 22a12 12 0 0 0 24 0c0-7-12-22-12-22z" />
      <path d="M15 28c0 4 2 7 6 8" />
    </svg>
  );
}

export function House({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 20 20 6l15 14" />
      <path d="M9 17v17h22V17" />
      <path d="M16 34v-9h8v9" />
    </svg>
  );
}

export function Arrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 24" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h36" />
      <path d="M29 4l10 8-10 8" />
    </svg>
  );
}

export function Squiggle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 14" className={cn(base, className)} fill="none" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
      <path d="M2 8c8-9 16 5 24 0s16-9 24 0 16 5 24 0 16-9 24 0 16 5 24 0" />
    </svg>
  );
}

export function Sparkle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} style={style} aria-hidden="true">
      <path d="M12 1c.9 6.3 3.7 9.1 10 10-6.3.9-9.1 3.7-10 10-.9-6.3-3.7-9.1-10-10C8.3 10.1 11.1 7.3 12 1z" />
    </svg>
  );
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-crema", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Sparkle key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}

export function MokaPot({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 56" className={cn(base, className)} fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 28h20l-3 18a3 3 0 0 1-3 2.6H20a3 3 0 0 1-3-2.6z" />
      <path d="M12 28l4-7h16l4 7" />
      <path d="M20 21l1.5-7h5L28 21" />
      <path d="M32 14h6v6" />
    </svg>
  );
}

const iconMap = { bean: Bean, cup: Cup, drop: Drop, house: House, star: Sparkle, bottle: MokaPot } as const;

export function DoodleIcon({ name, className }: { name: keyof typeof iconMap; className?: string }) {
  const Cmp = iconMap[name];
  return <Cmp className={className} />;
}
