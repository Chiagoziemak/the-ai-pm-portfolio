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
      name: "stackMethods",
      title: "Tech Stack & Methods (Tags)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "challenge",
      title: "The Challenge (Rich Text)",
      type: "array",
      of: [{ type: "block" }],
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
