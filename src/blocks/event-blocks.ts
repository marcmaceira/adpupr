import type { Block } from "payload";
import { validateHref } from "@/lib/urls";
import {
  anchorField,
  backgroundField,
  eyebrowField,
  headingField,
  iconField,
  INLINE_FORMAT_DESCRIPTION,
  linkGroup,
} from "@/fields";

export const EventDetails: Block = {
  slug: "eventDetails",
  interfaceName: "EventDetailsBlock",
  labels: { singular: "Datos del evento", plural: "Datos del evento" },
  fields: [
    backgroundField("bg"),
    {
      name: "items",
      type: "array",
      label: "Datos",
      labels: { singular: "Dato", plural: "Datos" },
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: "row",
          fields: [iconField(), { name: "label", type: "text", label: "Etiqueta", required: true }],
        },
        { name: "value", type: "text", label: "Valor", required: true },
      ],
    },
    anchorField,
  ],
};

export const Agenda: Block = {
  slug: "agenda",
  interfaceName: "AgendaBlock",
  labels: { singular: "Agenda", plural: "Agendas" },
  fields: [
    backgroundField("bg"),
    { ...headingField, defaultValue: "Agenda del d\u00EDa", required: true },
    {
      name: "periods",
      type: "array",
      label: "Bloques del d\u00EDa",
      labels: { singular: "Bloque", plural: "Bloques" },
      minRows: 1,
      admin: { description: "Por ejemplo, Ma\u00F1ana y Tarde." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "title", type: "text", label: "T\u00EDtulo", required: true },
            { name: "subtitle", type: "text", label: "Subt\u00EDtulo" },
          ],
        },
        {
          name: "entries",
          type: "array",
          label: "Actividades",
          labels: { singular: "Actividad", plural: "Actividades" },
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            {
              type: "row",
              fields: [
                { name: "start", type: "text", label: "Inicio", required: true },
                { name: "end", type: "text", label: "Fin", required: true },
              ],
            },
            { name: "title", type: "text", label: "Actividad", required: true },
            {
              name: "description",
              type: "textarea",
              label: "Descripci\u00F3n",
              admin: { description: "Se muestra al expandir la actividad." },
            },
            {
              name: "minor",
              type: "checkbox",
              label: "Actividad secundaria",
              admin: {
                description:
                  "Recesos, registro o mensajes. Se muestra en gris y sin descripci\u00F3n.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "footnote",
      type: "text",
      label: "Nota final",
      defaultValue: "Programa sujeto a ajustes.",
    },
    linkGroup("link", "Enlace al final", { required: false }),
    { ...anchorField, defaultValue: "agenda" },
  ],
};

export const BenefitsPanel: Block = {
  slug: "benefitsPanel",
  interfaceName: "BenefitsPanelBlock",
  labels: { singular: "Panel de beneficios", plural: "Paneles de beneficios" },
  fields: [
    eyebrowField,
    { ...headingField, required: true },
    {
      name: "highlight",
      type: "group",
      label: "Dato destacado (opcional)",
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", label: "Etiqueta" },
            { name: "value", type: "text", label: "Valor" },
          ],
        },
        { name: "text", type: "textarea", label: "Texto" },
      ],
    },
    {
      name: "items",
      type: "array",
      label: "Beneficios",
      labels: { singular: "Beneficio", plural: "Beneficios" },
      minRows: 1,
      fields: [
        iconField(),
        {
          type: "row",
          fields: [
            { name: "title", type: "text", label: "T\u00EDtulo", required: true },
            { name: "detail", type: "text", label: "Detalle" },
          ],
        },
      ],
    },
    {
      name: "note",
      type: "textarea",
      label: "Nota al pie",
      admin: { description: INLINE_FORMAT_DESCRIPTION },
    },
    anchorField,
  ],
};

export const Pricing: Block = {
  slug: "pricing",
  interfaceName: "PricingBlock",
  labels: { singular: "Tarifas", plural: "Tarifas" },
  fields: [
    backgroundField("surface"),
    eyebrowField,
    { ...headingField, required: true },
    { name: "intro", type: "textarea", label: "Introducci\u00F3n" },
    {
      name: "plans",
      type: "array",
      label: "Tarifas",
      labels: { singular: "Tarifa", plural: "Tarifas" },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            { name: "name", type: "text", label: "Nombre", required: true },
            { name: "price", type: "text", label: "Precio", required: true },
          ],
        },
        { name: "note", type: "text", label: "Nota" },
        {
          type: "row",
          fields: [
            { name: "buttonLabel", type: "text", label: "Texto del bot\u00F3n", required: true },
            {
              name: "url",
              type: "text",
              label: "Enlace de pago",
              required: true,
              validate: validateHref,
            },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "featured", type: "checkbox", label: "Destacar" },
            {
              name: "badge",
              type: "text",
              label: "Etiqueta",
              admin: {
                description: "Solo para tarifas destacadas (p. ej. «Miembros»).",
                condition: (_, siblingData) => Boolean(siblingData?.featured),
              },
            },
          ],
        },
      ],
    },
    {
      name: "callout",
      type: "group",
      label: "M\u00E9todo de pago adicional (opcional)",
      fields: [
        iconField(),
        { name: "title", type: "text", label: "T\u00EDtulo" },
        { name: "text", type: "textarea", label: "Texto" },
        linkGroup("link", "Bot\u00F3n", { required: false }),
      ],
    },
    { name: "footnote", type: "text", label: "Nota final" },
    { ...anchorField, defaultValue: "inscripcion" },
  ],
};

