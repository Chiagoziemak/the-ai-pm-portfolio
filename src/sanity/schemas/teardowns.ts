export default {
  name: "teardown",
  title: "Teardown",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Published Date",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "LLMs", value: "LLMs" },
          { title: "SaaS", value: "SaaS" },
          { title: "Job Tech", value: "Job Tech" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "body",
      title: "Body Text",
      type: "array",
      of: [{ type: "text" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "keyFindings",
      title: "Key Findings",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "recommendations",
      title: "Recommendations",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
