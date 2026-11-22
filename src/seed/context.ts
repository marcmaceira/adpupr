import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CollectionSlug, Payload, RequiredDataFromCollectionSlug, Where } from "payload";
import type { BlockOf, BlockSlug } from "../blocks/types";

export const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, ".seed-cache");

export interface MediaSpec {
  /** Repo-relative path (e.g. "public/logo-color.png") or an https URL to download. */
  readonly source: string;
  readonly alt: string;
  /** Stored filename; defaults to the source's basename. Used as the idempotency key. */
  readonly filename?: string;
}

export interface SeedContext {
  readonly payload: Payload;
  log(message: string): void;
  /** Uploads (or reuses) an image in Media and returns its id. */
  media(spec: MediaSpec): Promise<number>;
  /** Downloads a remote file once into .seed-cache and returns its local path. */
  cacheRemote(url: string, filename: string): Promise<string>;
  /** Id of a seeded page by path. Every page is stubbed before any content is written. */
  pageId(pagePath: string): number;
  /** Creates or updates the single document matching `where`. Returns its id. */
  upsert<S extends CollectionSlug>(
    collection: S,
    where: Where,
    data: RequiredDataFromCollectionSlug<S>,
    opts?: { filePath?: string },
  ): Promise<number>;
}

/** Common options for every seed write: bypass access control, skip revalidation. */
export const writeOpts = {
  overrideAccess: true,
  context: { disableRevalidate: true },
} as const;

async function cacheRemote(url: string, filename: string) {
  await mkdir(CACHE_DIR, { recursive: true });
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 10);
  const target = path.join(CACHE_DIR, `${hash}-${filename}`);
  if (!existsSync(target)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`);
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
  }
  return target;
}

export async function createContext(payload: Payload, pageIds: Map<string, number>) {
  const mediaCache = new Map<string, number>();

  const upsert: SeedContext["upsert"] = async (collection, where, data, opts = {}) => {
    const existing = await payload.find({
      collection,
      where,
      limit: 1,
      depth: 0,
      pagination: false,
      ...writeOpts,
    });
    const found = existing.docs[0];
    if (found) {
      // A full document is a valid partial update, but TypeScript cannot relate the two
      // generic mapped types for an arbitrary collection slug.
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- see comment above.
      const patch = data as never;
      const updated = await payload.update({
        collection,
        id: found.id,
        data: patch,
        ...(opts.filePath ? { filePath: opts.filePath, overwriteExistingFiles: true } : {}),
        ...writeOpts,
      });
      return Number(updated.id);
    }
    const created = await payload.create({
      collection,
      data,
      ...(opts.filePath ? { filePath: opts.filePath } : {}),
      ...writeOpts,
    });
    return Number(created.id);
  };

  const ctx: SeedContext = {
    payload,
    log: (message) => payload.logger.info(`[seed] ${message}`),
    cacheRemote,
    upsert,
    pageId(pagePath) {
      const id = pageIds.get(pagePath);
      if (!id) throw new Error(`No seeded page for path ${pagePath}`);
      return id;
    },
    async media(spec) {
      const filename = spec.filename ?? path.basename(new URL(spec.source, "file:///").pathname);
      const cached = mediaCache.get(filename);
      if (cached) return cached;

      const existing = await payload.find({
        collection: "media",
        where: { filename: { equals: filename } },
        limit: 1,
        depth: 0,
        ...writeOpts,
      });
      let id = existing.docs[0]?.id;
      if (id) {
        await payload.update({ collection: "media", id, data: { alt: spec.alt }, ...writeOpts });
      } else {
        const filePath = /^https?:\/\//.test(spec.source)
          ? await cacheRemote(spec.source, filename)
          : path.join(ROOT, spec.source);
        const created = await payload.create({
          collection: "media",
          data: { alt: spec.alt },
          filePath,
          ...writeOpts,
        });
        id = created.id;
      }
      mediaCache.set(filename, id);
      return id;
    },
  };
  return ctx;
}

/**
 * Runs async steps one after another. Seed writes are ordered on purpose (references,
 * SQLite's single writer), so this replaces `await` inside loops.
 */
export function inSequence<T>(items: readonly T[], step: (item: T) => Promise<unknown>) {
  return items.reduce<Promise<unknown>>(
    (previous, item) => previous.then(() => step(item)),
    Promise.resolve(),
  );
}

/* ───────────── Group contracts ───────────── */

/** Block data as it is written to a page layout (no generated ids). */
export type BlockInput<S extends BlockSlug> = Omit<BlockOf<S>, "id"> & { readonly id?: never };

/** Produces one block instance. Async so it can upload media or look up records. */
export type Fixture = (ctx: SeedContext) => Promise<BlockInputAny> | BlockInputAny;
export type BlockInputAny = { [S in BlockSlug]: BlockInput<S> }[BlockSlug];

/**
 * What each worker group contributes to the seed.
 * - `collections`: seeds the group's collections (runs before pages, in group order).
 * - `globals`: seeds the group's globals (runs after collections).
 * - `fixtures`: block instances by key, composed into pages by src/seed/pages.ts.
 * - `guide`: block instances covering every block in every variant, for the guide page.
 */
export interface GroupSeed {
  readonly collections?: (ctx: SeedContext) => Promise<void>;
  readonly globals?: (ctx: SeedContext) => Promise<void>;
  readonly fixtures: Readonly<Record<string, Fixture>>;
  readonly guide: (ctx: SeedContext) => Promise<BlockInputAny[]>;
}
