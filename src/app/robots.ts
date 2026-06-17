import type { MetadataRoute } from "next";

// TODO: confirm final production domain before launch (single source of truth).
const BASE_URL = "https://connected-cologne.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Sanity Studio CMS lives at /studio — no reason to index it.
      disallow: "/studio",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
