/**
 * Geometric silhouette shown behind (or instead of) a portrait. Purely decorative; the
 * palette and offset vary by position so neighbouring cards differ.
 */

const AVATAR_PALETTES = [
  { bg: "#0d285b", fg: "#75bdf0", accent: "#ffd258" },
  { bg: "#75bdf0", fg: "#0d285b", accent: "#ffd258" },
  { bg: "#091c40", fg: "#c8e4f8", accent: "#ffd258" },
  { bg: "#eef6fd", fg: "#0d285b", accent: "#75bdf0" },
  { bg: "#4a6592", fg: "#ffd258", accent: "#75bdf0" },
  { bg: "#ffd258", fg: "#0d285b", accent: "#75bdf0" },
  { bg: "#0d285b", fg: "#ffd258", accent: "#75bdf0" },
] as const;

export function PersonAvatar({ seed = 0 }: { readonly seed?: number }) {
  const p = AVATAR_PALETTES[seed % AVATAR_PALETTES.length];
  const offset = ((seed * 7) % 10) - 5;
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
        style={{ background: p.bg }}
        aria-hidden="true"
      >
        <circle cx={150 + offset} cy={400} r={220} fill={p.fg} opacity="0.18" />
        <rect x="0" y="320" width="300" height="80" fill={p.fg} opacity="0.30" />
        <path
          d={`M ${60 + offset} 400 C ${60 + offset} 280 ${110 + offset} 250 ${
            150 + offset
          } 250 C ${190 + offset} 250 ${240 + offset} 280 ${240 + offset} 400 Z`}
          fill={p.fg}
        />
        <circle cx={150 + offset} cy="180" r="62" fill={p.fg} />
        <circle cx={150 + offset + 30} cy="120" r="14" fill={p.accent} opacity="0.85" />
      </svg>
    </div>
  );
}
