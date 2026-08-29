export interface ProjectLink {
  label: string;
  url: string;
}

export interface RiceScoreItem {
  feature: string;
  reach?: number;
  impact?: number;
  confidence?: string | number;
  effort?: number;
  rice: number;
}

export interface InsightCard {
  number?: string;
  title: string;
  description: string;
  evidence?: string;
}

export interface PainPointCard {
  title: string;
  description: string;
  evidence?: string;
  severity?: string;
}

export interface ProductDecisionCard {
  decision: string;
  context: string;
  options?: string[];
  chosenOption?: string;
  rationale: string;
  tradeoffs?: string;
  outcome?: string;
}

export interface BeforeAfterBlock {
  beforeLabel: string;
  beforeDescription: string;
  beforeImageUrl?: string;
  afterLabel: string;
  afterDescription: string;
  afterImageUrl?: string;
  impact?: string;
}

export interface Teardown {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  coverImage: string;
  coverImageAlt?: string;
  myRole: string;
  researchDetails?: {
    overview: string;
    metrics?: string[];
  };
  body: string[];
  keyFindings: string[];
  keyPainPoints?: string[];
  insightCards?: InsightCard[];
  painPoints?: PainPointCard[];
  riceScores?: RiceScoreItem[];
  recommendations: {
    title: string;
    description: string;
    priority?: string;
    riceScore?: number;
  }[];
  projectLinks: ProjectLink[];
}

export interface CaseStudy {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  readTime?: string;
  badgeLabel?: string;
  cardStats?: { value: string; label?: string }[];
  tools: string[];
  coverImage: string;
  coverImageAlt?: string;
  featured?: boolean;
  isPlaceholder?: boolean;
  body: string[];
  results: string[];
  lessons: string[];
  productDecisions?: ProductDecisionCard[];
  beforeAfter?: BeforeAfterBlock[];
}

export interface Product {
  name: string;
  metaTitle?: string;
  metaDescription?: string;
  tagline: string;
  description: string;
  status?: string;
  icon?: string;
  linkType?: string;
  caseStudySlug?: string;
  externalUrl?: string;
  linkLabel?: string;
  coverImage?: string;
  coverImageAlt?: string;
}

export interface AboutData {
  bio: string;
  headline?: string;
  introText?: string;
  headshotUrl?: string;
  headshotAlt?: string;
  skills: {
    category: string;
    items: { name: string; level: number }[];
  }[];
  journey: {
    year: string;
    role: string;
    company: string;
    description: string;
  }[];
  certifications: string[];
}

