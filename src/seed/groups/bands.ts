import type { BlockInput, GroupSeed } from "../context";

const homeHero = (): BlockInput<"hero"> => ({
  blockType: "hero",
  variant: "home",
  eyebrow: "Asociación de Administración Pública de Puerto Rico",
  heading: "De la opinión\na la acción.",
  headingHighlight: "acción",
  lede: "ADPUPR convoca a profesionales, académicos y estudiantes en torno al estudio, la práctica y la mejora continua de la administración pública en Puerto Rico.",
  actions: [],
});

/** Seed data owned by the "bands" group: hero, ctaBand, stats. */
export const bandsSeed: GroupSeed = {
  fixtures: {
    "hero.home": (ctx) => ({
      ...homeHero(),
      actions: [
        {
          style: "primary",
          link: { label: "Hacerme miembro", type: "internal", page: ctx.pageId("/membresia") },
        },
        {
          style: "secondary",
          link: {
            label: "Conocer la Asociación",
            type: "internal",
            page: ctx.pageId("/nosotros/quienes-somos"),
          },
        },
      ],
    }),
  },
  guide: async () => [homeHero()],
};
