import type { Metadata } from "next";
import { Be_Vietnam_Pro, Open_Sans } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getFooter, getHeader, getSiteSettings, isAuthenticatedPreview } from "@/lib/cms";
import { mediaUrl } from "@/lib/media";
import { siteUrl } from "@/lib/site";
import { exitPreview } from "./next/exit-preview/action";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
});
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

function metadataBase() {
  try {
    return new URL(siteUrl);
  } catch (error) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL.", { cause: error });
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const image = mediaUrl(settings.shareImage) || "/opengraph-image.jpg";
  return {
    metadataBase: metadataBase(),
    title: { default: settings.siteTitle || "ADPUPR", template: "%s | ADPUPR" },
    description: settings.siteDescription,
    openGraph: {
      type: "website",
      locale: "es_PR",
      url: siteUrl,
      siteName: "ADPUPR",
      title: settings.siteTitle,
      description: settings.siteDescription,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteTitle,
      description: settings.siteDescription,
      images: [image],
    },
  };
}

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const [header, footer, settings, preview] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteSettings(),
    isAuthenticatedPreview(),
  ]);
  const address = settings.postalAddress;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.organizationName,
    alternateName: "ADPUPR",
    url: siteUrl,
    logo: `${siteUrl}/logo-color.png`,
    sameAs: settings.social?.map(({ url }) => url),
    contactPoint: {
      "@type": "ContactPoint",
      email: settings.emails?.[0]?.email,
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: address?.street,
      addressLocality: address?.city,
      addressRegion: address?.region,
      postalCode: address?.postalCode,
      addressCountry: "US",
    },
  };
  return (
    <html lang="es">
      <body className={`${beVietnamPro.variable} ${openSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-text-on-dark"
        >
          Saltar al contenido principal
        </a>
        {preview ? (
          <aside
            aria-label="Vista previa"
            className="flex items-center justify-between gap-4 bg-mustard px-6 py-2 font-body text-sm text-primary"
          >
            <span>Vista previa de borrador &mdash; no publicada.</span>
            <form action={exitPreview}>
              <button type="submit" className="cursor-pointer underline">
                Salir de vista previa
              </button>
            </form>
          </aside>
        ) : null}
        <Header data={header} />
        {children}
        <Footer data={footer} settings={settings} />
      </body>
    </html>
  );
}
