import type { Metadata } from "next"
import { Be_Vietnam_Pro, Open_Sans } from "next/font/google"
import { siteUrl } from "@/lib/site"
import "./globals.css"

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
    template: "%s | ADPUPR",
  },
  description:
    "Promovemos y fortalecemos la sana administración pública en Puerto Rico. Únete a profesionales, académicos y estudiantes comprometidos con el servicio público.",
  openGraph: {
    type: "website",
    locale: "es_PR",
    url: siteUrl,
    siteName: "ADPUPR",
    title: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
    description:
      "Promovemos y fortalecemos la sana administración pública en Puerto Rico. Únete a profesionales, académicos y estudiantes comprometidos con el servicio público.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADPUPR — Asociación de Administración Pública de Puerto Rico",
    description:
      "Promovemos y fortalecemos la sana administración pública en Puerto Rico.",
    images: ["/opengraph-image.jpg"],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Asociación de Administración Pública de Puerto Rico",
  alternateName: "ADPUPR",
  url: siteUrl,
  logo: `${siteUrl}/logo-color.png`,
  sameAs: [
    "https://www.facebook.com/profile.php?id=61563728602523",
    "https://www.instagram.com/adpupr/",
    "https://www.linkedin.com/in/asociaci%C3%B3n-de-administraci%C3%B3n-p%C3%BAblica-de-puerto-rico-adpupr-7b7290316/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@adpupr.com",
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "PO BOX 1269",
    addressLocality: "Trujillo Alto",
    addressRegion: "PR",
    postalCode: "00977",
    addressCountry: "US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${beVietnamPro.variable} ${openSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  )
}
