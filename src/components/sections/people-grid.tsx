import type { Media, PeopleGridBlock } from "@/payload-types";
import { MediaImage } from "@/components/ui/media-image";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { PersonAvatar } from "./people-avatar";
import { BoardGrid } from "./people-grid-board";
import { PortraitCard } from "./people-grid-portrait-card";

/** One placement of a person, resolved by the block adapter (labels already filled in). */
export interface PeopleGridMember {
  readonly key: string;
  /** Display name for this placement. */
  readonly name: string;
  readonly role: string;
  readonly bio: string | null;
  readonly portrait: Media | null;
  readonly portraitAlt: string;
  readonly openAria: string;
  readonly bioAria: string;
  readonly closeAria: string;
}

export type PeopleGridProps = Omit<
  PeopleGridBlock,
  "blockType" | "blockName" | "id" | "members"
> & {
  readonly members: readonly PeopleGridMember[];
};

/** Board grid: split header and cards that open a biography overlay. */
function BioOverlayGrid({ eyebrow, heading, intro, members, labels, settings }: PeopleGridProps) {
  const cards = members.map((member, index) => ({
    key: member.key,
    name: member.name,
    role: member.role,
    bio: member.bio ?? "",
    openAria: member.openAria,
    bioAria: member.bioAria,
    closeAria: member.closeAria,
    portrait: (
      <>
        <PersonAvatar seed={index} />
        <MediaImage
          media={member.portrait}
          alt={member.portraitAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 112px"
          className="z-[1] object-cover object-top"
        />
      </>
    ),
  }));

  return (
    <Section id={settings?.anchorId} tone="bg" spacing="standard">
      <Container>
        <div className="mb-12 grid gap-6 border-b border-border-strong pb-10 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
            <Heading text={heading} className="text-text" />
          </div>
          {intro ? (
            <p className="font-body text-base leading-[1.7] text-text-muted md:justify-self-end md:text-right">
              {intro}
            </p>
          ) : null}
        </div>

        <BoardGrid cards={cards} openLabel={labels.open ?? ""} />
      </Container>
    </Section>
  );
}

/** Junta Fundadora: stacked header and 3:4 portrait cards. */
function PortraitGrid({ eyebrow, heading, intro, members, showBios, settings }: PeopleGridProps) {
  return (
    <Section id={settings?.anchorId} tone="surface2" spacing="standard">
      <Container>
        <div className="mb-12 max-w-[700px]">
          <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
          <Heading text={heading} className="text-text" />
          {intro ? <p className="lede mt-5">{intro}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, index) => (
            <PortraitCard
              key={member.key}
              name={member.name}
              role={member.role}
              bio={showBios ? member.bio : null}
              portrait={
                member.portrait ? (
                  <MediaImage
                    media={member.portrait}
                    alt={member.portraitAlt}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <PersonAvatar seed={index} />
                )
              }
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function PeopleGrid(props: PeopleGridProps) {
  return props.variant === "portrait" ? <PortraitGrid {...props} /> : <BioOverlayGrid {...props} />;
}
