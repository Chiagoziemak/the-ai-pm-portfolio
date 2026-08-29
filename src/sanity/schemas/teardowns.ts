import { defineType, defineField } from "sanity";

export default defineType({
  name: "teardown",
  title: "Product Teardown",
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
      description: "Custom browser tab & search engine title. If left blank, defaults to '[Title] — Product Teardown | Chiagoziem Melvin Akobundu'.",
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
      name: "year",
      title: "Year / Date Label",
      type: "string",
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
      name: "role",
      title: "My Role & Responsibilities",
      type: "text",
    }),
    defineField({
      name: "researchEvidence",
      title: "Research & Evidence Overview",
      type: "text",
    }),
    defineField({
      name: "researchStats",
      title: "Research Stat Bullets",
      type: "array",
      of: [{ type: "statBlock" }],
    }),
    defineField({
      name: "keyFindingsIcon",
      title: "Key Product Findings Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiKey, FaKey, HiKey). Defaults to FiKey",
    }),
    defineField({
      name: "keyFindings",
      title: "Key Product Findings",
      type: "array",
      of: [
        {
          type: "object",
          name: "findingItem",
          title: "Finding Item",
          fields: [
            defineField({ name: "number", title: "Order Number", type: "number" }),
            defineField({ name: "finding", title: "Finding Text", type: "text", validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "painPointsIcon",
      title: "Key Pain Points Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiAlertTriangle, FaTriangleExclamation, HiExclamationTriangle). Defaults to FiAlertTriangle",
    }),
    defineField({
      name: "painPoints",
      title: "Key Pain Points Cards",
      type: "array",
      of: [{ type: "painPointCard" }],
      description: "Friction and user pain points (title, description, evidence, severity)",
    }),
    defineField({
      name: "riceIcon",
      title: "RICE Table Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiBarChart2, FaChartBar, HiChartBar). Defaults to FiBarChart2",
    }),
    defineField({
      name: "riceTable",
      title: "RICE Prioritization Table",
      type: "array",
      of: [{ type: "riceRow" }],
    }),
    defineField({
      name: "recommendationsIcon",
      title: "Strategic Recommendations Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiCheckSquare, FaListCheck, HiClipboardDocumentCheck). Defaults to FiCheckSquare",
    }),
    defineField({
      name: "recommendations",
      title: "Strategic Recommendations",
      type: "array",
      of: [{ type: "recommendationBlock" }],
    }),
    defineField({
      name: "linksIcon",
      title: "Project Links Section Icon",
      type: "string",
      description: "React-icons identifier (e.g. FiExternalLink, FaLink, HiLink). Defaults to FiExternalLink",
    }),
    defineField({
      name: "projectLinks",
      title: "Project Links & Artifacts",
      type: "array",
      of: [{ type: "externalLinkBlock" }],
    }),
    defineField({
      name: "insightCards",
      title: "Research Insight Cards",
      type: "array",
      of: [{ type: "insightCard" }],
      description: "Structured research insight cards (number, title, description, evidence)",
    }),
    defineField({
      name: "relatedTeardowns",
      title: "Related Teardowns",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "teardown" }],
        },
      ],
    }),
  ],
});
