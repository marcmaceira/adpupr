"use client";

import { useDeferredValue, useState } from "react";
import type { ResourceLibraryBlock } from "@/payload-types";
import { BUTTON_VARIANTS } from "@/components/ui/button";
import { Card, Chip } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { cx } from "@/lib/cx";

export interface BrowserCategory {
  readonly id: number;
  readonly label: string;
}

export interface BrowserDocument {
  readonly id: number;
  readonly title: string;
  readonly categoryId: number | null;
  readonly categoryLabel: string;
  readonly href: string;
}

interface ResourceLibraryBrowserProps {
  readonly copy: ResourceLibraryBlock["library"];
  readonly categories: readonly BrowserCategory[];
  readonly documents: readonly BrowserDocument[];
}

const PILL_BASE =
  "min-h-11 shrink-0 rounded-full border px-4 py-2 font-heading text-[13px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const PILL_ACTIVE = "border-primary bg-primary text-white";
const PILL_IDLE =
  "border-border-strong bg-surface text-text hover:border-primary-300 hover:bg-sky-50";

/** null = every category. */
type Filter = number | null;

interface PillProps {
  readonly label: string;
  readonly value: Filter;
  readonly active: boolean;
  readonly onSelect: (value: Filter) => void;
}

function Pill({ label, value, active, onSelect }: PillProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={active}
      className={cx(PILL_BASE, active ? PILL_ACTIVE : PILL_IDLE)}
    >
      {label}
    </button>
  );
}

/** Category filter, title search and the download list. Filtering happens in the browser. */
export function ResourceLibraryBrowser({
  copy,
  categories,
  documents,
}: ResourceLibraryBrowserProps) {
  const [category, setCategory] = useState<Filter>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("es"));
  const visible = documents.filter(
    (doc) =>
      (category === null || doc.categoryId === category) &&
      (deferredQuery === "" || doc.title.toLocaleLowerCase("es").includes(deferredQuery)),
  );
  const empty = documents.length === 0 ? copy.emptyArchive : copy.noResults;

  return (
    <div>
      <div className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-5">
          <fieldset className="flex min-w-0 gap-2 overflow-x-auto pb-1">
            <legend className="sr-only">{copy.filterLegend}</legend>
            <Pill
              label={copy.allLabel}
              value={null}
              active={category === null}
              onSelect={setCategory}
            />
            {categories.map((item) => (
              <Pill
                key={item.id}
                label={item.label}
                value={item.id}
                active={category === item.id}
                onSelect={setCategory}
              />
            ))}
          </fieldset>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <label className="flex min-h-12 max-w-[520px] items-center gap-3 rounded-sm border border-border-strong bg-surface px-4 focus-within:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-200">
          <Icon name="search" className="h-[18px] w-[18px] shrink-0 text-text-faint" />
          <span className="sr-only">{copy.searchLabel}</span>
          <input
            type="search"
            aria-label={copy.searchLabel}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder ?? undefined}
            className="w-full bg-transparent py-3 font-body text-sm text-text outline-none placeholder:text-text-faint"
          />
        </label>

        {visible.length > 0 ? (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {visible.map((doc) => (
              <li
                key={doc.id}
                className="grid gap-5 bg-surface px-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <Eyebrow className="mb-2">{doc.categoryLabel}</Eyebrow>
                  <h3 className="text-lg text-primary">{doc.title}</h3>
                </div>
                <a
                  href={doc.href}
                  download
                  aria-label={`${copy.downloadLabel} ${doc.title}`}
                  className={cx(BUTTON_VARIANTS.primaryMd, "self-start sm:self-auto")}
                >
                  <Icon name="download" className="h-4 w-4" />
                  {copy.downloadLabel}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Card
            variant="empty"
            className="mt-8 flex min-h-[240px] flex-col items-center justify-center px-6 text-center"
          >
            <Chip variant="circle48" className="mb-5">
              <Icon name="file-text" className="h-6 w-6" strokeWidth={1.6} />
            </Chip>
            {empty?.title ? <h3 className="text-xl text-primary">{empty.title}</h3> : null}
            {empty?.text ? (
              <p className="mt-2 max-w-[52ch] font-body text-[15px] text-text-muted">
                {empty.text}
              </p>
            ) : null}
          </Card>
        )}
      </div>
    </div>
  );
}
