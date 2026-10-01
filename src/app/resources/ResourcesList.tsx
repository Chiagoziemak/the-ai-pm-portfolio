"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Filter, Sparkles, CheckCircle, Download, FileText } from "lucide-react";
import ExpandableText from "@/components/ExpandableText";
import type { Resource } from "@/sanity/queries";

interface ResourcesListProps {
  resources: Resource[];
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Extract available resource types
  const typeMap: Record<string, string> = {
    "e-book": "E-Books",
    template: "Templates",
    guide: "Guides",
    checklist: "Checklists",
    framework: "Frameworks",
    tool: "Tools",
  };

  const rawTypes = Array.from(new Set(resources.map((r) => r.resourceType).filter(Boolean))) as string[];
  const categories = ["All", ...rawTypes.map((t) => typeMap[t] || t.toUpperCase())];

  const filteredResources = activeFilter === "All"
    ? resources
    : resources.filter((item) => {
        const readableType = (item.resourceType && typeMap[item.resourceType]) || item.resourceType?.toUpperCase();
        return readableType === activeFilter;
      });

  const featuredResource = filteredResources.find((r) => r.featured === true) || (filteredResources.length > 0 ? filteredResources[0] : null);
  const regularResources = filteredResources.filter((r) => r.slug !== featuredResource?.slug);

