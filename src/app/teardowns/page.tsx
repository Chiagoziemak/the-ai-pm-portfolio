"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockTeardowns } from "@/data/mockData";
import { ArrowUpRight, Sparkles, Filter } from "lucide-react";

export default function TeardownsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "LLMs", "SaaS", "Job Tech"];

  const filteredTeardowns = activeFilter === "All"
    ? mockTeardowns
    : mockTeardowns.filter(item => item.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-30 z-0"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-30 z-0"></div>

      <Navbar />

      <main className="flex-grow z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center md:text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Product Deconstructions</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">Product Teardowns</h1>
          <p className="text-foreground/70 mt-3 max-w-2xl text-base sm:text-lg">
            Analytical teardowns evaluating LLM interfaces, SaaS architecture shifts, and Job-Tech platforms. Focused on product design, user experience bottlenecks, and engineering constraints.
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

        {/* Teardowns Grid */}
        {filteredTeardowns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeardowns.map((teardown) => (
              <article
                key={teardown.slug}
                className="flex flex-col rounded-2xl overflow-hidden glass-panel border-card-border hover:-translate-y-2 hover:border-accent-teal/40 hover:shadow-lg transition-all duration-300 group"
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
                  {/* CSS gradient design representing mock image */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center text-slate-700 font-extrabold group-hover:scale-105 transition-transform duration-500">
                    <Sparkles size={48} className="text-accent-teal/15" />
                  </div>
                </div>

                {/* Info body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-foreground/50 font-semibold">{teardown.date}</span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-3 leading-snug group-hover:text-accent-teal transition-colors">
                      {teardown.title}
                    </h3>
                    <p className="text-sm text-foreground/75 line-clamp-4 leading-relaxed">
                      {teardown.summary}
                    </p>
                  </div>
                  <Link
                    href={`/teardowns/${teardown.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:underline mt-6"
                  >
                    Read teardown
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-card-border rounded-2xl glass-panel">
            <p className="text-foreground/50 font-medium">No teardowns found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
