import Link from "next/link";
import { isSafeHref } from "@/lib/urls";
import type { ComponentProps, ReactNode } from "react";

interface CmsLinkProps extends Omit<ComponentProps<"a">, "href"> {
  readonly url: string;
  readonly children: ReactNode;
}

export function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

/**
 * Renders an editor-provided URL: internal paths use client-side navigation,
 * external URLs open in a new tab, and mailto:/tel:/#anchors stay plain links.
 */
export function CmsLink({ url, children, ...props }: CmsLinkProps) {
  if (!isSafeHref(url)) return <span className={props.className}>{children}</span>;
  if (url.startsWith("/")) {
    return (
      <Link href={url} {...props}>
        {children}
      </Link>
    );
  }

  if (isExternalUrl(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={url} {...props}>
      {children}
    </a>
  );
}
