import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAboutPageData, getSiteSettings } from "@/sanity/queries";
import { mockAboutData } from "@/data/mockData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const aboutData = (await getAboutPageData()) || {};
  const siteSettings = (await getSiteSettings()) || {};

  const headshotUrl = aboutData.headshotUrl || siteSettings.faviconUrl;
  const headline = aboutData.headline || "From Strategy to Synthesis.";
  const bioText = aboutData.bio || mockAboutData.bio;

  const skillsGroups = Array.isArray(aboutData.skills) ? aboutData.skills : (mockAboutData.skills || []);

  const skills = skillsGroups.find((g: any) => g?.category?.toLowerCase().includes("ai"))?.items || 
                 skillsGroups[0]?.items || [];

  const tools = skillsGroups.flatMap((g: any) => (Array.isArray(g?.items) ? g.items.map((i: any) => i.name) : []));
  const defaultTools = [
    "PyTorch", "OpenAI API", "LangChain", "Python",
    "TensorFlow", "Docker", "Jira", "Figma", "PostgreSQL"
  ];
  const marqueeTools = tools.length > 0 ? [...tools, ...tools] : [...defaultTools, ...defaultTools];

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db] overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto">

        {/* Hero & Bio Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-32">
          
          {/* Photo */}
          <div className="md:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#47f0f4] to-[#bec2fc] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4/5] bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
              {headshotUrl ? (
                <img src={headshotUrl} alt="Chiagoziem Headshot" className="w-full h-full object-cover" />
              ) : (
                <>
                  <span className="text-[#47f0f4]/20 text-[200px]">✦</span>
                  <p className="absolute bottom-6 text-xs text-[#91909a] font-mono tracking-widest uppercase">
                    Photo Coming Soon
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-[#47f0f4] tracking-[0.2em] uppercase">
                The Architectural Evolution
              </h2>
              <h1 className="font-bold text-4xl sm:text-5xl text-[#e4e2db] tracking-tight leading-tight">
                {headline}
              </h1>
            </div>

            <div className="space-y-6 text-[#c7c5d0] leading-relaxed">
              {typeof bioText === "string" ? bioText.split("\n").map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              )) : null}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}