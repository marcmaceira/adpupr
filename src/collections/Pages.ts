import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/access";
import { PAGE_BLOCKS } from "@/blocks";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";
import { HOME_SLUG, isPageSlug, pathFromSlug } from "@/lib/paths";

function previewUrl(slug: unknown) {
  if (typeof slug !== "string" || !slug) return null;

  const params = new URLSearchParams({ path: pathFromSlug(slug) });
  return `/next/preview?${params.toString()}`;
}

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  labels: { singular: "P\u00E1gina", plural: "P\u00E1ginas" },
  trash: true,
  defaultPopulate: { title: true, slug: true },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    group: "Contenido",
    description:
      "Cada p\u00E1gina es una lista de secciones. Agrega, reordena o elimina secciones y publica los cambios.",
    livePreview: { url: ({ data }) => previewUrl(data?.slug) },
    preview: (data) => previewUrl(data?.slug),
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      autosave: { interval: 400 },
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "T\u00EDtulo",
      required: true,
      admin: { description: "Nombre interno y t\u00EDtulo por defecto en buscadores." },
    },
    {
      name: "slug",
      type: "text",
      label: "Ruta",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: `Direcci\u00F3n de la p\u00E1gina sin barra inicial, p. ej. «membresia» o «nosotros/quienes-somos». La portada usa «${HOME_SLUG}».`,
      },
      validate: (value: string | null | undefined) =>
        isPageSlug(value) ||
        "Usa min\u00FAsculas sin acentos, n\u00FAmeros, guiones y barras. Las rutas admin, api y next est\u00E1n reservadas.",
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
              labels: { singular: "Secci\u00F3n", plural: "Secciones" },
              blocks: PAGE_BLOCKS,
              required: true,
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
            MetaTitleField({ hasGenerateFn: false }),
            MetaDescriptionField({ hasGenerateFn: false }),
            MetaImageField({ relationTo: "media" }),
            PreviewField({
              hasGenerateFn: false,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
  ],
};
