import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicIcon from "@/components/DynamicIcon";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { getTeardowns, getCaseStudies, getHomePageData, getSiteSettings, MarqueeItem } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { mockTeardowns, mockCaseStudies } from "@/data/mockData";
import { constructMetadata, generatePersonJsonLd } from "@/lib/seo";
import { ArrowUpRight, Brain, Compass } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [homeData, siteSettings] = await Promise.all([
    getHomePageData(),
    getSiteSettings(),
  ]);

  const title = homeData.metaTitle || siteSettings.siteTitle || "Chiagoziem Melvin Akobundu | AI Product Manager & Engineer";
  const description = homeData.metaDescription || homeData.introText || siteSettings.metaDescription;
  const image = homeData.heroImageUrl || siteSettings.ogImageUrl;

  return constructMetadata({
    title,
    description,
    image,
    imageAlt: homeData.heroImageAlt || "Chiagoziem Melvin Akobundu — AI Product Manager",
    urlPath: "/",
    siteSettings,
  });
}

export default async function HomePage() {
  const [teardownsData, caseStudiesData, homeData, siteSettings] = await Promise.all([
    getTeardowns(),
    getCaseStudies(),
    getHomePageData(),
    getSiteSettings(),
  ]);

  const teardowns = Array.isArray(teardownsData) && teardownsData.length > 0
    ? teardownsData
    : mockTeardowns;

  const caseStudies = Array.isArray(caseStudiesData) && caseStudiesData.length > 0
    ? caseStudiesData
    : mockCaseStudies;

  const isCaseStudiesEnabled = siteSettings.caseStudiesPageEnabled !== false;

  const featuredCaseStudy = caseStudies[0] || mockCaseStudies[0];
  const otherCaseStudy = caseStudies[1] || mockCaseStudies[1];
  const featuredTeardowns = teardowns.slice(0, 3);

  // Home Page custom fields with mock fallbacks
  const heroHeading = homeData.heroHeading || "Chiagoziem Melvin Akobundu";
  const heroSubheading = homeData.heroSubheading || "AI Product Manager & Engineer";
  const introText = homeData.introText || "Architecting and evaluating agentic AI workflows, LLM applications, and high-growth consumer products. CSPO certified.";
  const availabilityBadge = homeData.availabilityBadge || "Available for AI PM Roles";
  const currentStack = (Array.isArray(homeData.currentStack) && homeData.currentStack.length > 0)
    ? homeData.currentStack
    : ["LangChain", "Next.js", "Python", "OpenAI / Claude API", "FastAPI", "Vector DBs"];

  const heroTagChips = Array.isArray(homeData.heroTagChips) ? homeData.heroTagChips : [];
  const heroImageUrl = (homeData.heroImage ? urlForImage(homeData.heroImage)?.width(800).url() : null) || homeData.heroImageUrl || "/profile-hero.jpg";
  const heroImageAlt = homeData.heroImageAlt || "Chiagoziem Melvin Akobundu — AI Product Manager";
  const heroImagePosition = homeData.heroImagePosition || "right";

  const processSteps = Array.isArray(homeData.processSteps) ? homeData.processSteps : [];
  const testimonials = Array.isArray(homeData.testimonials) ? homeData.testimonials : [];
  const learningTrack = Array.isArray(homeData.learningTrack) ? homeData.learningTrack : [];

  // Reorderable section list
  const defaultOrder = ["featuredWorkStrip", "caseStudies", "teardowns", "howIWork", "testimonials", "learningTrack"];
  const orderToUse = (Array.isArray(homeData.sectionOrder) && homeData.sectionOrder.length > 0)
    ? homeData.sectionOrder
    : defaultOrder;

  // Marquee items (Sanity or default fallback)
  const defaultMarqueeItems: MarqueeItem[] = [
    { title: "ResumeGenie AI Agent", desc: "AI Autopilot", color: "from-cyan-500/20 to-teal-500/20" },
    { title: "Netflix Localization & Pricing", desc: "Teardown", color: "from-red-500/20 to-pink-500/20" },
    { title: "Claude AI Strategy Teardown", desc: "Teardown", color: "from-purple-500/20 to-indigo-500/20" },
    { title: "Canva Creator Workflows", desc: "Teardown", color: "from-blue-500/20 to-cyan-500/20" },
    { title: "Chowdeck Marketplace Study", desc: "Teardown", color: "from-amber-500/20 to-orange-500/20" },
    { title: "WhatsApp Media & Status Controls", desc: "Teardown", color: "from-emerald-500/20 to-teal-500/20" },
  ];

  const marqueeItems = (Array.isArray(homeData.marqueeItems) && homeData.marqueeItems.length > 0)
    ? homeData.marqueeItems
    : defaultMarqueeItems;

  const marqueeEnabled = homeData.marqueeEnabled !== false;
  const marqueeSpeed = typeof homeData.marqueeSpeed === "number" ? homeData.marqueeSpeed : 25;

  const personJsonLd = generatePersonJsonLd(siteSettings, heroImageUrl);

  // Section Renderer
  const renderSectionByKey = (key: string) => {
    switch (key) {
      case "featuredWorkStrip":
        if (!marqueeEnabled || marqueeItems.length === 0) return null;
        return (
          <section key="featuredWorkStrip" className="w-full py-8 overflow-hidden relative border-y border-card-border/40 bg-card/10">
            <div className="flex w-max animate-marquee" style={{ animationDuration: `${marqueeSpeed}s` }}>
              {[...marqueeItems, ...marqueeItems].map((item, index) => {
                const cardContent = (
                  <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl glass-panel border-card-border/60 mx-3 hover:border-accent-teal/40 transition-all">
                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${item.color || "from-accent-teal to-accent-cyan"}`}></span>
                    <span className="text-xs font-bold text-foreground tracking-wide whitespace-nowrap">{item.title}</span>
                    {item.desc && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-accent-teal/10 text-accent-teal border border-accent-teal/20 whitespace-nowrap">
                        {item.desc}
                      </span>
                    )}
                  </div>
                );

                return item.url ? (
                  <Link key={index} href={item.url} className="hover:opacity-80 transition-opacity">
                    {cardContent}
                  </Link>
                ) : (
                  <div key={index}>{cardContent}</div>
                );
              })}
            </div>
          </section>
        );

      case "caseStudies":
        if (!isCaseStudiesEnabled) return null;
        return (featuredCaseStudy || otherCaseStudy) ? (
          <section key="caseStudies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Deep Dives &amp; Work</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1.5 sm:mt-2 tracking-tight">Featured Case Studies</h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline min-h-[36px]"
              >
                Explore all case studies <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Main Featured Case Study */}
              {featuredCaseStudy && (
                <div className="lg:col-span-7 group rounded-3xl overflow-hidden glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 relative">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl bg-accent-teal/5 pointer-events-none"></div>
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-teal text-background">
                        Featured AI Product
                      </span>
                      {featuredCaseStudy.badgeLabel && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                          {featuredCaseStudy.badgeLabel}
                        </span>
                      )}
                      {featuredCaseStudy.category && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider glass-panel text-foreground/80 border-card-border">
                          {featuredCaseStudy.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug">
                      {featuredCaseStudy.title}
                    </h3>

                    {featuredCaseStudy.summary && (
                      <p className="text-xs sm:text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
                        {featuredCaseStudy.summary}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Card Stat-Pair Blocks if present */}
                    {Array.isArray(featuredCaseStudy.cardStats) && featuredCaseStudy.cardStats.length > 0 ? (
                      <div className="mb-6 grid grid-cols-2 gap-3">
                        {featuredCaseStudy.cardStats.map((stat, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-center">
                            <span className="block text-lg sm:text-xl font-extrabold text-accent-teal">{stat.value}</span>
                            <span className="text-[10px] font-mono text-foreground/70 uppercase">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Fallback to results preview */
                      Array.isArray(featuredCaseStudy.results) && featuredCaseStudy.results.length > 0 && (
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {featuredCaseStudy.results.slice(0, 2).map((res, i) => (
                            <div key={i} className="px-3 py-2 rounded-xl bg-card-border/20 border border-card-border/30 text-xs text-foreground/80 font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0"></span>
                              <span className="truncate">{res}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    <Link
                      href={`/case-studies/${featuredCaseStudy.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors group-hover:translate-x-1 duration-300 min-h-[36px]"
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
                      {otherCaseStudy.badgeLabel && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                          {otherCaseStudy.badgeLabel}
                        </span>
                      )}
                      {otherCaseStudy.category && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider glass-panel text-foreground/80 border-card-border">
                          {otherCaseStudy.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors mb-3 leading-snug">
                      {otherCaseStudy.title}
                    </h3>

                    {otherCaseStudy.summary && (
                      <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6">
                        {otherCaseStudy.summary}
                      </p>
                    )}
                  </div>

                  {/* Card Stat-Pair Blocks if present */}
                  {Array.isArray(otherCaseStudy.cardStats) && otherCaseStudy.cardStats.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 gap-3">
                      {otherCaseStudy.cardStats.map((stat, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-center">
                          <span className="block text-lg sm:text-xl font-extrabold text-accent-teal">{stat.value}</span>
                          <span className="text-[10px] font-mono text-foreground/70 uppercase">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/case-studies/${otherCaseStudy.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors group-hover:translate-x-1 duration-300 min-h-[36px]"
                  >
                    Read Case Study <ArrowUpRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </section>
        ) : null;

      case "teardowns":
        return featuredTeardowns.length > 0 ? (
          <section key="teardowns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Product Deconstruction</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1.5 sm:mt-2 tracking-tight">Strategic Product Teardowns</h2>
              </div>
              <Link
                href="/teardowns"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline min-h-[36px]"
              >
                View all teardowns <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {featuredTeardowns.map((teardown, idx) => (
                <Link
                  key={teardown.slug || idx}
                  href={`/teardowns/${teardown.slug}`}
                  className="group rounded-3xl p-6 glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[380px]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 mb-3">
                      {teardown.category && <span className="px-2.5 py-0.5 rounded-md bg-card-border/30 text-foreground/80 font-bold">{teardown.category}</span>}
                      {teardown.readTime && <span>{teardown.readTime}</span>}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent-teal transition-colors mb-2 leading-snug">
                      {teardown.title}
                    </h3>
                    {teardown.summary && (
                      <p className="text-xs sm:text-sm text-foreground/70 line-clamp-3 leading-relaxed mb-4">
                        {teardown.summary}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-card-border/30 text-xs font-semibold text-accent-teal group-hover:text-accent-cyan">
                    <span>Explore Teardown</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null;

      case "howIWork":
        return processSteps.length > 0 ? (
          <section key="howIWork" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mb-8 sm:mb-10">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Operating Framework</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1.5 sm:mt-2 tracking-tight">How I Work</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="p-6 rounded-3xl glass-panel border-card-border/60 hover:border-accent-teal/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-mono font-black text-accent-teal/50">{step.number}</span>
                      <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal flex items-center justify-center">
                        <DynamicIcon name={step.icon || "FiCpu"} size={20} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {Array.isArray(step.deliverables) && step.deliverables.length > 0 && (
                    <div className="pt-4 border-t border-card-border/30 space-y-1.5">
                      <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider block font-bold">Key Deliverables:</span>
                      {step.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="text-xs text-foreground/70 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0"></span>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "testimonials":
        return testimonials.length > 0 ? (
          <TestimonialsCarousel
            key="testimonials"
            testimonials={testimonials}
            scrollInterval={homeData.testimonialScrollInterval}
          />
        ) : null;

      case "learningTrack":
        return learningTrack.length > 0 ? (
          <section key="learningTrack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mb-8 sm:mb-10">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Continuous Evolution</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1.5 sm:mt-2 tracking-tight">Active Learning &amp; Upskilling</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {learningTrack.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl glass-panel border-card-border/60 hover:border-accent-teal/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {item.provider && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent-teal bg-accent-teal/10 border border-accent-teal/20 px-2 py-0.5 rounded-full">
                          {item.provider}
                        </span>
                      )}
                      {item.status && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                          {item.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-card-border/30">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-card-border/30 text-foreground/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden page-bg-home text-foreground transition-colors duration-300">
      {/* Structured Data (JSON-LD Person Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-40 z-0 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-30 z-0 pointer-events-none"></div>

      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
      />

      <main className="flex-grow z-10">
        {/* HERO SECTION (Fixed at top) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className={`${heroImageUrl ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col items-start text-left ${heroImageUrl && heroImagePosition === "left" ? "lg:order-2" : "lg:order-1"}`}>
              {/* Badge & Floating Tag Chips */}
              {(availabilityBadge || heroTagChips.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6">
                  {availabilityBadge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold glass-panel text-accent-teal border-accent-teal/20 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {availabilityBadge}
                    </div>
                  )}

                  {heroTagChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono tracking-wider glass-panel text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10"
                    >
                      ✦ {chip}
                    </span>
                  ))}
                </div>
              )}

              {/* Name & Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] break-words">
                {heroHeading}
              </h1>
              {heroSubheading && (
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-accent-cyan via-accent-teal to-teal-400 bg-clip-text text-transparent mt-2 sm:mt-3 mb-4 sm:mb-6 leading-snug">
                  {heroSubheading}
                </h2>
              )}

              {/* Bio */}
              {introText && (
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed mb-6">
                  {introText}
                </p>
              )}

              {/* Current Stack List */}
              {currentStack.length > 0 && (
                <div className="mb-6 sm:mb-8 w-full max-w-xl p-3.5 sm:p-4 rounded-2xl glass-panel border-card-border/60 bg-card/20">
                  <span className="text-[10px] sm:text-[11px] font-mono text-accent-teal uppercase tracking-widest block mb-2 font-bold">
                    Current Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentStack.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-card-border/30 text-foreground/90 border border-card-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs (Dynamic from homeData.ctaButtons if populated) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                {Array.isArray(homeData.ctaButtons) && homeData.ctaButtons.length > 0 ? (
                  homeData.ctaButtons.map((btn, idx) => (
                    <Link
                      key={idx}
                      href={btn.url || "#"}
                      className={
                        idx === 0
                          ? "w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-accent-teal/20 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[44px]"
                          : "w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl glass-panel text-foreground font-bold text-sm flex items-center justify-center gap-2 border-card-border hover:border-accent-teal/50 hover:bg-foreground/5 transition-all duration-300 min-h-[44px]"
                      }
                    >
                      {idx === 0 && <Brain size={18} />}
                      {idx === 1 && <Compass size={18} className="text-accent-teal" />}
                      {btn.label}
                    </Link>
                  ))
                ) : (
                  <>
                    {isCaseStudiesEnabled ? (
                      <Link
                        href="/case-studies/resumegenie-ai-agent"
                        className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-accent-teal/20 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[44px]"
                      >
                        <Brain size={18} />
                        Explore ResumeGenie AI
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-accent-teal/20 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[44px]"
                      >
                        <Brain size={18} />
                        Get In Touch
                      </Link>
                    )}
                    <Link
                      href="/teardowns"
                      className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl glass-panel text-foreground font-bold text-sm flex items-center justify-center gap-2 border-card-border hover:border-accent-teal/50 hover:bg-foreground/5 transition-all duration-300 min-h-[44px]"
                    >
                      <Compass size={18} className="text-accent-teal" />
                      View All Teardowns
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Photo / Image Column */}
            {heroImageUrl && (
              <div className={`lg:col-span-5 flex justify-center ${heroImagePosition === "left" ? "lg:order-1 lg:justify-start" : "lg:order-2 lg:justify-end"} w-full`}>
                <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border-card-border/80 p-2 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/20 via-transparent to-accent-cyan/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img
                      src={heroImageUrl}
                      alt={heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* DYNAMIC REORDERABLE SECTIONS */}
        {orderToUse.map((key) => renderSectionByKey(key))}

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 mb-12 sm:mb-20">
          <div className="rounded-3xl p-6 sm:p-10 md:p-12 glass-panel border-accent-teal/30 bg-gradient-to-r from-accent-teal/10 via-background to-accent-cyan/10 text-center relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Building or Hiring for the Next Wave of AI?
            </h2>
            <p className="text-foreground/80 max-w-xl mx-auto text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Open to AI Product Manager and AI Engineer roles at high-impact labs and product companies. Let's discuss strategy, agentic architectures, and roadmap execution.
            </p>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-teal text-background font-extrabold text-sm sm:text-base shadow-lg shadow-accent-teal/20 hover:bg-accent-cyan hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px]"
            >
              Get in Touch with Chiagoziem
            </Link>
          </div>
        </section>
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
