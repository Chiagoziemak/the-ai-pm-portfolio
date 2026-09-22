"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { urlForImage } from "@/sanity/image";
import type { HeroMediaItem, HeroDisplayMode } from "@/data/mockData";

interface HeroMediaProps {
  heroImages?: HeroMediaItem[];
  coverImage?: string;
  coverImageAlt?: string;
  heroDisplayMode?: HeroDisplayMode;
  heroSliderAutoplay?: boolean;
  heroSliderInterval?: number;
  heroSliderShowPagination?: boolean;
  heroSliderShowArrows?: boolean;
  title?: string;
  variant?: "caseStudy" | "teardown";
}

interface SanitizedHeroItem {
  imageUrl: string;
  alt: string;
  label?: string;
  caption?: string;
  linkUrl?: string;
  linkLabel?: string;
}

function resolveHeroImageUrl(item: { imageUrl?: string; image?: any }): string {
  if (item.image) {
    try {
      const built = urlForImage(item.image)?.auto("format").fit("max").url();
      if (built) return built;
    } catch {
      // fallback to asset url or raw imageUrl
    }
  }
  return item.imageUrl || (item.image?.asset?.url ? item.image.asset.url : "");
}

export default function HeroMedia({
  heroImages,
  coverImage,
  coverImageAlt,
  heroDisplayMode = "single",
  heroSliderAutoplay = false,
  heroSliderInterval = 5,
  heroSliderShowPagination = true,
  heroSliderShowArrows = true,
  title = "Project",
  variant = "caseStudy",
}: HeroMediaProps) {
  // 1. Sanitize & Normalize Hero Images
  const validItems: SanitizedHeroItem[] = Array.isArray(heroImages)
    ? heroImages
        .filter((item) => Boolean(item && (item.imageUrl || (item.image && (item.image.asset || item.image._type)))))
        .map((item, idx) => {
          const resolvedUrl = resolveHeroImageUrl(item);
          return {
            imageUrl: resolvedUrl,
            alt: item.alt || `${title} — Visual ${idx + 1}`,
            label: item.label?.trim() || undefined,
            caption: item.caption?.trim() || undefined,
            linkUrl: item.linkUrl?.trim() || undefined,
            linkLabel: item.buttonLabel?.trim() || item.linkLabel?.trim() || "Visit Platform",
          };
        })
        .filter((item) => Boolean(item.imageUrl && item.imageUrl.trim() !== ""))
    : [];

  // Fallback hierarchy: if no valid items in heroImages, fallback to coverImage
  const hasCustomGallery = validItems.length > 0;
  const items: SanitizedHeroItem[] = hasCustomGallery
    ? validItems
    : coverImage
    ? [
        {
          imageUrl: coverImage,
          alt: coverImageAlt || `${title} — Cover Visual`,
        },
      ]
    : [];

  // If no visual at all, render null
  if (items.length === 0) {
    return null;
  }

  // Determine effective mode: If only 1 item, enforce single mode
  const effectiveMode = items.length === 1 ? "single" : heroDisplayMode || "single";

  // State for Slider mode
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const totalSlides = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay handler
  useEffect(() => {
    if (effectiveMode !== "slider" || !heroSliderAutoplay || totalSlides <= 1 || isPaused) {
      return;
    }

    const intervalSeconds = Math.max(heroSliderInterval || 5, 2);
    const timer = setInterval(() => {
      nextSlide();
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [effectiveMode, heroSliderAutoplay, heroSliderInterval, totalSlides, isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile Slider
  const handleTouchStart = (e: React.TouchEvent) => {
    if (effectiveMode !== "slider" || totalSlides <= 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (effectiveMode !== "slider" || touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (effectiveMode !== "slider" || touchStartXRef.current === null) return;
    const delta = touchDeltaXRef.current;
    const threshold = 45; // Minimum px to count as swipe

    if (delta > threshold) {
      prevSlide();
    } else if (delta < -threshold) {
      nextSlide();
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsPaused(false);
  };

  // Container styling matching portfolio architecture
  const containerClass =
    variant === "caseStudy"
      ? "max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12 sm:mb-16"
      : "max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16";

  // --------------------------------------------------------------------------
  // 1. SINGLE IMAGE MODE
  // --------------------------------------------------------------------------
  if (effectiveMode === "single") {
    const item = items[0];
    const hasDetails = Boolean(item.label || item.caption || item.linkUrl);

    return (
      <div className={containerClass}>
        <div className="rounded-2xl sm:rounded-3xl border border-card-border bg-slate-950/60 glass-panel shadow-2xl overflow-hidden group">
          <div className="relative w-full flex items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-slate-900/40 via-background/60 to-slate-950/80">
            <img
              src={item.imageUrl}
              alt={item.alt}
              className="w-full h-auto max-h-[520px] sm:max-h-[640px] md:max-h-[720px] object-contain rounded-xl sm:rounded-2xl"
              loading="eager"
            />
          </div>

          {hasDetails && (
            <div className="p-4 sm:p-6 bg-card/60 border-t border-card-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                {item.label && (
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-teal font-bold block">
                    {item.label}
                  </span>
                )}
                {item.caption && (
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-3xl">
                    {item.caption}
                  </p>
                )}
              </div>

              {item.linkUrl && (
                <div className="flex-shrink-0 pt-1 sm:pt-0">
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-teal text-background hover:bg-accent-cyan font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] min-h-[38px]"
                  >
                    <span>{item.linkLabel || "Visit Platform"}</span>
                    <ArrowUpRight size={14} className="flex-shrink-0" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. SIDE BY SIDE MODE
  // --------------------------------------------------------------------------
  if (effectiveMode === "sideBySide") {
    const isTwo = items.length === 2;

    return (
      <div className={containerClass}>
        <div
          className={
            isTwo
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          }
        >
          {items.map((item, idx) => {
            const hasDetails = Boolean(item.label || item.caption || item.linkUrl);

            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl border border-card-border bg-slate-950/60 glass-panel shadow-2xl overflow-hidden flex flex-col justify-between group hover:border-accent-teal/40 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full flex-1 flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-slate-900/40 via-background/60 to-slate-950/80 min-h-[240px] sm:min-h-[320px]">
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="w-full h-auto max-h-[380px] sm:max-h-[460px] object-contain rounded-xl sm:rounded-2xl"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Details / Link Footer */}
                {hasDetails && (
                  <div className="p-4 sm:p-5 bg-card/60 border-t border-card-border/60 flex flex-col justify-between gap-3 flex-shrink-0">
                    <div className="space-y-1">
                      {item.label && (
                        <span className="text-xs font-mono uppercase tracking-wider text-accent-teal font-bold block">
                          {item.label}
                        </span>
                      )}
                      {item.caption && (
                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                          {item.caption}
                        </p>
                      )}
                    </div>

                    {item.linkUrl && (
                      <div className="pt-2 border-t border-card-border/30">
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-teal text-background hover:bg-accent-cyan font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] w-full sm:w-auto justify-center min-h-[38px]"
                        >
                          <span>{item.linkLabel || "Visit Platform"}</span>
                          <ArrowUpRight size={14} className="flex-shrink-0" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. SLIDER / CAROUSEL MODE
  // --------------------------------------------------------------------------
  const activeSlide = items[currentIndex] || items[0];
  const hasActiveDetails = Boolean(
    activeSlide.label || activeSlide.caption || activeSlide.linkUrl
  );

  return (
    <div className={containerClass}>
      <div
        className="rounded-2xl sm:rounded-3xl border border-card-border bg-slate-950/70 glass-panel shadow-2xl overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Strictly ONE Active Slide Container */}
        <div className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900/40 via-background/60 to-slate-950/80 p-2 sm:p-5 flex items-center justify-center min-h-[260px] sm:min-h-[420px] md:min-h-[520px]">
          <img
            key={currentIndex}
            src={activeSlide.imageUrl}
            alt={activeSlide.alt}
            className="w-full h-auto max-h-[460px] sm:max-h-[580px] md:max-h-[660px] object-contain rounded-xl sm:rounded-2xl transition-opacity duration-300 animate-in fade-in"
            loading="eager"
          />

          {/* Navigation Arrows (Optional) */}
          {heroSliderShowArrows && totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-accent-teal text-foreground hover:text-background border border-card-border/80 flex items-center justify-center transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-teal z-20 backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-accent-teal text-foreground hover:text-background border border-card-border/80 flex items-center justify-center transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-teal z-20 backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Slide Details & Pagination Footer */}
        <div className="p-4 sm:p-6 bg-card/70 border-t border-card-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              {activeSlide.label ? (
                <span className="text-xs font-mono uppercase tracking-wider text-accent-teal font-bold">
                  {activeSlide.label}
                </span>
              ) : (
                <span className="text-xs font-mono text-foreground/50">
                  Slide {currentIndex + 1} of {totalSlides}
                </span>
              )}
            </div>
            {activeSlide.caption && (
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-2xl">
                {activeSlide.caption}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 flex-shrink-0">
            {/* Pagination Dots (Optional) */}
            {heroSliderShowPagination && totalSlides > 1 && (
              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Slide indicators"
              >
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    role="tab"
                    aria-selected={dotIdx === currentIndex}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    onClick={() => goToSlide(dotIdx)}
                    className={`h-2 rounded-full transition-all focus:outline-none ${
                      dotIdx === currentIndex
                        ? "w-6 bg-accent-teal"
                        : "w-2 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Optional Slide Action Link */}
            {activeSlide.linkUrl && (
              <div>
                <a
                  href={activeSlide.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-teal text-background hover:bg-accent-cyan font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98] min-h-[38px]"
                >
                  <span>{activeSlide.linkLabel || "Visit Platform"}</span>
                  <ArrowUpRight size={14} className="flex-shrink-0" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
