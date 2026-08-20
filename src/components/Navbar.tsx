"use client";

import React, { useState } from "react";
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
}

export default function Navbar({
  navTitleText,
  navLogoUrl,
  navLinks,
  navCtaLabel,
  navCtaUrl,
  resumeUrl,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const defaultLinks = [
    { name: "Teardowns", path: "/teardowns" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const activeLinks = (Array.isArray(navLinks) && navLinks.length > 0)
    ? navLinks.map((l) => ({ name: l.label, path: l.url }))
    : defaultLinks;

  const ctaLabel = navCtaLabel || "Resume";
  const ctaHref = navCtaUrl || resumeUrl || "/resume.pdf";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors flex items-center gap-2">
              {navLogoUrl ? (
                <img src={navLogoUrl} alt={navTitleText || "Logo"} className="h-8 w-auto object-contain" />
              ) : (
                <span>{navTitleText || "The AI PM"}</span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {activeLinks.map((link, idx) => {
              const isActive = pathname === link.path || (link.path !== "/" && pathname?.startsWith(link.path + "/"));
              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent-teal ${
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
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-accent-teal text-background hover:bg-accent-teal/90 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <FileText size={14} />
                {ctaLabel}
              </a>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-card-border/30 text-foreground transition-all duration-300 hover:rotate-12 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-accent-teal" /> : <Moon size={18} className="text-accent-cyan" />}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-card-border/30 text-foreground transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-accent-teal" /> : <Moon size={18} className="text-accent-cyan" />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-card-border/30 text-foreground transition-all duration-300 cursor-pointer"
              aria-label="Toggle main menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-card-border bg-background/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          {activeLinks.map((link, idx) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname?.startsWith(link.path + "/"));
            return (
              <Link
                key={idx}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-card-border/20 ${
                  isActive ? "text-accent-teal bg-card-border/10" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {ctaHref && (
            <div className="pt-4 pb-2 border-t border-card-border px-3">
              <a
                href={ctaHref}
                target={ctaHref.startsWith("http") || ctaHref.endsWith(".pdf") ? "_blank" : undefined}
                rel={ctaHref.startsWith("http") || ctaHref.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg bg-accent-teal text-background hover:bg-accent-teal/90 transition-all duration-300"
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
