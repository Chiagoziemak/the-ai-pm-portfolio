import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const siteSettings = (await getSiteSettings()) || {};

  return (
    <div className="min-h-screen page-bg-contact text-foreground flex flex-col overflow-x-hidden transition-colors duration-300">
      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
        caseStudiesPageEnabled={siteSettings.caseStudiesPageEnabled}
      />

      <main className="flex-grow pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Side Info */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-mono text-accent-teal tracking-widest uppercase font-bold">
                Get in touch
              </span>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
                Architecting the future,{" "}
                <br />
                <span className="text-accent-teal">one interaction</span> at a time.
              </h1>
              <p className="text-foreground/80 text-sm sm:text-base max-w-md leading-relaxed">
                Whether you are looking to discuss product strategy, AI implementation,
                or just want to talk about technical architecture — I am always open to
                new connections and ambitious projects.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:melvynmatthews19@gmail.com"
                className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-card-border/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl border border-card-border glass-panel flex items-center justify-center text-accent-teal group-hover:bg-accent-teal/10 transition-colors text-lg flex-shrink-0">
                  <span role="img" aria-label="email">@</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    Direct Email
                  </p>
                  <span className="text-foreground font-semibold hover:text-accent-teal transition-colors text-sm sm:text-base break-all">
                    melvynmatthews19@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/chiagoziem-melvin-akobundu-cspo%E2%93%A1-b546b4206"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-card-border/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl border border-card-border glass-panel flex items-center justify-center text-accent-teal group-hover:bg-accent-teal/10 transition-colors font-bold text-sm flex-shrink-0">
                  <span>in</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    LinkedIn Network
                  </p>
                  <span className="text-foreground font-semibold hover:text-accent-teal transition-colors text-sm sm:text-base">
                    Chiagoziem Melvin Akobundu
                  </span>
                </div>
              </a>
            </div>

            {/* Status Badge */}
            <div className="border border-card-border border-l-4 border-l-accent-teal glass-panel p-5 sm:p-6 rounded-2xl inline-block max-w-full">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-teal"></span>
                </div>
                <span className="text-xs font-mono text-accent-teal font-bold leading-tight">
                  System Status: Active &amp; accepting inquiries
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer
        location={siteSettings.location}
        socialLinks={siteSettings.socialLinks}
        footerText={siteSettings.footerText}
        footerLinks={siteSettings.footerLinks}
      />
    </div>
  );
}