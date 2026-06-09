import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-06-03";

export const sanityConfigured = projectId !== "";

export const sanityClient = createClient({
  projectId: sanityConfigured ? projectId : "mock-project-id",
  dataset,
  apiVersion,
  useCdn: true,
});
