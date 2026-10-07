# CMS verification

## Verified locally

On `feat/payload-cms`:

- Payload type and admin import-map generation.
- Oxlint with type-aware/type-check mode and denied warnings; Oxfmt check; `git diff --check`.
- Optimized Next.js production build with static published pages, dynamic admin/API/authenticated preview, robots and sitemap.
- Initial migration applied to an independent empty PostgreSQL database with schema push disabled; migration status reports applied.
- Seed and resource import rerun without duplicating or overwriting content.
- Editor preview database contains 8 pages, 3 committees, 4 document categories, 16 images and 17 documents. No initial account/password was generated.
- All eight public routes inspected at 390×844 and 1440×900: one main heading per page, no horizontal overflow, no broken images, no browser page errors. Photos loaded before full-page captures.
- Native pointer/keyboard checks: mobile navigation opens, locks body scrolling and closes with Escape; desktop dropdown opens/closes; biographies open on both screen sizes and Escape restores focus. Resource category filters, title search and empty state work. Agenda expands/collapses with its CMS-supplied activities. Contact form validation and its native submit handler work (email delivery remains the visitor's responsibility).
- Spanish admin, grouped 24-block picker, section fields and embedded preview inspected. A production build configured for its actual port-3003 origin accepted a native login cookie without an Authorization override. Editing a headline updated the live-preview iframe while the public homepage retained its published headline; exiting preview restored published content.

### Automated checks

`pnpm test` runs five checks for safe nested slugs, safe editor URLs, the original page/payment/agenda snapshot, the public resource inventory and CLI flag forwarding. The CLI regression check verifies `--dry-run` with no database credentials, `--from-blob` without Blob credentials, and fail-closed handling of misspelled flags.

`src/tests/cms.integration.ts` runs five destructive integration scenarios **only** on an isolated local server/database at `http://192.168.9.4:3003`. It refuses other origins and requires `CMS_TEST_ALLOW_WRITES=true`:

```bash
CMS_TEST_BASE_URL=http://192.168.9.4:3003 CMS_TEST_ALLOW_WRITES=true \
  pnpm exec tsx --test src/tests/cms.integration.ts
```

Use a fresh, migrated and seeded disposable database for that server. Do not use the editor's local database, production, or an existing team account database. The suite creates throwaway accounts/content; it is not a read-only health check. It intentionally does not run as part of `pnpm test`.

The scenarios verify:

1. The first account becomes an administrator and further bootstrap registration is denied.
2. Editors can edit pages but cannot create/manage other users or promote themselves.
3. Drafts are absent from public queries; preview requires authentication and a valid page path; a Draft Mode cookie without authentication reveals no draft; public version access is denied.
4. New pages publish without rebuilding; section reorder/removal revalidates; subsequent drafts remain private even through the public API's `draft=true`; sitemap includes new published pages.
5. Valid PDF upload/category/download works; anonymous uploads and SVG uploads are rejected.

The suite uses browser-style Fetch Metadata headers for plain-HTTP production-mode LAN QA and writes temporary authenticated browser state under `/tmp`, not the repository. Native-cookie browser QA used Chrome's `--unsafely-treat-insecure-origin-as-secure` flag scoped only to that disposable HTTP origin, allowing browser Fetch Metadata and secure-cookie behavior without weakening the application's production CSRF configuration. This is a test-browser workaround, not a deployment setting. Tests against the actual HTTPS Vercel deployment remain a separate approval-gated step.

## Not verified or performed

- No Neon/Vercel infrastructure changes, environment updates, push or deployment.
- No production migration, seed, upload or file deletion.
- No direct-to-Vercel-Blob upload test or large-file cloud test: production token credentials are not configured locally.
- No delivered password-recovery email test: an email adapter is not configured.
- No automated pixel-perfect comparison. Existing content and visual hierarchy were migrated and inspected, with deliberate generalization into reusable CMS blocks.

See [deployment.md](deployment.md) for the outstanding production checks and safe cutover sequence.
