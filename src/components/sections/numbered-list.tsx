import type { NumberedListBlock } from "@/payload-types";
import { Container, GoldBar, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type NumberedListProps = Omit<NumberedListBlock, "blockType" | "blockName" | "id">;

type Item = NonNullable<NumberedListBlock["items"]>[number];

/** Row, number and text recipes per variant (QS-4 objectives and HF-4 founding work). */
const ROW = {
  stacked: {
    row: "grid gap-4 border-b border-border-strong py-7 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-8 md:py-9",
    number: "font-heading text-3xl font-black tracking-[-0.03em] text-mustard-600",
    text: "max-w-[850px] font-body text-base leading-[1.7] text-text md:text-[17px]",
  },
  sidebar: {
    row: "grid gap-3 border-b border-border-strong py-7 sm:grid-cols-[58px_minmax(0,1fr)] sm:gap-6 md:py-8",
    number: "font-heading text-2xl font-black text-primary-300",
    text: "max-w-[820px] font-body text-base leading-[1.75] text-text-muted md:text-[17px]",
  },
} as const;

function List({
  items,
  variant,
}: {
  readonly items: readonly Item[];
  readonly variant: NumberedListBlock["variant"];
}) {
  const style = ROW[variant] ?? ROW.stacked;
  return (
    <ol className="border-t border-border-strong">
      {items.map((item, index) => (
        <li key={item.id ?? item.text} className={style.row}>
          <span aria-hidden="true" className={style.number}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className={style.text}>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function NumberedList({ variant, eyebrow, heading, items, settings }: NumberedListProps) {
  const rows = items ?? [];

  if (variant === "sidebar") {
    return (
      <Section id={settings?.anchorId} tone="bg" spacing="standard">
        <Container className="grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20">
          <div>
            <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
            <Heading text={heading} className="text-text" />
            <GoldBar />
          </div>
          <List items={rows} variant="sidebar" />
        </Container>
      </Section>
    );
  }

  return (
    <Section id={settings?.anchorId} tone="bg" spacing="standard">
      <Container>
        <div className="mb-12 max-w-[700px]">
          <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
          <Heading text={heading} className="text-text" />
        </div>
        <List items={rows} variant="stacked" />
      </Container>
    </Section>
  );
}
