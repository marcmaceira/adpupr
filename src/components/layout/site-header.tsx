"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { BUTTON_VARIANTS } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { cx } from "@/lib/cx";
import type { HeaderData } from "@/lib/data/chrome";
import type { ResolvedLink } from "@/lib/links";

export type SiteHeaderProps = HeaderData;

const NAV_LINK =
  "relative rounded-sm px-3.5 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const NAV_BUTTON =
  "relative inline-flex items-center gap-1 rounded-sm px-3.5 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const ACTIVE_BAR =
  "absolute inset-x-3.5 bottom-1 block h-[2px] rounded-sm bg-mustard transition-opacity";
const DROPDOWN_PANEL =
  "absolute left-0 top-[calc(100%+8px)] w-72 rounded-md border border-border bg-surface p-2 shadow-[var(--shadow-popover)]";
const DROPDOWN_LINK =
  "block rounded-sm px-3.5 py-2.5 font-heading text-[13px] font-semibold text-text transition-colors hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline-none";
const MOBILE_LINK =
  "rounded-sm px-3 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50";
const MOBILE_BUTTON =
  "flex w-full items-center justify-between rounded-sm px-3 py-2.5 font-heading text-sm font-semibold text-text transition-colors hover:bg-sky-50";
const MOBILE_SUBLINK =
  "flex min-h-11 items-center rounded-sm px-3 py-2.5 font-body text-[15px] text-text-muted transition-colors hover:bg-sky-50 hover:text-primary focus-visible:bg-sky-50 focus-visible:text-primary focus-visible:outline-none";

/** `/` is active only on the home page; any other path is active for itself and below. */
function isActivePath(pathname: string, href: string): boolean {
  const path = href.split("#")[0] ?? "";
  if (!path.startsWith("/")) return false;
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

/** A dropdown is active when the current page sits under any of its links. */
function isActiveDropdown(pathname: string, children: readonly ResolvedLink[]): boolean {
  return children.some((child) => isActivePath(pathname, child.href));
}

interface HeaderLinkProps {
  readonly link: ResolvedLink;
  readonly className: string;
  readonly active?: boolean;
  readonly onClick?: () => void;
  readonly children?: ReactNode;
}

/** next/link for every header link (as the original header), with aria-current when active. */
function HeaderLink({ link, className, active, onClick, children }: HeaderLinkProps) {
  return (
    <Link
      href={link.href}
      target={link.newTab ? "_blank" : undefined}
      rel={link.newTab ? "noopener noreferrer" : undefined}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={className}
    >
      {link.label}
      {children}
    </Link>
  );
}

export function SiteHeader({
  logo,
  homeAriaLabel,
  items,
  cta,
  navLabel,
  mobileNavLabel,
  openMenuLabel,
  closeMenuLabel,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // One open-dropdown state shared by the desktop menu and the mobile accordion.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (openDropdown === null) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openDropdown]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);
  const closeDropdown = useCallback(() => setOpenDropdown(null), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((open) => !open), []);
  const toggleDropdown = (menuId: string) =>
    setOpenDropdown((open) => (open === menuId ? null : menuId));

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-8 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={homeAriaLabel}>
          <MediaImage
            media={logo}
            width={142}
            height={40}
            loading="eager"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label={navLabel}>
          {items.map((item) => {
            if (item.kind === "link") {
              const active = isActivePath(pathname, item.link.href);
              return (
                <HeaderLink key={item.key} link={item.link} active={active} className={NAV_LINK}>
                  <span
                    className={cx(ACTIVE_BAR, active ? "opacity-100" : "opacity-0")}
                    aria-hidden="true"
                  />
                </HeaderLink>
              );
            }

            const open = openDropdown === item.menuId;
            const panelId = `${item.menuId}-desktop-menu`;
            return (
              <div
                key={item.key}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpenDropdown((current) => (current === item.menuId ? null : current));
                  }
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown(item.menuId)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={NAV_BUTTON}
                >
                  {item.label}
                  <ChevronDown
                    className={cx("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span
                    className={cx(
                      ACTIVE_BAR,
                      isActiveDropdown(pathname, item.children) ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </button>

                {open ? (
                  <div id={panelId} className={DROPDOWN_PANEL}>
                    {item.children.map((child) => (
                      <HeaderLink
                        key={child.href + child.label}
                        link={child}
                        onClick={closeDropdown}
                        className={DROPDOWN_LINK}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {cta ? (
          <div className="hidden items-center gap-2 md:flex">
            <HeaderLink link={cta} className={BUTTON_VARIANTS.navCta} />
          </div>
        ) : null}

        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-sm p-2 text-primary md:hidden"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? closeMenuLabel : openMenuLabel}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" strokeWidth={1.75} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-surface md:hidden"
          aria-label={mobileNavLabel}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {items.map((item) => {
              if (item.kind === "link") {
                return (
                  <HeaderLink
                    key={item.key}
                    link={item.link}
                    onClick={closeMobileMenu}
                    className={MOBILE_LINK}
                  />
                );
              }

              const open = openDropdown === item.menuId;
              const panelId = `${item.menuId}-mobile-menu`;
              return (
                <div key={item.key}>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.menuId)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className={MOBILE_BUTTON}
                  >
                    {item.label}
                    <ChevronDown
                      className={cx("h-4 w-4 transition-transform", open && "rotate-180")}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>

                  {open ? (
                    <div id={panelId} className="pb-2">
                      <div className="ml-3 h-0.5 w-7 bg-mustard" aria-hidden="true" />
                      <div className="mt-1 flex flex-col pl-5">
                        {item.children.map((child) => (
                          <HeaderLink
                            key={child.href + child.label}
                            link={child}
                            onClick={closeMobileMenu}
                            className={MOBILE_SUBLINK}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
            {cta ? (
              <HeaderLink
                link={cta}
                onClick={closeMobileMenu}
                className={BUTTON_VARIANTS.navCtaMobile}
              />
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
