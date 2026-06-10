import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeardowns, getCaseStudies } from "@/sanity/queries";
import { mockTeardowns, mockCaseStudies } from "@/data/mockData";
import { ArrowUpRight, Award, Brain, Compass, Sparkles } from "lucide-react";

export default async function HomePage() {
  const teardowns = await getTeardowns();
  const caseStudies = await getCaseStudies();

  const featuredTeardowns = teardowns.length > 0 ? teardowns.slice(0, 3) : mockTeardowns.slice(0, 3);
  const featuredCaseStudy = caseStudies[0] || mockCaseStudies[0];
  const otherCaseStudy = caseStudies[1] || mockCaseStudies[1];

  // Marquee items: combination of products and teardowns
  const marqueeItems = [
    { title: "ResumeGenie AI Agent", desc: "AI Autopilot", color: "from-cyan-500/20 to-teal-500/20" },
    { title: "GPT-4o Voice Mode UX", desc: "Teardown", color: "from-blue-500/20 to-indigo-500/20" },
    { title: "SaaS Agentic Workflows", desc: "Analysis", color: "from-purple-500/20 to-pink-500/20" },
    { title: "SaaS Schema Validator", desc: "Developer Tool", color: "from-emerald-500/20 to-teal-500/20" },
    { title: "Job-Tech Disruption Study", desc: "Teardown", color: "from-amber-500/20 to-orange-500/20" },
    { title: "Voice UX Builder", desc: "UI Harness", color: "from-cyan-500/20 to-blue-500/20" },
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
                Available for Roles & Opportunities
              </div>

              {/* Name & Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Chiagoziem Melvin Akobundu
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent-cyan via-accent-teal to-teal-400 bg-clip-text text-transparent mt-3 mb-6">
                SaaS PM &amp; Certified PO transitioning to AI Product Management &amp; AI Engineering
              </h2>

              {/* Bio */}
              <p className="text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed mb-8">
                Experienced SaaS Product Manager with **CSPO** and **CSM** credentials. Pivoting to AI Engineering and AI PM, currently building <strong className="text-accent-teal">ResumeGenie</strong>—an agentic job application platform. Specialized in bridging high-level product strategy with hands-on AI engineering.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-accent-teal text-background hover:bg-accent-teal/90 hover:scale-102 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  View Case Studies
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg glass-panel hover:bg-card-border/20 hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  Contact Me
                </Link>
              </div>
            </div>

            {/* Right Photo Placeholder */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] rounded-2xl overflow-hidden glass-panel border-card-border/60 p-3 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-103 group">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/10 via-transparent to-accent-teal/10 z-0"></div>
                {/* Abstract Interactive Grid / SVG Avatar for Premium Feeling */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900/60 dark:bg-black/40 flex items-center justify-center border border-card-border/40">
                  <svg className="w-3/4 h-3/4 text-accent-teal/20 group-hover:text-accent-teal/30 transition-colors duration-500" fill="none" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
                    {/* Glowing dots */}
                    <circle cx="50" cy="65" r="4" fill="var(--accent-cyan)" className="animate-ping" style={{ animationDuration: "3s" }} />
                    <circle cx="150" cy="135" r="4" fill="var(--accent-teal)" className="animate-ping" style={{ animationDuration: "4s" }} />
                    {/* User profile wireframe outline */}
                    <path d="M60,160 C60,130 80,120 100,120 C120,120 140,130 140,160" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="100" cy="85" r="22" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {/* Outer glowing frame */}
                  <div className="absolute inset-0 border border-accent-teal/0 group-hover:border-accent-teal/20 rounded-xl transition-colors duration-500"></div>
                </div>
                {/* Subtle text inside photo placeholder */}
                <div className="absolute bottom-6 left-6 right-6 text-center z-10">
                  <span className="text-xs uppercase tracking-widest text-foreground/50 group-hover:text-accent-teal transition-colors duration-300 font-semibold">Chiagoziem M. A.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INFINITE MARQUEE */}
        <section className="w-full py-8 border-y border-card-border bg-card/30 overflow-hidden relative">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {/* First sequence */}
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <div
                key={index}
                className={`inline-flex flex-col min-w-[200px] sm:min-w-[240px] px-5 py-4 rounded-xl border border-card-border glass-panel bg-gradient-to-br ${item.color} backdrop-blur-md shadow-sm hover:border-accent-teal/40 hover:-translate-y-1 transition-all duration-300`}
              >
                <span className="text-[10px] uppercase tracking-wider font-bold text-accent-cyan">{item.desc}</span>
                <span className="text-sm font-extrabold text-foreground mt-1">{item.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CREDIBILITY BAR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center bg-card/40 border border-card-border/60 rounded-2xl p-6 sm:p-8 glass-panel">
            {/* CSPO Cred */}
            <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-card-border pb-4 md:pb-0 md:pr-4">
              <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">Certified Scrum Product Owner</h3>
                <p className="text-xs text-foreground/60">Scrum Alliance Credential</p>
              </div>
            </div>

            {/* CSM Cred */}
            <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-card-border pb-4 md:pb-0 md:pr-4">
              <div className="p-3 rounded-xl bg-accent-teal/10 text-accent-teal">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">Certified ScrumMaster</h3>
                <p className="text-xs text-foreground/60">Scrum Alliance Credential</p>
              </div>
            </div>

            {/* Currently Learning */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Brain size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground">Currently Mastering</h3>
                <p className="text-xs text-foreground/60">AI Engineering &amp; LLM Orchestration</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED TEARDOWNS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Featured Teardowns</h2>
              <p className="text-foreground/65 mt-2">Critical product analyses, UX breakdowns, and systemic evaluations of AI platforms.</p>
            </div>
            <Link
              href="/teardowns"
              className="text-sm font-semibold text-accent-teal hover:text-accent-teal/80 hover:underline flex items-center gap-1 group"
            >
              See All Teardowns
              <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTeardowns.map((teardown) => (
              <article
                key={teardown.slug}
                className="flex flex-col rounded-2xl overflow-hidden glass-panel border-card-border hover:-translate-y-2 hover:border-accent-teal/40 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Card Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-accent-teal text-background">
                      {teardown.category}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider rounded-md bg-slate-800 text-slate-300">
                      {teardown.readTime}
                    </span>
                  </div>
                  {/* Simple CSS placeholder image with CSS gradients for high aesthetic, blending nicely */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center text-slate-700 font-extrabold group-hover:scale-105 transition-transform duration-500">
                    <Sparkles size={48} className="text-accent-teal/20" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-foreground/50 font-semibold">{teardown.date}</span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-3 leading-snug group-hover:text-accent-teal transition-colors">
                      {teardown.title}
                    </h3>
                    <p className="text-sm text-foreground/75 line-clamp-3">
                      {teardown.summary}
                    </p>
                  </div>
                  <Link
                    href={`/teardowns/${teardown.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan hover:underline mt-6"
                  >
                    Read teardown
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Case Studies</h2>
              <p className="text-foreground/65 mt-2">Diving deep into specific product problem spaces, hypotheses, prototypes, and quantifiable outcomes.</p>
            </div>
            <Link
              href="/case-studies"
              className="text-sm font-semibold text-accent-teal hover:text-accent-teal/80 hover:underline flex items-center gap-1 group"
            >
              See All Case Studies
              <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Case Study (ResumeGenie) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden glass-panel border-card-border hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group p-6 sm:p-8">
              <div className="flex-grow">
                {/* Meta details */}
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-accent-teal text-background">
                    Featured Case Study
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-card-border/30 text-foreground/80">
                    {featuredCaseStudy.category}
                  </span>
                  <span className="text-xs text-foreground/50 font-medium ml-auto">{featuredCaseStudy.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mt-2 mb-4 leading-tight">
                  {featuredCaseStudy.title}
                </h3>

                {/* Summary */}
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">
                  {featuredCaseStudy.summary}
                </p>

                {/* Tool Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredCaseStudy.tools.slice(0, 5).map((tool) => (
                    <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-card-border/20 border border-card-border/40 font-medium">
                      {tool}
                    </span>
                  ))}
                  {featuredCaseStudy.tools.length > 5 && (
                    <span className="text-xs px-2.5 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan font-bold">
                      +{featuredCaseStudy.tools.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex items-center justify-between border-t border-card-border pt-6 mt-4">
                <span className="text-xs text-foreground/60">
                  Read time: 8 mins
                </span>
                <Link
                  href={`/case-studies/${featuredCaseStudy.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-accent-cyan text-white hover:bg-accent-cyan/90 hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  Read Case Study
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Smaller Case Study Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl overflow-hidden glass-panel border-card-border hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group p-6 sm:p-8">
              <div className="flex-grow">
                {/* Meta details */}
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-card-border/30 text-foreground/80">
                    {otherCaseStudy.category}
                  </span>
                  <span className="text-xs text-foreground/50 font-medium ml-auto">{otherCaseStudy.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent-teal transition-colors mt-2 mb-4 leading-snug">
                  {otherCaseStudy.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-foreground/85 leading-relaxed mb-6 line-clamp-4">
                  {otherCaseStudy.summary}
                </p>

                {/* Tool Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {otherCaseStudy.tools.slice(0, 4).map((tool) => (
                    <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-card-border/20 border border-card-border/40 font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="flex items-center justify-between border-t border-card-border pt-6 mt-4">
                <span className="text-xs text-foreground/60">
                  Read time: 6 mins
                </span>
                <Link
                  href={`/case-studies/${otherCaseStudy.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:underline"
                >
                  Read details
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