  return (
    <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center md:text-left mb-10 sm:mb-14">
        <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">
          Digital Resources &amp; Playbooks
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">
          Resources &amp; E-Books
        </h1>
        <p className="text-foreground/75 mt-3 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
          Tactical e-books, case study templates, PRD blueprints, and AI prompt kits designed to help Product Managers build and launch high-impact AI products.
        </p>
      </div>

      {/* Filter Bar */}
      {categories.length > 2 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-card-border pb-6 mb-10 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer min-h-[40px] ${
                  activeFilter === cat
                    ? "bg-accent-teal text-background shadow-md shadow-accent-teal/20"
                    : "glass-panel text-foreground/80 hover:bg-card-border/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-foreground/60">
            <Filter size={14} className="text-accent-cyan" />
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      {/* Featured Resource Spotlight (If present) */}
      {featuredResource && (
        <section className="mb-12 sm:mb-16">
          <div className="w-full group rounded-3xl overflow-hidden glass-panel border-card-border/80 hover:border-accent-teal/50 hover:shadow-2xl transition-all duration-500 relative bg-gradient-to-br from-card/95 via-card/60 to-background">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-accent-teal/10 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 p-6 sm:p-8 lg:p-12 items-center">
              {/* Media column */}
              <div className="lg:col-span-5 w-full h-[260px] sm:h-[340px] lg:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-950 to-background border border-card-border/40 p-4 sm:p-6 flex items-center justify-center relative shadow-inner">
                {featuredResource.coverImage ? (
                  <img
                    src={featuredResource.coverImage}
                    alt={featuredResource.coverImageAlt || `${featuredResource.title} Cover`}
                    className="w-full h-full object-contain rounded-xl drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent-teal/15 via-card to-background flex flex-col items-center justify-center gap-3">
                    <BookOpen size={56} className="text-accent-teal/40" />
                    <span className="text-xs font-mono text-accent-teal/70 uppercase tracking-widest font-bold">
                      {featuredResource.resourceType || "E-Book"}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Content column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-3 sm:mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-teal text-background">
                      {featuredResource.badge || "Featured Resource"}
                    </span>
                    {featuredResource.status && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>{featuredResource.status}</span>
                      </div>
                    )}
                    {featuredResource.priceText && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black tracking-wider bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                        {featuredResource.originalPriceText && (
                          <span className="line-through opacity-60 mr-1.5 font-normal">{featuredResource.originalPriceText}</span>
                        )}
                        {featuredResource.priceText}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground group-hover:text-accent-teal transition-colors mb-2 leading-tight break-words">
                    {featuredResource.title}
                  </h2>

                  {featuredResource.subtitle && (
                    <p className="text-sm sm:text-base font-semibold text-accent-cyan mb-3 leading-snug">
                      {featuredResource.subtitle}
                    </p>
                  )}

                  {featuredResource.summary && (
                    <div className="mb-6">
                      <ExpandableText
                        text={featuredResource.summary}
                        collapsedLines={3}
                        className="text-xs sm:text-sm text-foreground/80 leading-relaxed"
                      />
                    </div>
                  )}
                </div>

                <div>
                  {/* Format Details */}
                  {Array.isArray(featuredResource.formatDetails) && featuredResource.formatDetails.length > 0 && (
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {featuredResource.formatDetails.slice(0, 4).map((detail, idx) => (
                        <div
                          key={idx}
                          className="px-3.5 py-2 rounded-xl bg-card-border/20 border border-card-border/40 text-xs text-foreground/85 font-medium flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal flex-shrink-0"></span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-card-border/30">
                    {featuredResource.ctaUrl ? (
                      <a
                        href={featuredResource.ctaUrl.startsWith("http") ? featuredResource.ctaUrl : `https://${featuredResource.ctaUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-xs sm:text-sm shadow-lg shadow-accent-teal/20 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[44px]"
                      >
                        {featuredResource.ctaText || "Get Instant Access"} <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <Link
                        href={`/resources/${featuredResource.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-teal to-accent-cyan text-background font-extrabold text-xs sm:text-sm shadow-lg shadow-accent-teal/20 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[44px]"
                      >
                        {featuredResource.ctaText || "Get Instant Access"} <ArrowUpRight size={16} />
                      </Link>
                    )}

                    <Link
                      href={`/resources/${featuredResource.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel text-foreground font-bold text-xs sm:text-sm hover:text-accent-teal hover:border-accent-teal/40 transition-all min-h-[44px]"
                    >
                      <span>Explore Overview &amp; Curriculum</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Other Resources */}
      {regularResources.length > 0 && (
        <section>
          {featuredResource && (
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 text-foreground">
              More Resources &amp; Toolkits
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularResources.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col rounded-3xl overflow-hidden glass-panel border-card-border/70 hover:-translate-y-1.5 hover:border-accent-teal/40 hover:shadow-xl transition-all duration-300 group w-full h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950 flex items-center justify-center p-3 border-b border-card-border/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10"></div>
                  <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-accent-teal text-background">
                      {item.resourceType || "Resource"}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider rounded-md bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.priceText && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold tracking-wider rounded-md bg-card/90 text-foreground border border-card-border">
                        {item.priceText}
                      </span>
                    </div>
                  )}
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.coverImageAlt || `${item.title} Cover`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 z-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-card/80 to-background flex items-center justify-center">
                      <BookOpen size={40} className="text-accent-teal/30" />
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-foreground group-hover:text-accent-teal transition-colors mb-1.5 leading-snug break-words">
                      {item.title}
                    </h4>

                    {item.subtitle && (
                      <p className="text-xs font-semibold text-accent-cyan mb-3 line-clamp-2">
                        {item.subtitle}
                      </p>
                    )}

                    {item.summary && (
                      <div className="mb-4">
                        <ExpandableText
                          text={item.summary}
                          collapsedLines={3}
                          className="text-xs sm:text-sm text-foreground/75 leading-relaxed"
                        />
                      </div>
                    )}

                    {/* Quick Format pills */}
                    {Array.isArray(item.formatDetails) && item.formatDetails.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.formatDetails.slice(0, 2).map((detail, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-card-border/30 text-foreground/80 border border-card-border/50"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-auto pt-4 border-t border-card-border/30 flex items-center justify-between gap-2">
                    <Link
                      href={`/resources/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-accent-teal hover:text-accent-cyan transition-colors min-h-[36px]"
                    >
                      <span>Overview &amp; Details</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    {item.ctaUrl && (
                      <a
                        href={item.ctaUrl.startsWith("http") ? item.ctaUrl : `https://${item.ctaUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-accent-teal/15 hover:bg-accent-teal text-accent-teal hover:text-background text-xs font-bold transition-all min-h-[36px] inline-flex items-center gap-1"
                      >
                        <span>{item.ctaText || "Get"}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-20 px-4 glass-panel rounded-3xl border border-card-border max-w-xl mx-auto my-8">
          <BookOpen size={48} className="mx-auto text-accent-teal/40 mb-4" />
          <h3 className="text-xl font-bold mb-2">No resources found</h3>
          <p className="text-foreground/60 text-sm mb-6">
            There are currently no published resources in this category. New playbooks and guides will be published soon.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-accent-teal text-background font-bold text-xs hover:bg-accent-cyan transition-all"
          >
            Return Home
          </Link>
        </div>
      )}
    </main>
  );
}
