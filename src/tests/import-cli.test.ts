import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import resources from "@/seed/resources.json";

function runImport(...flags: string[]) {
  return spawnSync("pnpm", ["import:resources", ...flags], {
    cwd: process.cwd(),
    encoding: "utf8",
    timeout: 45_000,
    env: {
      ...process.env,
      // No database or Blob access is needed for the checked-in inventory.
      NODE_ENV: "development",
      DATABASE_URL: "",
      POSTGRES_URL: "",
      BLOB_READ_WRITE_TOKEN: "",
      BLOB_STORE_ID: "",
      VERCEL_OIDC_TOKEN: "",
      VERCEL: "",
      CMS_ALLOW_REMOTE_WRITES: "",
    },
  });
}

await test("the import CLI forwards flags and dry-run never connects or writes", () => {
  const dryRun = runImport("--dry-run");
  assert.equal(dryRun.error, undefined);
  assert.equal(dryRun.status, 0, dryRun.stderr);
  const inventory: unknown = JSON.parse(dryRun.stdout);
  assert.deepEqual(inventory, resources.documents);

  // With no credentials, this flag must request Blob and fail, not silently
  // fall back to the snapshot. The SDK refuses the request before network I/O.
  const blob = runImport("--from-blob", "--dry-run");
  assert.equal(blob.error, undefined);
  assert.equal(typeof blob.status, "number");
  assert.notEqual(blob.status, 0);
  assert.match(blob.stderr, /token/i);

  // Typos must fail closed rather than accidentally performing an import.
  const unknown = runImport("--dryrun");
  assert.equal(unknown.error, undefined);
  assert.equal(typeof unknown.status, "number");
  assert.notEqual(unknown.status, 0);
  assert.match(unknown.stderr, /Unknown resource import flag: --dryrun/);
});
