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
  const rawBio: any = aboutData.bio || aboutData.introText || mockAboutData.bio;

  const bioParagraphs: string[] = typeof rawBio === "string"
    ? rawBio.split("\n").filter((p) => p.trim() !== "")
    : Array.isArray(rawBio)
    ? rawBio.map((b: any) => (typeof b === "string" ? b : (b?.children?.map((c: any) => c.text).join("") || ""))).filter((p: string) => p.trim() !== "")
    : [];

  const skillsGroups = Array.isArray(aboutData.skills) ? aboutData.skills : (mockAboutData.skills || []);
  const journey = Array.isArray(aboutData.journey) ? aboutData.journey : (mockAboutData.journey || []);
  const certifications = Array.isArray(aboutData.certifications) ? aboutData.certifications : (mockAboutData.certifications || []);
  const taglineChips = Array.isArray(aboutData.taglineChips) ? aboutData.taglineChips : [];

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db] overflow-x-hidden flex flex-col">
      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
      />

      <main className="flex-grow pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto w-full">

        {/* Hero & Bio Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Photo (Only rendered if headshotUrl is present) */}
          {headshotUrl && (
            <div className="md:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#47f0f4] to-[#bec2fc] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4/5] bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
                <img src={headshotUrl} alt={headline || "Chiagoziem Headshot"} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className={`${headshotUrl ? "md:col-span-7" : "md:col-span-12"} space-y-8`}>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-[#47f0f4] tracking-[0.2em] uppercase font-bold">
                  The Architectural Evolution
                </span>
                {taglineChips.map((chip: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#47f0f4]/10 text-[#47f0f4] border border-[#47f0f4]/20">
                    ✦ {chip}
                  </span>
                ))}
              </div>

              <h1 className="font-bold text-4xl sm:text-5xl text-[#e4e2db] tracking-tight leading-tight">
                {headline}
              </h1>
            </div>

            {bioParagraphs.length > 0 && (
              <div className="space-y-6 text-[#c7c5d0] leading-relaxed text-base sm:text-lg">
                {bioParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Technical Proficiency & Skills */}
        {skillsGroups.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-[#bec2fc]">Technical &amp; Product Capability</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsGroups.map((group: any, idx: number) => {
                if (!group) return null;
                const items = Array.isArray(group.items) ? group.items : [];
                return (
                  <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl">
                    {group.category && (
                      <h3 className="text-xs font-mono text-[#47f0f4] mb-4 uppercase tracking-widest font-bold">
                        {group.category}
                      </h3>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {items.map((item: any, iIdx: number) => {
                        if (!item) return null;
                        const label = typeof item === "string" ? item : (item.name || item.label || String(item));
                        return (
                          <span key={iIdx} className="px-3 py-1 bg-[#1a1f4e] text-[#e4e2db] text-xs font-mono rounded-lg border border-white/10">
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Professional Trajectory / Journey */}
        {journey.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-[#bec2fc]">Professional Trajectory</h2>
            <div className="space-y-6">
              {journey.map((item: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-[#47f0f4] tracking-wider font-bold">{item.year}</span>
                      {item.year && item.company && <span className="text-[#91909a] text-xs">•</span>}
                      {item.company && <span className="text-xs font-mono text-[#c7c5d0]">{item.company}</span>}
                    </div>
                    {item.role && <h3 className="text-lg font-bold text-[#e4e2db]">{item.role}</h3>}
                    {item.description && <p className="text-xs sm:text-sm text-[#c7c5d0] mt-2 leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Credentials */}
        {certifications.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#bec2fc]">Certifications &amp; Credentials</h2>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert: any, idx: number) => {
                const label = typeof cert === "string" ? cert : (cert.name || cert.label || String(cert));
                return (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-[#1a1f4e] text-[#47f0f4] border border-[#47f0f4]/20 text-xs font-mono font-bold">
                    📜 {label}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Closing Callout */}
        {(aboutData.closingHeadline || aboutData.closingText) && (
          <section className="mb-12 p-8 sm:p-12 rounded-3xl border border-[#47f0f4]/30 bg-gradient-to-r from-[#47f0f4]/10 via-[#0a0c1f] to-[#bec2fc]/10 text-center">
            {aboutData.closingHeadline && <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-[#e4e2db]">{aboutData.closingHeadline}</h2>}
            {aboutData.closingText && <p className="text-[#c7c5d0] max-w-2xl mx-auto text-base leading-relaxed">{aboutData.closingText}</p>}
          </section>
        )}

      </main>

      <Footer
        location={siteSettings.location}
        socialLinks={siteSettings.socialLinks}
        footerText={siteSettings.footerText}
        footerLinks={siteSettings.footerLinks}
      />
    </div>
  );
}