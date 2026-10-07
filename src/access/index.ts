import type { Access, FieldAccess, PayloadRequest, Where } from "payload";

type Role = "admin" | "editor";

function hasRole(user: unknown, role: Role): boolean {
  return Boolean(user && typeof user === "object" && "role" in user && user.role === role);
}

export const anyone: Access = () => true;

export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Boolean-only variant for access slots that cannot return a query (e.g. admin panel access). */
export const isLoggedIn = ({ req: { user } }: { req: PayloadRequest }): boolean => Boolean(user);

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, "admin");

export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, "admin");

/** Admins manage every account; other users can only read and update their own. */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (hasRole(user, "admin")) return true;

  const ownAccount: Where = { id: { equals: user.id } };
  return ownAccount;
};

/** Logged-in users see drafts; the public only sees published documents. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;

  const published: Where = { _status: { equals: "published" } };
  return published;
};
