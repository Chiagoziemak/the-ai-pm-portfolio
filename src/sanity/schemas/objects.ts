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
      type: "string",
      description: "Resource URL or bare domain (e.g. figma.com or https://figma.com)",
      validation: (Rule) =>
        Rule.required().custom((val) => {
          if (!val) return "URL is required";
          const str = String(val).trim();
          const lower = str.toLowerCase();
          if (
            lower.startsWith("javascript:") ||
            lower.startsWith("data:") ||
            lower.startsWith("vbscript:")
          ) {
            return "Unsafe link protocol not allowed";
          }
          if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(str)) {
            return "Please enter a valid URL or domain (e.g. example.com or https://example.com)";
          }
          return true;
        }),
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

export const productSurface = defineType({
  name: "productSurface",
  title: "Product Surface / Product Link",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name / Label",
      type: "string",
      description: "e.g. Internet Booking Engine, Mobile App, Ticketing, Logistics / OLS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / Type",
      type: "string",
      description: "e.g. Customer Web Booking, Terminal & Staff Ticketing, Shipment & Waybill Operations",
    }),
    defineField({
      name: "accessType",
      title: "Access Type",
      type: "string",
      description: "Public (customer-facing) or Internal (staff-facing/operations)",
      options: {
        list: [
          { title: "Public", value: "public" },
          { title: "Internal", value: "internal" },
        ],
        layout: "radio",
      },
      initialValue: "public",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "platformType",
      title: "Platform Type",
      type: "string",
      description: "Optional platform or device target (e.g. Web, Mobile, Operations, Admin, Other)",
      options: {
        list: [
          { title: "Web", value: "web" },
          { title: "Mobile", value: "mobile" },
          { title: "Operations", value: "operations" },
          { title: "Admin", value: "admin" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "url",
      title: "URL (Optional)",
      type: "string",
      description: "Optional link for public surfaces. Supports bare domains (e.g. okeysontransports.com) or full URLs. Leave blank for internal/confidential systems.",
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true;
          const str = String(val).trim();
          const lower = str.toLowerCase();
          if (
            lower.startsWith("javascript:") ||
            lower.startsWith("data:") ||
            lower.startsWith("vbscript:")
          ) {
            return "Unsafe link protocol not allowed";
          }
          if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(str)) {
            return "Please enter a valid URL or domain (e.g. example.com or https://example.com)";
          }
          return true;
        }),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
      description: "Custom label for the button (e.g. 'Visit Platform', 'View Mobile App', 'Visit Booking Platform'). Defaults to 'Visit Platform' if unset.",
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      description: "Toggle to show or hide this surface item without deleting it.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: "name",
      label: "label",
      description: "description",
      accessType: "accessType",
      platformType: "platformType",
      url: "url",
    },
    prepare({ name, label, description, accessType, platformType, url }) {
      const title = name || label || "Untitled Product Surface";
      const access = accessType === "internal" ? "🔒 Internal" : "🌐 Public";
      const plat = platformType ? ` [${platformType.toUpperCase()}]` : "";
      const hasLink = url ? " ↗" : "";
      return {
        title,
        subtitle: `${access}${plat}${description ? ` — ${description}` : ""}${hasLink}`,
      };
    },
  },
});

export const heroMediaItem = defineType({
  name: "heroMediaItem",
  title: "Hero Media Item",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Alternative text for accessibility and search engines.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label / Subtitle",
      type: "string",
      description: "Optional visual label (e.g. 'Internet Booking Engine', 'Mobile App', 'Wireframe Flow')",
    }),
    defineField({
      name: "caption",
      title: "Caption / Description",
      type: "text",
      rows: 2,
      description: "Optional short caption or description displayed beneath the image",
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL (Optional)",
      type: "string",
      description: "Optional public URL if this image should link out or display an action CTA. Supports bare domains (e.g. okeysontransports.com) or full URLs.",
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true;
          const str = String(val).trim();
          const lower = str.toLowerCase();
          if (
            lower.startsWith("javascript:") ||
            lower.startsWith("data:") ||
            lower.startsWith("vbscript:")
          ) {
            return "Unsafe link protocol not allowed";
          }
          if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(str)) {
            return "Please enter a valid URL or domain (e.g. example.com or https://example.com)";
          }
          return true;
        }),
    }),
    defineField({
      name: "linkLabel",
      title: "Link Label",
      type: "string",
      description: "Optional label for the link button (e.g. 'Visit Platform', 'View Mobile App'). Defaults to 'Visit Platform' if unset.",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "caption",
      media: "image",
      linkUrl: "linkUrl",
    },
    prepare({ title, subtitle, media, linkUrl }) {
      return {
        title: title || "Hero Image",
        subtitle: `${linkUrl ? `↗ ${linkUrl} | ` : ""}${subtitle || "No caption"}`,
        media,
      };
    },
  },
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
  productSurface,
  heroMediaItem,
];
