import { CtaBandBlockComponent } from "../cta-band/component";
import { HeroBlockComponent } from "../hero/component";
import { StatsBlockComponent } from "../stats/component";
import type { BlockComponents } from "../types";

/** Renderers owned by the "bands" group, keyed by block slug. */
export const bandsComponents = {
  hero: HeroBlockComponent,
  ctaBand: CtaBandBlockComponent,
  stats: StatsBlockComponent,
} satisfies BlockComponents;
