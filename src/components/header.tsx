"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { CmsLink } from "./cms-link";
import type { Header as HeaderData } from "@/payload-types";
import logoColor from "../../public/logo-color.png";

const NAV_CLASS =
  "relative rounded-sm px-3.5 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function activePath(pathname: string, url: string | null | undefined) {
  const path = url?.split(/[?#]/)[0];
  return path === "/"
    ? pathname === "/"
    : Boolean(path?.startsWith("/") && (pathname === path || pathname.startsWith(`${path}/`)));
}

export default function Header({ data }: { readonly data: HeaderData }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  useEffect(() => {
    if (!mobileMenuOpen && !openMenu) return undefined;
    const previousOverflow = document.body.style.overflow;
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen, openMenu]);
  function closeMenus() {
    setMobileMenuOpen(false);
    setOpenMenu(null);
  }

  const items = data.navItems ?? [];
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="ADPUPR - Inicio">
          <Image
            src={logoColor}
            alt="ADPUPR"
            width={142}
            height={40}
            loading="eager"
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden flex-1 items-center gap-1 lg:flex" aria-label="Principal">
          {items.map((item) => {
            const key = item.id ?? item.label ?? "";
            const active =
              activePath(pathname, item.url) ||
              item.children?.some((child) => activePath(pathname, child.url));
            return item.children?.length ? (
              <div
                key={key}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu((old) => (old === key ? null : key))}
                  aria-expanded={openMenu === key}
                  aria-controls={`nav-${key}`}
                  className={`${NAV_CLASS} inline-flex items-center gap-1`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 ${openMenu === key ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                  {active ? (
                    <span
                      className="absolute inset-x-3.5 bottom-1 h-0.5 bg-mustard"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
                {openMenu === key ? (
                  <div
                    id={`nav-${key}`}
                    className="absolute left-0 top-[calc(100%+8px)] w-72 rounded-md border border-border bg-surface p-2 shadow-[var(--shadow-popover)]"
                  >
                    {item.children.map((child) => (
                      <CmsLink
                        key={child.id ?? child.url}
                        url={child.url}
                        onClick={closeMenus}
                        className="block rounded-sm px-3.5 py-2.5 font-heading text-[13px] font-semibold hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        {child.label}
                      </CmsLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : item.url ? (
              <CmsLink
                key={key}
                url={item.url}
                aria-current={active ? "page" : undefined}
                className={NAV_CLASS}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute inset-x-3.5 bottom-1 h-0.5 bg-mustard"
                    aria-hidden="true"
                  />
                ) : null}
              </CmsLink>
            ) : null;
          })}
        </nav>
        {data.cta?.url && data.cta.label ? (
          <CmsLink
            url={data.cta.url}
            className="hidden shrink-0 rounded-sm bg-primary px-4 py-2 font-heading text-[13px] font-semibold text-text-on-dark hover:bg-primary-700 lg:inline-flex"
          >
            {data.cta.label}
          </CmsLink>
        ) : null}
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-sm p-2 text-primary lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Cerrar men\u00FA" : "Abrir men\u00FA"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {mobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-surface lg:hidden"
          aria-label="Men&uacute; m&oacute;vil"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {items.map((item) => {
              const key = item.id ?? item.label ?? "";
              return item.children?.length ? (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => setOpenMenu((old) => (old === key ? null : key))}
                    aria-expanded={openMenu === key}
                    aria-controls={`mobile-${key}`}
                    className="flex min-h-11 w-full items-center justify-between rounded-sm px-3 py-2.5 font-heading text-sm font-semibold hover:bg-sky-50"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 ${openMenu === key ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {openMenu === key ? (
                    <div
                      id={`mobile-${key}`}
                      className="flex flex-col border-l-2 border-mustard pl-5"
                    >
                      {item.children.map((child) => (
                        <CmsLink
                          key={child.id ?? child.url}
                          url={child.url}
                          onClick={closeMenus}
                          className="flex min-h-11 items-center rounded-sm px-3 py-2.5 font-body text-[15px] text-text-muted hover:bg-sky-50"
                        >
                          {child.label}
                        </CmsLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : item.url ? (
                <CmsLink
                  key={key}
                  url={item.url}
                  onClick={closeMenus}
                  className="rounded-sm px-3 py-2.5 font-heading text-sm font-semibold hover:bg-sky-50"
                >
                  {item.label}
                </CmsLink>
              ) : null;
            })}
            {data.cta?.url && data.cta.label ? (
              <CmsLink
                url={data.cta.url}
                onClick={closeMenus}
                className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-3 py-2.5 font-heading text-sm font-semibold text-text-on-dark"
              >
                {data.cta.label}
              </CmsLink>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
