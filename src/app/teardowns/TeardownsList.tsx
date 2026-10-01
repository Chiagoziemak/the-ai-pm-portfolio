"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Filter } from "lucide-react";
import ExpandableText from "@/components/ExpandableText";
import { formatDisplayDate } from "@/lib/formatDate";
import { Teardown } from "@/data/mockData";

interface TeardownsListProps {
  initialTeardowns: Teardown[];
}

function getCardGridClasses(idx: number, total: number): string {
  // Base mobile (< md): 1 column full width
  let classes = "col-span-1";

  // Tablet (md: to < lg): 2-column grid (each card spans 6 of 12 columns)
  const isTabletOddTotal = total % 2 === 1;
  if (isTabletOddTotal && idx === total - 1) {
    classes += " md:col-span-6 md:col-start-4";
  } else {
    classes += " md:col-span-6 md:col-start-auto";
  }

  // Desktop (lg:): 3-column grid (each card spans 4 of 12 columns)
  const desktopRemainder = total % 3;
  if (desktopRemainder === 1) {
    // 1 orphan card on final row (centered in middle column: cols 5-8 of 12)
    if (idx === total - 1) {
      classes += " lg:col-span-4 lg:col-start-5";
    } else {
      classes += " lg:col-span-4 lg:col-start-auto";
    }
  } else if (desktopRemainder === 2) {
    // 2 cards on final row (centered symmetrically: cols 3-6 and cols 7-10 of 12)
    if (idx === total - 2) {
      classes += " lg:col-span-4 lg:col-start-3";
    } else {
      classes += " lg:col-span-4 lg:col-start-auto";
    }
  } else {
    // 0 remainder (full rows of 3: cols 1-12)
    classes += " lg:col-span-4 lg:col-start-auto";
  }

  return classes;
}

export default function TeardownsList({ initialTeardowns }: TeardownsListProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const uniqueCategories = Array.from(new Set(initialTeardowns.map((item) => item.category)));
  const categories = ["All", ...uniqueCategories];

  const filteredTeardowns = activeFilter === "All"
    ? initialTeardowns
    : initialTeardowns.filter(item => item.category === activeFilter);

  const total = filteredTeardowns.length;

  return (
    <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center md:text-left mb-12">
        <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Product Deconstructions</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">Product Teardowns</h1>
        <p className="text-foreground/70 mt-3 max-w-2xl text-base sm:text-lg">
          In-depth product teardowns evaluating user research, market opportunities, RICE prioritization, and strategic recommendations for top SaaS, AI, and consumer platforms.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-card-border pb-6 mb-10 gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                activeFilter === category
                  ? "bg-accent-teal text-background shadow-md"
                  : "glass-panel text-foreground/80 hover:bg-card-border/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-foreground/60">
          <Filter size={14} className="text-accent-cyan" />
          Showing {filteredTeardowns.length} deconstruction{filteredTeardowns.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Teardowns Grid (12-column grid for deterministic orphan centering across breakpoints) */}
      {filteredTeardowns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredTeardowns.map((teardown, idx) => {
            const gridClasses = getCardGridClasses(idx, total);

            return (
              <article
                key={teardown.slug}
                className={`flex flex-col rounded-2xl overflow-hidden glass-panel border-card-border hover:-translate-y-2 hover:border-accent-teal/40 hover:shadow-lg transition-all duration-300 group w-full h-full ${gridClasses}`}
              >
                {/* Thumbnail */}
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
                  {teardown.coverImage ? (
                    <img 
                      src={teardown.coverImage} 
                      alt={teardown.coverImageAlt || `${teardown.title} — Product Teardown Cover`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center text-slate-700 font-extrabold group-hover:scale-105 transition-transform duration-500">
                      <Sparkles size={48} className="text-accent-teal/15" />
                    </div>
                  )}
                </div>

                {/* Info body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-foreground/50 font-semibold">{formatDisplayDate(teardown.date)}</span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-3 leading-snug group-hover:text-accent-teal transition-colors break-words">
                      {teardown.title}
                    </h3>
                    {teardown.summary && (
                      <div className="mb-4">
                        <ExpandableText
                          text={teardown.summary}
                          collapsedLines={3}
                          className="text-sm text-foreground/75 leading-relaxed"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t border-card-border/30">
                    <Link
                      href={`/teardowns/${teardown.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:underline"
                    >
                      Read teardown
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-card-border rounded-2xl glass-panel">
          <p className="text-foreground/50 font-medium">No teardowns found in this category.</p>
        </div>
      )}
    </main>
  );
}
