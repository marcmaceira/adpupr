import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Uploaded images (logo, social image) are served under /api/media/file/.
      allow: ["/", "/api/media/file/"],
      // The CMS admin, its API and the preview routes are not content.
      disallow: ["/api/", "/admin", "/next/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
