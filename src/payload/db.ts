import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import type { DatabaseAdapterObj } from "payload";

const migrationDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../migrations");

/**
 * The single place that picks the database.
 *
 * - `DATABASE_URL=postgres://…` (or `postgresql://…`) uses Postgres: Neon in production.
 *   The schema comes only from the migrations in `src/migrations` (`push: false`), applied
 *   with `pnpm migrate`. Use Neon's direct (non-pooled) connection string for migrations.
 * - Anything else uses SQLite through libSQL; defaults to a local file. Local SQLite keeps
 *   Payload's automatic schema push.
 *
 * `blocksAsJSON` stores block layouts as JSON. It works around a 4.0.0-beta.11 bug
 * (payloadcms/payload#19798) where arrays nested in arrays are saved under the wrong parent.
 */
export function databaseAdapter(): DatabaseAdapterObj {
  const url = process.env.DATABASE_URL ?? "";

  if (/^postgres(ql)?:\/\//.test(url)) {
    return postgresAdapter({
      pool: { connectionString: url },
      blocksAsJSON: true,
      push: false,
      migrationDir,
    });
  }

  return sqliteAdapter({
    client: { url: url || "file:./data/payload.db" },
    blocksAsJSON: true,
  });
}
