export interface Teardown {
  title: string;
  slug: string;
  date: string;
  category: "LLMs" | "SaaS" | "Job Tech";
  summary: string;
  readTime: string;
  coverImage: string;
  body: string[];
  keyFindings: string[];
  recommendations: string[];
}

export interface CaseStudy {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  tools: string[];
  coverImage: string;
  body: string[];
  results: string[];
  lessons: string[];
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  status: "In Development" | "Coming Soon";
  coverImage: string;
}

export interface AboutData {
  bio: string;
  skills: {
    category: string;
    items: { name: string; level: number }[]; // level out of 100
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
    title: "Deconstructing OpenAI's GPT-4o Voice Mode UX",
    slug: "gpt-4o-voice-mode-ux",
    date: "2026-05-15",
    category: "LLMs",
    summary: "An in-depth analysis of low-latency conversational audio interfaces and how voice interruption patterns redefine conversational UI benchmarks.",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    body: [
      "Voice conversational interfaces have entered a new era with low-latency LLMs. In this teardown, we analyze OpenAI's GPT-4o voice interaction model, highlighting the transition from traditional turn-taking APIs to full-duplex conversational audio flows.",
      "The primary architectural breakthrough is the native multimodal processing, allowing direct audio-in to audio-out without intermediate speech-to-text and text-to-speech transcription. This drops latency from 2-3 seconds down to 230-320 milliseconds, which matches human conversational response speeds.",
      "However, low-latency conversation brings major user experience challenges, particularly around voice interruption. Handling user barge-in requires rapid echo cancellation and state interruption policies so the model stops speaking immediately when the user speaks."
    ],
    keyFindings: [
      "Native multimodal training (audio-to-audio) is key to breaking the 500ms response latency barrier.",
      "Voice interruption (barge-in) requires edge-computed VAD (Voice Activity Detection) to immediately pause playback.",
      "User anxiety is reduced when visual indicators sync perfectly with sub-100ms pitch changes in the output audio."
    ],
    recommendations: [
      "Implement local VAD algorithms on-device to handle interruption signals instantly, avoiding server roundtrips.",
      "Provide haptic feedback on mobile clients during model speaking states to improve interface alignment.",
      "Design fallback modes for higher-latency environments that gracefully transition back to standard turn-taking."
    ]
  },
  {
    title: "How SaaS Products Are Evolving for Agentic Workflows",
    slug: "saas-agentic-workflows",
    date: "2026-04-20",
    category: "SaaS",
    summary: "How traditional SaaS dashboards are being replaced by autonomous AI agents and API-first control panels, changing product design paradigms.",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    body: [
      "Traditional Software-as-a-Service is built around the human operator interacting with forms, tables, and buttons. As AI agents become more capable, the primary user of SaaS software is shifting from human operators to autonomous agents.",
      "This shift requires SaaS architecture to expose high-integrity schemas, tool definitions, and predictable API endpoints. Instead of human-centric UX, SaaS products are now building developer-agentic interfaces (DAIs) that document capabilities in LLM-readable formats.",
      "In this analysis, we look at Stripe, HubSpot, and Linear to see how they are preparing their data models and endpoints for seamless integration with external AI agent tool-calling frameworks."
    ],
    keyFindings: [
      "Strict schema enforcement (e.g. JSON schema) is critical for reliable agentic tool invocation.",
      "AI agents fail up to 25% of the time when API error messages are generic or uninformative.",
      "State reconciliation flows are needed to let human operators approve high-risk actions taken by agents."
    ],
    recommendations: [
      "Expose standard OpenAPI specifications specifically optimized for LLM context windows (concise descriptions).",
      "Develop human-in-the-loop (HITL) approval gates for actions involving financial transfers or bulk data deletion.",
      "Implement deterministic testing suites to simulate agent tool calling sequences and handle edge failure cases."
    ]
  },
  {
    title: "Job-Tech Disruption: Resume Matchers vs. Generative Tailoring",
    slug: "jobtech-resume-tailoring",
    date: "2026-03-10",
    category: "Job Tech",
    summary: "Evaluating the gap between traditional Applicant Tracking Systems (ATS) and generative AI resume customization tools.",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    body: [
      "Applicant Tracking Systems (ATS) have traditionally relied on simple keyword matching and semantic parsing. Job seekers are now fighting back using Generative AI tools to tailor their resumes for every job description automatically.",
      "This creates an arms race. Recruiter portals are flooded with identical, perfectly keyword-optimized resumes, rendering traditional ATS filters useless. Recruiters are now searching for signals beyond simple keyword matching, such as verified credentials and project code reviews.",
      "We teardown the engineering behind both sides: the parsing algorithms used by systems like Workday, and the agentic prompt pipelines used by resume tailoring tools like ResumeGenie to achieve natural-sounding, high-signal applications."
    ],
    keyFindings: [
      "Traditional keyword parsing is easily bypassed by modern LLM-tailored resumes.",
      "Fully automated resume generation often creates 'hallucinated alignment' which fails the human recruiter stage.",
      "High-signal candidates focus on tailoring project descriptions with quantifiable metric outcomes rather than matching buzzwords."
    ],
    recommendations: [
      "Shift resume tailoring logic from keyword stuffing to semantic achievement expansion using prompt templates.",
      "Build verification checks into resume generators to ensure tailored statements map back to verified source achievements.",
      "Enable recruiter-facing platforms to parse and evaluate the depth of portfolio project links programmatically."
    ]
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
  bio: "I am a certified SaaS Product Manager (CSPO & CSM) with a deep technical foundation, currently pivoting into AI Product Management and AI Engineering. With over 5 years of experience delivering high-performing web platforms, I've specialized in optimizing user search experience, SaaS dashboards, and workflow orchestration. Now, I am bridging the gap between product management and AI engineering by building ResumeGenie—an agentic AI application. My goal is to design high-agency AI products that are transparent, intuitive, and extremely fast.",
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
