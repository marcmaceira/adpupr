/**
 * Links of type "email" ("Correo del sitio") point at the site's main address, which lives
 * once in Configuración del sitio. This fills their `url` with the mailto: link after a
 * document is read, so every block and global resolves them like any other URL.
 */
export function mailtoHref(email: string, subject: string | null | undefined): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${query}`;
}

export function applySiteEmail<T>(value: T, email: string | undefined): T {
  if (!email) return value;
  const visit = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (!node || typeof node !== "object") return;
    if (Reflect.get(node, "type") === "email" && "emailSubject" in node) {
      const subject: unknown = Reflect.get(node, "emailSubject");
      Reflect.set(node, "url", mailtoHref(email, typeof subject === "string" ? subject : null));
    }
    Object.values(node).forEach(visit);
  };
  visit(value);
  return value;
}
