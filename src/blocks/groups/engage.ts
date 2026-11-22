import type { Block } from "payload";
import { ContactSectionBlock } from "../contact-section/config";
import { MembershipEnrollmentBlock } from "../membership-enrollment/config";
import { ResourceLibraryBlock } from "../resource-library/config";

/** Block configs owned by the "engage" group. Register new blocks here only. */
export const engageBlocks: Block[] = [
  MembershipEnrollmentBlock,
  ContactSectionBlock,
  ResourceLibraryBlock,
];
