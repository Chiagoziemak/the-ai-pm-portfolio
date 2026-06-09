"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, FileText } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Teardowns", path: "/teardowns" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground hover:text-accent-teal transition-colors">
              The AI <span className="gradient-text">PM</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || pathname?.startsWith(link.path + "/");
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent-teal ${
                    isActive ? "text-accent-teal font-semibold" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-accent-teal text-background hover:bg-accent-teal/90 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <FileText size={14} />
              Resume
            </a>

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
          {navLinks.map((link) => {
            const isActive = pathname === link.path || pathname?.startsWith(link.path + "/");
            return (
              <Link
                key={link.name}
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
          <div className="pt-4 pb-2 border-t border-card-border px-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg bg-accent-teal text-background hover:bg-accent-teal/90 transition-all duration-300"
            >
              <FileText size={16} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
