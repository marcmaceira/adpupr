import { CalendarDays, Library, MapPin } from "lucide-react";
import { CmsLink } from "@/components/cms-link";
import { Icon } from "@/components/icon";
import { ordinal, renderHighlighted, renderInline } from "@/lib/format";
import type {
  CardGridBlock,
  CtaBandBlock,
  IconListBlock,
  NumberedGridBlock,
} from "@/payload-types";
import { backgroundClass, DarkButtons, LightButtons, SectionHeading } from "./shared";

export function CtaBand({ block }: { readonly block: CtaBandBlock }) {
  const light = block.style === "mustard";
  return (
    <section
      id={block.anchor || undefined}
      className={`relative overflow-hidden ${light ? "bg-mustard text-primary" : block.style === "navy-deep" ? "bg-primary-900 text-text-on-dark" : "bg-primary text-text-on-dark"}`}
    >
      {block.style === "navy" ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[180px] -top-[160px] h-[520px] w-[520px] rounded-full border-2 border-sky/35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[150px] -right-[60px] h-[340px] w-[340px] rounded-full border-2 border-mustard/50"
          />
        </>
      ) : null}
      <div className="relative mx-auto flex max-w-[1248px] flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:gap-12">
        {block.icon ? (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-text-on-dark">
            <Icon icon={block.icon} className="h-6 w-6" />
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          {block.eyebrow ? (
            <p className={`eyebrow mb-3.5 ${light ? "text-primary-700" : "eyebrow-on-dark"}`}>
              {block.eyebrow}
            </p>
          ) : null}
          <h2
            className={`max-w-[24ch] font-heading text-[clamp(28px,3.4vw,44px)] font-black leading-[1.08] tracking-[-0.02em] ${light ? "text-primary" : "text-text-on-dark"}`}
          >
            {renderHighlighted(block.heading, block.highlight, "not-italic text-mustard")}
          </h2>
          {block.description ? (
            <p
              className={`mt-4 max-w-[58ch] font-body text-[17px] leading-[1.55] ${light ? "text-primary-700" : "text-text-on-dark-muted"}`}
            >
              {block.description}
            </p>
          ) : null}
          {block.meta?.date || block.meta?.location || block.meta?.format ? (
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 font-heading text-sm font-semibold">
              {block.meta.date ? (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
                  {block.meta.date}
                </span>
              ) : null}
              {block.meta.location ? (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
                  {block.meta.location}
                </span>
              ) : null}
              {block.meta.format ? <span>{block.meta.format}</span> : null}
            </div>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col gap-3 md:items-end">
          {light ? (
            <LightButtons buttons={block.buttons} />
          ) : (
            <DarkButtons buttons={block.buttons} />
          )}
        </div>
      </div>
    </section>
  );
}

export function CardGrid({ block }: { readonly block: CardGridBlock }) {
  const columns = block.style === "columns";
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-24 md:py-28`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          className={`mb-12 ${columns ? "grid gap-10 border-b border-border pb-12 md:grid-cols-2 md:items-end" : "max-w-[720px]"}`}
        >
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} />
          {block.intro ? <p className="lede">{block.intro}</p> : null}
        </div>
        <div className={`grid md:grid-cols-2 ${columns ? "gap-x-12" : "gap-6"}`}>
          {block.cards?.map((card) => (
            <article
              key={card.id ?? card.title}
              className={
                columns
                  ? "border-b border-border py-10 md:py-14"
                  : `flex min-h-[360px] flex-col rounded-lg border p-8 sm:p-10 ${card.dark ? "border-primary bg-primary text-text-on-dark" : "border-border bg-surface"}`
              }
            >
              {card.icon ? (
                <span
                  className={
                    columns
                      ? "text-sky-600"
                      : `flex h-12 w-12 items-center justify-center rounded-sm ${card.dark ? "bg-text-on-dark/10 text-mustard" : "bg-sky-50 text-primary"}`
                  }
                >
                  <Icon
                    icon={card.icon}
                    className={columns ? "h-8 w-8" : "h-6 w-6"}
                    strokeWidth={1.6}
                  />
                </span>
              ) : null}
              {card.eyebrow ? (
                <p className={`eyebrow mt-8 ${card.dark && !columns ? "eyebrow-on-dark" : ""}`}>
                  {card.eyebrow}
                </p>
              ) : null}
              <h3
                className={`${columns ? "mt-8 text-2xl" : "mt-3 text-[27px] font-extrabold"} ${card.dark && !columns ? "text-text-on-dark" : "text-primary"}`}
              >
                {card.title}
              </h3>
              {card.description ? (
                <p
                  className={`mt-4 font-body text-base leading-[1.65] ${card.dark && !columns ? "text-text-on-dark-muted" : "text-text-muted"}`}
                >
                  {card.description}
                </p>
              ) : null}
              {card.link?.url && card.link.label ? (
                <CmsLink
                  url={card.link.url}
                  className={`mt-auto inline-flex items-center gap-2 self-start pt-8 font-heading text-sm font-bold underline decoration-2 underline-offset-4 ${card.dark && !columns ? "text-text-on-dark decoration-mustard hover:text-mustard" : "text-primary decoration-sky-200 hover:text-primary-700"}`}
                >
                  {card.link.label} <span aria-hidden="true">&rarr;</span>
                </CmsLink>
              ) : null}
              {card.status ? <p className="eyebrow mt-8">{card.status}</p> : null}
            </article>
          ))}
        </div>
        {block.note ? (
          <p className="mt-6 flex items-center gap-3 rounded-sm bg-sky-50 px-5 py-4 font-body text-sm text-text-muted">
            <Library className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            {block.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function NumberedGrid({ block }: { readonly block: NumberedGridBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background, "surface")} px-6 py-16 sm:py-24`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} />
          {block.intro ? (
            <p className="max-w-[52ch] text-text-muted md:justify-self-end">{block.intro}</p>
          ) : null}
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-2">
          {block.items?.map((item, index) => (
            <article
              key={item.id ?? item.title}
              className="bg-surface p-7 transition-colors hover:bg-sky-50 sm:p-9"
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-primary-300">
                  {block.numberPrefix} {ordinal(index)}
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <h3 className="mb-4 max-w-[25ch] font-heading text-2xl font-bold leading-tight text-primary">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.75] text-text-muted">
                {block.descriptionPrefix ? (
                  <strong className="font-semibold text-primary">{block.descriptionPrefix} </strong>
                ) : null}
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IconList({ block }: { readonly block: IconListBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-16 sm:py-20`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} className="max-w-[22ch]" />
        <div className="space-y-7">
          {block.items?.map((item) => (
            <div key={item.id ?? item.text} className="flex gap-5 border-t border-border pt-7">
              <Icon
                icon={item.icon}
                className="mt-1 h-7 w-7 shrink-0 text-sky-600"
                strokeWidth={1.75}
              />
              <div>
                {item.title ? (
                  <h3 className="mb-3 font-heading text-lg font-bold text-primary">{item.title}</h3>
                ) : null}
                <p
                  className={`text-lg leading-relaxed ${item.emphasis ? "font-semibold text-primary" : "text-text-muted"}`}
                >
                  {renderInline(item.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
