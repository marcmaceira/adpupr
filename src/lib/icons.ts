/**
 * Curated icon set. Editors pick from these names; `src/components/ui/icon.tsx` maps each
 * name to its lucide component. Add a name here and there together.
 */
export const ICON_OPTIONS = [
  { value: "arrow-down", label: "Flecha abajo" },
  { value: "arrow-right", label: "Flecha derecha" },
  { value: "arrow-up", label: "Flecha arriba" },
  { value: "arrow-up-right", label: "Flecha diagonal (externo)" },
  { value: "badge-check", label: "Insignia verificada" },
  { value: "book-open", label: "Libro abierto" },
  { value: "calendar", label: "Calendario" },
  { value: "calendar-days", label: "Calendario (días)" },
  { value: "check", label: "Marca de verificación" },
  { value: "clock", label: "Reloj" },
  { value: "coffee", label: "Café" },
  { value: "download", label: "Descargar" },
  { value: "external-link", label: "Enlace externo" },
  { value: "file-chart-column", label: "Documento con gráfica" },
  { value: "file-pen-line", label: "Documento con lápiz" },
  { value: "file-text", label: "Documento" },
  { value: "heart-handshake", label: "Apretón de manos" },
  { value: "library", label: "Biblioteca" },
  { value: "mail", label: "Correo" },
  { value: "map-pin", label: "Ubicación" },
  { value: "presentation", label: "Presentación" },
  { value: "search", label: "Buscar" },
  { value: "send", label: "Enviar" },
  { value: "smartphone", label: "Teléfono móvil" },
  { value: "store", label: "Tienda" },
  { value: "users", label: "Personas" },
  { value: "utensils", label: "Cubiertos" },
] as const;

export type IconName = (typeof ICON_OPTIONS)[number]["value"];
