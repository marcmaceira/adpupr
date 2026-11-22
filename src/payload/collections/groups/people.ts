import type { CollectionConfig } from "payload";
import { Committees } from "../Committees";
import { People } from "../People";

/** Collections owned by the "people" group. */
export const peopleCollections: CollectionConfig[] = [People, Committees];
