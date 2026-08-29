import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicIcon from "@/components/DynamicIcon";
import { getTeardowns, getTeardownBySlug, getSiteSettings } from "@/sanity/queries";
import { mockTeardowns } from "@/data/mockData";
import { constructMetadata, generateArticleJsonLd, getBaseUrl } from "@/lib/seo";
import { ArrowLeft, Clock, Calendar, Tag, ArrowUpRight, Layers } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [data, siteSettings] = await Promise.all([
    getTeardownBySlug(slug),
    getSiteSettings(),
  ]);

  const teardown = data || mockTeardowns.find((t) => t.slug === slug);
  if (!teardown) {
    return constructMetadata({
      title: "Teardown Not Found",
      description: "The requested product teardown could not be found.",
      urlPath: `/teardowns/${slug}`,
      siteSettings,
      noIndex: true,
    });
  }

  const title =
    teardown.metaTitle ||
    `${teardown.title} — Product Teardown | Chiagoziem Melvin Akobundu`;
  const description = teardown.metaDescription || teardown.summary;
  const image = teardown.coverImage || siteSettings.ogImageUrl;

  return constructMetadata({
    title,
    description,
    image,
    imageAlt: teardown.coverImageAlt || `${teardown.title} — Product Teardown Cover`,
    urlPath: `/teardowns/${slug}`,
    type: "article",
    publishedTime: teardown.date,
    siteSettings,
  });
}

