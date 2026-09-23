import React from "react";
import { ArrowUpRight } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";
import { normalizeExternalUrl } from "@/lib/url";
import type { ProductSurface } from "@/data/mockData";

interface ProductSurfacesProps {
  surfaces?: ProductSurface[];
  surfacesIcon?: string;
  title?: string;
}

export default function ProductSurfaces({
  surfaces,
  surfacesIcon = "FiGrid",
  title = "Product Surfaces",
}: ProductSurfacesProps) {
  const validSurfaces = Array.isArray(surfaces)
    ? surfaces.filter((s) => Boolean(s && (s.label || s.name) && s.enabled !== false))
    : [];

  if (validSurfaces.length === 0) {
    return null;
  }

  return (
    <section className="p-6 sm:p-8 rounded-2xl border border-card-border glass-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
          <DynamicIcon name={surfacesIcon || "FiGrid"} size={22} className="text-accent-teal" />
          {title}
        </h2>
        <span className="text-xs font-mono text-foreground/60">
          {validSurfaces.length} {validSurfaces.length === 1 ? "Surface" : "Surfaces"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {validSurfaces.map((surface, idx) => {
          const isInternal = surface.accessType === "internal";
          const surfaceName = (surface.name || surface.label || "Product Surface").trim();
          const description = surface.description?.trim();
          const normalizedUrl = normalizeExternalUrl(surface.url);
          // Strict safety: Only public surfaces with a valid URL render a clickable action button
          const isClickable = !isInternal && Boolean(normalizedUrl);
          const buttonLabel = surface.buttonLabel?.trim() || "Visit Platform";
          const platform = surface.platformType ? surface.platformType.trim() : null;

          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-card-border/80 glass-panel bg-card/40 flex flex-col justify-between hover:border-accent-teal/40 transition-all duration-300 relative group"
            >
              <div>
                {/* Badges Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    {isInternal ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-card-border/40 text-foreground/70 border border-card-border/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40"></span>
                        Internal
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-teal"></span>
                        Public
                      </span>
                    )}

                    {platform && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-card-border/30 text-foreground/70 border border-card-border/40 font-semibold">
                        {platform}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name / Surface Title */}
                <h3 className="font-bold text-base sm:text-lg text-foreground mb-1.5 leading-snug">
                  {surfaceName}
                </h3>

                {/* Description */}
                {description && (
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mb-4">
                    {description}
                  </p>
                )}
              </div>

              {/* Action Link for Public surfaces with URL */}
              {isClickable && normalizedUrl ? (
                <div className="pt-3.5 border-t border-card-border/40 flex items-center justify-between">
                  <a
                    href={normalizedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-teal text-background hover:bg-accent-cyan font-bold text-xs sm:text-sm transition-all shadow-sm min-h-[40px] w-full sm:w-auto justify-center active:scale-[0.98]"
                  >
                    <span>{buttonLabel}</span>
                    <ArrowUpRight size={14} className="flex-shrink-0" />
                  </a>
                </div>
              ) : isInternal ? (
                <div className="pt-3 border-t border-card-border/30 flex items-center justify-between text-[11px] font-mono text-foreground/50">
                  <span>Operations &amp; Staff</span>
                  <span className="text-[10px] text-foreground/40">Private System</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
