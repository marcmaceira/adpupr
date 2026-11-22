import type { Access, CollectionConfig } from "payload";
import { adminFieldOnly, adminsOnly, isAdmin, isHumanEditor, roleOf } from "../access";

const secureCookies = (process.env.NEXT_PUBLIC_SERVER_URL ?? "").startsWith("https://");

/** Admins read every account; any other account with a role reads only itself. */
const readUsers: Access = ({ req }) => {
  if (isAdmin(req)) return true;
  return roleOf(req) && req.user ? { id: { equals: req.user.id } } : false;
};

/** Admins edit every account; editors edit only themselves; the AI assistant edits none. */
const updateUsers: Access = ({ req }) => {
  if (isAdmin(req)) return true;
  return isHumanEditor(req) && req.user ? { id: { equals: req.user.id } } : false;
};

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: {
    useAPIKey: true,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { sameSite: "Lax", secure: secureCookies },
  },
  versions: false,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    group: "Administration",
    description:
      'People with access to the admin panel. Only admins create, delete or change other users. The "AI assistant" role is for MCP clients: it can read and edit content, but cannot delete anything or change any user.',
  },
  access: {
    // The AI assistant works through MCP only; it cannot sign in to the admin panel.
    admin: ({ req }) => isHumanEditor(req),
    create: adminsOnly,
    delete: adminsOnly,
    unlock: adminsOnly,
    read: readUsers,
    readVersions: adminsOnly,
    update: updateUsers,
  },
  fields: [
    { name: "name", type: "text", label: "Name" },
    {
      // Overrides Payload's built-in API key field (its lookup index follows the same
      // access). A key grants access without a password, so only admins set or change one.
      name: "apiKey",
      type: "text",
      access: { create: adminFieldOnly, update: adminFieldOnly },
    },
    {
      name: "role",
      type: "select",
      label: "Role",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: { create: adminFieldOnly, update: adminFieldOnly },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "AI assistant (MCP)", value: "ai" },
      ],
    },
  ],
};
