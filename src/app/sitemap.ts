import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getPostSlugs } from "@/lib/markdown";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
  ];

  for (const slug of getPostSlugs()) {
    entries.push({ url: `${base}/blog/${slug}`, lastModified: new Date() });
  }

  for (const p of projects) {
    entries.push({ url: `${base}/projects/${p.slug}`, lastModified: new Date() });
  }

  return entries;
}