export default async function TeardownDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const siteSettings = (await getSiteSettings()) || {};
  const data = await getTeardownBySlug(slug);
  const teardown = data || mockTeardowns.find((t) => t.slug === slug);

  if (!teardown) {
    notFound();
  }

  const bodyParagraphs = Array.isArray(teardown.body) && teardown.body.length > 0
    ? teardown.body
    : (teardown.summary ? [teardown.summary] : []);

  const keyFindings = Array.isArray(teardown.keyFindings) ? teardown.keyFindings : [];
  const recommendations = Array.isArray(teardown.recommendations) ? teardown.recommendations : [];
  const projectLinks = Array.isArray(teardown.projectLinks) ? teardown.projectLinks : [];
  const riceScores = Array.isArray(teardown.riceScores) ? teardown.riceScores : [];
  const keyPainPoints = Array.isArray(teardown.keyPainPoints) ? teardown.keyPainPoints : [];
  const insightCards = Array.isArray(teardown.insightCards) ? teardown.insightCards : [];
  const painPoints = Array.isArray(teardown.painPoints) ? teardown.painPoints : [];

  const allTeardowns = await getTeardowns();
  const list = allTeardowns.length > 0 ? allTeardowns : mockTeardowns;
  const relatedTeardowns = list.filter((t) => t.slug !== slug).slice(0, 3);

  const baseUrl = getBaseUrl(siteSettings);
  const articleJsonLd = generateArticleJsonLd({
    title: teardown.metaTitle || `${teardown.title} — Product Teardown`,
    description: teardown.metaDescription || teardown.summary,
    url: `${baseUrl}/teardowns/${slug}`,
    imageUrl: teardown.coverImage,
    datePublished: teardown.date,
    siteSettings,
  });

  return (
    <div className="min-h-screen flex flex-col page-bg-teardowns text-foreground transition-colors duration-300 overflow-x-hidden">
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

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-accent-teal z-[60] w-0 transition-all" id="progress-bar"></div>

      <main className="flex-grow pt-8 sm:pt-12 pb-16 sm:pb-20">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-12">
          <div className="inline-block glass-panel text-accent-teal px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-mono mb-4 sm:mb-6 tracking-widest uppercase border border-accent-teal/30">
            {teardown.category || "Product Strategy"}
          </div>
          <h1 className="font-extrabold text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-foreground tracking-tight leading-tight break-words">
            {teardown.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-foreground/60 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent-teal" />
              {teardown.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent-cyan" />
              {teardown.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={14} className="text-accent-teal" />
              {teardown.category}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {teardown.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
            <div className="relative h-[220px] sm:h-[360px] md:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-card-border shadow-2xl bg-slate-900">
              <img
                src={teardown.coverImage}
                alt={teardown.coverImageAlt || `${teardown.title} — Product Teardown Cover`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
          <Link
            href="/teardowns"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/60 hover:text-accent-teal transition-colors font-medium min-h-[36px]"
          >
            <ArrowLeft size={16} /> Back to all Teardowns
          </Link>
        </div>

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
          
          {/* Executive Summary */}
          {teardown.summary && (
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-accent-teal/30 bg-accent-teal/5">
              <h2 className="text-xs uppercase tracking-widest font-mono text-accent-teal mb-3 font-bold">
                Executive Summary
              </h2>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed italic font-medium">
                "{teardown.summary}"
              </p>
            </div>
          )}

          {/* Body Paragraphs */}
          <div className="space-y-6 text-foreground/80 leading-relaxed text-base sm:text-lg">
            {bodyParagraphs.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* Key Findings */}
          {keyFindings.length > 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <div className="flex items-center gap-3 mb-6">
                <DynamicIcon name={(teardown as any).keyFindingsIcon || "FiCompass"} size={22} className="text-accent-teal flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Key Findings &amp; Observations
                </h2>
              </div>
              <ul className="space-y-4">
                {keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-foreground/85 leading-relaxed text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-accent-teal/10 border border-accent-teal/30 text-accent-teal text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Research Insight Cards */}
          {insightCards.length > 0 && (
            <section className="my-10 sm:my-12 space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
                <DynamicIcon name={(teardown as any).keyFindingsIcon || "FiLayers"} size={22} className="text-accent-teal flex-shrink-0" />
                Research Insights &amp; Market Dynamics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {insightCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl border border-card-border/70 glass-panel bg-card/40 flex flex-col justify-between hover:border-accent-teal/40 transition-all duration-300 shadow-sm"
                  >
                    <div>
                      {(card.number || (card as any).tag) && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-teal bg-accent-teal/10 border border-accent-teal/20 px-2.5 py-0.5 rounded-full inline-block mb-3 font-semibold">
                          {card.number || (card as any).tag}
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-4">
                        {card.description}
                      </p>
                    </div>
                    {(card.evidence || (card as any).metric) && (
                      <div className="pt-3 border-t border-card-border/40 text-xs font-mono font-bold text-accent-cyan">
                        Key Metric: {card.evidence || (card as any).metric}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pain Points Cards */}
          {(painPoints.length > 0 || keyPainPoints.length > 0) && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 mb-6">
                <DynamicIcon name={(teardown as any).painPointsIcon || "FiAlertTriangle"} size={22} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  User Friction &amp; Identified Pain Points
                </h2>
              </div>
              {painPoints.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {painPoints.map((point, idx) => (
                    <div key={idx} className="p-4 sm:p-5 rounded-xl border border-card-border bg-card/60">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-sm sm:text-base text-foreground">{point.title}</h4>
                        {point.severity && (
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            point.severity.toLowerCase() === "high" || point.severity.toLowerCase() === "critical"
                              ? "bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/30"
                              : point.severity.toLowerCase() === "medium"
                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30"
                              : "bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30"
                          }`}>
                            {point.severity}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-2">{point.description}</p>
                      {point.evidence && (
                        <p className="text-[11px] font-mono text-foreground/60 italic border-t border-card-border/40 pt-2 mt-2">
                          Evidence: {point.evidence}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {keyPainPoints.map((pain, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground/80 text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-2"></span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* RICE Prioritization Table */}
          {riceScores.length > 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <div className="flex items-center gap-3 mb-6">
                <DynamicIcon name={(teardown as any).riceIcon || "FiBarChart2"} size={22} className="text-accent-teal flex-shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    RICE Prioritization Matrix
                  </h2>
                  <p className="text-xs text-foreground/60 mt-0.5">Reach × Impact × Confidence ÷ Effort = Score</p>
                </div>
              </div>
              <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                <table className="w-full min-w-[540px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-card-border text-foreground/60 font-mono text-xs uppercase">
                      <th className="pb-3 pr-4">Feature / Opportunity</th>
                      <th className="pb-3 px-2 text-center">Reach</th>
                      <th className="pb-3 px-2 text-center">Impact</th>
                      <th className="pb-3 px-2 text-center">Confidence</th>
                      <th className="pb-3 px-2 text-center">Effort</th>
                      <th className="pb-3 pl-4 text-right">RICE Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/40 font-mono">
                    {riceScores.map((row, idx) => (
                      <tr key={idx} className="hover:bg-card-border/10 transition-colors">
                        <td className="py-3 pr-4 font-sans font-semibold text-foreground">{row.feature}</td>
                        <td className="py-3 px-2 text-center text-foreground/75">{row.reach ?? "-"}</td>
                        <td className="py-3 px-2 text-center text-foreground/75">{row.impact ?? "-"}</td>
                        <td className="py-3 px-2 text-center text-foreground/75">{typeof row.confidence === "number" ? `${row.confidence * 100}%` : (row.confidence ?? "-")}</td>
                        <td className="py-3 px-2 text-center text-foreground/75">{row.effort ?? "-"}</td>
                        <td className="py-3 pl-4 text-right font-black text-accent-teal text-sm">{row.rice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Strategic Recommendations */}
          {recommendations.length > 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-accent-teal/30 bg-accent-teal/5">
              <div className="flex items-center gap-3 mb-6">
                <DynamicIcon name={(teardown as any).recommendationsIcon || "FiCheckSquare"} size={22} className="text-accent-teal flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Strategic Recommendations
                </h2>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-xl border border-card-border bg-card/60">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-foreground">{rec.title}</h4>
                      {rec.priority && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-accent-teal/10 text-accent-teal border border-accent-teal/20 font-bold">
                          {rec.priority} Priority
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{rec.description}</p>
                    {rec.riceScore && (
                      <div className="mt-2.5 pt-2 border-t border-card-border/30 text-xs font-mono text-accent-cyan font-semibold">
                        RICE Score: {rec.riceScore}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Project Links & Artifacts */}
          {projectLinks.length > 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <div className="flex items-center gap-3 mb-6">
                <DynamicIcon name={(teardown as any).linksIcon || "FiExternalLink"} size={22} className="text-accent-cyan flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Artifacts &amp; Live References
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {projectLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-card-border hover:border-accent-teal text-xs sm:text-sm font-semibold text-foreground hover:text-accent-teal transition-all min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Continue Reading / Related Teardowns */}
        {relatedTeardowns.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 pt-12 border-t border-card-border">
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-6 sm:mb-8 text-center sm:text-left">
              Explore More Teardowns
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {relatedTeardowns.map((item) => (
                <Link
                  key={item.slug}
                  href={`/teardowns/${item.slug}`}
                  className="group p-5 sm:p-6 rounded-2xl glass-panel border-card-border hover:border-accent-teal/40 transition-all duration-300 flex flex-col justify-between w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[360px]"
                >
                  <div>
                    <span className="text-[10px] font-mono text-accent-teal uppercase tracking-wider block mb-2 font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-accent-teal transition-colors mb-2 leading-snug">
                      {item.title}
                    </h4>
                    {item.summary && (
                      <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan group-hover:underline">
                    Read Teardown <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
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