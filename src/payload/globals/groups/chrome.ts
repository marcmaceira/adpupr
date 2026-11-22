import type { GlobalConfig } from "payload";
import { Footer } from "../Footer";
import { Header } from "../Header";

/** Globals owned by the "chrome" group (header, footer). */
export const chromeGlobals: GlobalConfig[] = [Header, Footer];
