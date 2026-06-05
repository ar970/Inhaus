"use client";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "light" | "dark";
};

/**
 * Illustrated INHAUS bottle — dark amber glass, cream label, doodle stickers.
 * Stand-in until real product photography is ready.
 */
export default function InhausBottle({ className, variant = "light" }: Props) {
  const dark = variant === "dark";

  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <svg
        viewBox="0 0 220 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-[480px] drop-shadow-2xl"
        aria-hidden="true"
      >
        {/* ── Bottle glass body ─────────────────────────────────────── */}
        <defs>
          <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2C1805" />
            <stop offset="28%" stopColor="#5C2F08" />
            <stop offset="55%" stopColor="#7A3E0A" />
            <stop offset="78%" stopColor="#4A2206" />
            <stop offset="100%" stopColor="#1E1002" />
          </linearGradient>
          <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#251504" />
            <stop offset="40%" stopColor="#5C2F08" />
            <stop offset="70%" stopColor="#4A2206" />
            <stop offset="100%" stopColor="#1A0D02" />
          </linearGradient>
          <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#3A3A3A" />
          </linearGradient>
          <linearGradient id="highlightGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="labelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5EDD8" />
            <stop offset="100%" stopColor="#EDE0C4" />
          </linearGradient>
          <filter id="bottleShadow" x="-15%" y="-5%" width="130%" height="110%">
            <feDropShadow dx="6" dy="12" stdDeviation="14" floodColor="#1A0800" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Shoulder curve */}
        <path
          d="M68 148 Q52 185 48 230 L48 430 Q48 455 55 462 Q72 472 110 472 Q148 472 165 462 Q172 455 172 430 L172 230 Q168 185 152 148 Z"
          fill="url(#bottleGrad)"
          filter="url(#bottleShadow)"
        />

        {/* Neck */}
        <path
          d="M83 75 L83 148 Q90 155 110 157 Q130 155 137 148 L137 75 Z"
          fill="url(#neckGrad)"
        />

        {/* Cap / lid */}
        <rect x="79" y="48" width="62" height="30" rx="10" fill="url(#capGrad)" />
        <rect x="79" y="48" width="62" height="10" rx="5" fill="#111" opacity="0.6" />
        {/* Cap ring */}
        <rect x="79" y="74" width="62" height="6" rx="2" fill="#222" />

        {/* Bottle highlight (left edge sheen) */}
        <path
          d="M68 148 Q52 185 48 230 L48 430 Q48 455 55 462"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Neck highlight */}
        <path d="M88 80 L88 148" stroke="rgba(255,255,255,0.10)" strokeWidth="3" strokeLinecap="round" />

        {/* Gloss overlay across full body */}
        <path
          d="M68 148 Q52 185 48 230 L48 430 Q48 455 55 462 Q72 472 110 472 Q148 472 165 462 Q172 455 172 430 L172 230 Q168 185 152 148 L137 148 Q130 155 110 157 Q90 155 83 148 Z"
          fill="url(#highlightGrad)"
        />

        {/* ── Label ─────────────────────────────────────────────────── */}
        <rect x="55" y="215" width="110" height="190" rx="10" fill="url(#labelGrad)" />

        {/* Label inner border */}
        <rect x="59" y="219" width="102" height="182" rx="7" fill="none" stroke="#C4A96A" strokeWidth="1" strokeDasharray="4 3" />

        {/* Brand name */}
        <text x="110" y="253" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" letterSpacing="4" fill="#1A0D02">
          INHAUS
        </text>

        {/* Tagline */}
        <text x="110" y="269" textAnchor="middle" fontFamily="monospace" fontSize="6.5" letterSpacing="2" fill="#7A5C30" textDecoration="">
          SPECIALITY CONCENTRATE
        </text>

        {/* Illustrated espresso machine — minimal doodle style */}
        <g transform="translate(73,278)">
          {/* Machine body */}
          <rect x="6" y="18" width="60" height="36" rx="5" fill="none" stroke="#3D2308" strokeWidth="1.8" />
          {/* Group head / portafilter */}
          <rect x="22" y="38" width="28" height="10" rx="3" fill="none" stroke="#3D2308" strokeWidth="1.5" />
          <line x1="36" y1="48" x2="36" y2="56" stroke="#3D2308" strokeWidth="1.5" />
          <path d="M28 56 Q36 60 44 56" fill="none" stroke="#3D2308" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cup on drip tray */}
          <path d="M30 60 L32 70 L40 70 L42 60 Z" fill="none" stroke="#3D2308" strokeWidth="1.3" />
          <path d="M42 64 Q46 64 46 67 Q46 70 42 70" fill="none" stroke="#3D2308" strokeWidth="1.2" />
          {/* Drip tray */}
          <rect x="20" y="58" width="32" height="3" rx="1" fill="none" stroke="#3D2308" strokeWidth="1.2" />
          {/* Knob */}
          <circle cx="55" cy="28" r="5" fill="none" stroke="#3D2308" strokeWidth="1.4" />
          <circle cx="55" cy="28" r="2" fill="#3D2308" />
          {/* Pressure gauge */}
          <circle cx="15" cy="28" r="6" fill="none" stroke="#3D2308" strokeWidth="1.4" />
          <path d="M15 24 L15 28 L18 28" stroke="#3D2308" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Steam wand */}
          <path d="M66 24 Q74 24 74 34 Q74 40 68 42" fill="none" stroke="#3D2308" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="65" y1="43" x2="72" y2="43" stroke="#3D2308" strokeWidth="1.4" strokeLinecap="round" />
          {/* Steam wisps */}
          <path d="M31 16 Q33 11 31 6" fill="none" stroke="#3D2308" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
          <path d="M36 14 Q38 9 36 4" fill="none" stroke="#3D2308" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
          <path d="M41 16 Q43 11 41 6" fill="none" stroke="#3D2308" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Volume / price badge */}
        <text x="110" y="355" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" letterSpacing="1" fill="#5C3010">
          500 ml · 20+ cups
        </text>

        {/* ₹22/cup pill */}
        <rect x="80" y="363" width="60" height="18" rx="9" fill="#3D2308" />
        <text x="110" y="375.5" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="1" fill="#F5EDD8">
          ₹22 / cup
        </text>

        {/* Bottom label text */}
        <text x="110" y="398" textAnchor="middle" fontFamily="monospace" fontSize="6" letterSpacing="2" fill="#9A7040" opacity="0.8">
          COLD EXTRACTED
        </text>

        {/* ── Floating doodle stickers ───────────────────────────────── */}

        {/* Sticker: NO machines — top left */}
        <g transform="translate(-2, 120) rotate(-11)">
          <rect x="0" y="0" width="76" height="30" rx="15" fill="#F5EDD8" />
          <rect x="2" y="2" width="72" height="26" rx="13" fill="none" stroke="#1A0D02" strokeWidth="1" strokeDasharray="2 2" />
          <text x="38" y="10.5" textAnchor="middle" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5" fill="#E8601A" fontWeight="700">NO</text>
          <text x="38" y="20.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" letterSpacing="1" fill="#1A0D02">machines</text>
        </g>

        {/* Sticker: 100% Coffee — top right */}
        <g transform="translate(160, 135) rotate(9)">
          <rect x="0" y="0" width="72" height="30" rx="15" fill="#E8601A" />
          <text x="36" y="11" textAnchor="middle" fontFamily="monospace" fontSize="6" letterSpacing="0.5" fill="#FFF5E8" fontWeight="700">100%</text>
          <text x="36" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7.5" letterSpacing="0.5" fill="#FFF5E8">Coffee</text>
        </g>

        {/* Sticker: Make 20+ Drinks — right mid */}
        <g transform="translate(162, 285) rotate(6)">
          <rect x="0" y="0" width="70" height="36" rx="12" fill="#1A3A2A" />
          <text x="35" y="12" textAnchor="middle" fontFamily="monospace" fontSize="6" letterSpacing="0" fill="#A8D5B5" fontWeight="700">Make</text>
          <text x="35" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="0" fill="#FFF" fontWeight="bold">20+</text>
          <text x="35" y="33" textAnchor="middle" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5" fill="#A8D5B5">Drinks</text>
        </g>

        {/* Sticker: NO compromises — left mid */}
        <g transform="translate(-14, 300) rotate(-8)">
          <rect x="0" y="0" width="82" height="30" rx="15" fill="#F5EDD8" />
          <rect x="2" y="2" width="78" height="26" rx="13" fill="none" stroke="#1A0D02" strokeWidth="1" strokeDasharray="2 2" />
          <text x="41" y="10.5" textAnchor="middle" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5" fill="#E8601A" fontWeight="700">NO</text>
          <text x="41" y="21" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" letterSpacing="0.5" fill="#1A0D02">compromises</text>
        </g>

        {/* Sticker: BYOB — bottom left */}
        <g transform="translate(4, 418) rotate(-12)">
          <circle cx="24" cy="24" r="24" fill="#8931C4" />
          <text x="24" y="19" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="1" fill="#F0E8FF" fontWeight="700">BYOB</text>
          <text x="24" y="29" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0" fill="#D4B8F0">Bring Your</text>
          <text x="24" y="36" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="0" fill="#D4B8F0">Own Beans</text>
        </g>

        {/* Sticker: Don't Do Powder — bottom right */}
        <g transform="translate(152, 408) rotate(10)">
          <rect x="0" y="0" width="72" height="36" rx="10" fill="#1A0D02" />
          <text x="36" y="12" textAnchor="middle" fontFamily="monospace" fontSize="5" letterSpacing="0" fill="#F5EDD8">Don&apos;t Do</text>
          <text x="36" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="0" fill="#E8601A" fontWeight="bold">Powder</text>
          <text x="36" y="33" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="1" fill="#9A7040">☕ real only</text>
        </g>
      </svg>
    </div>
  );
}
