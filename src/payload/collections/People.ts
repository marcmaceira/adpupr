import type { CollectionBeforeValidateHook, CollectionConfig, Field } from "payload";
import { media, text } from "../fields";
import { anyone, authenticated, humanEditors } from "../access";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** "Urayoán Jordán Salivia" → "urayoan-jordan-salivia". */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fills an empty `slug` from another text field of the same document. Never changes an
 * existing slug: anchors and seed keys must survive a rename or a partial update.
 */
export const slugFrom =
  (source: string): CollectionBeforeValidateHook =>
  ({ data, originalDoc }) => {
    if (!data || data.slug || originalDoc?.slug) return data;
    const value: unknown = Reflect.get(data, source);
    return typeof value === "string" ? { ...data, slug: slugify(value) } : data;
  };

/** Unique, URL-safe identifier field. `description` explains what it is used for. */
export const slugField = (label: string, description: string, example: string): Field => ({
  name: "slug",
  type: "text",
  label,
  unique: true,
  index: true,
  admin: { position: "sidebar", description },
  validate: (value: unknown) =>
    !value || (typeof value === "string" && SLUG_PATTERN.test(value))
      ? true
      : `Usa solo minúsculas, números y guiones (por ejemplo: ${example}).`,
});

/**
 * One record per real person. Every place that shows people (Junta Directiva, Junta
 * Fundadora, comités) points here, so a name, portrait or biography is edited once.
 */
export const People: CollectionConfig = {
  slug: "people",
  labels: { singular: "Persona", plural: "Personas" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "portrait", "updatedAt"],
    group: "Organización",
    description:
      "Integrantes de juntas y comités. Cada persona existe una sola vez: su retrato y biografía se actualizan en todas las secciones donde aparece.",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  defaultSort: "name",
  hooks: { beforeValidate: [slugFrom("name")] },
  fields: [
    text("name", "Nombre", {
      required: true,
      description:
        "Como se muestra normalmente, con títulos o grados si aplican. Cada sección puede mostrar otra forma del nombre.",
    }),
    media("portrait", "Retrato", {
      description:
        "Foto vertical (proporción 4:5 o 3:4). El texto alternativo se edita en el archivo de Medios.",
    }),
    text("bio", "Biografía", {
      textarea: true,
      description:
        "Se muestra al abrir la tarjeta en la Junta Directiva y en el perfil de coordinación de un comité.",
    }),
    slugField(
      "Identificador",
      "Se completa automáticamente a partir del nombre. Minúsculas, números y guiones.",
      "maria-rivera",
    ),
  ],
};
