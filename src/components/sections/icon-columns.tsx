import type { IconColumnsBlock } from "@/payload-types";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type IconColumnsProps = Omit<IconColumnsBlock, "blockType" | "blockName" | "id">;

/** The first of two columns carries the divider; a lone or last column has none. */
const COLUMN_FIRST = "border-b border-border py-10 md:border-b-0 md:border-r md:pr-12 md:py-14";
const COLUMN_LAST = "py-10 md:pl-12 md:py-14";

export function IconColumns({
  eyebrow,
  heading,
  intro,
  columns,
  note,
  settings,
}: IconColumnsProps) {
  const items = columns ?? [];

  return (
    <Section id={settings?.anchorId} tone="surface" spacing="standard" className="scroll-mt-[72px]">
      <Container>
        <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            <Heading text={heading} className="text-text" />
          </div>
          {intro ? <p className="lede md:justify-self-end">{intro}</p> : null}
        </div>

        <div className="grid md:grid-cols-2">
          {items.map((column, index) => (
            <article
              key={column.id ?? column.title}
              className={index < items.length - 1 ? COLUMN_FIRST : COLUMN_LAST}
            >
              <Icon name={column.icon} className="h-8 w-8 text-sky-600" strokeWidth={1.5} />
              <h3 className="mt-8 text-2xl text-primary">{column.title}</h3>
              {column.text ? (
                <p className="mt-4 font-body text-[16px] text-text-muted">{column.text}</p>
              ) : null}
              <Eyebrow className="mt-8">{column.status}</Eyebrow>
            </article>
          ))}
        </div>

        {note?.text ? (
          <div className="mt-2 flex items-center gap-3 rounded-sm bg-sky-50 px-5 py-4 font-body text-sm text-text-muted">
            <Icon name={note.icon} className="h-5 w-5 shrink-0 text-primary" />
            {note.text}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