export const mockTeardowns: Teardown[] = [
  {
    title: "Netflix Mobile App Teardown",
    slug: "netflix-mobile-app",
    date: "2024",
    category: "Entertainment / Streaming",
    summary:
      "A deep dive into Netflix's mobile user experience, analyzing search discoverability, content recommendations, offline download flows, and personalized UI mechanisms.",
    readTime: "8 min",
    coverImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=80",
    myRole: "Independent PM Teardown & Product Strategy Analysis",
    researchDetails: {
      overview: "Surveys and usability sessions conducted with 45+ daily streaming users across iOS & Android.",
      metrics: ["65.8% aged 25-34", "82% watch on mobile weekly", "41% find offline downloads confusing"],
    },
    body: [
      "Netflix leads global video streaming with over 260 million subscribers. However, on mobile devices, user attention spans are severely constrained and choice fatigue frequently leads to session abandonment.",
      "This teardown analyzes the critical touchpoints in the mobile user journey—from app launch through content selection and playback—identifying key friction points and proposing high-impact product enhancements evaluated via RICE prioritization.",
    ],
    keyFindings: [
      "Choice Fatigue: Users spend an average of 7.4 minutes browsing before selecting a title or exiting.",
      "Offline Download Friction: The download management interface lacks batch controls and storage visualizers.",
      "Trailer Autoplay Disruption: Unwanted audio/video playback during vertical scrolling creates user frustration.",
    ],
    keyPainPoints: [
      "Browsing overload without quick preview trailers on cellular connections.",
      "Storage limits on offline content lack clear visual indicator bars.",
    ],
    riceScores: [
      { feature: "AI-Powered 'Quick 30s Clip' Feed", reach: 80, impact: 4, confidence: 0.8, effort: 3, rice: 85.3 },
      { feature: "Visual Storage & Batch Download Bar", reach: 50, impact: 3, confidence: 0.9, effort: 2, rice: 67.5 },
      { feature: "Smart Audio Mute on Scroll", reach: 90, impact: 2, confidence: 0.95, effort: 1, rice: 171.0 },
    ],
    recommendations: [
      {
        title: "Smart Audio Mute on Vertical Scroll",
        description: "Mute video previews by default during fast scrolling; enable tap-to-unmute to eliminate abrupt audio spikes.",
        priority: "High",
        riceScore: 171.0,
      },
      {
        title: "TikTok-Style 'Shorts' Discovery Feed",
        description: "Introduce a vertical bite-sized clip stream allowing instant content sampling with one-tap add-to-watchlist.",
        priority: "High",
        riceScore: 85.3,
      },
    ],
    projectLinks: [
      { label: "Interactive Figma Wireframes", url: "https://figma.com" },
      { label: "Full Usability Survey Data (CSV)", url: "https://drive.google.com" },
    ],
  },
  {
    title: "Claude AI Product Strategy Teardown",
    slug: "claude-ai-strategy",
    date: "2024",
    category: "Generative AI & LLMs",
    summary:
      "Strategic evaluation of Anthropic's Claude 3.5 Sonnet UX, artifact workspace features, context window utilization, and enterprise deployment workflows.",
    readTime: "10 min",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    myRole: "Lead Product Strategy & Competitive Analyst",
    body: [
      "Anthropic's Claude 3.5 Sonnet represents a paradigm shift in how users interact with LLM outputs via Artifacts—side-by-side dedicated rendering windows.",
      "This study examines how Artifacts bridge developer workflows, UI generation, and document synthesis, comparing Claude's product positioning against OpenAI ChatGPT and Google Gemini.",
    ],
    keyFindings: [
      "Artifacts boosted code iteration speed by 42% compared to inline chat code blocks.",
      "Project Knowledge Bases reduce prompt repetition by storing persistent team documentation.",
    ],
    projectLinks: [{ label: "Competitive Matrix Sheet", url: "https://notion.so" }],
    recommendations: [],
  },
];

