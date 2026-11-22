import type { TextSplitBlock } from "@/payload-types";
import { cx } from "@/lib/cx";
import { resolveLink } from "@/lib/links";
import { TextLink } from "@/components/ui/button";
import { ArrowGlyph } from "@/components/ui/icon";
import { Container, GoldBar, Section } from "@/components/ui/layout";
import { RichText, type RichTextClasses } from "@/components/ui/rich-text";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type TextSplitProps = Omit<TextSplitBlock, "blockType" | "blockName" | "id">;

type Ratio = TextSplitBlock["ratio"];

/**
 * Everything that follows from the column ratio. Each preset reproduces one baseline
 * section: wideLeft the home About (inventory /-3), fixedLeft QS-2 Identidad,
 * narrowLeft the /membresia community band (MembershipPlan).
 */
const RATIO = {
  wideLeft: {
    spacing: "relaxed",
    grid: "grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24",
    headingMeasure: "max-w-[15ch]",
    body: "",
    paragraph: "font-body text-[18px] leading-[1.7] text-text-muted [&+p]:mt-5",
  },
  fixedLeft: {
    spacing: "standard",
    grid: "grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20",
    headingMeasure: "",
    body: "space-y-7 font-body text-[17px] leading-[1.8] text-text-muted md:text-lg",
    paragraph: undefined,
  },
  narrowLeft: {
    spacing: "standard",
    grid: "grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20",
    headingMeasure: "max-w-[12ch]",
    body: "space-y-5 font-body text-[16px] leading-[1.75] text-text-muted md:text-[17px]",
    paragraph: undefined,
  },
} as const satisfies Record<
  Ratio,
  {
    spacing: "relaxed" | "standard";
    grid: string;
    headingMeasure: string;
    body: string;
    paragraph: string | undefined;
  }
>;

const HEADING = {
  section: { scale: "section", className: "text-text" },
  compact: {
    scale: "none",
    className: "font-heading text-3xl font-black leading-tight text-text md:text-4xl",
  },
} as const;

/** Lists inherit the column's type; only bullets, numbers and indentation are added. */
const LIST =
  "list-outside space-y-2 pl-6 font-body text-text-muted [&:is(ol)]:list-decimal [&:is(ul)]:list-disc";

const RIGHT_RULE = "border-l-4 border-mustard pl-6 sm:pl-8";
const BOTTOM_RULE = "border-b border-border pb-16 lg:pb-20";

export function TextSplit({
  ratio,
  accent,
  headingSize,
  eyebrow,
  heading,
  body,
  link,
  settings,
}: TextSplitProps) {
  const preset = RATIO[ratio] ?? RATIO.wideLeft;
  const headingStyle = HEADING[headingSize] ?? HEADING.section;
  const resolved = resolveLink(link);
  const bodyClasses: RichTextClasses = { paragraph: preset.paragraph, list: LIST };

  const columns = (
    <>
      <div>
        <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
        <Heading
          scale={headingStyle.scale}
          text={heading}
          className={
            headingSize === "compact"
              ? headingStyle.className
              : cx(preset.headingMeasure, headingStyle.className)
          }
        />
        {accent === "goldBar" ? <GoldBar /> : null}
      </div>

      <div className={cx(accent === "rightRule" && RIGHT_RULE, preset.body) || undefined}>
        <RichText data={body} classes={bodyClasses} />
        {resolved ? (
          <TextLink href={resolved.href} newTab={resolved.newTab} className="mt-7">
            {resolved.label} <ArrowGlyph />
          </TextLink>
        ) : null}
      </div>
    </>
  );

  return (
    <Section id={settings?.anchorId} tone={settings?.tone ?? "bg"} spacing={preset.spacing}>
      {accent === "bottomRule" ? (
        <Container>
          <div className={cx(preset.grid, BOTTOM_RULE)}>{columns}</div>
        </Container>
      ) : (
        <Container className={preset.grid}>{columns}</Container>
      )}
    </Section>
  );
}
