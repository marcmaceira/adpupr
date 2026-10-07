import config from "@payload-config";
import { getPayload } from "payload";
import type { Media, Page } from "@/payload-types";
import {
  SEED_COMMITTEES,
  SEED_FOOTER,
  SEED_HEADER,
  SEED_PAGES,
  SEED_SETTINGS,
} from "@/seed/content";
import resources from "@/seed/resources.json";
import { assertWriteTarget, finishScript, importContext, importPhoto } from "./helpers";

// Standalone CLI processes must not keep Next.js development HMR sockets open.
process.env.DISABLE_PAYLOAD_HMR = "true";
assertWriteTarget();
const payload = await getPayload({ config });

async function photo(value: number | Media | null | undefined) {
  if (value && typeof value === "object" && value.url)
    return importPhoto(payload, value.url, value.alt);
  return value;
}

async function resolveBlock(block: Page["layout"][number]): Promise<Page["layout"][number]> {
  if (block.blockType === "peopleGrid")
    return {
      ...block,
      people: await Promise.all(
        (block.people ?? []).map(async (person) =>
          Object.assign({}, person, { photo: await photo(person.photo) }),
        ),
      ),
    };
  if (block.blockType === "mediaBlock")
    return { ...block, image: (await photo(block.image)) ?? block.image };
  return block;
}

try {
  // Import reusable portraits once, even when they appear in several pages/committees.
  // Serial reduction prevents two simultaneous pages from importing the same photo.
  await SEED_COMMITTEES.reduce(async (previous, committee) => {
    await previous;
    const { docs } = await payload.find({
      collection: "committees",
      where: { slug: { equals: committee.slug } },
      limit: 1,
      depth: 0,
    });
    if (docs.length) return;
    const coordinator = {
      ...committee.coordinator,
      photo: await photo(committee.coordinator.photo),
    };
    await payload.create({
      collection: "committees",
      data: { ...committee, coordinator },
      context: importContext,
    });
    payload.logger.info(`Created committee: ${committee.name}`);
  }, Promise.resolve());

  await SEED_PAGES.reduce(async (previous, page) => {
    await previous;
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: page.slug } },
      draft: true,
      trash: true,
      limit: 1,
      depth: 0,
    });
    if (docs.length) {
      payload.logger.info(`Skipped existing page: ${page.slug}`);
      return;
    }
    const layout = await Promise.all(page.layout.map(resolveBlock));
    await payload.create({
      collection: "pages",
      data: { ...page, layout },
      context: importContext,
    });
    payload.logger.info(`Created page: ${page.slug}`);
  }, Promise.resolve());

  const [header, footer, settings] = await Promise.all([
    payload.findGlobal({ slug: "header" }),
    payload.findGlobal({ slug: "footer" }),
    payload.findGlobal({ slug: "site-settings" }),
  ]);
  if (!header.updatedAt)
    await payload.updateGlobal({ slug: "header", data: SEED_HEADER, context: importContext });
  if (!footer.updatedAt)
    await payload.updateGlobal({ slug: "footer", data: SEED_FOOTER, context: importContext });
  if (!settings.updatedAt)
    await payload.updateGlobal({
      slug: "site-settings",
      data: SEED_SETTINGS,
      context: importContext,
    });

  await resources.categories.reduce(async (previous, category) => {
    await previous;
    const { docs } = await payload.find({
      collection: "document-categories",
      where: { sourceSlug: { equals: category.slug } },
      limit: 1,
    });
    if (!docs.length)
      await payload.create({
        collection: "document-categories",
        data: { title: category.title, sourceSlug: category.slug },
        context: importContext,
      });
  }, Promise.resolve());
  payload.logger.info(
    "Seed complete. Existing content was not overwritten; no admin account was created. Create the first admin at /admin.",
  );
} finally {
  await payload.destroy();
}
await finishScript();
