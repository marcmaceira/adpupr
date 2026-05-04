type GeoVariant = "circles" | "stripes" | "arch" | "grid" | "halfmoon" | "auto"

interface Palette {
  bg: string
  a: string
  b: string
  c: string
}

const PALETTES: readonly Palette[] = [
  { bg: "#0d285b", a: "#75bdf0", b: "#ffd258", c: "#c8e4f8" },
  { bg: "#75bdf0", a: "#0d285b", b: "#ffd258", c: "#eef6fd" },
  { bg: "#ffd258", a: "#0d285b", b: "#75bdf0", c: "#fff0c2" },
  { bg: "#eef6fd", a: "#0d285b", b: "#75bdf0", c: "#ffd258" },
  { bg: "#091c40", a: "#75bdf0", b: "#ffd258", c: "#4a6592" },
] as const

const VARIANTS = ["circles", "stripes", "arch", "grid", "halfmoon"] as const

interface GeoPlaceholderProps {
  readonly seed?: number
  readonly variant?: GeoVariant
  readonly className?: string
}

export default function GeoPlaceholder({
  seed = 0,
  variant = "auto",
  className = "",
}: GeoPlaceholderProps) {
  const p = PALETTES[seed % PALETTES.length]
  const v: Exclude<GeoVariant, "auto"> =
    variant === "auto" ? VARIANTS[seed % VARIANTS.length] : variant

  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full"
        style={{ background: p.bg }}
        aria-hidden="true"
      >
        {v === "circles" && (
          <>
            <circle cx="120" cy="60" r="80" fill={p.a} opacity="0.85" />
            <circle cx="60" cy="180" r="60" fill={p.b} opacity="0.92" />
            <circle cx="180" cy="190" r="34" fill={p.c} opacity="0.85" />
            <circle cx="170" cy="70" r="14" fill={p.b} />
          </>
        )}
        {v === "stripes" && (
          <>
            <rect x="0" y="0" width="80" height="240" fill={p.a} />
            <rect x="80" y="0" width="40" height="240" fill={p.b} />
            <rect
              x="120"
              y="0"
              width="120"
              height="240"
              fill={p.c}
              opacity="0.55"
            />
            <circle cx="180" cy="120" r="42" fill={p.a} />
          </>
        )}
        {v === "arch" && (
          <>
            <path
              d="M 20 240 L 20 120 A 100 100 0 0 1 220 120 L 220 240 Z"
              fill={p.a}
            />
            <circle cx="120" cy="160" r="40" fill={p.b} />
            <rect
              x="0"
              y="200"
              width="240"
              height="40"
              fill={p.c}
              opacity="0.6"
            />
          </>
        )}
        {v === "grid" && (
          <>
            <rect x="20" y="20" width="90" height="90" fill={p.a} />
            <rect x="130" y="20" width="90" height="90" fill={p.b} />
            <rect
              x="20"
              y="130"
              width="90"
              height="90"
              fill={p.c}
              opacity="0.85"
            />
            <circle cx="175" cy="175" r="45" fill={p.a} />
          </>
        )}
        {v === "halfmoon" && (
          <>
            <path
              d="M 0 240 A 240 240 0 0 1 240 0 L 240 240 Z"
              fill={p.a}
            />
            <circle cx="60" cy="180" r="50" fill={p.b} />
            <rect x="160" y="40" width="60" height="60" fill={p.c} />
          </>
        )}
      </svg>
    </div>
  )
}

interface DirectorAvatarProps {
  readonly seed?: number
}

const AVATAR_PALETTES = [
  { bg: "#0d285b", fg: "#75bdf0", accent: "#ffd258" },
  { bg: "#75bdf0", fg: "#0d285b", accent: "#ffd258" },
  { bg: "#091c40", fg: "#c8e4f8", accent: "#ffd258" },
  { bg: "#eef6fd", fg: "#0d285b", accent: "#75bdf0" },
  { bg: "#4a6592", fg: "#ffd258", accent: "#75bdf0" },
  { bg: "#ffd258", fg: "#0d285b", accent: "#75bdf0" },
  { bg: "#0d285b", fg: "#ffd258", accent: "#75bdf0" },
] as const

export function DirectorAvatar({ seed = 0 }: DirectorAvatarProps) {
  const p = AVATAR_PALETTES[seed % AVATAR_PALETTES.length]
  const offset = ((seed * 7) % 10) - 5
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
          } 250 C ${190 + offset} 250 ${240 + offset} 280 ${
            240 + offset
          } 400 Z`}
          fill={p.fg}
        />
        <circle cx={150 + offset} cy="180" r="62" fill={p.fg} />
        <circle
          cx={150 + offset + 30}
          cy="120"
          r="14"
          fill={p.accent}
          opacity="0.85"
        />
      </svg>
    </div>
  )
}
