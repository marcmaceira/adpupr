import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField, isAdminOrSelf, isLoggedIn } from "@/access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Usuario", plural: "Usuarios" },
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Administraci\u00F3n",
    description:
      "Personas con acceso al panel. Los administradores gestionan usuarios; los editores gestionan contenido.",
  },
  access: {
    admin: isLoggedIn,
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  hooks: {
    beforeChange: [
      // The account created through the first-user screen must be able to manage others.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;

        const { totalDocs } = await req.payload.count({ collection: "users", req });
        return totalDocs === 0 ? { ...data, role: "admin" } : data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      admin: {
        description: "Los editores pueden modificar el contenido, pero no gestionar usuarios.",
      },
    },
  ],
};
