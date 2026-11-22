import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { isExternalHref } from "@/lib/links";

/**
 * Every button and button-like link recipe the design uses. Class strings are complete
 * literals so Tailwind emits them. Names describe the look, not the place.
 */
export const BUTTON_VARIANTS = {
  /** Mustard solid, large (hero, conference band). */
  accentLg:
    "inline-flex items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-3.5 font-heading text-[15px] font-semibold text-primary transition-colors hover:bg-mustard-600",
  /** White outline on dark, large. */
  inverseOutlineLg:
    "inline-flex items-center justify-center rounded-sm border border-white/70 px-6 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-primary",
  /** Primary solid, large (membership band). */
  primaryLg:
    "inline-flex items-center gap-2 self-start rounded-sm bg-primary px-6 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-primary-700 md:self-auto",
  /** Primary solid, medium, bold. */
  primaryMd:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  /** Primary solid, medium, semibold, does not shrink (form submit). */
  primaryMdSemibold:
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  /** Primary solid, medium, taller (on mustard band). */
  primaryMdTall:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
  /** Primary outline, medium. */
  outlineMd:
    "inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-3 font-heading text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  /** Primary outline tile with label and value on opposite ends. */
  outlineTile:
    "flex min-h-16 items-center justify-between gap-4 rounded-sm border border-primary px-4 py-3 font-heading text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  /** Mustard solid, medium, inline (on dark hero). */
  accentMd:
    "rounded-sm bg-mustard px-5 py-3 font-heading text-sm font-bold text-primary transition-colors hover:bg-mustard-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  /** Mustard solid, medium, full width on mobile. */
  accentMdBlock:
    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-3 font-heading text-sm font-bold text-primary transition-colors hover:bg-mustard-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard md:w-auto",
  /** Mustard solid, medium, tall. */
  accentMdTall:
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-4 font-heading text-sm font-bold text-primary transition-colors hover:bg-mustard-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard",
  /** White outline on dark, medium. */
  inverseOutlineMd:
    "rounded-sm border border-white/60 px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  /** Pricing card button, featured. */
  priceSolid:
    "mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-heading text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary bg-primary text-white hover:bg-primary-700",
  /** Pricing card button, regular. */
  priceOutline:
    "mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-heading text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary border border-primary text-primary hover:bg-sky-50",
  /** Soft outline with trailing chevron (agenda toggle). */
  soft: "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-sm border border-primary/30 py-3 pl-5 pr-3 font-heading text-base font-semibold text-primary hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm",
  /** Plain text button that underlines on hover. */
  plain:
    "inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm font-heading text-base font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm",
  /** Header call to action, desktop. */
  navCta:
    "inline-flex items-center rounded-sm bg-primary px-4 py-2 font-heading text-[13px] font-semibold text-white transition-colors hover:bg-primary-700",
  /** Header call to action, mobile menu. */
  navCtaMobile:
    "mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-3 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-700",
} as const;

/** Underlined text links with a trailing arrow. */
export const TEXT_LINK_VARIANTS = {
  light:
    "inline-flex items-center gap-2 font-heading text-sm font-bold text-primary underline decoration-sky-200 decoration-2 underline-offset-4 transition-colors hover:text-primary-700",
  dark: "inline-flex items-center gap-2 font-heading text-sm font-bold text-white underline decoration-mustard decoration-2 underline-offset-4 transition-colors hover:text-mustard",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type TextLinkVariant = keyof typeof TEXT_LINK_VARIANTS;

interface SmartLinkProps {
  readonly href: string;
  readonly className: string;
  readonly newTab?: boolean;
  readonly children: ReactNode;
  readonly ariaLabel?: string;
  readonly onClick?: () => void;
  readonly download?: boolean;
}

/**
 * Uses next/link for in-site paths and a plain anchor for external, mail, phone and
 * download links. New-tab links always get rel="noopener noreferrer".
 */
export function SmartLink({
  href,
  className,
  newTab,
  children,
  ariaLabel,
  onClick,
  download,
}: SmartLinkProps) {
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;

  if (isExternalHref(href) || download) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

interface ButtonLinkProps {
  readonly href: string;
  readonly variant: ButtonVariant;
  readonly children: ReactNode;
  /** Layout-only additions such as margins or self-alignment. */
  readonly className?: string;
  readonly newTab?: boolean;
  readonly ariaLabel?: string;
  readonly onClick?: () => void;
}

export function ButtonLink({ variant, className, ...rest }: ButtonLinkProps) {
  return <SmartLink {...rest} className={cx(BUTTON_VARIANTS[variant], className)} />;
}

interface TextLinkProps {
  readonly href: string;
  readonly variant?: TextLinkVariant;
  readonly children: ReactNode;
  readonly className?: string;
  readonly newTab?: boolean;
}

export function TextLink({ variant = "light", className, ...rest }: TextLinkProps) {
  return <SmartLink {...rest} className={cx(TEXT_LINK_VARIANTS[variant], className)} />;
}