export const mockCaseStudies: CaseStudy[] = [
  {
    title: "ResumeGenie — Autonomous AI Job Application Agent",
    slug: "resumegenie-ai-agent",
    date: "2024",
    category: "AI Engineering & Product Strategy",
    summary:
      "Designed and engineered an end-to-end agentic AI platform that parses job descriptions, tailors resume bullet points, generates custom cover letters, and automates ATS compliance scoring in real-time.",
    readTime: "12 min",
    badgeLabel: "Featured AI Product",
    cardStats: [
      { value: "4.2x", label: "Application Velocity" },
      { value: "94%", label: "ATS Match Rate" },
    ],
    tools: ["Next.js 14", "Python", "LangChain", "OpenAI GPT-4o", "Tailwind CSS", "Sanity CMS"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    featured: true,
    body: [
      "Job seekers spend an average of 45–60 minutes tailoring a single resume and cover letter for each target role. Manual keyword matching against Applicant Tracking Systems (ATS) is slow, repetitive, and error-prone.",
      "ResumeGenie solves this by deploying a multi-agent AI architecture: an Intake Agent parses the target job description, a Reasoning Agent evaluates candidate experience gaps, and an Executive Generator formats ATS-optimized resumes and cover letters in seconds.",
    ],
    results: [
      "Reduced resume tailoring time from 45 minutes to 90 seconds per application.",
      "Achieved a 94%+ ATS keyword match score across 200+ simulated application submissions.",
      "Built with full human-in-the-loop controls allowing manual override of generated bullet points.",
    ],
    lessons: [
      "Prompt chaining with explicit structured JSON outputs (via Zod/Pydantic schemas) is far more reliable than unstructured zero-shot generation.",
      "Exposing real-time streaming feedback during multi-agent execution builds critical user trust.",
    ],
  },
  {
    title: "Chowdeck B2B Merchant Onboarding Optimization",
    slug: "chowdeck-merchant-onboarding",
    date: "2024",
    category: "Marketplace & Logistics",
    summary:
      "Streamlined merchant menu ingestion and KYC verification for Nigeria's leading food delivery marketplace, cutting onboarding time from 5 days to 6 hours.",
    readTime: "7 min",
    tools: ["Product Strategy", "Figma", "User Journey Mapping", "Mixpanel", "SQL"],
    coverImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80",
    featured: false,
    body: [
      "Chowdeck's rapid expansion across West Africa was constrained by manual menu entry and back-and-forth merchant approval cycles.",
      "By designing an automated OCR menu scanner and self-serve onboarding portal, merchant drop-off decreased by 68%.",
    ],
    results: [
      "Onboarding cycle time reduced from 120 hours to 6 hours.",
      "Merchant drop-off during KYC verification dropped from 34% to 11%.",
    ],
    lessons: [
      "Eliminating synchronous manual verification in favor of asynchronous AI-assisted validation drastically scales operational capacity.",
    ],
  },
];

export const mockProducts: Product[] = [
  {
    name: "ResumeGenie AI",
    tagline: "Autonomous Agentic Job Application Platform",
    description:
      "AI-powered autopilot that crafts custom ATS-optimized resumes, cover letters, and tailors application responses in seconds.",
    status: "Live Beta",
    icon: "Brain",
    linkType: "caseStudy",
    caseStudySlug: "resumegenie-ai-agent",
    linkLabel: "Read Case Study",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
];

export const mockAboutData: AboutData = {
  bio: "I am a SaaS Product Manager, Certified Product Owner (CSPO®), and Certified ScrumMaster (CSM®) pivoting into AI Product Management and AI Engineering. With over 4 years of experience delivering scalable web applications, marketplace features, and user-centric workflows, I specialize in combining data-driven PM frameworks with hands-on AI model integration.",
  skills: [
    {
      category: "AI & Engineering Stack",
      items: [
        { name: "Python / PyTorch / FastAI", level: 85 },
        { name: "LangChain / LlamaIndex / Agentic Workflows", level: 90 },
        { name: "OpenAI API / Anthropic Claude API", level: 95 },
        { name: "Next.js / TypeScript / React / Tailwind", level: 88 },
        { name: "REST APIs / GraphQL / Sanity CMS", level: 90 },
      ],
    },
    {
      category: "Product Management & Strategy",
      items: [
        { name: "Product Roadmap & Vision", level: 95 },
        { name: "Agile / Scrum (CSPO® & CSM®)", level: 98 },
        { name: "RICE / Kano Prioritization", level: 92 },
        { name: "User Research & Usability Testing", level: 90 },
        { name: "Data Analytics (SQL, Mixpanel, Amplitude)", level: 88 },
      ],
    },
  ],
  journey: [
    {
      year: "2024 - Present",
      role: "AI PM & AI Engineer (Building ResumeGenie)",
      company: "Independent AI Lab",
      description:
        "Building autonomous AI agent applications using Next.js, Python, and OpenAI APIs. Engineering prompt chains and structured output pipelines for resume tailoring and job search automation.",
    },
    {
      year: "2022 - 2024",
      role: "SaaS Product Manager",
      company: "Tech Venture Studio",
      description:
        "Led cross-functional engineering and design teams delivering web and mobile SaaS products. Managed sprint planning, product backlogs, and stakeholder alignment using Agile methodologies.",
    },
    {
      year: "2020 - 2022",
      role: "Associate Product Manager & Scrum Master",
      company: "Digital Solutions Agency",
      description:
        "Facilitated Scrum ceremonies, wrote detailed PRDs and user stories, conducted user research, and optimized conversion funnels for client web platforms.",
    },
  ],
  certifications: [
    "Certified Scrum Product Owner (CSPO®) — Scrum Alliance",
    "Certified ScrumMaster (CSM®) — Scrum Alliance",
    "DeepLearning.AI — AI for Everyone & Generative AI Fundamentals",
  ],
};
