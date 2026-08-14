import { sanityClient, sanityConfigured } from "./client";
import { urlForImage } from "./image";
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

export interface SiteSettings {
  siteTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  navLabels?: {
    home?: string;
    about?: string;
    teardowns?: string;
    caseStudies?: string;
    products?: string;
    contact?: string;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  resumeUrl?: string;
  faviconUrl?: string;
  footerText?: string;
  contactEmail?: string;
}

export interface HomePageData {
  heroHeading?: string;
  heroSubheading?: string;
  introText?: string;
  heroImage?: any;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroImagePosition?: "left" | "right" | string;
  availabilityBadge?: string;
  ctaButtons?: { label: string; url: string }[];
  featuredCaseStudies?: CaseStudy[];
  featuredTeardowns?: Teardown[];
  credentialsShown?: { label: string; sublabel?: string }[];
}

export interface AboutPageData extends AboutData {
  headline?: string;
  introText?: string;
  headshotUrl?: string;
  taglineChips?: string[];
  closingHeadline?: string;
  closingText?: string;
}

export interface ContactPageData {
  headline?: string;
  introText?: string;
  statusMessage?: string;
}

const fetchOptions = { next: { revalidate: 0 }, cache: "no-store" as const };

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] NEXT_PUBLIC_SANITY_PROJECT_ID not set. Using default site settings.");
    return {
      siteTitle: "Chiagoziem Melvin Akobundu | AI Product Manager Portfolio",
      metaDescription: "Experienced SaaS Product Manager & Certified Scrum Master transitioning to AI Product Management and AI Engineering.",
      contactEmail: "hello@chiagoziem.ai",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/chiagoziem-melvin-akobundu-cspo%E2%93%A1-b546b4206",
        github: "https://github.com/Chiagoziemak",
        twitter: "https://x.com",
      },
    };
  }
  try {
    const res = await sanityClient.fetch(
      `*[_type == "siteSettings"][0] {
        siteTitle,
        metaDescription,
        metaKeywords,
        navLabels,
        socialLinks,
        "resumeUrl": resumeFile.asset->url,
        "faviconUrl": favicon.asset->url,
        footerText,
        contactEmail
      }`,
      {},
      fetchOptions
    );
    if (!res) {
      console.warn("[Sanity Fallback] Site settings document 'siteSettings' not found in Sanity. Using fallback values.");
      return { contactEmail: "hello@chiagoziem.ai" };
    }
    return res;
  } catch (error) {
    console.error("Error fetching site settings from Sanity:", error);
    return { contactEmail: "hello@chiagoziem.ai" };
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using mock home page data.");
    return {
      heroHeading: "Chiagoziem Melvin Akobundu",
      heroSubheading: "SaaS PM & Certified PO transitioning to AI Product Management & AI Engineering",
      introText: "Experienced SaaS Product Manager with CSPO and CSM credentials. Pivoting to AI Engineering and AI PM, currently building ResumeGenie—an agentic job application platform.",
      availabilityBadge: "Available for Roles & Opportunities",
    };
  }
  try {
    const data = await sanityClient.fetch(
      `*[_type == "homePage"][0] {
        heroHeading,
        heroSubheading,
        introText,
        heroImage,
        "heroImageUrl": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        heroImagePosition,
        availabilityBadge,
        ctaButtons,
        credentialsShown,
        "featuredCaseStudies": featuredCaseStudies[]-> {
          title,
          "slug": slug.current,
          date,
          category,
          summary,
          readTime,
          "coverImage": coverImage.asset->url,
          featured,
          isPlaceholder,
          "tools": stackMethods,
          results,
          lessonsLearned
        },
        "featuredTeardowns": featuredTeardowns[]-> {
          title,
          "slug": slug.current,
          date,
          category,
          summary,
          readTime,
          "coverImage": coverImage.asset->url,
          "myRole": role,
          body,
          keyFindings,
          recommendations,
          projectLinks
        }
      }`,
      {},
      fetchOptions
    );
    return data || {};
  } catch (error) {
    console.error("Error fetching home page data from Sanity:", error);
    return {};
  }
}

