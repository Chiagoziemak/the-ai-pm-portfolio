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
  InsightCard,
  PainPointCard,
  ProductDecisionCard,
  BeforeAfterBlock,
} from "@/data/mockData";

export interface NavLink {
  label: string;
  url: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  siteTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  siteUrl?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
  location?: string;
  navTitleText?: string;
  navLogoUrl?: string;
  navLinks?: NavLink[];
  navCtaLabel?: string;
  navCtaUrl?: string;
  caseStudiesPageEnabled?: boolean;
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
  footerLinks?: FooterLink[];
  contactEmail?: string;
}

export interface LearningTrackItem {
  title: string;
  provider?: string;
  status?: string;
  tags?: string[];
  description?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
  deliverables?: string[];
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  authorPhotoUrl?: string;
  linkedinUrl?: string;
  context?: string;
}

export interface MarqueeItem {
  title: string;
  desc?: string;
  url?: string;
  color?: string;
}

export interface HomePageData {
  metaTitle?: string;
  metaDescription?: string;
  heroHeading?: string;
  heroSubheading?: string;
  introText?: string;
  heroImage?: any;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroImagePosition?: "left" | "right" | string;
  heroTagChips?: string[];
  currentStack?: string[];
  learningTrack?: LearningTrackItem[];
  processSteps?: ProcessStep[];
  testimonials?: Testimonial[];
  testimonialScrollInterval?: number;
  marqueeEnabled?: boolean;
  marqueeSpeed?: number;
  marqueeItems?: MarqueeItem[];
  availabilityBadge?: string;
  ctaButtons?: { label: string; url: string }[];
  featuredCaseStudies?: CaseStudy[];
  featuredTeardowns?: Teardown[];
  credentialsShown?: { label: string; sublabel?: string }[];
  sectionOrder?: string[];
}

export interface AboutPageData extends AboutData {
  metaTitle?: string;
  metaDescription?: string;
  headline?: string;
  introText?: string;
  headshotUrl?: string;
  headshotAlt?: string;
  taglineChips?: string[];
  closingHeadline?: string;
  closingText?: string;
}

