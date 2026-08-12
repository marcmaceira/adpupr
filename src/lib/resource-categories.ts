export const RESOURCE_CATEGORIES = [
  { slug: "boletines", label: "Boletines" },
  {
    slug: "articulos-de-opinion-edicion-especial",
    label: "Art\u00EDculos de opini\u00F3n especial",
  },
  { slug: "comunicados", label: "Comunicados" },
  { slug: "convocatorias", label: "Convocatorias" },
] as const

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number]["label"]

export interface Resource {
  readonly title: string
  readonly category: ResourceCategory
  readonly href: string
}
