import { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/queries";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await getSiteSettings();
  const baseUrl = getBaseUrl(siteSettings);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