export interface ContactPageData {
  metaTitle?: string;
  metaDescription?: string;
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
      metaDescription: "Experienced SaaS Product Manager & Certified Scrum Master transitioning to AI Product Management and AI Engineering. Builder of ResumeGenie.",
      siteUrl: "https://chiagoziemak.dev",
      location: "Lagos, Nigeria",
      contactEmail: "melvynmatthews19@gmail.com",
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
        siteUrl,
        "ogImageUrl": ogImage.asset->url,
        "ogImageAlt": ogImage.alt,
        location,
        navTitleText,
        "navLogoUrl": navLogoImage.asset->url,
        navLinks[] { label, url },
        navCtaLabel,
        navCtaUrl,
        caseStudiesPageEnabled,
        navLabels,
        socialLinks,
        "resumeUrl": resumeFile.asset->url,
        "faviconUrl": favicon.asset->url,
        footerText,
        footerLinks[] { label, url },
        contactEmail
      }`,
      {},
      fetchOptions
    );
    if (!res) {
      console.warn("[Sanity Fallback] Site settings document 'siteSettings' not found in Sanity. Using fallback values.");
      return {
        siteTitle: "Chiagoziem Melvin Akobundu | AI Product Manager Portfolio",
        metaDescription: "Experienced SaaS Product Manager & Certified Scrum Master transitioning to AI Product Management and AI Engineering.",
        contactEmail: "melvynmatthews19@gmail.com",
        location: "Lagos, Nigeria",
      };
    }
    return res;
  } catch (error) {
    console.error("Error fetching site settings from Sanity:", error);
    return {
      siteTitle: "Chiagoziem Melvin Akobundu | AI Product Manager Portfolio",
      metaDescription: "Experienced SaaS Product Manager & Certified Scrum Master transitioning to AI Product Management and AI Engineering.",
      contactEmail: "melvynmatthews19@gmail.com",
      location: "Lagos, Nigeria",
    };
  }
}

export async function getHomePageData(): Promise<HomePageData> {
  if (!sanityConfigured) {
    console.warn("[Sanity Fallback] Using mock home page data.");
    return {
      heroHeading: "Chiagoziem Melvin Akobundu",
      heroSubheading: "AI Product Manager & Engineer",
      introText:
        "Architecting and evaluating agentic AI workflows, LLM applications, and high-growth consumer products. CSPO certified with expertise in technical product management and full-stack software development.",
      heroImageUrl: "/profile-hero.jpg",
      heroImageAlt: "Chiagoziem Melvin Akobundu — AI Product Manager",
      availabilityBadge: "Available for AI PM Roles",
      currentStack: ["LangChain", "Next.js", "Python", "OpenAI / Claude API", "FastAPI", "Vector DBs"],
      heroTagChips: ["CSPO Certified", "Agentic AI", "Next.js & Python"],
      credentialsShown: [
        { label: "CSPO®", sublabel: "Scrum Alliance" },
        { label: "CSM®", sublabel: "Scrum Alliance" },
        { label: "DeepLearning.AI", sublabel: "GenAI Fundamentals" },
      ],
      processSteps: [
        {
          number: "01",
          title: "Discovery & Problem Framing",
          description: "Rigorous user research, cohort interviews, and pain point quantification to find genuine product opportunities.",
          icon: "FiSearch",
          deliverables: ["User Research Synthesis", "Opportunity Solution Tree", "Pain Point Mapping"],
        },
        {
          number: "02",
          title: "Hypothesis & Quantitative Validation",
          description: "Formulating testable product hypotheses, defining North Star metrics, and prioritizing features with RICE & Kano frameworks.",
          icon: "FiTarget",
          deliverables: ["RICE Scoring Matrix", "Hypothesis Log", "Success Metrics Doc"],
        },
        {
          number: "03",
          title: "Technical Architecture & Prototyping",
          description: "Translating PRDs into functional AI prototypes, designing prompt chains, and evaluating LLM latency vs. accuracy tradeoffs.",
          icon: "FiCpu",
          deliverables: ["PRD & System Specs", "Interactive Prototype", "API Schema Definition"],
        },
        {
          number: "04",
          title: "Agile Execution & Growth Loops",
          description: "Leading sprints, establishing feedback analytics loops, and iterating rapidly based on real user behavioral data.",
          icon: "FiTrendingUp",
          deliverables: ["Sprint Backlogs", "Funnel Analytics Dashboard", "Iteration Roadmap"],
        },
      ],
      testimonials: [
        {
          quote: "Chiagoziem brings exceptional analytical clarity to ambiguous product challenges. His teardowns dissect complex platform UX and business strategy with engineer-level precision.",
          authorName: "Marcus Vance",
          authorRole: "Principal AI Architect",
          authorCompany: "VentureScale Labs",
          authorPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          linkedinUrl: "https://linkedin.com",
          context: "Platform Strategy Collaboration",
        },
        {
          quote: "Working with Chiagoziem on ResumeGenie was inspiring. He balances deep AI architecture knowledge with practical user empathy, ensuring every feature drives measurable engagement.",
          authorName: "Sarah Chen",
          authorRole: "Lead Product Designer",
          authorCompany: "Apex Studio",
          authorPhotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
          linkedinUrl: "https://linkedin.com",
          context: "ResumeGenie AI Development",
        },
        {
          quote: "One of the sharpest product minds in the modern AI space. His data-driven hypothesis framing and CSPO rigor elevate cross-functional velocity immediately.",
          authorName: "David Okafor",
          authorRole: "Engineering VP",
          authorCompany: "FinTech Africa",
          authorPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          linkedinUrl: "https://linkedin.com",
          context: "Agile Product Coaching",
        },
      ],
      testimonialScrollInterval: 5,
      marqueeEnabled: true,
      marqueeSpeed: 25,
      marqueeItems: [
        { title: "ResumeGenie AI Agent", desc: "AI Autopilot", color: "from-cyan-500/20 to-teal-500/20" },
        { title: "Netflix Localization & Pricing", desc: "Teardown", color: "from-red-500/20 to-pink-500/20" },
        { title: "Claude AI Strategy Teardown", desc: "Teardown", color: "from-purple-500/20 to-indigo-500/20" },
        { title: "Canva Creator Workflows", desc: "Teardown", color: "from-blue-500/20 to-cyan-500/20" },
        { title: "Chowdeck Marketplace Study", desc: "Teardown", color: "from-amber-500/20 to-orange-500/20" },
        { title: "WhatsApp Media & Status Controls", desc: "Teardown", color: "from-emerald-500/20 to-teal-500/20" },
      ],
      learningTrack: [
        {
          title: "DeepLearning.AI — Building Agentic AI Workflows",
          provider: "DeepLearning.AI",
          status: "In Progress",
          tags: ["LangChain", "AutoGen", "Multi-Agent"],
          description: "Architecting multi-agent collaboration systems, autonomous tool usage, and reflection-based LLM architectures.",
        },
        {
          title: "Reforge — Advanced Product Management",
          provider: "Reforge",
          status: "Completed",
          tags: ["Product Strategy", "Growth Loops", "Retention"],
          description: "Systemic approaches to product-led growth, qualitative user insights, and retention monetization frameworks.",
        },
        {
          title: "FastAPI & Vector Database Production Deployment",
          provider: "Self-Directed Lab",
          status: "Completed",
          tags: ["Python", "Pinecone", "Qdrant", "FastAPI"],
          description: "Building production RAG vector search pipelines with hybrid sparse/dense retrieval and reranking models.",
        },
      ],
      sectionOrder: ["featuredWorkStrip", "caseStudies", "teardowns", "howIWork", "testimonials", "learningTrack"],
    };
  }
  try {
    const data = await sanityClient.fetch(
      `*[_type == "homePage"][0] {
        metaTitle,
        metaDescription,
        heroHeading,
        heroSubheading,
        introText,
        heroImage,
        "heroImageUrl": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        heroImagePosition,
        heroTagChips,
        currentStack,
        sectionOrder,
        learningTrack,
        processSteps[] {
          number,
          title,
          description,
          icon,
          deliverables
        },
        testimonials[] {
          quote,
          authorName,
          authorRole,
          authorCompany,
          "authorPhotoUrl": authorPhoto.asset->url,
          linkedinUrl,
          context
        },
        testimonialScrollInterval,
        marqueeEnabled,
        marqueeSpeed,
        marqueeItems[] {
          title,
          desc,
          url,
          color
        },
        availabilityBadge,
        ctaButtons,
        credentialsShown,
        "featuredCaseStudies": featuredCaseStudies[]-> {
          title,
          metaTitle,
          metaDescription,
          "slug": slug.current,
          date,
          category,
          summary,
          readTime,
          badgeLabel,
          cardStats,
          "coverImage": coverImage.asset->url,
          "coverImageAlt": coverImage.alt,
          featured,
          isPlaceholder,
          "tools": stackMethods,
          results,
          lessonsLearned,
          productDecisions[] {
            decision,
            context,
            options,
            chosenOption,
            rationale,
            tradeoffs,
            outcome
          },
          beforeAfter[] {
            beforeLabel,
            beforeDescription,
            "beforeImageUrl": beforeImage.asset->url,
            afterLabel,
            afterDescription,
            "afterImageUrl": afterImage.asset->url,
            impact
          }
        },
        "featuredTeardowns": featuredTeardowns[]-> {
          title,
          metaTitle,
          metaDescription,
          "slug": slug.current,
          date,
          category,
          summary,
          readTime,
          "coverImage": coverImage.asset->url,
          "coverImageAlt": coverImage.alt,
          "myRole": role,
          body,
          keyFindings,
          insightCards[] {
            number,
            title,
            description,
            evidence
          },
          painPoints[] {
            title,
            description,
            evidence,
            severity
          },
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
      headline: mockAboutData.headline,
      introText: mockAboutData.introText,
      headshotUrl: mockAboutData.headshotUrl,
      headshotAlt: mockAboutData.headshotAlt,
      skills: mockAboutData.skills,
      journey: mockAboutData.journey,
      certifications: mockAboutData.certifications,
    };
  }
  try {
    const data = await sanityClient.fetch(
      `*[_type == "aboutPage"][0] {
        metaTitle,
        metaDescription,
        headline,
        introText,
        "headshotUrl": headshot.asset->url,
        "headshotAlt": headshot.alt,
        taglineChips,
        "skills": technicalProficiency[] {
          category,
          "items": skills
        },
        "journey": professionalTrajectory[] {
          "year": years,
          role,
          company,
          description,
          cardPosition
        },
        "certifications": credentials[] {
          "name": select(
            defined(sublabel) => label + " - " + sublabel,
            label
          )
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
        headline: mockAboutData.headline,
        introText: mockAboutData.introText,
        headshotUrl: mockAboutData.headshotUrl,
        headshotAlt: mockAboutData.headshotAlt,
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
      headline: mockAboutData.headline,
      introText: mockAboutData.introText,
      headshotUrl: mockAboutData.headshotUrl,
      headshotAlt: mockAboutData.headshotAlt,
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
        metaTitle,
        metaDescription,
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
        metaTitle,
        metaDescription,
        "slug": slug.current,
        "date": select(defined(year) => year, "2024"),
        category,
        summary,
        readTime,
        "coverImage": select(defined(coverImage.asset) => coverImage.asset->url, coverImage),
        "coverImageAlt": coverImage.alt,
        "myRole": role,
        researchEvidence,
        researchStats,
        keyFindingsIcon,
        keyFindings,
        insightCards[] {
          number,
          title,
          description,
          evidence
        },
        painPointsIcon,
        painPoints[] {
          title,
          description,
          evidence,
          severity
        },
        riceIcon,
        riceTable,
        recommendationsIcon,
        recommendations,
        linksIcon,
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
        metaTitle,
        metaDescription,
        "slug": slug.current,
        "date": select(defined(year) => year, "2024"),
        category,
        summary,
        readTime,
        "coverImage": select(defined(coverImage.asset) => coverImage.asset->url, coverImage),
        "coverImageAlt": coverImage.alt,
        "myRole": role,
        researchEvidence,
        researchStats,
        keyFindingsIcon,
        keyFindings,
        insightCards[] {
          number,
          title,
          description,
          evidence
        },
        painPointsIcon,
        painPoints[] {
          title,
          description,
          evidence,
          severity
        },
        riceIcon,
        riceTable,
        recommendationsIcon,
        recommendations,
        linksIcon,
        projectLinks,
        "relatedTeardowns": relatedTeardowns[]-> {
          title,
          "slug": slug.current,
          category,
          readTime,
          "coverImage": coverImage.asset->url,
          "coverImageAlt": coverImage.alt
        }
      }`,
      { slug },
      fetchOptions
    );

    if (!teardown) {
      console.warn(`[Sanity Fallback] Teardown slug '${slug}' not found in Sanity. Searching mockTeardowns.`);
      return mockTeardowns.find((t) => t.slug === slug) || null;
    }

    const mockMatch = mockTeardowns.find((t) => t.slug === slug);

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

    let keyFindings: string[] = [];
    if (Array.isArray(teardown.keyFindings) && teardown.keyFindings.length > 0) {
      keyFindings = teardown.keyFindings.map((item: any) =>
        typeof item === "string" ? item : (item?.text || item?.finding || item?.title || JSON.stringify(item))
      );
    } else if (mockMatch && Array.isArray(mockMatch.keyFindings)) {
      keyFindings = mockMatch.keyFindings;
    }

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

    let recommendations = teardown.recommendations;
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      if (mockMatch?.recommendations) {
        recommendations = mockMatch.recommendations;
      } else {
        recommendations = [];
      }
    }

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
      insightCards: Array.isArray(teardown.insightCards) ? teardown.insightCards : [],
      painPoints: Array.isArray(teardown.painPoints) ? teardown.painPoints : [],
      myRole: teardown.myRole || mockMatch?.myRole || "",
      category: teardown.category || mockMatch?.category || "Product Strategy",
      readTime: teardown.readTime || mockMatch?.readTime || "8 min",
      date: teardown.date || mockMatch?.date || "2024",
      summary: teardown.summary || mockMatch?.summary || "",
      coverImage: teardown.coverImage || mockMatch?.coverImage || "",
      coverImageAlt: teardown.coverImageAlt || mockMatch?.coverImageAlt || `${teardown.title} cover`,
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
        metaTitle,
        metaDescription,
        "slug": slug.current,
        date,
        category,
        summary,
        readTime,
        badgeLabel,
        cardStats,
        featured,
        isPlaceholder,
        "tools": stackMethods,
        "coverImage": coverImage.asset->url,
        "coverImageAlt": coverImage.alt,
        results,
        lessonsLearned,
        productDecisions[] {
          decision,
          context,
          options,
          chosenOption,
          rationale,
          tradeoffs,
          outcome
        },
        beforeAfter[] {
          beforeLabel,
          beforeDescription,
          "beforeImageUrl": beforeImage.asset->url,
          afterLabel,
          afterDescription,
          "afterImageUrl": afterImage.asset->url,
          impact
        }
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
        metaTitle,
        metaDescription,
        "slug": slug.current,
        date,
        category,
        summary,
        readTime,
        badgeLabel,
        cardStats,
        featured,
        isPlaceholder,
        summaryIcon,
        toolsIcon,
        "tools": stackMethods,
        "coverImage": coverImage.asset->url,
        "coverImageAlt": coverImage.alt,
        challengeIcon,
        challenge,
        resultsIcon,
        results,
        lessonsLearned,
        decisionsIcon,
        productDecisions[] {
          decision,
          context,
          options,
          chosenOption,
          rationale,
          tradeoffs,
          outcome
        },
        beforeAfterIcon,
        beforeAfter[] {
          beforeLabel,
          beforeDescription,
          "beforeImageUrl": beforeImage.asset->url,
          afterLabel,
          afterDescription,
          "afterImageUrl": afterImage.asset->url,
          impact
        },
        "relatedCaseStudies": relatedCaseStudies[]-> {
          title,
          "slug": slug.current,
          category,
          badgeLabel,
          cardStats,
          "coverImage": coverImage.asset->url,
          "coverImageAlt": coverImage.alt
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

    let tools: string[] = [];
    if (Array.isArray(caseStudy.tools) && caseStudy.tools.length > 0) {
      tools = caseStudy.tools;
    } else if (mockMatch && Array.isArray(mockMatch.tools)) {
      tools = mockMatch.tools;
    }

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

    let results: string[] = [];
    if (Array.isArray(caseStudy.results) && caseStudy.results.length > 0) {
      results = caseStudy.results;
    } else if (mockMatch && Array.isArray(mockMatch.body)) {
      results = mockMatch.results;
    }

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
      productDecisions: Array.isArray(caseStudy.productDecisions) ? caseStudy.productDecisions : [],
      beforeAfter: Array.isArray(caseStudy.beforeAfter) ? caseStudy.beforeAfter : [],
      category: caseStudy.category || mockMatch?.category || "AI Product Case Study",
      date: caseStudy.date || mockMatch?.date || "2024",
      readTime: caseStudy.readTime || mockMatch?.readTime || "8 min",
      summary: caseStudy.summary || mockMatch?.summary || "",
      coverImage: caseStudy.coverImage || mockMatch?.coverImage || "",
      coverImageAlt: caseStudy.coverImageAlt || mockMatch?.coverImageAlt || `${caseStudy.title} cover`,
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
        "coverImage": select(defined(coverImage.asset) => coverImage.asset->url, productImage.asset->url),
        "coverImageAlt": select(defined(coverImage.alt) => coverImage.alt, name)
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
