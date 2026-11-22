import type { CommitteesBlock, Media } from "@/payload-types";
import { MediaImage } from "@/components/ui/media-image";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

interface TextItem {
  readonly id: string;
  readonly text: string;
}

/** A committee resolved by the block adapter (labels and names already filled in). */
export interface CommitteeView {
  /** Anchor id of the committee's article (its slug). */
  readonly anchor: string;
  /** Short name, used in the jump cards. */
  readonly name: string;
  /**
   * Title of the article split around the committee name (`[prefix, name]`), so
   * the text renders as the same separate text nodes as the original markup.
   */
  readonly headingParts: readonly string[];
  readonly description: string;
  readonly focus: string | null;
  readonly functionsLabel: string;
  readonly functions: readonly TextItem[];
  readonly editorialBoard: {
    readonly title: string | null;
    readonly summary: string | null;
    readonly members: readonly {
      readonly key: string;
      readonly name: string;
      readonly role: string;
    }[];
    readonly responsibilities: readonly TextItem[];
  } | null;
  readonly coordinator: {
    readonly label: string;
    readonly name: string;
    readonly bio: string | null;
    readonly portrait: Media | null;
    readonly portraitAlt: string;
  } | null;
}

export type CommitteesProps = Omit<
  CommitteesBlock,
  "blockType" | "blockName" | "id" | "committees" | "selection"
> & {
  readonly committees: readonly CommitteeView[];
};

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Jump-card number. The original rendered "0" and the number as two text nodes, which
 * shapes slightly differently from one "01" string; keep that, without breaking at 10.
 */
function JumpNumber({ index }: { readonly index: number }) {
  const n = index + 1;
  return (
    <span className="text-xs font-black text-sky-600">
      {n < 10 ? "0" : null}
      {n}
    </span>
  );
}

function CoordinatorProfile({
  coordinator,
}: {
  readonly coordinator: NonNullable<CommitteeView["coordinator"]>;
}) {
  return (
    <aside className="rounded-lg bg-primary p-6 text-white md:p-8">
      <div className="flex items-center gap-5 border-b border-sky/25 pb-6">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-sky/35 bg-primary-700">
          <MediaImage
            media={coordinator.portrait}
            alt={coordinator.portraitAlt}
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </div>
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
            {coordinator.label}
          </p>
          <h4 className="mt-2 font-heading text-xl font-extrabold leading-tight text-white">
            {coordinator.name}
          </h4>
        </div>
      </div>
      {coordinator.bio ? (
        <p className="mt-6 font-body text-sm leading-[1.75] text-text-on-dark-muted">
          {coordinator.bio}
        </p>
      ) : null}
    </aside>
  );
}

function EditorialBoard({
  board,
  labels,
}: {
  readonly board: NonNullable<CommitteeView["editorialBoard"]>;
  readonly labels: CommitteesProps["labels"];
}) {
  return (
    <div className="mt-10 rounded-lg border border-border bg-surface-2 p-6 md:p-8">
      {board.title ? (
        <h4 className="font-heading text-xl font-extrabold text-text">{board.title}</h4>
      ) : null}
      {board.summary ? (
        <p className="mt-4 font-body text-base leading-[1.75] text-text-muted">{board.summary}</p>
      ) : null}

      {board.members.length > 0 ? (
        <div className="mt-8">
          <h5 className="eyebrow">{labels.members}</h5>
          <ul className="mt-4 divide-y divide-border border-t border-border">
            {board.members.map((member) => (
              <li key={member.key} className="py-4">
                <p className="font-heading text-base font-extrabold leading-snug text-primary">
                  {member.name}
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-text-muted">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {board.responsibilities.length > 0 ? (
        <div className="mt-9 border-t border-border-strong pt-8">
          <h5 className="eyebrow">{labels.responsibilities}</h5>
          <ol className="mt-5 space-y-5">
            {board.responsibilities.map((responsibility, index) => (
              <li key={responsibility.id} className="grid grid-cols-[32px_1fr] gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-[11px] font-black text-white">
                  {pad(index)}
                </span>
                <p className="font-body text-[15px] leading-[1.75] text-text-muted">
                  {responsibility.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

function CommitteeArticle({
  committee,
  index,
  labels,
}: {
  readonly committee: CommitteeView;
  readonly index: number;
  readonly labels: CommitteesProps["labels"];
}) {
  return (
    <article
      id={committee.anchor}
      className="scroll-mt-24 border-t border-border-strong py-16 first:border-t-0 first:pt-0 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.75fr)] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mustard font-heading text-xs font-black text-primary">
              {pad(index)}
            </span>
            <p className="eyebrow">{labels.committeeEyebrow}</p>
          </div>
          <h3 className="mt-5 max-w-[760px] font-heading text-[clamp(28px,4vw,42px)] font-black leading-[1.08] text-primary">
            {committee.headingParts}
          </h3>
          <p className="mt-6 font-body text-base leading-[1.8] text-text-muted md:text-lg">
            {committee.description}
          </p>

          {committee.focus ? (
            <p className="mt-7 border-l-4 border-mustard bg-mustard-200/45 px-5 py-4 font-body text-base font-semibold leading-[1.7] text-primary">
              {committee.focus}
            </p>
          ) : null}

          <h4 className="mt-10 font-heading text-xl font-extrabold text-text">
            {committee.functionsLabel}
          </h4>
          <ul className="mt-5 space-y-4">
            {committee.functions.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[10px_1fr] gap-4 font-body text-[15px] leading-[1.75] text-text-muted"
              >
                <span className="mt-[0.65em] h-2.5 w-2.5 rounded-full bg-sky" aria-hidden="true" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          {committee.editorialBoard ? (
            <EditorialBoard board={committee.editorialBoard} labels={labels} />
          ) : null}
        </div>

        <div className="lg:pt-16">
          {committee.coordinator ? (
            <CoordinatorProfile coordinator={committee.coordinator} />
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Committees({
  eyebrow,
  heading,
  intro,
  labels,
  committees,
  settings,
}: CommitteesProps) {
  return (
    <Section id={settings?.anchorId} tone="bg" spacing="standard">
      <Container>
        <div className="grid gap-8 border-b border-border-strong pb-12 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
            <Heading text={heading} className="text-text" />
          </div>
          {intro ? <p className="lede md:justify-self-end">{intro}</p> : null}
        </div>

        {committees.length > 0 ? (
          <nav className="my-10 grid gap-3 sm:grid-cols-3" aria-label={labels.navAria}>
            {committees.map((committee, index) => (
              <a
                key={committee.anchor}
                href={`#${committee.anchor}`}
                className="group flex min-h-20 items-center gap-4 rounded-md border border-border bg-surface px-5 py-4 font-heading text-sm font-bold leading-snug text-primary shadow-[var(--shadow-card)] transition-colors hover:border-sky hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <JumpNumber index={index} />
                <span>{committee.name}</span>
              </a>
            ))}
          </nav>
        ) : null}

        <div>
          {committees.map((committee, index) => (
            <CommitteeArticle
              key={committee.anchor}
              committee={committee}
              index={index}
              labels={labels}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
