import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";

/* ───────────── Section shell ───────────── */

/** Background tones. Keys match the `tone` option values in Payload's section settings. */
export const SECTION_TONES = {
  bg: "bg-bg",
  surface: "bg-surface",
  surface2: "bg-surface-2",
  sky50: "bg-sky-50",
  primary: "bg-primary",
  primary900: "bg-primary-900",
  mustard: "bg-mustard",
} as const;

export type SectionTone = keyof typeof SECTION_TONES;

/**
 * Vertical rhythm recipes, each including the horizontal gutter that pairs with a
 * `wide` container. Names are what the design calls them, not where they are used.
 */
export const SECTION_SPACING = {
  none: "",
  /** py-20 → md:py-28. Most interior sections. */
  standard: "px-6 py-20 md:py-28",
  /** py-24 → md:py-[112px]. Homepage content sections. */
  relaxed: "px-6 py-24 md:py-[112px]",
  /** py-16 → sm:py-20. */
  compact: "px-6 py-16 sm:py-20",
  /** py-16 → sm:py-24. */
  compactTall: "px-6 py-16 sm:py-24",
  /** py-16 → md:py-20. */
  band: "px-6 py-16 md:py-20",
  /** py-20 → md:py-24. */
  medium: "px-6 py-20 md:py-24",
  /** py-16 flat. */
  tight: "px-6 py-16",
} as const;

export type SectionSpacing = keyof typeof SECTION_SPACING;

interface SectionProps {
  readonly tone?: SectionTone;
  readonly spacing?: SectionSpacing;
  /** Anchor id, from the block's section settings. */
  readonly id?: string | null;
  /** Extra classes for this section's own recipe (borders, overflow, text color). */
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children: ReactNode;
  readonly ariaLabelledby?: string;
}

export function Section({
  tone,
  spacing = "none",
  id,
  className,
  style,
  children,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id || undefined}
      aria-labelledby={ariaLabelledby}
      className={cx(SECTION_SPACING[spacing], tone && SECTION_TONES[tone], className) || undefined}
      style={style}
    >
      {children}
    </section>
  );
}

/* ───────────── Container ───────────── */

/**
 * Two width conventions coexist in the design and give different content widths:
 * - `wide`: the section supplies px-6, the container caps at 1200px (1200px of content).
 * - `narrow`: the container caps at 1200px *and* adds px-6 (1152px of content).
 */
export const CONTAINER_WIDTHS = {
  wide: "mx-auto max-w-[1200px]",
  narrow: "mx-auto max-w-[1200px] px-6",
  /** 1248px with its own gutter: same content width as `wide`. */
  wideInset: "mx-auto max-w-[1248px] px-6",
  /** The stats band. */
  stats: "mx-auto max-w-[760px]",
  /**
   * `narrow` plus Tailwind's `container` class, kept literally from the home CTA bands.
   * At 1440 `max-w-[1200px]` wins (1152px of content); the class stays for parity.
   */
  narrowContainer: "container mx-auto max-w-[1200px] px-6",
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTHS;

interface ContainerProps {
  readonly width?: ContainerWidth;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Container({ width = "wide", className, children }: ContainerProps) {
  return <div className={cx(CONTAINER_WIDTHS[width], className)}>{children}</div>;
}

/* ───────────── Ornaments ───────────── */

interface RingProps {
  /** Position, size and border classes. */
  readonly className: string;
  readonly style?: CSSProperties;
}

/** A decorative ring or disc behind dark sections. Never interactive, never announced. */
export function Ring({ className, style }: RingProps) {
  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none absolute rounded-full", className)}
      style={style}
    />
  );
}

/* ───────────── Accent rules ───────────── */

/** The short mustard bar used under sidebar headings. */
export function GoldBar({ className }: { readonly className?: string }) {
  return <div aria-hidden="true" className={cx("h-1 w-16 bg-mustard", className ?? "mt-8")} />;
}
