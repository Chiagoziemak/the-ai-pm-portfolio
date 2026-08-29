import { MetadataRoute } from "next";
import { getTeardowns, getCaseStudies, getSiteSettings } from "@/sanity/queries";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getSiteSettings();
  const baseUrl = getBaseUrl(siteSettings);
  const isCaseStudiesEnabled = siteSettings.caseStudiesPageEnabled !== false;

  const teardowns = await getTeardowns();
  const caseStudies = isCaseStudiesEnabled ? await getCaseStudies() : [];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/teardowns`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  if (isCaseStudiesEnabled) {
    staticRoutes.push({
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  const teardownRoutes: MetadataRoute.Sitemap = teardowns.map((t) => ({
    url: `${baseUrl}/teardowns/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${baseUrl}/case-studies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...teardownRoutes, ...caseStudyRoutes];
}
