import type { MembershipEnrollmentBlock } from "@/payload-types";
import { getSiteSettings } from "@/lib/cms";
import { postalLines } from "@/lib/data/engage";
import { MembershipEnrollment } from "@/components/sections/membership-enrollment";

export async function MembershipEnrollmentBlockComponent({
  block,
}: {
  readonly block: MembershipEnrollmentBlock;
}) {
  const settings = await getSiteSettings();
  return (
    <MembershipEnrollment
      {...block}
      athMovilUrl={settings.payments.athMovilUrl || null}
      postalLines={postalLines(settings)}
    />
  );
}
