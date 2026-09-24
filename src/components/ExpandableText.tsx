"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  text?: string;
  children?: React.ReactNode;
  collapsedLines?: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
  buttonClassName?: string;
  minChars?: number;
}

export default function ExpandableText({
  text,
  children,
  collapsedLines = 3,
  expandLabel = "See more",
  collapseLabel = "See less",
  className = "text-xs sm:text-sm text-foreground/80 leading-relaxed",
  buttonClassName,
  minChars = 140,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const rawContent = text || (typeof children === "string" ? children : "");

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const el = textRef.current;
        const hasOverflow = el.scrollHeight > el.clientHeight + 2;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [rawContent, collapsedLines]);

  const content = text || children;

  if (!content) return null;

  return (
    <div className="w-full">
      <div
        ref={textRef}
        className={className}
        style={
          !isExpanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: collapsedLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {content}
      </div>

      {isOverflowing && (
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          className={
            buttonClassName ||
            "inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono font-semibold text-accent-teal hover:text-accent-cyan transition-colors mt-1.5 py-1.5 px-0.5 min-h-[44px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent-teal rounded"
          }
        >
          <span>{isExpanded ? collapseLabel : expandLabel}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}