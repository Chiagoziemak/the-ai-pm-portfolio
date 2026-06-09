import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-card-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors">
              Chiagoziem Melvin Akobundu
            </Link>
            <p className="text-xs text-foreground/60 mt-1">
              AI Product Manager & Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/75 hover:text-accent-teal transition-colors font-medium"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/75 hover:text-accent-teal transition-colors font-medium"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/75 hover:text-accent-teal transition-colors font-medium"
            >
              Twitter
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-foreground/50">
            &copy; {currentYear} Chiagoziem Melvin Akobundu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
