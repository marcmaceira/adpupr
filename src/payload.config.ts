import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Committees } from "./collections/Committees";
import { DocumentCategories } from "./collections/DocumentCategories";
import { Documents } from "./collections/Documents";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { SiteSettings } from "./globals/SiteSettings";
import { serverUrl } from "./lib/site";

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("PAYLOAD_SECRET must be set in production.");
}

if (process.env.VERCEL === "1" && !process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error(
    "BLOB_READ_WRITE_TOKEN is required on Vercel. Local filesystem uploads are not durable there.",
  );
}

export default buildConfig({
  // In local dev, relative URLs also avoid CSRF rejecting plain-HTTP LAN
  // navigations without browser Fetch Metadata headers. Production is origin-bound.
  serverURL: process.env.NODE_ENV === "production" ? serverUrl : "",
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · ADPUPR",
      description: "Panel de contenido de la ADPUPR",
    },
    dateFormat: "d 'de' MMMM 'de' yyyy, h:mm a",
    livePreview: {
      breakpoints: [
        { label: "M\u00F3vil", name: "mobile", width: 390, height: 844 },
        { label: "Tableta", name: "tablet", width: 768, height: 1024 },
        { label: "Escritorio", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: "es",
  },
  collections: [Pages, Committees, Documents, DocumentCategories, Media, Users],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlockquoteFeature(),
      // Custom URLs only: internal page links would break when a page's route changes.
      LinkFeature({ enabledCollections: [] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  db: postgresAdapter({
    // Schema push is a local-dev convenience. Use migrations for every deployed database.
    push: process.env.PAYLOAD_DB_PUSH !== "false",
    pool: {
      connectionString: process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "",
    },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Keep the schema identical with and without Blob so migrations match production.
      alwaysInsertFields: true,
      // Upload straight from the browser to bypass Vercel's 4.5 MB request limit.
      clientUploads: true,
      collections: {
        media: { prefix: "cms/media", disablePayloadAccessControl: true },
        documents: { prefix: "cms/documents", disablePayloadAccessControl: true },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  graphQL: { disable: true },
  telemetry: false,
});
