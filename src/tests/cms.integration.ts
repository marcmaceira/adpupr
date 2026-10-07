import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";
import test from "node:test";

// Destructive fixtures belong ONLY on a fresh, isolated local test server.
const base = process.env.CMS_TEST_BASE_URL;
if (base !== "http://192.168.9.4:3003" || process.env.CMS_TEST_ALLOW_WRITES !== "true") {
  throw new Error(
    "Run against a fresh isolated database on port 3003 with CMS_TEST_ALLOW_WRITES=true. Never use the editor preview or a deployed site.",
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function object(value: unknown) {
  assert.ok(isObject(value));
  return value;
}
function array(value: unknown): unknown[] {
  assert.ok(Array.isArray(value));
  return value;
}
function string(value: unknown) {
  assert.ok(typeof value === "string");
  return value;
}
function number(value: unknown) {
  assert.ok(typeof value === "number");
  return value;
}
function user(value: unknown) {
  const record = object(value);
  return { id: number(record.id), email: string(record.email), role: string(record.role) };
}
function doc(value: unknown) {
  return object(object(value).doc);
}

function pdfFixture() {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 100 100] >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const [index, content] of objects.entries()) {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 4\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return pdf;
}

const password = randomBytes(32).toString("hex");
const slug = `qa/${randomBytes(6).toString("hex")}`;
let adminCookie = "";
let editorCookie = "";
let bypassCookie = "";
let adminId = 0;
let editorId = 0;
let pageId = 0;

// Emulate browser-controlled Fetch Metadata on the isolated plain-HTTP server.
function sameOriginHeaders(cookie: string) {
  return { Cookie: cookie, "Sec-Fetch-Site": "same-origin" };
}

async function api(path: string, method = "GET", data?: object, cookie = "") {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", ...sameOriginHeaders(cookie) },
    redirect: "manual",
  };
  if (data && method !== "GET") options.body = JSON.stringify(data);
  const response = await fetch(`${base}${path}`, options);
  const body: unknown = await response.json();
  return { response, body };
}

async function saveBrowserState() {
  // No passwords. Secure=false is only for the isolated plain-HTTP local QA server.
  await writeFile(
    "/tmp/adpupr-qa-state.json",
    JSON.stringify({
      cookies: [
        {
          name: "payload-token",
          value: adminCookie.slice("payload-token=".length),
          domain: "192.168.9.4",
          path: "/",
          expires: -1,
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
        },
      ],
      origins: [],
    }),
    { mode: 0o600 },
  );
}

await test("first account is an admin; registration closes after bootstrap", async () => {
  const result = await api("/api/users/first-register", "POST", {
    name: "Local CMS QA",
    email: "cms-qa@example.test",
    password,
  });
  assert.equal(result.response.status, 200);
  const response = object(result.body);
  const admin = user(response.user);
  adminId = admin.id;
  assert.equal(admin.role, "admin");
  adminCookie = `payload-token=${string(response.token)}`;
  await saveBrowserState();
  const again = await api("/api/users/first-register", "POST", {
    name: "No",
    email: "no@example.test",
    password,
  });
  assert.ok(again.response.status >= 400);
  const created = await api(
    "/api/users",
    "POST",
    { name: "Local editor QA", email: "editor-qa@example.test", password, role: "editor" },
    adminCookie,
  );
  assert.equal(created.response.status, 201);
  const editor = user(doc(created.body));
  editorId = editor.id;
  const login = await api("/api/users/login", "POST", { email: editor.email, password });
  assert.equal(login.response.status, 200);
  editorCookie = `payload-token=${string(object(login.body).token)}`;
});

await test("editors edit content but cannot manage accounts or promote themselves", async () => {
  const created = await api(
    "/api/pages",
    "POST",
    {
      title: "QA draft",
      slug,
      _status: "draft",
      layout: [{ blockType: "pageHero", title: "PRIVATE_DRAFT_MARKER" }],
    },
    editorCookie,
  );
  assert.equal(created.response.status, 201);
  pageId = number(doc(created.body).id);
  const unauthorized = await api("/api/pages", "POST", { title: "No", slug: "no", layout: [] });
  assert.ok(unauthorized.response.status >= 400);
  const users = await api("/api/users", "GET", undefined, editorCookie);
  assert.deepEqual(
    array(object(users.body).docs)
      .map(user)
      .map(({ id }) => id),
    [editorId],
  );
  const createUser = await api(
    "/api/users",
    "POST",
    { name: "No", email: "blocked@example.test", password },
    editorCookie,
  );
  assert.ok(createUser.response.status >= 400);
  const otherUser = await api(`/api/users/${adminId}`, "PATCH", { name: "Blocked" }, editorCookie);
  assert.ok(otherUser.response.status >= 400);
  await api(`/api/users/${editorId}`, "PATCH", { role: "admin" }, editorCookie);
  const own = await api(`/api/users/${editorId}`, "GET", undefined, editorCookie);
  assert.equal(user(own.body).role, "editor");
});

