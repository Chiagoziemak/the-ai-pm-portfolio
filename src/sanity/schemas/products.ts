import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "In Development", value: "In Development" },
          { title: "Coming Soon", value: "Coming Soon" },
          { title: "Live", value: "Live" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productImage",
      title: "Product Image",
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
      name: "icon",
      title: "Optional Icon / Symbol",
      type: "string",
    }),
    defineField({
      name: "linkType",
      title: "Link Action Type",
      type: "string",
      options: {
        list: [
          { title: "Case Study", value: "Case Study" },
          { title: "External URL", value: "External URL" },
        ],
      },
      initialValue: "External URL",
    }),
    defineField({
      name: "caseStudyRef",
      title: "Case Study Reference",
      type: "reference",
      to: [{ type: "caseStudy" }],
      hidden: ({ parent }) => parent?.linkType !== "Case Study",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "External URL",
    }),
    defineField({
      name: "linkLabel",
      title: "Link Button Label (e.g. View Case Study →)",
      type: "string",
    }),
  ],
});
