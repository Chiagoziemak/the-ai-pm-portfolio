"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface TestimonialItem {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorCompany?: string;
  authorPhotoUrl?: string;
  linkedinUrl?: string;
  context?: string;
}

export interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
  scrollInterval?: number; // In seconds. Default 5. 0 = disabled.
}

const LONG_QUOTE_THRESHOLD = 260;

function getQuoteDisplay(
  quote: string | undefined,
  isExpanded: boolean
): { isLong: boolean; displayText: string } {
  if (!quote) return { isLong: false, displayText: "" };
  const trimmed = quote.trim();

  // Check if quote exceeds threshold or contains multiple paragraphs
  const hasMultiParagraphs = trimmed.includes("\n\n");
  const isLong = trimmed.length > LONG_QUOTE_THRESHOLD || hasMultiParagraphs;

  if (!isLong || isExpanded) {
    return { isLong, displayText: trimmed };
  }

  // First paragraph check
  const firstPara = trimmed.split(/\n\s*\n/)[0];
  if (firstPara.length <= LONG_QUOTE_THRESHOLD && firstPara.length >= 120) {
    return { isLong: true, displayText: firstPara };
  }

  // Substring up to threshold, cutting cleanly at a word boundary
  const sub = trimmed.slice(0, LONG_QUOTE_THRESHOLD);
  const lastSpace = sub.lastIndexOf(" ");
  const cleanCut = lastSpace > 140 ? sub.slice(0, lastSpace) : sub;
  return {
    isLong: true,
    displayText: `${cleanCut.replace(/[.,;:]+$/, "")}...`,
  };
}

export default function TestimonialsCarousel({
  testimonials = [],
  scrollInterval = 5,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = testimonials.length;
  const intervalSeconds = typeof scrollInterval === "number" ? scrollInterval : 5;
  const shouldAutoScroll = total > 1 && intervalSeconds > 0 && !isPaused && !isExpanded;

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleNext = () => {
    if (total <= 1) return;
    setIsFading(true);
    setIsExpanded(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsFading(false);
    }, 250);
  };

  const handlePrev = () => {
    if (total <= 1) return;
    setIsFading(true);
    setIsExpanded(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsFading(false);
    }, 250);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setIsFading(true);
    setIsExpanded(false);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsFading(false);
    }, 250);
  };

  useEffect(() => {
    resetTimer();
    if (shouldAutoScroll) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, intervalSeconds * 1000);
    }
    return () => resetTimer();
  }, [currentIndex, isPaused, isExpanded, intervalSeconds, total]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      resetTimer();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      resetTimer();
      handleNext();
    }
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      resetTimer();
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      resetTimer();
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  const currentItem = testimonials[currentIndex] || testimonials[0];
  const { isLong, displayText } = getQuoteDisplay(currentItem.quote, isExpanded);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">
          Endorsements
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1.5 sm:mt-2 tracking-tight text-foreground">
          Testimonials
        </h2>
      </div>

      {/* Carousel Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Testimonials Carousel"
        aria-live="polite"
        className="relative w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/40 rounded-3xl"
      >
        {/* Active Testimonial Card (Guaranteed 100% mobile slide width, shared initial min-height, centered) */}
        <div className="w-full flex justify-center px-0 sm:px-4">
          <div
            key={currentIndex}
            style={{ flex: "0 0 100%" }}
            className={`w-full max-w-3xl min-h-[380px] sm:min-h-[340px] md:min-h-[320px] p-6 sm:p-8 md:p-10 rounded-3xl glass-panel border border-card-border/80 bg-card/50 flex flex-col justify-between shadow-xl transition-all duration-300 transform ${
              isFading ? "opacity-0 scale-[0.99] translate-y-1" : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            {/* Context Badge & Quote & Expandable Section */}
            <div className="flex-1 flex flex-col justify-start mb-6 sm:mb-8">
              {currentItem.context && (
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block text-[11px] sm:text-xs font-mono text-accent-teal bg-accent-teal/10 border border-accent-teal/20 px-3 py-1 rounded-full font-semibold">
                    ✦ {currentItem.context}
                  </span>
                </div>
              )}

              {currentItem.quote && (
                <blockquote className="text-base sm:text-lg md:text-xl text-foreground/90 italic leading-relaxed font-serif whitespace-pre-line">
                  "{displayText}"
                </blockquote>
              )}

              {/* See More / See Less Toggle for Long Testimonials */}
              {isLong && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded((prev) => !prev);
                      resetTimer();
                    }}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-accent-teal hover:text-accent-cyan underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded transition-colors"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "See less" : "See more"}
                  </button>
                </div>
              )}
            </div>

            {/* Author Information Area (Always aligned at the bottom with mt-auto) */}
            <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between pt-5 sm:pt-6 border-t border-card-border/40 gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {currentItem.authorPhotoUrl ? (
                  <img
                    src={currentItem.authorPhotoUrl}
                    alt={currentItem.authorName || "Author"}
                    className="w-12 h-12 rounded-full object-cover border border-card-border/80 shadow-sm flex-shrink-0"
                  />
                ) : (
                  currentItem.authorName && (
                    <div className="w-12 h-12 rounded-full bg-accent-teal/20 border border-accent-teal/40 flex items-center justify-center font-bold text-accent-teal text-base shadow-sm flex-shrink-0">
                      {currentItem.authorName.charAt(0)}
                    </div>
                  )
                )}
                <div className="min-w-0">
                  {currentItem.authorName && (
                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                      {currentItem.authorName}
                    </h3>
                  )}
                  {(currentItem.authorRole || currentItem.authorCompany) && (
                    <p className="text-xs sm:text-sm text-foreground/60 truncate">
                      {currentItem.authorRole}
                      {currentItem.authorRole && currentItem.authorCompany ? " • " : ""}
                      {currentItem.authorCompany}
                    </p>
                  )}
                </div>
              </div>

              {currentItem.linkedinUrl && (
                <a
                  href={currentItem.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-xs sm:text-sm font-bold text-accent-teal hover:text-accent-cyan flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent-teal/10 hover:bg-accent-teal/20 border border-accent-teal/20 transition-all min-h-[44px] flex-shrink-0 shadow-sm"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight size={14} className="flex-shrink-0" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls (Centered underneath card with ~44px touch targets) */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Previous Arrow Button */}
            <button
              onClick={() => {
                resetTimer();
                handlePrev();
              }}
              aria-label="Previous testimonial"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-panel border border-card-border/80 text-foreground hover:bg-card-border/40 hover:border-accent-teal/50 hover:text-accent-teal active:scale-95 transition-all flex items-center justify-center shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Centered Pagination Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    resetTimer();
                    handleSelect(idx);
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === currentIndex ? "true" : undefined}
                  className="p-2 min-w-[32px] min-h-[44px] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50 rounded-full"
                >
                  <span
                    className={`h-2.5 rounded-full transition-all duration-300 block ${
                      idx === currentIndex
                        ? "w-7 sm:w-8 bg-accent-teal"
                        : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next Arrow Button */}
            <button
              onClick={() => {
                resetTimer();
                handleNext();
              }}
              aria-label="Next testimonial"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-panel border border-card-border/80 text-foreground hover:bg-card-border/40 hover:border-accent-teal/50 hover:text-accent-teal active:scale-95 transition-all flex items-center justify-center shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
