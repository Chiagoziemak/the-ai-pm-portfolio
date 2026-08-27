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

export default function TestimonialsCarousel({
  testimonials = [],
  scrollInterval = 5,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = testimonials.length;
  const intervalSeconds = typeof scrollInterval === "number" ? scrollInterval : 5;
  const shouldAutoScroll = total > 1 && intervalSeconds > 0 && !isPaused;

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleNext = () => {
    if (total <= 1) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsFading(false);
    }, 250);
  };

  const handlePrev = () => {
    if (total <= 1) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsFading(false);
    }, 250);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setIsFading(true);
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
  }, [currentIndex, isPaused, intervalSeconds, total]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      resetTimer();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      resetTimer();
      handleNext();
    }
  };

  if (total === 0) return null;

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const currentItem = testimonials[currentIndex] || testimonials[0];
  const prevItem = testimonials[prevIndex];
  const nextItem = testimonials[nextIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-center sm:text-left">
        <div>
          <span className="text-xs uppercase tracking-widest text-accent-teal font-extrabold">Endorsements</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight text-foreground">Testimonials</h2>
        </div>

        {/* Top-Right Header Arrows (If > 1 item) */}
        {total > 1 && (
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <button
              onClick={() => {
                resetTimer();
                handlePrev();
              }}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full glass-panel border border-card-border/80 text-foreground hover:bg-card-border/40 hover:border-accent-teal/50 hover:text-accent-teal transition-all flex items-center justify-center shadow-sm active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => {
                resetTimer();
                handleNext();
              }}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full glass-panel border border-card-border/80 text-foreground hover:bg-card-border/40 hover:border-accent-teal/50 hover:text-accent-teal transition-all flex items-center justify-center shadow-sm active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Area with Side Peeking Cards */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Testimonials Carousel"
        className="relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-teal/40 rounded-3xl py-4"
      >
        {/* If single testimonial: Simple centered card */}
        {total === 1 ? (
          <div className="w-full max-w-3xl p-8 md:p-12 rounded-3xl glass-panel border-card-border/80 bg-card/40 flex flex-col justify-between relative shadow-lg">
            <div className="mb-8">
              {currentItem.context && (
                <span className="inline-block text-xs font-mono text-accent-teal bg-accent-teal/10 border border-accent-teal/20 px-3.5 py-1 rounded-full mb-4 font-semibold">
                  ✦ {currentItem.context}
                </span>
              )}
              {currentItem.quote && (
                <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground/90 italic leading-relaxed font-serif">
                  "{currentItem.quote}"
                </blockquote>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-card-border/40 gap-4">
              <div className="flex items-center gap-4">
                {currentItem.authorPhotoUrl ? (
                  <img
                    src={currentItem.authorPhotoUrl}
                    alt={currentItem.authorName || "Author"}
                    className="w-12 h-12 rounded-full object-cover border border-card-border/80 shadow-sm"
                  />
                ) : (
                  currentItem.authorName && (
                    <div className="w-12 h-12 rounded-full bg-accent-teal/20 border border-accent-teal/40 flex items-center justify-center font-bold text-accent-teal text-base shadow-sm">
                      {currentItem.authorName.charAt(0)}
                    </div>
                  )
                )}
                <div>
                  {currentItem.authorName && (
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {currentItem.authorName}
                    </h3>
                  )}
                  {(currentItem.authorRole || currentItem.authorCompany) && (
                    <p className="text-xs sm:text-sm text-foreground/60">
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
                  className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent-teal/10 border border-accent-teal/20 hover:bg-accent-teal/20 transition-all"
                >
                  LinkedIn Profile <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        ) : (
          /* Multi-item Carousel with Side Peeking Cards & Circular Edge Arrows */
          <div className="w-full relative flex items-center justify-center min-h-[340px]">

            {/* Left Circular Arrow Button */}
            <button
              onClick={() => {
                resetTimer();
                handlePrev();
              }}
              aria-label="Previous testimonial"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border border-card-border bg-background/90 text-foreground shadow-xl hover:scale-110 hover:border-accent-teal hover:text-accent-teal transition-all flex items-center justify-center z-30 active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Circular Arrow Button */}
            <button
              onClick={() => {
                resetTimer();
                handleNext();
              }}
              aria-label="Next testimonial"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border border-card-border bg-background/90 text-foreground shadow-xl hover:scale-110 hover:border-accent-teal hover:text-accent-teal transition-all flex items-center justify-center z-30 active:scale-95"
            >
              <ChevronRight size={22} />
            </button>

            {/* Cards Stage Container */}
            <div className="w-full flex items-center justify-center relative overflow-hidden px-8 sm:px-14">
              
              {/* Left Peeking Card */}
              <div
                onClick={() => {
                  resetTimer();
                  handlePrev();
                }}
                className="hidden lg:block absolute left-[-15%] xl:left-[-10%] w-[45%] p-6 sm:p-8 rounded-3xl glass-panel border-card-border/40 bg-card/20 opacity-35 scale-90 blur-[1px] pointer-events-auto cursor-pointer hover:opacity-50 transition-all duration-500 select-none z-10"
              >
                <p className="text-sm italic line-clamp-3 text-foreground/80 font-serif mb-4">"{prevItem.quote}"</p>
                <h4 className="text-xs font-bold text-foreground">{prevItem.authorName}</h4>
              </div>

              {/* CENTER ACTIVE CARD */}
              <div
                className={`w-full max-w-2xl p-8 sm:p-10 md:p-12 rounded-3xl glass-panel border-card-border/80 bg-card/50 flex flex-col justify-between relative shadow-xl z-20 transition-all duration-500 transform ${
                  isFading ? "opacity-30 scale-[0.98] blur-[2px]" : "opacity-100 scale-100 blur-0"
                }`}
              >
                <div className="mb-6">
                  {currentItem.context && (
                    <span className="inline-block text-xs font-mono text-accent-teal bg-accent-teal/10 border border-accent-teal/20 px-3.5 py-1 rounded-full mb-4 font-semibold">
                      ✦ {currentItem.context}
                    </span>
                  )}
                  {currentItem.quote && (
                    <blockquote className="text-base sm:text-lg md:text-xl text-foreground/90 italic leading-relaxed font-serif">
                      "{currentItem.quote}"
                    </blockquote>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between pt-6 border-t border-card-border/40 gap-4">
                  <div className="flex items-center gap-4">
                    {currentItem.authorPhotoUrl ? (
                      <img
                        src={currentItem.authorPhotoUrl}
                        alt={currentItem.authorName || "Author"}
                        className="w-12 h-12 rounded-full object-cover border border-card-border/80 shadow-sm"
                      />
                    ) : (
                      currentItem.authorName && (
                        <div className="w-12 h-12 rounded-full bg-accent-teal/20 border border-accent-teal/40 flex items-center justify-center font-bold text-accent-teal text-base shadow-sm">
                          {currentItem.authorName.charAt(0)}
                        </div>
                      )
                    )}
                    <div>
                      {currentItem.authorName && (
                        <h3 className="text-base sm:text-lg font-bold text-foreground">
                          {currentItem.authorName}
                        </h3>
                      )}
                      {(currentItem.authorRole || currentItem.authorCompany) && (
                        <p className="text-xs sm:text-sm text-foreground/60">
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
                      className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-teal/10 border border-accent-teal/20 hover:bg-accent-teal/20 transition-all"
                    >
                      LinkedIn Profile <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Peeking Card */}
              <div
                onClick={() => {
                  resetTimer();
                  handleNext();
                }}
                className="hidden lg:block absolute right-[-15%] xl:right-[-10%] w-[45%] p-6 sm:p-8 rounded-3xl glass-panel border-card-border/40 bg-card/20 opacity-35 scale-90 blur-[1px] pointer-events-auto cursor-pointer hover:opacity-50 transition-all duration-500 select-none z-10"
              >
                <p className="text-sm italic line-clamp-3 text-foreground/80 font-serif mb-4">"{nextItem.quote}"</p>
                <h4 className="text-xs font-bold text-foreground">{nextItem.authorName}</h4>
              </div>

            </div>
          </div>
        )}

        {/* Carousel Indicators / Dots (If total > 1) */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  resetTimer();
                  handleSelect(idx);
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-accent-teal"
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
