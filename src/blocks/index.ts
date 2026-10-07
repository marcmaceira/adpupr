import type { Block } from "payload";
import { CardGrid, CtaBand, IconList, NumberedGrid } from "./cta-blocks";
import {
  Checklist,
  Content,
  FeaturePair,
  MediaBlock,
  NumberedList,
  SplitContent,
  Stats,
  Video,
} from "./content-blocks";
import {
  Agenda,
  BenefitsPanel,
  ContactSection,
  EventDetails,
  Pricing,
  ResourceLibrary,
  SignupSteps,
} from "./event-blocks";
import { EventHero, HomeHero, PageHero } from "./hero-blocks";
import { CommitteeList, PeopleGrid } from "./organization-blocks";

function inGroup(group: string, blocks: Block[]): Block[] {
  return blocks.map((block) => ({ ...block, admin: { ...block.admin, group } }));
}

/** Every section editors can add to a page, grouped as they appear in the block picker. */
export const PAGE_BLOCKS: Block[] = [
  ...inGroup("Encabezados", [PageHero, HomeHero, EventHero]),
  ...inGroup("Contenido", [
    SplitContent,
    Content,
    NumberedList,
    NumberedGrid,
    FeaturePair,
    Checklist,
    IconList,
    CardGrid,
    Stats,
    MediaBlock,
    Video,
  ]),
  ...inGroup("Llamadas a la acci\u00F3n", [CtaBand, Pricing, SignupSteps, ContactSection]),
  ...inGroup("Organizaci\u00F3n", [PeopleGrid, CommitteeList, ResourceLibrary]),
  ...inGroup("Eventos", [EventDetails, Agenda, BenefitsPanel]),
];
