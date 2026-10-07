import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from "payload";

/**
 * The site is small and pages pull from shared data (menus, committees,
 * documents), so any published change refreshes every page on next visit.
 */
function revalidateSite(req: PayloadRequest) {
  // Seed and import scripts run outside Next.js and opt out explicitly.
  if (req.context.disableRevalidate) return;

  try {
    revalidatePath("/", "layout");
  } catch (error) {
    req.payload.logger.warn(
      { err: error },
      "Unable to revalidate the site after a content change.",
    );
  }
}

// Payload's built-in draft status field on versioned collections.
const STATUS_FIELD = "_status";

type PublishStatus = "draft" | "published";

function getStatus(doc: unknown): PublishStatus | undefined {
  if (!doc || typeof doc !== "object" || !(STATUS_FIELD in doc)) return undefined;

  const status = doc[STATUS_FIELD];
  return status === "draft" || status === "published" ? status : undefined;
}

function isDraftOnlyChange(doc: unknown, previousDoc: unknown) {
  return getStatus(doc) === "draft" && getStatus(previousDoc) !== "published";
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (!isDraftOnlyChange(doc, previousDoc)) revalidateSite(req);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req);
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req);
  return doc;
};
