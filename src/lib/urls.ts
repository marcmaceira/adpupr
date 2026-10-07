export function isSafeHref(value: string): boolean {
  if (!value) return false;
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code <= 32 || code === 127 || char === "\\") return false;
  }
  if (value.startsWith("/")) return !value.startsWith("//");
  if (value.startsWith("#")) return true;
  if (/^mailto:[^?@]+@[^?@]+(?:\?.*)?$/i.test(value)) return true;
  if (/^tel:\+?[\d().-]+$/i.test(value)) return true;
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function validateHref(value: string | null | undefined) {
  return !value || isSafeHref(value) || "Usa una ruta interna, https://, mailto: o tel:.";
}
