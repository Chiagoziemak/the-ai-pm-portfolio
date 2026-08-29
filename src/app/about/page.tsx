import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAboutPageData, getSiteSettings } from "@/sanity/queries";
import { mockAboutData } from "@/data/mockData";
import { constructMetadata, generatePersonJsonLd } from "@/lib/seo";
import { Award } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [data, siteSettings] = await Promise.all([
    getAboutPageData(),
    getSiteSettings(),
  ]);

  const title = data?.metaTitle || "About Chiagoziem Melvin Akobundu | AI Product Manager";
  const description =
    data?.metaDescription ||
    (typeof data?.introText === "string" ? data.introText : null) ||
    "Learn more about Chiagoziem Melvin Akobundu — CSPO certified SaaS Product Manager transitioning into AI Product Management, agentic systems, and full-stack software development.";
  const image = data?.headshotUrl || siteSettings.ogImageUrl;

  return constructMetadata({
    title,
    description,
    image,
    imageAlt: data?.headshotAlt || "Chiagoziem Melvin Akobundu — Headshot",
    urlPath: "/about",
    siteSettings,
  });
}

export default async function AboutPage() {
  const data = await getAboutPageData();
  const siteSettings = (await getSiteSettings()) || {};

  const headline = data?.headline || "Chiagoziem Melvin Akobundu";
  const bioParagraphs: string[] = data?.introText
    ? [data.introText]
    : (Array.isArray((data as any)?.bio)
      ? (data as any).bio
      : (data?.bio ? [data.bio] : (typeof mockAboutData.bio === "string" ? [mockAboutData.bio] : [])));
  
  const taglineChips = Array.isArray(data?.taglineChips) ? data.taglineChips : [];
  const headshotUrl = data?.headshotUrl || "/profile-hero.jpg";
  const headshotAlt = data?.headshotAlt || "Chiagoziem Melvin Akobundu — Professional Headshot";
  const journey = (Array.isArray(data?.journey) && data.journey.length > 0)
    ? data.journey
    : mockAboutData.journey;
  const certifications = (Array.isArray(data?.certifications) && data.certifications.length > 0)
    ? data.certifications
    : (mockAboutData.certifications || []);
  const skillsGroups = (Array.isArray(data?.skills) && data.skills.length > 0)
    ? data.skills
    : mockAboutData.skills;

  const personJsonLd = generatePersonJsonLd(siteSettings, headshotUrl);

  return (
    <div className="min-h-screen page-bg-about text-foreground overflow-x-hidden flex flex-col transition-colors duration-300">
      {/* Structured Data (JSON-LD Person Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
      />

      <main className="flex-grow pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1280px] mx-auto w-full">

        {/* Hero & Bio Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-16 sm:mb-24">
          
          {/* Photo (Only rendered if headshotUrl is present) */}
          {headshotUrl && (
            <div className="md:col-span-5 relative group max-w-sm sm:max-w-md mx-auto w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-teal to-accent-cyan rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-2xl border border-card-border aspect-[4/5] glass-panel flex items-center justify-center shadow-lg">
                <img src={headshotUrl} alt={headshotAlt} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className={`${headshotUrl ? "md:col-span-7" : "md:col-span-12"} space-y-6 sm:space-y-8`}>
            <div className="space-y-3 sm:space-y-4">
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

              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-tight">
                {headline}
              </h1>
            </div>

            {bioParagraphs.length > 0 && (
              <div className="space-y-4 sm:space-y-6 text-foreground/80 leading-relaxed text-sm sm:text-base md:text-lg">
                {bioParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Technical Proficiency & Skills */}
        {skillsGroups.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-foreground tracking-tight">
              Technical &amp; Product Capability
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {skillsGroups.map((group: any, idx: number) => {
                if (!group) return null;
                const items = Array.isArray(group.items) ? group.items : [];
                return (
                  <div key={idx} className="p-6 sm:p-7 rounded-2xl border border-card-border glass-panel shadow-sm">
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

        {/* Professional Trajectory (Timeline Layout: 1 column on mobile, alternating on desktop) */}
        {journey.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-12 text-foreground tracking-tight">
              Professional Trajectory
            </h2>
            
            <div className="relative">
              {/* Connecting Timeline Line (Left on mobile, center on desktop) */}
              <div className="absolute left-4 md:left-1/2 top-3 bottom-3 w-0.5 bg-accent-teal/30 md:-translate-x-1/2"></div>

              <div className="space-y-8 sm:space-y-12">
                {journey.map((item: any, idx: number) => {
                  // Check cardPosition set in Studio ("left" | "right"). Default to alternating if left unset.
                  const isLeft = item.cardPosition ? item.cardPosition === "left" : idx % 2 === 0;

                  return (
                    <div key={idx} className="relative flex flex-col md:flex-row items-start group">
                      {/* Timeline Node Point (Left-4 on mobile, centered on desktop) */}
                      <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-background border-2 border-accent-teal group-hover:bg-accent-teal group-hover:scale-125 transition-all duration-300 -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(71,240,244,0.4)]"></div>

                      {/* Entry Card */}
                      <div
                        className={`w-[calc(100%-2.25rem)] ml-9 sm:ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                          isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                        }`}
                      >
                        <div className="p-5 sm:p-6 rounded-2xl border border-card-border glass-panel hover:border-accent-teal/40 transition-all duration-300 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex flex-wrap items-center gap-2">
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
                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-accent-teal transition-colors">
                              {item.role}
                            </h3>
                          )}

                          {item.description && (
                            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
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
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-foreground tracking-tight flex items-center gap-2.5">
              <Award size={26} className="text-accent-teal" />
              Certifications &amp; Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert: any, idx: number) => {
                const certName = typeof cert === "string" ? cert : (cert.name || cert.title || "");
                const issuer = typeof cert === "string" ? "" : (cert.issuer || cert.organization || "");
                const year = typeof cert === "string" ? "" : (cert.year || cert.date || "");
                const badgeUrl = typeof cert === "string" ? "" : (cert.badgeUrl || cert.url || "");

                return (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl border border-card-border glass-panel hover:border-accent-teal/40 transition-all duration-300 flex items-start gap-4 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center flex-shrink-0">
                      <Award size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-sm sm:text-base text-foreground leading-snug break-words">
                        {certName}
                      </h4>
                      {issuer && (
                        <p className="text-xs text-foreground/60 mt-1 font-mono">
                          {issuer} {year ? `• ${year}` : ""}
                        </p>
                      )}
                      {badgeUrl && (
                        <a
                          href={badgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs font-bold text-accent-teal hover:underline mt-2"
                        >
                          View Credential ↗
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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