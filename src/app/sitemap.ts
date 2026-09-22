import { MetadataRoute } from "next";
import { getTeardowns, getCaseStudies, getSiteSettings } from "@/sanity/queries";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getSiteSettings();
  const baseUrl = getBaseUrl(siteSettings);

  const isAboutEnabled = siteSettings.aboutPageEnabled !== false;
  const isCaseStudiesEnabled = siteSettings.caseStudiesPageEnabled !== false;
  const isProductsEnabled = siteSettings.productsPageEnabled !== false;
  const isTeardownsEnabled = siteSettings.teardownsPageEnabled !== false;
  const isContactEnabled = siteSettings.contactPageEnabled !== false;

  const [teardowns, caseStudies] = await Promise.all([
    isTeardownsEnabled ? getTeardowns() : Promise.resolve([]),
    isCaseStudiesEnabled ? getCaseStudies() : Promise.resolve([]),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  if (isAboutEnabled) {
    staticRoutes.push({
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  if (isCaseStudiesEnabled) {
    staticRoutes.push({
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  if (isProductsEnabled) {
    staticRoutes.push({
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  if (isTeardownsEnabled) {
    staticRoutes.push({
      url: `${baseUrl}/teardowns`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  if (isContactEnabled) {
    staticRoutes.push({
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const teardownRoutes: MetadataRoute.Sitemap = isTeardownsEnabled
    ? teardowns.map((t) => ({
        url: `${baseUrl}/teardowns/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      }))
    : [];

  const caseStudyRoutes: MetadataRoute.Sitemap = isCaseStudiesEnabled
    ? caseStudies.map((c) => ({
        url: `${baseUrl}/case-studies/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      }))
    : [];

  return [...staticRoutes, ...teardownRoutes, ...caseStudyRoutes];
}
