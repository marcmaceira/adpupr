import type { Committee, CommitteesBlock, Person } from "@/payload-types";
import { Committees, type CommitteeView } from "@/components/sections/committees";
import { fillName, getCommittees, populatedMedia, relationId } from "@/lib/data/people";

/** "Comité de {nombre}" → ["Comité de ", name], dropping empty pieces. */
function splitName(template: string, name: string): string[] {
  return template
    .split("{nombre}")
    .flatMap((piece, index) => (index === 0 ? [piece] : [name, piece]))
    .filter(Boolean);
}

const asPerson = (value: number | Person | null | undefined): Person | null =>
  value && typeof value === "object" ? value : null;

function toView(committee: Committee, labels: CommitteesBlock["labels"]): CommitteeView {
  const coordinatorPerson = asPerson(committee.coordinator?.person);
  const coordinatorName = committee.coordinator?.displayName || coordinatorPerson?.name || "";
  const coordinatorPortrait = populatedMedia(coordinatorPerson?.portrait);

  const board = committee.editorialBoard;
  const boardMembers = (board?.members ?? []).flatMap((member, index) => {
    const person = asPerson(member.person);
    const name = member.displayName || person?.name;
    if (!name) return [];
    return [{ key: member.id ?? `${person?.id ?? "m"}-${index}`, name, role: member.role }];
  });
  const responsibilities = (board?.responsibilities ?? []).map((item, index) => ({
    id: item.id ?? String(index),
    text: item.text,
  }));
  const hasBoard = Boolean(
    board?.title || board?.summary || boardMembers.length > 0 || responsibilities.length > 0,
  );

  return {
    anchor: committee.slug || String(committee.id),
    name: committee.name,
    headingParts: splitName(labels.committeeHeading, committee.name),
    description: committee.description,
    focus: committee.focus ?? null,
    functionsLabel: committee.functionsLabel,
    functions: (committee.functions ?? []).map((item, index) => ({
      id: item.id ?? String(index),
      text: item.text,
    })),
    editorialBoard: hasBoard
      ? {
          title: board?.title ?? null,
          summary: board?.summary ?? null,
          members: boardMembers,
          responsibilities,
        }
      : null,
    coordinator: coordinatorPerson
      ? {
          label: committee.coordinator.roleLabel || labels.coordinator,
          name: coordinatorName,
          bio: coordinatorPerson.bio ?? null,
          portrait: coordinatorPortrait,
          portraitAlt:
            fillName(labels.portraitAlt, coordinatorName) || (coordinatorPortrait?.alt ?? ""),
        }
      : null,
  };
}

export async function CommitteesBlockComponent({ block }: { readonly block: CommitteesBlock }) {
  const {
    blockType: _type,
    blockName: _name,
    id: _id,
    committees: selected,
    selection,
    ...rest
  } = block;
  const ids =
    selection === "selected" ? (selected ?? []).flatMap((value) => relationId(value) ?? []) : null;
  const committees = await getCommittees(ids);
  return <Committees {...rest} committees={committees.map((c) => toView(c, block.labels))} />;
}
