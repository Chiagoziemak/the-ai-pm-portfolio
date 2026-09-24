import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatGrid from "@/components/StatGrid";
import { getCaseStudies, getSiteSettings } from "@/sanity/queries";
import { constructMetadata } from "@/lib/seo";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  if (siteSettings.caseStudiesPageEnabled === false) {
    notFound();
  }

  return constructMetadata({
    title: "AI Product Case Studies & Strategy Breakdowns | Chiagoziem Melvin Akobundu",
    description:
      "Deep dive case studies on building autonomous AI agents, evaluating LLM systems, user research synthesis, product metrics, and engineering execution.",
    urlPath: "/case-studies",
    siteSettings,
  });
}

export default async function CaseStudiesPage() {
  const siteSettings = await getSiteSettings();

  if (siteSettings.caseStudiesPageEnabled === false) {
    notFound();
  }

  const data = await getCaseStudies();
  const caseStudies = Array.isArray(data) ? data : [];

  const featuredCaseStudy = caseStudies.length > 0 ? caseStudies[0] : null;
  const otherCaseStudies = caseStudies.length > 1 ? caseStudies.slice(1) : [];

  if (caseStudies.length === 0) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-hidden page-bg-casestudies text-foreground transition-colors duration-300">
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

        <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto space-y-6 glass-panel p-12 rounded-3xl border-card-border shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center mx-auto text-2xl font-bold">
              <span>✦</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Case Studies Coming Soon
            </h1>
            <p className="text-foreground/80 leading-relaxed text-base">
              The Product Case Studies section is currently undergoing updates. Detailed technical breakdowns and ROI evaluations will be published shortly.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/teardowns"
                className="px-6 py-3 rounded-xl bg-accent-teal text-background font-bold hover:bg-accent-cyan transition-all text-sm"
              >
                Explore Product Teardowns →
              </Link>
              {siteSettings.contactPageEnabled !== false && (
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl border border-card-border glass-panel hover:bg-card-border/20 text-foreground font-semibold transition-all text-sm"
                >
                  Contact Chiagoziem
                </Link>
              )}
            </div>
          </div>
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

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden page-bg-casestudies text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-30 z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-20 z-0"></div>

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

      <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center md:text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Deep Dives</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">Product Case Studies</h1>
          <p className="text-foreground/70 mt-3 max-w-2xl text-base sm:text-lg">
            Detailed case studies mapping out real-world customer pain points, data-driven hypotheses, product strategy, technical implementation, and measurable business outcomes.
          </p>
        </div>

        {/* Featured ResumeGenie Banner */}
        {featuredCaseStudy && (
          <section className="mb-16">
            <div className="rounded-3xl overflow-hidden glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full blur-[80px] bg-accent-teal/5 pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                {/* Image side */}
                <div className="lg:col-span-5 h-[200px] sm:h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-card-border/40 flex items-center justify-center relative shadow-inner">
                  {featuredCaseStudy.coverImage ? (
                    <img 
                      src={featuredCaseStudy.coverImage} 
                      alt={featuredCaseStudy.coverImageAlt || `${featuredCaseStudy.title} — Case Study Cover`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-750" 
                    />
                  ) : (
                    <Sparkles size={64} className="text-accent-teal/15 group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-transparent pointer-events-none"></div>
                </div>

                {/* Content on right */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-teal text-background">
                        Featured Case Study
                      </span>
                      {featuredCaseStudy.badgeLabel && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                          {featuredCaseStudy.badgeLabel}
                        </span>
                      )}
                      {featuredCaseStudy.isPlaceholder && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Placeholder Content
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider glass-panel text-foreground/80 border-card-border">
                        {featuredCaseStudy.category}
                      </span>
                      <span className="text-xs text-foreground/50 ml-auto">{featuredCaseStudy.date}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug">
                      {featuredCaseStudy.title}
                    </h2>

                    <p className="text-sm sm:text-base text-foreground/75 leading-relaxed mb-6">
                      {featuredCaseStudy.summary}
                    </p>
                  </div>

                  <div>
                    {/* Card Stat-Pair Blocks if present */}
                    {Array.isArray(featuredCaseStudy.cardStats) && featuredCaseStudy.cardStats.length > 0 ? (
                      <StatGrid stats={featuredCaseStudy.cardStats} />
                    ) : (
                      /* Results badges */
                      Array.isArray(featuredCaseStudy.results) && featuredCaseStudy.results.length > 0 && (
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {featuredCaseStudy.results.map((res, i) => (
                            <div key={i} className="px-3.5 py-2.5 rounded-xl bg-card-border/20 border border-card-border/40 text-xs text-foreground/90 font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0"></span>
                              <span>{res}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-card-border/30">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {Array.isArray(featuredCaseStudy.tools) && featuredCaseStudy.tools.slice(0, 6).map((tool) => (
                          <span key={tool} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
                            {tool}
                          </span>
                        ))}
                        {Array.isArray(featuredCaseStudy.tools) && featuredCaseStudy.tools.length > 6 && (
                          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-card-border/40 text-foreground/60 border border-card-border/50">
                            +{featuredCaseStudy.tools.length - 6} more
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/case-studies/${featuredCaseStudy.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors group-hover:translate-x-1 duration-300 min-h-[36px]"
                      >
                        Read Full Case Study <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Case Studies Grid (Flexbox centered last-row layout) */}
        {otherCaseStudies.length > 0 && (
          <section className="flex flex-wrap justify-center gap-8">
            {otherCaseStudies.map((study) => {
              const tools = Array.isArray(study.tools) ? study.tools.filter(Boolean) : [];
              const initialTools = tools.slice(0, 5);
              const extraToolsCount = tools.length - initialTools.length;

              return (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group rounded-3xl p-6 sm:p-8 glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full w-full md:w-[calc(50%-1rem)] max-w-[580px]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-card-border/30 text-foreground/80 font-bold">{study.category}</span>
                        {study.badgeLabel && (
                          <span className="px-2 py-0.5 rounded-md bg-accent-cyan/20 text-accent-cyan text-[10px]">
                            {study.badgeLabel}
                          </span>
                        )}
                      </div>
                      <span>{study.date}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug line-clamp-2 md:min-h-[3.5rem]">
                      {study.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-foreground/70 line-clamp-3 leading-relaxed mb-6 md:min-h-[3.75rem]">
                      {study.summary}
                    </p>

                    {/* Card Stat-Pair Blocks or Results if present */}
                    {Array.isArray(study.cardStats) && study.cardStats.length > 0 ? (
                      <div className="mb-6">
                        <StatGrid stats={study.cardStats} />
                      </div>
                    ) : (
                      Array.isArray(study.results) && study.results.length > 0 && (
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {study.results.slice(0, 2).map((res, i) => (
                            <div key={i} className="px-3 py-2 rounded-xl bg-card-border/20 border border-card-border/30 text-xs text-foreground/80 font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0"></span>
                              <span className="truncate">{res}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    {/* Methods / Tags with Capping */}
                    {tools.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        {initialTools.map((tool) => (
                          <span key={tool} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
                            {tool}
                          </span>
                        ))}
                        {extraToolsCount > 0 && (
                          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-card-border/40 text-foreground/60 border border-card-border/50">
                            +{extraToolsCount} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-card-border/30 flex items-center justify-between text-xs font-semibold text-accent-teal group-hover:text-accent-cyan">
                    <span>Read Full Case Study</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
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
