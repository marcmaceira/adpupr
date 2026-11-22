import type { CollectionConfig, Field } from "payload";
import { array, text } from "../fields";
import { anyone, authenticated, humanEditors } from "../access";
import { slugField, slugFrom } from "./People";

const personField = (description: string): Field => ({
  name: "person",
  type: "relationship",
  relationTo: "people",
  label: "Persona",
  required: true,
  admin: { description },
});

const displayNameField: Field = text("displayName", "Nombre a mostrar (opcional)", {
  description: "Déjalo vacío para usar el nombre de la persona.",
});

/** Working committees shown in the "Comités" section of Estructura organizacional. */
export const Committees: CollectionConfig = {
  slug: "committees",
  labels: { singular: "Comité", plural: "Comités" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
    group: "Organización",
    description:
      "Comités de trabajo. Se muestran en el orden indicado; su identificador es el ancla del enlace (#identificador).",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  defaultSort: "order",
  hooks: { beforeValidate: [slugFrom("name")] },
  fields: [
    text("name", "Nombre", {
      required: true,
      description: "Sin «Comité de». Por ejemplo: Asuntos Legislativos.",
    }),
    text("description", "Descripción", { required: true, textarea: true }),
    text("focus", "Enfoque destacado (opcional)", {
      textarea: true,
      description: "Se muestra en un recuadro mostaza debajo de la descripción.",
    }),
    text("functionsLabel", "Título de la lista de funciones", {
      required: true,
      description: "Por ejemplo: Funciones principales.",
    }),
    array(
      "functions",
      "Funciones",
      "Función",
      [text("text", "Función", { required: true, textarea: true })],
      { minRows: 1 },
    ),
    {
      name: "coordinator",
      type: "group",
      label: "Coordinación",
      fields: [
        personField("Su retrato y biografía se toman del registro de la persona."),
        {
          type: "row",
          fields: [
            displayNameField,
            text("roleLabel", "Etiqueta (opcional)", {
              description: "Reemplaza la etiqueta general de la sección (Coordinación).",
            }),
          ],
        },
      ],
    },
    {
      name: "editorialBoard",
      type: "group",
      label: "Junta Editora (opcional)",
      admin: {
        description:
          "Recuadro adicional con integrantes y responsabilidades. Déjalo vacío si no aplica.",
      },
      fields: [
        text("title", "Título", { description: "Por ejemplo: Junta Editora." }),
        text("summary", "Resumen", { textarea: true }),
        array("members", "Integrantes", "Integrante", [
          personField("Persona integrante."),
          {
            type: "row",
            fields: [text("role", "Rol en la junta", { required: true }), displayNameField],
          },
        ]),
        array("responsibilities", "Responsabilidades", "Responsabilidad", [
          text("text", "Responsabilidad", { required: true, textarea: true }),
        ]),
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Orden",
      required: true,
      defaultValue: 1,
      admin: { position: "sidebar", description: "Los comités se muestran de menor a mayor." },
    },
    slugField(
      "Identificador (ancla)",
      "Se completa a partir del nombre. Es el ancla del enlace: /nosotros/estructura-organizacional#identificador.",
      "asuntos-legislativos",
    ),
  ],
};
