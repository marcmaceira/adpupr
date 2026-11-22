import type { ArrayField } from "payload";

/** Shows each row's own label ("Inicio", "Nosotros (dropdown)") in the admin list. */
export const withRowLabel = (field: ArrayField): ArrayField => ({
  ...field,
  admin: {
    ...field.admin,
    components: { RowLabel: "/payload/globals/components/NavRowLabel#NavRowLabel" },
  },
});
