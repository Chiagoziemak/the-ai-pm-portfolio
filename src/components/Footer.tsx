import React from "react";
import Link from "next/link";
import DynamicIcon from "@/components/DynamicIcon";

interface FooterProps {
  location?: string;
  footerTagline?: string;
  footerAvailabilityIcon?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
}

export default function Footer({
  location,
  footerTagline,
  footerAvailabilityIcon,
  socialLinks,
  footerText,
  footerLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const linkedin = socialLinks?.linkedin || "https://www.linkedin.com/in/chiagoziem-melvin-akobundu-cspo%E2%93%A1-b546b4206";
  const github = socialLinks?.github || "https://github.com/Chiagoziemak";
  const twitter = socialLinks?.twitter || "https://x.com";

  const hasTagline = typeof footerTagline === "string" && footerTagline.trim() !== "";
  const hasLocation = typeof location === "string" && location.trim() !== "";
  const availabilityIconName = footerAvailabilityIcon || "FiMapPin";

  return (
    <footer className="w-full bg-background border-t border-card-border py-8 sm:py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand & Location */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors py-1 inline-block"
            >
              Chiagoziem Melvin Akobundu
            </Link>
            {(hasTagline || hasLocation) && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-foreground/60 mt-1">
                {hasTagline && <span>{footerTagline}</span>}
                {hasTagline && hasLocation && <span>•</span>}
                {hasLocation && (
                  <span className="text-accent-teal font-medium inline-flex items-center gap-1.5">
                    <DynamicIcon name={availabilityIconName} size={14} className="text-accent-teal" />
                    <span>{location}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Social Links & Custom Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-sm">
            {Array.isArray(footerLinks) && footerLinks.length > 0 ? (
              footerLinks
                .filter((link) => link && link.label && link.url)
                .map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-foreground/75 hover:text-accent-teal transition-colors font-medium py-1.5 min-h-[36px] flex items-center"
                  >
                    {link.label}
                  </a>
                ))
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Copyright / Footer Text */}
          <div className="text-xs text-foreground/50 text-center md:text-right">
            {footerText ? footerText : `© ${currentYear} Chiagoziem Melvin Akobundu. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
}
