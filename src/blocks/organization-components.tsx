import BoardMembers from "@/components/board-members";
import CommitteeDetails from "@/components/committee-details";
import { DirectorCard } from "@/components/director-card";
import { getCommittees } from "@/lib/cms";
import { mediaUrl, populated } from "@/lib/media";
import type { Committee, CommitteeListBlock, PeopleGridBlock } from "@/payload-types";
import { backgroundClass } from "./shared";

export function PeopleGrid({ block }: { readonly block: PeopleGridBlock }) {
  const people = (block.people ?? []).map((person, index) => ({
    id: person.id ?? `${index}-${person.name}`,
    name: person.name,
    role: person.role,
    bio: person.bio,
    image: mediaUrl(person.photo),
  }));

  if (block.display === "portraits") {
    return (
      <section
        id={block.anchor || undefined}
        className={`${backgroundClass(block.background)} px-6 py-20 md:py-28`}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 max-w-[700px]">
            {block.eyebrow ? <p className="eyebrow mb-3.5">{block.eyebrow}</p> : null}
            <h2 className="h-section text-text">{block.heading}</h2>
            {block.description ? <p className="lede mt-5">{block.description}</p> : null}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {people.map((person, index) => (
              <DirectorCard
                key={person.id}
                director={{
                  name: person.name,
                  role: person.role,
                  bio: person.bio ?? undefined,
                  image: person.image ?? undefined,
                }}
                seed={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-20 md:py-28`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid gap-6 border-b border-border-strong pb-10 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            {block.eyebrow ? <p className="eyebrow mb-3.5">{block.eyebrow}</p> : null}
            <h2 className="h-section text-text">{block.heading}</h2>
          </div>
          {block.description ? (
            <p className="font-body text-base leading-[1.7] text-text-muted md:justify-self-end md:text-right">
              {block.description}
            </p>
          ) : null}
        </div>

        <BoardMembers members={people} />
      </div>
    </section>
  );
}

export async function CommitteeList({ block }: { readonly block: CommitteeListBlock }) {
  const selected = (block.committees ?? [])
    .map((committee) => populated(committee))
    .filter((committee): committee is Committee => committee !== null);
  const committees = selected.length > 0 ? selected : await getCommittees();

  return (
    <CommitteeDetails
      anchor={block.anchor}
      eyebrow={block.eyebrow}
      heading={block.heading}
      description={block.description}
      committees={committees}
    />
  );
}