export const SignupSteps: Block = {
  // Shorten nested array identifiers to stay within PostgreSQL's 63-character limit.
  dbName: "signup",
  slug: "signupSteps",
  interfaceName: "SignupStepsBlock",
  labels: { singular: "Pasos de inscripci\u00F3n", plural: "Pasos de inscripci\u00F3n" },
  fields: [
    backgroundField("surface-2"),
    {
      name: "formStep",
      type: "group",
      label: "Paso 1: formulario",
      fields: [
        eyebrowField,
        { ...headingField, required: true },
        { name: "text", type: "textarea", label: "Texto" },
        linkGroup("link", "Bot\u00F3n", { required: false }),
        {
          type: "row",
          fields: [
            { name: "noteTitle", type: "text", label: "T\u00EDtulo de la nota" },
            { name: "noteText", type: "textarea", label: "Texto de la nota" },
          ],
        },
      ],
    },
    {
      name: "paymentStep",
      type: "group",
      label: "Paso 2: pago",
      fields: [
        eyebrowField,
        { ...headingField, required: true },
        {
          name: "methods",
          type: "array",
          label: "M\u00E9todos de pago",
          labels: { singular: "M\u00E9todo", plural: "M\u00E9todos" },
          admin: { initCollapsed: true },
          fields: [
            { name: "title", type: "text", label: "T\u00EDtulo", required: true },
            {
              name: "description",
              type: "textarea",
              label: "Descripci\u00F3n",
              admin: { description: INLINE_FORMAT_DESCRIPTION },
            },
            linkGroup("link", "Bot\u00F3n", { required: false }),
            {
              name: "options",
              type: "array",
              label: "Opciones con precio",
              labels: { singular: "Opci\u00F3n", plural: "Opciones" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", label: "Nombre", required: true },
                    { name: "price", type: "text", label: "Precio", required: true },
                    {
                      name: "url",
                      type: "text",
                      label: "Enlace",
                      required: true,
                      validate: validateHref,
                    },
                  ],
                },
              ],
            },
            {
              name: "showPostalAddress",
              type: "checkbox",
              label: "Mostrar la direcci\u00F3n postal",
              admin: { description: "Usa la direcci\u00F3n de Ajustes del sitio." },
            },
          ],
        },
      ],
    },
    anchorField,
  ],
};

export const ContactSection: Block = {
  slug: "contactSection",
  interfaceName: "ContactSectionBlock",
  labels: { singular: "Contacto", plural: "Contacto" },
  admin: {
    // Documented in the admin UI; the side panel reads Site Settings.
    disableBlockName: true,
  },
  fields: [
    eyebrowField,
    { ...headingField, required: true },
    { name: "body", type: "richText", label: "Texto" },
    {
      name: "form",
      type: "group",
      label: "Formulario",
      admin: {
        description:
          "El formulario abre el programa de correo con el mensaje dirigido al primer correo de Ajustes del sitio.",
      },
      fields: [
        eyebrowField,
        { ...headingField, required: true },
        {
          name: "note",
          type: "text",
          label: "Nota",
          defaultValue: "El formulario no almacena tus datos.",
        },
        {
          name: "buttonLabel",
          type: "text",
          label: "Texto del bot\u00F3n",
          defaultValue: "Enviar correo",
        },
      ],
    },
    anchorField,
  ],
};

export const ResourceLibrary: Block = {
  slug: "resourceLibrary",
  interfaceName: "ResourceLibraryBlock",
  labels: { singular: "Biblioteca de documentos", plural: "Bibliotecas de documentos" },
  admin: { disableBlockName: true },
  fields: [
    eyebrowField,
    { ...headingField, required: true },
    {
      name: "body",
      type: "richText",
      label: "Texto",
      admin: {
        description: "Los documentos se gestionan en Archivos › Documentos.",
      },
    },
    { ...anchorField, defaultValue: "publicaciones" },
  ],
};
