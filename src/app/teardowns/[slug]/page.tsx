import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeardownBySlug, getTeardowns, getSiteSettings } from "@/sanity/queries";
import { ArrowUpRight, ExternalLink, Calendar, Clock, Tag, UserCheck, Search, Key, Lightbulb, Layers } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SingleTeardownPage({ params }: PageProps) {
  const { slug } = await params;
  const teardown = await getTeardownBySlug(slug);
  if (!teardown) notFound();

  const siteSettings = await getSiteSettings();
  const allTeardowns = (await getTeardowns()) || [];
  const relatedTeardowns = Array.isArray(allTeardowns) ? allTeardowns.filter((t) => t.slug !== slug) : [];

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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-accent-teal z-[60] w-0" id="progress-bar"></div>

      <main className="flex-grow pt-12 pb-20">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12">
          <div className="inline-block glass-panel text-accent-teal px-4 py-1.5 rounded-full text-xs font-mono mb-6 tracking-widest uppercase border border-accent-teal/30">
            {teardown.category || "Product Strategy"}
          </div>
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 text-foreground tracking-tight leading-tight">
            {teardown.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/60 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-accent-cyan" /> {teardown.date || "2024"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-accent-teal" /> {teardown.readTime || "8 min"}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={15} className="text-accent-cyan" /> {teardown.category || "Teardown"}
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden glass-panel border border-card-border shadow-xl">
            {teardown.coverImage ? (
              <img src={teardown.coverImage} alt={teardown.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <span className="text-accent-teal/20 text-9xl">✦</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40"></div>
          </div>
        </section>

        {/* Article Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Summary Box */}
          {teardown.summary && (
            <div className="rounded-2xl p-6 sm:p-8 mb-10 border-l-4 border-l-accent-cyan glass-panel border-card-border shadow-sm">
              <h3 className="text-lg font-bold mb-3 text-accent-cyan uppercase tracking-wider text-xs">Summary</h3>
              <p className="text-base sm:text-lg text-foreground/90 italic leading-relaxed">
                {teardown.summary}
              </p>
            </div>
          )}

          {/* My Role Section */}
          {teardown.myRole && (
            <section className="mb-10 p-6 rounded-2xl glass-panel border border-card-border bg-card/40">
              <h2 className="text-sm uppercase tracking-widest font-extrabold text-accent-teal mb-2 flex items-center gap-2">
                <UserCheck size={18} />
                My Role &amp; Responsibilities
              </h2>
              <p className="text-base text-foreground/85 leading-relaxed font-medium">
                {teardown.myRole}
              </p>
            </section>
          )}

          {/* Research & Evidence Section */}
          {teardown.researchDetails && (
            <section className="mb-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Search size={20} className="text-accent-cyan" />
                Research &amp; Evidence
              </h2>
              {teardown.researchDetails.overview && (
                <p className="text-base text-foreground/80 leading-relaxed mb-6">
                  {teardown.researchDetails.overview}
                </p>
              )}

              {Array.isArray(teardown.researchDetails.metrics) && teardown.researchDetails.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {teardown.researchDetails.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-card-border/15 border border-card-border/40 text-sm font-semibold text-foreground/90 flex items-start gap-2.5">
                      <span className="text-accent-teal font-extrabold text-base">•</span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Research Insight Cards (Structured Section) */}
          {insightCards.length > 0 && (
            <section className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-foreground flex items-center gap-2">
                <Lightbulb size={22} className="text-accent-teal" />
                Research Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insightCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-card-border/60 bg-card/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-bold text-foreground">{card.title}</h3>
                        {card.number && (
                          <span className="text-xs font-mono text-accent-teal font-extrabold px-2 py-0.5 rounded bg-accent-teal/10">
                            {card.number}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3">{card.description}</p>
                    </div>
                    {card.evidence && (
                      <div className="pt-3 border-t border-card-border/30 text-xs text-foreground/60 italic">
                        {card.evidence}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Article Narrative Body */}
          {bodyParagraphs.length > 0 && (
            <article className="prose prose-invert max-w-none text-foreground/85 text-base sm:text-lg leading-relaxed space-y-6 mb-14">
              {bodyParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </article>
          )}

          {/* Key Product Findings */}
          {keyFindings.length > 0 && (
            <section className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-foreground flex items-center gap-2">
                <Key size={22} className="text-accent-teal" />
                Key Product Findings
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {keyFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl flex items-start gap-4 border border-card-border/60 bg-card/30 hover:border-accent-teal/40 transition-all duration-300"
                  >
                    <span className="text-accent-teal text-xl font-black font-mono flex-shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                      {typeof finding === "string" ? finding : (finding as any)?.text || (finding as any)?.finding || JSON.stringify(finding)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Pain Point Cards (Structured Section) */}
          {painPoints.length > 0 && (
            <section className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-amber-500/30 bg-amber-500/5">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-amber-500 flex items-center gap-2">
                ⚠️ Key Pain Points
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {painPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-amber-500/20 bg-background/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-bold text-foreground">{point.title}</h3>
                        {point.severity && (
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                            {point.severity}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3">{point.description}</p>
                    </div>
                    {point.evidence && (
                      <div className="pt-3 border-t border-amber-500/20 text-xs text-amber-300/80 italic">
                        Evidence: {point.evidence}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Legacy Key Pain Points string list (if present and painPoints cards empty) */}
          {keyPainPoints.length > 0 && painPoints.length === 0 && (
            <section className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-amber-500/30 bg-amber-500/5">
              <h2 className="text-xl font-bold mb-4 text-amber-500 flex items-center gap-2">
                ⚠️ Key User Pain Points
              </h2>
              <ul className="space-y-3">
                {keyPainPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* RICE Prioritization Table (if present) */}
          {riceScores.length > 0 && (
            <section className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                📊 RICE Prioritization Model
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-foreground/80 border-collapse">
                  <thead>
                    <tr className="border-b border-card-border text-xs uppercase tracking-wider text-accent-cyan">
                      <th className="py-3 px-4">Feature / Opportunity</th>
                      {riceScores.some(r => r.reach !== undefined) && <th className="py-3 px-3">Reach</th>}
                      {riceScores.some(r => r.impact !== undefined) && <th className="py-3 px-3">Impact</th>}
                      {riceScores.some(r => r.confidence !== undefined) && <th className="py-3 px-3">Confidence</th>}
                      {riceScores.some(r => r.effort !== undefined) && <th className="py-3 px-3">Effort</th>}
                      <th className="py-3 px-4 text-right">RICE Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riceScores.map((scoreItem, idx) => (
                      <tr key={idx} className="border-b border-card-border/40 hover:bg-card-border/10 transition-colors">
                        <td className="py-3 px-4 font-semibold text-foreground">{scoreItem.feature}</td>
                        {scoreItem.reach !== undefined && <td className="py-3 px-3">{scoreItem.reach}</td>}
                        {scoreItem.impact !== undefined && <td className="py-3 px-3">{scoreItem.impact}</td>}
                        {scoreItem.confidence !== undefined && <td className="py-3 px-3">{scoreItem.confidence}</td>}
                        {scoreItem.effort !== undefined && <td className="py-3 px-3">{scoreItem.effort}</td>}
                        <td className="py-3 px-4 text-right font-mono font-bold text-accent-teal text-base">
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
            <section className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-card-border">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb size={24} className="text-accent-teal" />
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
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
                      className="p-6 rounded-xl border border-card-border/60 bg-card/40 shadow-sm"
                    >
                      <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                        <h4 className="font-bold text-base sm:text-lg text-foreground">
                          {title}
                        </h4>
                        {priority && (
                          <span className="text-accent-teal text-xs font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md bg-accent-teal/10 border border-accent-teal/20">
                            {priority}
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Dedicated Project Links Section */}
          {projectLinks.length > 0 && (
            <section className="my-14 p-6 sm:p-8 rounded-2xl glass-panel border border-accent-cyan/30 bg-accent-cyan/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                  <ExternalLink size={20} className="text-accent-cyan" />
                  Project Links &amp; Documentation
                </h2>
                <span className="text-xs text-foreground/50 font-mono">Explore the Artifacts</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectLinks.map((linkItem, idx) => (
                  <a
                    key={idx}
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3.5 rounded-xl border border-card-border/60 glass-panel text-accent-cyan font-semibold text-sm hover:border-accent-teal hover:text-accent-teal hover:-translate-y-0.5 transition-all duration-300 shadow-sm group"
                  >
                    <span className="font-mono text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
                    <span>{linkItem.label}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Continue Reading (Other Teardowns) */}
        {relatedTeardowns.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-card-border">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center tracking-tight flex items-center justify-center gap-2">
              <Layers size={24} className="text-accent-teal" />
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTeardowns.map((item) => (
                <Link
                  key={item.slug}
                  href={`/teardowns/${item.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-card-border glass-panel hover:border-accent-teal/40 hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
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
                  <div className="p-6">
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

      <Footer location={siteSettings.location} socialLinks={siteSettings.socialLinks} footerText={siteSettings.footerText} />

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