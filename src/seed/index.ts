/**
 * The migration: rebuilds the whole site from an empty database, and is safe to re-run
 * (every write is an upsert keyed by a natural id: email, path, filename, slug).
 *
 *   pnpm seed
 *
 * Order: users → page stubs (so links can point at pages) → site settings → collections
 * → globals → page layouts → component guide → round-trip verification.
 *
 * Set SEED_ALLOW_MISSING=1 to skip fixture keys no group provides yet (worker builds).
 */
import { randomBytes } from "node:crypto";
import config from "@payload-config";
import { getPayload } from "payload";
import { bandsSeed } from "./groups/bands";
import { chromeSeed } from "./groups/chrome";
import { conferenceSeed } from "./groups/conference";
import { contentSeed } from "./groups/content";
import { engageSeed } from "./groups/engage";
import { peopleSeed } from "./groups/people";
import { type BlockInputAny, type Fixture, createContext, inSequence, writeOpts } from "./context";
import { GUIDE_PATH, PAGES } from "./pages";
import { seedSiteSettings } from "./settings";
import { assertRoundTrip } from "./verify";

const GROUPS = [peopleSeed, engageSeed, bandsSeed, contentSeed, conferenceSeed, chromeSeed];
const allowMissing = process.env.SEED_ALLOW_MISSING === "1";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} in .env`);
  return value;
}

const payload = await getPayload({ config });

try {
  /* Users */
  const pageIds = new Map<string, number>();
  const ctx = await createContext(payload, pageIds);

  await ctx.upsert(
    "users",
    { email: { equals: requireEnv("SEED_ADMIN_EMAIL") } },
    {
      email: requireEnv("SEED_ADMIN_EMAIL"),
      password: requireEnv("SEED_ADMIN_PASSWORD"),
      name: "Administración ADPUPR",
      role: "admin",
    },
  );
  if (process.env.SEED_MCP_EMAIL && process.env.SEED_MCP_API_KEY) {
    await ctx.upsert(
      "users",
      { email: { equals: process.env.SEED_MCP_EMAIL } },
      {
        email: process.env.SEED_MCP_EMAIL,
        // Never used to sign in: the assistant authenticates with its API key only.
        password: randomBytes(24).toString("hex"),
        name: "Asistente IA (MCP)",
        role: "ai",
        apiKey: process.env.SEED_MCP_API_KEY,
      },
    );
  }
  ctx.log("users ready");

  /* Page stubs: every page exists before any content links to it. */
  await inSequence(PAGES, async (spec) => {
    const id = await ctx.upsert(
      "pages",
      { path: { equals: spec.path } },
      { title: spec.title, path: spec.path, _status: "published" },
    );
    pageIds.set(spec.path, id);
  });
  ctx.log(`${pageIds.size} page stubs ready`);

  /* Settings, collections, globals */
  await seedSiteSettings(ctx);
  await inSequence(GROUPS, async (group) => group.collections?.(ctx));
  await inSequence(GROUPS, async (group) => group.globals?.(ctx));
  ctx.log("settings, collections and globals ready");

  /* Page layouts */
  const fixtures = new Map<string, Fixture>();
  for (const group of GROUPS) {
    for (const [key, fixture] of Object.entries(group.fixtures)) {
      if (fixtures.has(key)) throw new Error(`Fixture ${key} is defined twice`);
      fixtures.set(key, fixture);
    }
  }

  const guide: BlockInputAny[] = [];
  await inSequence(GROUPS, async (group) => {
    guide.push(...(await group.guide(ctx)));
  });

  const buildLayout = async (keys: readonly string[], pagePath: string) => {
    const layout: BlockInputAny[] = [];
    await inSequence(keys, async (key) => {
      const fixture = fixtures.get(key);
      if (fixture) {
        layout.push(await fixture(ctx));
        return;
      }
      if (!allowMissing) throw new Error(`No group provides fixture ${key} (used by ${pagePath})`);
      ctx.log(`skipping missing fixture ${key}`);
    });
    return layout;
  };

  await inSequence(PAGES, async (spec) => {
    const layout = spec.path === GUIDE_PATH ? guide : await buildLayout(spec.layout, spec.path);
    const id = ctx.pageId(spec.path);
    await payload.update({
      collection: "pages",
      id,
      data: {
        title: spec.title,
        path: spec.path,
        layout,
        meta: {
          title: spec.meta?.title ?? null,
          description: spec.meta?.description ?? null,
          ogDescription: spec.meta?.ogDescription ?? null,
        },
        noindex: spec.noindex ?? false,
        sitemap: {
          include: spec.sitemap.include,
          priority: spec.sitemap.priority ?? "0.7",
          changeFrequency: spec.sitemap.changeFrequency ?? "monthly",
        },
        _status: "published",
      },
      ...writeOpts,
    });
    const saved = await payload.findByID({ collection: "pages", id, depth: 0, ...writeOpts });
    assertRoundTrip(layout, saved.layout, `${spec.path} layout`);
  });
  ctx.log(`${PAGES.length} pages written and verified`);
  ctx.log("done");
} catch (error) {
  payload.logger.error(error);
  process.exit(1);
}

process.exit(0);
