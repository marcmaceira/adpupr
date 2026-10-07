<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
pnpm dev --hostname 192.168.9.4 --port 3002 # Private-network preview
pnpm build        # Production build (Next.js 16 + Turbopack)
pnpm vercel-build # Payload migrations, then production build
pnpm lint         # Oxlint, type-aware + type-check (.oxlintrc.json); warnings fail
pnpm lint:fix     # Oxlint with auto-fixes
pnpm format       # Oxfmt (.oxfmtrc.json)
pnpm format:check # Oxfmt check only
```

`pnpm test` runs the unit suite with `node:test` and `tsx`. The destructive API integration suite in `src/tests/cms.integration.ts` is opt-in and must run only against its isolated local server/database on port 3003; never point it at the editor preview or production. See `docs/cms-verification.md`.

## Linting and formatting

- After making code changes, run `npx oxlint --fix`, then run `npx oxfmt`.
- Before finishing, run `npx oxlint --deny-warnings --format=agent`.

`.oxlintrc.json` enables the `correctness`, `suspicious`, and `perf` categories plus every rule from `eslint-config-next`. Fix violations instead of disabling rules. The only config-level exception is `react/react-in-jsx-scope`, which is obsolete with the automatic JSX runtime. If an inline `oxlint-disable-next-line` is unavoidable, add a comment explaining why. Unused directives are errors.

## Git

Use Conventional Commits for every commit message (for example, `feat: add membership page` or `fix: correct mobile navigation`).

## Architecture

**Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4 (v4 syntax with `@theme inline`), TypeScript 7, pnpm, Payload CMS 3, Postgres and Vercel Blob.

**Language**: All user-facing content is in **Spanish**. Use HTML entities (`&oacute;`) in JSX and Unicode escapes (`\u00F3`) in JS strings for accented characters. Never omit Spanish diacritics.

### Design System (`src/app/(frontend)/globals.css`)

Colors and fonts are defined as CSS custom properties in `:root` and registered in a `@theme inline` block so they work as Tailwind utilities:

- **Current design colors**: primary `#0d285b`, sky `#75bdf0`, mustard `#ffd258`, dark `#061331`. Preserve the existing site's palette during CMS changes.
- **Color utilities**: `bg-primary`, `bg-primary-700`, `bg-primary-900`, `bg-sky-50`, `bg-mustard`, `bg-bg`, `bg-surface`, `bg-surface-2`, `text-text`, `text-text-muted`, `text-text-on-dark`, `border-border`
- **Fonts**: `font-heading` (Be Vietnam Pro), `font-body` (Open Sans) — loaded via `next/font/google` in the frontend layout
- **Utility classes**: `.eyebrow`, `.eyebrow-on-dark`, `.h-display`, `.h-section`, `.lede`, `.card`
- **Logo assets** (`public/`): `logo-clear.png` (transparent bg, white+blue text), `logo-gray.png` (full logo on gray bg). Original JPEGs were removed.

Always use theme tokens (`bg-bg`, `border-primary/10`) instead of hardcoded values (`bg-white`, `border-gray-200`).

### CMS and Page Structure

Separate root layouts: `src/app/(frontend)/` owns the website; `src/app/(payload)/` owns `/admin` and `/api`. Keep metadata routes `robots.ts` and `sitemap.ts` at `src/app/` (outside route groups).

`(frontend)/page.tsx` renders the CMS page with slug `inicio`; `(frontend)/[...slug]/page.tsx` renders published nested/new pages. `src/lib/page-view.tsx` wraps `RenderBlocks`, while `src/lib/cms.ts` handles access-aware content queries. Header/footer/site settings are Payload globals. Production content lives in Postgres, not `src/seed/content.ts`.

`src/blocks/*-blocks.ts` defines the 24 editorial section schemas; matching `*-components.tsx` files render them. Add a block to `src/blocks/index.ts` and the exhaustive renderer, then regenerate Payload types and create a migration. Preserve editor-owned content; seed/import scripts are idempotent and never overwrite existing pages or globals.

Most renderers are **server components**. Client components handle mobile navigation, people/committee biography toggles, conference agenda, contact form, resource filtering, and live-preview refresh.

### Components (`src/components/`)

Shared typed components receive CMS content as props. Homepage section IDs remain `#inicio`, `#nosotros`, and `#conferencia`; editorial anchor IDs are optional on other sections. Use `CmsLink` and the safe URL helpers for editor-supplied links.

### Key Patterns

- Data arrays use `as const` with `readonly` interfaces
- Cards and list items are extracted as typed sub-components within the same file
- SVG icons are inlined (footer social icons, newsletter document icon)
- Animations respect `prefers-reduced-motion`
- Mobile menu locks body scroll and handles Escape key

### Gotchas

- **`@theme inline` must use direct hex values**, never `var()` references — creates circular CSS custom property definitions that resolve to empty strings
- **Bundled images**: use `next/image` with a static import, not a string path or `<img>`. **CMS images** use Payload relationships and `src/lib/media.ts`; that helper normalizes local file URLs and supplies dimensions.
- **Generated files**: regenerate `src/payload-types.ts` and the admin import map instead of hand-editing them. Commit migrations and generated files alongside schema changes.
- **Database safety**: deployed databases require `PAYLOAD_DB_PUSH=false` and committed migrations. Preview databases must be isolated from production. Do not run the seed/import against a remote database or Blob without approval and `CMS_ALLOW_REMOTE_WRITES=true`.
- **Upload durability**: Vercel requires `BLOB_READ_WRITE_TOKEN`; OIDC-only Blob configuration is insufficient for Payload's adapter. `uploads/` is a local-only fallback, ignored by Git.
- **Draft access**: preview requires both Next Draft Mode and a verified Payload session. Never infer authentication from the draft cookie alone or weaken production CSRF checks for plain-HTTP QA.
