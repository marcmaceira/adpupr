import type { EventOverviewBlock } from "@/payload-types";
import { resolveLink } from "@/lib/links";
import { Chip } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { EventAgenda } from "./event-agenda";

export type EventOverviewProps = Omit<EventOverviewBlock, "blockType" | "blockName" | "id">;

type Detail = NonNullable<EventOverviewBlock["details"]>[number];
type IntroRow = NonNullable<EventOverviewBlock["intro"]["rows"]>[number];

function EventDetail({ detail }: { readonly detail: Detail }) {
  return (
    <div className="flex gap-4 border-b border-border p-6 last:border-b-0 md:border-b-0 md:border-r md:p-7 md:last:border-r-0">
      <Chip variant="circle40SmallIcon">
        <Icon name={detail.icon} />
      </Chip>
      <div>
        <p className="mb-1 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
          {detail.label}
        </p>
        <p className="text-sm font-semibold leading-relaxed text-primary">{detail.value}</p>
      </div>
    </div>
  );
}

function IntroRowItem({ row }: { readonly row: IntroRow }) {
  const body = (
    <p
      className={
        row.emphasis
          ? "text-lg font-semibold leading-relaxed text-primary"
          : "text-lg leading-relaxed text-text-muted"
      }
    >
      {row.text}
    </p>
  );
  return (
    <div className="flex gap-5 border-t border-border pt-7">
      <Icon name={row.icon} className="mt-1 h-7 w-7 shrink-0 text-sky-600" strokeWidth={1.75} />
      {row.heading ? (
        <div>
          <h3 className="mb-3 font-heading text-lg font-bold text-primary">{row.heading}</h3>
          {body}
        </div>
      ) : (
        body
      )}
    </div>
  );
}

/** Event facts strip, intro with icon rows, and the collapsible agenda (client part). */
export function EventOverview({ details, intro, agenda, settings }: EventOverviewProps) {
  const rows = intro.rows ?? [];
  const periods = agenda.periods ?? [];
  const registrationLink = resolveLink(agenda.registrationLink);

  return (
    <Section id={settings?.anchorId} tone="bg" spacing="compact">
      <Container>
        {details && details.length > 0 ? (
          <div className="grid overflow-hidden rounded-lg border border-border bg-bg shadow-[var(--shadow-card)] md:grid-cols-3">
            {details.map((detail) => (
              <EventDetail key={detail.id ?? detail.label} detail={detail} />
            ))}
          </div>
        ) : null}

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-3">{intro.eyebrow}</Eyebrow>
            <Heading text={intro.heading} className="max-w-[12ch] text-primary" />
          </div>
          {rows.length > 0 ? (
            <div className="space-y-7 lg:mt-1">
              {rows.map((row) => (
                <IntroRowItem key={row.id ?? row.text} row={row} />
              ))}
            </div>
          ) : null}
        </div>

        {agenda.heading ? (
          <EventAgenda
            heading={agenda.heading}
            expandLabel={agenda.expandLabel}
            collapseLabel={agenda.collapseLabel}
            periods={periods}
            note={agenda.note}
            registrationLink={registrationLink}
          />
        ) : null}
      </Container>
    </Section>
  );
}
