import type { CollectionConfig } from "payload";
import { adminFieldOnly, adminsOnly, isAdmin, roleOf } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Usuario", plural: "Usuarios" },
  auth: { useAPIKey: true },
  versions: false,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    group: "Administración",
    description:
      "Personas con acceso al panel. El rol «Asistente IA» es para clientes MCP: puede leer y editar contenido, pero no borrar ni administrar usuarios.",
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
    { name: "name", type: "text", label: "Nombre" },
    {
      name: "role",
      type: "select",
      label: "Rol",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: { create: adminFieldOnly, update: adminFieldOnly },
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Asistente IA (MCP)", value: "ai" },
      ],
    },
  ],
};
