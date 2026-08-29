"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, FileText } from "lucide-react";

export interface NavbarProps {
  navTitleText?: string;
  navLogoUrl?: string;
  navLinks?: { label: string; url: string }[];
  navCtaLabel?: string;
  navCtaUrl?: string;
  resumeUrl?: string;
  caseStudiesPageEnabled?: boolean;
}

export default function Navbar({
  navTitleText,
  navLogoUrl,
  navLinks,
  navCtaLabel,
  navCtaUrl,
  resumeUrl,
  caseStudiesPageEnabled,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const defaultLinks = [
    { name: "Teardowns", path: "/teardowns" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const rawLinks = (Array.isArray(navLinks) && navLinks.length > 0)
    ? navLinks.map((l) => ({ name: l.label, path: l.url }))
    : defaultLinks;

  const activeLinks = caseStudiesPageEnabled === false
    ? rawLinks.filter((l) => !l.path.startsWith("/case-studies"))
    : rawLinks;

  const ctaLabel = navCtaLabel || "Resume";
  const ctaHref = navCtaUrl || resumeUrl || "/resume.pdf";

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors flex items-center gap-2 py-2"
            >
              {navLogoUrl ? (
                <img src={navLogoUrl} alt={navTitleText || "Logo"} className="h-8 sm:h-9 w-auto object-contain" />
              ) : (
                <span>{navTitleText || "The AI PM"}</span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {activeLinks.map((link, idx) => {
              const isActive = pathname === link.path || (link.path !== "/" && pathname?.startsWith(link.path + "/"));
              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent-teal py-2 ${
                    isActive ? "text-accent-teal font-semibold" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Resume / CTA Button */}
            {ctaHref && (
              <a
                href={ctaHref}
                target={ctaHref.startsWith("http") || ctaHref.endsWith(".pdf") ? "_blank" : undefined}
                rel={ctaHref.startsWith("http") || ctaHref.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-accent-teal text-background hover:bg-accent-teal/90 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer min-h-[40px]"
              >
                <FileText size={14} />
                {ctaLabel}
              </a>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-card-border/30 text-foreground transition-all duration-300 hover:rotate-12 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-accent-teal" /> : <Moon size={18} className="text-accent-cyan" />}
            </button>
          </nav>

          {/* Mobile Actions (Theme Toggle + Hamburger) */}
          <div className="md:hidden flex items-center gap-1">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-card-border/30 text-foreground transition-all duration-300 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={19} className="text-accent-teal" /> : <Moon size={19} className="text-accent-cyan" />}
            </button>
            
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-xl hover:bg-card-border/30 text-foreground transition-all duration-300 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-card-border bg-background/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
          {activeLinks.map((link, idx) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname?.startsWith(link.path + "/"));
            return (
              <Link
                key={idx}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors min-h-[48px] ${
                  isActive
                    ? "text-accent-teal bg-accent-teal/10 font-semibold border border-accent-teal/20"
                    : "text-foreground/90 hover:bg-card-border/20 active:bg-card-border/30"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {ctaHref && (
            <div className="pt-3 border-t border-card-border/60">
              <a
                href={ctaHref}
                target={ctaHref.startsWith("http") || ctaHref.endsWith(".pdf") ? "_blank" : undefined}
                rel={ctaHref.startsWith("http") || ctaHref.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold rounded-xl bg-accent-teal text-background hover:bg-accent-teal/90 active:scale-[0.99] transition-all min-h-[48px] shadow-sm"
              >
                <FileText size={16} />
                {ctaLabel}
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
