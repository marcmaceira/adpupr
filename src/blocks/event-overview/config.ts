import type { Block } from "payload";
import { array, headline, icon, link, sectionSettings, text } from "../../payload/fields";

/**
 * Event overview: the light section under the conference hero. Three parts: the event
 * detail strip (date, time, place), an intro with icon rows, and the collapsible agenda.
 * The agenda lives here (periods → entries) because it is shown on this page only.
 */
export const EventOverviewBlock: Block = {
  slug: "eventOverview",
  interfaceName: "EventOverviewBlock",
  labels: { singular: "Resumen del evento y agenda", plural: "Resúmenes del evento y agenda" },
  admin: { group: "Conferencia" },
  fields: [
    array(
      "details",
      "Datos del evento",
      "Dato",
      [
        {
          type: "row",
          fields: [
            { ...icon("icon", "Ícono", { required: true }), admin: { width: "30%" } },
            {
              name: "label",
              type: "text",
              label: "Etiqueta (por ejemplo: Fecha)",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
        text("value", "Valor", { required: true, textarea: true }),
      ],
      {
        maxRows: 3,
        description: "La franja con fecha, horario y lugar. Se muestran en una fila de tres.",
      },
    ),
    {
      name: "intro",
      type: "group",
      label: "Introducción",
      fields: [
        text("eyebrow", "Antetítulo"),
        ...headline("heading", "Título"),
        array(
          "rows",
          "Filas con ícono",
          "Fila",
          [
            icon("icon", "Ícono", { required: true }),
            text("heading", "Subtítulo", { description: "Opcional." }),
            text("text", "Texto", { required: true, textarea: true }),
            {
              name: "emphasis",
              type: "checkbox",
              label: "Destacar el texto",
              admin: { description: "Muestra el texto en azul y en negrita." },
            },
          ],
          { description: "Se muestran a la derecha del título." },
        ),
      ],
    },
    {
      name: "agenda",
      type: "group",
      label: "Agenda",
      admin: {
        description:
          "La agenda aparece cerrada; el visitante la abre con el botón. Las actividades con descripción (y no atenuadas) se pueden desplegar.",
      },
      fields: [
        text("heading", "Título de la agenda", { required: true }),
        {
          type: "row",
          fields: [
            {
              name: "expandLabel",
              type: "text",
              label: "Botón para abrir",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "collapseLabel",
              type: "text",
              label: "Botón para cerrar",
              required: true,
              admin: {
                width: "50%",
                description: "Se usa arriba (con la agenda abierta) y al final de la agenda.",
              },
            },
          ],
        },
        array("periods", "Bloques del día", "Bloque", [
          {
            type: "row",
            fields: [
              {
                name: "title",
                type: "text",
                label: "Nombre (por ejemplo: Mañana)",
                required: true,
                admin: { width: "40%" },
              },
              {
                name: "summary",
                type: "text",
                label: "Resumen",
                admin: { width: "60%" },
              },
            ],
          },
          array(
            "entries",
            "Actividades",
            "Actividad",
            [
              {
                type: "row",
                fields: [
                  {
                    name: "start",
                    type: "text",
                    label: "Inicio (por ejemplo: 7:30 a.m.)",
                    required: true,
                    admin: { width: "50%" },
                  },
                  {
                    name: "end",
                    type: "text",
                    label: "Fin",
                    required: true,
                    admin: { width: "50%" },
                  },
                ],
              },
              text("title", "Actividad", { required: true }),
              text("description", "Descripción", {
                textarea: true,
                description: "Opcional. El visitante la despliega con el botón +.",
              }),
              {
                name: "quiet",
                type: "checkbox",
                label: "Atenuada (recesos, registro, mensajes)",
                admin: {
                  description: "Se muestra en gris y nunca despliega la descripción.",
                },
              },
            ],
            { minRows: 1 },
          ),
        ]),
        text("note", "Nota al final", { description: "Por ejemplo: Programa sujeto a ajustes." }),
        link({
          name: "registrationLink",
          label: "Enlace al final de la agenda",
          description: "Por ejemplo, a la sección de tarifas (URL #inscripcion).",
        }),
      ],
    },
    sectionSettings(),
  ],
};
