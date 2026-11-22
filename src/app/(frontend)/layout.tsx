import type { Metadata } from "next";
import { Be_Vietnam_Pro, Open_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { mediaSrc } from "@/components/ui/media-image";
import { getSiteSettings } from "@/lib/cms";
import { contactEmails, footerSocials, getChrome } from "@/lib/data/chrome";
import { buildSiteMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Media, SiteSetting } from "@/payload-types";
import "./globals.css";

// The site frame reads Payload on every request, so header and footer edits show at once.
export const dynamic = "force-dynamic";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata(await getSiteSettings());
}

function absoluteUrl(url: string): string {
  return new URL(url, siteUrl).toString();
}

function organizationSchema(settings: SiteSetting, logo: Media | null) {
  const postal = settings.contact?.postal;
  const email = contactEmails(settings)[0];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.organization?.name,
    alternateName: settings.organization?.shortName,
    url: siteUrl,
    logo: logo?.url ? absoluteUrl(mediaSrc(logo.url)) : undefined,
    sameAs: footerSocials(settings).map((social) => social.url),
    contactPoint: email
      ? { "@type": "ContactPoint", email, contactType: "customer service" }
      : undefined,
    address: postal
      ? {
          "@type": "PostalAddress",
          streetAddress: postal.line1,
          addressLocality: postal.city,
          addressRegion: postal.region,
          postalCode: postal.postalCode,
          addressCountry: postal.country,
        }
      : undefined,
  };
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { header, footer, settings } = await getChrome();

  return (
    <html lang="es">
      <body className={`${beVietnamPro.variable} ${openSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape "<" so editor text can never close the script element.
            __html: JSON.stringify(organizationSchema(settings, header.logo)).replaceAll(
              "<",
              "\\u003c",
            ),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          {settings.seo?.skipLinkLabel}
        </a>
        <SiteHeader {...header} />
        {children}
        <SiteFooter {...footer} />
      </body>
    </html>
  );
}
