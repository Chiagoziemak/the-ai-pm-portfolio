import React from "react";
import Link from "next/link";

export interface FooterProps {
  footerName?: string;
  siteTitle?: string;
  footerTagline?: string;
  footerAvailabilityText?: string;
  footerShowAvailability?: boolean;
  copyrightName?: string;
  footerStatement?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  footerLinks?: { label: string; url: string }[];
  aboutPageEnabled?: boolean;
  caseStudiesPageEnabled?: boolean;
  productsPageEnabled?: boolean;
  teardownsPageEnabled?: boolean;
  contactPageEnabled?: boolean;
}

export default function Footer({
  footerName,
  siteTitle,
  footerTagline,
  footerAvailabilityText,
  footerShowAvailability = true,
  copyrightName,
  footerStatement,
  socialLinks,
  footerLinks,
  aboutPageEnabled,
  caseStudiesPageEnabled,
  productsPageEnabled,
  teardownsPageEnabled,
  contactPageEnabled,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  // 1. Footer Name Fallback Hierarchy: footerName -> siteTitle -> "Chiagoziem Melvin Akobundu"
  const displayName =
    (typeof footerName === "string" && footerName.trim() !== "")
      ? footerName.trim()
      : (typeof siteTitle === "string" && siteTitle.trim() !== ""
        ? siteTitle.trim()
        : "Chiagoziem Melvin Akobundu");

  // 2. Footer Tagline: hide if empty (no hardcoded fallback)
  const tagline =
    (typeof footerTagline === "string" && footerTagline.trim() !== "")
      ? footerTagline.trim()
      : null;

  // 3. Availability: hide if empty (no location fallback!)
  const availabilityText =
    (typeof footerAvailabilityText === "string" && footerAvailabilityText.trim() !== "")
      ? footerAvailabilityText.trim()
      : null;

  const showAvailability =
    footerShowAvailability !== false && Boolean(availabilityText);

  // 4. Copyright Name Hierarchy: copyrightName -> footerName -> siteTitle -> "Chiagoziem Melvin Akobundu"
  const holderName =
    (typeof copyrightName === "string" && copyrightName.trim() !== "")
      ? copyrightName.trim()
      : displayName;

  // 5. Footer Statement: footerStatement -> "All rights reserved."
  const statement =
    (typeof footerStatement === "string" && footerStatement.trim() !== "")
      ? footerStatement.trim()
      : "All rights reserved.";

  const copyrightNotice = `© ${currentYear} ${holderName}. ${statement}`;

  // 6. Social links extraction
  const linkedin =
    typeof socialLinks?.linkedin === "string" && socialLinks.linkedin.trim() !== ""
      ? socialLinks.linkedin.trim()
      : null;

  const github =
    typeof socialLinks?.github === "string" && socialLinks.github.trim() !== ""
      ? socialLinks.github.trim()
      : null;

  const twitter =
    typeof socialLinks?.twitter === "string" && socialLinks.twitter.trim() !== ""
      ? socialLinks.twitter.trim()
      : null;

  const isAboutEnabled = aboutPageEnabled !== false;
  const isCaseStudiesEnabled = caseStudiesPageEnabled !== false;
  const isProductsEnabled = productsPageEnabled !== false;
  const isTeardownsEnabled = teardownsPageEnabled !== false;
  const isContactEnabled = contactPageEnabled !== false;

  const validFooterLinks = Array.isArray(footerLinks)
    ? footerLinks.filter((link) => {
        if (!link || !link.label || !link.url) return false;
        const path = link.url.trim().toLowerCase();
        if (!isAboutEnabled && (path === "/about" || path.startsWith("/about/"))) return false;
        if (!isCaseStudiesEnabled && (path === "/case-studies" || path.startsWith("/case-studies/"))) return false;
        if (!isProductsEnabled && (path === "/products" || path.startsWith("/products/"))) return false;
        if (!isTeardownsEnabled && (path === "/teardowns" || path.startsWith("/teardowns/"))) return false;
        if (!isContactEnabled && (path === "/contact" || path.startsWith("/contact/"))) return false;
        return true;
      })
    : [];

  return (
    <footer className="w-full bg-background border-t border-card-border py-8 sm:py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* 1. Left Column: Brand & Optional Tagline / Availability */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors min-h-[44px] inline-flex items-center"
            >
              {displayName}
            </Link>
            {(tagline || showAvailability) && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-foreground/60 -mt-1">
                {tagline && <span>{tagline}</span>}
                {tagline && showAvailability && <span>•</span>}
                {showAvailability && (
                  <span className="text-accent-teal font-medium inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                    <span>{availabilityText}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 2. Middle Column: Social & Navigation Links (>=44px touch targets) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm">
            {validFooterLinks.map((link, idx) => (
              <a
                key={`fl-${idx}`}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-card-border/20"
              >
                {link.label}
              </a>
            ))}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-card-border/20"
              >
                LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-card-border/20"
              >
                GitHub
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg hover:bg-card-border/20"
              >
                Twitter
              </a>
            )}
          </div>

          {/* 3. Right Column: Dynamic Year Copyright & Legal Text */}
          <div className="text-xs text-foreground/50 text-center md:text-right min-h-[44px] flex items-center justify-center md:justify-end">
            {copyrightNotice}
          </div>

        </div>
      </div>
    </footer>
  );
}
