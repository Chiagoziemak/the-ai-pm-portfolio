import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAboutPageData, getSiteSettings } from "@/sanity/queries";
import { constructMetadata, generatePersonJsonLd } from "@/lib/seo";
import { Award, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [data, siteSettings] = await Promise.all([
    getAboutPageData(),
    getSiteSettings(),
  ]);

  if (siteSettings.aboutPageEnabled === false) {
    notFound();
  }

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
  const siteSettings = (await getSiteSettings()) || {};

  if (siteSettings.aboutPageEnabled === false) {
    notFound();
  }

  const data = await getAboutPageData();

  const headline = data?.headline || "Chiagoziem Melvin Akobundu";
  const bioParagraphs: string[] = data?.introText
    ? [data.introText]
    : (Array.isArray((data as any)?.bio)
      ? (data as any).bio
      : (data?.bio ? [data.bio] : []));
  
  const taglineChips = Array.isArray(data?.taglineChips) ? data.taglineChips : [];
  const headshotUrl = data?.headshotUrl || "/profile-hero.jpg";
  const headshotAlt = data?.headshotAlt || "Chiagoziem Melvin Akobundu — Professional Headshot";
  const journey = (Array.isArray(data?.journey) && data.journey.length > 0)
    ? data.journey
    : [];
  const certifications = (Array.isArray(data?.certifications) && data.certifications.length > 0)
    ? data.certifications
    : [];
  const skillsGroups = (Array.isArray(data?.skills) && data.skills.length > 0)
    ? data.skills
    : [];
  const learningVector = (Array.isArray(data?.learningVector) && data.learningVector.length > 0)
    ? data.learningVector
    : [];

  const closingHeadline = data?.closingHeadline;
  const closingText = data?.closingText;

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
        aboutPageEnabled={siteSettings.aboutPageEnabled}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
        productsPageEnabled={siteSettings.productsPageEnabled}
        teardownsPageEnabled={siteSettings.teardownsPageEnabled}
        contactPageEnabled={siteSettings.contactPageEnabled}
      />

      <main className="flex-grow pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

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
            <div className="space-y-3 sm:space-y-4 text-center md:text-left">
              <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
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
            <div className="text-center md:text-left mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Technical &amp; Product Capability
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {skillsGroups.map((group: any, idx: number) => {
                if (!group) return null;
                const items = Array.isArray(group.items) ? group.items : [];
                return (
                  <div
                    key={idx}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[380px] p-6 sm:p-7 rounded-2xl border border-card-border glass-panel shadow-sm flex flex-col justify-between"
                  >
                    <div>
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
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Learning Vector & Growth Focus (if defined) */}
        {learningVector.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center md:text-left mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Learning Vector &amp; Growth Focus
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {learningVector.map((skill, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-[calc(50%-0.75rem)] max-w-[480px] p-5 sm:p-6 rounded-2xl border border-card-border glass-panel shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2 font-mono text-xs sm:text-sm">
                    <span className="font-bold text-foreground">{skill.name}</span>
                    <span className="text-accent-teal font-semibold">{skill.percent}%</span>
                  </div>
                  <div className="w-full bg-card-border/30 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-accent-teal to-accent-cyan h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, skill.percent))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Trajectory (Timeline Layout: 1 column on mobile, alternating on desktop) */}
        {journey.length > 0 && (
          <section className="mb-16 sm:mb-24 max-w-5xl mx-auto w-full">
            <div className="text-center md:text-left mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Professional Trajectory
              </h2>
            </div>
            
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
          <section className="mb-16 sm:mb-24">
            <div className="text-center md:text-left mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                <Award size={26} className="text-accent-teal" />
                <span>Certifications &amp; Credentials</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {certifications.map((cert: any, idx: number) => {
                const certName = typeof cert === "string" ? cert : (cert.name || cert.title || "");
                const issuer = typeof cert === "string" ? "" : (cert.issuer || cert.organization || "");
                const year = typeof cert === "string" ? "" : (cert.year || cert.date || "");
                const badgeUrl = typeof cert === "string" ? "" : (cert.badgeUrl || cert.url || "");

                return (
                  <div
                    key={idx}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[380px] p-5 sm:p-6 rounded-2xl border border-card-border glass-panel hover:border-accent-teal/40 transition-all duration-300 flex items-start gap-4 shadow-sm"
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

        {/* Closing Callout Section with CTA */}
        {(closingHeadline || closingText) && (
          <section className="mt-16 sm:mt-24 mb-4">
            <div className="p-8 sm:p-12 md:p-16 rounded-3xl border border-card-border glass-panel text-center max-w-3xl mx-auto relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent-teal/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 space-y-4 sm:space-y-6">
                {closingHeadline && (
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-snug">
                    {closingHeadline}
                  </h2>
                )}
                {closingText && (
                  <p className="text-foreground/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    {closingText}
                  </p>
                )}
                <div className="pt-2 sm:pt-4">
                  {siteSettings.contactPageEnabled !== false ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-accent-teal text-background font-bold text-sm sm:text-base hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(0,212,216,0.3)] active:scale-95 transition-all duration-300 min-h-[48px] shadow-sm"
                    >
                      <span>Let's Talk</span>
                      <ArrowRight size={16} />
                    </Link>
                  ) : siteSettings.socialLinks?.linkedin ? (
                    <a
                      href={siteSettings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-accent-teal text-background font-bold text-sm sm:text-base hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(0,212,216,0.3)] active:scale-95 transition-all duration-300 min-h-[48px] shadow-sm"
                    >
                      <span>Connect on LinkedIn</span>
                      <ArrowRight size={16} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

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
      />
    </div>
  );
}