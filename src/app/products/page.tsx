import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getProducts } from "@/sanity/queries";
import { mockProducts } from "@/data/mockData";

export default async function ProductsPage() {
  const data = await getProducts();
  const products = data.length > 0 ? data : mockProducts;

  // featured product is usually "In Development" (like ResumeGenie)
  const featuredProduct = products.find((p) => p.status === "In Development") || products[0];
  const comingSoonProducts = products.filter((p) => p !== featuredProduct);

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db]">
      <Navbar />
      <main className="pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto">
        
        {/* Header */}
        <header className="mb-16 md:mb-24 text-center md:text-left">
          <h1 className="font-bold text-5xl mb-4 tracking-tight">Products</h1>
          <p className="text-[#c7c5d0] max-w-2xl text-base leading-relaxed">
            AI tools I am building to solve real problems. A collection of experimental 
            and production-ready applications focusing on high-density utility and elegant engineering.
          </p>
        </header>

        {/* Featured Product Card */}
        {featuredProduct && (
          <section className="mb-12">
            <div className="rounded-xl overflow-hidden transition-all duration-500 group flex flex-col lg:flex-row min-h-[500px] border border-white/10 bg-[#bec2fc0d] backdrop-blur-xl hover:shadow-[0_0_30px_rgba(0,212,216,0.2)] hover:border-[rgba(71,240,244,0.4)]">
              
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative overflow-hidden bg-[#0e0f0a]">
                {featuredProduct.coverImage ? (
                  <img 
                    src={featuredProduct.coverImage} 
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
                    <span className="text-[#47f0f4]/20 text-9xl">✦</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c1f] via-transparent to-transparent lg:bg-gradient-to-r"></div>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-widest text-[#21dce0] uppercase bg-[#00d3d7]/20 px-3 py-1 rounded-full border border-[#47f0f4]/30 font-mono">
                    {featuredProduct.name}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#341f00]/30 border border-[#ffb955]/20">
                    <span className="w-2 h-2 rounded-full bg-[#ffb955] animate-pulse"></span>
                    <span className="text-xs text-[#ffb955] uppercase font-mono tracking-widest">{featuredProduct.status}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-semibold mb-4 leading-tight tracking-tight">
                  {featuredProduct.tagline}
                </h2>
                <p className="text-[#c7c5d0] text-base mb-8 leading-relaxed">
                  {featuredProduct.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/case-studies/resumegenie-ai-agent"
                    className="bg-[#47f0f4] text-[#003738] px-8 py-3 rounded-lg font-bold transition-all hover:bg-[#53f8fc] active:scale-95 flex items-center gap-2"
                  >
                    View Case Study →
                  </Link>
                  <button className="border border-white/10 bg-white/5 text-[#e4e2db] px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                    Technical Spec
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Coming Soon Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {comingSoonProducts.map((product) => {
            const slug = product.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
            return (
              <div 
                key={slug} 
                className="rounded-xl p-8 md:p-10 transition-all duration-500 relative overflow-hidden group border border-white/10 bg-[#bec2fc0d] backdrop-blur-xl hover:shadow-[0_0_30px_rgba(0,212,216,0.2)] hover:border-[rgba(71,240,244,0.4)]"
              >
                {product.coverImage && (
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                    <img src={product.coverImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-lg bg-[#1a1f4e] flex items-center justify-center border border-[#bec2fc]/20">
                      <span className="text-[#bec2fc] text-2xl">⬡</span>
                    </div>
                    <span className="text-xs text-[#91909a] uppercase tracking-widest font-mono">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 tracking-tight">{product.name}</h3>
                  <p className="text-xs font-mono text-[#47f0f4] mb-4 uppercase tracking-wider">{product.tagline}</p>
                  <p className="text-[#c7c5d0] text-base mb-auto leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="text-[#21dce0] text-xs flex items-center gap-2 cursor-pointer hover:translate-x-1 transition-transform font-mono tracking-widest uppercase">
                      GET NOTIFIED →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center border border-dashed border-white/10 bg-[#bec2fc0d] backdrop-blur-xl py-16 rounded-2xl">
          <h2 className="text-3xl font-semibold mb-6 tracking-tight">
            Have a problem worth solving with AI?
          </h2>
          <p className="text-[#c7c5d0] max-w-xl mx-auto mb-10 text-base leading-relaxed">
            I'm always looking for complex bottlenecks that can be streamlined with 
            agentic workflows or predictive modeling. Let's discuss your architecture.
          </p>
          <Link
            href="/contact"
            className="bg-[#bec2fc] text-[#272c5b] px-10 py-4 rounded-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(190,194,252,0.3)] active:scale-95 inline-block"
          >
            Contact Chiagoziem
          </Link>
        </section>

      </main>
      <Footer />
    </div>
  );
}