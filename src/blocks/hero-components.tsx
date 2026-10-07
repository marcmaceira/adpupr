import { ArrowDown } from "lucide-react";
import { CmsLink } from "@/components/cms-link";
import { renderHighlighted } from "@/lib/format";
import type { EventHeroBlock, HomeHeroBlock, PageHeroBlock } from "@/payload-types";
import { DarkButtons, sectionAnchor } from "./shared";

export function HomeHero({ block }: { readonly block: HomeHeroBlock }) {
  return (
    <section
      id={sectionAnchor(block)}
      className="relative overflow-hidden bg-primary px-6 pb-32 pt-24 text-text-on-dark sm:pb-36 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[200px] -top-[180px] h-[560px] w-[560px] rounded-full border-2"
        style={{ borderColor: "rgba(117, 189, 240, 0.35)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[100px] -top-[80px] h-[360px] w-[360px] rounded-full border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.55)" }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        {block.eyebrow ? <p className="eyebrow eyebrow-on-dark">{block.eyebrow}</p> : null}

        <h1
          className="mt-4 max-w-[14ch] whitespace-pre-line text-text-on-dark"
          style={{
            fontFamily:
              "var(--font-be-vietnam-pro), 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 6.5vw, 84px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
          }}
        >
          {renderHighlighted(block.heading, block.highlight, "not-italic text-mustard")}
        </h1>

        {block.description ? (
          <p
            className="mt-6 max-w-[56ch] font-body text-[19px] leading-[1.55]"
            style={{ color: "var(--color-text-on-dark-muted)" }}
          >
            {block.description}
          </p>
        ) : null}

        {block.buttons?.length ? (
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <DarkButtons buttons={block.buttons} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PageHero({ block }: { readonly block: PageHeroBlock }) {
  const hasSideLinks = Boolean(block.sideLinks?.length);
  const titleClass =
    block.titleSize === "medium"
      ? "max-w-[18ch] text-[clamp(40px,5.5vw,64px)] leading-none tracking-[-0.025em]"
      : "max-w-[900px] text-[clamp(44px,7vw,82px)] leading-[0.96] tracking-[-0.035em]";

  return (
    <section
      id={sectionAnchor(block)}
      className="relative overflow-hidden bg-primary px-6 py-20 text-text-on-dark md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full border border-sky/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-[18%] h-72 w-72 rounded-full bg-sky/10"
      />

      <div
        className={`relative mx-auto max-w-[1200px] ${
          hasSideLinks ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end" : ""
        }`}
      >
        <div>
          {block.eyebrow ? <p className="eyebrow eyebrow-on-dark mb-4">{block.eyebrow}</p> : null}
          <h1 className={`font-heading font-black text-text-on-dark ${titleClass}`}>
            {block.title}
          </h1>
          {block.description ? (
            <p className="mt-7 max-w-[680px] font-body text-lg leading-[1.7] text-text-on-dark-muted md:text-xl">
              {block.description}
            </p>
          ) : null}
          {block.buttons?.length ? (
            <div className="mt-9 flex flex-wrap gap-3">
              <DarkButtons buttons={block.buttons} />
            </div>
          ) : null}
        </div>

        {hasSideLinks ? (
          <nav
            aria-label="Secciones de la p&aacute;gina"
            className="border-t border-text-on-dark/20 lg:border-t-0"
          >
            {block.sideLinks?.map((link) => (
              <CmsLink
                key={link.id ?? link.url}
                url={link.url}
                className="flex min-h-14 items-center justify-between border-b border-text-on-dark/20 font-heading text-sm font-bold text-text-on-dark transition-colors hover:text-mustard focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard"
              >
                {link.label}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </CmsLink>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}

export function EventHero({ block }: { readonly block: EventHeroBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className="relative overflow-hidden bg-primary px-6 py-16 text-text-on-dark sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-sky/30 sm:h-[440px] sm:w-[440px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 right-20 h-80 w-80 rounded-full border-2 border-mustard/40"
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          {block.eyebrow ? <p className="eyebrow eyebrow-on-dark mb-5">{block.eyebrow}</p> : null}
          <h1 className="max-w-[15ch] font-heading text-[clamp(2.6rem,6vw,5.25rem)] font-black leading-[0.98] tracking-[-0.03em] text-text-on-dark">
            {block.title}
          </h1>
          {block.theme ? (
            <div className="mt-8 max-w-3xl border-l-4 border-mustard pl-5 sm:pl-7">
              {block.themeLabel ? (
                <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.13em] text-sky">
                  {block.themeLabel}
                </p>
              ) : null}
              <p className="font-heading text-xl font-bold leading-snug text-text-on-dark sm:text-2xl">
                {block.theme}
              </p>
            </div>
          ) : null}
        </div>

        {block.dateNumber || block.dateLabel || block.detail ? (
          <div className="border-t border-text-on-dark/20 pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
            <div className="flex items-baseline gap-4 lg:block">
              {block.dateNumber ? (
                <span className="font-heading text-7xl font-black leading-none text-mustard sm:text-8xl">
                  {block.dateNumber}
                </span>
              ) : null}
              {block.dateLabel ? (
                <div className="whitespace-pre-line font-heading text-xl font-bold uppercase leading-tight tracking-[0.08em] text-text-on-dark lg:mt-2">
                  {block.dateLabel}
                </div>
              ) : null}
            </div>
            {block.detail ? (
              <p className="mt-5 text-sm leading-relaxed text-text-on-dark-muted">{block.detail}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
