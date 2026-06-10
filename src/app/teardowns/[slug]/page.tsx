import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeardownBySlug, getTeardowns } from "@/sanity/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleTeardownPage({ params }: PageProps) {
  const { slug } = await params;
  const teardown = await getTeardownBySlug(slug);
  if (!teardown) notFound();

  const allTeardowns = await getTeardowns();
  const relatedTeardowns = allTeardowns
    .filter((t) => t.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db]">
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-[#47f0f4] z-[60] w-0" id="progress-bar"></div>

      <main className="pt-24 pb-20">

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-5 md:px-0 text-center mb-16">
          <div className="inline-block bg-[#1a1f4e] text-[#8287bd] px-3 py-1 rounded-full text-xs font-mono mb-6 tracking-widest uppercase">
            {teardown.category}
          </div>
          <h1 className="font-bold text-4xl md:text-5xl mb-6 text-[#e4e2db] tracking-tight leading-tight">
            {teardown.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-[#c7c5d0] text-sm">
            <span className="flex items-center gap-1">📅 {teardown.date}</span>
            <span className="flex items-center gap-1">⏱ {teardown.readTime}</span>
            <span className="flex items-center gap-1">⚡ {teardown.category}</span>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-[1280px] mx-auto px-5 md:px-16 mb-16">
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-[#bec2fc0d] backdrop-blur-xl flex items-center justify-center bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f]">
            {teardown.coverImage ? (
              <img src={teardown.coverImage} alt={teardown.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="text-[#47f0f4]/10 text-[200px]">✦</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c1f] to-transparent opacity-60"></div>
          </div>
        </section>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-5 md:px-0">

          {/* Summary Box */}
          <div className="rounded-xl p-8 mb-12 border-l-4 border-l-[#47f0f4] border border-white/10 bg-[#bec2fc0d] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#47f0f4]">Summary</h3>
            <p className="text-base text-[#c7c5d0] italic leading-relaxed">
              {teardown.summary}
            </p>
          </div>

          {/* Article Body */}
          <article className="space-y-6 mb-16">
            {teardown.body.map((para, index) => (
              <p key={index} className="text-lg text-[#c7c5d0] leading-relaxed">
                {para}
              </p>
            ))}
          </article>

          {/* Key Findings Bento */}
          <section className="my-16">
            <h2 className="text-2xl font-bold mb-8 text-[#e4e2db]">Key Engineering Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teardown.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl flex flex-col gap-4 border border-white/10 bg-[#bec2fc0d] backdrop-blur-xl hover:shadow-[0_0_25px_rgba(0,212,216,0.2)] transition-all"
                >
                  <span className="text-[#47f0f4] text-3xl font-bold font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-[#91909a] leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="mt-20 pt-10 border-t border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#D97757] text-xl">💡</span>
              <h2 className="text-3xl font-semibold text-[#e4e2db] tracking-tight">
                Strategic Recommendations
              </h2>
            </div>
            <div className="space-y-4">
              {teardown.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-[#1b1c17] p-6 rounded-xl border border-white/5"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#e4e2db]">
                      Recommendation {idx + 1}
                    </h4>
                    <span className="text-[#47f0f4] text-xs font-mono tracking-widest uppercase">
                      {idx === 0 ? "High Priority" : idx === 1 ? "Medium Priority" : "Low Priority"}
                    </span>
                  </div>
                  <p className="text-base text-[#c7c5d0] leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Related Teardowns */}
        {relatedTeardowns.length > 0 && (
          <section className="max-w-[1280px] mx-auto px-5 md:px-16 mt-32">
            <h3 className="text-3xl font-semibold mb-10 text-center tracking-tight">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTeardowns.map((item) => (
                <Link
                  key={item.slug}
                  href={`/teardowns/${item.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-white/10 bg-[#bec2fc0d] backdrop-blur-xl transition-all hover:-translate-y-2"
                >
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-[#47f0f4]/20 text-6xl">✦</span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-[#47f0f4] mb-3 block tracking-widest uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-xl font-semibold text-[#e4e2db] group-hover:text-[#47f0f4] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#91909a] mt-3 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />

      {/* Progress bar script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById('progress-bar');
            if (bar) bar.style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  );
}