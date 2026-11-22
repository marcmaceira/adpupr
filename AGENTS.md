<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
pnpm dev                 # Dev server (http://localhost:3000); admin at /admin
pnpm build               # Production build (Next.js 16 + Turbopack)
pnpm start               # Serve the production build
pnpm seed                # Rebuild all content from an empty database (idempotent)
pnpm migrate             # Apply src/migrations to the Postgres DATABASE_URL (Neon in production)
pnpm migrate:create <n>  # New migration; run against Postgres after any schema change (see README)
pnpm generate:types      # Regenerate src/payload-types.ts after any Payload config change
pnpm generate:importmap  # Regenerate the admin import map after adding admin components
pnpm lint                # Oxlint, type-aware + type-check (.oxlintrc.json); warnings fail
pnpm format              # Oxfmt (.oxfmtrc.json)
```

Node `^24.22.3 || >=26.13.1` (see `.nvmrc`). No test framework is configured; the seed verifies that every page layout round-trips through the database.

## Linting and formatting

- After making code changes, run `npx oxlint --fix`, then run `npx oxfmt`.
- Before finishing, run `npx oxlint --deny-warnings --format=agent`.

`.oxlintrc.json` enables the `correctness`, `suspicious`, and `perf` categories plus every rule from `eslint-config-next`. Fix violations instead of disabling rules. The only config-level exception is `react/react-in-jsx-scope`, which is obsolete with the automatic JSX runtime. If an inline `oxlint-disable-next-line` is unavoidable, add a comment explaining why. Unused directives are errors. Generated files (`src/payload-types.ts`, `src/app/(payload)/**`) are ignored by both tools.

## Git

Use Conventional Commits for every commit message (for example, `feat: add membership page` or `fix: correct mobile navigation`).

## Architecture

**Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4 (`@theme inline`), TypeScript 7, Payload CMS 4.0.0-beta.11 (every `payload`/`@payloadcms/*` package pinned to the same exact version), pnpm.

**Content lives in Payload, not in code.** Every page, the header, the footer and the site settings are edited in the admin (`/admin`, in English) or through MCP. `src/components` and `src/app` contain no visitor-facing copy: no Spanish phrases, no HTML entities, no `\u00XX` escapes. Seed data (`src/seed/`) is Spanish, plain UTF-8 with correct diacritics. Admin labels, descriptions and validation messages (`src/payload/`, `src/blocks/*/config.ts`) are English; Spanish appears there only in examples of what an editor types.

### Layout

```
src/
  payload.config.ts            Payload config (collections, globals, plugins, storage)
  payload/                     db.ts (SQLite/Postgres switch), access.ts (roles), editor.ts (Lexical),
                               fields/ (shared field builders), collections/, globals/
  blocks/<slug>/               config.ts (Payload block) + component.tsx (server adapter)
  blocks/groups/               block and renderer registration, one file pair per group
  blocks/render.tsx            renders a page layout through the typed registry
  components/ui/               design primitives: every styling decision lives here
  components/sections/         sections composed from primitives (no Payload runtime imports)
  components/layout/           site header, footer, live preview listener
  lib/                         cms.ts (Payload reads), data/<group>.ts, links, metadata, icons
  seed/                        the migration: users, pages, globals, collections, media
  app/(frontend)/              site: layout (fonts, skip link, JSON-LD, header/footer),
                               [[...segments]]/page.tsx (every CMS page), not-found, preview routes
  app/(payload)/               Payload admin and API (generated glue; do not edit)
  app/sitemap.ts, robots.ts    sitemap from published pages; robots
