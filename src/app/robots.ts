import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Uploaded images (logo, social image) and library documents are public files.
      allow: ["/", "/api/media/file/", "/api/documents/file/"],
      // The CMS admin, its API and the preview routes are not content.
      disallow: ["/api/", "/admin", "/next/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
