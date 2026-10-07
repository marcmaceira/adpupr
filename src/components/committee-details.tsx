import Image from "next/image";
import { ordinal } from "@/lib/format";
import { mediaUrl } from "@/lib/media";
import type { Committee } from "@/payload-types";

type Coordinator = Committee["coordinator"];

function hasBoard(board: Committee["board"]): board is NonNullable<Committee["board"]> {
  return Boolean(board?.summary || board?.members?.length || board?.responsibilities?.length);
}

function CoordinatorProfile({ coordinator }: { readonly coordinator: Coordinator }) {
  const photo = mediaUrl(coordinator.photo);

  return (
    <aside className="rounded-lg bg-primary p-6 text-text-on-dark md:p-8">
      <div className="flex items-center gap-5 border-b border-sky/25 pb-6">
        {photo ? (
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-sky/35 bg-primary-700">
            <Image
              src={photo}
              alt={`Retrato de ${coordinator.name}`}
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
        ) : null}
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
            Coordinaci&oacute;n
          </p>
          <h4 className="mt-2 font-heading text-xl font-extrabold leading-tight text-text-on-dark">
            {coordinator.name}
          </h4>
        </div>
      </div>
      <p className="mt-6 font-body text-sm leading-[1.75] text-text-on-dark-muted">
        {coordinator.bio}
      </p>
    </aside>
  );
}

function CommitteeArticle({
  committee,
  index,
}: {
  readonly committee: Committee;
  readonly index: number;
}) {
  return (
    <article
      id={committee.slug}
      className="scroll-mt-24 border-t border-border-strong py-16 first:border-t-0 first:pt-0 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.75fr)] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mustard font-heading text-xs font-black text-primary">
              {ordinal(index)}
            </span>
            <p className="eyebrow">Comit&eacute; de trabajo</p>
          </div>
          <h3 className="mt-5 max-w-[760px] font-heading text-[clamp(28px,4vw,42px)] font-black leading-[1.08] text-primary">
            Comit&eacute; de {committee.name}
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
            {committee.functions?.map((item) => (
              <li
                key={item.id ?? item.text}
                className="grid grid-cols-[10px_1fr] gap-4 font-body text-[15px] leading-[1.75] text-text-muted"
              >
                <span className="mt-[0.65em] h-2.5 w-2.5 rounded-full bg-sky" aria-hidden="true" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          {hasBoard(committee.board) ? (
            <div className="mt-10 rounded-lg border border-border bg-surface-2 p-6 md:p-8">
              {committee.board.title ? (
                <h4 className="font-heading text-xl font-extrabold text-text">
                  {committee.board.title}
                </h4>
              ) : null}
              {committee.board.summary ? (
                <p className="mt-4 font-body text-base leading-[1.75] text-text-muted">
                  {committee.board.summary}
                </p>
              ) : null}

              {committee.board.members?.length ? (
                <div className="mt-8">
                  <h5 className="eyebrow">Integrantes</h5>
                  <ul className="mt-4 divide-y divide-border border-t border-border">
                    {committee.board.members.map((member) => (
                      <li key={member.id ?? member.name} className="py-4">
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

              {committee.board.responsibilities?.length ? (
                <div className="mt-9 border-t border-border-strong pt-8">
                  <h5 className="eyebrow">Responsabilidades</h5>
                  <ol className="mt-5 space-y-5">
                    {committee.board.responsibilities.map((responsibility, responsibilityIndex) => (
                      <li
                        key={responsibility.id ?? responsibility.text}
                        className="grid grid-cols-[32px_1fr] gap-4"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-[11px] font-black text-text-on-dark">
                          {ordinal(responsibilityIndex)}
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
          ) : null}
        </div>

        <div className="lg:pt-16">
          <CoordinatorProfile coordinator={committee.coordinator} />
        </div>
      </div>
    </article>
  );
}

interface CommitteeDetailsProps {
  readonly anchor?: string | null;
  readonly eyebrow?: string | null;
  readonly heading: string;
  readonly description?: string | null;
  readonly committees: readonly Committee[];
}

export default function CommitteeDetails({
  anchor,
  eyebrow,
  heading,
  description,
  committees,
}: CommitteeDetailsProps) {
  return (
    <section id={anchor || undefined} className="bg-bg px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 border-b border-border-strong pb-12 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            {eyebrow ? <p className="eyebrow mb-3.5">{eyebrow}</p> : null}
            <h2 className="h-section text-text">{heading}</h2>
          </div>
          {description ? <p className="lede md:justify-self-end">{description}</p> : null}
        </div>

        <nav className="my-10 grid gap-3 sm:grid-cols-3" aria-label={heading}>
          {committees.map((committee, index) => (
            <a
              key={committee.id}
              href={`#${committee.slug}`}
              className="group flex min-h-20 items-center gap-4 rounded-md border border-border bg-surface px-5 py-4 font-heading text-sm font-bold leading-snug text-primary shadow-[var(--shadow-card)] transition-colors hover:border-sky hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="text-xs font-black text-sky-600">{ordinal(index)}</span>
              <span>{committee.name}</span>
            </a>
          ))}
        </nav>

        <div>
          {committees.map((committee, index) => (
            <CommitteeArticle key={committee.id} committee={committee} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
