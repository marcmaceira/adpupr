"use client";

import { useRowLabel } from "@payloadcms/ui";

function read(source: unknown, key: string): unknown {
  return source && typeof source === "object" ? Reflect.get(source, key) : undefined;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Row titles for the header and footer arrays, so editors see "Inicio" or
 * "Nosotros (menú desplegable)" instead of "Elemento 01".
 */
export function NavRowLabel() {
  const { data, rowNumber } = useRowLabel<unknown>();
  const number = String((rowNumber ?? 0) + 1).padStart(2, "0");

  const heading = text(read(data, "heading"));
  if (heading) return <span>{heading}</span>;

  if (read(data, "type") === "dropdown") {
    const label = text(read(data, "label"));
    return <span>{label ? `${label} (menú desplegable)` : `Menú desplegable ${number}`}</span>;
  }

  const linkLabel = text(read(read(data, "link"), "label"));
  return <span>{linkLabel || `Enlace ${number}`}</span>;
}
