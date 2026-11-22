import type { CmsLink } from "../../payload-types";
import type { GroupSeed, SeedContext } from "../context";
import { writeOpts } from "../context";

/** Seed data owned by the "chrome" group: the header and footer globals. */

const url = (label: string, href: string): CmsLink => ({
  label,
  type: "custom",
  url: href,
  newTab: false,
});

/** Internal link to a seeded page, with an optional anchor. */
const pageLinker =
  (ctx: SeedContext) =>
  (label: string, path: string, anchor?: string): CmsLink => ({
    label,
    type: "internal",
    page: ctx.pageId(path),
    anchor: anchor ?? null,
    newTab: false,
  });

async function seedHeader(ctx: SeedContext) {
  const page = pageLinker(ctx);
  const logo = await ctx.media({ source: "public/logo-color.png", alt: "ADPUPR" });

  await ctx.payload.updateGlobal({
    slug: "header",
    data: {
      logo,
      homeAriaLabel: "ADPUPR - Inicio",
      // Every row sends `children` (empty for links): see the array() helper, payload#19798.
      navItems: [
        { type: "link", link: page("Inicio", "/"), label: null, children: [] },
        {
          type: "dropdown",
          label: "Nosotros",
          children: [
            { link: page("Quiénes somos", "/nosotros/quienes-somos") },
            { link: page("Estructura organizacional", "/nosotros/estructura-organizacional") },
            { link: page("Comités", "/nosotros/estructura-organizacional", "comites") },
            // Kept as it is today: there is no /nosotros page and no #colaboradores anchor.
            { link: url("Colaboradores", "/nosotros#colaboradores") },
            { link: page("Historia de Fundación", "/nosotros/historia-fundacion") },
          ],
        },
        { type: "link", link: page("Membresía", "/membresia"), label: null, children: [] },
        { type: "link", link: page("Recursos", "/recursos"), label: null, children: [] },
        {
          type: "link",
          link: page("Conferencia 2026", "/conferencia"),
          label: null,
          children: [],
        },
        { type: "link", link: page("Contáctanos", "/contactanos"), label: null, children: [] },
      ],
      cta: page("Hacerme miembro", "/membresia"),
      a11y: {
        navLabel: "Principal",
        mobileNavLabel: "Menú móvil",
        openMenuLabel: "Abrir menú",
        closeMenuLabel: "Cerrar menú",
      },
    },
    ...writeOpts,
  });

  // Guard against payload#19798: the five Nosotros links must stay under row 2.
  const saved = await ctx.payload.findGlobal({ slug: "header", depth: 0, ...writeOpts });
  const counts = (saved.navItems ?? []).map((item) => item.children?.length ?? 0);
  if (counts.join(",") !== "0,5,0,0,0,0") {
    throw new Error(`Header navigation saved incorrectly (children per item: ${counts.join(",")})`);
  }
}

async function seedFooter(ctx: SeedContext) {
  const page = pageLinker(ctx);
  const logo = await ctx.media({
    source: "public/logo-white-tagline.png",
    alt: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
  });

  await ctx.payload.updateGlobal({
    slug: "footer",
    data: {
      logo,
      blurb:
        "Asociación de Administración Pública de Puerto Rico — comprometida con la sana administración pública, la educación cívica y la investigación aplicada al servicio público.",
      columns: [
        {
          heading: "Asociación",
          links: [
            { link: page("Nosotros", "/nosotros/quienes-somos") },
            { link: page("Misión y Visión", "/nosotros/quienes-somos") },
            { link: page("Junta de Directores", "/nosotros/estructura-organizacional") },
            {
              link: page("Comités de Trabajo", "/nosotros/estructura-organizacional", "comites"),
            },
          ],
        },
        {
          heading: "Recursos",
          links: [
            { link: page("Publicaciones", "/recursos", "publicaciones") },
            { link: page("Biblioteca", "/recursos", "biblioteca") },
            { link: page("Membresía", "/membresia") },
          ],
        },
        {
          heading: "Comunidad",
          links: [
            { link: page("Hacerme miembro", "/membresia") },
            { link: page("Contáctanos", "/contactanos") },
          ],
        },
      ],
      addressLabel: "Dirección",
      emailLabel: "Correo electrónico",
      copyright: "© {year} ADPUPR · Todos los derechos reservados",
      location: "San Juan, Puerto Rico",
    },
    ...writeOpts,
  });

  const saved = await ctx.payload.findGlobal({ slug: "footer", depth: 0, ...writeOpts });
  const counts = (saved.columns ?? []).map((column) => column.links?.length ?? 0);
  if (counts.join(",") !== "4,3,2") {
    throw new Error(`Footer columns saved incorrectly (links per column: ${counts.join(",")})`);
  }
}

export const chromeSeed: GroupSeed = {
  globals: async (ctx) => {
    await seedHeader(ctx);
    await seedFooter(ctx);
  },
  fixtures: {},
  guide: async () => [],
};
