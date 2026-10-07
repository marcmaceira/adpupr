import assert from "node:assert/strict";
import test from "node:test";
import { isPageSlug, pathFromSlug } from "@/lib/paths";
import { isSafeHref } from "@/lib/urls";
import { SEED_PAGES } from "@/seed/content";
import resources from "@/seed/resources.json";

await test("slugs allow nested page paths but never CMS/system routes", () => {
  for (const slug of ["inicio", "nueva-pagina", "nosotros/historia-fundacion"])
    assert.equal(isPageSlug(slug), true);
  for (const slug of [
    "",
    "admin",
    "admin/test",
    "api/pages",
    "next/preview",
    "//evil",
    "../admin",
    "Una-Pagina",
    "pagina?x=1",
    "p\u00E1gina",
    "a/",
    "a".repeat(201),
  ])
    assert.equal(isPageSlug(slug), false, slug);
  assert.equal(pathFromSlug("inicio"), "/");
  assert.equal(pathFromSlug("nosotros/quienes-somos"), "/nosotros/quienes-somos");
});

await test("CMS links allow useful destinations and reject executable/ambiguous URLs", () => {
  for (const href of [
    "/",
    "/recursos#biblioteca",
    "#agenda",
    "https://www.paypal.com/ncp/payment/TEST",
    "mailto:info@adpupr.com?subject=Hola",
    "tel:+17871234567",
  ])
    assert.equal(isSafeHref(href), true, href);
  for (const href of [
    "",
    "javascript:alert(1)",
    "data:text/html,hello",
    "//evil.test",
    "/\\evil.test",
    " https://example.com",
    "https://user:password@evil.test",
    "java\nscript:alert(1)",
    "https://",
    "file:///etc/passwd",
  ])
    assert.equal(isSafeHref(href), false, href);
});

await test("the seed preserves eight pages, payment links and the full agenda", () => {
  assert.equal(SEED_PAGES.length, 8);
  assert.equal(new Set(SEED_PAGES.map(({ slug }) => slug)).size, 8);
  for (const page of SEED_PAGES) {
    assert.equal(isPageSlug(page.slug), true);
    assert.equal(page["_status"], "published");
    assert.ok(page.layout.length);
  }
  const conference = SEED_PAGES.find(({ slug }) => slug === "conferencia");
  const agenda = conference?.layout.find((block) => block.blockType === "agenda");
  assert.equal(agenda?.periods?.length, 2);
  assert.ok((agenda?.periods?.flatMap(({ entries }) => entries).length ?? 0) > 10);
  const payment = conference?.layout.find((block) => block.blockType === "pricing");
  assert.deepEqual(
    payment?.plans?.map(({ price }) => price),
    ["$180", "$100", "$75"],
  );
  for (const plan of payment?.plans ?? []) assert.equal(isSafeHref(plan.url), true);
  const contact = SEED_PAGES.find(({ slug }) => slug === "contactanos")?.layout.find(
    (block) => block.blockType === "contactSection",
  );
  assert.equal(contact?.form?.heading, "Inicia una conversaci\u00F3n.");
  assert.equal(contact?.form?.buttonLabel, "Enviar correo");
});

await test("resource snapshot has unique sources and known categories", () => {
  assert.equal(resources.documents.length, 17);
  assert.equal(new Set(resources.documents.map(({ url }) => url)).size, 17);
  for (const document of resources.documents) {
    assert.ok(resources.categories.some(({ slug }) => slug === document.category));
    assert.equal(isSafeHref(document.url), true);
  }
});
