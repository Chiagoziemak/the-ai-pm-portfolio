import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description: "Custom browser tab & search engine title for homepage. If left blank, defaults to Site Settings title.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      description: "Custom search engine description for homepage. If left blank, defaults to Site Settings description.",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading (Name)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (Title)",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text (Bio Summary)",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive alt text for the hero photo.",
        }),
      ],
    }),
    defineField({
      name: "heroImagePosition",
      title: "Hero Image Position",
      type: "string",
      options: {
        list: [
          { title: "Right (Text Left, Image Right)", value: "right" },
          { title: "Left (Image Left, Text Right)", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({
      name: "heroTagChips",
      title: "Hero Tagline / Floating Chips",
      type: "array",
      of: [{ type: "string" }],
      description: "Short phrase chips near hero (e.g. 'GPT-4 Integration', 'Agentic Workflows')",
    }),
    defineField({
      name: "currentStack",
      title: "Current Stack List",
      type: "array",
      of: [{ type: "string" }],
      description: "Short current tech stack badges (e.g. Next.js, Python, LangChain, PyTorch)",
    }),
    defineField({
      name: "availabilityBadge",
      title: "Availability Badge Text",
      type: "string",
    }),
    defineField({
      name: "ctaButtons",
      title: "Call To Action Buttons",
      type: "array",
      of: [
        {
          type: "object",
          name: "ctaButton",
          title: "CTA Button",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL / Path", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "featuredTeardowns",
      title: "Featured Teardowns",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teardown" }] }],
    }),
    defineField({
      name: "credentialsShown",
      title: "Credentials Bar Badges",
      type: "array",
      of: [{ type: "credentialBlock" }],
    }),
    defineField({
      name: "learningTrack",
      title: "Learning Path",
      type: "array",
      of: [{ type: "learningItem" }],
      description: "Learning items (title, provider, status, tags, description)",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps (How I Work)",
      type: "array",
      of: [{ type: "processStep" }],
      description: "How I Work section process steps (number, title, description, icon, deliverables)",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "testimonial" }],
      description: "Peer, client, and leadership testimonials",
    }),
    defineField({
      name: "testimonialScrollInterval",
      title: "Testimonial Auto-Scroll Interval (Seconds)",
      type: "number",
      description: "Time in seconds before auto-advancing to the next testimonial. Set to 0 to disable auto-scroll (Default: 5).",
      initialValue: 5,
    }),
    defineField({
      name: "marqueeEnabled",
      title: "Enable Marquee Strip",
      type: "boolean",
      description: "Toggle to show or hide the ticker marquee strip on the homepage.",
      initialValue: true,
    }),
    defineField({
      name: "marqueeSpeed",
      title: "Marquee Scroll Speed (Seconds)",
      type: "number",
      description: "Duration in seconds for one full loop of the marquee ticker (Default: 25).",
      initialValue: 25,
    }),
    defineField({
      name: "marqueeItems",
      title: "Marquee Ticker Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "marqueeItem",
          title: "Marquee Item",
          fields: [
            defineField({ name: "title", title: "Title / Label", type: "string" }),
            defineField({ name: "desc", title: "Badge / Subtitle", type: "string" }),
            defineField({ name: "url", title: "Link URL / Path (Optional)", type: "string" }),
            defineField({ name: "color", title: "Dot Gradient Color Class (Optional)", type: "string" }),
          ],
        },
      ],
      description: "Custom ticker items displayed in the scrolling banner.",
    }),
    defineField({
      name: "sectionOrder",
      title: "Homepage Section Order",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Featured Work Strip (Marquee)", value: "featuredWorkStrip" },
              { title: "Case Studies (Featured Case Studies)", value: "caseStudies" },
              { title: "Teardowns (Featured Teardowns)", value: "teardowns" },
              { title: "How I Work (Process Steps)", value: "howIWork" },
              { title: "Testimonials (Endorsements)", value: "testimonials" },
              { title: "Learning Path", value: "learningTrack" },
            ],
          },
        },
      ],
      description: "Click 'Add item' to select sections and drag to reorder them on the homepage. Hero remains fixed at the top.",
    }),
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description: "Custom browser tab & search engine title. If left blank, defaults to 'About Chiagoziem Melvin Akobundu | AI Product Manager'.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      description: "Custom search engine snippet. If left blank, defaults to bio summary.",
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Bio Paragraph",
      type: "text",
    }),
    defineField({
      name: "headshot",
      title: "Professional Headshot Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive alt text for the headshot photo.",
        }),
      ],
    }),
    defineField({
      name: "taglineChips",
      title: "Tagline Chips / Badges",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technicalProficiency",
      title: "Technical Proficiency (Skills)",
      type: "array",
      of: [{ type: "skillBlock" }],
    }),
    defineField({
      name: "credentials",
      title: "Certifications & Credentials",
      type: "array",
      of: [{ type: "credentialBlock" }],
    }),
    defineField({
      name: "learningVector",
      title: "Learning Vector (Skill Bars)",
      type: "array",
      of: [{ type: "skillPercentBlock" }],
    }),
    defineField({
      name: "professionalTrajectory",
      title: "Professional Trajectory (Timeline)",
      type: "array",
      of: [{ type: "timelineEntry" }],
    }),
    defineField({
      name: "closingHeadline",
      title: "Closing Callout Headline",
      type: "string",
    }),
    defineField({
      name: "closingText",
      title: "Closing Callout Text",
      type: "text",
    }),
  ],
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description: "Custom browser tab & search engine title. If left blank, defaults to 'Contact Chiagoziem Melvin Akobundu | AI Product Manager'.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
      description: "Custom search engine snippet. If left blank, defaults to contact intro.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
    }),
    defineField({
      name: "statusMessage",
      title: "Status Message (e.g. Active & accepting inquiries)",
      type: "string",
    }),
  ],
});

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Form Submission",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Sender Name", type: "string" }),
    defineField({ name: "email", title: "Sender Email", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
  ],
});

export const pageSchemas = [homePage, aboutPage, contactPage, contactSubmission];
