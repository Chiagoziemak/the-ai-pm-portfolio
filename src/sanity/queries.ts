import { sanityClient, sanityConfigured } from "./client";
import {
  mockTeardowns,
  mockCaseStudies,
  mockProducts,
  mockAboutData,
  Teardown,
  CaseStudy,
  Product,
  AboutData,
} from "@/data/mockData";

export async function getTeardowns(): Promise<Teardown[]> {
  if (!sanityConfigured) {
    return mockTeardowns;
  }
  try {
    return await sanityClient.fetch(`*[_type == "teardown"] | order(date desc) {
      title,
      "slug": slug.current,
      date,
      category,
      summary,
      readTime,
      "coverImage": coverImage.asset->url,
      body,
      keyFindings,
      recommendations
    }`);
  } catch (error) {
    console.error("Failed to fetch teardowns from Sanity:", error);
    return mockTeardowns;
  }
}

export async function getTeardownBySlug(slug: string): Promise<Teardown | null> {
  if (!sanityConfigured) {
    return mockTeardowns.find((t) => t.slug === slug) || null;
  }
  try {
    return await sanityClient.fetch(
      `*[_type == "teardown" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        date,
        category,
        summary,
        readTime,
        "coverImage": coverImage.asset->url,
        body,
        keyFindings,
        recommendations
      }`,
      { slug }
    );
  } catch (error) {
    console.error(`Failed to fetch teardown for slug ${slug}:`, error);
    return mockTeardowns.find((t) => t.slug === slug) || null;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!sanityConfigured) {
    return mockCaseStudies;
  }
  try {
    return await sanityClient.fetch(`*[_type == "caseStudy"] | order(date desc) {
      title,
      "slug": slug.current,
      date,
      category,
      summary,
      tools,
      "coverImage": coverImage.asset->url,
      body,
      results,
      lessons
    }`);
  } catch (error) {
    console.error("Failed to fetch case studies from Sanity:", error);
    return mockCaseStudies;
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!sanityConfigured) {
    return mockCaseStudies.find((s) => s.slug === slug) || null;
  }
  try {
    return await sanityClient.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        date,
        category,
        summary,
        tools,
        "coverImage": coverImage.asset->url,
        body,
        results,
        lessons
      }`,
      { slug }
    );
  } catch (error) {
    console.error(`Failed to fetch case study for slug ${slug}:`, error);
    return mockCaseStudies.find((s) => s.slug === slug) || null;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!sanityConfigured) {
    return mockProducts;
  }
  try {
    return await sanityClient.fetch(`*[_type == "product"] {
      name,
      tagline,
      description,
      status,
      "coverImage": coverImage.asset->url
    }`);
  } catch (error) {
    console.error("Failed to fetch products from Sanity:", error);
    return mockProducts;
  }
}

export async function getAboutData(): Promise<AboutData> {
  if (!sanityConfigured) {
    return mockAboutData;
  }
  try {
    const data = await sanityClient.fetch(`*[_type == "about"][0] {
      bio,
      skills,
      journey,
      certifications
    }`);
    return data || mockAboutData;
  } catch (error) {
    console.error("Failed to fetch about data from Sanity:", error);
    return mockAboutData;
  }
}
