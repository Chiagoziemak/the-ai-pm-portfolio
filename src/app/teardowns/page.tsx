import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeardownsList from "./TeardownsList";
import { getTeardowns, getSiteSettings } from "@/sanity/queries";
import { mockTeardowns } from "@/data/mockData";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return constructMetadata({
    title: "Product Teardowns & Strategy Analyses | Chiagoziem Melvin Akobundu",
    description:
      "Comprehensive product management teardowns analyzing user research, friction points, RICE prioritization, and strategic product roadmaps for leading AI and consumer platforms.",
    urlPath: "/teardowns",
    siteSettings,
  });
}

export default async function TeardownsPage() {
  const data = await getTeardowns();
  const siteSettings = (await getSiteSettings()) || {};
  const teardowns = data.length > 0 ? data : mockTeardowns;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden page-bg-teardowns text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-30 z-0 pointer-events-none"></div>

      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
      />

      <TeardownsList initialTeardowns={teardowns} />

      <Footer
        location={siteSettings.location}
        footerTagline={siteSettings.footerTagline}
        footerAvailabilityIcon={siteSettings.footerAvailabilityIcon}
        socialLinks={siteSettings.socialLinks}
        footerText={siteSettings.footerText}
        footerLinks={siteSettings.footerLinks}
      />
    </div>
  );
}
