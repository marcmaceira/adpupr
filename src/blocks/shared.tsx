import { CmsLink } from "@/components/cms-link";

/** Draft data may omit an anchor; only render nonempty string IDs. */
export function sectionAnchor(block: { readonly anchor?: string | null }): string | undefined {
  return "anchor" in block && typeof block.anchor === "string" && block.anchor
    ? block.anchor
    : undefined;
}

export type Background = "bg" | "surface" | "surface-2";

export const BACKGROUND_CLASS: Record<Background, string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
};

export function isBackground(value: string | null | undefined): value is Background {
  return Boolean(value) && Object.hasOwn(BACKGROUND_CLASS, value ?? "");
}

export function backgroundClass(value: string | null | undefined, fallback: Background = "bg") {
  return BACKGROUND_CLASS[isBackground(value) ? value : fallback];
}

interface ButtonData {
  readonly label?: string | null;
  readonly url?: string | null;
  readonly style?: string | null;
  readonly id?: string | null;
}

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-heading text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

/** Buttons on dark (navy) backgrounds: mustard primary, white outline secondary. */
export function DarkButtons({
  buttons,
}: {
  readonly buttons: readonly ButtonData[] | null | undefined;
}) {
  return (
    <>
      {buttons?.map((button) =>
        button.label && button.url ? (
          <CmsLink
            key={button.id ?? button.url}
            url={button.url}
            className={`${BUTTON_BASE} focus-visible:outline-text-on-dark ${
              button.style === "secondary"
                ? "border border-text-on-dark/70 text-text-on-dark hover:bg-text-on-dark hover:text-primary"
                : "bg-mustard text-primary hover:bg-mustard-600"
            }`}
          >
            {button.label}
            {button.style === "secondary" ? null : <span aria-hidden="true">&rarr;</span>}
          </CmsLink>
        ) : null,
      )}
    </>
  );
}

/** Buttons on light or mustard backgrounds: navy primary, navy outline secondary. */
export function LightButtons({
  buttons,
}: {
  readonly buttons: readonly ButtonData[] | null | undefined;
}) {
  return (
    <>
      {buttons?.map((button) =>
        button.label && button.url ? (
          <CmsLink
            key={button.id ?? button.url}
            url={button.url}
            className={`${BUTTON_BASE} focus-visible:outline-primary ${
              button.style === "secondary"
                ? "border border-primary text-primary hover:bg-primary hover:text-text-on-dark"
                : "bg-primary text-text-on-dark hover:bg-primary-700"
            }`}
          >
            {button.label}
            {button.style === "secondary" ? null : <span aria-hidden="true">&rarr;</span>}
          </CmsLink>
        ) : null,
      )}
    </>
  );
}

/** Section header used by most light blocks: eyebrow + heading (+ optional intro). */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  className = "",
}: {
  readonly eyebrow?: string | null;
  readonly heading?: string | null;
  readonly intro?: string | null;
  readonly className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow mb-3.5">{eyebrow}</p> : null}
      {heading ? <h2 className="h-section text-text">{heading}</h2> : null}
      {intro ? <p className="lede mt-5">{intro}</p> : null}
    </div>
  );
}
