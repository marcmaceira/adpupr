import type { ContactSectionBlock } from "@/payload-types";
import { getSiteSettings } from "@/lib/cms";
import { contactEmails, postalLines } from "@/lib/data/engage";
import { type ContactProfile, ContactSection } from "@/components/sections/contact-section";

export async function ContactSectionBlockComponent({
  block,
}: {
  readonly block: ContactSectionBlock;
}) {
  const settings = await getSiteSettings();
  const emails = contactEmails(settings);
  const siteProfiles = settings.social?.profiles ?? [];
  const profiles = (block.channels.networks ?? []).flatMap((row): ContactProfile[] => {
    const profile = siteProfiles.find((p) => p.network === row.network);
    return profile
      ? [{ label: profile.label, handle: profile.handle ?? null, url: profile.url }]
      : [];
  });

  return (
    <ContactSection
      {...block}
      recipient={block.form.email.recipient || emails[0] || null}
      emails={emails}
      postalLines={postalLines(settings)}
      profiles={profiles}
    />
  );
}
