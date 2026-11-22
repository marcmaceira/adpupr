import type { SeedContext } from "./context";
import { writeOpts } from "./context";

/** Site-wide facts shown in more than one place. Canonical social URLs (no tracking). */
export async function seedSiteSettings(ctx: SeedContext) {
  const ogImage = await ctx.media({
    source: "public/opengraph-image.jpg",
    alt: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
  });

  await ctx.payload.updateGlobal({
    slug: "site-settings",
    data: {
      organization: {
        name: "Asociación de Administración Pública de Puerto Rico",
        shortName: "ADPUPR",
      },
      contact: {
        emails: [{ email: "info@adpupr.com" }, { email: "asociacion.adpupr@gmail.com" }],
        postal: {
          line1: "PO BOX 1269",
          city: "Trujillo Alto",
          region: "PR",
          postalCode: "00977",
          country: "US",
        },
      },
      social: {
        profiles: [
          {
            network: "facebook",
            label: "Facebook",
            handle: "ADPUPR",
            url: "https://www.facebook.com/profile.php?id=61563728602523",
            showInFooter: true,
          },
          {
            network: "instagram",
            label: "Instagram",
            handle: "@adpupr",
            url: "https://www.instagram.com/adpupr/",
            showInFooter: true,
          },
          {
            network: "linkedin",
            label: "LinkedIn",
            handle: "Asociación ADPUPR",
            url: "https://www.linkedin.com/in/asociaci%C3%B3n-de-administraci%C3%B3n-p%C3%BAblica-de-puerto-rico-adpupr-7b7290316/",
            showInFooter: true,
          },
          {
            network: "youtube",
            label: "YouTube",
            handle: "@adpupr",
            url: "https://www.youtube.com/@ADPUPR",
            showInFooter: false,
          },
        ],
      },
      payments: {
        athMovilUrl:
          "https://pagos.athmovilapp.com/qrCodePayment.html?133d0fe53fe0aee5f76f045eeebc2197e51d7aec08444832522d3dda729305c0",
      },
      seo: {
        siteName: "ADPUPR",
        defaultTitle: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
        titleSuffix: " | ADPUPR",
        description:
          "Promovemos y fortalecemos la sana administración pública en Puerto Rico. Únete a profesionales, académicos y estudiantes comprometidos con el servicio público.",
        socialDescription:
          "Promovemos y fortalecemos la sana administración pública en Puerto Rico.",
        ogImage,
        locale: "es_PR",
        skipLinkLabel: "Saltar al contenido principal",
      },
    },
    ...writeOpts,
  });
}
