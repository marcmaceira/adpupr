import "server-only";
import { cache } from "react";
import type { Committee, Media, Person } from "@/payload-types";
import { getPayloadClient } from "@/lib/cms";

/** Replaces the `{nombre}` token in an editor-written label. Empty template → empty string. */
export function fillName(template: string | null | undefined, name: string): string {
  return (template ?? "").replaceAll("{nombre}", name);
}

/** The id of a relationship value that may or may not be populated. */
export function relationId(value: number | { readonly id: number } | null | undefined) {
  if (value === null || value === undefined) return null;
  return typeof value === "number" ? value : value.id;
}

/** A populated media document, or null. */
export function populatedMedia(value: number | Media | null | undefined): Media | null {
  return value && typeof value === "object" ? value : null;
}

/** People by id, with portraits populated. Public read (published content only). */
export const getPeopleByIds = cache(async (ids: readonly number[]) => {
  const unique = [...new Set(ids)];
  if (unique.length === 0) return new Map<number, Person>();
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "people",
    where: { id: { in: unique } },
    overrideAccess: false,
    depth: 1,
    limit: unique.length,
    pagination: false,
  });
  return new Map(docs.map((doc) => [doc.id, doc]));
});

/**
 * Committees with coordinators and editorial board members (and their portraits)
 * populated. `ids` keeps that order; without ids, every committee in collection order.
 */
export const getCommittees = cache(async (ids: readonly number[] | null): Promise<Committee[]> => {
  if (ids?.length === 0) return [];
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "committees",
    where: ids ? { id: { in: [...ids] } } : undefined,
    sort: ["order", "id"],
    overrideAccess: false,
    depth: 2,
    pagination: false,
  });
  if (!ids) return docs;
  const byId = new Map(docs.map((doc) => [doc.id, doc]));
  return ids.flatMap((id) => byId.get(id) ?? []);
});
