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
    <div className="min-h-screen page-bg-about text-foreground overflow-x-hidden flex flex-col transition-colors duration-300">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-teal to-accent-cyan rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-xl border border-card-border aspect-[4/5] glass-panel flex items-center justify-center">
                <img src={headshotUrl} alt={headline || "Chiagoziem Headshot"} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className={`${headshotUrl ? "md:col-span-7" : "md:col-span-12"} space-y-8`}>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-accent-teal tracking-[0.2em] uppercase font-bold">
                  The Architectural Evolution
                </span>
                {taglineChips.map((chip: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent-teal/10 text-accent-teal border border-accent-teal/20 font-semibold">
                    ✦ {chip}
                  </span>
                ))}
              </div>

              <h1 className="font-bold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight">
                {headline}
              </h1>
            </div>

            {bioParagraphs.length > 0 && (
              <div className="space-y-6 text-foreground/80 leading-relaxed text-base sm:text-lg">
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
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-foreground tracking-tight">Technical &amp; Product Capability</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillsGroups.map((group: any, idx: number) => {
                if (!group) return null;
                const items = Array.isArray(group.items) ? group.items : [];
                return (
                  <div key={idx} className="p-6 rounded-2xl border border-card-border glass-panel">
                    {group.category && (
                      <h3 className="text-xs font-mono text-accent-teal mb-4 uppercase tracking-widest font-bold">
                        {group.category}
                      </h3>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {items.map((item: any, iIdx: number) => {
                        if (!item) return null;
                        const label = typeof item === "string" ? item : (item.name || item.label || String(item));
                        return (
                          <span key={iIdx} className="px-3 py-1 bg-card border border-card-border text-foreground text-xs font-mono rounded-lg">
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

        {/* Professional Trajectory (Visual Timeline Layout with Left/Right Card Control) */}
        {journey.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-12 text-foreground tracking-tight">
              Professional Trajectory
            </h2>
            
            <div className="relative">
              {/* Connecting Timeline Line (Center on desktop, left-aligned on mobile) */}
              <div className="absolute left-4 md:left-1/2 top-3 bottom-3 w-0.5 bg-accent-teal/30 md:-translate-x-1/2"></div>

              <div className="space-y-12">
                {journey.map((item: any, idx: number) => {
                  // Check cardPosition set in Studio ("left" | "right"). Default to alternating if left unset.
                  const isLeft = item.cardPosition ? item.cardPosition === "left" : idx % 2 === 0;

                  return (
                    <div key={idx} className="relative flex flex-col md:flex-row items-start group">
                      {/* Timeline Node Point (Centered on line) */}
                      <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-background border-2 border-accent-teal group-hover:bg-accent-teal group-hover:scale-125 transition-all duration-300 -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(71,240,244,0.4)]"></div>

                      {/* Entry Card */}
                      <div
                        className={`w-[calc(100%-2.5rem)] ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                          isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                        }`}
                      >
                        <div className="p-6 rounded-2xl border border-card-border glass-panel hover:border-accent-teal/40 transition-all duration-300 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
                                {item.year}
                              </span>
                              {item.company && (
                                <span className="text-xs font-mono text-foreground/60 font-semibold">
                                  @ {item.company}
                                </span>
                              )}
                            </div>
                          </div>

                          {item.role && (
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent-teal transition-colors">
                              {item.role}
                            </h3>
                          )}

                          {item.description && (
                            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Certifications & Credentials */}
        {certifications.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-foreground tracking-tight">Certifications &amp; Credentials</h2>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert: any, idx: number) => {
                const label = typeof cert === "string" ? cert : (cert.name || cert.label || String(cert));
                return (
                  <span key={idx} className="px-4 py-2 rounded-xl border border-card-border glass-panel text-accent-teal text-xs font-mono font-bold shadow-sm">
                    📜 {label}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Closing Callout */}
        {(aboutData.closingHeadline || aboutData.closingText) && (
          <section className="mb-12 p-8 sm:p-12 rounded-3xl border border-accent-teal/30 bg-gradient-to-r from-accent-teal/10 via-card to-accent-cyan/10 text-center glass-panel shadow-sm">
            {aboutData.closingHeadline && <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-foreground">{aboutData.closingHeadline}</h2>}
            {aboutData.closingText && <p className="text-foreground/80 max-w-2xl mx-auto text-base leading-relaxed">{aboutData.closingText}</p>}
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