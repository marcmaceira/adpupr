import type { CollectionConfig } from "payload";
import { adminFieldOnly, adminsOnly, isAdmin, roleOf } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: { useAPIKey: true },
  versions: false,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    group: "Administration",
    description:
      'People with access to the admin panel. The "AI assistant" role is for MCP clients: it can read and edit content, but cannot delete anything or manage users.',
  },
  access: {
    // The AI assistant works through MCP only; it cannot sign in to the admin panel.
    admin: ({ req }) => roleOf(req) !== null && roleOf(req) !== "ai",
    create: adminsOnly,
    delete: adminsOnly,
    read: ({ req }) => (isAdmin(req) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (isAdmin(req) ? true : req.user ? { id: { equals: req.user.id } } : false),
  },
  fields: [
    { name: "name", type: "text", label: "Name" },
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
