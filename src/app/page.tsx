import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeardowns, getCaseStudies, getHomePageData, getSiteSettings } from "@/sanity/queries";
import { mockTeardowns, mockCaseStudies } from "@/data/mockData";
import { ArrowUpRight, Award, Brain, Compass, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const homeData = (await getHomePageData()) || {};
  const siteSettings = (await getSiteSettings()) || {};
  const rawTeardowns = await getTeardowns();
  const rawCaseStudies = await getCaseStudies();

  const teardowns = Array.isArray(rawTeardowns) && rawTeardowns.length > 0 ? rawTeardowns : mockTeardowns;
  const caseStudies = Array.isArray(rawCaseStudies) && rawCaseStudies.length > 0 ? rawCaseStudies : mockCaseStudies;

  const featuredTeardowns = (Array.isArray(homeData.featuredTeardowns) && homeData.featuredTeardowns.length > 0)
    ? homeData.featuredTeardowns
    : (Array.isArray(teardowns) && teardowns.length > 0 ? teardowns.slice(0, 3) : mockTeardowns.slice(0, 3));

  const featuredCaseStudy = (Array.isArray(homeData.featuredCaseStudies) && homeData.featuredCaseStudies[0]) || caseStudies[0] || mockCaseStudies[0];
  const otherCaseStudy = (Array.isArray(homeData.featuredCaseStudies) && homeData.featuredCaseStudies[1]) || caseStudies[1] || mockCaseStudies[1];

  const heroHeading = homeData.heroHeading || "Chiagoziem Melvin Akobundu";
  const heroSubheading = homeData.heroSubheading || "SaaS PM & Certified PO transitioning to AI Product Management & AI Engineering";
  const introText = homeData.introText || "Experienced SaaS Product Manager with CSPO and CSM credentials. Pivoting to AI Engineering and AI PM, currently building ResumeGenie—an agentic job application platform. Specialized in bridging high-level product strategy with hands-on AI engineering.";
  const availabilityBadge = homeData.availabilityBadge || "Available for Roles & Opportunities";

  // Marquee items: combination of products and teardowns
  const marqueeItems = [
    { title: "ResumeGenie AI Agent", desc: "AI Autopilot", color: "from-cyan-500/20 to-teal-500/20" },
    { title: "Netflix Localization & Pricing", desc: "Teardown", color: "from-red-500/20 to-pink-500/20" },
    { title: "Claude AI Strategy Teardown", desc: "Teardown", color: "from-purple-500/20 to-indigo-500/20" },
    { title: "Canva Creator Workflows", desc: "Teardown", color: "from-blue-500/20 to-cyan-500/20" },
    { title: "Chowdeck Marketplace Study", desc: "Teardown", color: "from-amber-500/20 to-orange-500/20" },
    { title: "WhatsApp Media & Status Controls", desc: "Teardown", color: "from-emerald-500/20 to-teal-500/20" },
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-40 z-0"></div>
      <div className="absolute top-[40%] right-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-30 z-0"></div>

      <Navbar />

      <main className="flex-grow z-10">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-panel text-accent-teal border-accent-teal/20 mb-6 shadow-sm hover:scale-105 transition-all duration-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {availabilityBadge}
              </div>

              {/* Name & Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                {heroHeading}
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent-cyan via-accent-teal to-teal-400 bg-clip-text text-transparent mt-3 mb-6">
                {heroSubheading}
              </h2>

              {/* Bio */}
              <p className="text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed mb-8">
                {introText}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <Link
                  href="/case-studies/resumegenie-ai-agent"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-accent-teal/20 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <Brain size={18} />
                  Explore ResumeGenie AI Case Study
                </Link>
                <Link
                  href="/teardowns"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel text-foreground font-bold text-sm flex items-center justify-center gap-2 border-card-border hover:border-accent-teal/50 hover:bg-foreground/5 transition-all duration-300"
                >
                  <Compass size={18} className="text-accent-teal" />
                  View All Teardowns
                </Link>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border-card-border/80 p-2 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/20 via-transparent to-accent-cyan/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-center p-6 border border-white/5">
                  <div className="w-24 h-24 rounded-full bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center mb-4 shadow-inner">
                    <Sparkles className="w-10 h-10 text-accent-teal animate-pulse" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Chiagoziem Melvin Akobundu</span>
                  <span className="text-xs text-accent-teal font-mono mt-1">CSPO® | CSM® | AI PM</span>
                  <div className="mt-4 px-3 py-1 rounded-full text-[11px] font-mono glass-panel border-card-border text-foreground/60">
                    Photo placeholder — blend enabled
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE HIGHLIGHTS */}
        <section className="w-full border-y border-card-border/40 py-4 bg-background/50 backdrop-blur-md overflow-hidden relative">
          <div className="flex w-max gap-8 animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-xl glass-panel border-card-border/50 text-xs font-semibold whitespace-nowrap"
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></span>
                <span className="text-foreground">{item.title}</span>
                <span className="text-foreground/40 font-mono text-[10px] uppercase">[{item.desc}]</span>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED CASE STUDIES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Deep Dives &amp; Work</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Featured Case Studies</h2>
            </div>
            <Link
              href="/case-studies"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline"
            >
              Explore all case studies <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured Case Study */}
            {featuredCaseStudy && (
              <div className="lg:col-span-7 group rounded-3xl overflow-hidden glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 relative">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl bg-accent-teal/5 pointer-events-none"></div>
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-teal text-background">
                      Featured AI Product
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider glass-panel text-foreground/80 border-card-border">
                      {featuredCaseStudy.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug">
                    {featuredCaseStudy.title}
                  </h3>

                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6">
                    {featuredCaseStudy.summary}
                  </p>
                </div>

                <div>
                  {/* Results preview */}
                  {Array.isArray(featuredCaseStudy.results) && featuredCaseStudy.results.length > 0 && (
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {featuredCaseStudy.results.slice(0, 2).map((res, i) => (
                        <div key={i} className="px-3 py-2 rounded-xl bg-card-border/20 border border-card-border/30 text-xs text-foreground/80 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0"></span>
                          <span className="truncate">{res}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/case-studies/${featuredCaseStudy.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Read Full Case Study <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* Secondary Featured Case Study */}
            {otherCaseStudy && (
              <div className="lg:col-span-5 group rounded-3xl overflow-hidden glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 relative">
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider glass-panel text-foreground/80 border-card-border">
                      {otherCaseStudy.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug">
                    {otherCaseStudy.title}
                  </h3>

                  <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                    {otherCaseStudy.summary}
                  </p>
                </div>

                <Link
                  href={`/case-studies/${otherCaseStudy.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors group-hover:translate-x-1 duration-300"
                >
                  Read Case Study <ArrowUpRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* STRATEGIC TEARDOWNS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Product Deconstruction</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Strategic Product Teardowns</h2>
            </div>
            <Link
              href="/teardowns"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline"
            >
              View all 6 teardowns <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTeardowns.map((teardown, idx) => (
              <Link
                key={teardown.slug || idx}
                href={`/teardowns/${teardown.slug}`}
                className="group rounded-2xl p-6 glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-card-border/30 text-foreground/80 font-bold">{teardown.category}</span>
                    <span>{teardown.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent-teal transition-colors mb-2 leading-snug">
                    {teardown.title}
                  </h3>
                  <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed mb-4">
                    {teardown.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-card-border/30 text-xs font-semibold text-accent-teal group-hover:text-accent-cyan">
                  <span>Explore Teardown</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
          <div className="rounded-3xl p-8 sm:p-12 glass-panel border-accent-teal/30 bg-gradient-to-r from-accent-teal/10 via-background to-accent-cyan/10 text-center relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Building or Hiring for the Next Wave of AI?
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-base mb-8 leading-relaxed">
              Open to AI Product Manager and AI Engineer roles at high-impact labs and product companies. Let's discuss strategy, agentic architectures, and roadmap execution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-teal text-background font-extrabold text-sm shadow-lg shadow-accent-teal/20 hover:bg-accent-cyan hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get in Touch with Chiagoziem
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
