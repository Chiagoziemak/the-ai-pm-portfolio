import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCaseStudies } from "@/sanity/queries";
import { mockCaseStudies } from "@/data/mockData";
import { ArrowUpRight, Sparkles, BookOpen, Layers } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CaseStudiesPage() {
  const data = await getCaseStudies();
  const caseStudies = data.length > 0 ? data : mockCaseStudies;

  const featuredCaseStudy = caseStudies[0];
  const otherCaseStudies = caseStudies.slice(1);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-30 z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-20 z-0"></div>

      <Navbar />

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
                      alt={featuredCaseStudy.title} 
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

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-accent-teal transition-colors mt-2 mb-4 leading-tight">
                      {featuredCaseStudy.title}
                    </h2>

                    <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6">
                      {featuredCaseStudy.summary}
                    </p>

                    {/* Tool List */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredCaseStudy.tools.map((tool) => (
                        <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-card-border/20 border border-card-border/40 font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-card-border/60 pt-6">
                    <span className="text-xs text-foreground/60 flex items-center gap-1">
                      <BookOpen size={14} className="text-accent-cyan" />
                      8 min read
                    </span>
                    <Link
                      href={`/case-studies/${featuredCaseStudy.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg bg-accent-cyan text-white hover:bg-accent-cyan/90 hover:scale-102 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      Read Case Study
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Case Studies Grid */}
        <section>
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
            <Layers size={22} className="text-accent-teal" />
            More Optimizations &amp; Builds
          </h3>

          {otherCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherCaseStudies.map((study) => (
                <article
                  key={study.slug}
                  className="flex flex-col justify-between rounded-2xl overflow-hidden glass-panel border-card-border hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group p-6 sm:p-8"
                >
                  <div className="flex-grow">
                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-card-border/30 text-foreground/80">
                        {study.category}
                      </span>
                      <span className="text-xs text-foreground/50 font-medium ml-auto">{study.date}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent-teal transition-colors mt-2 mb-4 leading-snug">
                      {study.title}
                    </h4>

                    {/* Summary */}
                    <p className="text-sm text-foreground/85 leading-relaxed mb-6 line-clamp-4">
                      {study.summary}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tools.slice(0, 5).map((tool) => (
                        <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-card-border/20 border border-card-border/40 font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between border-t border-card-border pt-6 mt-4">
                    <span className="text-xs text-foreground/60 flex items-center gap-1">
                      <BookOpen size={14} className="text-accent-cyan" />
                      6 min read
                    </span>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:underline mt-auto"
                    >
                      Read full study
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-card-border rounded-xl glass-panel">
              <p className="text-foreground/50">Coming soon.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
