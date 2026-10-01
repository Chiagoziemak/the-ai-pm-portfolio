import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourcesList from "./ResourcesList";
import { getResources, getSiteSettings } from "@/sanity/queries";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  if (siteSettings.enableResourcesPage !== true) {
    notFound();
  }

  return constructMetadata({
    title: "AI PM Resources, E-Books & Frameworks | Chiagoziem Melvin Akobundu",
    description:
      "Actionable e-books, PRD blueprints, AI prompt frameworks, and portfolio guides designed for ambitious AI Product Managers and technical leaders.",
    urlPath: "/resources",
    siteSettings,
  });
}

export default async function ResourcesPage() {
  const siteSettings = (await getSiteSettings()) || {};

  if (siteSettings.enableResourcesPage !== true) {
    notFound();
  }

  const data = await getResources();
  const resources = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden page-bg-resources text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-35 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-25 z-0 pointer-events-none"></div>

      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
        aboutPageEnabled={siteSettings.aboutPageEnabled}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
        productsPageEnabled={siteSettings.productsPageEnabled}
        teardownsPageEnabled={siteSettings.teardownsPageEnabled}
        contactPageEnabled={siteSettings.contactPageEnabled}
        resourcesPageEnabled={siteSettings.enableResourcesPage}
        navLabels={siteSettings.navLabels}
      />

      <ResourcesList resources={resources} />

      <Footer
        footerName={siteSettings.footerName}
        siteTitle={siteSettings.siteTitle}
        footerTagline={siteSettings.footerTagline}
        footerAvailabilityText={siteSettings.footerAvailabilityText}
        footerShowAvailability={siteSettings.footerShowAvailability}
        copyrightName={siteSettings.copyrightName}
        footerStatement={siteSettings.footerStatement}
        socialLinks={siteSettings.socialLinks}
        footerLinks={siteSettings.footerLinks}
        aboutPageEnabled={siteSettings.aboutPageEnabled}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
        productsPageEnabled={siteSettings.productsPageEnabled}
        teardownsPageEnabled={siteSettings.teardownsPageEnabled}
        contactPageEnabled={siteSettings.contactPageEnabled}
        resourcesPageEnabled={siteSettings.enableResourcesPage}
      />
    </div>
  );
}
