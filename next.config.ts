import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import { BLOB_STORAGE_HOSTNAME } from "./src/lib/constants";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      // Static imports (logos) and local-development uploads served by Payload.
      { pathname: "/_next/static/media/**", search: "" },
      { pathname: "/api/media/file/**" },
    ],
    remotePatterns: [
      {
        // Vercel Blob store used for CMS uploads and legacy portraits.
        protocol: "https",
        hostname: BLOB_STORAGE_HOSTNAME,
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
