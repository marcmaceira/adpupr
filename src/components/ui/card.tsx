import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Card and panel surfaces used by the design. */
export const CARD_VARIANTS = {
  /** `.card` from globals.css: surface, border, 8px radius, shadow that lifts on hover. */
  card: "card",
  /** Static white card with the card shadow. */
  raised: "rounded-lg border border-border bg-surface shadow-[var(--shadow-card)]",
  /** Tinted box on light sections. */
  tinted: "rounded-lg border border-border bg-surface-2",
  /** Dark panel. */
  dark: "rounded-lg bg-primary",
  /** Dashed empty state. */
  empty: "rounded-lg border border-dashed border-border-strong bg-surface-2",
} as const;

export type CardVariant = keyof typeof CARD_VARIANTS;

interface CardProps {
  readonly variant?: CardVariant;
  readonly as?: "div" | "article" | "form" | "li" | "aside";
  readonly className?: string;
  readonly children: ReactNode;
}

export function Card({ variant = "card", as = "div", className, children }: CardProps) {
  const Tag = as;
  return <Tag className={cx(CARD_VARIANTS[variant], className)}>{children}</Tag>;
}

/** Icon chips: a tinted circle or square holding a lucide icon. */
export const CHIP_VARIANTS = {
  circle40:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary",
  square40: "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-sky-50 text-primary",
  square48: "flex h-12 w-12 items-center justify-center rounded-sm bg-sky-50 text-primary",
  square48Dark: "flex h-12 w-12 items-center justify-center rounded-sm bg-white/10 text-mustard",
  circle48:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary",
  circle56Primary: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white",
  /** 40px circle that sizes its icon to 20px with a 1.75 stroke (event detail strip). */
  circle40SmallIcon:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.75]",
} as const;

export type ChipVariant = keyof typeof CHIP_VARIANTS;

export function Chip({
  variant,
  className,
  children,
}: {
  readonly variant: ChipVariant;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  return <span className={cx(CHIP_VARIANTS[variant], className)}>{children}</span>;
}
