import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeardowns, getCaseStudies, getHomePageData, getSiteSettings } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { mockTeardowns, mockCaseStudies } from "@/data/mockData";
import { ArrowUpRight, Brain, Compass } from "lucide-react";

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

  const heroImageUrl = homeData.heroImage
    ? urlForImage(homeData.heroImage)?.width(800).height(1000).url() || homeData.heroImageUrl
    : homeData.heroImageUrl;

  const heroImageAlt = homeData.heroImageAlt || homeData.heroImage?.alt || heroHeading;
  const heroImagePosition = homeData.heroImagePosition === "left" ? "left" : "right";

  const heroTagChips = Array.isArray(homeData.heroTagChips) ? homeData.heroTagChips : [];
  const currentStack = Array.isArray(homeData.currentStack) ? homeData.currentStack : [];
  const learningTrack = Array.isArray(homeData.learningTrack) ? homeData.learningTrack : [];
  const processSteps = Array.isArray(homeData.processSteps) ? homeData.processSteps : [];
  const testimonials = Array.isArray(homeData.testimonials) ? homeData.testimonials : [];

  // Default section order sequence:
  // 1. Featured Work Strip (featuredWorkStrip)
  // 2. Case Studies (caseStudies)
  // 3. Teardowns (teardowns)
  // 4. How I Work (howIWork)
  // 5. Testimonials (testimonials)
  // 6. Learning Path (learningTrack)
  const defaultOrder = [
    "featuredWorkStrip",
    "caseStudies",
    "teardowns",
    "howIWork",
    "testimonials",
    "learningTrack",
  ];

  const orderToUse = (Array.isArray(homeData.sectionOrder) && homeData.sectionOrder.length > 0)
    ? homeData.sectionOrder
    : defaultOrder;

  // Marquee items
  const marqueeItems = [
    { title: "ResumeGenie AI Agent", desc: "AI Autopilot", color: "from-cyan-500/20 to-teal-500/20" },
    { title: "Netflix Localization & Pricing", desc: "Teardown", color: "from-red-500/20 to-pink-500/20" },
    { title: "Claude AI Strategy Teardown", desc: "Teardown", color: "from-purple-500/20 to-indigo-500/20" },
    { title: "Canva Creator Workflows", desc: "Teardown", color: "from-blue-500/20 to-cyan-500/20" },
    { title: "Chowdeck Marketplace Study", desc: "Teardown", color: "from-amber-500/20 to-orange-500/20" },
    { title: "WhatsApp Media & Status Controls", desc: "Teardown", color: "from-emerald-500/20 to-teal-500/20" },
  ];

  const renderSectionByKey = (key: string) => {
    switch (key) {
      case "featuredWorkStrip":
        return (
          <section key="featuredWorkStrip" className="w-full border-y border-card-border/40 py-4 bg-background/50 backdrop-blur-md overflow-hidden relative my-6">
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
        );

      case "caseStudies":
        return (featuredCaseStudy || otherCaseStudy) ? (
          <section key="caseStudies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Deep Dives &amp; Work</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Featured Case Studies</h2>
              </div>
              <Link
                href="/case-studies"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline transition-colors duration-200"
              >
                Explore all case studies <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Featured Case Study */}
              {featuredCaseStudy && (
                <div className="lg:col-span-7 group rounded-3xl overflow-hidden glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-between p-6 sm:p-8 relative">
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

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors duration-200 mb-3 leading-snug">
                      {featuredCaseStudy.title}
                    </h3>

                    {featuredCaseStudy.summary && (
                      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6">
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
                            <span className="block text-xl font-extrabold text-accent-teal">{stat.value}</span>
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
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors duration-200"
                    >
                      Read Full Case Study <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Secondary Featured Case Study */}
              {otherCaseStudy && (
                <div className="lg:col-span-5 group rounded-3xl overflow-hidden glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-between p-6 sm:p-8 relative">
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

                    <h3 className="text-xl sm:text-2xl font-extrabold text-foreground group-hover:text-accent-teal transition-colors duration-200 mb-3 leading-snug">
                      {otherCaseStudy.title}
                    </h3>

                    {otherCaseStudy.summary && (
                      <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                        {otherCaseStudy.summary}
                      </p>
                    )}
                  </div>

                  {/* Card Stat-Pair Blocks if present */}
                  {Array.isArray(otherCaseStudy.cardStats) && otherCaseStudy.cardStats.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 gap-3">
                      {otherCaseStudy.cardStats.map((stat, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-center">
                          <span className="block text-xl font-extrabold text-accent-teal">{stat.value}</span>
                          <span className="text-[10px] font-mono text-foreground/70 uppercase">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/case-studies/${otherCaseStudy.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-accent-cyan hover:text-accent-teal transition-colors duration-200"
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
          <section key="teardowns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Product Deconstruction</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Strategic Product Teardowns</h2>
              </div>
              <Link
                href="/teardowns"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:underline transition-colors duration-200"
              >
                View all teardowns <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTeardowns.map((teardown, idx) => (
                <Link
                  key={teardown.slug || idx}
                  href={`/teardowns/${teardown.slug}`}
                  className="group rounded-2xl p-6 glass-panel border-card-border/60 hover:border-accent-teal/40 hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 mb-3">
                      {teardown.category && <span className="px-2 py-0.5 rounded-md bg-card-border/30 text-foreground/80 font-bold">{teardown.category}</span>}
                      {teardown.readTime && <span>{teardown.readTime}</span>}
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent-teal transition-colors duration-200 mb-2 leading-snug">
                      {teardown.title}
                    </h3>
                    {teardown.summary && (
                      <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed mb-4">
                        {teardown.summary}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-card-border/30 text-xs font-semibold text-accent-teal group-hover:text-accent-cyan transition-colors duration-200">
                    <span>Explore Teardown</span>
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null;

      case "howIWork":
        return processSteps.length > 0 ? (
          <section key="howIWork" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Operating Framework</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">How I Work</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel border-card-border/60 bg-card/30 flex flex-col justify-between hover:border-accent-teal/40 transition-all duration-300 ease-out group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-accent-teal/60 group-hover:text-accent-teal transition-colors duration-200">
                        {step.number || `0${idx + 1}`}
                      </span>
                      {step.icon && (
                        <span className="text-xs font-mono text-foreground/50 px-2 py-0.5 rounded bg-card-border/30">
                          {step.icon}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    {step.description && <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mb-4">{step.description}</p>}
                  </div>

                  {Array.isArray(step.deliverables) && step.deliverables.length > 0 && (
                    <div className="pt-4 border-t border-card-border/30">
                      <span className="text-[10px] font-mono uppercase text-accent-teal/80 font-bold block mb-1.5">Deliverables</span>
                      <div className="flex flex-wrap gap-1">
                        {step.deliverables.map((del, dIdx) => (
                          <span key={dIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-card-border/30 text-foreground/70">
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "testimonials":
        return testimonials.length > 0 ? (
          <section key="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Endorsements</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Testimonials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl glass-panel border-card-border/60 bg-card/30 flex flex-col justify-between relative hover:border-accent-teal/40 transition-all duration-300 ease-out"
                >
                  <div className="mb-6">
                    {item.quote && (
                      <p className="text-base text-foreground/90 italic leading-relaxed mb-4">
                        "{item.quote}"
                      </p>
                    )}
                    {item.context && (
                      <span className="inline-block text-xs font-mono text-accent-teal bg-accent-teal/10 border border-accent-teal/20 px-3 py-1 rounded-full">
                        {item.context}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-card-border/30">
                    <div className="flex items-center gap-3">
                      {item.authorPhotoUrl ? (
                        <img
                          src={item.authorPhotoUrl}
                          alt={item.authorName}
                          className="w-10 h-10 rounded-full object-cover border border-card-border"
                        />
                      ) : (
                        item.authorName && (
                          <div className="w-10 h-10 rounded-full bg-accent-teal/20 border border-accent-teal/40 flex items-center justify-center font-bold text-accent-teal text-sm">
                            {item.authorName.charAt(0)}
                          </div>
                        )
                      )}
                      <div>
                        {item.authorName && <h4 className="text-sm font-bold text-foreground">{item.authorName}</h4>}
                        {(item.authorRole || item.authorCompany) && (
                          <p className="text-xs text-foreground/60">
                            {item.authorRole}
                            {item.authorRole && item.authorCompany ? " • " : ""}
                            {item.authorCompany}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.linkedinUrl && (
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1 transition-colors duration-200"
                      >
                        LinkedIn <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "learningTrack":
        return learningTrack.length > 0 ? (
          <section key="learningTrack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Continuous Evolution</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Learning Path</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningTrack.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel border-card-border/60 bg-card/30 flex flex-col justify-between hover:border-accent-teal/40 transition-all duration-300 ease-out"
                >
                  <div>
                    {(item.provider || item.status) && (
                      <div className="flex items-center justify-between gap-2 mb-3">
                        {item.provider && (
                          <span className="text-xs font-mono text-accent-cyan tracking-wider font-semibold">
                            {item.provider}
                          </span>
                        )}
                        {item.status && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent-teal/15 text-accent-teal border border-accent-teal/30">
                            {item.status}
                          </span>
                        )}
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
      />

      <main className="flex-grow z-10">
        {/* HERO SECTION (Fixed at top) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className={`${heroImageUrl ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col items-start text-left ${heroImageUrl && heroImagePosition === "left" ? "lg:order-2" : "lg:order-1"}`}>
              {/* Badge & Floating Tag Chips */}
              {(availabilityBadge || heroTagChips.length > 0) && (
                <div className="flex flex-wrap items-center gap-2.5 mb-6">
                  {availabilityBadge && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-panel text-accent-teal border-accent-teal/20 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {availabilityBadge}
                    </div>
                  )}

                  {heroTagChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono tracking-wider glass-panel text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10"
                    >
                      ✦ {chip}
                    </span>
                  ))}
                </div>
              )}

              {/* Name & Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                {heroHeading}
              </h1>
              {heroSubheading && (
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent-cyan via-accent-teal to-teal-400 bg-clip-text text-transparent mt-3 mb-6">
                  {heroSubheading}
                </h2>
              )}

              {/* Bio */}
              {introText && (
                <p className="text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed mb-6">
                  {introText}
                </p>
              )}

              {/* Current Stack List */}
              {currentStack.length > 0 && (
                <div className="mb-8 w-full max-w-xl p-3.5 rounded-2xl glass-panel border-card-border/60 bg-card/20">
                  <span className="text-[11px] font-mono text-accent-teal uppercase tracking-widest block mb-2 font-bold">
                    Current Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentStack.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-card-border/30 text-foreground/90 border border-card-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs (Dynamic from homeData.ctaButtons if populated) */}
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                {Array.isArray(homeData.ctaButtons) && homeData.ctaButtons.length > 0 ? (
                  homeData.ctaButtons.map((btn, idx) => (
                    <Link
                      key={idx}
                      href={btn.url || "#"}
                      className={
                        idx === 0
                          ? "w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 ease-out"
                          : "w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel text-foreground font-bold text-sm flex items-center justify-center gap-2 border-card-border hover:border-accent-teal/50 hover:bg-foreground/5 transition-all duration-300 ease-out"
                      }
                    >
                      {idx === 0 && <Brain size={18} />}
                      {idx === 1 && <Compass size={18} className="text-accent-teal" />}
                      {btn.label}
                    </Link>
                  ))
                ) : (
                  <>
                    <Link
                      href="/case-studies/resumegenie-ai-agent"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 ease-out"
                    >
                      <Brain size={18} />
                      Explore ResumeGenie AI Case Study
                    </Link>
                    <Link
                      href="/teardowns"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel text-foreground font-bold text-sm flex items-center justify-center gap-2 border-card-border hover:border-accent-teal/50 hover:bg-foreground/5 transition-all duration-300 ease-out"
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
              <div className={`lg:col-span-5 flex justify-center ${heroImagePosition === "left" ? "lg:order-1 lg:justify-start" : "lg:order-2 lg:justify-end"}`}>
                <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border-card-border/80 p-2 shadow-xl group">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img
                      src={heroImageUrl}
                      alt={heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-teal text-background font-extrabold text-sm shadow-sm hover:bg-accent-cyan hover:shadow-md transition-all duration-300 ease-out"
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
