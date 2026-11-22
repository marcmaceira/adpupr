import type { NumberedGridBlock } from "@/payload-types";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type NumberedGridProps = Omit<NumberedGridBlock, "blockType" | "blockName" | "id">;

type Item = NonNullable<NumberedGridBlock["items"]>[number];

interface ItemProps {
  readonly item: Item;
  readonly numberPrefix?: string | null;
  readonly leadIn?: string | null;
}

function GridItem({ item, numberPrefix, leadIn }: ItemProps) {
  return (
    <article className="group bg-surface p-7 transition-colors hover:bg-sky-50 sm:p-9">
      <div className="mb-8 flex items-center gap-4">
        <span className="font-heading text-sm font-bold tracking-[0.12em] text-primary-300">
          {numberPrefix ? `${numberPrefix} ${item.number}` : item.number}
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <h3 className="mb-4 max-w-[25ch] font-heading text-2xl font-bold leading-tight text-primary">
        {item.title}
      </h3>
      {item.description ? (
        <p className="text-[15px] leading-[1.75] text-text-muted">
          {leadIn ? <strong className="font-semibold text-primary">{`${leadIn} `}</strong> : null}
          {item.description}
        </p>
      ) : null}
    </article>
  );
}

/** Split header and a joined grid of numbered items (the conference themes). */
export function NumberedGrid({
  eyebrow,
  heading,
  intro,
  numberPrefix,
  leadIn,
  items,
  settings,
}: NumberedGridProps) {
  return (
    <Section id={settings?.anchorId} tone="surface" spacing="compactTall">
      <Container>
        <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <Heading text={heading} className="text-primary" />
          </div>
          {intro ? (
            <p className="max-w-[52ch] text-text-muted md:justify-self-end">{intro}</p>
          ) : null}
        </div>

        {items && items.length > 0 ? (
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-2">
            {items.map((item) => (
              <GridItem
                key={item.id ?? item.number}
                item={item}
                numberPrefix={numberPrefix}
                leadIn={leadIn}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