await test("drafts and authenticated previews never become public", async () => {
  const listed = await api(`/api/pages?where[slug][equals]=${slug}&draft=true`);
  assert.equal(array(object(listed.body).docs).length, 0);
  const unauthorized = await fetch(`${base}/next/preview?path=/${slug}`, { redirect: "manual" });
  assert.equal(unauthorized.status, 401);
  assert.equal(unauthorized.headers.has("set-cookie"), false);
  const unsafe = await fetch(`${base}/next/preview?path=//evil.test`, {
    headers: sameOriginHeaders(editorCookie),
    redirect: "manual",
  });
  assert.equal(unsafe.status, 400);
  const preview = await fetch(`${base}/next/preview?path=/${slug}`, {
    headers: sameOriginHeaders(editorCookie),
    redirect: "manual",
  });
  assert.equal(preview.status, 307);
  assert.equal(preview.headers.get("location"), `/${slug}`);
  bypassCookie = preview.headers.get("set-cookie")?.split(";")[0] ?? "";
  assert.ok(bypassCookie.startsWith("__prerender_bypass="));
  const visible = await fetch(`${base}/${slug}`, {
    headers: sameOriginHeaders(`${editorCookie};${bypassCookie}`),
  });
  assert.equal(visible.status, 200);
  assert.ok((await visible.text()).includes("PRIVATE_DRAFT_MARKER"));
  const cookieAlone = await fetch(`${base}/${slug}`, { headers: { Cookie: bypassCookie } });
  assert.equal(cookieAlone.status, 404);
  const versions = await api(`/api/pages/versions?where[parent][equals]=${pageId}`);
  assert.ok(versions.response.status >= 400);
});

await test("publish/reorder/remove/new pages revalidate; subsequent drafts stay private", async () => {
  const published = await api(
    `/api/pages/${pageId}`,
    "PATCH",
    {
      _status: "published",
      layout: [
        { blockType: "pageHero", title: "PUBLIC_MARKER" },
        {
          blockType: "content",
          heading: "SECOND_MARKER",
          body: {
            root: {
              children: [
                {
                  type: "paragraph",
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: "text",
                      version: 1,
                      text: "QA body",
                      format: 0,
                      detail: 0,
                      mode: "normal",
                      style: "",
                    },
                  ],
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            },
          },
        },
      ],
    },
    editorCookie,
  );
  assert.equal(published.response.status, 200);
  const publicPage = await fetch(`${base}/${slug}`);
  assert.equal(publicPage.status, 200);
  assert.ok((await publicPage.text()).includes("PUBLIC_MARKER"));
  const reordered = array(doc(published.body).layout).map(object).toReversed();
  await api(`/api/pages/${pageId}`, "PATCH", { layout: reordered }, editorCookie);
  const reorderedHtml = await (await fetch(`${base}/${slug}`)).text();
  assert.ok(reorderedHtml.indexOf("SECOND_MARKER") < reorderedHtml.indexOf("PUBLIC_MARKER"));
  await api(`/api/pages/${pageId}`, "PATCH", { layout: [reordered[1]] }, editorCookie);
  assert.equal((await (await fetch(`${base}/${slug}`)).text()).includes("SECOND_MARKER"), false);
  const draft = await api(
    `/api/pages/${pageId}?draft=true`,
    "PATCH",
    { layout: [{ blockType: "pageHero", title: "NEW_PRIVATE_MARKER" }], _status: "draft" },
    editorCookie,
  );
  assert.equal(draft.response.status, 200);
  const anonymousAPI = await api(`/api/pages/${pageId}?draft=true`);
  assert.equal(JSON.stringify(anonymousAPI.body).includes("NEW_PRIVATE_MARKER"), false);
  const publicHtml = await (await fetch(`${base}/${slug}`)).text();
  assert.equal(publicHtml.includes("NEW_PRIVATE_MARKER"), false);
  assert.ok(publicHtml.includes("PUBLIC_MARKER"));
  const previewHtml = await (
    await fetch(`${base}/${slug}`, {
      headers: sameOriginHeaders(`${editorCookie};${bypassCookie}`),
    })
  ).text();
  assert.ok(previewHtml.includes("NEW_PRIVATE_MARKER"));
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes(`/${slug}`));
});

await test("document uploads/downloads work; public uploads and SVG are rejected", async () => {
  const categories = await api("/api/document-categories");
  const categoryId = number(object(array(object(categories.body).docs)[0]).id);
  const form = new FormData();
  form.set(
    "_payload",
    JSON.stringify({
      title: "Local QA document",
      category: categoryId,
      publishedAt: new Date().toISOString(),
    }),
  );
  form.set("file", new Blob([pdfFixture()], { type: "application/pdf" }), "cms-qa-fixture.pdf");
  const response = await fetch(`${base}/api/documents`, {
    method: "POST",
    headers: sameOriginHeaders(editorCookie),
    body: form,
  });
  assert.equal(response.status, 201);
  const body: unknown = await response.json();
  const document = doc(body);
  const path = string(document.url).replace(/^https?:\/\/[^/]+/, "");
  assert.ok((await (await fetch(`${base}${path}`)).text()).includes("%PDF-1.4"));
  const denied = await fetch(`${base}/api/documents`, { method: "POST", body: form });
  assert.ok(denied.status >= 400);
  const svg = new FormData();
  svg.set("_payload", JSON.stringify({ alt: "QA unsafe SVG" }));
  svg.set(
    "file",
    new Blob(['<svg xmlns="http://www.w3.org/2000/svg"/>'], { type: "image/svg+xml" }),
    "cms-qa.svg",
  );
  const unsafe = await fetch(`${base}/api/media`, {
    method: "POST",
    headers: sameOriginHeaders(editorCookie),
    body: svg,
  });
  assert.ok(unsafe.status >= 400);
  await api(`/api/documents/${number(document.id)}`, "DELETE", undefined, adminCookie);
});

console.log(
  "Isolated local integration checks finished. Browser state: /tmp/adpupr-qa-state.json.",
);
