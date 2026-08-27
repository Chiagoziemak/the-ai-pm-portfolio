import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "navLabels",
      title: "Optional Nav Labels",
      type: "object",
      fields: [
        defineField({ name: "home", title: "Home Label", type: "string" }),
        defineField({ name: "about", title: "About Label", type: "string" }),
        defineField({ name: "teardowns", title: "Teardowns Label", type: "string" }),
        defineField({ name: "caseStudies", title: "Case Studies Label", type: "string" }),
        defineField({ name: "products", title: "Products Label", type: "string" }),
        defineField({ name: "contact", title: "Contact Label", type: "string" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "github", title: "GitHub URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
      ],
    }),
    defineField({
      name: "resumeFile",
      title: "Resume File (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon Image",
      type: "image",
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location (e.g. Lagos, Nigeria)",
      type: "string",
      description: "Location string shown in footer or hero",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Form Destination Email",
      type: "string",
      description: "Submissions from the contact form will be emailed here (fallback: melvynmatthews19@gmail.com)",
    }),
    defineField({
      name: "navTitleText",
      title: "Navbar Title Text (e.g. The AI PM)",
      type: "string",
      description: "Text logo in header (defaults to 'The AI PM' if unset)",
    }),
    defineField({
      name: "navLogoImage",
      title: "Navbar Logo Image (Optional)",
      type: "image",
      description: "Optional logo image to display in navbar instead of text logo",
      options: { hotspot: true },
    }),
    defineField({
      name: "navLinks",
      title: "Navbar Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Nav Link",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL / Path", type: "string" }),
          ],
        },
      ],
      description: "Drag-to-reorder main header navigation links.",
    }),
    defineField({
      name: "navCtaLabel",
      title: "Navbar CTA Button Label",
      type: "string",
      description: "Label for top-right header button (defaults to 'Resume')",
    }),
    defineField({
      name: "navCtaUrl",
      title: "Navbar CTA Custom URL",
      type: "string",
      description: "Custom link for top-right header button (if unset, links to Resume PDF)",
    }),
    defineField({
      name: "caseStudiesPageEnabled",
      title: "Enable Case Studies Page & Sections",
      type: "boolean",
      description: "Toggle to show or hide the /case-studies page, navbar link, and homepage case study sections.",
      initialValue: true,
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          title: "Footer Link",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL / Path", type: "string" }),
          ],
        },
      ],
      description: "Drag-to-reorder secondary footer / legal links.",
    }),
  ],
});
