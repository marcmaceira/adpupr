/**
 * Builders for the site editor's Lexical JSON, so seed data reads like prose:
 *
 *   richText(
 *     "Plain paragraph.",
 *     ["Mixed ", bold("bold"), " and ", link("a link", "/contactanos"), "."],
 *     bullets(["one", "two"]),
 *   )
 *
 * The output matches what the admin editor saves. Typing is checked at the call site
 * through the generic parameter (pass the generated field type).
 */

type Inline =
  | string
  | { readonly kind: "text"; readonly text: string; readonly format: number }
  | { readonly kind: "link"; readonly text: string; readonly url: string; readonly newTab: boolean }
  | { readonly kind: "break" };

type BlockNode =
  | string
  | readonly Inline[]
  | {
      readonly kind: "list";
      readonly ordered: boolean;
      readonly items: readonly (string | readonly Inline[])[];
    };

export const bold = (text: string): Inline => ({ kind: "text", text, format: 1 });
export const italic = (text: string): Inline => ({ kind: "text", text, format: 2 });
export const lineBreak: Inline = { kind: "break" };
export const link = (text: string, url: string, newTab = false): Inline => ({
  kind: "link",
  text,
  url,
  newTab,
});
export const bullets = (items: readonly (string | readonly Inline[])[]): BlockNode => ({
  kind: "list",
  ordered: false,
  items,
});
export const numbered = (items: readonly (string | readonly Inline[])[]): BlockNode => ({
  kind: "list",
  ordered: true,
  items,
});

const textNode = (text: string, format = 0) => ({
  type: "text",
  text,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const element = (type: string, children: unknown[], extra: Record<string, unknown> = {}) => ({
  type,
  children,
  direction: null,
  format: "",
  indent: 0,
  version: 1,
  ...extra,
});

function inlineNodes(content: string | readonly Inline[]): unknown[] {
  const parts = typeof content === "string" ? [content] : content;
  return parts.map((part) => {
    if (typeof part === "string") return textNode(part);
    if (part.kind === "break") return { type: "linebreak", version: 1 };
    if (part.kind === "text") return textNode(part.text, part.format);
    return element("link", [textNode(part.text)], {
      fields: { linkType: "custom", url: part.url, newTab: part.newTab },
    });
  });
}

type ListNode = Extract<BlockNode, { kind: "list" }>;

const isList = (node: BlockNode): node is ListNode =>
  typeof node === "object" && "kind" in node && node.kind === "list";

function blockNode(node: BlockNode): unknown {
  if (!isList(node)) {
    return element("paragraph", inlineNodes(node), { textFormat: 0, textStyle: "" });
  }
  const list = node;
  return element(
    "list",
    list.items.map((item, i) => element("listitem", inlineNodes(item), { value: i + 1 })),
    { listType: list.ordered ? "number" : "bullet", start: 1, tag: list.ordered ? "ol" : "ul" },
  );
}

/**
 * Builds rich text for a field. Pass the field's generated type, e.g.
 * `richText<NonNullable<TextSplitBlock["body"]>>(...)`. Payload names its node union by a
 * config hash, so the structure built here cannot be typed against it directly.
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- T is the caller's target field type (see above).
export function richText<T>(...blocks: BlockNode[]): T {
  const state = { root: element("root", blocks.map(blockNode)) };
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- the one place seed JSON meets the hash-named generated rich text type.
  return state as T;
}
