"use client";

import type { FormEvent } from "react";
import { Send } from "lucide-react";

function getTextField(form: FormData, field: string): string {
  const value = form.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function handleSubmit(event: FormEvent<HTMLFormElement>, recipient: string) {
  event.preventDefault();
  // Only an email address is permitted, never a scheme, query string or redirect target.
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(recipient)) return;

  const form = new FormData(event.currentTarget);
  const name = getTextField(form, "name");
  const contact = getTextField(form, "contact");
  const message = getTextField(form, "message");
  const subject = `Mensaje desde adpupr.com - ${name}`;
  const body = [
    `Nombre: ${name}`,
    contact ? `Informaci\u00F3n de contacto: ${contact}` : null,
    "",
    "Mensaje:",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const fieldClassName =
  "mt-2 w-full rounded-sm border border-border-strong bg-surface px-4 py-3 font-body text-[15px] text-text outline-none transition-colors placeholder:text-text-faint focus:border-primary focus:ring-2 focus:ring-sky-200";

interface ContactFormProps {
  readonly recipient: string;
  readonly eyebrow?: string | null;
  readonly heading: string;
  readonly note?: string | null;
  readonly buttonLabel?: string | null;
}

export default function ContactForm({
  recipient,
  eyebrow,
  heading,
  note,
  buttonLabel,
}: ContactFormProps) {
  return (
    <form onSubmit={(event) => handleSubmit(event, recipient)} className="card p-6 sm:p-8">
      <div className="mb-8">
        {eyebrow ? <span className="eyebrow mb-3 block">{eyebrow}</span> : null}
        <h2 className="font-heading text-2xl font-extrabold text-text sm:text-3xl">{heading}</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-heading text-sm font-semibold text-text">
          Nombre
          <input
            className={fieldClassName}
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder="Tu nombre"
          />
        </label>
        <label className="font-heading text-sm font-semibold text-text">
          Informaci&oacute;n de contacto
          <input
            className={fieldClassName}
            type="text"
            name="contact"
            autoComplete="email"
            placeholder="Correo o tel&eacute;fono (opcional)"
          />
        </label>
      </div>

      <label className="mt-5 block font-heading text-sm font-semibold text-text">
        Mensaje
        <textarea
          className={`${fieldClassName} min-h-40 resize-y`}
          name="message"
          required
          placeholder="Cu&eacute;ntanos c&oacute;mo podemos colaborar."
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[42ch] font-body text-xs leading-relaxed text-text-faint">{note}</p>
        <button
          type="submit"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-heading text-sm font-semibold text-text-on-dark transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {buttonLabel || "Enviar correo"}
          <Send className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
