import type { Access, FieldAccess, PayloadRequest } from "payload";

/**
 * Roles:
 * - admin: everything, including users.
 * - editor: all site content; cannot manage users.
 * - ai: the MCP assistant. Reads and edits content; cannot delete, publish media deletions or touch users.
 */
export type Role = "admin" | "editor" | "ai";

export const roleOf = (req: PayloadRequest): Role | null => {
  if (!req.user) return null;
  return req.user.role ?? "editor";
};

export const isAdmin = (req: PayloadRequest) => roleOf(req) === "admin";

export const anyone: Access = () => true;

export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Admins and human editors; excludes the AI assistant. */
export const humanEditors: Access = ({ req }) => {
  const role = roleOf(req);
  return role === "admin" || role === "editor";
};

export const adminsOnly: Access = ({ req }) => isAdmin(req);

/** Public visitors see published documents only; signed-in users see drafts too. */
export const authenticatedOrPublished: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } };

export const adminFieldOnly: FieldAccess = ({ req }) => isAdmin(req);
