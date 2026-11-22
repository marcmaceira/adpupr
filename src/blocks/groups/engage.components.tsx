import { ContactSectionBlockComponent } from "../contact-section/component";
import { MembershipEnrollmentBlockComponent } from "../membership-enrollment/component";
import { ResourceLibraryBlockComponent } from "../resource-library/component";
import type { BlockComponents } from "../types";

/** Renderers owned by the "engage" group, keyed by block slug. */
export const engageComponents = {
  membershipEnrollment: MembershipEnrollmentBlockComponent,
  contactSection: ContactSectionBlockComponent,
  resourceLibrary: ResourceLibraryBlockComponent,
} satisfies BlockComponents;
