/**
 * Icons editors can choose in the CMS. Keys must exist in `src/components/icon.tsx`.
 * Kept free of React imports so the Payload config can use it.
 */
export const ICON_OPTIONS = [
  { value: "calendar", label: "Calendario" },
  { value: "clock", label: "Reloj" },
  { value: "map-pin", label: "Ubicaci\u00F3n" },
  { value: "users", label: "Personas" },
  { value: "badge-check", label: "Certificado" },
  { value: "presentation", label: "Presentaci\u00F3n" },
  { value: "file-text", label: "Documento" },
  { value: "file-chart", label: "Informe" },
  { value: "file-pen", label: "Escribir art\u00EDculo" },
  { value: "book-open", label: "Libro" },
  { value: "library", label: "Biblioteca" },
  { value: "utensils", label: "Comida" },
  { value: "coffee", label: "Caf\u00E9" },
  { value: "store", label: "Exhibici\u00F3n" },
  { value: "heart-handshake", label: "Donativo / alianza" },
  { value: "handshake", label: "Acuerdo" },
  { value: "send", label: "Enviar" },
  { value: "mail", label: "Correo" },
  { value: "smartphone", label: "Tel\u00E9fono m\u00F3vil" },
  { value: "megaphone", label: "Anuncio" },
  { value: "graduation-cap", label: "Educaci\u00F3n" },
  { value: "landmark", label: "Gobierno" },
  { value: "lightbulb", label: "Idea" },
  { value: "scale", label: "\u00C9tica / justicia" },
  { value: "globe", label: "Mundo" },
  { value: "star", label: "Destacado" },
] as const;

export type IconName = (typeof ICON_OPTIONS)[number]["value"];
