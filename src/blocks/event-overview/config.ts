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
  labels: { singular: "Event overview and agenda", plural: "Event overviews and agendas" },
  admin: { group: "Conference" },
  fields: [
    array(
      "details",
      "Event details",
      "Detail",
      [
        {
          type: "row",
          fields: [
            { ...icon("icon", "Icon", { required: true }), admin: { width: "30%" } },
            {
              name: "label",
              type: "text",
              label: "Label (for example: Fecha)",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
        text("value", "Value", { required: true, textarea: true }),
      ],
      {
        maxRows: 3,
        description: "The strip with date, time and place. Shown in a row of three.",
      },
    ),
    {
      name: "intro",
      type: "group",
      label: "Intro",
      fields: [
        text("eyebrow", "Eyebrow"),
        ...headline("heading", "Heading"),
        array(
          "rows",
          "Icon rows",
          "Row",
          [
            icon("icon", "Icon", { required: true }),
            text("heading", "Subheading", { description: "Optional." }),
            text("text", "Text", { required: true, textarea: true }),
            {
              name: "emphasis",
              type: "checkbox",
              label: "Emphasize the text",
              admin: { description: "Shows the text in bold blue." },
            },
          ],
          { description: "Shown to the right of the heading." },
        ),
      ],
    },
    {
      name: "agenda",
      type: "group",
      label: "Agenda",
      admin: {
        description:
          "The agenda starts collapsed; the visitor opens it with the button. Activities with a description (and not muted) can be expanded.",
      },
      fields: [
        text("heading", "Agenda heading", { required: true }),
        {
          type: "row",
          fields: [
            {
              name: "expandLabel",
              type: "text",
              label: "Open button",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "collapseLabel",
              type: "text",
              label: "Close button",
              required: true,
              admin: {
                width: "50%",
                description: "Used at the top (with the agenda open) and at the end of the agenda.",
              },
            },
          ],
        },
        array("periods", "Parts of the day", "Part of the day", [
          {
            type: "row",
            fields: [
              {
                name: "title",
                type: "text",
                label: "Name (for example: Mañana)",
                required: true,
                admin: { width: "40%" },
              },
              {
                name: "summary",
                type: "text",
                label: "Summary",
                admin: { width: "60%" },
              },
            ],
          },
          array(
            "entries",
            "Activities",
            "Activity",
            [
              {
                type: "row",
                fields: [
                  {
                    name: "start",
                    type: "text",
                    label: "Start (for example: 7:30 a.m.)",
                    required: true,
                    admin: { width: "50%" },
                  },
                  {
                    name: "end",
                    type: "text",
                    label: "End",
                    required: true,
                    admin: { width: "50%" },
                  },
                ],
              },
              text("title", "Activity", { required: true }),
              text("description", "Description", {
                textarea: true,
                description: "Optional. The visitor expands it with the + button.",
              }),
              {
                name: "quiet",
                type: "checkbox",
                label: "Muted (breaks, registration, remarks)",
                admin: {
                  description: "Shown in gray and never expands the description.",
                },
              },
            ],
            { minRows: 1 },
          ),
        ]),
        text("note", "Closing note", { description: "For example: Programa sujeto a ajustes." }),
        link({
          name: "registrationLink",
          label: "Link at the end of the agenda",
          description: "For example, to the rates section (URL #inscripcion).",
        }),
      ],
    },
    sectionSettings(),
  ],
};
