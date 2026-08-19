import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCaseStudyBySlug, getCaseStudies, getSiteSettings } from "@/sanity/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SingleCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const siteSettings = await getSiteSettings();
  const allStudies = (await getCaseStudies()) || [];
  const relatedStudies = Array.isArray(allStudies)
    ? allStudies.filter((s) => s.slug !== slug).slice(0, 2)
    : [];

  const tools = Array.isArray(study.tools) ? study.tools : [];
  const bodyParagraphs = Array.isArray(study.body) && study.body.length > 0
    ? study.body
    : (study.summary ? [study.summary] : []);
  const results = Array.isArray(study.results) ? study.results : [];
  const lessons = Array.isArray(study.lessons) ? study.lessons : [];
  const productDecisions = Array.isArray(study.productDecisions) ? study.productDecisions : [];
  const beforeAfter = Array.isArray(study.beforeAfter) ? study.beforeAfter : [];

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db]">
      <Navbar />

      <main className="pt-24 pb-16">

        {/* Hero Header */}
        <header className="max-w-[1280px] mx-auto px-5 md:px-16 mb-16">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-3 text-[#47f0f4] text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-px bg-[#47f0f4]"></span>
              <span>{study.category || "Case Study"}</span>
            </div>
            <h1
              className="font-bold text-4xl md:text-5xl leading-tight tracking-tight"
              style={{
                background: "linear-gradient(135deg, #bec2fc 0%, #47f0f4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {study.title}
            </h1>
            {study.summary && (
              <p className="text-[#c7c5d0] text-xl leading-relaxed">
                {study.summary}
              </p>
            )}
          </div>
        </header>

        {/* Cover Image */}
        <div className="w-full h-[400px] md:h-[614px] relative mb-20 overflow-hidden bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
          {study.coverImage ? (
            <img src={study.coverImage} alt={study.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="text-[#47f0f4]/10 text-[300px]">✦</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c1f] via-transparent to-transparent"></div>
        </div>

        {/* Article Layout */}
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">

            {/* Summary Card */}
            <div className="rounded-xl p-8 border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#bec2fc]">Summary</h3>
              <p className="text-[#c7c5d0] text-base mb-6 leading-relaxed">
                {study.summary}
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#91909a]">Category</span>
                  <span className="text-[#e4e2db] font-semibold">{study.category || "AI PM"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#91909a]">Date</span>
                  <span className="text-[#e4e2db] font-semibold">{study.date || "2024"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#91909a]">Read Time</span>
                  <span className="text-[#e4e2db] font-semibold">{study.readTime || "8 min read"}</span>
                </div>
              </div>
            </div>

            {/* Tools Card */}
            {tools.length > 0 && (
              <div className="rounded-xl p-8 border-l-4 border-l-[#47f0f4] border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl">
                <h3 className="text-xs font-mono text-[#47f0f4] mb-6 tracking-widest uppercase">
                  Stack &amp; Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-[#1a1f4e] text-[#8287bd] text-xs font-mono rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </aside>

          {/* Main Article */}
          <article className="lg:col-span-8 flex flex-col gap-12">

            {/* Body */}
            {bodyParagraphs.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold text-[#bec2fc] mb-6 tracking-tight">
                  The Challenge
                </h2>
                <div className="space-y-4 text-[#c7c5d0] leading-relaxed">
                  {bodyParagraphs.map((para, idx) => (
                    <p key={idx} className="text-base leading-relaxed">{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Product Decisions (Structured PM Log Section) */}
            {productDecisions.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold text-[#bec2fc] mb-6 tracking-tight">
                  Product Decisions
                </h2>
                <div className="space-y-6">
                  {productDecisions.map((pd, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl"
                    >
                      <h3 className="text-xl font-bold text-[#47f0f4] mb-3">{pd.decision}</h3>
                      <p className="text-sm sm:text-base text-[#c7c5d0] leading-relaxed mb-4">
                        <strong className="text-[#e4e2db]">Context:</strong> {pd.context}
                      </p>

                      {Array.isArray(pd.options) && pd.options.length > 0 && (
                        <div className="mb-4">
                          <span className="text-xs font-mono text-[#91909a] uppercase tracking-wider block mb-2 font-bold">Options Considered:</span>
                          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#c7c5d0]">
                            {pd.options.map((opt, oIdx) => (
                              <li key={oIdx} className={opt === pd.chosenOption ? "text-[#47f0f4] font-semibold" : ""}>
                                {opt} {opt === pd.chosenOption ? "(Chosen)" : ""}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-[#0a0c1f]/80 border border-white/5 space-y-2 text-xs sm:text-sm">
                        <p className="text-[#c7c5d0]"><strong className="text-[#bec2fc]">Rationale:</strong> {pd.rationale}</p>
                        {pd.tradeoffs && <p className="text-[#c7c5d0]"><strong className="text-[#ffb955]">Trade-offs:</strong> {pd.tradeoffs}</p>}
                        {pd.outcome && <p className="text-[#c7c5d0]"><strong className="text-[#47f0f4]">Outcome:</strong> {pd.outcome}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Before & After Comparison Section */}
            {beforeAfter.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold text-[#bec2fc] mb-6 tracking-tight">
                  Before &amp; After Comparison
                </h2>
                <div className="space-y-8">
                  {beforeAfter.map((block, idx) => (
                    <div key={idx} className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Before */}
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 block mb-2">
                            Before: {block.beforeLabel}
                          </span>
                          <p className="text-xs sm:text-sm text-[#c7c5d0] leading-relaxed mb-4">{block.beforeDescription}</p>
                          {block.beforeImageUrl && (
                            <img src={block.beforeImageUrl} alt={block.beforeLabel} className="w-full h-48 object-cover rounded-lg border border-red-500/20" />
                          )}
                        </div>

                        {/* After */}
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                            After: {block.afterLabel}
                          </span>
                          <p className="text-xs sm:text-sm text-[#c7c5d0] leading-relaxed mb-4">{block.afterDescription}</p>
                          {block.afterImageUrl && (
                            <img src={block.afterImageUrl} alt={block.afterLabel} className="w-full h-48 object-cover rounded-lg border border-emerald-500/20" />
                          )}
                        </div>
                      </div>

                      {block.impact && (
                        <div className="p-4 rounded-xl bg-[#47f0f4]/10 border border-[#47f0f4]/20 text-xs sm:text-sm text-[#47f0f4] font-medium">
                          <strong>Impact Summary:</strong> {block.impact}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Results Bento Grid */}
            {results.length > 0 && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, idx) => {
                  const match = typeof result === "string" ? result.match(/^([0-9.]+[x%]|\d+)\s(.*)/) : null;
                  if (match) {
                    const [_, stat, desc] = match;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl p-6 flex flex-col items-center justify-center text-center border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl"
                      >
                        <span
                          className="font-bold text-5xl mb-2"
                          style={{
                            background: "linear-gradient(135deg, #47f0f4 0%, #bec2fc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {stat}
                        </span>
                        <span className="text-[#91909a] text-xs font-mono tracking-widest uppercase">
                          {desc}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className="rounded-xl p-6 border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl col-span-1 md:col-span-2"
                    >
                      <p className="text-sm text-[#c7c5d0] leading-relaxed">{typeof result === "string" ? result : JSON.stringify(result)}</p>
                    </div>
                  );
                })}
              </section>
            )}

            {/* Lessons Learned */}
            {lessons.length > 0 && (
              <section className="p-8 bg-[#1b1c17] rounded-2xl border border-white/10">
                <h2 className="text-3xl font-semibold text-[#ffb955] mb-6 tracking-tight">
                  Lessons Learned
                </h2>
                <ul className="space-y-6">
                  {lessons.map((lesson, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="text-[#ffb955] text-xl flex-shrink-0">💡</span>
                      <p className="text-base text-[#c7c5d0] leading-relaxed">
                        {typeof lesson === "string" ? lesson : JSON.stringify(lesson)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </article>
        </div>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="max-w-[1280px] mx-auto px-5 md:px-16 mt-32">
            <h3 className="text-3xl font-semibold mb-10 text-center tracking-tight">
              Related Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedStudies.map((item) => (
                <Link
                  key={item.slug}
                  href={`/case-studies/${item.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-[#1a1f4e66] backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(0,212,216,0.2)]"
                >
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-[#47f0f4]/20 text-6xl">✦</span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-[#47f0f4] mb-3 block tracking-widest uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-xl font-semibold text-[#e4e2db] group-hover:text-[#47f0f4] transition-colors leading-snug mb-3">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#91909a] line-clamp-2 leading-relaxed">
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
    </div>
  );
}