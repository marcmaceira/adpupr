import path from "node:path";
import { fileURLToPath } from "node:url";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // No X-Powered-By header (withPayload otherwise adds "Next.js, Payload").
  poweredByHeader: false,
  images: {
    // Payload serves uploads from /api/<collection>/file/<name> (local disk), or from
    // Vercel Blob under the cms/ prefix when USE_VERCEL_BLOB=true.
    localPatterns: [{ pathname: "/api/media/file/**" }],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  turbopack: { root: path.resolve(dirname) },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
