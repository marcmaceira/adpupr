import type { Metadata } from "next"
import { Be_Vietnam_Pro, DM_Serif_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
})

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
})

export const metadata: Metadata = {
  title: "ADPUPR - Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico",
  description:
    "Promoviendo y fortaleciendo la sana administraci\u00F3n p\u00FAblica en Puerto Rico",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${beVietnamPro.variable} ${dmSerif.variable} ${sourceSans.variable} antialiased`}
      >
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
