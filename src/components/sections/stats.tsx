import type { StatsBlock } from "@/payload-types";
import { Container, Ring, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type StatsProps = Omit<StatsBlock, "blockType" | "blockName" | "id">;

type StatItem = NonNullable<StatsProps["items"]>[number];

const itemKey = (item: StatItem) => item.id ?? `${item.value}-${item.label}`;

/** Light strip of large figures with a mustard suffix and an uppercase label. */
function BandStats({ items, settings }: StatsProps) {
  return (
    <Section
      id={settings?.anchorId}
      tone="sky50"
      spacing="tight"
      className="border-y border-border"
    >
      <Container width="stats" className="grid grid-cols-2 gap-8 md:gap-16">
        {(items ?? []).map((item) => (
          <div key={itemKey(item)}>
            <div
              className="flex items-baseline gap-1 font-heading font-black text-primary"
              style={{
                fontSize: "clamp(48px, 6vw, 68px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <span>{item.value}</span>
              {item.suffix ? (
                <span className="text-mustard-600" style={{ fontSize: "0.55em" }}>
                  {item.suffix}
                </span>
              ) : null}
            </div>
            <div
              className="mt-2.5 font-heading text-[13px] font-semibold uppercase"
              style={{
                color: "var(--color-primary-300)",
                letterSpacing: "0.1em",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}

/** Dark section with a header and a tiled list of milestones (label above value). */
function TileStats({ eyebrow, heading, items, settings }: StatsProps) {
  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      spacing="medium"
      className="relative overflow-hidden text-white"
    >
      <Ring className="-bottom-28 -left-24 h-80 w-80 border-2 border-mustard/30" />
      <Container className="relative">
        {eyebrow || heading ? (
          <div className="mb-12 border-b border-white/20 pb-8">
            <Eyebrow tone="dark" className="mb-3.5">
              {eyebrow}
            </Eyebrow>
            <Heading text={heading} className="text-white" />
          </div>
        ) : null}

        <dl className="grid gap-px overflow-hidden rounded-lg bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
          {(items ?? []).map((item) => (
            <div key={itemKey(item)} className="bg-primary-700 p-7 md:p-8">
              <dt className="font-body text-sm leading-snug text-text-on-dark-muted">
                {item.label}
              </dt>
              <dd className="mt-4 font-heading text-5xl font-black tracking-[-0.04em] text-mustard md:text-6xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export function Stats(props: StatsProps) {
  switch (props.variant) {
    case "band":
      return <BandStats {...props} />;
    case "tiles":
      return <TileStats {...props} />;
    default:
      return null;
  }
}
