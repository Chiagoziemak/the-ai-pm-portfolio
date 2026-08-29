import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicIcon from "@/components/DynamicIcon";
import { getTeardowns, getTeardownBySlug, getSiteSettings } from "@/sanity/queries";
import { mockTeardowns } from "@/data/mockData";
import { ArrowLeft, Clock, Calendar, Tag, ArrowUpRight, Layers } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
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

  return (
    <div className="min-h-screen flex flex-col page-bg-teardowns text-foreground transition-colors duration-300 overflow-x-hidden">
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
                alt={teardown.title}
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
                  <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-foreground/90">
                    <span className="w-2 h-2 rounded-full bg-accent-teal mt-2 flex-shrink-0 shadow-sm"></span>
                    <span className="leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Insight Cards */}
          {insightCards.length > 0 && (
            <section className="my-10 sm:my-12">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-foreground tracking-tight flex items-center gap-2">
                <DynamicIcon name={(teardown as any).keyFindingsIcon || "FiCompass"} size={22} className="text-accent-cyan" />
                Strategic Insights &amp; Market Dynamics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

          {/* Key Pain Points Cards */}
          {painPoints.length > 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-amber-600/40 dark:border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/10">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <DynamicIcon name={(teardown as any).painPointsIcon || "FiAlertTriangle"} size={22} className="text-amber-700 dark:text-amber-400 flex-shrink-0" />
                Key Pain Points
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {painPoints.map((point, idx) => {
                  const severityText = point.severity?.toLowerCase() || "";
                  const badgeIcon = severityText.includes("critical")
                    ? "FiAlertCircle"
                    : severityText.includes("high")
                    ? "FiAlertTriangle"
                    : severityText.includes("med")
                    ? "FiInfo"
                    : "FiCheckCircle";
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-amber-600/30 dark:border-amber-500/30 bg-background/90 dark:bg-background/60 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm sm:text-base font-bold text-foreground">{point.title}</h3>
                          {point.severity && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-600/30 dark:border-amber-500/30">
                              <DynamicIcon name={badgeIcon} size={11} />
                              {point.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/90 dark:text-foreground/80 leading-relaxed mb-3">{point.description}</p>
                      </div>
                      {point.evidence && (
                        <div className="pt-2.5 border-t border-amber-600/20 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-medium italic">
                          Evidence: {point.evidence}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Legacy Key Pain Points string list */}
          {keyPainPoints.length > 0 && painPoints.length === 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-amber-600/40 dark:border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/10">
              <h2 className="text-xl font-bold mb-4 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <DynamicIcon name={(teardown as any).painPointsIcon || "FiAlertTriangle"} size={20} className="text-amber-700 dark:text-amber-400" />
                Key User Pain Points
              </h2>
              <ul className="space-y-3">
                {keyPainPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500 mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* RICE Prioritization Table (Mobile Responsive with clean horizontal scroll) */}
          {riceScores.length > 0 && (
            <section className="my-10 sm:my-12 p-5 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <DynamicIcon name={(teardown as any).riceIcon || "FiBarChart2"} size={20} className="text-accent-teal flex-shrink-0" />
                  RICE Prioritization Model
                </h2>
                <span className="text-[11px] font-mono text-foreground/50 sm:hidden">Scroll table →</span>
              </div>
              <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                <table className="w-full min-w-[540px] text-left text-xs sm:text-sm text-foreground/80 border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-[11px] sm:text-xs uppercase tracking-wider text-accent-cyan font-mono">
                      <th className="py-3 px-3 sm:px-4">Feature / Opportunity</th>
                      {riceScores.some(r => r.reach !== undefined) && <th className="py-3 px-2 sm:px-3">Reach</th>}
                      {riceScores.some(r => r.impact !== undefined) && <th className="py-3 px-2 sm:px-3">Impact</th>}
                      {riceScores.some(r => r.confidence !== undefined) && <th className="py-3 px-2 sm:px-3">Conf.</th>}
                      {riceScores.some(r => r.effort !== undefined) && <th className="py-3 px-2 sm:px-3">Effort</th>}
                      <th className="py-3 px-3 sm:px-4 text-right">RICE Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riceScores.map((scoreItem, idx) => (
                      <tr key={idx} className="border-b border-card-border/40 hover:bg-card-border/10 transition-colors">
                        <td className="py-3 px-3 sm:px-4 font-semibold text-foreground">{scoreItem.feature}</td>
                        {scoreItem.reach !== undefined && <td className="py-3 px-2 sm:px-3">{scoreItem.reach}</td>}
                        {scoreItem.impact !== undefined && <td className="py-3 px-2 sm:px-3">{scoreItem.impact}</td>}
                        {scoreItem.confidence !== undefined && <td className="py-3 px-2 sm:px-3">{scoreItem.confidence}</td>}
                        {scoreItem.effort !== undefined && <td className="py-3 px-2 sm:px-3">{scoreItem.effort}</td>}
                        <td className="py-3 px-3 sm:px-4 text-right font-mono font-bold text-accent-teal text-sm sm:text-base">
                          {typeof scoreItem.rice === "number" ? scoreItem.rice.toFixed(1) : scoreItem.rice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Strategic Recommendations */}
          {recommendations.length > 0 && (
            <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <div className="flex items-center gap-3 mb-6">
                <DynamicIcon name={(teardown as any).recommendationsIcon || "FiCheckSquare"} size={22} className="text-accent-teal flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Strategic Recommendations
                </h2>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, idx) => {
                  const title = typeof rec === "string" ? `Recommendation ${idx + 1}` : (rec.title || `Recommendation ${idx + 1}`);
                  const desc = typeof rec === "string" ? rec : (rec.description || (rec as any).text || "");
                  const priority = typeof rec === "string" ? undefined : rec.priority;
                  return (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-xl border border-card-border/60 bg-card/40 shadow-sm"
                    >
                      <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                        <h4 className="font-bold text-base sm:text-lg text-foreground">
                          {title}
                        </h4>
                        {priority && (
                          <span className="text-accent-teal text-xs font-mono tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-md bg-accent-teal/10 border border-accent-teal/20">
                            {priority}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Dedicated Project Links Section */}
          {projectLinks.length > 0 && (
            <section className="my-12 sm:my-14 p-6 sm:p-8 rounded-2xl glass-panel border border-accent-cyan/30 bg-accent-cyan/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-2">
                  <DynamicIcon name={(teardown as any).linksIcon || "FiExternalLink"} size={20} className="text-accent-cyan" />
                  Project Links &amp; Documentation
                </h2>
                <span className="text-xs text-foreground/50 font-mono">Explore the Artifacts</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {projectLinks.map((linkItem, idx) => (
                  <a
                    key={idx}
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3.5 rounded-xl border border-card-border/60 glass-panel text-accent-cyan font-semibold text-xs sm:text-sm hover:border-accent-teal hover:text-accent-teal hover:-translate-y-0.5 transition-all duration-300 shadow-sm group min-h-[44px]"
                  >
                    <span className="font-mono text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
                    <span className="break-all">{linkItem.label}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Continue Reading (Other Teardowns) */}
        {relatedTeardowns.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-card-border">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10 text-center tracking-tight flex items-center justify-center gap-2">
              <Layers size={24} className="text-accent-teal" />
              Continue Reading
            </h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {relatedTeardowns.map((item) => (
                <Link
                  key={item.slug}
                  href={`/teardowns/${item.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-card-border glass-panel hover:border-accent-teal/40 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.334rem)] max-w-[380px]"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-accent-teal text-background">
                        {item.category}
                      </span>
                    </div>
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center text-accent-teal/20 text-6xl">
                        ✦
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="text-xs text-foreground/50 font-semibold mb-2 block">
                      {item.date} • {item.readTime}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent-teal transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/75 mt-2 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
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

      {/* Progress bar script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById('progress-bar');
            if (bar) bar.style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  );
}