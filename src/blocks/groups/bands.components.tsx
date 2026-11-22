import { HeroBlockComponent } from "../hero/component";
import type { BlockComponents } from "../types";

/** Renderers owned by the "bands" group, keyed by block slug. */
export const bandsComponents = {
  hero: HeroBlockComponent,
} satisfies BlockComponents;
