import type { Access, FieldAccess, PayloadRequest } from "payload";

/**
 * Roles:
 * - admin: everything, including users and API keys.
 * - editor: all site content; can edit their own account but not their role or API key.
 * - ai: the MCP assistant. Reads and edits content; cannot delete, sign in to the admin
 *   panel, or change any user, including itself.
 *
 * Visitors who are not signed in can only read published content. A signed-in account
 * without one of these roles gets no more access than a visitor.
 */
export type Role = "admin" | "editor" | "ai";

const ROLES: readonly string[] = ["admin", "editor", "ai"] satisfies Role[];

function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.includes(value);
}

export const roleOf = (req: PayloadRequest): Role | null => {
  const role: unknown = req.user?.role;
  return isRole(role) ? role : null;
};

export const isAdmin = (req: PayloadRequest) => roleOf(req) === "admin";

/** Admins and human editors; excludes the AI assistant. */
export const isHumanEditor = (req: PayloadRequest) => {
  const role = roleOf(req);
  return role === "admin" || role === "editor";
};

export const anyone: Access = () => true;

/** Any account with a role: admins, editors and the AI assistant. */
export const staff: Access = ({ req }) => roleOf(req) !== null;

export const humanEditors: Access = ({ req }) => isHumanEditor(req);

export const adminsOnly: Access = ({ req }) => isAdmin(req);

/** Visitors see published documents only; staff see drafts too. */
export const publishedOrStaff: Access = ({ req }) =>
  roleOf(req) ? true : { _status: { equals: "published" } };

export const adminFieldOnly: FieldAccess = ({ req }) => isAdmin(req);
