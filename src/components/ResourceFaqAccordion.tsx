"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ResourceFaq } from "@/sanity/queries";

interface ResourceFaqAccordionProps {
  faqs: ResourceFaq[];
}

export default function ResourceFaqAccordion({ faqs }: ResourceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
              isOpen ? "border-accent-teal/50 shadow-md bg-card/70" : "border-card-border/70 hover:border-card-border"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <span className="text-base sm:text-lg font-bold text-foreground leading-snug">
                {faq.question}
              </span>
              <span
                className={`p-1.5 rounded-full bg-card-border/30 text-accent-teal transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180 bg-accent-teal/15 text-accent-cyan" : ""
                }`}
              >
                <ChevronDown size={18} />
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-foreground/80 leading-relaxed border-t border-card-border/30 pt-4 animate-fadeIn">
                <p className="whitespace-pre-line">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
