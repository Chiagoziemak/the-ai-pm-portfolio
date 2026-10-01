import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceFaqAccordion from "@/components/ResourceFaqAccordion";
import { getResourceBySlug, getSiteSettings } from "@/sanity/queries";
import { constructMetadata } from "@/lib/seo";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Download,
  Gift,
  HelpCircle,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteSettings = await getSiteSettings();

  if (siteSettings.enableResourcesPage !== true) {
    notFound();
  }

  const resource = await getResourceBySlug(slug);

  if (!resource || resource.resourceEnabled !== true) {
    notFound();
  }

  const title = resource.metaTitle || `${resource.title} — AI PM Resource | Chiagoziem Melvin Akobundu`;
  const description = resource.metaDescription || resource.subtitle || resource.summary || "";
  const image = resource.coverImage || siteSettings.ogImageUrl;

  return constructMetadata({
    title,
    description,
    image,
    imageAlt: resource.coverImageAlt || `${resource.title} Cover`,
    urlPath: `/resources/${slug}`,
    siteSettings,
  });
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const siteSettings = (await getSiteSettings()) || {};

  if (siteSettings.enableResourcesPage !== true) {
    notFound();
  }

  const resource = await getResourceBySlug(slug);

  if (!resource || resource.resourceEnabled !== true) {
    notFound();
  }

  const primaryCtaUrl = resource.ctaUrl
    ? resource.ctaUrl.startsWith("http") || resource.ctaUrl.startsWith("#")
      ? resource.ctaUrl
      : `https://${resource.ctaUrl}`
    : "#";

  const isExternalCta = primaryCtaUrl.startsWith("http");

  // Structured Data (JSON-LD Product/Book Schema)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": resource.resourceType === "e-book" ? "Book" : "Product",
    name: resource.title,
    description: resource.summary || resource.subtitle || "",
    image: resource.coverImage ? [resource.coverImage] : undefined,
    author: {
      "@type": "Person",
      name: siteSettings.footerName || "Chiagoziem Melvin Akobundu",
      url: siteSettings.siteUrl || "https://chiagoziemak.dev",
    },
    offers: resource.priceText
      ? {
          "@type": "Offer",
          price: resource.priceText.replace(/[^0-9.]/g, "") || "0",
          priceCurrency: resource.priceText.includes("₦") ? "NGN" : "USD",
          availability: "https://schema.org/InStock",
          url: `${siteSettings.siteUrl || "https://chiagoziemak.dev"}/resources/${slug}`,
        }
      : undefined,
  };

  const hasWhyIWroteThisArray = Array.isArray(resource.whyIWroteThis) && resource.whyIWroteThis.length > 0;
  const hasWhyIWroteThisString = typeof resource.whyIWroteThis === "string" && resource.whyIWroteThis.trim() !== "";
  const hasWhyIWroteThis = hasWhyIWroteThisArray || hasWhyIWroteThisString;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden page-bg-resources text-foreground transition-colors duration-300">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-[5%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[140px] glow-bg opacity-35 z-0 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[140px] glow-bg opacity-25 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[140px] glow-bg opacity-20 z-0 pointer-events-none"></div>

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

      <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24">
        
        {/* 1. Breadcrumbs & Back Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60 mb-8 sm:mb-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 hover:text-accent-teal transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            <span>All Resources</span>
          </Link>
          <span>/</span>
          <span className="text-foreground/90 font-semibold truncate max-w-xs sm:max-w-md">
            {resource.title}
          </span>
        </div>

        {/* 2. HERO SALES SECTION */}
        <section className="mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-accent-teal text-background shadow-sm">
                  {resource.heroBadge || resource.badge || "AI PM Playbook"}
                </span>

                {resource.status && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{resource.status}</span>
                  </div>
                )}

                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider glass-panel text-foreground/80 border-card-border">
                  {resource.resourceType?.toUpperCase() || "DIGITAL E-BOOK"}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-4 text-foreground break-words">
                {resource.title}
              </h1>

              {/* Subtitle / Tagline */}
              {resource.subtitle && (
                <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-accent-cyan via-accent-teal to-teal-400 bg-clip-text text-transparent mb-6 leading-snug">
                  {resource.subtitle}
                </p>
              )}

              {/* Summary */}
              {resource.summary && (
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed mb-8 max-w-2xl">
                  {resource.summary}
                </p>
              )}

              {/* Format Highlights / Deliverables Checklist */}
              {Array.isArray(resource.formatDetails) && resource.formatDetails.length > 0 && (
                <div className="mb-8 w-full p-4 sm:p-5 rounded-2xl glass-panel border-card-border/70 bg-card/30">
                  <span className="text-xs font-mono text-accent-teal uppercase tracking-widest block mb-3 font-bold">
                    What's Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {resource.formatDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/85 font-medium">
                        <CheckCircle2 size={16} className="text-accent-teal flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & CTA Action Box */}
              <div className="w-full p-5 sm:p-6 rounded-3xl glass-panel border-accent-teal/40 bg-gradient-to-br from-accent-teal/10 via-card/70 to-card/90 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-foreground/60 block">Instant Access Price</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      {resource.priceText ? (
                        <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                          {resource.priceText}
                        </span>
                      ) : (
                        <span className="text-3xl sm:text-4xl font-black text-accent-teal tracking-tight">
                          Free
                        </span>
                      )}
                      {resource.originalPriceText && (
                        <span className="text-base sm:text-lg text-foreground/50 line-through font-mono">
                          {resource.originalPriceText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      <ShieldCheck size={14} /> Instant Access Guarantee
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {isExternalCta ? (
                    <a
                      href={primaryCtaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-black text-sm sm:text-base shadow-xl shadow-accent-teal/25 hover:shadow-accent-teal/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[48px]"
                    >
                      <Zap size={18} />
                      <span>{resource.ctaText || "Get Instant Access"}</span>
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <Link
                      href={primaryCtaUrl}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-black text-sm sm:text-base shadow-xl shadow-accent-teal/25 hover:shadow-accent-teal/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[48px]"
                    >
                      <Zap size={18} />
                      <span>{resource.ctaText || "Get Instant Access"}</span>
                      <ArrowUpRight size={18} />
                    </Link>
                  )}

                  {resource.secondaryCtaText && (
                    <a
                      href={resource.secondaryCtaUrl || "#table-of-contents"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-panel text-foreground font-bold text-sm border-card-border hover:border-accent-teal/50 transition-all min-h-[48px]"
                    >
                      <span>{resource.secondaryCtaText}</span>
                    </a>
                  )}
                </div>

                <p className="text-[11px] font-mono text-foreground/50 text-center mt-3">
                  Secure checkout • Instant digital download • Lifetime access &amp; free updates
                </p>
              </div>
            </div>

            {/* Right Media / 3D Book Mockup Column */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden glass-panel border-card-border/80 p-4 sm:p-6 shadow-2xl group bg-gradient-to-b from-slate-900 via-slate-950 to-background flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/20 via-transparent to-accent-cyan/15 opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>

                {resource.coverImage ? (
                  <img
                    src={resource.coverImage}
                    alt={resource.coverImageAlt || `${resource.title} — Book Mockup`}
                    className="w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-transform duration-700 z-10"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center z-10 p-6 border border-card-border/60 rounded-2xl bg-card/40">
                    <BookOpen size={72} className="text-accent-teal/60" />
                    <h3 className="text-xl font-bold text-foreground">{resource.title}</h3>
                    <span className="text-xs font-mono text-accent-cyan uppercase tracking-widest">{resource.resourceType || "E-Book"}</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between px-3 py-2 rounded-xl glass-panel border-card-border/50 text-[11px] font-mono text-foreground/80">
                  <span className="flex items-center gap-1.5 text-accent-teal">
                    <Sparkles size={13} /> Complete Edition
                  </span>
                  <span>Instant PDF + Templates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TARGET AUDIENCE ("Who Is This E-Book For?") */}
        {Array.isArray(resource.targetAudience) && resource.targetAudience.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold flex items-center justify-center gap-1.5">
                <Target size={14} /> Who This Is For
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 tracking-tight">
                Designed for Product Leaders &amp; AI Builders
              </h2>
              <p className="text-foreground/70 mt-2 text-sm sm:text-base">
                Whether you are stepping into your first AI role or scaling generative AI applications at an enterprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resource.targetAudience.map((persona, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl glass-panel border-card-border/70 hover:border-accent-teal/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center mb-4">
                      <UserCheck size={20} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-snug">
                      {persona}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-card-border/30 flex items-center gap-2 text-xs text-accent-cyan font-mono font-semibold">
                    <CheckCircle2 size={14} /> Highly Actionable
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. WHAT YOU WILL LEARN / CORE OUTCOMES */}
        {Array.isArray(resource.learningOutcomes) && resource.learningOutcomes.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold flex items-center justify-center gap-1.5">
                <Zap size={14} /> Practical Transformations
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 tracking-tight">
                What You Will Master &amp; Build
              </h2>
              <p className="text-foreground/70 mt-2 text-sm sm:text-base">
                No generic fluff. Direct frameworks, evaluation templates, and blueprints you can use immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resource.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl glass-panel border-card-border/70 hover:border-accent-teal/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-black text-accent-teal/60 mb-3 block">
                      OUTCOME 0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug break-words">
                      {outcome.title}
                    </h3>
                    {outcome.description && (
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                        {outcome.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. TABLE OF CONTENTS / CURRICULUM BREAKDOWN */}
        {Array.isArray(resource.tableOfContents) && resource.tableOfContents.length > 0 && (
          <section id="table-of-contents" className="mb-16 sm:mb-24 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold flex items-center justify-center gap-1.5">
                <Layers size={14} /> Curriculum Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 tracking-tight">
                Table of Contents &amp; Modules
              </h2>
              <p className="text-foreground/70 mt-2 text-sm sm:text-base">
                Explore every chapter and lesson included inside this comprehensive release.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {resource.tableOfContents.map((chapter, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl glass-panel border-card-border/70 hover:border-accent-teal/40 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center font-mono font-bold text-xs">
                        {chapter.chapterNumber || `0${idx + 1}`}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  {Array.isArray(chapter.topics) && chapter.topics.length > 0 && (
                    <div className="pl-0 sm:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-card-border/30">
                      {chapter.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="text-xs text-foreground/75 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal/60 flex-shrink-0"></span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. INCLUDED BONUSES */}
        {Array.isArray(resource.bonuses) && resource.bonuses.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold flex items-center justify-center gap-1.5">
                <Gift size={14} /> Free Value Adds
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 tracking-tight">
                Exclusive Bonuses Included with Your Purchase
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resource.bonuses.map((bonus, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl glass-panel border-card-border/80 bg-gradient-to-br from-card/80 via-card/50 to-accent-teal/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2.5 py-0.5 rounded-full">
                        Bonus #{idx + 1}
                      </span>
                      {bonus.valueBadge && (
                        <span className="text-xs font-mono font-bold text-accent-teal bg-accent-teal/10 px-2.5 py-0.5 rounded-full border border-accent-teal/20">
                          {bonus.valueBadge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug break-words">
                      {bonus.title}
                    </h3>

                    {bonus.description && (
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                        {bonus.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-card-border/30 flex items-center gap-1.5 text-xs text-accent-teal font-mono">
                    <CheckCircle2 size={13} /> Included Automatically
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. AUTHOR'S NOTE / WHY I WROTE THIS */}
        {hasWhyIWroteThis && (
          <section className="mb-16 sm:mb-24">
            <div className="max-w-4xl mx-auto p-6 sm:p-10 md:p-12 rounded-3xl glass-panel border-card-border/80 bg-gradient-to-br from-card/90 via-card/60 to-background shadow-xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-accent-teal font-extrabold bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/20">
                  Author's Backstory
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 tracking-tight text-foreground">
                {resource.authorNoteHeading || "Why I Wrote This E-Book"}
              </h2>

              <div className="text-foreground/85 leading-relaxed text-sm sm:text-base md:text-lg space-y-4">
                {hasWhyIWroteThisArray ? (
                  <PortableText
                    value={resource.whyIWroteThis as PortableTextBlock[]}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="leading-relaxed mb-4 text-foreground/85 text-sm sm:text-base md:text-lg last:mb-0">
                            {children}
                          </p>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 mb-2">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-base sm:text-lg font-semibold text-foreground mt-4 mb-2">
                            {children}
                          </h4>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/85 text-sm sm:text-base">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/85 text-sm sm:text-base">
                            {children}
                          </ol>
                        ),
                      },
                    }}
                  />
                ) : (
                  <p className="whitespace-pre-line text-foreground/85">
                    {resource.whyIWroteThis as string}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-card-border/40 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-foreground block">
                    {siteSettings.footerName || "Chiagoziem Melvin Akobundu"}
                  </span>
                  <span className="text-xs text-foreground/60 font-mono">
                    Product Manager &amp; AI PM • Builder of ResumeGenie
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 8. TESTIMONIALS / READER REVIEWS */}
        {Array.isArray(resource.testimonials) && resource.testimonials.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">
                Early Praise
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 tracking-tight">
                What PMs &amp; Leaders Are Saying
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resource.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl glass-panel border-card-border/70 flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm text-foreground/85 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-4 border-t border-card-border/30">
                    {t.authorPhotoUrl && (
                      <img
                        src={t.authorPhotoUrl}
                        alt={t.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-card-border"
                      />
                    )}
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        {t.authorName}
                      </span>
                      <span className="text-[11px] text-foreground/60 font-mono">
                        {t.authorRole} {t.authorCompany ? `• ${t.authorCompany}` : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        {Array.isArray(resource.faqs) && resource.faqs.length > 0 && (
          <section className="mb-16 sm:mb-24 max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold flex items-center justify-center gap-1.5">
                <HelpCircle size={14} /> Clear Answers
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <ResourceFaqAccordion faqs={resource.faqs} />
          </section>
        )}

        {/* 10. FINAL CLOSING CONVERSION BANNER */}
        <section className="mb-8">
          <div className="rounded-3xl p-8 sm:p-12 md:p-16 glass-panel border-accent-teal/40 bg-gradient-to-r from-accent-teal/15 via-background to-accent-cyan/15 text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-accent-teal text-background mb-4 inline-block shadow-sm">
                Ready to Level Up?
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
                {resource.closingCta?.headline || `Get Instant Access to ${resource.title}`}
              </h2>

              <p className="text-foreground/80 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
                {resource.closingCta?.subtext ||
                  "Download the complete guide, templates, and AI prompts now. Includes lifetime updates."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isExternalCta ? (
                  <a
                    href={resource.closingCta?.ctaUrl || primaryCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-teal text-background font-black text-sm sm:text-base shadow-xl shadow-accent-teal/30 hover:bg-accent-cyan hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[50px]"
                  >
                    <span>{resource.closingCta?.ctaText || resource.ctaText || "Get Instant Access"}</span>
                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <Link
                    href={resource.closingCta?.ctaUrl || primaryCtaUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-teal text-background font-black text-sm sm:text-base shadow-xl shadow-accent-teal/30 hover:bg-accent-cyan hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[50px]"
                  >
                    <span>{resource.closingCta?.ctaText || resource.ctaText || "Get Instant Access"}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                )}
              </div>

              {resource.priceText && (
                <span className="text-xs font-mono text-foreground/60 mt-4 block">
                  One-time payment of {resource.priceText} • Instant Digital Delivery
                </span>
              )}
            </div>
          </div>
        </section>

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
        resourcesPageEnabled={siteSettings.enableResourcesPage}
      />
    </div>
  );
}
