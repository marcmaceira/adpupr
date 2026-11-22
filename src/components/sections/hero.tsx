import type { HeroBlock } from "@/payload-types";
import { resolveLink } from "@/lib/links";
import { ArrowGlyph } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { Container, Ring, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type HeroProps = Omit<HeroBlock, "blockType" | "blockName" | "id">;

/** Home: oversized title with accent highlight, lede and up to two buttons. */
function HomeHero({ eyebrow, heading, headingHighlight, lede, actions, settings }: HeroProps) {
  const buttons = (actions ?? [])
    .map((action) => ({ link: resolveLink(action.link), style: action.style }))
    .filter((action) => action.link !== null);

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
            {buttons.map(({ link, style }) =>
              link ? (
                <ButtonLink
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  newTab={link.newTab}
                  variant={style === "secondary" ? "inverseOutlineLg" : "accentLg"}
                >
                  {link.label}
                  {style === "secondary" ? null : (
                    <>
                      {" "}
                      <ArrowGlyph />
                    </>
                  )}
                </ButtonLink>
              ) : null,
            )}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export function Hero(props: HeroProps) {
  switch (props.variant) {
    case "home":
      return <HomeHero {...props} />;
    default:
      return null;
  }
}
