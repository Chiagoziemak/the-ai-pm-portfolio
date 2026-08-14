import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import teardown from "./src/sanity/schemas/teardowns";
import caseStudy from "./src/sanity/schemas/caseStudies";
import product from "./src/sanity/schemas/products";
import siteSettings from "./src/sanity/schemas/siteSettings";
import { reusableObjects } from "./src/sanity/schemas/objects";
import { pageSchemas } from "./src/sanity/schemas/pages";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r03r0hgb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "AI PM Portfolio Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content Management")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            // Singletons: Pages
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),
            // Document Lists
            S.documentTypeListItem("teardown").title("Product Teardowns"),
            S.documentTypeListItem("caseStudy").title("Case Studies"),
            S.documentTypeListItem("product").title("Products"),
            S.divider(),
            // Submissions
            S.documentTypeListItem("contactSubmission").title("Contact Form Submissions"),
          ]),
    }),
  ],
  schema: {
    types: [
      siteSettings,
      teardown,
      caseStudy,
      product,
      ...pageSchemas,
      ...reusableObjects,
    ],
  },
});
