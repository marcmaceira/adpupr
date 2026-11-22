import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import type { DatabaseAdapterObj } from "payload";

/**
 * The single place that picks the database.
 *
 * - `DATABASE_URL=postgres://…` (or `postgresql://…`) uses Postgres (production).
 * - Anything else uses SQLite through libSQL; defaults to a local file.
 *
 * `blocksAsJSON` stores block layouts as JSON. It works around a 4.0.0-beta.11 bug
 * (payloadcms/payload#19798) where arrays nested in arrays are saved under the wrong parent.
 */
export function databaseAdapter(): DatabaseAdapterObj {
  const url = process.env.DATABASE_URL ?? "";

  if (/^postgres(ql)?:\/\//.test(url)) {
    return postgresAdapter({ pool: { connectionString: url }, blocksAsJSON: true });
  }

  return sqliteAdapter({
    client: { url: url || "file:./data/payload.db" },
    blocksAsJSON: true,
  });
}
