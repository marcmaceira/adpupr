# Block contract

How the site is built from Payload blocks. Read this before adding or changing a block.

## Layers

| Layer      | Where                                                                | Rules                                                                                                                                                                                                                                                                                                            |
| ---------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primitives | `src/components/ui/`                                                 | All styling decisions: `button.tsx` (every button/link recipe), `layout.tsx` (section shell, tones, spacing, containers, rings, gold bar), `typography.tsx` (eyebrow, heading, headline text), `card.tsx` (cards, icon chips), `icon.tsx` (curated lucide set, arrow glyph), `rich-text.tsx`, `media-image.tsx`. |
| Sections   | `src/components/sections/<name>.tsx` (+ `<name>-*.tsx` client parts) | Composed from primitives. Props are derived from the block's generated type. **No Payload runtime imports** (type-only imports from `@/payload-types` are fine). No visitor-facing text.                                                                                                                         |
| Blocks     | `src/blocks/<slug>/config.ts` + `src/blocks/<slug>/component.tsx`    | `config.ts` maps editor fields; `component.tsx` is a server adapter: `({ block }) => <Section {...block} {...fetchedData} />`. Only adapters (and `src/lib/`) talk to Payload.                                                                                                                                   |

`src/app/(frontend)/[[...segments]]/page.tsx` loads a page by path and renders its `layout` through `src/blocks/render.tsx`.

## Adding a block

1. `src/blocks/<slug>/config.ts` exporting `XBlock: Block` with `slug`, `interfaceName: "<Pascal>Block"`, Spanish `labels`, and `admin.group`.
2. Register it in **your group file** `src/blocks/groups/<group>.ts` (never in `src/blocks/index.ts`).
3. `pnpm generate:types` to get the `<Pascal>Block` interface in `src/payload-types.ts`.
4. `src/components/sections/<name>.tsx`: `export type XProps = Omit<XBlock, "blockType" | "blockName" | "id"> & { ...fetched data }`.
5. `src/blocks/<slug>/component.tsx` and register it in `src/blocks/groups/<group>.components.tsx`. The registry type fails the build if a registered block has no renderer.
6. Seed fixtures and guide entries in `src/seed/groups/<group>.ts` (below).

## Fields (`src/payload/fields/index.ts`)

Always build fields with these helpers so blocks stay consistent:

- `variant(options, { defaultValue })`: a named design variant. Editors choose among variants the design already uses. **Never** add free color, spacing, size or class-name fields.
- `sectionSettings({ tones, defaultTone })`: the `settings` group with an anchor id and, when a block allows more than one, a background tone restricted to that block's tones.
- `text(name, label, { required, textarea, description })`, `richText(name, label)`, `headline(name, label, { highlight })`, `sectionHeader({ eyebrow, intro, highlight })`.
- `link({ required })`: a labelled link to a site page (plus optional anchor), a custom URL, or "Correo del sitio" (the main email from site settings, with an optional subject; `src/lib/site-email.ts` fills in its `mailto:` when the document is read). Generated as `CmsLink`; resolve with `resolveLink`/`resolveHref` from `src/lib/links.ts`.
- `media(name, label)`: upload to `media`; alt text is required on the media record.
- `icon(name, label)`: select from the curated set in `src/lib/icons.ts`.
- `array(name, label, singular, fields, opts)`: **use this for every array.** It normalizes missing nested arrays to `[]`, working around payloadcms/payload#19798 (rows saved under the wrong parent in 4.0.0-beta.11).
- `showWhen(field, variantIs("a", "b"))`: hide fields irrelevant to a variant.

All labels, descriptions, option labels and validation messages are Spanish, with correct diacritics, written as plain UTF-8.

## Section components

- **No copy in code.** Every visitor-facing string is a field: headings, body, button labels, aria-labels, sr-only text, placeholders, empty-state text, prefixes like "EJE" or "Enfoque:", screen-reader prefixes. `src/components` and `src/app` must not contain HTML entities (`&oacute;`), `\u00XX` escapes or Spanish phrases. Decorative glyphs (the `→` from `ArrowGlyph`, a `·` separator between items) are not copy.
- **Empty means nothing.** A missing field renders nothing (or the section's designed empty state), never a hardcoded fallback.
- **Parity over tidiness.** Reproduce the baseline exactly: same elements, class strings, inline styles, widths, spacing and breakpoints as the original component (old source: `/Users/marcmaceira/Projects/Clients/adpupr-baseline/src`). Keep both container conventions (`wide` vs `narrow`). If a primitive lacks a recipe you need, add a named entry to the primitive's map as a complete literal class string (Tailwind only emits literal strings), never a computed one.
- **Server components by default.** A client component only where there is interaction; pass data in as props.
- Theme tokens only (`bg-surface`, `text-text-muted`), no hardcoded hex in classes. Inline styles copied from the baseline are allowed where the baseline used them.

## Data

- Block adapters fetch related records through functions in `src/lib/data/<group>.ts` (`import "server-only"`, use `getPayloadClient()` from `src/lib/cms.ts`, `overrideAccess: false` for public reads, and `isDraftMode()` for drafts on collections with drafts).
- Shared site facts (emails, postal address, social profiles, ATH Móvil link, SEO defaults) come from the `site-settings` global via `getSiteSettings()`. Do not duplicate them in blocks.

## Seed (`src/seed/`)

Each group exports a `GroupSeed` from `src/seed/groups/<group>.ts`:

- `collections(ctx)`: upsert the group's collection records (keyed by a natural id such as a slug or filename) with `ctx.upsert(...)`. Use `inSequence` instead of `await` in loops.
- `globals(ctx)`: update the group's globals.
- `fixtures`: `{ "<blockSlug>.<name>": (ctx) => BlockInput<"<slug>"> }`. `src/seed/pages.ts` composes pages from these keys. Use `ctx.pageId("/path")` for internal links and `ctx.media({ source, alt })` for images (a repo path such as `public/x.png` or an https URL, downloaded once into `.seed-cache/`).
- `guide(ctx)`: block instances covering **every block in every variant**, for the component guide page (`/guia-de-componentes`).
- Rich text: `richText<NonNullable<XBlock["body"]>>("Párrafo.", ["Texto ", bold("negrita"), "."], bullets([...]))` from `src/seed/lexical.ts`.

The seed verifies every page layout round-trips unchanged. Run it with `SEED_ALLOW_MISSING=1 pnpm seed` while other groups' fixtures don't exist yet.

## Lint gotchas (type-aware oxlint)

- No unsafe type assertions (`x as Foo` from a wider type). Use type guards, `typeof` checks, or `Reflect.get` into an `unknown`.
- No `await` inside loops: use `inSequence` (seed) or `Promise.all`.
- No object/array literals as default props; hoist a constant.
- Functions that capture nothing must live at module scope.
- Index keys need a reason comment (`// oxlint-disable-next-line react/no-array-index-key` with a justification), or use a stable id.

Run `npx oxlint --fix`, `npx oxfmt`, then `npx oxlint --deny-warnings --format=agent`, `npx tsc --noEmit -p .` and `pnpm build`.

## Shared files

The orchestrator owns `src/payload.config.ts`, `src/payload/collections/{Pages,Media,Users}.ts`, `src/payload/globals/SiteSettings.ts`, `src/payload/fields/`, `src/blocks/{index,render,types}.ts(x)`, `src/seed/{index,context,pages,settings,lexical,verify}.ts`, `src/app/(frontend)/globals.css` and `src/payload-types.ts` (generated; regenerate, never hand-edit). Propose changes to those in your final report. Exception: you may **append** named recipes to the maps in `src/components/ui/*`.
