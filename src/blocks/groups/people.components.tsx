import { CommitteesBlockComponent } from "../committees/component";
import { PeopleGridBlockComponent } from "../people-grid/component";
import type { BlockComponents } from "../types";

/** Renderers owned by the "people" group, keyed by block slug. */
export const peopleComponents = {
  peopleGrid: PeopleGridBlockComponent,
  committees: CommitteesBlockComponent,
} satisfies BlockComponents;
