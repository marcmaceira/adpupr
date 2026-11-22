# ADPUPR website

The site of the Asociación de Administración Pública de Puerto Rico ([adpupr.com](https://www.adpupr.com)). Next.js 16 with Payload CMS 4 (beta): every page, the menu, the footer and the shared site facts are edited in the admin panel, in Spanish, or through an AI assistant connected over MCP.

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
| `DATABASE_URL`                            | `file:./data/payload.db` locally; a `postgres://…` URL in production.                            |
| `NEXT_PUBLIC_SERVER_URL`                  | Public origin, e.g. `http://localhost:3000` or `https://www.adpupr.com`.                         |
| `USE_VERCEL_BLOB`                         | Leave empty locally. Set to `true` in production to store uploads in Vercel Blob (under `cms/`). |
| `BLOB_READ_WRITE_TOKEN`                   | Vercel Blob token. The seed reads the existing resource files with it; it never writes.          |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | First administrator, created by `pnpm seed`.                                                     |
| `SEED_MCP_EMAIL`, `SEED_MCP_API_KEY`      | Optional: the AI assistant user and its API key, created by `pnpm seed`.                         |

`pnpm seed` is the migration: it rebuilds every page, global, collection and image from an empty database and can be re-run safely (it updates records in place).

## Editing content

Sign in at `/admin`.

- **Páginas**: each page is a list of sections (blocks). Open a page, change text in the **Contenido** tab, and click **Publicar cambios**. The change is live on the next page load. Edits save as drafts automatically; **Previsualizar** shows the draft before publishing, and **Versiones** keeps the history.
- **New page**: **Páginas → Crear**, give it a title and a path (for example `/eventos` or `/nosotros/aliados`), add sections with **Añadir Sección**, and publish. The page `/guia-de-componentes` shows every available section in every variant.
- **Documentos** and **Categorías de documentos**: the files of the Recursos library. Upload, title, categorize or delete them here.
- **Personas** and **Comités**: board members, founders and committees. A person exists once; their portrait and biography update everywhere.
- **Encabezado**, **Pie de página** and **Configuración del sitio**: menu, footer, emails, postal address, social profiles, the ATH Móvil link and SEO defaults.

## Connect Claude Desktop (MCP)

The site exposes Payload's official MCP endpoint at `/api/mcp` (Streamable HTTP). An AI client can then read and edit pages, globals, documents, people and committees, with the permissions of the user whose API key it uses.

### 1. Create a scoped API key

Use a dedicated user with the **Asistente IA (MCP)** role. It can read and edit content, but cannot delete anything, manage users, or sign in to the admin panel.

1. In the admin, open **Usuarios → Crear** (or the user created by `pnpm seed` from `SEED_MCP_EMAIL`).
2. Set **Rol** to **Asistente IA (MCP)** and save.
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

Production needs a hosted Postgres database (`DATABASE_URL`), Vercel Blob enabled for uploads (`USE_VERCEL_BLOB=true` plus the token), the environment variables above, and a first run of `pnpm seed` against the production database. See the deployment notes in the project handover.
