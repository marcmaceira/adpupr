"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Membresía", href: "/membresia" },
  { label: "Comunicaciones", href: "/comunicaciones" },
] as const

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleEscape)
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((p) => !p), [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-8 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="ADPUPR - Inicio"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-color.png" alt="ADPUPR" width={142} height={40} className="h-10 w-auto" />
        </Link>

        <nav
          className="hidden flex-1 items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="relative rounded-sm px-3.5 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50"
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 bottom-1 block h-[2px] rounded-sm bg-mustard transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/membresia"
            className="inline-flex items-center rounded-sm bg-primary px-4 py-2 font-heading text-[13px] font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Hacerme miembro
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-sm p-2 text-primary md:hidden"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" strokeWidth={1.75} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          className="border-t border-border bg-surface md:hidden"
          aria-label="Menú móvil"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-sm px-3 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/membresia"
              onClick={closeMobileMenu}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-3 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Hacerme miembro
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
