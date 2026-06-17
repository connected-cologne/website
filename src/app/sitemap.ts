import type { MetadataRoute } from "next";

// TODO: confirm final production domain before launch (single source of truth).
const BASE_URL = "https://connected-cologne.de";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Single-page site today (sections are anchors on the homepage).
    // Add future static routes here — one entry each.
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
