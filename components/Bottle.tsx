import { cn } from "@/lib/cn";

type BottleProps = {
  className?: string;
  accent?: string;
  variant?: string;
};

/**
 * The INHAUS concentrate bottle, drawn as inline SVG so it scales crisp and
 * can be tinted per variant. Swap for product photography later by replacing
 * this component where it is used.
 */
export default function Bottle({ className, accent = "#2A1C14", variant = "BLACK" }: BottleProps) {
  const clipId = `inhaus-body-${variant}`;
  return (
    <svg viewBox="0 0 160 372" className={cn("h-auto", className)} fill="none" role="img" aria-label={`INHAUS ${variant} concentrate bottle`}>
      <defs>
        <clipPath id={clipId}>
          <path d="M58 54c0 12-16 18-16 48v228a14 14 0 0 0 14 14h48a14 14 0 0 0 14-14V102c0-30-16-36-16-48z" />
        </clipPath>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="80" cy="356" rx="46" ry="8" fill="#211712" opacity="0.10" />

      {/* liquid + glass fill */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="40" y="50" width="80" height="306" fill="#FBF7EF" />
        <rect x="40" y="166" width="80" height="190" fill={accent} />
        <rect x="40" y="162" width="80" height="6" fill={accent} opacity="0.55" />
        <rect x="50" y="60" width="10" height="296" fill="#FFFFFF" opacity="0.25" />
      </g>

      {/* body outline */}
      <path
        d="M58 54c0 12-16 18-16 48v228a14 14 0 0 0 14 14h48a14 14 0 0 0 14-14V102c0-30-16-36-16-48z"
        stroke="#211712"
        strokeWidth={2.5}
      />

      {/* neck + cap */}
      <path d="M63 32v22M97 32v22M61 33h38" stroke="#211712" strokeWidth={2.5} strokeLinecap="round" />
      <rect x="59" y="6" width="42" height="27" rx="6" fill={accent} stroke="#211712" strokeWidth={2.5} />
      <path d="M66 12v15M72 12v15" stroke="#FBF7EF" strokeWidth={1.5} strokeLinecap="round" opacity="0.5" />

      {/* label */}
      <rect x="48" y="160" width="64" height="126" rx="9" fill="#F6EFE3" stroke="#211712" strokeWidth={2} />
      <text x="80" y="196" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontStyle="italic" fontSize="20" fill="#211712">INHAUS</text>
      <text x="80" y="214" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6.4" letterSpacing="1.6" fill="#211712">COFFEE CONCENTRATE</text>
      <line x1="58" y1="226" x2="102" y2="226" stroke="#211712" strokeWidth={1} opacity="0.6" />
      <text x="80" y="252" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="11" letterSpacing="3" fill={accent}>{variant}</text>
      <text x="80" y="272" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" letterSpacing="1" fill="#211712" opacity="0.55">250 ML · 20 CUPS</text>
    </svg>
  );
}
