import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r03r0hgb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-06-03";

export const sanityConfigured = true;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Bypass Sanity API CDN cache to ensure freshly published content is returned immediately
});
