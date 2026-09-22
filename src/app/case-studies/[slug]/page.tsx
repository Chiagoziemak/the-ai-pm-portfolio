import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicIcon from "@/components/DynamicIcon";
import StatGrid from "@/components/StatGrid";
import HeroMedia from "@/components/HeroMedia";
import ProductSurfaces from "@/components/ProductSurfaces";
import { getCaseStudyBySlug, getSiteSettings } from "@/sanity/queries";
import { constructMetadata, generateArticleJsonLd, getBaseUrl } from "@/lib/seo";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

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

  if (siteSettings.caseStudiesPageEnabled === false) {
    notFound();
  }

  const study = data;
  if (!study) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      urlPath: `/case-studies/${slug}`,
      siteSettings,
      noIndex: true,
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

  if (siteSettings.caseStudiesPageEnabled === false) {
    notFound();
  }

  const data = await getCaseStudyBySlug(slug);
  const study = data;

  if (!study) {
    notFound();
  }

  const bodyParagraphs = Array.isArray(study.body) && study.body.length > 0
    ? study.body.filter((p: string) => Boolean(p && typeof p === "string" && p.trim() !== ""))
    : (study.summary ? [study.summary] : []);

  const tools = Array.isArray(study.tools) ? study.tools.filter(Boolean) : [];
  const results = Array.isArray(study.results) ? study.results.filter(Boolean) : [];
  const cardStats = Array.isArray(study.cardStats) ? study.cardStats.filter((cs: any) => Boolean(cs && cs.value)) : [];
  const productDecisions = Array.isArray(study.productDecisions)
    ? study.productDecisions.filter((pd: any) => Boolean(pd && (pd.decision || pd.decisionTitle || pd.rationale || pd.context || pd.tradeoffs || pd.tradeoff || pd.status || pd.outcome)))
    : [];

  const rawBeforeAfter = study.beforeAfter as any;
  const beforeAfterList = Array.isArray(rawBeforeAfter)
    ? rawBeforeAfter.filter((item: any) =>
        Boolean(
          item &&
            (item.beforeDescription ||
              item.afterDescription ||
              item.before ||
              item.after ||
              item.beforeImageUrl ||
              item.afterImageUrl ||
              item.impact)
        )
      )
    : rawBeforeAfter &&
      typeof rawBeforeAfter === "object" &&
      (rawBeforeAfter.beforeDescription ||
        rawBeforeAfter.afterDescription ||
        rawBeforeAfter.before ||
        rawBeforeAfter.after)
    ? [rawBeforeAfter]
    : [];

  const lessons = Array.isArray(study.lessons) && study.lessons.length > 0
    ? study.lessons.filter(Boolean)
    : (Array.isArray(study.lessonsLearned) ? study.lessonsLearned.filter(Boolean) : []);

  const rawSurfaces = (study as any).productSurfaces;
  const productSurfaces = Array.isArray(rawSurfaces)
    ? rawSurfaces.filter((s: any) => Boolean(s && (s.name || s.label) && s.enabled !== false))
    : [];

  const relatedCaseStudies = Array.isArray(study.relatedCaseStudies)
    ? study.relatedCaseStudies.filter((rc: any) => Boolean(rc && rc.title && rc.slug))
    : [];

  const normalizeUrl = (u?: string) =>
    u ? u.trim().toLowerCase().replace(/\/+$/, "") : "";

  const liveUrl = study.liveUrl;
  const liveUrlLabel = study.liveUrlLabel || "View Project";

  // Check if liveUrl points to the exact same destination as any public product surface
  const hasMatchingPublicSurfaceUrl = Boolean(
    liveUrl &&
      productSurfaces.some(
        (s: any) =>
          s.accessType !== "internal" &&
          s.url &&
          normalizeUrl(s.url) === normalizeUrl(liveUrl)
      )
  );

  // In bottom CTA: suppress duplicate button if productSurfaces already renders that destination
  const showBottomLiveCta = Boolean(liveUrl && !hasMatchingPublicSurfaceUrl);

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
        aboutPageEnabled={siteSettings.aboutPageEnabled}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
        productsPageEnabled={siteSettings.productsPageEnabled}
        teardownsPageEnabled={siteSettings.teardownsPageEnabled}
        contactPageEnabled={siteSettings.contactPageEnabled}
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
            <p className="text-foreground/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mb-6">
              {study.summary}
            </p>
          )}

          {/* Optional Live URL Button in Header */}
          {liveUrl && (
            <div className="pt-2">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-teal text-background font-bold text-sm sm:text-base hover:bg-accent-cyan transition-all shadow-md shadow-accent-teal/20 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
              >
                <span>{liveUrlLabel}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </header>

        {/* Hero Visual Media (Single Image, Side by Side, or Slider with fallback to Cover Image) */}
        <HeroMedia
          heroImages={(study as any).heroImages}
          coverImage={study.coverImage}
          coverImageAlt={study.coverImageAlt || `${study.title} — Case Study Cover`}
          heroDisplayMode={(study as any).heroDisplayMode || "single"}
          heroSliderAutoplay={(study as any).heroSliderAutoplay}
          heroSliderInterval={(study as any).heroSliderInterval}
          heroSliderShowPagination={(study as any).heroSliderShowPagination}
          heroSliderShowArrows={(study as any).heroSliderShowArrows}
          title={study.title}
          variant="caseStudy"
        />

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

              {/* Optional Live Link in Sidebar */}
              {liveUrl && (
                <div className="mt-6 pt-4 border-t border-card-border/60">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-teal text-background font-bold text-xs sm:text-sm hover:bg-accent-cyan transition-all shadow-sm min-h-[44px]"
                  >
                    <span>{liveUrlLabel}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
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
                <StatGrid stats={cardStats} variant="card" className="mb-0" />
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
            {beforeAfterList.length > 0 && (
              <section className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name={(study as any).beforeAfterIcon || "FiShuffle"} size={22} className="text-accent-teal" />
                  Before &amp; After Transformation
                </h2>
                <div className="space-y-6">
                  {beforeAfterList.map((item: any, idx: number) => {
                    const beforeText = item.beforeDescription || item.before;
                    const afterText = item.afterDescription || item.after;
                    const beforeLabel = item.beforeLabel || "Before";
                    const afterLabel = item.afterLabel || "After";
                    const beforeImg = item.beforeImageUrl;
                    const afterImg = item.afterImageUrl;
                    const impact = item.impact;

                    return (
                      <div key={idx} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                          {(beforeText || beforeImg) && (
                            <div className="p-5 sm:p-6 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col justify-between">
                              <div>
                                <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 font-bold block mb-2">
                                  {beforeLabel}
                                </span>
                                {beforeText && (
                                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                                    {beforeText}
                                  </p>
                                )}
                              </div>
                              {beforeImg && (
                                <div className="mt-4 rounded-lg overflow-hidden border border-red-500/20">
                                  <img src={beforeImg} alt={`${beforeLabel} state`} className="w-full h-auto object-cover" />
                                </div>
                              )}
                            </div>
                          )}
                          {(afterText || afterImg) && (
                            <div className="p-5 sm:p-6 rounded-xl border border-accent-teal/40 bg-accent-teal/5 flex flex-col justify-between">
                              <div>
                                <span className="text-xs font-mono uppercase text-accent-teal font-bold block mb-2">
                                  {afterLabel}
                                </span>
                                {afterText && (
                                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                                    {afterText}
                                  </p>
                                )}
                              </div>
                              {afterImg && (
                                <div className="mt-4 rounded-lg overflow-hidden border border-accent-teal/20">
                                  <img src={afterImg} alt={`${afterLabel} state`} className="w-full h-auto object-cover" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {impact && (
                          <div className="p-4 rounded-xl bg-card border border-accent-teal/30 text-xs sm:text-sm text-foreground/90 flex items-center gap-2">
                            <span className="font-mono text-xs uppercase font-bold text-accent-teal">Impact:</span>
                            <span>{impact}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Product Surfaces & Multi-Platform Links */}
            <ProductSurfaces
              surfaces={(study as any).productSurfaces}
              surfacesIcon={(study as any).surfacesIcon || "FiGrid"}
              title="Product Surfaces"
            />

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

            {/* Key Takeaways & Lessons Learned */}
            {lessons.length > 0 && (
              <section className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name={(study as any).lessonsIcon || "FiBookOpen"} size={22} className="text-accent-cyan" />
                  Key Takeaways &amp; Lessons Learned
                </h2>
                <div className="space-y-3">
                  {lessons.map((lesson: string, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-card border border-card-border text-xs sm:text-sm font-medium text-foreground flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent-cyan flex-shrink-0 mt-1.5"></span>
                      <span className="leading-relaxed">{lesson}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Case Studies */}
            {relatedCaseStudies.length > 0 && (
              <section className="space-y-6 pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
                  <DynamicIcon name="FiGrid" size={22} className="text-accent-teal" />
                  Related Case Studies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {relatedCaseStudies.map((rel: any, idx: number) => (
                    <Link
                      key={idx}
                      href={`/case-studies/${rel.slug}`}
                      className="group block p-6 rounded-2xl border border-card-border glass-panel hover:border-accent-teal/50 hover:shadow-lg transition-all"
                    >
                      {rel.category && (
                        <span className="text-[10px] uppercase font-mono tracking-widest text-accent-teal font-bold block mb-2">
                          {rel.category}
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent-teal transition-colors flex items-center justify-between gap-2">
                        <span>{rel.title}</span>
                        <ArrowUpRight size={16} className="text-foreground/50 group-hover:text-accent-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Next Steps / Contact CTA */}
            {(showBottomLiveCta || siteSettings.contactPageEnabled !== false || siteSettings.socialLinks?.linkedin) && (
              <section className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel mt-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="space-y-1 text-center lg:text-left">
                    <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                      Interested in diving deeper?
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                      Let&apos;s discuss how this strategy applies to your domain.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-end gap-3 sm:gap-3.5 flex-shrink-0 w-full lg:w-auto">
                    {showBottomLiveCta && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-accent-teal text-background font-bold text-xs sm:text-sm hover:bg-accent-cyan active:scale-[0.98] transition-all shadow-sm min-h-[44px] text-center"
                      >
                        <span>{liveUrlLabel}</span>
                        <ArrowUpRight size={15} className="flex-shrink-0" />
                      </a>
                    )}
                    {siteSettings.contactPageEnabled !== false ? (
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-card-border glass-panel hover:bg-card-border/20 text-foreground font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all min-h-[44px] text-center"
                      >
                        <span>Discuss This Case Study</span>
                        <ArrowUpRight size={15} className="flex-shrink-0" />
                      </Link>
                    ) : siteSettings.socialLinks?.linkedin ? (
                      <a
                        href={siteSettings.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-card-border glass-panel hover:bg-card-border/20 text-foreground font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all min-h-[44px] text-center"
                      >
                        <span>Connect on LinkedIn</span>
                        <ArrowUpRight size={15} className="flex-shrink-0" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </section>
            )}

          </article>
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