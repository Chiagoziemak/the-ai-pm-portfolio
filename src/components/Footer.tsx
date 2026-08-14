import React from "react";
import Link from "next/link";

interface FooterProps {
  location?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  footerText?: string;
}

export default function Footer({ location = "Lagos, Nigeria", socialLinks, footerText }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const linkedin = socialLinks?.linkedin || "https://www.linkedin.com/in/chiagoziem-melvin-akobundu-cspo%E2%93%A1-b546b4206";
  const github = socialLinks?.github || "https://github.com/Chiagoziemak";
  const twitter = socialLinks?.twitter || "https://x.com";

  return (
    <footer className="w-full bg-background border-t border-card-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo / Brand & Location */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors">
              Chiagoziem Melvin Akobundu
            </Link>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-foreground/60 mt-1">
              <span>AI Product Manager & Engineer</span>
              <span>•</span>
              <span className="text-accent-teal font-medium flex items-center gap-1">
                📍 {location}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/75 hover:text-accent-teal transition-colors font-medium"
            >
              LinkedIn
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/75 hover:text-accent-teal transition-colors font-medium"
            >
              GitHub
            </a>
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/75 hover:text-accent-teal transition-colors font-medium"
            >
              Twitter
            </a>
          </div>

          {/* Copyright / Footer Text */}
          <div className="text-xs text-foreground/50">
            {footerText ? footerText : `© ${currentYear} Chiagoziem Melvin Akobundu. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
}
