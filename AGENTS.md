<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build (Next.js 16 + Turbopack)
pnpm lint         # Oxlint, type-aware + type-check (.oxlintrc.json); warnings fail
pnpm lint:fix     # Oxlint with auto-fixes
pnpm format       # Oxfmt (.oxfmtrc.json)
pnpm format:check # Oxfmt check only
```

No test framework is configured yet.

## Linting and formatting

- After making code changes, run `npx oxlint --fix`, then run `npx oxfmt`.
- Before finishing, run `npx oxlint --deny-warnings --format=agent`.

`.oxlintrc.json` enables the `correctness`, `suspicious`, and `perf` categories plus every rule from `eslint-config-next`. Fix violations instead of disabling rules. The only config-level exception is `react/react-in-jsx-scope`, which is obsolete with the automatic JSX runtime. If an inline `oxlint-disable-next-line` is unavoidable, add a comment explaining why. Unused directives are errors.

## Git

Use Conventional Commits for every commit message (for example, `feat: add membership page` or `fix: correct mobile navigation`).

## Architecture

**Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4 (v4 syntax with `@theme inline`), TypeScript 5, pnpm.

**Language**: All user-facing content is in **Spanish**. Use HTML entities (`&oacute;`) in JSX and Unicode escapes (`\u00F3`) in JS strings for accented characters. Never omit Spanish diacritics.

### Design System (`src/app/globals.css`)

Colors and fonts are defined as CSS custom properties in `:root` and registered in a `@theme inline` block so they work as Tailwind utilities:

- **Brand colors**: primary `#1C376D`, accent blue `#5C93BC`, dark `#0f1f3d`. Gold `#c8a04a` is a POC design accent, not part of the official brand.
- **Color utilities**: `bg-primary`, `bg-primary-light`, `bg-primary-dark`, `bg-accent`, `bg-accent-light`, `bg-bg`, `bg-surface`, `bg-cream`, `text-text`, `text-text-muted`
- **Fonts**: `font-heading` (DM Serif Display), `font-body` (Source Sans 3), `font-be-vietnam-pro` (Be Vietnam Pro, brand logo font) — loaded via `next/font/google` in `layout.tsx`
- **Utility classes**: `.section-padding`, `.gold-rule`, `.card-accent-left`, `.card-accent-top`
- **Logo assets** (`public/`): `logo-clear.png` (transparent bg, white+blue text), `logo-gray.png` (full logo on gray bg). Original JPEGs were removed.

Always use theme tokens (`bg-bg`, `border-primary/10`) instead of hardcoded values (`bg-white`, `border-gray-200`).

### Page Structure (`src/app/page.tsx`)

Single-page site composed of section components rendered in order:

```
Header → Hero → Stats → About → ConferenceCta → LatestVideo → EngagementCtas → CtaBand → Footer
```

All components are **server components** except `header.tsx` (mobile navigation state), `board-members.tsx` (interactive biography overlays), `director-card.tsx` (biography toggle), `contact-form.tsx`, `resource-library.tsx`, and `conference-agenda.tsx`.

### Components (`src/components/`)

Each section is a self-contained file with its own data constants, sub-components, and TypeScript interfaces. Homepage section IDs for anchor navigation: `#inicio`, `#nosotros`, `#conferencia`.

### Key Patterns

- Data arrays use `as const` with `readonly` interfaces
- Cards and list items are extracted as typed sub-components within the same file
- SVG icons are inlined (footer social icons, newsletter document icon)
- Animations respect `prefers-reduced-motion`
- Mobile menu locks body scroll and handles Escape key

### Gotchas

- **`@theme inline` must use direct hex values**, never `var()` references — creates circular CSS custom property definitions that resolve to empty strings
- **Local images**: use `next/image` with a static import (`import logo from "../../public/logo.png"`), not a string path or `<img>`
