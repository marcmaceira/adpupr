"use client";

import { ChevronDown, Plus } from "lucide-react";
import { useRef, useState } from "react";
import type { EventOverviewBlock } from "@/payload-types";
import type { ResolvedLink } from "@/lib/links";
import { cx } from "@/lib/cx";
import { BUTTON_VARIANTS } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

type Period = NonNullable<EventOverviewBlock["agenda"]["periods"]>[number];
type Entry = NonNullable<Period["entries"]>[number];

export interface EventAgendaProps {
  readonly heading: string;
  readonly expandLabel: string;
  readonly collapseLabel: string;
  readonly periods: readonly Period[];
  readonly note?: string | null;
  readonly registrationLink: ResolvedLink | null;
}

const CONTENT_ID = "inline-agenda-content";
const HEADING_ID = "inline-agenda-heading";

function ScheduleEntry({ entry }: { readonly entry: Entry }) {
  const content = (
    <>
      <p className="flex flex-wrap gap-x-1 text-base tabular-nums text-text-muted sm:flex-col sm:gap-0 sm:text-sm">
        <span>{entry.start}</span>
        <span>– {entry.end}</span>
      </p>
      <p
        className={cx(
          "min-w-0 font-heading text-base",
          entry.quiet ? "font-medium text-text-muted" : "font-semibold text-primary sm:text-lg",
        )}
      >
        {entry.title}
      </p>
    </>
  );

  return (
    <li className="border-b border-primary/10 last:border-b-0">
      {entry.description && !entry.quiet ? (
        <details className="group">
          <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 py-6 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:grid-cols-[7rem_1fr_auto] [&::-webkit-details-marker]:hidden [&>p:first-child]:col-span-2 sm:[&>p:first-child]:col-span-1">
            {content}
            <Plus
              className="size-6 shrink-0 stroke-primary motion-safe:transition-transform group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-6 sm:pl-32 sm:pr-10">
            <p className="max-w-[56ch] border-l-2 border-sky pl-4 text-base text-text-muted sm:text-sm/6">
              {entry.description}
            </p>
          </div>
        </details>
      ) : (
        <div className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr] sm:gap-4">{content}</div>
      )}
    </li>
  );
}

/** The collapsible day agenda. Collapsed by default; its content stays in the DOM. */
export function EventAgenda({
  heading,
  expandLabel,
  collapseLabel,
  periods,
  note,
  registrationLink,
}: EventAgendaProps) {
  const [expanded, setExpanded] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  function collapseFromBottom() {
    setExpanded(false);
    trigger.current?.focus({ preventScroll: true });
    trigger.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }

  return (
    <section
      id="agenda"
      aria-labelledby={HEADING_ID}
      className="mt-10 border-t border-primary/15 pt-8 sm:mt-12"
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id={HEADING_ID}
          className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
        >
          {heading}
        </h2>
        <button
          ref={trigger}
          type="button"
          aria-expanded={expanded}
          aria-controls={CONTENT_ID}
          className={cx(BUTTON_VARIANTS.soft, "shrink-0")}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? collapseLabel : expandLabel}
          <ChevronDown
            aria-hidden="true"
            className={cx(
              "size-6 shrink-0 motion-safe:transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
      <div id={CONTENT_ID} hidden={!expanded} className="pt-8">
        {periods.map((period) => (
          <div
            key={period.id ?? period.title}
            className="grid gap-8 border-t border-primary/20 py-8 lg:grid-cols-[1fr_3fr] lg:gap-20"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-primary">
                {period.title}
              </h3>
              {period.summary ? (
                <p className="text-base text-text-muted sm:text-sm">{period.summary}</p>
              ) : null}
            </div>
            <ol>
              {(period.entries ?? []).map((entry) => (
                <ScheduleEntry key={entry.id ?? `${entry.start}-${entry.title}`} entry={entry} />
              ))}
            </ol>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-primary/20 pt-6">
          {note ? <p className="text-base text-text-muted sm:text-sm">{note}</p> : null}
          <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <button type="button" onClick={collapseFromBottom} className={BUTTON_VARIANTS.plain}>
              {collapseLabel} <Icon name="arrow-up" className="size-6 shrink-0" />
            </button>
            {registrationLink ? (
              // A plain anchor on purpose: an in-page jump, exactly as the original.
              <a
                href={registrationLink.href}
                className={BUTTON_VARIANTS.soft}
                target={registrationLink.newTab ? "_blank" : undefined}
                rel={registrationLink.newTab ? "noopener noreferrer" : undefined}
              >
                {registrationLink.label} <Icon name="arrow-down" className="size-6 shrink-0" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
