import config from "@payload-config";
import { list } from "@vercel/blob";
import { getPayload } from "payload";
import snapshot from "@/seed/resources.json";
import { assertWriteTarget, downloadFile, finishScript, importContext } from "./helpers";

// Standalone CLI processes must not keep Next.js development HMR sockets open.
process.env.DISABLE_PAYLOAD_HMR = "true";

// Run directly with tsx: Payload's `run` command consumes named CLI flags.
// Reject typos before any listing, database connection or file import.
const flags = new Set(process.argv.slice(2));
const unsupported = [...flags].find((flag) => !["--dry-run", "--from-blob"].includes(flag));
if (unsupported) throw new Error(`Unknown resource import flag: ${unsupported}`);

interface LegacyDocument {
  readonly title: string;
  readonly category: string;
  readonly url: string;
  readonly publishedAt?: string;
}

function legacyTitle(pathname: string) {
  return decodeURIComponent(pathname.split("/").at(-1) ?? "")
    .replace(/\.[^./]+$/, "")
    .replace(/-[a-z0-9]{30}$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .normalize("NFC");
}

async function sourceDocuments(): Promise<LegacyDocument[]> {
  // The checked-in public snapshot allows local imports without production credentials.
  // Use --from-blob before cutover to include files uploaded since the snapshot.
  if (!flags.has("--from-blob")) return snapshot.documents;
  const documents: LegacyDocument[] = [];
  let cursor: string | undefined;
  do {
    // Blob listing is cursor-paginated; the next cursor only exists after this request.
    // oxlint-disable-next-line no-await-in-loop
    const result = await list({ prefix: "recursos/", limit: 1000, cursor });
    for (const file of result.blobs) {
      const category = file.pathname.split("/")[1];
      if (
        !snapshot.categories.some(({ slug }) => slug === category) ||
        /\.ds_store$/i.test(file.pathname)
      )
        continue;
      documents.push({
        title: legacyTitle(file.pathname),
        category,
        url: file.url,
        publishedAt: file.uploadedAt.toISOString(),
      });
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);
  return documents;
}

const documents = await sourceDocuments();
if (flags.has("--dry-run")) {
  console.log(JSON.stringify(documents, null, 2));
} else {
  assertWriteTarget();
  const payload = await getPayload({ config });
  try {
    const categories = new Map<string, number>();
    await snapshot.categories.reduce(async (previous, category) => {
      await previous;
      const { docs } = await payload.find({
        collection: "document-categories",
        where: { sourceSlug: { equals: category.slug } },
        limit: 1,
      });
      const doc =
        docs[0] ??
        (await payload.create({
          collection: "document-categories",
          data: { title: category.title, sourceSlug: category.slug },
          context: importContext,
        }));
      categories.set(category.slug, doc.id);
    }, Promise.resolve());
    await documents.reduce(async (previous, document) => {
      await previous;
      const { docs } = await payload.find({
        collection: "documents",
        where: { sourceUrl: { equals: document.url } },
        limit: 1,
      });
      if (docs.length) {
        payload.logger.info(`Skipped existing resource: ${document.title}`);
        return;
      }
      const category = categories.get(document.category);
      if (!category) throw new Error(`Unknown resource category: ${document.category}`);
      const { file, publishedAt } = await downloadFile(document.url);
      await payload.create({
        collection: "documents",
        data: {
          title: document.title,
          category,
          sourceUrl: document.url,
          publishedAt: document.publishedAt ?? publishedAt ?? new Date().toISOString(),
        },
        file,
        context: importContext,
      });
      payload.logger.info(`Imported resource: ${document.title}`);
    }, Promise.resolve());
    payload.logger.info(
      `Import complete: ${documents.length} legacy resources checked. Originals were not deleted.`,
    );
  } finally {
    await payload.destroy();
  }
}
await finishScript();
