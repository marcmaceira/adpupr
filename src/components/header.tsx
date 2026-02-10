"use client"

import { useState, useEffect, useCallback } from "react"

const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Objetivos", href: "#objetivos" },
  { label: "Comit\u00E9s", href: "#comites" },
  { label: "Conferencia", href: "#conferencia" },
  { label: "Boletines", href: "#boletines" },
] as const

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleEscape)
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 shadow-lg shadow-primary/5 backdrop-blur-md"
          : "bg-primary-dark"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="/"
          className={`text-2xl font-extrabold tracking-tight transition-colors ${
            scrolled ? "text-primary" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-be-vietnam-pro), sans-serif" }}
          aria-label="ADPUPR - Inicio"
        >
          <span className={scrolled ? "text-primary-light" : "text-white/70"}>
            ADPU
          </span>
          <span className={scrolled ? "text-primary" : "text-accent"}>PR</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 ${
                scrolled
                  ? "text-text hover:text-primary"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="mailto:info@adpupr.com"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              scrolled
                ? "bg-primary text-white hover:bg-primary-light"
                : "bg-accent text-primary-dark hover:bg-accent-light"
            }`}
          >
            Membres&iacute;a
          </a>
        </div>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 md:hidden ${
            scrolled ? "text-primary" : "text-white"
          }`}
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Cerrar men\u00FA" : "Abrir men\u00FA"}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          className="border-t border-white/10 bg-primary-dark md:hidden"
          aria-label="Men\u00FA m\u00F3vil"
        >
          <div className="space-y-1 px-4 pb-4 pt-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:info@adpupr.com"
              onClick={closeMobileMenu}
              className="mt-3 block rounded-full bg-accent px-5 py-2.5 text-center text-base font-semibold text-primary-dark transition-colors hover:bg-accent-light"
            >
              Membres&iacute;a
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
