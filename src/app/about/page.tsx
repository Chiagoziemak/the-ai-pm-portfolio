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

  const headshotUrl = aboutData.headshotUrl;
  const headline = aboutData.headline || "From Strategy to Synthesis.";
  const bioText = aboutData.bio || mockAboutData.bio;

  const skillsGroups = Array.isArray(aboutData.skills) ? aboutData.skills : (mockAboutData.skills || []);

  const tools = skillsGroups.flatMap((g: any) => (Array.isArray(g?.items) ? g.items.map((i: any) => i.name) : []));

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db] overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto w-full">

        {/* Hero & Bio Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Photo (Only rendered if headshotUrl is present) */}
          {headshotUrl && (
            <div className="md:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#47f0f4] to-[#bec2fc] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4/5] bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
                <img src={headshotUrl} alt="Chiagoziem Headshot" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className={`${headshotUrl ? "md:col-span-7" : "md:col-span-12"} space-y-8`}>
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-[#47f0f4] tracking-[0.2em] uppercase">
                The Architectural Evolution
              </h2>
              <h1 className="font-bold text-4xl sm:text-5xl text-[#e4e2db] tracking-tight leading-tight">
                {headline}
              </h1>
            </div>

            {bioText && (
              <div className="space-y-6 text-[#c7c5d0] leading-relaxed text-base sm:text-lg">
                {typeof bioText === "string" ? bioText.split("\n").map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                )) : null}
              </div>
            )}
          </div>
        </section>

        {/* Technical Proficiency & Skills */}
        {skillsGroups.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-[#bec2fc]">Technical &amp; Product Capability</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsGroups.map((group: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl">
                  <h3 className="text-xs font-mono text-[#47f0f4] mb-4 uppercase tracking-widest font-bold">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(group.items) && group.items.map((item: any, iIdx: number) => (
                      <span key={iIdx} className="px-3 py-1 bg-[#1a1f4e] text-[#e4e2db] text-xs font-mono rounded-lg border border-white/10">
                        {typeof item === "string" ? item : item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer location={siteSettings.location} socialLinks={siteSettings.socialLinks} footerText={siteSettings.footerText} />
    </div>
  );
}