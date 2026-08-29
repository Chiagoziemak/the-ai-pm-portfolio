import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts, getSiteSettings } from "@/sanity/queries";
import { mockProducts } from "@/data/mockData";
import { constructMetadata } from "@/lib/seo";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return constructMetadata({
    title: "AI Products & Autonomous Systems | Chiagoziem Melvin Akobundu",
    description:
      "Explore AI products and software built by Chiagoziem Melvin Akobundu, including ResumeGenie AI agent and production tools.",
    urlPath: "/products",
    siteSettings,
  });
}

export default async function ProductsPage() {
  const data = await getProducts();
  const siteSettings = (await getSiteSettings()) || {};
  const products = Array.isArray(data) && data.length > 0 ? data : mockProducts;

  const isCaseStudiesEnabled = siteSettings.caseStudiesPageEnabled !== false;

  // Split into Featured Product vs other products
  const featuredProduct = products.find((p: any) => p.isFeatured || p.featured) || products[0];
  const comingSoonProducts = products.filter((p) => p !== featuredProduct);

  return (
    <div className="min-h-screen page-bg-products text-foreground transition-colors duration-300 flex flex-col">
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
        
        {/* Header */}
        <header className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 tracking-tight">Products</h1>
          <p className="text-foreground/80 max-w-2xl text-sm sm:text-base leading-relaxed">
            AI tools I am building to solve real problems. A collection of experimental 
            and production-ready applications focusing on high-density utility and elegant engineering.
          </p>
        </header>

        {/* Featured Product Card */}
        {featuredProduct && (
          <section className="mb-12 sm:mb-16">
            <div className="rounded-3xl overflow-hidden transition-all duration-500 group flex flex-col lg:flex-row min-h-[440px] border border-card-border glass-panel hover:shadow-[0_0_30px_rgba(0,212,216,0.15)] hover:border-accent-teal/40">
              
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative overflow-hidden bg-card/60 aspect-video sm:aspect-auto sm:min-h-[280px] lg:min-h-[440px]">
                {featuredProduct.coverImage ? (
                  <img 
                    src={featuredProduct.coverImage} 
                    alt={featuredProduct.coverImageAlt || `${featuredProduct.name} — Product Preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent-teal/10 via-card to-background flex items-center justify-center">
                    <span className="text-accent-teal/20 text-7xl sm:text-9xl">✦</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:bg-gradient-to-r"></div>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 sm:mb-6 flex-wrap">
                  <span className="text-xs tracking-widest text-accent-teal uppercase bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/30 font-mono font-bold">
                    {featuredProduct.name}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-xs text-amber-700 dark:text-amber-400 uppercase font-mono tracking-widest font-bold">{featuredProduct.status}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight text-foreground">
                  {featuredProduct.tagline}
                </h2>
                <p className="text-foreground/80 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  {featuredProduct.description}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {featuredProduct.linkType === "Case Study" && (featuredProduct as any).caseStudySlug ? (
                    isCaseStudiesEnabled ? (
                      <Link
                        href={`/case-studies/${(featuredProduct as any).caseStudySlug}`}
                        className="w-full sm:w-auto bg-accent-teal text-background px-6 sm:px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base min-h-[44px]"
                      >
                        {featuredProduct.linkLabel || "View Case Study →"}
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto bg-accent-teal text-background px-6 sm:px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base min-h-[44px]"
                      >
                        Get In Touch →
                      </Link>
                    )
                  ) : featuredProduct.externalUrl ? (
                    <a
                      href={featuredProduct.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-accent-teal text-background px-6 sm:px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base min-h-[44px]"
                    >
                      {featuredProduct.linkLabel || "View Product →"}
                    </a>
                  ) : (
                    isCaseStudiesEnabled ? (
                      <Link
                        href="/case-studies/resumegenie-ai-agent"
                        className="w-full sm:w-auto bg-accent-teal text-background px-6 sm:px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base min-h-[44px]"
                      >
                        {featuredProduct.linkLabel || "View Case Study →"}
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto bg-accent-teal text-background px-6 sm:px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base min-h-[44px]"
                      >
                        Get In Touch →
                      </Link>
                    )
                  )}
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto border border-card-border bg-card text-foreground px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-card-border/20 transition-all text-center flex items-center justify-center text-sm sm:text-base min-h-[44px]"
                  >
                    Technical Spec
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Products Grid */}
        <section className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {comingSoonProducts.map((product) => {
            return (
              <div 
                key={product.name} 
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.334rem)] max-w-[400px] border border-card-border glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest text-accent-teal uppercase">
                      {product.name}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-card-border/40 text-foreground/70 uppercase font-semibold">
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent-teal transition-colors">
                    {product.tagline}
                  </h3>

                  <p className="text-foreground/75 text-xs sm:text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-card-border/40 flex items-center justify-between">
                  <span className="text-xs font-mono text-foreground/50">Status: {product.status}</span>
                  {product.externalUrl ? (
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1 min-h-[36px]"
                    >
                      {product.linkLabel || "Explore"} <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1 min-h-[36px]"
                    >
                      Inquire <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Bottom CTA Banner */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl border border-card-border glass-panel text-center max-w-3xl mx-auto shadow-sm">
          <Sparkles size={36} className="text-accent-teal mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 tracking-tight">
            Have a product concept to build?
          </h2>
          <p className="text-foreground/80 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
            I collaborate with teams and founders to design, prototype, and build production-grade AI applications.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-teal text-background font-bold text-sm sm:text-base hover:bg-accent-cyan active:scale-95 transition-all shadow-md min-h-[44px]"
          >
            Start a Conversation →
          </Link>
        </div>

      </main>

      <Footer
        location={siteSettings.location}
        footerTagline={siteSettings.footerTagline}
        footerAvailabilityIcon={siteSettings.footerAvailabilityIcon}
        socialLinks={siteSettings.socialLinks}
        footerText={siteSettings.footerText}
        footerLinks={siteSettings.footerLinks}
      />
    </div>
  );
}