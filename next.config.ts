import type { NextConfig } from "next";
import { BLOB_STORAGE_URL } from "./src/lib/constants";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(BLOB_STORAGE_URL).hostname,
        port: "",
        pathname: "/*.png",
        search: "",
      },
    ],
  },
};

export default nextConfig;
