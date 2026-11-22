/**
 * Checks that the component guide page shows every block, and every option of each
 * block's design selects (variant, layout, ratio, accent, heading size, selection mode).
 *
 *   pnpm payload run scripts/guide-coverage.ts
 */
import config from "@payload-config";
import { type Field, getPayload } from "payload";
import { blocks } from "../src/blocks";
import { GUIDE_PATH } from "../src/seed/pages";

const DESIGN_FIELDS = new Set(["variant", "layout", "ratio", "accent", "headingSize", "selection"]);

function designSelects(fields: Field[]): { name: string; options: string[] }[] {
  return fields.flatMap((field) => {
    if ((field.type === "select" || field.type === "radio") && DESIGN_FIELDS.has(field.name)) {
      const options = field.options.map((o) => (typeof o === "string" ? o : o.value));
      return [{ name: field.name, options }];
    }
    if (field.type === "row" || field.type === "collapsible") return designSelects(field.fields);
    return [];
  });
}

const payload = await getPayload({ config });
const { docs } = await payload.find({
  collection: "pages",
  where: { path: { equals: GUIDE_PATH } },
  depth: 0,
  limit: 1,
  overrideAccess: true,
});
const layout = docs[0]?.layout ?? [];
let missing = 0;

for (const block of blocks) {
  const instances = layout.filter((b) => b.blockType === block.slug);
  const selects = designSelects(block.fields);
  const parts = [`${block.slug}: ${instances.length} instance(s)`];
  if (instances.length === 0) missing += 1;
  for (const select of selects) {
    const seen = new Set(instances.map((b) => String(Reflect.get(b, select.name))));
    const absent = select.options.filter((o) => !seen.has(o));
    missing += absent.length;
    parts.push(
      `${select.name} ${select.options.length - absent.length}/${select.options.length}` +
        (absent.length ? ` (missing: ${absent.join(", ")})` : ""),
    );
  }
  payload.logger.info(parts.join(" · "));
}

payload.logger.info(
  `${blocks.length} blocks registered, ${layout.length} sections on ${GUIDE_PATH}, ${missing} missing`,
);
process.exit(missing === 0 ? 0 : 1);
