import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig, PayloadRequest } from "payload";
import { blocks } from "../../blocks";
import { staff, publishedOrStaff, humanEditors } from "../access";

const PATH_PATTERN = /^\/([a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*)?$/;
const RESERVED = new Set(["admin", "api", "next", "_next"]);

export function previewPath(path: unknown): string | null {
  if (typeof path !== "string" || !path.startsWith("/")) return null;
  const params = new URLSearchParams({ path, previewSecret: process.env.PREVIEW_SECRET ?? "" });
  return `/next/preview?${params.toString()}`;
}

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    pagination: { defaultLimit: 50 },
    group: "Content",
    description: "Every page of the site. It is built from sections (blocks) in the Content tab.",
    livePreview: { url: ({ data }) => previewPath(data?.path) },
    preview: (data) => previewPath(data?.path),
  },
  access: {
    create: staff,
    read: publishedOrStaff,
    readVersions: staff,
    update: staff,
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
      label: "Page title",
      required: true,
      admin: { description: "Used in the browser tab title and in search engines." },
    },
    {
      name: "path",
      type: "text",
      label: "Path (URL)",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Examples: / · /membresia · /nosotros/quienes-somos",
      },
      validate: async (
        value: unknown,
        { req, id }: { req: PayloadRequest; id?: number | string },
      ) => {
        if (typeof value !== "string" || !value) return "Enter the page path.";
        if (!PATH_PATTERN.test(value)) {
          return "The path must start with / and use only lowercase letters, numbers and hyphens (for example: /nosotros/historia).";
        }
        const first = value.split("/")[1];
        if (first && RESERVED.has(first)) return `The path cannot start with /${first}.`;
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
        return other
          ? `The path ${value} is already used by the page "${other.title}". Choose another one.`
          : true;
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              label: "Sections",
              labels: { singular: "Section", plural: "Sections" },
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
                  description: 'Shown as "Title | ADPUPR". Leave empty to use the page title.',
                },
              },
            }),
            MetaDescriptionField({}),
            {
              name: "ogDescription",
              type: "textarea",
              label: "Social media description",
              admin: {
                description: "Optional. If empty, the description above is used.",
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
      label: "Hide from search engines (noindex)",
      admin: { position: "sidebar" },
    },
    {
      name: "sitemap",
      type: "group",
      label: "Sitemap",
      admin: { position: "sidebar" },
      fields: [
        { name: "include", type: "checkbox", label: "Include in sitemap.xml", defaultValue: true },
        {
          name: "priority",
          type: "select",
          label: "Priority",
          defaultValue: "0.7",
          options: ["1", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"].map(
            (v) => ({ label: v, value: v }),
          ),
        },
        {
          name: "changeFrequency",
          type: "select",
          label: "Change frequency",
          defaultValue: "monthly",
          options: [
            { label: "Always", value: "always" },
            { label: "Hourly", value: "hourly" },
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
            { label: "Never", value: "never" },
          ],
        },
      ],
    },
  ],
};
