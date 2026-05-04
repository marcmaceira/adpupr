import type { Metadata } from "next"
import { Be_Vietnam_Pro, Open_Sans } from "next/font/google"
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
  title: "ADPUPR - Asociación de Administración Pública de Puerto Rico",
  description:
    "Promoviendo y fortaleciendo la sana administración pública en Puerto Rico",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${beVietnamPro.variable} ${openSans.variable} antialiased`}>
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
