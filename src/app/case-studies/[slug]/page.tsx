import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicIcon from "@/components/DynamicIcon";
import { getCaseStudyBySlug, getSiteSettings } from "@/sanity/queries";
import { mockCaseStudies } from "@/data/mockData";
import { constructMetadata, generateArticleJsonLd, getBaseUrl } from "@/lib/seo";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [data, siteSettings] = await Promise.all([
    getCaseStudyBySlug(slug),
    getSiteSettings(),
  ]);

  const study = data || mockCaseStudies.find((s) => s.slug === slug);
  if (!study) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      urlPath: `/case-studies/${slug}`,
      siteSettings,
      noIndex: true,
    });
  }

  const isEnabled = siteSettings.caseStudiesPageEnabled !== false;
  if (!isEnabled) {
    return constructMetadata({
      title: "Case Study Coming Soon | Chiagoziem Melvin Akobundu",
      description: "Product Case Studies are currently undergoing updates and will be available shortly.",
      urlPath: `/case-studies/${slug}`,
      siteSettings,
    });
  }

  const title =
    study.metaTitle ||
    `${study.title} — Case Study | Chiagoziem Melvin Akobundu`;
  const description = study.metaDescription || study.summary;
  const image = study.coverImage || siteSettings.ogImageUrl;

  return constructMetadata({
    title,
    description,
    image,
    imageAlt: study.coverImageAlt || `${study.title} — Case Study Cover`,
    urlPath: `/case-studies/${slug}`,
    type: "article",
    publishedTime: study.date,
    siteSettings,
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const siteSettings = (await getSiteSettings()) || {};
  const data = await getCaseStudyBySlug(slug);
  const study = data || mockCaseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const isEnabled = siteSettings.caseStudiesPageEnabled !== false;

  if (!isEnabled) {
    return (
      <div className="min-h-screen flex flex-col page-bg-casestudies text-foreground transition-colors duration-300">
        <Navbar
          navTitleText={siteSettings.navTitleText}
          navLogoUrl={siteSettings.navLogoUrl}
          navLinks={siteSettings.navLinks}
          navCtaLabel={siteSettings.navCtaLabel}
          navCtaUrl={siteSettings.navCtaUrl}
          resumeUrl={siteSettings.resumeUrl}
          caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
        />
        <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto space-y-6 glass-panel p-8 sm:p-12 rounded-3xl border-card-border shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center mx-auto text-2xl font-bold">
              <span>✦</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">Case Study Coming Soon</h1>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              The Product Case Studies section is currently undergoing updates. Detailed technical breakdowns and ROI evaluations will be published shortly.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/teardowns"
                className="px-6 py-3 rounded-xl bg-accent-teal text-background font-bold hover:bg-accent-cyan transition-all text-sm min-h-[44px] flex items-center"
              >
                Explore Product Teardowns →
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl border border-card-border glass-panel hover:bg-card-border/20 text-foreground font-semibold transition-all text-sm min-h-[44px] flex items-center"
              >
                Contact Chiagoziem
              </Link>
            </div>
          </div>
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

  const bodyParagraphs = Array.isArray(study.body) && study.body.length > 0
    ? study.body
    : (study.summary ? [study.summary] : []);

  const tools = Array.isArray(study.tools) ? study.tools : [];
  const results = Array.isArray(study.results) ? study.results : [];
  const cardStats = Array.isArray(study.cardStats) ? study.cardStats : [];
  const productDecisions = Array.isArray(study.productDecisions) ? study.productDecisions : [];
  const beforeAfter = study.beforeAfter;

  const baseUrl = getBaseUrl(siteSettings);
  const articleJsonLd = generateArticleJsonLd({
    title: study.metaTitle || `${study.title} — Case Study`,
    description: study.metaDescription || study.summary,
    url: `${baseUrl}/case-studies/${slug}`,
    imageUrl: study.coverImage,
    datePublished: study.date,
    siteSettings,
  });

  return (
    <div className="min-h-screen flex flex-col page-bg-casestudies text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Structured Data (JSON-LD Article Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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

      <main className="flex-grow pt-8 sm:pt-12 pb-16 sm:pb-24">
        
        {/* Back Link */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-6 sm:mb-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/60 hover:text-accent-teal transition-colors font-medium min-h-[36px]"
          >
            <ArrowLeft size={16} /> Back to Case Studies
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-xs uppercase font-mono tracking-widest text-accent-teal px-3 py-1 rounded-full border border-accent-teal/30 bg-accent-teal/10 font-bold">
              {study.category || "AI PM"}
            </span>
            {study.badgeLabel && (
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                {study.badgeLabel}
              </span>
            )}
            {study.isPlaceholder && (
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Placeholder Content
              </span>
            )}
            <span className="text-xs text-foreground/50 font-mono ml-auto">
              {study.date || "2024"}
            </span>
          </div>

          <h1
            className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 tracking-tight leading-tight break-words"
          >
            {study.title}
          </h1>
          {study.summary && (
            <p className="text-foreground/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl">
              {study.summary}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {study.coverImage && (
          <div className="w-full h-[240px] sm:h-[360px] md:h-[480px] relative mb-12 sm:mb-16 overflow-hidden bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center border-y border-card-border">
            <img
              src={study.coverImage}
              alt={study.coverImageAlt || `${study.title} — Case Study Cover`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Article Layout */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">

            {/* Summary Card */}
            <div className="rounded-2xl p-6 sm:p-8 border border-card-border glass-panel shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                <DynamicIcon name={(study as any).summaryIcon || "FiFileText"} size={20} className="text-accent-teal" />
                Summary
              </h3>
              <p className="text-foreground/80 text-xs sm:text-sm mb-6 leading-relaxed">
                {study.summary}
              </p>
              <div className="flex flex-col gap-3 text-xs sm:text-sm font-mono">
                <div className="flex justify-between border-b border-card-border/60 pb-2">
                  <span className="text-foreground/50">Category</span>
                  <span className="text-foreground font-semibold">{study.category || "AI PM"}</span>
                </div>
                <div className="flex justify-between border-b border-card-border/60 pb-2">
                  <span className="text-foreground/50">Date</span>
                  <span className="text-foreground font-semibold">{study.date || "2024"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Read Time</span>
                  <span className="text-foreground font-semibold">{study.readTime || "8 min read"}</span>
                </div>
              </div>
            </div>

            {/* Tools Card */}
            {tools.length > 0 && (
              <div className="rounded-2xl p-6 sm:p-8 border border-card-border glass-panel shadow-sm">
                <h3 className="text-xs font-mono text-accent-teal mb-4 sm:mb-6 tracking-widest uppercase flex items-center gap-2 font-bold">
                  <DynamicIcon name={(study as any).toolsIcon || "FiCpu"} size={16} className="text-accent-teal" />
                  Stack &amp; Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-card border border-card-border text-foreground/80 text-xs font-mono rounded-lg"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Metrics / Stat Pairs */}
            {cardStats.length > 0 && (
              <div className="rounded-2xl p-6 sm:p-8 border border-accent-teal/30 bg-accent-teal/5 glass-panel">
                <h3 className="text-xs font-mono text-accent-teal mb-4 tracking-widest uppercase font-bold">
                  Target Metrics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {cardStats.map((stat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-card border border-card-border text-center">
                      <span className="block text-xl sm:text-2xl font-black text-accent-teal">{stat.value}</span>
                      <span className="text-[10px] font-mono text-foreground/60 uppercase">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>

          {/* Main Article */}
          <article className="lg:col-span-8 flex flex-col gap-8 sm:gap-12">

            {/* Body */}
            {bodyParagraphs.length > 0 && (
              <section className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name={(study as any).challengeIcon || "FiTarget"} size={22} className="text-accent-teal" />
                  The Challenge
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-sm sm:text-base md:text-lg">
                  {bodyParagraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Product Decisions */}
            {productDecisions.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name={(study as any).decisionsIcon || "FiLayers"} size={22} className="text-accent-cyan" />
                  Product Decisions
                </h2>
                <div className="space-y-5">
                  {productDecisions.map((pd: any, idx: number) => {
                    const title = pd.decisionTitle || pd.decision || `Decision ${idx + 1}`;
                    const status = pd.status || pd.outcome;
                    const rationale = pd.rationale || pd.context;
                    const tradeoff = pd.tradeoff || pd.tradeoffs;

                    return (
                      <div
                        key={idx}
                        className="rounded-2xl p-6 sm:p-8 border border-card-border glass-panel shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground">
                            {title}
                          </h3>
                          {status && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-accent-teal/10 text-accent-teal border border-accent-teal/20 font-bold">
                              {status}
                            </span>
                          )}
                        </div>

                        {rationale && (
                          <div className="mb-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                            <strong className="text-foreground block mb-1 font-mono uppercase text-xs text-accent-teal">Rationale:</strong>
                            {rationale}
                          </div>
                        )}

                        {tradeoff && (
                          <div className="p-3.5 rounded-xl bg-card border border-card-border text-xs text-foreground/75 italic">
                            <strong className="not-italic text-accent-cyan font-mono block mb-0.5">Trade-off Considered:</strong>
                            {tradeoff}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Before / After Comparison */}
            {beforeAfter && (
              <section className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name={(study as any).beforeAfterIcon || "FiShuffle"} size={22} className="text-accent-teal" />
                  Before &amp; After Transformation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {((beforeAfter as any).before || (beforeAfter as any)[0]?.beforeDescription) && (
                    <div className="p-5 sm:p-6 rounded-xl border border-red-500/30 bg-red-500/5">
                      <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 font-bold block mb-2">Before</span>
                      <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                        {(beforeAfter as any).before || (beforeAfter as any)[0]?.beforeDescription}
                      </p>
                    </div>
                  )}
                  {((beforeAfter as any).after || (beforeAfter as any)[0]?.afterDescription) && (
                    <div className="p-5 sm:p-6 rounded-xl border border-accent-teal/40 bg-accent-teal/5">
                      <span className="text-xs font-mono uppercase text-accent-teal font-bold block mb-2">After</span>
                      <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                        {(beforeAfter as any).after || (beforeAfter as any)[0]?.afterDescription}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Measurable Results */}
            {results.length > 0 && (
              <section className="p-6 sm:p-8 rounded-2xl border border-accent-teal/30 bg-accent-teal/5 glass-panel">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name={(study as any).resultsIcon || "FiAward"} size={22} className="text-accent-teal" />
                  Measurable Results &amp; Business Outcomes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {results.map((res, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-card border border-card-border text-xs sm:text-sm font-medium text-foreground flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent-teal flex-shrink-0"></span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Next Steps / Contact CTA */}
            <div className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-foreground">Interested in diving deeper?</h3>
                <p className="text-xs sm:text-sm text-foreground/60 mt-1">Let's discuss how this strategy applies to your domain.</p>
              </div>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-teal text-background font-bold text-xs sm:text-sm hover:bg-accent-cyan transition-all min-h-[44px]"
              >
                Discuss This Case Study <ArrowUpRight size={14} />
              </Link>
            </div>

          </article>
        </div>

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