import React from "react";

export interface StatItem {
  label?: string;
  value?: string;
}

export interface StatGridProps {
  stats?: StatItem[];
  className?: string;
  cardClassName?: string;
  variant?: "teal" | "card";
}

export default function StatGrid({
  stats,
  className = "",
  cardClassName = "",
  variant = "teal",
}: StatGridProps) {
  if (!Array.isArray(stats) || stats.length === 0) {
    return null;
  }

  // Filter out empty items
  const validStats = stats.filter((s) => Boolean(s && (s.value || s.label)));

  if (validStats.length === 0) {
    return null;
  }

  const baseCardStyles =
    variant === "card"
      ? "bg-card border border-card-border"
      : "bg-accent-teal/10 border border-accent-teal/20";

  // Case 1: Exactly 1 stat item (e.g. Winner / Africa Agility Hackathon)
  // Centered horizontally with max-width so it feels intentional and balanced
  if (validStats.length === 1) {
    const stat = validStats[0];
    return (
      <div className={`w-full max-w-sm mx-auto mb-6 ${className}`}>
        <div
          className={`p-4 rounded-xl ${baseCardStyles} text-center shadow-sm ${cardClassName}`}
        >
          {stat.value && (
            <span className="block text-xl sm:text-2xl font-black text-accent-teal tracking-tight leading-snug">
              {stat.value}
            </span>
          )}
          {stat.label && (
            <span className="block text-[11px] sm:text-xs font-mono text-foreground/80 uppercase mt-1 tracking-wider leading-tight">
              {stat.label}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Case 2: Exactly 2 stat items (Balanced 2-column grid)
  if (validStats.length === 2) {
    return (
      <div className={`grid grid-cols-2 gap-3 mb-6 ${className}`}>
        {validStats.map((stat, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-xl ${baseCardStyles} text-center flex flex-col justify-center ${cardClassName}`}
          >
            {stat.value && (
              <span className="block text-lg sm:text-xl font-extrabold text-accent-teal leading-snug">
                {stat.value}
              </span>
            )}
            {stat.label && (
              <span className="text-[10px] sm:text-[11px] font-mono text-foreground/70 uppercase mt-1 leading-tight">
                {stat.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Case 3: Exactly 3 stat items (1 col on mobile, 3 cols on sm+)
  if (validStats.length === 3) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 ${className}`}>
        {validStats.map((stat, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-xl ${baseCardStyles} text-center flex flex-col justify-center ${cardClassName}`}
          >
            {stat.value && (
              <span className="block text-lg sm:text-xl font-extrabold text-accent-teal leading-snug">
                {stat.value}
              </span>
            )}
            {stat.label && (
              <span className="text-[10px] sm:text-[11px] font-mono text-foreground/70 uppercase mt-1 leading-tight">
                {stat.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Case 4: 4 or more stat items (2 cols on mobile/tablet, up to 4 on desktop)
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 ${className}`}
    >
      {validStats.map((stat, i) => (
        <div
          key={i}
          className={`p-3.5 rounded-xl ${baseCardStyles} text-center flex flex-col justify-center ${cardClassName}`}
        >
          {stat.value && (
            <span className="block text-base sm:text-lg font-extrabold text-accent-teal leading-snug">
              {stat.value}
            </span>
          )}
          {stat.label && (
            <span className="text-[10px] font-mono text-foreground/70 uppercase mt-1 leading-tight">
              {stat.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
