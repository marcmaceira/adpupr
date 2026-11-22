/**
 * Curated icon set. Editors pick from these names; `src/components/ui/icon.tsx` maps each
 * name to its lucide component. Add a name here and there together.
 */
export const ICON_OPTIONS = [
  { value: "arrow-down", label: "Arrow down" },
  { value: "arrow-right", label: "Arrow right" },
  { value: "arrow-up", label: "Arrow up" },
  { value: "arrow-up-right", label: "Arrow up-right (external)" },
  { value: "badge-check", label: "Verified badge" },
  { value: "book-open", label: "Open book" },
  { value: "calendar", label: "Calendar" },
  { value: "calendar-days", label: "Calendar (days)" },
  { value: "check", label: "Check mark" },
  { value: "clock", label: "Clock" },
  { value: "coffee", label: "Coffee" },
  { value: "download", label: "Download" },
  { value: "external-link", label: "External link" },
  { value: "file-chart-column", label: "Document with chart" },
  { value: "file-pen-line", label: "Document with pen" },
  { value: "file-text", label: "Document" },
  { value: "heart-handshake", label: "Handshake" },
  { value: "library", label: "Library" },
  { value: "mail", label: "Mail" },
  { value: "map-pin", label: "Location" },
  { value: "presentation", label: "Presentation" },
  { value: "search", label: "Search" },
  { value: "send", label: "Send" },
  { value: "smartphone", label: "Mobile phone" },
  { value: "store", label: "Store" },
  { value: "users", label: "People" },
  { value: "utensils", label: "Utensils" },
] as const;

export type IconName = (typeof ICON_OPTIONS)[number]["value"];
