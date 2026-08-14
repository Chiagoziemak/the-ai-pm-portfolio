import { defineType, defineField } from "sanity";

export const statBlock = defineType({
  name: "statBlock",
  title: "Stat Block",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value / Statistic",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Description / Context",
      type: "string",
    }),
  ],
});

export const riceRow = defineType({
  name: "riceRow",
  title: "RICE Table Row",
  type: "object",
  fields: [
    defineField({
      name: "feature",
      title: "Feature / Opportunity",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reach",
      title: "Reach",
      type: "number",
    }),
    defineField({
      name: "impact",
      title: "Impact",
      type: "number",
    }),
    defineField({
      name: "confidence",
      title: "Confidence (%)",
      type: "number",
    }),
    defineField({
      name: "effort",
      title: "Effort",
      type: "number",
    }),
    defineField({
      name: "score",
      title: "RICE Score",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const recommendationBlock = defineType({
  name: "recommendationBlock",
  title: "Recommendation Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priorityLabel",
      title: "Priority Label (e.g. High Priority)",
      type: "string",
    }),
    defineField({
      name: "riceScore",
      title: "RICE Score / Badge",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const externalLinkBlock = defineType({
  name: "externalLinkBlock",
  title: "External Link Block",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Resource Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Resource URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const timelineEntry = defineType({
  name: "timelineEntry",
  title: "Timeline Entry",
  type: "object",
  fields: [
    defineField({
      name: "years",
      title: "Years / Date Range",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company / Project",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});

export const skillBlock = defineType({
  name: "skillBlock",
  title: "Skill Category Block",
  type: "object",
  fields: [
    defineField({
      name: "category",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills List",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const skillPercentBlock = defineType({
  name: "skillPercentBlock",
  title: "Skill Percentage Block",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "percent",
      title: "Percentage (0-100)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
});

export const credentialBlock = defineType({
  name: "credentialBlock",
  title: "Credential Block",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Credential Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sublabel",
      title: "Subtitle / Issuing Body",
      type: "string",
    }),
  ],
});

export const learningItem = defineType({
  name: "learningItem",
  title: "Learning Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title / Topic",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "provider",
      title: "Provider / Institution",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status (e.g. In Progress, Ongoing, Active Learning)",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});

export const reusableObjects = [
  statBlock,
  riceRow,
  recommendationBlock,
  externalLinkBlock,
  timelineEntry,
  skillBlock,
  skillPercentBlock,
  credentialBlock,
  learningItem,
];
