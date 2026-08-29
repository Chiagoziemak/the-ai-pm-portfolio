import type { Metadata } from "next";
import { SiteSettings } from "@/sanity/queries";

export const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://chiagoziemak.dev";

export interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  urlPath?: string;
  type?: "website" | "article";
  publishedTime?: string;
  siteSettings?: SiteSettings;
  noIndex?: boolean;
}

export function getBaseUrl(siteSettings?: SiteSettings): string {
  if (siteSettings?.siteUrl && siteSettings.siteUrl.startsWith("http")) {
    return siteSettings.siteUrl.replace(/\/$/, "");
  }
  return DEFAULT_SITE_URL.replace(/\/$/, "");
}

export function constructMetadata({
  title,
  description,
  image,
  imageAlt,
  urlPath = "",
  type = "website",
  publishedTime,
  siteSettings,
  noIndex = false,
}: ConstructMetadataParams): Metadata {
  const baseUrl = getBaseUrl(siteSettings);
  const cleanPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  const canonicalUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;

  const defaultTitle =
    siteSettings?.siteTitle || "Chiagoziem Melvin Akobundu | AI Product Manager Portfolio";
  const finalTitle = title ? title : defaultTitle;

  const defaultDescription =
    siteSettings?.metaDescription ||
    "Experienced SaaS Product Manager & Certified Scrum Product Owner (CSPO) transitioning into AI Product Management & AI Engineering. Builder of ResumeGenie.";
  const finalDescription = description || defaultDescription;

  // Fallback OG image: passed image -> siteSettings.ogImageUrl -> default headshot
  const fallbackOgImage =
    image ||
    siteSettings?.ogImageUrl ||
    `${baseUrl}/profile-hero.jpg`;

  const finalImageAlt =
    imageAlt ||
    siteSettings?.ogImageAlt ||
    finalTitle;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: siteSettings?.metaKeywords || [
      "AI Product Manager",
      "AI Engineer",
      "Product Management Portfolio",
      "SaaS PM",
      "ResumeGenie",
      "CSPO",
      "CSM",
      "Chiagoziem Melvin Akobundu",
    ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: siteSettings?.siteTitle || "Chiagoziem Melvin Akobundu Portfolio",
      type: type,
      locale: "en_US",
      images: [
        {
          url: fallbackOgImage,
          width: 1200,
          height: 630,
          alt: finalImageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [fallbackOgImage],
      creator: siteSettings?.socialLinks?.twitter ? "@chiagoziemak" : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function generatePersonJsonLd(siteSettings?: SiteSettings, headshotUrl?: string) {
  const baseUrl = getBaseUrl(siteSettings);
  const sameAs: string[] = [];

  if (siteSettings?.socialLinks?.linkedin) {
    sameAs.push(siteSettings.socialLinks.linkedin);
  }
  if (siteSettings?.socialLinks?.github) {
    sameAs.push(siteSettings.socialLinks.github);
  }
  if (siteSettings?.socialLinks?.twitter) {
    sameAs.push(siteSettings.socialLinks.twitter);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chiagoziem Melvin Akobundu",
    jobTitle: "AI Product Manager & Engineer",
    description:
      siteSettings?.metaDescription ||
      "Experienced SaaS Product Manager & Certified Scrum Product Owner transitioning into AI Product Management and AI Engineering.",
    url: baseUrl,
    image: headshotUrl || siteSettings?.ogImageUrl || `${baseUrl}/profile-hero.jpg`,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    knowsAbout: [
      "AI Product Management",
      "Large Language Models (LLMs)",
      "Agentic AI Systems",
      "Software Product Management",
      "Scrum / Agile Methodologies",
      "CSPO Certified",
      "RICE Prioritization",
      "Prompt Engineering",
      "Full-Stack Web Development",
      "Next.js & Python",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteSettings?.location || "Lagos",
      addressCountry: "Nigeria",
    },
  };
}

export function generateArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  siteSettings,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  siteSettings?: SiteSettings;
}) {
  const baseUrl = getBaseUrl(siteSettings);

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description,
    url: url,
    image: imageUrl || siteSettings?.ogImageUrl || `${baseUrl}/profile-hero.jpg`,
    datePublished: datePublished || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Chiagoziem Melvin Akobundu",
      jobTitle: "AI Product Manager & Engineer",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Chiagoziem Melvin Akobundu",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
