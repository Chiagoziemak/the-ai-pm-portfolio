import React from "react";
import Link from "next/link";
import DynamicIcon from "@/components/DynamicIcon";

export interface FooterProps {
  footerName?: string;
  location?: string;
  footerTagline?: string;
  footerAvailabilityText?: string;
  footerShowAvailability?: boolean;
  footerAvailabilityIcon?: string;
  copyrightName?: string;
  footerStatement?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
}

export default function Footer({
  footerName,
  location,
  footerTagline,
  footerAvailabilityText,
  footerShowAvailability = true,
  footerAvailabilityIcon,
  copyrightName,
  footerStatement,
  socialLinks,
  footerText,
  footerLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const linkedin =
    socialLinks?.linkedin ||
    "https://www.linkedin.com/in/chiagoziem-melvin-akobundu-cspo%E2%93%A1-b546b4206";
  const github = socialLinks?.github || "https://github.com/Chiagoziemak";
  const twitter = socialLinks?.twitter || "https://x.com";

  const displayName =
    (typeof footerName === "string" && footerName.trim() !== "")
      ? footerName.trim()
      : "Chiagoziem Melvin Akobundu";

  const hasTagline =
    typeof footerTagline === "string" && footerTagline.trim() !== "";

  const availabilityText =
    (typeof footerAvailabilityText === "string" && footerAvailabilityText.trim() !== "")
      ? footerAvailabilityText.trim()
      : (typeof location === "string" && location.trim() !== "" ? location.trim() : "");

  const showAvailability =
    footerShowAvailability !== false && availabilityText !== "";

  const availabilityIconName = footerAvailabilityIcon || "FiMapPin";

  const holderName =
    (typeof copyrightName === "string" && copyrightName.trim() !== "")
      ? copyrightName.trim()
      : displayName;

  const legalStatement =
    (typeof footerStatement === "string" && footerStatement.trim() !== "")
      ? footerStatement.trim()
      : "All rights reserved.";

  const dynamicCopyright = `© ${currentYear} ${holderName}. ${legalStatement}`;
  const finalCopyrightText =
    (typeof footerText === "string" && footerText.trim() !== "")
      ? footerText.trim()
      : dynamicCopyright;

  return (
    <footer className="w-full bg-background border-t border-card-border py-8 sm:py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* 1. Left Column: Brand & Tagline / Availability */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors py-1 inline-block"
            >
              {displayName}
            </Link>
            {(hasTagline || showAvailability) && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-foreground/60 mt-1">
                {hasTagline && <span>{footerTagline}</span>}
                {hasTagline && showAvailability && <span>•</span>}
                {showAvailability && (
                  <span className="text-accent-teal font-medium inline-flex items-center gap-1.5">
                    <DynamicIcon
                      name={availabilityIconName}
                      size={14}
                      className="text-accent-teal flex-shrink-0"
                    />
                    <span>{availabilityText}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 2. Middle Column: Social & Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-sm">
            {Array.isArray(footerLinks) &&
              footerLinks.length > 0 &&
              footerLinks
                .filter((link) => link && link.label && link.url)
                .map((link, idx) => (
                  <a
                    key={`fl-${idx}`}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-foreground/75 hover:text-accent-teal transition-colors font-medium py-1.5 min-h-[36px] flex items-center"
                  >
                    {link.label}
                  </a>
                ))}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium py-1.5 min-h-[36px] flex items-center"
              >
                LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium py-1.5 min-h-[36px] flex items-center"
              >
                GitHub
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 hover:text-accent-teal transition-colors font-medium py-1.5 min-h-[36px] flex items-center"
              >
                Twitter
              </a>
            )}
          </div>

          {/* 3. Right Column: Dynamic Year Copyright & Legal Text */}
          <div className="text-xs text-foreground/50 text-center md:text-right">
            {finalCopyrightText}
          </div>

        </div>
      </div>
    </footer>
  );
}
