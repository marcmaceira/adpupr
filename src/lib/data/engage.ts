import "server-only";
import { cache } from "react";
import type { Document, SiteSetting } from "@/payload-types";
import { getPayloadClient } from "@/lib/cms";

/** A category filter of the document library. */
export interface LibraryCategory {
  readonly id: number;
  readonly label: string;
}

/** One downloadable row of the document library. `href` is the raw file URL. */
export interface LibraryDocument {
  readonly id: number;
  readonly title: string;
  readonly categoryId: number | null;
  readonly url: string;
}

/** Newest first; equal dates by `sortOrder` (unset last), then by creation. */
type Sortable = Pick<Document, "id" | "publishedAt" | "sortOrder">;

function compareDocuments(a: Sortable, b: Sortable): number {
  const byDate = Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  if (byDate !== 0) return byDate;
  const byOrder =
    (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER);
  return byOrder !== 0 ? byOrder : a.id - b.id;
}

function categoryId(category: Document["category"]): number | null {
  if (typeof category === "number") return category;
  return category && typeof category === "object" ? category.id : null;
}

/** Categories (in `order`) and documents (in display order) for the resource library. */
export const getDocumentLibrary = cache(async () => {
  const payload = await getPayloadClient();
  const [categories, documents] = await Promise.all([
    payload.find({
      collection: "document-categories",
      sort: "order",
      overrideAccess: false,
      depth: 0,
      pagination: false,
      select: { label: true, order: true },
    }),
    payload.find({
      collection: "documents",
      overrideAccess: false,
      depth: 0,
      pagination: false,
      select: {
        title: true,
        category: true,
        publishedAt: true,
        sortOrder: true,
        filename: true,
        url: true,
      },
    }),
  ]);

  return {
    categories: categories.docs.map((category): LibraryCategory => ({
      id: category.id,
      label: category.label,
    })),
    documents: documents.docs
      .toSorted(compareDocuments)
      .filter((doc) => Boolean(doc.url))
      .map((doc): LibraryDocument => ({
        id: doc.id,
        title: doc.title,
        categoryId: categoryId(doc.category),
        url: doc.url ?? "",
      })),
  };
});

/** The postal address as display lines: "PO BOX 1269" / "Trujillo Alto, PR 00977". */
export function postalLines(settings: SiteSetting): string[] {
  const { line1, city, region, postalCode } = settings.contact.postal;
  return [line1, `${city}, ${region} ${postalCode}`.trim()].filter(Boolean);
}

/** Every email in site settings, in order. The first one is the main address. */
export function contactEmails(settings: SiteSetting): string[] {
  return (settings.contact.emails ?? []).map((row) => row.email).filter(Boolean);
}
