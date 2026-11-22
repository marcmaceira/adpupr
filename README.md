# ADPUPR website

The site of the Asociación de Administración Pública de Puerto Rico ([adpupr.com](https://www.adpupr.com)). Next.js 16 with Payload CMS 4 (beta): every page, the menu, the footer and the shared site facts are edited in the admin panel, **ADPUPR CMS** (in English; the site content is Spanish), or through an AI assistant connected over MCP.

Architecture and conventions for developers: [`AGENTS.md`](AGENTS.md) and [`docs/block-contract.md`](docs/block-contract.md).

## Run it locally

Requirements: Node `^24.22.3 || >=26.13.1` (`nvm use` reads `.nvmrc`) and pnpm.

```bash
pnpm install
cp .env.example .env    # then fill in the values (see below)
pnpm seed               # creates data/payload.db and all content
pnpm dev                # http://localhost:3000, admin at http://localhost:3000/admin
```

`.env` needs:

| Variable                                  | Purpose                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `PAYLOAD_SECRET`                          | Long random string; signs admin sessions.                                                        |
| `PREVIEW_SECRET`                          | Random string shared by the admin preview links and `/next/preview`.                             |
| `DATABASE_URL`                            | `file:./data/payload.db` locally (SQLite); the Neon Postgres URL in production.                  |
| `NEXT_PUBLIC_SERVER_URL`                  | Public origin, e.g. `http://localhost:3000` or `https://www.adpupr.com`.                         |
| `USE_VERCEL_BLOB`                         | Leave empty locally. Set to `true` in production to store uploads in Vercel Blob (under `cms/`). |
| `BLOB_READ_WRITE_TOKEN`                   | Vercel Blob token. The seed reads the existing resource files with it; it never writes.          |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | First administrator, created by `pnpm seed`.                                                     |
| `SEED_MCP_EMAIL`, `SEED_MCP_API_KEY`      | Optional: the AI assistant user and its API key, created by `pnpm seed`.                         |

`pnpm seed` is the migration: it rebuilds every page, global, collection and image from an empty database and can be re-run safely (it updates records in place).

## Editing content

Sign in to ADPUPR CMS at `/admin`.

- **Pages**: each page is a list of sections (blocks). Open a page, change text in the **Content** tab, and click **Publish changes**. The change is live on the next page load. Edits save as drafts automatically; **Preview** shows the draft before publishing, and **Versions** keeps the history.
- **New page**: **Pages → Create New**, give it a title and a path (for example `/eventos` or `/nosotros/aliados`), add sections with **Add Section**, and publish. The page `/guia-de-componentes` shows every available section in every variant.
- **Documents** and **Document Categories**: the files of the Recursos library. Upload, title, categorize or delete them here.
- **People** and **Committees**: board members, founders and committees. A person exists once; their portrait and biography update everywhere.
- **Header**, **Footer** and **Site Settings**: menu, footer, emails, postal address, social profiles, the ATH Móvil link and SEO defaults.

## Who can do what

|                                                                                      | Visitors (not signed in) | AI assistant (MCP) | Editor                                              | Admin                                      |
| ------------------------------------------------------------------------------------ | ------------------------ | ------------------ | --------------------------------------------------- | ------------------------------------------ |
| Published pages, people, committees, documents, media, header, footer, site settings | Read                     | Read, create, edit | Read, create, edit, delete                          | Everything                                 |
| Drafts and version history                                                           | No                       | Read               | Read                                                | Read                                       |
| Users                                                                                | No                       | Read own account   | Read and edit own account (not its role or API key) | Create, edit, delete, unlock, set API keys |
| Admin panel                                                                          | No                       | No                 | Yes                                                 | Yes                                        |

Visitors can't create, edit or delete anything. After 5 failed sign-ins an account is locked for 15 minutes; an admin can unlock it. Uploads accept PDFs and JPEG, PNG, WebP, AVIF or GIF images (no SVG), up to 25 MB. GraphQL is turned off; the site and the admin use the REST API.

## Connect Claude Desktop (MCP)

The site exposes Payload's official MCP endpoint at `/api/mcp` (Streamable HTTP). An AI client can then read and edit pages, globals, documents, people and committees, with the permissions of the user whose API key it uses.

### 1. Create a scoped API key

Use a dedicated user with the **AI assistant (MCP)** role. It can read and edit content, but cannot delete anything, manage users, or sign in to the admin panel.

An admin does these steps; editors can't create users or API keys.

1. In the admin, open **Users → Create New** (or the user created by `pnpm seed` from `SEED_MCP_EMAIL`).
2. Set **Role** to **AI assistant (MCP)** and save.
3. Enable the **API key** option on that user, generate a key, copy it and save.

The client authenticates with the header `Authorization: users API-Key <KEY>`.

### 2. Configure Claude Desktop

Claude Desktop launches local MCP servers, so it reaches the site through [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), a small bridge that runs with `npx` (Node is required on the computer). Open **Settings → Developer → Edit Config**, add the server to `claude_desktop_config.json`, and restart Claude Desktop:

```json
{
  "mcpServers": {
    "adpupr": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://www.adpupr.com/api/mcp",
        "--header",
        "Authorization:${ADPUPR_MCP_AUTH}"
      ],
      "env": {
        "ADPUPR_MCP_AUTH": "users API-Key PASTE-THE-KEY-HERE"
      }
    }
  }
}
```

The header value goes in `env` because some clients split arguments on spaces. For local testing, use `http://localhost:3000/api/mcp` as the URL.

Clients that support remote HTTP servers with headers can connect directly, for example Claude Code:

```bash
claude mcp add --transport http adpupr https://www.adpupr.com/api/mcp \
  --header "Authorization: users API-Key <KEY>"
```

### 3. Use it

Ask, for example: "En la página de inicio, cambia el antetítulo del encabezado por …". The assistant finds the page by its `path`, edits it as a draft and then publishes it. Changes appear on the site on the next page load.

To check the connection from a terminal, run the demo client (it lists the tools, edits the home page eyebrow as a draft, publishes it, and confirms the change in the page HTML):

```bash
node --env-file=.env scripts/mcp-demo.mjs / "Nuevo antetítulo"
```

## Deploying

Production runs on Vercel with a **Neon Postgres** database and Vercel Blob for uploads.

### Database schema (migrations)

On Postgres the schema comes only from the migrations in `src/migrations/`; Payload never changes it automatically (`push: false`). Locally, SQLite keeps Payload's automatic schema sync, so day-to-day work needs no migrations.

- **Apply migrations:** `pnpm migrate` with `DATABASE_URL` set to the Neon **direct** connection string (the host without `-pooler`). Run it before deploying code that includes a new migration. It does nothing when the database is already up to date; `pnpm migrate:status` lists what has run.
- **After changing a collection, global, block or field:** create a migration against a Postgres database that already has every earlier migration applied, review it, and commit it with the change:

  ```bash
  docker run -d --name adpupr-pg -e POSTGRES_PASSWORD=dev -p 127.0.0.1:55432:5432 postgres:17-alpine
  export DATABASE_URL=postgres://postgres:dev@127.0.0.1:55432/postgres
  pnpm migrate                          # bring the scratch database up to date
  pnpm migrate:create describe-change   # writes src/migrations/<timestamp>_describe-change.ts
  ```

  A Neon branch of production works in place of Docker.

- The build doesn't need the database, so `pnpm build` works before or after migrating.

### First deploy

1. In Vercel, set `DATABASE_URL` (Neon pooled connection string, for the running site), `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL=https://www.adpupr.com`, `USE_VERCEL_BLOB=true` and `BLOB_READ_WRITE_TOKEN`.
2. From a terminal, with the Neon direct connection string as `DATABASE_URL` and `USE_VERCEL_BLOB=true`: `pnpm migrate`, then `pnpm seed` once. The seed creates the admin (and optionally the AI assistant) from the `SEED_*` variables and uploads the site images and documents to Blob under `cms/`.
3. Deploy. Then sign in, create the AI assistant's API key, and check that `/api/media/file/…` and `/api/documents/file/…` load.

Preview deployments should use their own Neon branch, not the production database.