export async function getAboutPageData(): Promise<AboutPageData> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using mock about page data.");
    return {
      bio: mockAboutData.bio,
      skills: mockAboutData.skills,
      journey: mockAboutData.journey,
      certifications: mockAboutData.certifications,
    };
  }
  try {
    const data = await sanityClient.fetch(
      `*[_type == "aboutPage"][0] {
        headline,
        introText,
        "headshotUrl": headshot.asset->url,
        taglineChips,
        "skills": technicalProficiency[] {
          category,
          "items": skills[] { "name": @, "level": 90 }
        },
        "journey": professionalTrajectory[] {
          "year": years,
          role,
          company,
          description
        },
        "certifications": credentials[] {
          "name": label + select(defined(sublabel) => " - " + sublabel, "")
        },
        learningVector,
        closingHeadline,
        closingText
      }`,
      {},
      fetchOptions
    );

    if (!data) {
      console.warn("[Sanity Fallback] About Page document 'aboutPage' not found in Sanity. Falling back to mockAboutData.");
      return {
        bio: mockAboutData.bio,
        skills: mockAboutData.skills,
        journey: mockAboutData.journey,
        certifications: mockAboutData.certifications,
      };
    }
    return {
      bio: data.introText || mockAboutData.bio,
      skills: data.skills || mockAboutData.skills,
      journey: data.journey || mockAboutData.journey,
      certifications: data.certifications ? data.certifications.map((c: any) => c.name) : mockAboutData.certifications,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching about page data from Sanity:", error);
    return {
      bio: mockAboutData.bio,
      skills: mockAboutData.skills,
      journey: mockAboutData.journey,
      certifications: mockAboutData.certifications,
    };
  }
}

export async function getContactPageData(): Promise<ContactPageData> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using default contact page content.");
    return {
      headline: "Let's Connect & Collaborate",
      introText: "Whether you're looking for an AI Product Manager, exploring strategic teardowns, or want to discuss agentic AI systems, reach out below.",
      statusMessage: "Active & accepting inquiries",
    };
  }
  try {
    const res = await sanityClient.fetch(
      `*[_type == "contactPage"][0] {
        headline,
        introText,
        statusMessage
      }`,
      {},
      fetchOptions
    );
    return res || {
      headline: "Let's Connect & Collaborate",
      introText: "Whether you're looking for an AI Product Manager, exploring strategic teardowns, or want to discuss agentic AI systems, reach out below.",
      statusMessage: "Active & accepting inquiries",
    };
  } catch (error) {
    console.error("Error fetching contact page data from Sanity:", error);
    return {};
  }
}

export async function getTeardowns(): Promise<Teardown[]> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using mockTeardowns.");
    return mockTeardowns;
  }
  try {
    const teardowns = await sanityClient.fetch(
      `*[_type == "teardown"] | order(_createdAt desc) {
        title,
        "slug": slug.current,
        "date": select(defined(year) => year, "2024"),
        category,
        summary,
        readTime,
        "coverImage": select(defined(coverImage.asset) => coverImage.asset->url, coverImage),
        "myRole": role,
        researchEvidence,
        researchStats,
        keyFindings,
        riceTable,
        recommendations,
        projectLinks
      }`,
      {},
      fetchOptions
    );
    if (!teardowns || teardowns.length === 0) {
      console.warn("[Sanity Fallback] No teardown documents published in Sanity. Falling back to mockTeardowns.");
      return mockTeardowns;
    }
    return teardowns;
  } catch (error) {
    console.error("Failed to fetch teardowns from Sanity:", error);
    return mockTeardowns;
  }
}

