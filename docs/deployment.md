# Deployment: Vercel, Neon Postgres and Vercel Blob

These are instructions, not a record of deployed changes. No cloud resources were provisioned, no Vercel settings were changed, and this branch was not pushed or deployed during implementation.

## Required production configuration

| Variable                | Purpose                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | Neon Postgres connection string; `POSTGRES_URL` is also supported as a fallback              |
| `PAYLOAD_SECRET`        | Stable random signing secret, at least 32 random bytes; generate with `openssl rand -hex 32` |
| `BLOB_READ_WRITE_TOKEN` | Server-only read/write token for the existing public Vercel Blob store                       |
| `NEXT_PUBLIC_SITE_URL`  | Production's public origin, e.g. `https://www.adpupr.com`; no trailing slash                 |
| `PAYLOAD_DB_PUSH`       | Set to `false` in both Production and Preview                                                |

The app uses Payload 3.90.2 and Next.js 16.3.4. Use Node.js 22 and pnpm. The build command is **`pnpm vercel-build`**, which runs committed database migrations before `next build`. Do not use schema push on deployed databases.

Keep all database and authentication credentials server-only. Never put them in `NEXT_PUBLIC_*`, source files, commits or screenshots. Back up the Neon database and Blob files independently.

### Blob authentication and durability

The previous site's Blob library can use Vercel OIDC. Inspection found `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY`, but **not** `BLOB_READ_WRITE_TOKEN` in the current project.

Payload's official Blob adapter requires a static read/write token. The existing OIDC configuration is not sufficient. Obtain a token for the existing store and add `BLOB_READ_WRITE_TOKEN` to the appropriate environment only after approving the setup. The app deliberately fails on Vercel if this token is absent rather than silently writing uploads to an ephemeral filesystem.

Production files use `cms/media` and `cms/documents`. Originals under `recursos/` and the original portrait URLs remain untouched. Browser uploads go directly to Blob through authenticated upload authorization, avoiding Vercel's 4.5 MB request-body limit. The local filesystem fallback is for development only.

`next.config.ts` currently permits images from the original store, `2yohsk2xwqevfocw.public.blob.vercel-storage.com`. If another Blob store is chosen, add its exact public hostname to the image allowlist before building that environment. Do not use a wildcard for unrelated hosts.

## Preview isolation

**Never assign the production Neon connection string to Preview.** The build runs migrations, and editors can write through the admin/API, so database isolation is essential.

- Give each preview an isolated Neon branch/database and its own credentials. Review which database Vercel's Neon integration selects for each environment and branch.
- Prefer a separate Blob store/token for previews. Update the image allowlist for that store as noted above. Copying a database while sharing production Blob credentials is not file isolation: deleting a copied file record can delete the shared production object.
- Until isolated preview storage is configured, use the local preview for editing/upload QA rather than experimenting against the production store.
- Scope `NEXT_PUBLIC_SITE_URL` to **Production**, not globally. With it unset in Preview, Payload uses `VERCEL_URL` for its deployment origin, so its file URLs and authentication stay on the preview deployment.
- Search canonicals use `VERCEL_PROJECT_PRODUCTION_URL` when available. `VERCEL_ENV=preview` adds no-index metadata and blocks crawling in `robots.txt`.
- Keep Preview deployments access-protected. Preview migrations must run only against that preview's database.

Neither Neon branches nor preview Blob stores have been provisioned as part of this work.

## Initial cutover

Perform these steps only after approving infrastructure changes and deployment.

1. **Back up and approve the target.** Record the existing deployment, back up any database/content, and confirm the exact Neon database and Blob store. Keep the old public files and deployment available for rollback.
2. **Connect Neon.** Use the Vercel Marketplace integration, then verify the environment scopes and which variable it supplies. This config prefers `DATABASE_URL`, with `POSTGRES_URL` as fallback. Use Neon's TLS connection settings. A direct/unpooled connection is preferable for maintenance scripts; temporarily override `DATABASE_URL` with that connection when running them if needed.
3. **Add the Payload secret and Blob token.** Set the production variables above. Keep the signing secret stable across deployment revisions. Do not rotate it casually: rotation invalidates active sessions.
4. **Migrate before seeding.** From a trusted terminal with the intended production environment loaded:

   ```bash
   NODE_ENV=production PAYLOAD_DB_PUSH=false pnpm migrate
   NODE_ENV=production PAYLOAD_DB_PUSH=false pnpm payload migrate:status
   ```

