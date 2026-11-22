import type { CollectionConfig } from "payload";
import { DocumentCategories } from "../DocumentCategories";
import { Documents } from "../Documents";

/** Collections owned by the "engage" group. */
export const engageCollections: CollectionConfig[] = [Documents, DocumentCategories];
