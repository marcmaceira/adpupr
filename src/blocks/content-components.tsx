import Image from "next/image";
import { Check, ExternalLink } from "lucide-react";
import { CmsLink } from "@/components/cms-link";
import { RichText } from "@/components/rich-text";
import { populated } from "@/lib/media";
import { ordinal } from "@/lib/format";
import type {
  ChecklistBlock,
  ContentBlock,
  FeaturePairBlock,
  MediaBlockBlock,
  NumberedListBlock,
  SplitContentBlock,
  StatsBlock,
  VideoBlock,
} from "@/payload-types";
import { backgroundClass, SectionHeading } from "./shared";

export function Stats({ block }: { readonly block: StatsBlock }) {
  const items = block.items ?? [];

  if (block.variant === "panel") {
    return (
      <section
        id={block.anchor || undefined}
        className="relative overflow-hidden bg-primary px-6 py-20 text-text-on-dark md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-2 border-mustard/30"
        />
        <div className="relative mx-auto max-w-[1200px]">
          {block.eyebrow || block.heading ? (
            <div className="mb-12 border-b border-text-on-dark/20 pb-8">
              {block.eyebrow ? (
                <p className="eyebrow eyebrow-on-dark mb-3.5">{block.eyebrow}</p>
              ) : null}
              {block.heading ? (
                <h2 className="h-section text-text-on-dark">{block.heading}</h2>
              ) : null}
            </div>
          ) : null}

          <dl className="grid gap-px overflow-hidden rounded-lg bg-text-on-dark/20 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id ?? item.label} className="bg-primary-700 p-7 md:p-8">
                <dt className="font-body text-sm leading-snug text-text-on-dark-muted">
                  {item.label}
                </dt>
                <dd className="mt-4 font-heading text-5xl font-black tracking-[-0.04em] text-mustard md:text-6xl">
                  {item.value}
                  {item.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  return (
    <section id={block.anchor || undefined} className="border-y border-border bg-sky-50 px-6 py-16">
      <div className="mx-auto grid max-w-[760px] grid-cols-2 gap-8 md:gap-16">
        {items.map((item) => (
          <div key={item.id ?? item.label}>
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
              style={{ color: "var(--color-primary-300)", letterSpacing: "0.1em" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SplitContent({ block }: { readonly block: SplitContentBlock }) {
  const bordered = block.style === "border";

  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-20 md:py-28`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          {block.eyebrow ? <p className="eyebrow mb-3.5">{block.eyebrow}</p> : null}
          <h2 className="h-section max-w-[15ch] text-text">{block.heading}</h2>
          {block.style === "bar" ? (
            <div className="mt-8 h-1 w-16 bg-mustard" aria-hidden="true" />
          ) : null}
        </div>

        <div className={bordered ? "border-l-4 border-mustard pl-6 sm:pl-8" : ""}>
          <RichText
            data={block.body}
            className="space-y-5 font-body text-[17px] leading-[1.75] text-text-muted md:text-lg"
          />
          {block.link?.label && block.link.url ? (
            <CmsLink
              url={block.link.url}
              className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold text-primary underline decoration-sky-200 decoration-2 underline-offset-4 transition-colors hover:text-primary-700"
            >
              {block.link.label} <span aria-hidden="true">&rarr;</span>
            </CmsLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Content({ block }: { readonly block: ContentBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-20 md:py-28`}
    >
      <div className="mx-auto max-w-[760px]">
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} className="mb-8" />
        <RichText
          data={block.body}
          className="space-y-5 font-body text-[17px] leading-[1.75] text-text-muted"
        />
      </div>
    </section>
  );
}

export function NumberedList({ block }: { readonly block: NumberedListBlock }) {
  const split = block.layout === "split";
  const items = block.items ?? [];

  const list = (
    <ol className="border-t border-border-strong">
      {items.map((item, index) => (
        <li
          key={item.id ?? item.text}
          className={`grid border-b border-border-strong ${
            split
              ? "gap-3 py-7 sm:grid-cols-[58px_minmax(0,1fr)] sm:gap-6 md:py-8"
              : "gap-4 py-7 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-8 md:py-9"
          }`}
        >
          <span
            aria-hidden="true"
            className={
              split
                ? "font-heading text-2xl font-black text-primary-300"
                : "font-heading text-3xl font-black tracking-[-0.03em] text-mustard-600"
            }
          >
            {ordinal(index)}
          </span>
          <p
            className={`max-w-[850px] font-body text-base leading-[1.7] md:text-[17px] ${
              split ? "text-text-muted" : "text-text"
            }`}
          >
            {item.text}
          </p>
        </li>
      ))}
    </ol>
  );

  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-20 md:py-28`}
    >
      {split ? (
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20">
          <div>
            {block.eyebrow ? <p className="eyebrow mb-3.5">{block.eyebrow}</p> : null}
            <h2 className="h-section text-text">{block.heading}</h2>
            <div className="mt-8 h-1 w-16 bg-mustard" aria-hidden="true" />
          </div>
          {list}
        </div>
      ) : (
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow={block.eyebrow}
            heading={block.heading}
            className="mb-12 max-w-[700px]"
          />
          {list}
        </div>
      )}
    </section>
  );
}

export function FeaturePair({ block }: { readonly block: FeaturePairBlock }) {
  const [first, second] = block.items ?? [];

  return (
    <section id={block.anchor || undefined} className="bg-surface-2 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid overflow-hidden rounded-lg border border-border lg:grid-cols-2">
          {first ? (
            <article className="bg-surface p-8 md:p-12 lg:p-14">
              {first.eyebrow ? <p className="eyebrow mb-4">{first.eyebrow}</p> : null}
              <h2 className="font-heading text-3xl font-black leading-tight text-primary md:text-4xl">
                {first.heading}
              </h2>
              <p className="mt-6 font-body text-base leading-[1.75] text-text-muted md:text-[17px]">
                {first.text}
              </p>
            </article>
          ) : null}
          {second ? (
            <article className="relative overflow-hidden bg-primary p-8 text-text-on-dark md:p-12 lg:p-14">
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-2 border-sky/25"
              />
              <div className="relative">
                {second.eyebrow ? (
                  <p className="eyebrow eyebrow-on-dark mb-4">{second.eyebrow}</p>
                ) : null}
                <h2 className="font-heading text-3xl font-black leading-tight text-text-on-dark md:text-4xl">
                  {second.heading}
                </h2>
                <p className="mt-6 font-body text-base leading-[1.75] text-text-on-dark-muted md:text-[17px]">
                  {second.text}
                </p>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Checklist({ block }: { readonly block: ChecklistBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background, "surface-2")} px-6 pt-20 md:pt-28`}
    >
      <div className="mx-auto max-w-[1200px] border-b border-border pb-16 lg:pb-20">
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="mt-9">
          {block.items?.map((item) => (
            <li
              key={item.id ?? item.text}
              className="grid grid-cols-[28px_1fr] items-start gap-4 border-b border-border py-4 font-body text-[15px] leading-[1.65] text-text last:border-b-0 sm:grid-cols-[32px_1fr] sm:gap-5 sm:text-[17px]"
            >
              <span
                className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-mustard text-primary sm:h-8 sm:w-8"
                aria-hidden="true"
              >
                <Check size={17} strokeWidth={3} />
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MediaBlock({ block }: { readonly block: MediaBlockBlock }) {
  const image = populated(block.image);
  if (!image?.url) return null;

  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-16 md:py-20`}
    >
      <figure className="mx-auto max-w-[1200px]">
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width ?? 1600}
          height={image.height ?? 900}
          sizes="(min-width: 1248px) 1200px, 100vw"
          className="h-auto w-full rounded-lg"
        />
        {block.caption ? (
          <figcaption className="mt-3 font-body text-sm text-text-muted">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}

function youTubeId(url: string): string | null {
  const trimmed = url.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  const match =
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/.exec(
      trimmed,
    );
  return match?.[1] ?? null;
}

export function Video({ block }: { readonly block: VideoBlock }) {
  const videoId = youTubeId(block.videoUrl);

  return (
    <section id={block.anchor || undefined} className="bg-surface px-6 py-24 md:py-[112px]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          {block.eyebrow ? <p className="eyebrow mb-3.5">{block.eyebrow}</p> : null}
          <h2 className="h-section max-w-[12ch] text-text">{block.heading}</h2>
          {block.description ? (
            <p className="mt-5 max-w-[46ch] font-body text-[17px] leading-[1.65] text-text-muted">
              {block.description}
            </p>
          ) : null}
          {block.channel?.label && block.channel.url ? (
            <CmsLink
              url={block.channel.url}
              className="mt-7 inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-3 font-heading text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {block.channel.label}
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </CmsLink>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-primary shadow-[var(--shadow-card)]">
          {videoId ? (
            /*
              YouTube's player needs allow-scripts + allow-same-origin to run. The rule forbids the pair
              because it lets a same-origin frame remove its own sandbox; this frame is cross-origin
              (youtube-nocookie.com), so the remaining restrictions still apply.
            */
            <iframe
              className="aspect-video w-full"
              // oxlint-disable-next-line react/iframe-missing-sandbox
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={block.heading}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="flex aspect-video items-center justify-center p-6 text-center font-body text-sm text-text-on-dark-muted">
              El enlace del video no es v&aacute;lido.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
