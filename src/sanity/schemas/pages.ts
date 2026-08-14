import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
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
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
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
