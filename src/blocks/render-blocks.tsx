import type { Page } from "@/payload-types";
import { HomeHero, PageHero, EventHero } from "./hero-components";
import {
  Checklist,
  Content,
  FeaturePair,
  MediaBlock,
  NumberedList,
  SplitContent,
  Stats,
  Video,
} from "./content-components";
import { CardGrid, CtaBand, IconList, NumberedGrid } from "./cta-components";
import {
  Agenda,
  BenefitsPanel,
  ContactSection,
  EventDetails,
  Pricing,
  ResourceLibrary,
  SignupSteps,
} from "./event-components";
import { CommitteeList, PeopleGrid } from "./organization-components";

type PageBlock = Page["layout"][number];

function RenderBlock({ block }: { readonly block: PageBlock }) {
  switch (block.blockType) {
    case "homeHero":
      return <HomeHero block={block} />;
    case "pageHero":
      return <PageHero block={block} />;
    case "eventHero":
      return <EventHero block={block} />;
    case "stats":
      return <Stats block={block} />;
    case "splitContent":
      return <SplitContent block={block} />;
    case "content":
      return <Content block={block} />;
    case "featurePair":
      return <FeaturePair block={block} />;
    case "numberedList":
      return <NumberedList block={block} />;
    case "checklist":
      return <Checklist block={block} />;
    case "mediaBlock":
      return <MediaBlock block={block} />;
    case "video":
      return <Video block={block} />;
    case "ctaBand":
      return <CtaBand block={block} />;
    case "cardGrid":
      return <CardGrid block={block} />;
    case "numberedGrid":
      return <NumberedGrid block={block} />;
    case "iconList":
      return <IconList block={block} />;
    case "peopleGrid":
      return <PeopleGrid block={block} />;
    case "committeeList":
      return <CommitteeList block={block} />;
    case "eventDetails":
      return <EventDetails block={block} />;
    case "agenda":
      return <Agenda block={block} />;
    case "benefitsPanel":
      return <BenefitsPanel block={block} />;
    case "pricing":
      return <Pricing block={block} />;
    case "signupSteps":
      return <SignupSteps block={block} />;
    case "contactSection":
      return <ContactSection block={block} />;
    case "resourceLibrary":
      return <ResourceLibrary block={block} />;
  }
  // Exhaustiveness check: adding a block type without a renderer fails TypeScript.
  const unreachable: never = block;
  return unreachable;
}

function blockBackground(block: PageBlock) {
  if ("background" in block) return block.background || "bg";
  switch (block.blockType) {
    case "committeeList":
    case "resourceLibrary":
    case "contactSection":
      return "bg";
    case "featurePair":
      return "surface-2";
    case "video":
      return "surface";
    default:
      return "separate";
  }
}

export function RenderBlocks({ blocks }: { readonly blocks: Page["layout"] }) {
  return (
    <>
      {blocks.map((block) => (
        <div
          key={block.id ?? `${block.blockType}-${block.anchor}`}
          className="cms-block"
          data-background={blockBackground(block)}
        >
          <RenderBlock block={block} />
        </div>
      ))}
    </>
  );
}