docs/block-contract.md         how blocks, fields, sections and seed data fit together
```

### Pages and blocks

- Every URL is a document in the `pages` collection, found by its `path` (`/`, `/nosotros/quienes-somos`, …) and rendered from its `layout` of blocks. Pages render dynamically on each request, so published edits show without a rebuild. Drafts, autosave, version history and live preview are enabled.
- Read `docs/block-contract.md` before adding or changing a block. In short: primitives → sections → blocks; editors choose named variants only (never free colors, spacing or classes); shared field groups come from `src/payload/fields`; always use the `array()` helper (works around a beta nested-array bug).
- The seeded `/guia-de-componentes` page (noindex, not in the sitemap) shows every block in every variant.

### Collections and globals

- Collections: `pages`, `people`, `committees`, `documents` (resource library files), `document-categories`, `media` (images, alt text required), `users` (roles: admin, editor, ai).
- Access (`src/payload/access.ts`): visitors only read published content; `staff` (any account with a role) creates and edits content and reads drafts and versions; only admins and editors delete; only admins manage users, unlock accounts and set API keys (the `apiKey` field override in `Users.ts`). The AI role can't sign in to the admin or change any user. Every collection and global sets `readVersions: staff`, since versions include unpublished drafts. Logins lock after 5 failures. Uploads are PDFs and raster images only (`src/payload/upload.ts`); GraphQL is disabled; `csrf` and `cors` allow only `NEXT_PUBLIC_SERVER_URL`.
- The admin is branded **ADPUPR CMS**: `admin.meta`, `admin.components.graphics` (`src/payload/admin/`), styles in `src/app/(payload)/custom.css`. `poweredByHeader: false` in `next.config.ts` drops the X-Powered-By header.
- Globals: `header`, `footer`, `site-settings` (organization, emails, postal address, social profiles, ATH Móvil link, SEO defaults, 404 copy). Facts shown in more than one place live in `site-settings`.

### Environment

- `DATABASE_URL`: `file:./data/payload.db` (SQLite, default, schema synced automatically) or `postgres://…` (Neon in production). Chosen in `src/payload/db.ts` only. On Postgres the schema comes only from `src/migrations/` (`push: false`): **any change to a collection, global, block or field needs a new migration** (`pnpm migrate:create`, against Postgres; see the README). Migration files are generated and excluded from oxlint and oxfmt.
- `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL`.
- `USE_VERCEL_BLOB=true` turns on Vercel Blob for uploads (prefixes `cms/media`, `cms/documents`). `BLOB_READ_WRITE_TOKEN` alone never enables it.
- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_MCP_EMAIL`, `SEED_MCP_API_KEY` for the seed.

### Design system (`src/app/(frontend)/globals.css`)

Colors and fonts are CSS custom properties in `:root`, registered in a `@theme inline` block so they work as Tailwind utilities:

- **Brand colors**: primary `#0d285b` (with 700/900/300/100), sky `#75bdf0` (600/200/50), mustard `#ffd258` (600/200); neutrals `bg`, `surface`, `surface-2`, `text`, `text-muted`, `text-faint`, `text-on-dark`, `text-on-dark-muted`, `border`, `border-strong`.
- **Fonts**: `font-heading` (Be Vietnam Pro) and `font-body` (Open Sans), loaded with `next/font/google` in `src/app/(frontend)/layout.tsx`.
- **Utility classes**: `.eyebrow` (+ `-on-dark`, `-on-mustard`, `-on-mustard-deep`), `.h-display`, `.h-section`, `.lede`, `.card`, `.section`, `.dir-card`.

Always use theme tokens (`bg-bg`, `border-primary/10`) instead of hardcoded values (`bg-white`, `border-gray-200`).

### Key patterns

- Server components by default; client components only for interaction (`site-header`, the agenda, the board bio overlay, director card, contact form, resource library browser), with data passed as props.
- Animations respect `prefers-reduced-motion`. The mobile menu locks body scroll and closes on Escape.
- Images come from Payload media and render with `next/image` (`MediaImage`); alt text comes from the media record.

### Gotchas

- **`@theme inline` must use direct hex values**, never `var()` references: it creates circular custom property definitions that resolve to empty strings.
- **Payload 4 is not Payload 3.** Check `node_modules/payload/dist/index.bundled.d.ts` and the v4 docs. Local API calls run access control by default (pass `overrideAccess: true` in scripts); storage adapters go in `storage: []`; admin translations come from `payload/i18n/<lang>` (the admin uses `en`).
- **The `payload` CLI needs `"type": "module"`** in `package.json` (present).
- **MCP edits to pages**: always pass `draft: true`, then publish in a separate update with `data: { _status: "published" }`. An update without `draft` on a page with a pending draft unpublishes it (payloadcms/payload#19670).