export async function getTeardownBySlug(slug: string): Promise<Teardown | null> {
  if (!sanityConfigured) {
    console.warn(`[Sanity Fallback] Using mock data for teardown slug '${slug}'.`);
    return mockTeardowns.find((t) => t.slug === slug) || null;
  }
  try {
    const teardown = await sanityClient.fetch(
      `*[_type == "teardown" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        "date": select(defined(year) => year, "2024"),
        category,
        summary,
        readTime,
        "coverImage": select(defined(coverImage.asset) => coverImage.asset->url, coverImage),
        "myRole": role,
        researchEvidence,
        researchStats,
        keyFindings,
        riceTable,
        recommendations,
        projectLinks,
        "relatedTeardowns": relatedTeardowns[]-> {
          title,
          "slug": slug.current,
          category,
          readTime,
          "coverImage": coverImage.asset->url
        }
      }`,
      { slug },
      fetchOptions
    );

    if (!teardown) {
      console.warn(`[Sanity Fallback] Teardown slug '${slug}' not found in Sanity. Searching mockTeardowns.`);
      return mockTeardowns.find((t) => t.slug === slug) || null;
    }

    // Normalize teardown fields so all array properties are guaranteed non-null
    const mockMatch = mockTeardowns.find((t) => t.slug === slug);

    // Normalize body paragraphs
    let body: string[] = [];
    if (Array.isArray(teardown.body) && teardown.body.length > 0) {
      body = teardown.body;
    } else if (typeof teardown.researchEvidence === "string" && teardown.researchEvidence.trim() !== "") {
      body = teardown.researchEvidence.split("\n").filter((p: string) => p.trim() !== "");
    } else if (mockMatch && Array.isArray(mockMatch.body)) {
      body = mockMatch.body;
    } else if (typeof teardown.summary === "string") {
      body = [teardown.summary];
    }

    // Normalize keyFindings
    let keyFindings: string[] = [];
    if (Array.isArray(teardown.keyFindings) && teardown.keyFindings.length > 0) {
      keyFindings = teardown.keyFindings.map((item: any) =>
        typeof item === "string" ? item : (item?.text || item?.finding || item?.title || JSON.stringify(item))
      );
    } else if (mockMatch && Array.isArray(mockMatch.keyFindings)) {
      keyFindings = mockMatch.keyFindings;
    }

    // Normalize researchDetails
    let researchDetails = teardown.researchDetails;
    if (!researchDetails) {
      if (teardown.researchEvidence || (Array.isArray(teardown.researchStats) && teardown.researchStats.length > 0)) {
        researchDetails = {
          overview: teardown.researchEvidence || teardown.summary || "",
          metrics: Array.isArray(teardown.researchStats)
            ? teardown.researchStats.map((s: any) =>
                typeof s === "string"
                  ? s
                  : `${s.label || s.metric || ""}: ${s.value || s.stat || ""}`
              )
            : [],
        };
      } else if (mockMatch?.researchDetails) {
        researchDetails = mockMatch.researchDetails;
      }
    }

    // Normalize riceScores
    let riceScores = teardown.riceScores;
    if (!Array.isArray(riceScores) || riceScores.length === 0) {
      if (Array.isArray(teardown.riceTable) && teardown.riceTable.length > 0) {
        riceScores = teardown.riceTable.map((r: any) => ({
          feature: r.feature || r.opportunity || r.title || "Feature",
          reach: typeof r.reach === "number" ? r.reach : undefined,
          impact: typeof r.impact === "number" ? r.impact : undefined,
          confidence: typeof r.confidence === "number" ? r.confidence : undefined,
          effort: typeof r.effort === "number" ? r.effort : undefined,
          rice: typeof r.score === "number" ? r.score : (typeof r.rice === "number" ? r.rice : 0),
        }));
      } else if (mockMatch?.riceScores) {
        riceScores = mockMatch.riceScores;
      }
    }

    // Normalize recommendations
    let recommendations = teardown.recommendations;
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      if (mockMatch?.recommendations) {
        recommendations = mockMatch.recommendations;
      } else {
        recommendations = [];
      }
    }

    // Normalize projectLinks
    let projectLinks = teardown.projectLinks;
    if (!Array.isArray(projectLinks) || projectLinks.length === 0) {
      if (mockMatch?.projectLinks) {
        projectLinks = mockMatch.projectLinks;
      } else {
        projectLinks = [];
      }
    }

    return {
      ...teardown,
      body,
      keyFindings,
      researchDetails,
      riceScores,
      recommendations,
      projectLinks,
      myRole: teardown.myRole || mockMatch?.myRole || "",
      category: teardown.category || mockMatch?.category || "Product Strategy",
      readTime: teardown.readTime || mockMatch?.readTime || "8 min",
      date: teardown.date || mockMatch?.date || "2024",
      summary: teardown.summary || mockMatch?.summary || "",
      coverImage: teardown.coverImage || mockMatch?.coverImage || "",
    };
  } catch (error) {
    console.error(`Failed to fetch teardown for slug ${slug}:`, error);
    return mockTeardowns.find((t) => t.slug === slug) || null;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using mockCaseStudies.");
    return mockCaseStudies;
  }
  try {
    const caseStudies = await sanityClient.fetch(
      `*[_type == "caseStudy"] | order(date desc) {
        title,
        "slug": slug.current,
        date,
        category,
        summary,
        readTime,
        featured,
        isPlaceholder,
        "tools": stackMethods,
        "coverImage": coverImage.asset->url,
        results,
        lessonsLearned
      }`,
      {},
      fetchOptions
    );
    if (!caseStudies || caseStudies.length === 0) {
      console.warn("[Sanity Fallback] No caseStudy documents in Sanity. Falling back to mockCaseStudies.");
      return mockCaseStudies;
    }
    return caseStudies;
  } catch (error) {
    console.error("Failed to fetch case studies from Sanity:", error);
    return mockCaseStudies;
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!sanityConfigured) {
    console.warn(`[Sanity Fallback] Using mock data for case study slug '${slug}'.`);
    return mockCaseStudies.find((s) => s.slug === slug) || null;
  }
  try {
    const caseStudy = await sanityClient.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        date,
        category,
        summary,
        readTime,
        featured,
        isPlaceholder,
        "tools": stackMethods,
        "coverImage": coverImage.asset->url,
        challenge,
        results,
        lessonsLearned,
        "relatedCaseStudies": relatedCaseStudies[]-> {
          title,
          "slug": slug.current,
          category,
          "coverImage": coverImage.asset->url
        }
      }`,
      { slug },
      fetchOptions
    );

    if (!caseStudy) {
      console.warn(`[Sanity Fallback] Case Study slug '${slug}' not found in Sanity. Searching mockCaseStudies.`);
      return mockCaseStudies.find((s) => s.slug === slug) || null;
    }

    const mockMatch = mockCaseStudies.find((s) => s.slug === slug);

    // Normalize tools
    let tools: string[] = [];
    if (Array.isArray(caseStudy.tools) && caseStudy.tools.length > 0) {
      tools = caseStudy.tools;
    } else if (mockMatch && Array.isArray(mockMatch.tools)) {
      tools = mockMatch.tools;
    }

    // Normalize body
    let body: string[] = [];
    if (Array.isArray(caseStudy.body) && caseStudy.body.length > 0) {
      body = caseStudy.body;
    } else if (typeof caseStudy.challenge === "string" && caseStudy.challenge.trim() !== "") {
      body = caseStudy.challenge.split("\n").filter((p: string) => p.trim() !== "");
    } else if (mockMatch && Array.isArray(mockMatch.body)) {
      body = mockMatch.body;
    } else if (typeof caseStudy.summary === "string") {
      body = [caseStudy.summary];
    }

    // Normalize results
    let results: string[] = [];
    if (Array.isArray(caseStudy.results) && caseStudy.results.length > 0) {
      results = caseStudy.results;
    } else if (mockMatch && Array.isArray(mockMatch.results)) {
      results = mockMatch.results;
    }

    // Normalize lessons
    let lessons: string[] = [];
    if (Array.isArray(caseStudy.lessons) && caseStudy.lessons.length > 0) {
      lessons = caseStudy.lessons;
    } else if (Array.isArray(caseStudy.lessonsLearned) && caseStudy.lessonsLearned.length > 0) {
      lessons = caseStudy.lessonsLearned;
    } else if (mockMatch && Array.isArray(mockMatch.lessons)) {
      lessons = mockMatch.lessons;
    }

    return {
      ...caseStudy,
      tools,
      body,
      results,
      lessons,
      category: caseStudy.category || mockMatch?.category || "AI Product Case Study",
      date: caseStudy.date || mockMatch?.date || "2024",
      readTime: caseStudy.readTime || mockMatch?.readTime || "8 min",
      summary: caseStudy.summary || mockMatch?.summary || "",
      coverImage: caseStudy.coverImage || mockMatch?.coverImage || "",
    };
  } catch (error) {
    console.error(`Failed to fetch case study for slug ${slug}:`, error);
    return mockCaseStudies.find((s) => s.slug === slug) || null;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using mockProducts.");
    return mockProducts;
  }
  try {
    const products = await sanityClient.fetch(
      `*[_type == "product"] {
        name,
        tagline,
        description,
        status,
        icon,
        linkType,
        "caseStudySlug": caseStudyRef->slug.current,
        externalUrl,
        linkLabel,
        "coverImage": productImage.asset->url
      }`,
      {},
      fetchOptions
    );
    if (!products || products.length === 0) {
      console.warn("[Sanity Fallback] No product documents in Sanity. Falling back to mockProducts.");
      return mockProducts;
    }
    return products;
  } catch (error) {
    console.error("Failed to fetch products from Sanity:", error);
    return mockProducts;
  }
}
