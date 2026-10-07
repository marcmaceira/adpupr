import { Fragment, type ReactNode } from "react";

/**
 * Lightweight formatting for plain-text CMS fields: `**text**` becomes bold.
 * Line breaks typed by editors are preserved through `whitespace-pre-line`.
 */
export function renderInline(text: string | null | undefined, boldClassName?: string): ReactNode {
  if (!text) return null;

  const nodes: ReactNode[] = [];
  let offset = 0;

  for (const part of text.split(/(\*\*[^*]+\*\*)/g)) {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);

    if (bold) {
      nodes.push(
        <strong key={offset} className={boldClassName}>
          {bold[1]}
        </strong>,
      );
    } else if (part) {
      nodes.push(<Fragment key={offset}>{part}</Fragment>);
    }

    offset += part.length;
  }

  return <span className="whitespace-pre-line">{nodes}</span>;
}

/**
 * Renders a heading with an optional highlighted phrase (first occurrence).
 * The heading element should use `whitespace-pre-line` to keep line breaks.
 */
export function renderHighlighted(
  text: string | null | undefined,
  highlight: string | null | undefined,
  highlightClassName: string,
): ReactNode {
  if (!text) return null;

  const start = highlight ? text.indexOf(highlight) : -1;

  if (!highlight || start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <em className={highlightClassName}>{highlight}</em>
      {text.slice(start + highlight.length)}
    </>
  );
}

/** Two-digit ordinal used by numbered lists ("01", "02"…). */
export function ordinal(index: number) {
  return String(index + 1).padStart(2, "0");
}
