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
      name: "siteUrl",
      title: "Primary Site URL",
      type: "url",
      description: "Base canonical URL for your portfolio (e.g. https://chiagoziemak.dev or https://theaipm.com)",
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Share / Open Graph Image",
      type: "image",
      description: "Sitewide fallback image used for Twitter Cards and Open Graph previews (1200x630px recommended).",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Descriptive alt text for the social share image.",
        }),
      ],
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
      name: "footerTagline",
      title: "Footer Tagline / Role Text",
      type: "string",
      description: "Role or title text shown before the availability/location in the footer (e.g. 'AI Product Manager & Engineer'). If left blank, it is hidden.",
    }),
    defineField({
      name: "location",
      title: "Location / Availability Text (e.g. Lagos, Nigeria / Open to Remote)",
      type: "string",
      description: "Location or availability string shown in footer or hero",
    }),
    defineField({
      name: "footerAvailabilityIcon",
      title: "Footer Availability Icon",
      type: "string",
      description: "React-icons identifier for the icon next to the location/availability text (e.g. FiMapPin, FiGlobe, FiCompass). Defaults to FiMapPin if left blank.",
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
