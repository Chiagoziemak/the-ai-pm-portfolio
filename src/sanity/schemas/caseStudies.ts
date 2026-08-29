import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description: "Custom browser tab & search engine title. If left blank, defaults to '[Title] — Case Study | Chiagoziem Melvin Akobundu'.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      description: "Custom search engine snippet. If left blank, defaults to the Executive Summary.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "readTime",
      title: "Read Time (e.g. 8 min)",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive alt text for accessibility and search engines.",
        }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Executive Summary",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "Live Product / Prototype URL",
      type: "url",
      description: "Optional external link to the live deployment, interactive prototype, or demo.",
    }),
    defineField({
      name: "liveUrlLabel",
      title: "Live URL Button Label",
      type: "string",
      description: "Custom label for the live link button (e.g. 'View Prototype', 'Visit Live Platform', 'View Hackathon Demo'). Defaults to 'View Project' if left blank.",
    }),
    defineField({
      name: "featured",
      title: "Featured Case Study",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPlaceholder",
      title: "Is Placeholder Content",
      type: "boolean",
      description: "Mark true for temporary/placeholder content to swap out later",
      initialValue: false,
    }),
    defineField({
      name: "badgeLabel",
      title: "Badge Label (e.g. Most Recent, High Impact)",
      type: "string",
      description: "Optional short custom badge label shown on cards",
    }),
    defineField({
      name: "cardStats",
      title: "Card Stat-Pairs",
      type: "array",
      of: [{ type: "statBlock" }],
      description: "Stat-pair blocks (e.g. '64% / Efficiency Gain', '1.2M / Monthly Users')",
    }),
    defineField({
      name: "summaryIcon",
      title: "Summary Sidebar Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiFileText, FaFileLines, HiDocumentText). Defaults to FiFileText",
    }),
    defineField({
      name: "toolsIcon",
      title: "Stack & Methods Sidebar Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiCpu, FaCode, HiCommandLine). Defaults to FiCpu",
    }),
    defineField({
      name: "stackMethods",
      title: "Tech Stack & Methods (Tags)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "challengeIcon",
      title: "The Challenge Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiTarget, FaBullseye, HiTarget). Defaults to FiTarget",
    }),
    defineField({
      name: "challenge",
      title: "The Challenge (Rich Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "decisionsIcon",
      title: "Product Decisions Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiLayers, FaLayerGroup, HiLayers). Defaults to FiLayers",
    }),
    defineField({
      name: "productDecisions",
      title: "Product Decisions",
      type: "array",
      of: [{ type: "productDecisionCard" }],
      description: "Structured PM decision log (decision, context, options, chosenOption, rationale, tradeoffs, outcome)",
    }),
    defineField({
      name: "beforeAfterIcon",
      title: "Before & After Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiRefreshCw, FaArrowsRotate, HiArrowPath). Defaults to FiRefreshCw",
    }),
    defineField({
      name: "beforeAfter",
      title: "Before & After Comparison Blocks",
      type: "array",
      of: [{ type: "beforeAfterBlock" }],
      description: "Before vs After comparison cards (labels, descriptions, hotspot images, impact)",
    }),
    defineField({
      name: "resultsIcon",
      title: "Results & Impact Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiTrendingUp, FaChartLine, HiChartBar). Defaults to FiTrendingUp",
    }),
    defineField({
      name: "results",
      title: "Results & Impact",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lessonsLearned",
      title: "Lessons Learned",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Studies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "caseStudy" }],
        },
      ],
    }),
  ],
});
