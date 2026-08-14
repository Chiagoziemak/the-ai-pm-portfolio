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
          validation: (Rule) => Rule.required(),
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
      name: "riceTable",
      title: "RICE Prioritization Table",
      type: "array",
      of: [{ type: "riceRow" }],
    }),
    defineField({
      name: "recommendations",
      title: "Strategic Recommendations",
      type: "array",
      of: [{ type: "recommendationBlock" }],
    }),
    defineField({
      name: "projectLinks",
      title: "Project Links & Artifacts",
      type: "array",
      of: [{ type: "externalLinkBlock" }],
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
