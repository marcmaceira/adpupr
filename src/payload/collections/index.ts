import type { CollectionConfig } from "payload";
import { engageCollections } from "./groups/engage";
import { peopleCollections } from "./groups/people";
import { Media } from "./Media";
import { Pages } from "./Pages";
import { Users } from "./Users";

export const collections: CollectionConfig[] = [
  Pages,
  ...peopleCollections,
  ...engageCollections,
  Media,
  Users,
];
