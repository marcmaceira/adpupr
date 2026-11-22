import type { PeopleGridBlock } from "@/payload-types";
import { PeopleGrid, type PeopleGridMember } from "@/components/sections/people-grid";
import { fillName, getPeopleByIds, populatedMedia, relationId } from "@/lib/data/people";

export async function PeopleGridBlockComponent({ block }: { readonly block: PeopleGridBlock }) {
  const { blockType: _type, blockName: _name, id: _id, members: rows, ...rest } = block;
  const ids = rows.flatMap((row) => relationId(row.person) ?? []);
  const people = await getPeopleByIds(ids);

  const members = rows.flatMap((row, index): PeopleGridMember[] => {
    const personId = relationId(row.person);
    const person = personId === null ? undefined : people.get(personId);
    if (!person) return [];
    const name = row.displayName || person.name;
    const portrait = populatedMedia(person.portrait);
    return [
      {
        key: row.id ?? `${person.id}-${index}`,
        name,
        role: row.role,
        bio: person.bio ?? null,
        portrait,
        portraitAlt: fillName(block.labels.portraitAlt, name) || (portrait?.alt ?? ""),
        openAria: fillName(block.labels.openAria, name),
        bioAria: fillName(block.labels.bioAria, name),
        closeAria: fillName(block.labels.closeAria, name),
      },
    ];
  });

  return <PeopleGrid {...rest} members={members} />;
}
