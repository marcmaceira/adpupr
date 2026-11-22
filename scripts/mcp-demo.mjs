/**
 * Proves the MCP integration end to end with the official MCP client SDK:
 * connects to the plugin's endpoint with the AI assistant's API key, lists the tools,
 * edits a field on a page as a draft, publishes it, and shows one call the key may not make.
 *
 *   node --env-file=.env scripts/mcp-demo.mjs [pagePath] [newEyebrow]
 *
 * Needs a running server (NEXT_PUBLIC_SERVER_URL) and SEED_MCP_API_KEY in the environment.
 */
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const server = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
const apiKey = process.env.SEED_MCP_API_KEY;
const pagePath = process.argv[2] ?? "/";
const newEyebrow = process.argv[3] ?? `Editado por MCP ${new Date().toISOString()}`;

if (!apiKey) {
  console.error("SEED_MCP_API_KEY is not set.");
  process.exit(1);
}

const transport = new StreamableHTTPClientTransport(new URL("/api/mcp", server), {
  requestInit: { headers: { Authorization: `users API-Key ${apiKey}` } },
});
const client = new Client({ name: "adpupr-mcp-demo", version: "1.0.0" });
await client.connect(transport);

// Tool results are text: markdown with the documents in ```json fences.
const parse = (result) => {
  const text = result.content?.find((c) => c.type === "text")?.text ?? "";
  const blocks = [...text.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) => JSON.parse(m[1]));
  if (blocks.length > 0) return { docs: blocks, text };
  return { docs: [], text };
};

const { tools } = await client.listTools();
console.log(`tools (${tools.length}): ${tools.map((t) => t.name).join(", ")}`);

const found = parse(
  await client.callTool({
    name: "findDocuments",
    arguments: { slug: "pages", where: { path: { equals: pagePath } }, limit: 1, depth: 0 },
  }),
);
const page = found.docs?.[0];
if (!page) throw new Error(`No page at ${pagePath}: ${JSON.stringify(found).slice(0, 300)}`);
const before = page.layout?.[0]?.eyebrow;
console.log(
  `page ${pagePath} id=${page.id}; first block ${page.layout?.[0]?.blockType}; eyebrow before: ${before}`,
);

const layout = page.layout.map((block, i) => (i === 0 ? { ...block, eyebrow: newEyebrow } : block));

const drafted = await client.callTool({
  name: "updateDocument",
  arguments: { slug: "pages", id: page.id, data: { layout }, draft: true },
});
console.log(`updateDocument (draft): ${drafted.isError ? "ERROR " + parse(drafted).text : "ok"}`);

const published = await client.callTool({
  name: "updateDocument",
  arguments: { slug: "pages", id: page.id, data: { _status: "published" } },
});
console.log(
  `updateDocument (publish): ${published.isError ? "ERROR " + parse(published).text : "ok"}`,
);

// Scope checks: the assistant has no delete tool at all, and cannot change users.
console.log(
  `deleteDocuments offered to this key: ${tools.some((t) => t.name === "deleteDocuments")}`,
);
const denied = await client.callTool({
  name: "updateDocument",
  arguments: { slug: "users", where: { role: { equals: "ai" } }, data: { role: "admin" } },
});
console.log(
  `updateDocument on users (expected refusal): ${denied.isError ? "refused" : "ALLOWED"}: ${parse(denied).text.slice(0, 160).replace(/\s+/g, " ")}`,
);

await client.close();

const html = await (await fetch(new URL(pagePath, server))).text();
console.log(`fetched ${pagePath}: new eyebrow present in HTML = ${html.includes(newEyebrow)}`);
