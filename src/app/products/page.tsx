import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicIcon from "@/components/DynamicIcon";
import Link from "next/link";
import { getProducts, getSiteSettings } from "@/sanity/queries";
import { mockProducts } from "@/data/mockData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const data = await getProducts();
  const siteSettings = (await getSiteSettings()) || {};
  const products = Array.isArray(data) && data.length > 0 ? data : mockProducts;

  // featured product is usually "In Development" (like ResumeGenie)
  const featuredProduct = products.find((p) => p?.status === "In Development") || products[0] || mockProducts[0];
  const comingSoonProducts = products.filter((p) => p !== featuredProduct);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar
        navTitleText={siteSettings.navTitleText}
        navLogoUrl={siteSettings.navLogoUrl}
        navLinks={siteSettings.navLinks}
        navCtaLabel={siteSettings.navCtaLabel}
        navCtaUrl={siteSettings.navCtaUrl}
        resumeUrl={siteSettings.resumeUrl}
      />
      <main className="pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto">
        
        {/* Header */}
        <header className="mb-16 md:mb-24 text-center md:text-left">
          <h1 className="font-bold text-5xl mb-4 tracking-tight text-foreground">Products</h1>
          <p className="text-foreground/80 max-w-2xl text-base leading-relaxed">
            AI tools I am building to solve real problems. A collection of experimental 
            and production-ready applications focusing on high-density utility and elegant engineering.
          </p>
        </header>

        {/* Featured Product Card */}
        {featuredProduct && (
          <section className="mb-12">
            <div className="rounded-2xl overflow-hidden transition-all duration-500 group flex flex-col lg:flex-row min-h-[500px] border border-card-border glass-panel bg-card/30 hover:shadow-[0_0_30px_rgba(0,212,216,0.15)] hover:border-accent-teal/40">
              
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative overflow-hidden bg-card/60">
                {featuredProduct.coverImage ? (
                  <img 
                    src={featuredProduct.coverImage} 
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-accent-teal/10 via-card to-background flex items-center justify-center">
                    <span className="text-accent-teal/20 text-9xl">✦</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:bg-gradient-to-r"></div>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="text-xs tracking-widest text-accent-teal uppercase bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/30 font-mono font-bold">
                    {featuredProduct.name}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-xs text-amber-700 dark:text-amber-400 uppercase font-mono tracking-widest font-bold">{featuredProduct.status}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-semibold mb-4 leading-tight tracking-tight text-foreground">
                  {featuredProduct.tagline}
                </h2>
                <p className="text-foreground/80 text-base mb-8 leading-relaxed">
                  {featuredProduct.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {featuredProduct.linkType === "Case Study" && (featuredProduct as any).caseStudySlug ? (
                    <Link
                      href={`/case-studies/${(featuredProduct as any).caseStudySlug}`}
                      className="bg-accent-teal text-background px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center gap-2 shadow-sm"
                    >
                      {featuredProduct.linkLabel || "View Case Study →"}
                    </Link>
                  ) : featuredProduct.externalUrl ? (
                    <a
                      href={featuredProduct.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent-teal text-background px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center gap-2 shadow-sm"
                    >
                      {featuredProduct.linkLabel || "View Product →"}
                    </a>
                  ) : (
                    <Link
                      href="/case-studies/resumegenie-ai-agent"
                      className="bg-accent-teal text-background px-8 py-3 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 flex items-center gap-2 shadow-sm"
                    >
                      {featuredProduct.linkLabel || "View Case Study →"}
                    </Link>
                  )}
                  <Link href="/contact" className="border border-card-border bg-card/60 text-foreground px-8 py-3 rounded-xl font-semibold hover:bg-card-border/20 transition-all">
                    Technical Spec
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Coming Soon Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {comingSoonProducts.map((product) => {
            const slug = (product.name || "product").toLowerCase().replace(/[^a-z0-9]/g, "-");
            return (
              <div 
                key={slug} 
                className="rounded-2xl p-8 md:p-10 transition-all duration-500 relative overflow-hidden group border border-card-border glass-panel bg-card/30 hover:shadow-[0_0_30px_rgba(0,212,216,0.15)] hover:border-accent-teal/40"
              >
                {product.coverImage && (
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                    <img src={product.coverImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center border border-accent-teal/20 text-accent-teal">
                      <DynamicIcon name={product.icon} size={22} />
                    </div>
                    <span className="text-xs text-foreground/60 uppercase tracking-widest font-mono font-semibold">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 tracking-tight text-foreground">{product.name}</h3>
                  <p className="text-xs font-mono text-accent-teal mb-4 uppercase tracking-wider font-bold">{product.tagline}</p>
                  <p className="text-foreground/80 text-base mb-auto leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-card-border/60">
                    {product.externalUrl ? (
                      <a
                        href={product.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-teal text-xs flex items-center gap-2 hover:translate-x-1 transition-transform font-mono tracking-widest uppercase font-bold"
                      >
                        {product.linkLabel || "EXPLORE PRODUCT →"}
                      </a>
                    ) : (
                      <Link
                        href="/contact"
                        className="text-accent-teal text-xs flex items-center gap-2 hover:translate-x-1 transition-transform font-mono tracking-widest uppercase font-bold"
                      >
                        {product.linkLabel || "GET NOTIFIED →"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center border border-dashed border-card-border glass-panel bg-card/30 py-16 rounded-3xl">
          <h2 className="text-3xl font-semibold mb-6 tracking-tight text-foreground">
            Have a problem worth solving with AI?
          </h2>
          <p className="text-foreground/80 max-w-xl mx-auto mb-10 text-base leading-relaxed">
            I'm always looking for complex bottlenecks that can be streamlined with 
            agentic workflows or predictive modeling. Let's discuss your architecture.
          </p>
          <Link
            href="/contact"
            className="bg-accent-teal text-background px-10 py-4 rounded-xl font-bold transition-all hover:bg-accent-cyan active:scale-95 inline-block shadow-sm"
          >
            Contact Chiagoziem
          </Link>
        </section>

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