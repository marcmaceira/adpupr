"use client";

import { useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus } from "lucide-react";
import { CmsLink } from "./cms-link";
import type { AgendaBlock } from "@/payload-types";

type Period = NonNullable<AgendaBlock["periods"]>[number];
type Entry = NonNullable<Period["entries"]>[number];
const BUTTON =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-sm border border-primary/30 py-3 pl-5 pr-3 font-heading text-base font-semibold text-primary hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm";

function ScheduleEntry({ entry }: { readonly entry: Entry }) {
  const content = (
    <>
      <p className="flex flex-wrap gap-x-1 text-base tabular-nums text-text-muted sm:flex-col sm:gap-0 sm:text-sm">
        <span>{entry.start}</span>
        <span>&ndash; {entry.end}</span>
      </p>
      <p
        className={`min-w-0 font-heading text-base ${entry.minor ? "font-medium text-text-muted" : "font-semibold text-primary sm:text-lg"}`}
      >
        {entry.title}
      </p>
    </>
  );
  return (
    <li className="border-b border-primary/10 last:border-b-0">
      {entry.description && !entry.minor ? (
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

export default function ConferenceAgenda({ block }: { readonly block: AgendaBlock }) {
  const [expanded, setExpanded] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const contentId = `${id}-content`;
  function collapseFromBottom() {
    setExpanded(false);
    trigger.current?.focus({ preventScroll: true });
    trigger.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }
  return (
    <div className="border-t border-primary/15 pt-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {block.heading}
        </h2>
        <button
          ref={trigger}
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          className={`${BUTTON} shrink-0`}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Ocultar agenda" : "Ver agenda completa"}
          <ChevronDown
            aria-hidden="true"
            className={`size-6 shrink-0 motion-safe:transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div id={contentId} hidden={!expanded} className="pt-8">
        {block.periods?.map((period) => (
          <div
            key={period.id ?? period.title}
            className="grid gap-8 border-t border-primary/20 py-8 lg:grid-cols-[1fr_3fr] lg:gap-20"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-primary">
                {period.title}
              </h3>
              {period.subtitle ? (
                <p className="text-base text-text-muted sm:text-sm">{period.subtitle}</p>
              ) : null}
            </div>
            <ol>
              {period.entries?.map((entry) => (
                <ScheduleEntry key={entry.id ?? entry.start} entry={entry} />
              ))}
            </ol>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-primary/20 pt-6">
          <p className="text-base text-text-muted sm:text-sm">{block.footnote}</p>
          <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <button
              type="button"
              onClick={collapseFromBottom}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm font-heading text-base font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm"
            >
              Ocultar agenda <ArrowUp className="size-6 shrink-0" aria-hidden="true" />
            </button>
            {block.link?.url && block.link.label ? (
              <CmsLink url={block.link.url} className={BUTTON}>
                {block.link.label}
                <ArrowDown className="size-6 shrink-0" aria-hidden="true" />
              </CmsLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
