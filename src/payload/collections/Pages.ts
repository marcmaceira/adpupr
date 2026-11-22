import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig, PayloadRequest } from "payload";
import { blocks } from "../../blocks";
import { authenticated, authenticatedOrPublished, humanEditors } from "../access";

const PATH_PATTERN = /^\/([a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*)?$/;
const RESERVED = new Set(["admin", "api", "next", "_next"]);

export function previewPath(path: unknown): string | null {
  if (typeof path !== "string" || !path.startsWith("/")) return null;
  const params = new URLSearchParams({ path, previewSecret: process.env.PREVIEW_SECRET ?? "" });
  return `/next/preview?${params.toString()}`;
}

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Página", plural: "Páginas" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    pagination: { defaultLimit: 50 },
    group: "Contenido",
    description:
      "Cada página del sitio. Se compone de secciones (bloques) en la pestaña Contenido.",
    livePreview: { url: ({ data }) => previewPath(data?.path) },
    preview: (data) => previewPath(data?.path),
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: humanEditors,
  },
  defaultPopulate: { title: true, path: true },
  versions: {
    drafts: { autosave: { interval: 400 }, schedulePublish: false },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título de la página",
      required: true,
      admin: { description: "Se usa en el título de la pestaña del navegador y en buscadores." },
    },
    {
      name: "path",
      type: "text",
      label: "Ruta (URL)",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Ejemplos: / · /membresia · /nosotros/quienes-somos",
      },
      validate: async (
        value: unknown,
        { req, id }: { req: PayloadRequest; id?: number | string },
      ) => {
        if (typeof value !== "string" || !value) return "Escribe la ruta de la página.";
        if (!PATH_PATTERN.test(value)) {
          return "La ruta debe empezar con / y usar solo minúsculas, números y guiones (por ejemplo: /nosotros/historia).";
        }
        const first = value.split("/")[1];
        if (first && RESERVED.has(first)) return `La ruta no puede empezar con /${first}.`;
        const taken = await req.payload.find({
          collection: "pages",
          where: id
            ? { path: { equals: value }, id: { not_equals: id } }
            : { path: { equals: value } },
          depth: 0,
          limit: 1,
          overrideAccess: true,
          req,
        });
        const other = taken.docs[0];
        return other ? `La ruta ${value} ya la usa la página «${other.title}». Elige otra.` : true;
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Contenido",
          fields: [
            {
              name: "layout",
              type: "blocks",
              label: "Secciones",
              labels: { singular: "Sección", plural: "Secciones" },
              blocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                admin: {
                  description:
                    "Se muestra como «Título | ADPUPR». Déjalo vacío para usar el título de la página.",
                },
              },
            }),
            MetaDescriptionField({}),
            {
              name: "ogDescription",
              type: "textarea",
              label: "Descripción para redes sociales",
              admin: {
                description: "Opcional. Si está vacía se usa la descripción de arriba.",
              },
            },
            MetaImageField({ relationTo: "media" }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "noindex",
      type: "checkbox",
      label: "Ocultar de buscadores (noindex)",
      admin: { position: "sidebar" },
    },
    {
      name: "sitemap",
      type: "group",
      label: "Mapa del sitio",
      admin: { position: "sidebar" },
      fields: [
        { name: "include", type: "checkbox", label: "Incluir en sitemap.xml", defaultValue: true },
        {
          name: "priority",
          type: "select",
          label: "Prioridad",
          defaultValue: "0.7",
          options: ["1", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"].map(
            (v) => ({ label: v, value: v }),
          ),
        },
        {
          name: "changeFrequency",
          type: "select",
          label: "Frecuencia de cambio",
          defaultValue: "monthly",
          options: [
            { label: "Siempre", value: "always" },
            { label: "Cada hora", value: "hourly" },
            { label: "Diaria", value: "daily" },
            { label: "Semanal", value: "weekly" },
            { label: "Mensual", value: "monthly" },
            { label: "Anual", value: "yearly" },
            { label: "Nunca", value: "never" },
          ],
        },
      ],
    },
  ],
};
