import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { linkFields, linkGroup } from "@/fields";
import { revalidateGlobal } from "@/hooks/revalidate";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Men\u00FA principal",
  admin: {
    group: "Navegaci\u00F3n",
    description:
      "Enlaces del men\u00FA superior. Los elementos con subenlaces se muestran como men\u00FA desplegable.",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 20 },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: "navItems",
      type: "array",
      label: "Elementos del men\u00FA",
      labels: { singular: "Elemento", plural: "Elementos" },
      admin: { initCollapsed: true },
      fields: [
        ...linkFields({ required: false }),
        {
          name: "children",
          type: "array",
          label: "Subenlaces",
          labels: { singular: "Subenlace", plural: "Subenlaces" },
          admin: {
            description:
              "Si agregas subenlaces, el elemento se convierte en un men\u00FA desplegable y su direcci\u00F3n se ignora.",
          },
          fields: linkFields(),
        },
      ],
      validate: (items: unknown) => {
        if (!Array.isArray(items)) return true;

        const invalid = items.some(
          (item: { label?: string; url?: string; children?: unknown[] }) =>
            !item.label || (!item.url && !item.children?.length),
        );
        return invalid
          ? "Cada elemento necesita un texto y una direcci\u00F3n o subenlaces."
          : true;
      },
    },
    linkGroup("cta", "Bot\u00F3n destacado", { required: false }),
  ],
};
