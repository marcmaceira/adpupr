import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2yohsk2xwqevfocw.public.blob.vercel-storage.com",
        port: "",
        pathname: "/*.png",
        search: "",
      },
    ],
  },
};

export default nextConfig;
