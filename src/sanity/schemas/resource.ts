import { defineType, defineField } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource / E-Book",
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
      description: "Custom browser tab & search engine title. If left blank, defaults to '[Title] — AI PM Resource | Chiagoziem Melvin Akobundu'.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      description: "Custom search engine snippet. If left blank, defaults to the summary.",
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
      name: "subtitle",
      title: "Subtitle / Tagline",
      type: "string",
      description: "Compelling secondary tagline (e.g. 'The complete blueprint for building, positioning, and launching AI-powered PM portfolios').",
    }),
    defineField({
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "E-Book", value: "e-book" },
          { title: "Template / Workspace", value: "template" },
          { title: "Guide / Playbook", value: "guide" },
          { title: "Checklist", value: "checklist" },
          { title: "Framework", value: "framework" },
          { title: "Tool / Prompt Kit", value: "tool" },
        ],
      },
      initialValue: "e-book",
    }),
    defineField({
      name: "status",
      title: "Availability Status",
      type: "string",
      options: {
        list: [
          { title: "Available Now", value: "Available Now" },
          { title: "Pre-Order", value: "Pre-Order" },
          { title: "Coming Soon", value: "Coming Soon" },
          { title: "Waitlist", value: "Waitlist" },
        ],
      },
      initialValue: "Available Now",
    }),
    defineField({
      name: "badge",
      title: "Card Badge Label",
      type: "string",
      description: "Top card pill (e.g. 'Featured E-Book', 'New Release', 'Bestseller', 'Free Download').",
    }),
    defineField({
      name: "heroBadge",
      title: "Hero Pill Label",
      type: "string",
      description: "Prominent pill on detail page hero (e.g. 'Step-by-Step Blueprint for AI PMs').",
    }),
    defineField({
      name: "resourceEnabled",
      title: "Resource Published & Enabled",
      type: "boolean",
      description: "Toggle to make this specific resource accessible publicly. When disabled, this resource will not appear on the listing page and its direct route will return 404.",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured Resource",
      type: "boolean",
      description: "Feature this resource on the homepage and highlight it at the top of the Resources page.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order Priority",
      type: "number",
      description: "Lower numbers display first (e.g. 1, 2, 3).",
    }),
    defineField({
      name: "priceText",
      title: "Price Label",
      type: "string",
      description: "Display price (e.g. '$19', '$29', '₦15,000', 'Free', 'Pay What You Want').",
    }),
    defineField({
      name: "originalPriceText",
      title: "Original Price (Strikethrough)",
      type: "string",
      description: "Optional strikethrough price for discount comparison (e.g. '$49').",
    }),
    defineField({
      name: "ctaText",
      title: "Primary CTA Button Label",
      type: "string",
      description: "Primary purchase/access button text (defaults to 'Get E-Book' if unset).",
      initialValue: "Get E-Book",
    }),
    defineField({
      name: "ctaUrl",
      title: "Primary Purchase / Download URL",
      type: "string",
      description: "Direct checkout URL (e.g. Nestuge, Gumroad, Lemon Squeezy, or downloadable file link).",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA Button Label",
      type: "string",
      description: "Optional secondary button label (e.g. 'Preview Chapter', 'View Contents').",
    }),
    defineField({
      name: "secondaryCtaUrl",
      title: "Secondary CTA Target URL / Section Anchor",
      type: "string",
      description: "Optional secondary URL or anchor link (e.g. '#table-of-contents').",
    }),
    defineField({
      name: "coverImage",
      title: "Cover / 3D Book Mockup Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive alt text for the book/resource image.",
        }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary / Value Pitch",
      type: "text",
      rows: 4,
      description: "High-impact summary explaining what the resource delivers.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formatDetails",
      title: "Format & Deliverables Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Quick bullet points (e.g. 'PDF + Notion Workspace', '120+ Actionable Pages', '50+ AI Prompts Included', 'Lifetime Access').",
    }),
    defineField({
      name: "targetAudience",
      title: "Who Is This For? (Target Personas)",
      type: "array",
      of: [{ type: "string" }],
      description: "Target audience bullet points (e.g. 'Aspiring AI Product Managers', 'Mid-level PMs transitioning into AI', 'Founders building AI MVPs').",
    }),
    defineField({
      name: "learningOutcomes",
      title: "What You Will Learn / Core Outcomes",
      type: "array",
      of: [
        {
          type: "object",
          name: "learningOutcome",
          title: "Outcome",
          fields: [
            defineField({
              name: "title",
              title: "Outcome Headline",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Detailed Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
      description: "Key transformations, frameworks, and skills the reader will acquire.",
    }),
    defineField({
      name: "tableOfContents",
      title: "Table of Contents / Curriculum Breakdown",
      type: "array",
      of: [
        {
          type: "object",
          name: "chapter",
          title: "Chapter / Module",
          fields: [
            defineField({
              name: "chapterNumber",
              title: "Chapter / Module Number (e.g. '01' or 'Module 1')",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Chapter Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "topics",
              title: "Key Topics / Lessons Covered",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: {
              number: "chapterNumber",
              title: "title",
            },
            prepare({ number, title }) {
              return {
                title: `${number ? `[${number}] ` : ""}${title || "Untitled Chapter"}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "bonuses",
      title: "Included Bonuses",
      type: "array",
      of: [
        {
          type: "object",
          name: "bonusItem",
          title: "Bonus Item",
          fields: [
            defineField({
              name: "title",
              title: "Bonus Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Bonus Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "valueBadge",
              title: "Value Badge (e.g. '$50 Value' or 'Free Bonus')",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              badge: "valueBadge",
            },
            prepare({ title, badge }) {
              return {
                title: title || "Bonus",
                subtitle: badge,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "authorNoteHeading",
      title: "Author Note Heading",
      type: "string",
      description: "Heading for personal backstory section (defaults to 'Why I Wrote This E-Book').",
    }),
    defineField({
      name: "whyIWroteThis",
      title: "Why I Wrote This / Author's Note",
      type: "array",
      of: [{ type: "block" }],
      description: "Personal note from Chiagoziem detailing the backstory and insights behind the resource.",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials / Reader Reviews",
      type: "array",
      of: [{ type: "testimonial" }],
      description: "Endorsements and reviews from early readers or PMs.",
    }),
    defineField({
      name: "faqs",
      title: "Frequently Asked Questions (FAQs)",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        },
      ],
    }),
    defineField({
      name: "closingCta",
      title: "Closing CTA Section",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Closing Headline",
          type: "string",
          description: "e.g. 'Ready to Build Your AI PM Portfolio?'",
        }),
        defineField({
          name: "subtext",
          title: "Closing Subtext",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ctaText",
          title: "Button Label",
          type: "string",
        }),
        defineField({
          name: "ctaUrl",
          title: "Custom Checkout / Destination URL",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "resourceType",
      status: "status",
      enabled: "resourceEnabled",
      featured: "featured",
      price: "priceText",
      media: "coverImage",
    },
    prepare({ title, type, status, enabled, featured, price, media }) {
      const badges = [
        enabled ? "🟢 Published" : "🔴 Hidden",
        featured ? "★ Featured" : null,
        price || null,
        type ? type.toUpperCase() : null,
        status || null,
      ]
        .filter(Boolean)
        .join(" | ");

      return {
        title: title || "Untitled Resource",
        subtitle: badges,
        media,
      };
    },
  },
});
