import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import about from "./src/sanity/schemas/about";
import caseStudy from "./src/sanity/schemas/caseStudies";
import product from "./src/sanity/schemas/products";
import teardown from "./src/sanity/schemas/teardowns";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r03r0hgb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "AI PM Portfolio Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [about, caseStudy, product, teardown],
  },
});
