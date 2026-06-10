const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

// Load .env.local manually to avoid installing dotenv
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=");
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
      process.env[key] = val;
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r03r0hgb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Error: SANITY_API_WRITE_TOKEN is not defined in your environment or .env.local file.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2026-06-03",
});

const mockTeardowns = [
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

const mockCaseStudies = [
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
      "3.4x increase in interview invitation rates for beta test group compared to traditional submissions.",
      "98% reduction in average application time from 45 minutes to 45 seconds.",
      "Successfully scaled prototype to 1,200 active beta users with a 42% weekly retention rate."
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
      "28% decrease in search abandonment rates globally.",
      "18% increase in click-through rate on the top 3 search results.",
      "14% improvement in search-to-lead conversion rate, driving direct revenue growth."
    ],
    lessons: [
      "Literal search fails modern user expectations; implementing fuzzy matching and synonym mappings should be a baseline step.",
      "Search logs are a goldmine for product managers; they reveal the exact language and intent of the target audience.",
      "Ranking algorithms require continuous tuning based on click signals to adapt to changing user behavior."
    ]
  }
];

const mockProducts = [
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

const mockAboutData = {
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

async function uploadImageFromUrl(url) {
  try {
    console.log(`Downloading cover image: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const filename = url.split("/").pop().split("?")[0] || "image.jpg";
    console.log(`Uploading as asset: ${filename}`);
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: res.headers.get("content-type") || "image/jpeg",
    });
    console.log(`Uploaded successfully: ${asset._id}`);
    return asset;
  } catch (err) {
    console.error(`Failed to upload image from URL ${url}:`, err);
    return null;
  }
}

async function run() {
  console.log("Starting Sanity mock data migration...");

  // 1. Populate 'about' schema (single document)
  console.log("Migrating 'about' document...");
  const aboutDoc = {
    _id: "about",
    _type: "about",
    bio: mockAboutData.bio,
    skills: mockAboutData.skills.map((g) => ({
      _type: "skillGroup",
      _key: g.category.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      category: g.category,
      items: g.items.map((item) => ({
        _type: "skillItem",
        _key: item.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        name: item.name,
        level: item.level,
      })),
    })),
    journey: mockAboutData.journey.map((j) => ({
      _type: "journeyItem",
      _key: `${j.year}-${j.title}`.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      year: j.year,
      title: j.title,
      company: j.company,
      description: j.description,
    })),
    certifications: mockAboutData.certifications,
  };
  await client.createOrReplace(aboutDoc);
  console.log("'about' document migrated successfully!");

  // 2. Populate 'teardown' documents
  console.log("Migrating 'teardown' documents...");
  for (const teardown of mockTeardowns) {
    console.log(`Processing teardown: ${teardown.title}`);
    const asset = await uploadImageFromUrl(teardown.coverImage);
    const teardownDoc = {
      _id: `mock-teardown-${teardown.slug}`,
      _type: "teardown",
      title: teardown.title,
      slug: { _type: "slug", current: teardown.slug },
      date: teardown.date,
      category: teardown.category,
      summary: teardown.summary,
      readTime: teardown.readTime,
      body: teardown.body,
      keyFindings: teardown.keyFindings,
      recommendations: teardown.recommendations,
      ...(asset ? { coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } } : {}),
    };
    await client.createOrReplace(teardownDoc);
    console.log(`Teardown "${teardown.title}" migrated!`);
  }

  // 3. Populate 'caseStudy' documents
  console.log("Migrating 'caseStudy' documents...");
  for (const study of mockCaseStudies) {
    console.log(`Processing case study: ${study.title}`);
    const asset = await uploadImageFromUrl(study.coverImage);
    const studyDoc = {
      _id: `mock-case-study-${study.slug}`,
      _type: "caseStudy",
      title: study.title,
      slug: { _type: "slug", current: study.slug },
      date: study.date,
      category: study.category,
      summary: study.summary,
      tools: study.tools,
      body: study.body,
      results: study.results,
      lessons: study.lessons,
      ...(asset ? { coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } } : {}),
    };
    await client.createOrReplace(studyDoc);
    console.log(`Case study "${study.title}" migrated!`);
  }

  // 4. Populate 'product' documents
  console.log("Migrating 'product' documents...");
  for (const product of mockProducts) {
    const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    console.log(`Processing product: ${product.name}`);
    const asset = await uploadImageFromUrl(product.coverImage);
    const productDoc = {
      _id: `mock-product-${productSlug}`,
      _type: "product",
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      status: product.status,
      ...(asset ? { coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } } : {}),
    };
    await client.createOrReplace(productDoc);
    console.log(`Product "${product.name}" migrated!`);
  }

  console.log("All mock data migrated successfully!");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
