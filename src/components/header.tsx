"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Membres\u00EDa", href: "/membresia" },
  { label: "Comunicaciones", href: "/comunicaciones" },
] as const

const NOSOTROS_LINKS = [
  { label: "Qui\u00E9nes somos", href: "/nosotros/quienes-somos" },
  { label: "Estructura organizacional", href: "/nosotros#directores" },
  { label: "Comit\u00E9s", href: "/nosotros#comites" },
  { label: "Colaboradores", href: "/nosotros#colaboradores" },
  { label: "Historia de Fundaci\u00F3n", href: "/nosotros#historia-fundacion" },
] as const

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [nosotrosMenuOpen, setNosotrosMenuOpen] = useState(false)

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

  useEffect(() => {
    if (!nosotrosMenuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNosotrosMenuOpen(false)
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [nosotrosMenuOpen])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    setNosotrosMenuOpen(false)
  }, [])
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
          {NAV_LINKS.map((link, index) => {
            const active = isActive(link.href)
            return (
              <div key={link.href} className="contents">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="relative rounded-sm px-3.5 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 bottom-1 block h-[2px] rounded-sm bg-mustard transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>

                {index === 0 ? (
                  <div
                    className="relative"
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setNosotrosMenuOpen(false)
                      }
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setNosotrosMenuOpen((open) => !open)}
                      aria-expanded={nosotrosMenuOpen}
                      aria-controls="nosotros-desktop-menu"
                      className="relative inline-flex items-center gap-1 rounded-sm px-3.5 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Nosotros
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          nosotrosMenuOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span
                        className={`absolute inset-x-3.5 bottom-1 block h-[2px] rounded-sm bg-mustard transition-opacity ${
                          pathname.startsWith("/nosotros") ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {nosotrosMenuOpen ? (
                      <div
                        id="nosotros-desktop-menu"
                        className="absolute left-0 top-[calc(100%+8px)] w-72 rounded-md border border-border bg-surface p-2 shadow-[var(--shadow-popover)]"
                      >
                        {NOSOTROS_LINKS.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setNosotrosMenuOpen(false)}
                            className="block rounded-sm px-3.5 py-2.5 font-heading text-[13px] font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline-none"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
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
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-surface md:hidden"
          aria-label="Menú móvil"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link, index) => (
              <div key={link.href} className="contents">
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-sm px-3 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50"
                >
                  {link.label}
                </Link>

                {index === 0 ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setNosotrosMenuOpen((open) => !open)}
                      aria-expanded={nosotrosMenuOpen}
                      aria-controls="nosotros-mobile-menu"
                      className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50"
                    >
                      Nosotros
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          nosotrosMenuOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>

                    {nosotrosMenuOpen ? (
                      <div id="nosotros-mobile-menu" className="pb-2">
                        <div
                          className="ml-3 h-0.5 w-7 bg-mustard"
                          aria-hidden="true"
                        />
                        <div className="mt-1 flex flex-col pl-5">
                          {NOSOTROS_LINKS.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              onClick={closeMobileMenu}
                              className="flex min-h-11 items-center rounded-sm px-3 py-2.5 font-body text-[15px] text-text-muted transition-colors hover:bg-sky-50 hover:text-primary focus-visible:bg-sky-50 focus-visible:text-primary focus-visible:outline-none"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
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
