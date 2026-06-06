"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "light" | "dark";
};

const PHOTO_SRC = "/inhaus-bottle.png";

/**
 * INHAUS bottle visual.
 *
 * Primary source is the real product artwork at /public/inhaus-bottle.png.
 * Drop that file into the `public/` folder and it shows automatically.
 *
 * We render the inline SVG recreation by default and quietly preload the
 * photo in the background — only swapping to it once the browser confirms
 * the file actually loaded. That way there is never a broken-image state.
 */
export default function InhausBottle({ className }: Props) {
  const [photoOk, setPhotoOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setPhotoOk(true);
    img.src = PHOTO_SRC;
  }, []);

  if (photoOk) {
    return (
      <div className={cn("relative flex items-center justify-center select-none", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTO_SRC}
          alt="INHAUS speciality coffee concentrate bottle"
          className="h-full w-full max-h-[520px] object-contain drop-shadow-2xl"
        />
      </div>
    );
  }

  return <BottleArtFallback className={className} />;
}

function BottleArtFallback({ className }: Props) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <svg
        viewBox="0 0 220 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-[500px] drop-shadow-2xl"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A1604" />
            <stop offset="26%" stopColor="#5A2D07" />
            <stop offset="52%" stopColor="#7C400B" />
            <stop offset="76%" stopColor="#482105" />
            <stop offset="100%" stopColor="#1B0E02" />
          </linearGradient>
          <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#231303" />
            <stop offset="45%" stopColor="#5A2D07" />
            <stop offset="100%" stopColor="#190C02" />
          </linearGradient>
          <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="55%" stopColor="#161616" />
            <stop offset="100%" stopColor="#2E2E2E" />
          </linearGradient>
          <linearGradient id="highlightGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="62%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="labelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7F0DC" />
            <stop offset="100%" stopColor="#EDE0C2" />
          </linearGradient>
          <filter id="bottleShadow" x="-20%" y="-5%" width="140%" height="112%">
            <feDropShadow dx="5" dy="14" stdDeviation="15" floodColor="#1A0800" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ── Bottle body (apothecary silhouette) ───────────────────── */}
        <path
          d="M52 200 Q50 150 86 142 L134 142 Q170 150 168 200 L168 452 Q168 470 152 474 L68 474 Q52 470 52 452 Z"
          fill="url(#bottleGrad)"
          filter="url(#bottleShadow)"
        />

        {/* Neck */}
        <rect x="84" y="118" width="52" height="28" fill="url(#neckGrad)" />

        {/* Big dropper-style cap */}
        <rect x="64" y="70" width="92" height="52" rx="11" fill="url(#capGrad)" />
        <rect x="64" y="70" width="92" height="14" rx="7" fill="#0E0E0E" opacity="0.55" />
        <rect x="64" y="112" width="92" height="8" rx="3" fill="#1C1C1C" />
        {/* cap ridges */}
        <line x1="74" y1="92" x2="74" y2="108" stroke="#000" strokeWidth="1.5" opacity="0.35" />
        <line x1="146" y1="92" x2="146" y2="108" stroke="#fff" strokeWidth="1" opacity="0.12" />

        {/* Glass sheen */}
        <path d="M62 150 Q56 200 56 250 L56 450" stroke="rgba(255,255,255,0.13)" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M52 200 Q50 150 86 142 L134 142 Q170 150 168 200 L168 452 Q168 470 152 474 L68 474 Q52 470 52 452 Z"
          fill="url(#highlightGrad)"
        />

        {/* ── Cream label ───────────────────────────────────────────── */}
        <rect x="61" y="214" width="98" height="214" rx="9" fill="url(#labelGrad)" />
        <rect x="65" y="218" width="90" height="206" rx="6" fill="none" stroke="#C9AE6E" strokeWidth="1" strokeDasharray="3 3" />

        {/* Brand mark — little pouring cup doodle (espresso tossed bean) */}
        <g transform="translate(110, 238)" stroke="#1A0D02" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M-9 -6 Q-13 -2 -9 3 L-2 9 Q3 11 7 7 L13 -1" />
          <path d="M7 7 Q12 9 13 4 Q14 0 9 -1" />
          <circle cx="13" cy="-9" r="3" fill="#E8601A" stroke="none" />
        </g>

        {/* Lowercase wordmark */}
        <text x="111" y="270" textAnchor="middle" fontFamily="'Inter', Arial, sans-serif" fontSize="27" fontWeight="800" letterSpacing="-1" fill="#16100A">
          inhaus
        </text>
        {/* orange dot over the i */}
        <circle cx="79.5" cy="249" r="3.4" fill="#E8601A" />

        {/* Sub-label */}
        <text x="110" y="286" textAnchor="middle" fontFamily="monospace" fontSize="6.5" letterSpacing="2.5" fill="#7A5C30">
          ESPRESSO CONCENTRATE
        </text>

        {/* Espresso-machine line illustration */}
        <g transform="translate(80,296)" stroke="#3D2308" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="4" y="14" width="52" height="30" rx="4" />
          <rect x="18" y="30" width="24" height="9" rx="2.5" />
          <line x1="30" y1="39" x2="30" y2="46" />
          <path d="M23 46 Q30 49 37 46" />
          <path d="M25 50 L27 58 L33 58 L35 50 Z" strokeWidth="1.2" />
          <path d="M35 53 Q39 53 39 55.5 Q39 58 35 58" strokeWidth="1.1" />
          <rect x="16" y="48" width="28" height="2.6" rx="1" strokeWidth="1.1" />
          <circle cx="47" cy="22" r="4" />
          <circle cx="47" cy="22" r="1.4" fill="#3D2308" stroke="none" />
          <circle cx="13" cy="22" r="5" />
          <path d="M13 18 L13 22 L16 22" strokeWidth="1.1" />
          <path d="M56 19 Q62 19 62 27 Q62 32 57 34" />
          <line x1="54" y1="35" x2="60" y2="35" />
          {/* steam */}
          <path d="M24 12 Q26 8 24 4" strokeWidth="1" opacity="0.7" />
          <path d="M30 11 Q32 7 30 3" strokeWidth="1" opacity="0.7" />
          <path d="M36 12 Q38 8 36 4" strokeWidth="1" opacity="0.7" />
        </g>

        {/* Variant line */}
        <text x="110" y="372" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fontStyle="italic" letterSpacing="2" fill="#5C3010">
          * CLASSIC *
        </text>
        <text x="110" y="386" textAnchor="middle" fontFamily="monospace" fontSize="6" letterSpacing="1.5" fill="#8A6736">
          MAKES 20+ DRINKS
        </text>

        {/* ₹22 / cup pill */}
        <rect x="80" y="392" width="60" height="17" rx="8.5" fill="#3D2308" />
        <text x="110" y="404" textAnchor="middle" fontFamily="monospace" fontSize="7.5" letterSpacing="0.5" fill="#F7F0DC">
          ₹22 / cup
        </text>

        {/* Veg mark */}
        <rect x="138" y="414" width="11" height="11" rx="2" fill="none" stroke="#177545" strokeWidth="1.2" />
        <circle cx="143.5" cy="419.5" r="2.4" fill="#177545" />

        {/* ── Floating doodle stickers ───────────────────────────────── */}
        {/* NO machines — top left */}
        <g transform="translate(-2, 132) rotate(-11)">
          <rect x="0" y="0" width="76" height="30" rx="15" fill="#F7F0DC" />
          <rect x="2" y="2" width="72" height="26" rx="13" fill="none" stroke="#1A0D02" strokeWidth="1" strokeDasharray="2 2" />
          <text x="38" y="10.5" textAnchor="middle" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5" fill="#E8601A" fontWeight="700">NO</text>
          <text x="38" y="20.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" letterSpacing="1" fill="#1A0D02">machines</text>
        </g>

        {/* 100% Coffee — top right */}
        <g transform="translate(160, 146) rotate(9)">
          <rect x="0" y="0" width="72" height="30" rx="15" fill="#E8601A" />
          <text x="36" y="11" textAnchor="middle" fontFamily="monospace" fontSize="6" letterSpacing="0.5" fill="#FFF5E8" fontWeight="700">100%</text>
          <text x="36" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7.5" letterSpacing="0.5" fill="#FFF5E8">Coffee</text>
        </g>

        {/* Make 20+ Drinks — right mid */}
        <g transform="translate(164, 296) rotate(6)">
          <rect x="0" y="0" width="70" height="36" rx="12" fill="#1A3A2A" />
          <text x="35" y="12" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#A8D5B5" fontWeight="700">Make</text>
          <text x="35" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#FFF" fontWeight="bold">20+</text>
          <text x="35" y="33" textAnchor="middle" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5" fill="#A8D5B5">Drinks</text>
        </g>

        {/* NO compromises — left mid */}
        <g transform="translate(-14, 312) rotate(-8)">
          <rect x="0" y="0" width="82" height="30" rx="15" fill="#F7F0DC" />
          <rect x="2" y="2" width="78" height="26" rx="13" fill="none" stroke="#1A0D02" strokeWidth="1" strokeDasharray="2 2" />
          <text x="41" y="10.5" textAnchor="middle" fontFamily="monospace" fontSize="5.5" letterSpacing="0.5" fill="#E8601A" fontWeight="700">NO</text>
          <text x="41" y="21" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" letterSpacing="0.5" fill="#1A0D02">compromises</text>
        </g>

        {/* BYOB — bottom left */}
        <g transform="translate(4, 430) rotate(-12)">
          <circle cx="24" cy="24" r="24" fill="#8931C4" />
          <text x="24" y="19" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="1" fill="#F0E8FF" fontWeight="700">BYOB</text>
          <text x="24" y="29" textAnchor="middle" fontFamily="monospace" fontSize="4.5" fill="#D4B8F0">Bring Your</text>
          <text x="24" y="36" textAnchor="middle" fontFamily="monospace" fontSize="4.5" fill="#D4B8F0">Own Beans</text>
        </g>

        {/* Don't Do Powder — bottom right */}
        <g transform="translate(152, 420) rotate(10)">
          <rect x="0" y="0" width="72" height="36" rx="10" fill="#1A0D02" />
          <text x="36" y="12" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#F7F0DC">Don&apos;t Do</text>
          <text x="36" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#E8601A" fontWeight="bold">Powder</text>
          <text x="36" y="33" textAnchor="middle" fontFamily="monospace" fontSize="4.5" letterSpacing="1" fill="#9A7040">real coffee only</text>
        </g>
      </svg>
    </div>
  );
}
