"use client";

import type { FormEvent } from "react";
import type { ContactSectionBlock } from "@/payload-types";
import { BUTTON_VARIANTS } from "@/components/ui/button";
import { CARD_VARIANTS } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { cx } from "@/lib/cx";

type FormCopy = ContactSectionBlock["form"];

interface ContactSectionFormProps {
  readonly copy: FormCopy;
  /** Resolved recipient: the block override or the first site email. */
  readonly recipient: string | null;
}

const NAME_TOKEN = "{nombre}";

const FIELD_CLASS =
  "mt-2 w-full rounded-sm border border-border-strong bg-surface px-4 py-3 font-body text-[15px] text-text outline-none transition-colors placeholder:text-text-faint focus:border-primary focus:ring-2 focus:ring-sky-200";

function getTextField(form: FormData, field: string): string {
  const value = form.get(field);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Builds the mailto URL: subject from the template with {nombre} replaced, body lines
 * "<nameLine> name", "<contactLine> contact" (only when given), a blank line,
 * "<messageLine>", then the message.
 */
export function buildMailto(
  recipient: string,
  email: FormCopy["email"],
  values: { readonly name: string; readonly contact: string; readonly message: string },
): string {
  // split/join instead of replace so "$" in a name is never treated as a pattern.
  const subject = email.subjectTemplate.split(NAME_TOKEN).join(values.name);
  const body = [
    `${email.nameLine} ${values.name}`,
    values.contact ? `${email.contactLine} ${values.contact}` : null,
    "",
    email.messageLine,
    values.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens the visitor's email app with the message composed. Stores nothing. */
export function ContactSectionForm({ copy, recipient }: ContactSectionFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!recipient) return;
    const form = new FormData(event.currentTarget);
    window.location.href = buildMailto(recipient, copy.email, {
      name: getTextField(form, "name"),
      contact: getTextField(form, "contact"),
      message: getTextField(form, "message"),
    });
  }

  return (
    <form onSubmit={handleSubmit} className={cx(CARD_VARIANTS.card, "p-6 sm:p-8")}>
      <div className="mb-8">
        <Eyebrow as="span" className="mb-3 block">
          {copy.eyebrow}
        </Eyebrow>
        <h2 className="font-heading text-2xl font-extrabold text-text sm:text-3xl">
          {copy.heading}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-heading text-sm font-semibold text-text">
          {copy.nameLabel}
          <input
            className={FIELD_CLASS}
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder={copy.namePlaceholder ?? undefined}
          />
        </label>
        <label className="font-heading text-sm font-semibold text-text">
          {copy.contactLabel}
          <input
            className={FIELD_CLASS}
            type="text"
            name="contact"
            autoComplete="email"
            placeholder={copy.contactPlaceholder ?? undefined}
          />
        </label>
      </div>

      <label className="mt-5 block font-heading text-sm font-semibold text-text">
        {copy.messageLabel}
        <textarea
          className={`${FIELD_CLASS} min-h-40 resize-y`}
          name="message"
          required
          placeholder={copy.messagePlaceholder ?? undefined}
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        {copy.privacyNote ? (
          <p className="max-w-[42ch] font-body text-xs leading-relaxed text-text-faint">
            {copy.privacyNote}
          </p>
        ) : null}
        <button type="submit" className={BUTTON_VARIANTS.primaryMdSemibold}>
          {copy.submitLabel}
          <Icon name="send" className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </form>
  );
}
