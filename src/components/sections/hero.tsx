import type { HeroBlock } from "@/payload-types";
import { resolveLink, type ResolvedLink } from "@/lib/links";
import { ArrowGlyph, Icon } from "@/components/ui/icon";
import { ButtonLink, SmartLink } from "@/components/ui/button";
import { Container, Ring, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, HeadlineText } from "@/components/ui/typography";

export type HeroProps = Omit<HeroBlock, "blockType" | "blockName" | "id">;

interface HeroAction {
  readonly link: ResolvedLink;
  readonly secondary: boolean;
}

function resolveActions(actions: HeroProps["actions"]): HeroAction[] {
  return (actions ?? []).flatMap((action) => {
    const link = resolveLink(action.link);
    return link ? [{ link, secondary: action.style === "secondary" }] : [];
  });
}

const actionKey = ({ link }: HeroAction) => `${link.href}-${link.label}`;

/* ───────────── home ───────────── */

/** Home: oversized title with accent highlight, lede and up to two large buttons. */
function HomeHero({ eyebrow, heading, headingHighlight, lede, actions, settings }: HeroProps) {
  const buttons = resolveActions(actions);

  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      className="relative overflow-hidden px-6 pb-32 pt-24 text-white sm:pb-36 lg:pt-32"
    >
      <Ring
        className="-right-[200px] -top-[180px] h-[560px] w-[560px] border-2"
        style={{ borderColor: "rgba(117, 189, 240, 0.35)" }}
      />
      <Ring
        className="-right-[100px] -top-[80px] h-[360px] w-[360px] border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.55)" }}
      />

      <Container className="relative">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <Heading
          as="h1"
          scale="none"
          text={heading}
          highlight={headingHighlight}
          highlightAs="em"
          className="mt-4 max-w-[14ch] text-white"
          style={{
            fontFamily:
              "var(--font-be-vietnam-pro), 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 6.5vw, 84px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
          }}
        />
        {lede ? (
          <p
            className="mt-6 max-w-[56ch] font-body text-[19px] leading-[1.55]"
            style={{ color: "var(--color-text-on-dark-muted)" }}
          >
            {lede}
          </p>
        ) : null}
        {buttons.length > 0 ? (
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {buttons.map((button) => (
              <ButtonLink
                key={actionKey(button)}
                href={button.link.href}
                newTab={button.link.newTab}
                variant={button.secondary ? "inverseOutlineLg" : "accentLg"}
              >
                {button.link.label}
                {button.secondary ? null : (
                  <>
                    {" "}
                    <ArrowGlyph />
                  </>
                )}
              </ButtonLink>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* ───────────── subhead ───────────── */

/** Simple page header (contact, membership): eyebrow, medium title and lede. */
function SubheadHero({ eyebrow, heading, lede, settings }: HeroProps) {
  return (
    <Section
      id={settings?.anchorId}
      className="relative overflow-hidden px-6 pb-20 pt-24"
      style={{ background: "var(--color-primary)" }}
    >
      <Ring
        className="-bottom-[80px] -right-[80px] h-[240px] w-[240px] border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.4)" }}
      />
      <Container className="relative">
        <Eyebrow
          as="span"
          className="block"
          style={{ color: "var(--color-sky)", marginBottom: 14 }}
        >
          {eyebrow}
        </Eyebrow>
        <Heading
          as="h1"
          scale="none"
          text={heading}
          className="font-heading font-black text-white"
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            maxWidth: "18ch",
            marginBottom: lede ? 20 : 0,
          }}
        />
        {lede ? (
          <p
            className="font-body"
            style={{
              fontSize: 18,
              color: "var(--color-text-on-dark-muted)",
              maxWidth: "60ch",
              lineHeight: 1.55,
            }}
          >
            {lede}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}

/* ───────────── event ───────────── */

/** Conference header: title, theme box with mustard rule and a date panel on the right. */
function EventHero({ eyebrow, heading, themeBox, eventDate, settings }: HeroProps) {
  const hasTheme = Boolean(themeBox?.label || themeBox?.text);
  const hasDate = Boolean(eventDate?.day || eventDate?.monthYear || eventDate?.caption);

  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      className="relative overflow-hidden px-6 py-16 text-white sm:py-20 lg:py-24"
    >
      <Ring className="-right-24 -top-24 h-80 w-80 border border-sky/30 sm:h-[440px] sm:w-[440px]" />
      <Ring className="-bottom-44 right-20 h-80 w-80 border-2 border-mustard/40" />

      <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <Eyebrow tone="dark" className="mb-5">
            {eyebrow}
          </Eyebrow>
          <Heading
            as="h1"
            scale="none"
            text={heading}
            className="max-w-[15ch] font-heading text-[clamp(2.6rem,6vw,5.25rem)] font-black leading-[0.98] tracking-[-0.03em] text-white"
          />
          {hasTheme ? (
            <div className="mt-8 max-w-3xl border-l-4 border-mustard pl-5 sm:pl-7">
              {themeBox?.label ? (
                <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.13em] text-sky">
                  {themeBox.label}
                </p>
              ) : null}
              {themeBox?.text ? (
                <p className="font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
                  {themeBox.text}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {hasDate ? (
          <div className="border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
            <div className="flex items-baseline gap-4 lg:block">
              {eventDate?.day ? (
                <span className="font-heading text-7xl font-black leading-none text-mustard sm:text-8xl">
                  {eventDate.day}
                </span>
              ) : null}
              {eventDate?.monthYear ? (
                <div className="font-heading text-xl font-bold uppercase leading-tight tracking-[0.08em] text-white lg:mt-2">
                  <HeadlineText text={eventDate.monthYear} />
                </div>
              ) : null}
            </div>
            {eventDate?.caption ? (
              <p className="mt-5 text-sm leading-relaxed text-text-on-dark-muted">
                {eventDate.caption}
              </p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* ───────────── resources ───────────── */

/** Resource center header: display title, lede and a list of in-page section links. */
function ResourcesHero({ eyebrow, heading, lede, sectionLinks, navLabel, settings }: HeroProps) {
  const links = (sectionLinks ?? []).flatMap((item) => {
    const link = resolveLink(item.link);
    return link ? [link] : [];
  });

  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      spacing="standard"
      className="relative overflow-hidden text-white"
    >
      <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <Eyebrow tone="dark" className="mb-5">
            {eyebrow}
          </Eyebrow>
          <Heading as="h1" scale="display" text={heading} className="max-w-[13ch] text-white" />
          {lede ? (
            <p className="mt-7 max-w-[62ch] font-body text-lg leading-[1.65] text-text-on-dark-muted">
              {lede}
            </p>
          ) : null}
        </div>

        {links.length > 0 ? (
          <nav
            aria-label={navLabel || undefined}
            className="border-t border-white/20 lg:border-t-0"
          >
            {links.map((link) => (
              <SmartLink
                key={link.href}
                href={link.href}
                newTab={link.newTab}
                className="flex min-h-14 items-center justify-between border-b border-white/20 font-heading text-sm font-bold text-white transition-colors hover:text-mustard focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard"
              >
                {link.label}
                <Icon name="arrow-down" className="h-4 w-4" />
              </SmartLink>
            ))}
          </nav>
        ) : null}
      </Container>
    </Section>
  );
}

/* ───────────── structure / history / brief ───────────── */

const INSTITUTIONAL_TITLE =
  "max-w-[900px] font-heading text-[clamp(44px,7vw,82px)] font-black leading-[0.96] tracking-[-0.035em] text-white";

/** Institutional header with a lede and two medium in-page buttons. */
function StructureHero({ eyebrow, heading, lede, actions, navLabel, settings }: HeroProps) {
  const buttons = resolveActions(actions);

  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      spacing="standard"
      className="relative overflow-hidden text-white"
    >
      <Ring className="-right-24 top-1/2 h-96 w-96 -translate-y-1/2 border border-sky/25" />
      <Ring className="right-10 top-1/2 h-48 w-48 -translate-y-1/2 bg-sky/10" />
      <Container className="relative">
        <Eyebrow tone="dark" className="mb-4">
          {eyebrow}
        </Eyebrow>
        <Heading as="h1" scale="none" text={heading} className={INSTITUTIONAL_TITLE} />
        {lede ? (
          <p className="mt-7 max-w-[620px] font-body text-lg leading-[1.7] text-text-on-dark-muted">
            {lede}
          </p>
        ) : null}
        {buttons.length > 0 ? (
          <nav className="mt-9 flex flex-wrap gap-3" aria-label={navLabel || undefined}>
            {buttons.map((button) => (
              <ButtonLink
                key={actionKey(button)}
                href={button.link.href}
                newTab={button.link.newTab}
                variant={button.secondary ? "inverseOutlineMd" : "accentMd"}
              >
                {button.link.label}
              </ButtonLink>
            ))}
          </nav>
        ) : null}
      </Container>
    </Section>
  );
}

/** Institutional header with a wide, larger lede. */
function HistoryHero({ eyebrow, heading, lede, settings }: HeroProps) {
  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      spacing="standard"
      className="relative overflow-hidden text-white"
    >
      <Ring className="-right-24 -top-28 h-96 w-96 border border-sky/30" />
      <Ring className="-bottom-32 right-[18%] h-72 w-72 bg-sky/10" />
      <Container className="relative">
        <Eyebrow tone="dark" className="mb-4">
          {eyebrow}
        </Eyebrow>
        <Heading as="h1" scale="none" text={heading} className={INSTITUTIONAL_TITLE} />
        {lede ? (
          <p className="mt-7 max-w-[760px] font-body text-lg leading-[1.75] text-text-on-dark-muted md:text-xl">
            {lede}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}

/** Institutional header with only eyebrow and title. */
function BriefHero({ eyebrow, heading, settings }: HeroProps) {
  return (
    <Section
      id={settings?.anchorId}
      tone="primary"
      className="relative overflow-hidden px-6 pb-20 pt-20 text-white md:pb-28 md:pt-28"
    >
      <Ring className="-right-20 -top-20 h-80 w-80 border border-sky/30 md:right-[8%] md:top-12" />
      <Container className="relative">
        <div>
          <Eyebrow tone="dark" className="mb-4">
            {eyebrow}
          </Eyebrow>
          <Heading
            as="h1"
            scale="none"
            text={heading}
            className="max-w-[850px] font-heading text-[clamp(42px,6vw,76px)] font-black leading-[0.98] tracking-[-0.03em] text-white"
          />
        </div>
      </Container>
    </Section>
  );
}

export function Hero(props: HeroProps) {
  switch (props.variant) {
    case "home":
      return <HomeHero {...props} />;
    case "subhead":
      return <SubheadHero {...props} />;
    case "event":
      return <EventHero {...props} />;
    case "resources":
      return <ResourcesHero {...props} />;
    case "structure":
      return <StructureHero {...props} />;
    case "history":
      return <HistoryHero {...props} />;
    case "brief":
      return <BriefHero {...props} />;
    default:
      return null;
  }
}
