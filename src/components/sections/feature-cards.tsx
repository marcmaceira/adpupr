import type { FeatureCardsBlock } from "@/payload-types";
import { cx } from "@/lib/cx";
import { resolveLink } from "@/lib/links";
import { TextLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/card";
import { ArrowGlyph, Icon } from "@/components/ui/icon";
import { Container, Ring, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type FeatureCardsProps = Omit<FeatureCardsBlock, "blockType" | "blockName" | "id">;

type Item = NonNullable<FeatureCardsBlock["items"]>[number];

/* ───────────── Separate cards (home "Participa") ───────────── */

const CARD_TONE = {
  light: {
    card: "border-border bg-surface",
    chip: "square48",
    eyebrow: "light",
    title: "text-primary",
    text: "text-text-muted",
    link: "cardLight",
  },
  dark: {
    card: "border-primary bg-primary text-white",
    chip: "square48Dark",
    eyebrow: "dark",
    title: "text-white",
    text: "text-text-on-dark-muted",
    link: "cardDark",
  },
} as const;

function SeparateCard({ item }: { readonly item: Item }) {
  const tone = CARD_TONE[item.tone] ?? CARD_TONE.light;
  const link = resolveLink(item.link);

  return (
    <article className={cx("flex min-h-[360px] flex-col rounded-lg border p-8 sm:p-10", tone.card)}>
      {item.icon ? (
        <Chip variant={tone.chip}>
          <Icon name={item.icon} className="h-6 w-6" strokeWidth={1.6} />
        </Chip>
      ) : null}
      <Eyebrow tone={tone.eyebrow} className="mt-8">
        {item.eyebrow}
      </Eyebrow>
      <h3 className={cx("mt-3 text-[27px] font-extrabold", tone.title)}>{item.title}</h3>
      <p className={cx("mt-4 font-body text-[16px] leading-[1.65]", tone.text)}>{item.text}</p>
      {link ? (
        <TextLink
          href={link.href}
          newTab={link.newTab}
          variant={tone.link}
          className="mt-auto self-start pt-8"
        >
          {link.label} <ArrowGlyph />
        </TextLink>
      ) : null}
    </article>
  );
}

/* ───────────── Joined panels (QS-3 mission and vision) ───────────── */

const PANEL_HEADING = "font-heading text-3xl font-black leading-tight md:text-4xl";
const PANEL_TEXT = "mt-6 font-body text-base leading-[1.75] md:text-[17px]";

function PanelContent({ item, dark }: { readonly item: Item; readonly dark: boolean }) {
  return (
    <>
      <Eyebrow tone={dark ? "dark" : "light"} className="mb-4">
        {item.eyebrow}
      </Eyebrow>
      <h2 className={cx(PANEL_HEADING, dark ? "text-white" : "text-primary")}>{item.title}</h2>
      <p className={cx(PANEL_TEXT, dark ? "text-text-on-dark-muted" : "text-text-muted")}>
        {item.text}
      </p>
    </>
  );
}

function JoinedPanel({ item }: { readonly item: Item }) {
  if (item.tone === "dark") {
    return (
      <article className="relative overflow-hidden bg-primary p-8 text-white md:p-12 lg:p-14">
        <Ring className="-bottom-24 -right-24 h-64 w-64 border-2 border-sky/25" />
        <div className="relative">
          <PanelContent item={item} dark />
        </div>
      </article>
    );
  }
  return (
    <article className="bg-surface p-8 md:p-12 lg:p-14">
      <PanelContent item={item} dark={false} />
    </article>
  );
}

/* ───────────── Section ───────────── */

export function FeatureCards({ variant, eyebrow, heading, items, settings }: FeatureCardsProps) {
  const cards = items ?? [];

  if (variant === "joined") {
    return (
      <Section id={settings?.anchorId} tone={settings?.tone ?? "surface2"} spacing="standard">
        <Container>
          <div className="grid overflow-hidden rounded-lg border border-border lg:grid-cols-2">
            {cards.map((item) => (
              <JoinedPanel key={item.id ?? item.title} item={item} />
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id={settings?.anchorId} tone={settings?.tone ?? "bg"} spacing="relaxed">
      <Container>
        {eyebrow || heading ? (
          <div className="mb-12 max-w-[720px]">
            <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
            <Heading text={heading} className="text-text" />
          </div>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((item) => (
            <SeparateCard key={item.id ?? item.title} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
