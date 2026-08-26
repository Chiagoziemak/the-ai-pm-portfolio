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
    defineField({
      name: "cardPosition",
      title: "Card Position (Left or Right)",
      type: "string",
      description: "Side of the timeline line where this entry's card will display. Defaults to alternating if left unset.",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
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

export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Step Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Step Title",
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
      name: "icon",
      title: "Icon Name / Identifier",
      type: "string",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables List",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Author Role / Title",
      type: "string",
    }),
    defineField({
      name: "authorCompany",
      title: "Author Company",
      type: "string",
    }),
    defineField({
      name: "authorPhoto",
      title: "Author Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Profile URL",
      type: "url",
    }),
    defineField({
      name: "context",
      title: "Relationship / Project Context",
      type: "string",
    }),
  ],
});

export const insightCard = defineType({
  name: "insightCard",
  title: "Insight Card",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Number / Label",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Insight Title",
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
      name: "evidence",
      title: "Supporting Evidence / Details",
      type: "text",
    }),
  ],
});

export const painPointCard = defineType({
  name: "painPointCard",
  title: "Pain Point Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Pain Point Title",
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
      name: "evidence",
      title: "Evidence / Impact Details",
      type: "text",
    }),
    defineField({
      name: "severity",
      title: "Severity Level (e.g. Low, Medium, High, Critical)",
      type: "string",
    }),
  ],
});

export const productDecisionCard = defineType({
  name: "productDecisionCard",
  title: "Product Decision Card",
  type: "object",
  fields: [
    defineField({
      name: "decision",
      title: "Decision Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "context",
      title: "Problem Context",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "options",
      title: "Options Considered",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "chosenOption",
      title: "Chosen Option",
      type: "string",
    }),
    defineField({
      name: "rationale",
      title: "Rationale / Strategic Why",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tradeoffs",
      title: "Trade-offs Accepted",
      type: "text",
    }),
    defineField({
      name: "outcome",
      title: "Measurable Outcome / Result",
      type: "text",
    }),
  ],
});

export const beforeAfterBlock = defineType({
  name: "beforeAfterBlock",
  title: "Before & After Comparison Block",
  type: "object",
  fields: [
    defineField({
      name: "beforeLabel",
      title: "Before Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeDescription",
      title: "Before State Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "afterLabel",
      title: "After Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "afterDescription",
      title: "After State Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "impact",
      title: "Impact / Key Improvement Summary",
      type: "text",
    }),
  ],
});

export const checklistItem = defineType({
  name: "checklistItem",
  title: "Checklist Item",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Checklist Item Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checked",
      title: "Is Completed / Checked",
      type: "boolean",
      initialValue: false,
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
  processStep,
  testimonial,
  insightCard,
  painPointCard,
  productDecisionCard,
  beforeAfterBlock,
  checklistItem,
];
