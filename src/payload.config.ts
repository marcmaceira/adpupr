import path from "node:path";
import { fileURLToPath } from "node:url";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import { es } from "payload/i18n/es";
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
  "Páginas del sitio de ADPUPR. Localiza una página por su campo `path` (por ejemplo `/` o `/membresia`). " +
  "El contenido visible está en `layout`, una lista de secciones (bloques). " +
  'Para editar: usa updateDocument con `draft: true` y revisa el resultado; para publicar, envía después un updateDocument separado con `data: { _status: "published" }`. ' +
  "Nunca envíes una actualización sin `draft: true` a una página que tiene un borrador pendiente.";

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
        { label: "Móvil", name: "mobile", width: 390, height: 844 },
        { label: "Tableta", name: "tablet", width: 768, height: 1024 },
        { label: "Escritorio", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: "es" },
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