5. **Seed and import before exposing the CMS-driven site.** Review the resource inventory, then explicitly authorize remote writes:

   ```bash
   pnpm import:resources --from-blob --dry-run
   NODE_ENV=production PAYLOAD_DB_PUSH=false CMS_ALLOW_REMOTE_WRITES=true pnpm seed
   NODE_ENV=production PAYLOAD_DB_PUSH=false CMS_ALLOW_REMOTE_WRITES=true pnpm import:resources --from-blob
   ```

   `--from-blob` reads the current `recursos/` inventory, including files added since the checked-in public snapshot. It must read the original Blob store. All imports are non-destructive and idempotent: source URLs identify previously imported files, and existing editorial content is skipped. The environment opt-in is an explicit safety acknowledgement, not an automatic deployment setting.

6. **Bootstrap the administrator privately.** The first-user endpoint is intentionally open until the first account exists. Do not expose an uninitialized admin panel publicly. With schema push disabled, build/start a private local instance against the approved database and create the first account at `/admin`, or keep the candidate deployment access-protected until the owner creates the account. Stop the private maintenance instance afterward. Confirm the account has the Administrator role and create individual Editor accounts.
7. **Build the candidate.** Set Vercel's build command to `pnpm vercel-build`. Migrations already applied are skipped. The database must be reachable at build time: pages and sitemap are prerendered from published CMS content. A production build needs a seeded database to preserve the existing site; the build does not automatically seed or overwrite content.
8. **Check before switching traffic.** Review all eight routes on mobile and desktop, menu links, portraits, document downloads, drafts/publish, live preview and editor permissions. Confirm upload storage and read the Blob-specific checklist below.
9. **Cut over with approval.** Promote the reviewed deployment or merge/deploy according to the team's process. Verify production again, then retain backups and originals. Do not delete the legacy Blob files as part of cutover.

Do not migrate the same production database concurrently from several unrelated deployment jobs. For future schema changes, use backward-compatible migrations so a failed/new build does not break the previous live deployment.

## Before declaring production ready

The local checks cannot verify cloud credentials, Vercel upload authorization or large direct-to-Blob uploads. On an approved deployment, check:

- An Editor can upload a valid image and a document larger than 4.5 MB, and both remain available after a new deployment.
- Unauthenticated Blob upload-token requests are denied; an invalid/expired session cannot upload.
- All generated image sizes and document links use the intended store and `cms/` prefixes.
- Preview edits/deletions cannot modify the production database or production files.
- A browser on the HTTPS deployment can open authenticated draft/live preview and exit back to published content. Draft Mode cookies are secure in production; plain-HTTP local production QA must emulate browser metadata/cookie state rather than weakening production checks.
- Published new pages appear immediately, including in the sitemap; draft content is absent from public API responses.
- The first admin already exists and public registration is closed.

### Password recovery and contact email

No outbound email adapter is configured. Payload's default logs email instead of delivering it. Before relying on password-recovery email, configure a supported Payload email adapter (SMTP/Nodemailer, Resend or another approved provider), set a verified sender, and test password reset end-to-end. Until then, administrators must manage password changes directly. Do not expose recovery logs.

The public contact form is unchanged in behavior: it opens a `mailto:` message in the visitor's application. It is not an email-delivery service or a stored submission form.

## Operational limitations

- Page publication is manual; there is no scheduler/cron dependency.
- Changing a slug does not create a redirect or update menus automatically.
- Menu, site-setting, committee and file changes are immediate, not page drafts.
- The legacy `/nosotros#colaboradores` link has no matching content. Remove or correct it after an editorial decision; this migration did not invent a collaborators page.
- A database rollback alone does not restore deleted Blob files. Retain file backups and avoid destructive schema migrations during rollout.
