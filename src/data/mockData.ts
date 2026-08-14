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

export interface Teardown {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  coverImage: string;
  myRole: string;
  researchDetails?: {
    overview: string;
    metrics?: string[];
  };
  body: string[];
  keyFindings: string[];
  keyPainPoints?: string[];
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
  slug: string;
  date: string;
  category: string;
  summary: string;
  tools: string[];
  coverImage: string;
  featured?: boolean;
  isPlaceholder?: boolean;
  body: string[];
  results: string[];
  lessons: string[];
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  status: "In Development" | "Coming Soon" | "Live" | string;
  coverImage: string;
  icon?: string;
  linkType?: string;
  caseStudySlug?: string;
  externalUrl?: string;
  linkLabel?: string;
}

export interface AboutData {
  bio: string;
  skills: {
    category: string;
    items: { name: string; level: number }[];
  }[];
  journey: {
    year: string;
    title: string;
    company: string;
    description: string;
  }[];
  certifications: string[];
}

export const mockTeardowns: Teardown[] = [
  {
    title: "Netflix UX & Localization Teardown: Unlocking Growth in Emerging Markets",
    slug: "netflix",
    date: "2024",
    category: "Streaming / Entertainment",
    readTime: "8 min",
    coverImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80",
    myRole: "Team Lead — Led user research, feature definition, user stories, user flows, acceptance criteria, roadmap, launch planning, wireframes, customer journey mapping, and success metrics.",
    summary: "An analytical teardown evaluating Netflix's content discovery, local pricing friction, and cultural relevance in price-sensitive emerging markets like Nigeria.",
    researchDetails: {
      overview: "Survey across 74 respondents (primarily in Nigeria), supplemented by WhatsApp qualitative interviews, Google Play & Apple App Store review analysis, X/Twitter research, and competitor benchmarking.",
      metrics: [
        "65.8% of respondents aged 25–34",
        "62.0% current Netflix subscribers | 38.0% non-subscribers",
        "36.5% stated Netflix pricing was not fair for the market",
        "22.0% reported difficulty discovering relevant content",
        "11.9% cited lack of local/culturally relevant content",
        "54.1% said they would definitely recommend Netflix"
      ]
    },
    body: [
      "Netflix has built a world-class streaming infrastructure, yet expansion into price-sensitive emerging markets presents distinct user experience and economic challenges.",
      "Through quantitative survey data (74 respondents primarily in Nigeria), user interviews via WhatsApp, and App Store sentiment analysis, we investigated why subscriber conversion and brand advocacy lag despite a vast global library.",
      "Our research revealed that content discovery bottlenecks, pricing misalignment with local purchasing power, and a deficit of culturally resonant content are the primary drivers of subscriber churn and non-subscription."
    ],
    keyFindings: [
      "Affordability is a major barrier in price-sensitive markets like Nigeria, where 36.5% of surveyed users find current subscription pricing unfair.",
      "Content discovery remains inefficient despite a massive library, with 22.0% of users struggling to find relevant titles.",
      "Demand for local and culturally relevant content is underserved, with 11.9% explicitly identifying this as a primary limitation.",
      "Netflix's core UX is functionally polished but lacks localized feature differentiation for low-bandwidth or cost-conscious cohorts.",
      "High overall brand advocacy (54.1% recommendation rate) is currently constrained by pricing and discovery friction."
    ],
    riceScores: [
      { feature: "Content Diversity & Localization", reach: 13, impact: 3, confidence: "90%", effort: 2, rice: 17.55 },
      { feature: "Cheaper Pricing Options", reach: 6, impact: 2, confidence: "70%", effort: 1, rice: 8.4 },
      { feature: "Ratings & Reviews", reach: 1, impact: 3, confidence: "90%", effort: 1, rice: 2.7 }
    ],
    recommendations: [
      {
        title: "Content Diversity & Localization",
        description: "Partner with local Nollywood and African creators to co-produce localized originals, establish dedicated regional hubs, and optimize metadata tagging for local discovery.",
        priority: "High Priority (RICE 17.55)",
        riceScore: 17.55
      },
      {
        title: "Affordable Pricing Options",
        description: "Introduce mobile-only micro-subscriptions and integrate localized payment options (mobile money, local bank transfers) to lower entry barriers.",
        priority: "Medium Priority (RICE 8.4)",
        riceScore: 8.4
      },
      {
        title: "Ratings & Reviews",
        description: "Integrate user-generated community reviews and star ratings to enhance peer validation and algorithmic recommendation precision.",
        priority: "Medium Priority (RICE 2.7)",
        riceScore: 2.7
      }
    ],
    projectLinks: [
      { label: "View User Persona", url: "https://www.canva.com/design/DAGdwlX9Ga4/TdBaTSxPw9w22eLEJ6KE1g/edit" },
      { label: "View WhatsApp Interviews", url: "https://docs.google.com/document/d/1sON6Snqu-X3CT6tCt81w_Os2lK0E_dcSQDJZwNYTKdk/edit?usp=sharing" },
      { label: "View App Store Reviews", url: "https://docs.google.com/document/d/1hCAx8uXDhUMMF6HoTBUaBFKEfV6XW9KF3fGPVeeOzRE/edit?usp=sharing" },
      { label: "View Survey Responses", url: "https://docs.google.com/spreadsheets/d/1ZvtYbEYhAxpbe8BH5OvfQzMS99b3_TwQQjMF_TlzR58/edit?usp=sharing" },
      { label: "View Proposed Features", url: "https://docs.google.com/document/d/1xQGXqXVvu0z3ITk3KOft-PyNNi28pD_TnNUoZCQon2E/edit?usp=drivesdk" },
      { label: "View Affordable Pricing User Flow", url: "https://www.figma.com/board/Rn0kvD3l3ku4PyoTGi6vfj/AFFORDABLE-PRICING-OPTIONS?t=DD5CS1atG37gpUka-1" },
      { label: "View Ratings & Reviews User Flow", url: "https://www.figma.com/board/FwD5YpnA1hkRuUb2FuWjY8/RATINGS-AND-REVIEW-FEATURES?t=DD5CS1atG37gpUka-1" },
      { label: "View Affordable Pricing Wireframe", url: "https://whimsical.com/affordable-pricing-feature-2Gm8Pn57cG5S6TrkoNAPAo" },
      { label: "View Ratings & Reviews Wireframe", url: "https://whimsical.com/rating-and-review-AFLY1WavuXzRMDydvPNp9w" },
      { label: "View Customer Journey Map", url: "https://whimsical.com/8GNin5xj5vCCpxdZMXM384" }
    ]
  },
  {
    title: "Canva Product Teardown: Optimizing Creator Workflows & Web Performance",
    slug: "canva",
    date: "2024",
    category: "Design / Productivity",
    readTime: "7 min",
    coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    myRole: "Product Manager / Teardown Assistant Team Lead — Directed competitive research, user survey synthesis, and prioritized feature solutions for export optimization and subscription accessibility.",
    summary: "Analyzing Canva's web export limitations, localized payment friction for Pro subscriptions, and offline editing capabilities against competitors like Figma, Adobe Express, and Sketch.",
    researchDetails: {
      overview: "Quantitative survey across 45 respondents, secondary research from Google Play and Apple App Store user reviews, and competitive feature matrix benchmarking against Figma, Adobe Express, and Sketch.",
      metrics: [
        "45 survey responses analyzed across active creators",
        "WebP export requested by web designers for 30%+ bandwidth savings",
        "Local payment friction identified as primary drop-off point for Canva Pro in Nigeria",
        "Offline editing identified as highest-impact feature gap vs competitors"
      ]
    },
    body: [
      "Canva has democratized design for millions, but power users and creators in emerging markets face specific technical and operational bottlenecks.",
      "Based on 45 survey responses, App/Play Store user feedback, and benchmarking against Figma, Adobe Express, and Sketch, we identified key gaps in export optimization and subscription accessibility.",
      "Modern web performance requires modern image formats like WebP, while emerging market adoption is restricted when local bank transfer payment options are absent."
    ],
    keyFindings: [
      "WebP export support presents a major opportunity to optimize asset load performance for web designers and digital marketers.",
      "Local payment friction in markets like Nigeria prevents willing users from upgrading to Canva Pro subscriptions.",
      "Competitive analysis against Figma and Adobe Express revealed key opportunities to improve creator workflows, offline access, and asset management."
    ],
    riceScores: [
      { feature: "Offline Editing", rice: 33.0 },
      { feature: "Advanced Export Options (including WebP)", rice: 4.8 },
      { feature: "More Payment Options (including Bank Transfer)", rice: 2.4 }
    ],
    recommendations: [
      {
        title: "Offline Editing",
        description: "Enable local caching and draft state synchronization so creators can edit projects seamlessly without active internet connection.",
        priority: "High Priority (RICE 33.0)",
        riceScore: 33.0
      },
      {
        title: "Advanced Export Options including WebP",
        description: "Introduce WebP and modern compressed image format exports under Advanced Export Options to deliver superior web performance.",
        priority: "Medium Priority (RICE 4.8)",
        riceScore: 4.8
      },
      {
        title: "More Payment Options including Bank Transfer",
        description: "Integrate localized payment gateways (bank transfers, local cards) to eliminate subscription drop-off for emerging market creators.",
        priority: "Medium Priority (RICE 2.4)",
        riceScore: 2.4
      }
    ],
    projectLinks: []
  },
  {
    title: "Chowdeck Delivery Teardown: Three-Sided Marketplace Optimization",
    slug: "chowdeck",
    date: "2024",
    category: "Food Delivery / Marketplace",
    readTime: "8 min",
    coverImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
    myRole: "Team Member — Contributed to user research design, competitive analysis, feature recommendation mapping, product roadmap, launch planning, and presentation deck.",
    summary: "Deconstructing customer satisfaction across Chowdeck's three-sided marketplace (customers, merchants, riders) to resolve delivery latency, order accuracy, and support friction.",
    researchDetails: {
      overview: "Targeted customer experience research conducted using Google Forms with conditional branching logic, surveying delivery speed, order accuracy, food quality, packaging, payment, and rider professionalism.",
      metrics: [
        "Conditional branching survey mapping friction points across order lifecycle",
        "Delivery speed and ETA transparency identified as top retention driver",
        "Support response latency cited as primary complaint during delayed deliveries"
      ]
    },
    body: [
      "Chowdeck has rapidly grown into Nigeria's leading hyper-local food delivery platform. However, managing a three-sided marketplace requires seamless coordination between hungry customers, restaurant merchants, and dispatch riders.",
      "We conducted targeted user research via Google Forms with conditional branching logic, surveying customers on delivery speed, order accuracy, food packaging quality, payment reliability, and rider professionalism.",
      "Our findings highlight that customer retention relies heavily on real-time transparency and instant resolution when orders go wrong."
    ],
    keyFindings: [
      "Delivery speed and ETA reliability are central to customer satisfaction and app retention.",
      "Overall platform experience depends on tight operational coordination between customers, merchants, and riders.",
      "Order accuracy, food quality, packaging standards, and rider professionalism directly govern perceived platform quality."
    ],
    riceScores: [
      { feature: "WhatsApp Support Integration", rice: 10.0 },
      { feature: "Expansion of Service Area", rice: 9.6 },
      { feature: "Refund Policy & Instant Credits", rice: 6.0 },
      { feature: "Real-Time Live Tracking", rice: 5.6 }
    ],
    recommendations: [
      {
        title: "WhatsApp Support Integration",
        description: "Deploy direct WhatsApp conversational support to enable instant order dispute resolution and live customer assistance.",
        priority: "High Priority (RICE 10.0)",
        riceScore: 10.0
      },
      {
        title: "Real-Time Rider Tracking",
        description: "Upgrade live GPS rider tracking precision to provide transparent step-by-step order progress and reduce customer anxiety.",
        priority: "Medium Priority (RICE 5.6)",
        riceScore: 5.6
      },
      {
        title: "Faster Refunds & Clearer Cancellation Options",
        description: "Implement automated instant wallet refunds and clear one-tap cancellation workflows for unconfirmed orders.",
        priority: "Supporting Recommendation (RICE 6.0)",
        riceScore: 6.0
      }
    ],
    projectLinks: []
  },
  {
    title: "Facebook Reactions Teardown: Evolving Beyond the Like Button",
    slug: "facebook-reactions",
    date: "2024",
    category: "Social Media / Consumer Product",
    readTime: "6 min",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    myRole: "Product Manager — Conducted the teardown solo, translating user research and interaction data into product opportunities and usability improvements.",
    summary: "An evaluation of how Facebook Reactions expanded lightweight emotional expression, created richer algorithmic signals, and identified interaction bottlenecks.",
    researchDetails: {
      overview: "Product evaluation assessing user sentiment, interaction patterns, and adoption metrics across social feed interactions.",
      metrics: [
        "90%+ of respondents were aware of Facebook Reactions",
        "60% of surveyed users used Reactions regularly",
        "20% used Reactions occasionally for specific post types"
      ]
    },
    body: [
      "The binary 'Like' button was one of social media's most iconic features, but it failed to capture complex human emotional responses to news, sad events, or humorous content.",
      "This solo teardown examines the strategic product rationale behind Facebook Reactions: providing lightweight expressiveness without requiring users to write a text comment, while supplying Meta with high-dimensional engagement signals.",
      "We evaluate user adoption rates, UI press-and-hold interaction friction, accidental selection rates, and accessibility challenges."
    ],
    keyFindings: [
      "The traditional Like button could not capture the full range of emotional responses users wanted to express.",
      "Reactions allowed nuanced emotional communication without requiring users to compose a text comment.",
      "Reactions created richer behavioral signals for algorithmic feed ranking and content performance analysis.",
      "UI press-and-hold/hover mechanisms introduce interaction friction and occasional wrong selection."
    ],
    keyPainPoints: [
      "Reaction set can feel limited for specific emotional contexts.",
      "Long-press or hover interaction feels clunky on mobile touchscreens.",
      "Users occasionally select the wrong reaction due to close touch target spacing.",
      "Accessibility issues exist with interface placement for screen reader users."
    ],
    recommendations: [
      {
        title: "Richer Reaction Options",
        description: "Introduce contextual reaction sets or expanded emotional categories for specialized post types.",
        priority: "Core Opportunity"
      },
      {
        title: "Easier Reaction Interaction",
        description: "Refine touch target spacing and gesture sensitivity to eliminate clunky long-press interactions.",
        priority: "UX Improvement"
      },
      {
        title: "Improved Accessibility",
        description: "Enhance screen reader announcements and single-handed touch accessibility across mobile viewports.",
        priority: "Accessibility Focus"
      },
      {
        title: "Reduce Accidental Selections",
        description: "Add a temporary undo mechanism or confirmed touch feedback to prevent accidental reaction selection.",
        priority: "Usability Polish"
      }
    ],
    projectLinks: [
      { label: "View Survey Responses & Research Document", url: "https://docs.google.com/document/d/1vLimjyI1kXlkSIpUNGr-a8I5nTwC_K6AC9Aplmg-TQk/edit?usp=sharing" },
      { label: "View User Flow & Interaction Board", url: "https://www.figma.com/board/me13ZYkcaaRxKmO6q56HWH/Facebook-reactions?node-id=0-1&t=vWlDm0hPu2i3GdiL-1" }
    ]
  },
  {
    title: "WhatsApp Product Teardown: Enhancing Media Quality & Status Controls",
    slug: "whatsapp",
    date: "2024",
    category: "Messaging / Communication",
    readTime: "7 min",
    coverImage: "https://images.unsplash.com/photo-1614680376593-902f749f7eac?auto=format&fit=crop&w=1200&q=80",
    myRole: "Product Manager / Team Contributor — Synthesized user research across 41 survey responses and social media discussions to define high-impact media and status feature enhancements.",
    summary: "Analyzing WhatsApp's core messaging strengths, privacy perception, and feature gaps in media compression and Status update management.",
    researchDetails: {
      overview: "User research across 41 survey responses (focusing on Nigerian users), WhatsApp depth interviews, Apple App Store review analysis, X/social media research, and competitor benchmarking.",
      metrics: [
        "41 survey responses analyzed across active WhatsApp users",
        "Media compression quality degradation cited as #1 daily user complaint",
        "Status update deletion & reposting identified as major workflow friction"
      ]
    },
    body: [
      "WhatsApp remains the world's leading instant messenger by maintaining strict simplicity, end-to-end encryption trust, and lightning-fast delivery.",
      "However, power users—particularly in active markets like Nigeria—face friction when sharing high-resolution photos/videos and managing ephemeral Status updates.",
      "Based on 41 survey responses, interviews, and app review teardowns, we evaluated opportunities to improve media retention controls and edit capabilities without cluttering the clean UI."
    ],
    keyFindings: [
      "Uncompromising messaging simplicity and reliability remain WhatsApp's core product strength.",
      "Privacy, security, and end-to-end encryption are central to the core product value proposition.",
      "WhatsApp has successfully expanded from standard 1:1 messaging into Communities, Channels, and business communication.",
      "Aggressive automatic media compression degrades user content quality and creator trust.",
      "The lack of a Status Edit feature forces users to delete and repost updates, creating unnecessary friction."
    ],
    riceScores: [
      { feature: "Retaining Media Quality Control", rice: 18.0 },
      { feature: "Edit Status Update Feature", rice: 12.5 },
      { feature: "In-App Feature Education & Discovery", rice: 8.0 }
    ],
    recommendations: [
      {
        title: "Retaining Media Quality Control",
        description: "Introduce persistent media quality controls allowing users to default to HD or uncompressed media sharing.",
        priority: "High Priority (RICE 18.0)",
        riceScore: 18.0
      },
      {
        title: "Edit Status Update",
        description: "Allow users to edit posted Status updates within a time-limited window instead of forcing deletion and reposting.",
        priority: "Medium Priority (RICE 12.5)",
        riceScore: 12.5
      },
      {
        title: "In-App Feature Education",
        description: "Enhance user education around existing privacy tools, media controls, and community management features.",
        priority: "Supporting Opportunity (RICE 8.0)",
        riceScore: 8.0
      }
    ],
    projectLinks: [
      { label: "View Research & Survey Document", url: "https://docs.google.com/document/d/1qv9FLOYwgHrND69pEAhaAGr80-CsqA7oBpiy9wXKCFo/edit?tab=t.o5qzbi1qr69n" },
      { label: "View Customer Journey Map", url: "https://www.figma.com/board/jRf8cUkM0gCcdyraz9FTTQ/Customer-journey-map--Whatsapp-?node-id=0-1&t=iPg1DXKgdmUwT94t-1" },
      { label: "View Wireframes", url: "https://www.figma.com/design/hYir0ECTYQR7RIuiOwBm6I/Whatsapp-teardown-wireframe?node-id=0-1&t=s919w347SykHv9jH-1" },
      { label: "View User Flows", url: "https://www.figma.com/board/VMxChBwLtjFMhu96dBgr9X/WhatsApp-Teardown?node-id=0-1&t=CvXWi42K0YuL6u88-1" },
      { label: "View Launch Plan", url: "https://canva.link/8xqt4fevs4fm4se" }
    ]
  },
  {
    title: "Claude AI Strategic Teardown: Positioning, Rate Limits & Accessibility",
    slug: "claude-ai",
    date: "2024",
    category: "Artificial Intelligence / Generative AI",
    readTime: "6 min",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    myRole: "Co-Supervisor — Provided product leadership, research review, strategic direction, assumption testing, evaluation of findings, and ensured analysis remained strictly product-focused.",
    summary: "A strategic evaluation of Anthropic's Claude AI platform: analyzing model capability differentiation, usage limit friction, international onboarding barriers, and RICE prioritization.",
    researchDetails: {
      overview: "Strategic product analysis examining Claude's evolution, product positioning, user friction logs, international signup constraints, and RICE feature prioritization.",
      metrics: [
        "Free-plan message limits hit within 4-5 prompt turns during complex coding tasks",
        "Phone verification requirements block users in unsupported international regions",
        "Artifacts & 200k context window identified as primary competitive differentiation moat"
      ]
    },
    body: [
      "Anthropic's Claude has established itself as an elite LLM platform, celebrated for superior reasoning, long-context handling (Artifacts & 200k context windows), and constitutional AI alignment.",
      "In this strategic teardown, conducted under my co-supervision, we examined Claude's product positioning against OpenAI's ChatGPT and Google's Gemini across user friction points.",
      "We focused on free-tier rate limit anxiety, international phone verification drop-offs, and prioritizing feature expansion using RICE scoring."
    ],
    keyFindings: [
      "Free-plan usage limits create sudden task interruption and anxiety for serious power users and developers.",
      "International users face onboarding barriers due to strict SMS phone verification requirements in unsupported regions.",
      "Claude's market differentiation is firmly built around superior reasoning capability, long-context comprehension, and constitutional trustworthiness."
    ],
    riceScores: [
      { feature: "Claude Mini Model (Fast & Light)", rice: 4.8 },
      { feature: "International Phone Verification Support", rice: 4.8 },
      { feature: "Higher Time Limits on Free Tier", rice: 4.2 },
      { feature: "Claude Image & Video Generation", rice: 1.0 },
      { feature: "Chat History Download", rice: 0.5 },
      { feature: "Response Format Customization", rice: 0.5 }
    ],
    recommendations: [
      {
        title: "Claude Mini Model",
        description: "Introduce a lightweight, ultra-fast Claude Mini model tier for low-complexity prompts to preserve user quota.",
        priority: "High Priority (RICE 4.8)",
        riceScore: 4.8
      },
      {
        title: "International Phone Verification Support",
        description: "Expand alternative verification methods (OAuth, email verification) for users in unsupported international countries.",
        priority: "High Priority (RICE 4.8)",
        riceScore: 4.8
      },
      {
        title: "Higher Time Limits on Free Tier",
        description: "Implement adaptive rate-limiting timers and clear visual quota counters to eliminate unexpected session cutoffs.",
        priority: "Medium Priority (RICE 4.2)",
        riceScore: 4.2
      }
    ],
    projectLinks: []
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    title: "ResumeGenie: Designing an AI Agent for Automated Job Applications",
    slug: "resumegenie-ai-agent",
    date: "2026-05-01",
    category: "AI Agent & Job Tech",
    summary: "Led the product definition and technical design for ResumeGenie, an agentic system that automates the job search process by semantically analyzing job descriptions, tailoring resumes, and auto-submitting applications.",
    tools: ["Next.js", "Tailwind CSS", "LangChain", "OpenAI API", "Vector Databases", "Sanity CMS", "Python"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    body: [
      "As job hunting became increasingly complex, I noticed that candidates spent hours tailoring resumes for ATS parsing, only to get minimal response rates. I conceptualized and initiated ResumeGenie to reverse this dynamic using AI agents.",
      "The core architectural challenge was build a reliable multi-agent system. We split the workflow into three distinct agents: the Matcher Agent (analyzes job description requirements), the Tailor Agent (modifies resume bullet points to highlight relevant achievements without lying), and the Autopilot Agent (automates form submission on job boards).",
      "By using LangChain and a vector database of user experience chunks, we created a system that maintains high-fidelity matching, resulting in natural resumes that human recruiters approve, while saving users dozens of hours per week."
    ],
    results: [
      "Achieved a 3.4x increase in interview invitation rates for beta test group compared to traditional submissions.",
      "Reduced the average application time from 45 minutes to 45 seconds (98% reduction).",
      "Successfully scaled the prototype to 1,200 active beta users with a 42% weekly retention rate."
    ],
    lessons: [
      "User trust is fragile: Resume tailoring must be highly controllable, requiring a clear diff viewer so candidates can review edits before submission.",
      "Rate-limiting and anti-bot measures on job boards require careful scraping designs, prioritizing direct API integrations where possible.",
      "Achievement extraction is better than buzzword stuffing; asking users for micro-details of their projects yields much higher interview conversion rates."
    ]
  },
  {
    title: "Optimizing Search Queries for B2B SaaS Discovery",
    slug: "saas-search-optimization",
    date: "2025-11-12",
    category: "SaaS Search",
    summary: "How I restructured search parsing and retrieval algorithms for a complex B2B discovery portal, resulting in higher user engagement and reduced search abandonment.",
    tools: ["Elasticsearch", "React", "Node.js", "Python", "A/B Testing", "Mixpanel"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    body: [
      "In my previous role as a B2B SaaS PM, we faced a major drop-off in user conversion due to poor search experience. Users looking for specific products on our discovery portal often left empty-handed because our search engine was too literal.",
      "I led a cross-functional team of data scientists and engineering to build a semantic search layer. We implemented synonym mapping, query expansion, and a neural ranking model that factored in user click logs.",
      "We rolled out the changes via a series of A/B tests, measuring search conversion, click-through-rate (CTR) on top 3 results, and query refinement rates."
    ],
    results: [
      "Decreased search abandonment rates by 28% globally.",
      "Increased click-through rate on the top 3 search results by 18%.",
      "Improved search-to-lead conversion rate by 14%, driving direct revenue growth."
    ],
    lessons: [
      "Literal search fails modern user expectations; implementing fuzzy matching and synonym mappings should be a baseline step.",
      "Search logs are a goldmine for product managers; they reveal the exact language and intent of the target audience.",
      "Ranking algorithms require continuous tuning based on click signals to adapt to changing user behavior."
    ]
  }
];

export const mockProducts: Product[] = [
  {
    name: "ResumeGenie",
    tagline: "AI that handles your entire job search from application to offer",
    description: "An agentic AI assistant that scans job postings, extracts core requirements, semantically tailors your experiences into target resumes, and tracks application pipelines automatically.",
    status: "In Development",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "SaaS Schema Validator",
    tagline: "Instantly test and validate API schemas for LLM tool-calling compatibility",
    description: "A developer tool designed to audit REST/GraphQL API specifications, finding gaps that cause AI agents to fail during tool invocation and recommending optimal structure changes.",
    status: "Coming Soon",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Voice UX Builder",
    tagline: "No-code testing harness for ultra-low latency voice agent design",
    description: "Visualize, configure and test echo cancellation, Voice Activity Detection, and interruption policies for conversational voice agents in a single dashboard.",
    status: "Coming Soon",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

export const mockAboutData: AboutData = {
  bio: "I am a certified SaaS Product Manager (CSPO & CSM) with a deep technical foundation, transitioning into AI Product Management and AI Engineering. With over 5 years of experience delivering high-performing SaaS platforms and leading user research, I specialize in bridging product strategy with hands-on AI engineering. I am building ResumeGenie—an agentic AI platform—and conducting deep-dive teardowns on leading platforms like Netflix, Canva, Chowdeck, Facebook Reactions, WhatsApp, and Claude AI.",
  skills: [
    {
      category: "Product Management",
      items: [
        { name: "Product Strategy", level: 95 },
        { name: "Agile/Scrum (CSPO, CSM)", level: 98 },
        { name: "User Research & Testing", level: 90 },
        { name: "A/B Testing & Analytics", level: 85 }
      ]
    },
    {
      category: "AI & Engineering",
      items: [
        { name: "Next.js & React (TypeScript)", level: 85 },
        { name: "LLM Orchestration (LangChain)", level: 80 },
        { name: "Prompt Engineering & RAG", level: 85 },
        { name: "Node.js & Python", level: 78 }
      ]
    },
    {
      category: "Design & Tools",
      items: [
        { name: "Figma (UI/UX Design)", level: 88 },
        { name: "Sanity CMS", level: 85 },
        { name: "Elasticsearch", level: 75 }
      ]
    }
  ],
  journey: [
    {
      year: "2026",
      title: "AI Product Builder",
      company: "ResumeGenie",
      description: "Concepted, designed, and building an agentic job application tool using Next.js, LangChain, and vector embeddings to automate resume tailoring."
    },
    {
      year: "2024 - 2025",
      title: "Technical Product Manager",
      company: "SaaS Enterprise Corp",
      description: "Led search optimization initiative, transitioning discovery flows to semantic search. Managed a team of 6 engineers and 2 data scientists."
    },
    {
      year: "2021 - 2023",
      title: "Product Owner (CSPO, CSM)",
      company: "Digital Platform Inc",
      description: "Managed sprint backlogs, facilitated Scrum events, and coordinated cross-functional launches for web dashboard platforms. Achieved 25% user growth."
    },
    {
      year: "2019 - 2021",
      title: "Associate Product Manager",
      company: "Tech Startups LLC",
      description: "Conducted market research, defined product requirements docs (PRDs), and performed user testing for early-stage mobile and web products."
    }
  ],
  certifications: [
    "Certified Scrum Product Owner (CSPO) - Scrum Alliance",
    "Certified ScrumMaster (CSM) - Scrum Alliance",
    "Deep Learning Specialization - Coursera (Currently Learning)",
    "AI Product Manager Nanodegree - Udacity"
  ]
};
