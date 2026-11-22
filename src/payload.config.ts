import path from "node:path";
import { fileURLToPath } from "node:url";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import { en } from "payload/i18n/en";
import { collections } from "./payload/collections";
import { databaseAdapter } from "./payload/db";
import { siteEditor } from "./payload/editor";
import { globals } from "./payload/globals";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/** Reads a string property from an untyped plugin document. */
function stringField(doc: unknown, key: string): string {
  const value: unknown = doc && typeof doc === "object" ? Reflect.get(doc, key) : undefined;
  return typeof value === "string" ? value : "";
}

const PAGES_MCP_INSTRUCTIONS =
  "Pages of the ADPUPR website. Find a page by its `path` field (for example `/` or `/membresia`). " +
  "Visible content is in `layout`, a list of sections (blocks). Site content is written in Spanish. " +
  'To edit: call updateDocument with `draft: true` and check the result; to publish, send a separate updateDocument with `data: { _status: "published" }`. ' +
  "Never send an update without `draft: true` to a page that has a pending draft.";

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: "users",
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · ADPUPR" },
    livePreview: {
      collections: ["pages"],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  i18n: { supportedLanguages: { en }, fallbackLanguage: "en" },
  collections,
  globals,
  editor: siteEditor,
  db: databaseAdapter(),
  defaultDepth: 2,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  storage: [
    // Opt-in only. BLOB_READ_WRITE_TOKEN alone never enables it, so local work can't write
    // to the live store. Production sets USE_VERCEL_BLOB=true; uploads go under `cms/`.
    vercelBlobStorage({
      enabled: process.env.USE_VERCEL_BLOB === "true",
      collections: {
        media: { prefix: "cms/media" },
        documents: { prefix: "cms/documents" },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  plugins: [
    seoPlugin({
      generateTitle: ({ doc }) => stringField(doc, "title"),
      generateURL: ({ doc }) => `${serverURL}${stringField(doc, "path")}`,
    }),
    mcpPlugin({
      collections: {
        users: { tools: { create: false, update: false, delete: false, duplicate: false } },
        pages: { description: PAGES_MCP_INSTRUCTIONS, tools: { delete: false } },
      },
      mcp: { serverOptions: { serverInfo: { name: "adpupr-cms", version: "1.0.0" } } },
    }),
  ],
});
