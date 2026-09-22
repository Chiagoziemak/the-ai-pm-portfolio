"use client";

import React, { useState, useRef } from "react";
import DynamicIcon from "@/components/DynamicIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface RecommendationItem {
  title: string;
  description: string;
  priority?: string;
  riceScore?: number;
}

interface RecommendationsCarouselProps {
  recommendations: (RecommendationItem | string)[];
  icon?: string;
}

export default function RecommendationsCarousel({
  recommendations,
  icon = "FiCheckSquare",
}: RecommendationsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const normalizedRecs: RecommendationItem[] = recommendations.map((rec, idx) => {
    if (typeof rec === "string") {
      return {
        title: `Recommendation ${idx + 1}`,
        description: rec,
      };
    }
    return rec;
  });

  const total = normalizedRecs.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Single recommendation - render cleanly without carousel controls
  if (total === 1) {
    const single = normalizedRecs[0];
    return (
      <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-accent-teal/30 bg-accent-teal/5">
        <div className="flex items-center gap-3 mb-6">
          <DynamicIcon name={icon} size={22} className="text-accent-teal flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Strategic Recommendations
          </h2>
        </div>
        <div className="p-4 sm:p-5 rounded-xl border border-card-border bg-card/60">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h4 className="font-bold text-base text-foreground">{single.title}</h4>
            {single.priority && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-accent-teal/10 text-accent-teal border border-accent-teal/20 font-bold">
                {single.priority} Priority
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{single.description}</p>
          {single.riceScore && (
            <div className="mt-2.5 pt-2 border-t border-card-border/30 text-xs font-mono text-accent-cyan font-semibold">
              RICE Score: {single.riceScore}
            </div>
          )}
        </div>
      </section>
    );
  }

  const activeRec = normalizedRecs[currentIndex];

  return (
    <section className="my-10 sm:my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-accent-teal/30 bg-accent-teal/5">
      {/* Header with Title and Compact Navigation Controls */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <DynamicIcon name={icon} size={22} className="text-accent-teal flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight truncate">
            Strategic Recommendations
          </h2>
        </div>

        {/* Compact Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="text-xs font-mono font-medium text-foreground/60 px-2.5 py-1 rounded-lg bg-card-border/30 border border-card-border/50 select-none">
            {currentIndex + 1} of {total}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous recommendation"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-panel border border-card-border hover:border-accent-teal text-foreground/80 hover:text-accent-teal flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next recommendation"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-panel border border-card-border hover:border-accent-teal text-foreground/80 hover:text-accent-teal flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 flex-shrink-0"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Contained Active Recommendation Card */}
      <div
        className="relative overflow-hidden w-full rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={currentIndex}
          className="p-5 sm:p-6 rounded-xl border border-card-border bg-card/60 shadow-sm animate-fadeIn"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-accent-teal text-xs font-mono font-bold px-2 py-0.5 rounded bg-accent-teal/10 border border-accent-teal/20 flex-shrink-0">
                0{currentIndex + 1}
              </span>
              <h4 className="font-bold text-base sm:text-lg text-foreground truncate">
                {activeRec.title}
              </h4>
            </div>
            {activeRec.priority && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-accent-teal/10 text-accent-teal border border-accent-teal/20 font-bold flex-shrink-0">
                {activeRec.priority.toLowerCase().includes("priority") ? activeRec.priority : `${activeRec.priority} Priority`}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            {activeRec.description}
          </p>
          {activeRec.riceScore && (
            <div className="mt-2.5 pt-2 border-t border-card-border/30 text-xs font-mono text-accent-cyan font-semibold">
              RICE Score: {activeRec.riceScore}
            </div>
          )}
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {normalizedRecs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to recommendation ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? "w-6 h-2 bg-accent-teal"
                : "w-2 h-2 bg-card-border hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
