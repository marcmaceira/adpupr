import { Buffer } from "node:buffer";
import type { Payload } from "payload";
import { BLOB_STORAGE_HOSTNAME } from "@/lib/constants";

export const importContext = { disableRevalidate: true };

/** Match Payload's CLI exit after success, without truncating a piped inventory. */
export async function finishScript() {
  await new Promise<void>((resolve, reject) => {
    process.stdout.write("", (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
  // Payload 3's Postgres adapter reserves a reconnect client and does not release
  // it on destroy. Exit only after all awaited operations and cleanup succeeded.
  process.exit(0);
}

/** CLI tools refuse non-local database or Blob writes unless explicitly authorized. */
export function assertWriteTarget() {
  let database: URL;
  try {
    database = new URL(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "");
  } catch (error) {
    throw new Error("Set DATABASE_URL before seeding or importing.", { cause: error });
  }
  const local = new Set(["localhost", "127.0.0.1", "[::1]"]).has(database.hostname);
  if (
    (!local || process.env.BLOB_READ_WRITE_TOKEN) &&
    process.env.CMS_ALLOW_REMOTE_WRITES !== "true"
  ) {
    throw new Error(
      "Remote database/Blob writes require CMS_ALLOW_REMOTE_WRITES=true. Verify the target database and Blob store first.",
    );
  }
}

export async function downloadFile(source: string) {
  let url: URL;
  try {
    url = new URL(source);
  } catch (error) {
    throw new Error("Invalid legacy file URL.", { cause: error });
  }
  if (url.protocol !== "https:" || url.hostname !== BLOB_STORAGE_HOSTNAME) {
    throw new Error("Legacy imports only accept files from the original ADPUPR Blob store.");
  }
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(60_000) });
  if (!response.ok || !response.body)
    throw new Error(`Legacy file download failed (${response.status}): ${url.pathname}`);
  const maxSize = 50 * 1024 * 1024;
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    // A stream reader is sequential; parallel reads would bypass the running size limit.
    // oxlint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > maxSize) {
      // Stop receiving bytes before rejecting an oversized file.
      // oxlint-disable-next-line no-await-in-loop
      await reader.cancel();
      throw new Error("Legacy file exceeds the 50 MB import limit.");
    }
    chunks.push(value);
  }
  const name = decodeURIComponent(url.pathname.split("/").at(-1) ?? "file").normalize("NFC");
  const mimetype =
    response.headers.get("content-type")?.split(";")[0] ?? "application/octet-stream";
  const lastModified = response.headers.get("last-modified");
  const publishedAt =
    lastModified && !Number.isNaN(Date.parse(lastModified))
      ? new Date(lastModified).toISOString()
      : undefined;
  return { file: { data: Buffer.concat(chunks), name, mimetype, size }, publishedAt };
}

export async function importPhoto(payload: Payload, sourceUrl: string, alt: string) {
  const { docs } = await payload.find({
    collection: "media",
    where: { sourceUrl: { equals: sourceUrl } },
    limit: 1,
    depth: 0,
  });
  if (docs[0]) return docs[0].id;
  const { file } = await downloadFile(sourceUrl);
  const media = await payload.create({
    collection: "media",
    data: { alt, sourceUrl },
    file,
    context: importContext,
  });
  payload.logger.info(`Imported portrait: ${alt}`);
  return media.id;
}
