import type { GlobalConfig } from "payload";
import { chromeGlobals } from "./groups/chrome";
import { SiteSettings } from "./SiteSettings";

export const globals: GlobalConfig[] = [...chromeGlobals, SiteSettings];
