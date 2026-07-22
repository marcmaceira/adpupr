<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build (Next.js 16 + Turbopack)
pnpm lint         # ESLint (next/core-web-vitals + typescript)
```

No test framework is configured yet.

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
Header → Hero → About → Objectives → Committees → ConferenceCta → Newsletters → Footer
```

All components are **server components** except `header.tsx` (client — uses state for mobile menu and scroll detection).

### Components (`src/components/`)

Each section is a self-contained file with its own data constants, sub-components, and TypeScript interfaces. Section IDs for anchor navigation: `#nosotros`, `#objetivos`, `#comites`, `#conferencia`, `#boletines`.

### Key Patterns

- Data arrays use `as const` with `readonly` interfaces
- Cards and list items are extracted as typed sub-components within the same file
- SVG icons are inlined (footer social icons, newsletter document icon)
- Animations respect `prefers-reduced-motion`
- Mobile menu locks body scroll and handles Escape key

### Gotchas

- **`@theme inline` must use direct hex values**, never `var()` references — creates circular CSS custom property definitions that resolve to empty strings
- **`next/image` may fail to load local PNGs** — if `naturalWidth` is 0, use `<img>` with `eslint-disable-next-line @next/next/no-img-element`
