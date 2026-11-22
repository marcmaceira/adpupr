import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/* ───────────── Eyebrow ───────────── */

const EYEBROW_TONES = {
  light: "eyebrow",
  dark: "eyebrow eyebrow-on-dark",
  mustard: "eyebrow eyebrow-on-mustard",
  mustardDeep: "eyebrow eyebrow-on-mustard-deep",
} as const;

export type EyebrowTone = keyof typeof EYEBROW_TONES;

interface EyebrowProps {
  readonly children: ReactNode;
  readonly tone?: EyebrowTone;
  readonly as?: "p" | "span";
  /** Spacing classes, e.g. "mb-3.5" or "mb-4 block". */
  readonly className?: string;
  readonly style?: CSSProperties;
}

/** The institutional uppercase label above headings. Renders nothing when empty. */
export function Eyebrow({ children, tone = "light", as = "p", className, style }: EyebrowProps) {
  if (children === null || children === undefined || children === "") return null;
  const Tag = as;
  return (
    <Tag className={cx(EYEBROW_TONES[tone], className)} style={style}>
      {children}
    </Tag>
  );
}

/* ───────────── Headline text ───────────── */

interface HeadlineTextProps {
  readonly text: string | null | undefined;
  /** A fragment of `text` to render in the accent color. */
  readonly highlight?: string | null;
  /** How the highlight renders. Defaults to a mustard span. */
  readonly highlightAs?: "em" | "span";
  readonly highlightClassName?: string;
}

/**
 * Renders editor headline text: line breaks become <br />, and the first occurrence of
 * `highlight` is wrapped in an accent element.
 */
export function HeadlineText({
  text,
  highlight,
  highlightAs = "span",
  highlightClassName,
}: HeadlineTextProps) {
  if (!text) return null;
  const HighlightTag = highlightAs;
  const highlightClass =
    highlightClassName ?? (highlightAs === "em" ? "not-italic text-mustard" : "text-mustard");

  const renderLine = (line: string): ReactNode => {
    if (!highlight) return line;
    const index = line.indexOf(highlight);
    if (index === -1) return line;
    return (
      <>
        {line.slice(0, index)}
        <HighlightTag className={highlightClass}>{highlight}</HighlightTag>
        {line.slice(index + highlight.length)}
      </>
    );
  };

  const lines = text.split(/\r?\n/);
  return (
    <>
      {lines.map((line, i) => (
        // Lines are positional: the text has no stable ids and never reorders.
        // oxlint-disable-next-line react/no-array-index-key
        <Fragment key={i}>
          {i > 0 && <br />}
          {renderLine(line)}
        </Fragment>
      ))}
    </>
  );
}

/* ───────────── Heading ───────────── */

/** Heading scales defined in globals.css. Sections add color and measure. */
export const HEADING_SCALES = {
  display: "h-display",
  section: "h-section",
  none: "",
} as const;

export type HeadingScale = keyof typeof HEADING_SCALES;

interface HeadingProps {
  readonly as?: "h1" | "h2" | "h3" | "h4";
  readonly scale?: HeadingScale;
  readonly text: string | null | undefined;
  readonly highlight?: string | null;
  readonly highlightAs?: "em" | "span";
  readonly highlightClassName?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly id?: string;
}

export function Heading({
  as = "h2",
  scale = "section",
  text,
  highlight,
  highlightAs,
  highlightClassName,
  className,
  style,
  id,
}: HeadingProps) {
  if (!text) return null;
  const Tag = as;
  return (
    <Tag id={id} className={cx(HEADING_SCALES[scale], className) || undefined} style={style}>
      <HeadlineText
        text={text}
        highlight={highlight}
        highlightAs={highlightAs}
        highlightClassName={highlightClassName}
      />
    </Tag>
  );
}
