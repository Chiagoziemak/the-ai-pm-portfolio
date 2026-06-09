"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const skills = [
    { label: "AI PM Specialization", level: 95 },
    { label: "Advanced Python (ML)", level: 82 },
    { label: "AI Engineering Core", level: 68 },
  ];

  const tools = [
    "PyTorch", "OpenAI API", "LangChain", "Python",
    "TensorFlow", "Docker", "Jira", "Figma", "PostgreSQL",
    "PyTorch", "OpenAI API", "LangChain", "Python",
    "TensorFlow", "Docker", "Jira", "Figma", "PostgreSQL",
  ];

  return (
    <div className="min-h-screen bg-[#0a0c1f] text-[#e4e2db] overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto">

        {/* Hero & Bio Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-32">
          
          {/* Photo */}
          <div className="md:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#47f0f4] to-[#bec2fc] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4/5] bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center">
              {/* Replace with real photo later */}
              <span className="text-[#47f0f4]/20 text-[200px]">✦</span>
              <p className="absolute bottom-6 text-xs text-[#91909a] font-mono tracking-widest uppercase">
                Photo Coming Soon
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-[#47f0f4] tracking-[0.2em] uppercase">
                The Architectural Evolution
              </h2>
              <h1 className="font-bold text-5xl text-[#e4e2db] tracking-tight leading-tight">
                From Strategy to{" "}
                <span className="text-[#47f0f4]">Synthesis</span>.
              </h1>
            </div>

            <div className="space-y-6 text-[#c7c5d0] leading-relaxed">
              <p>
                My journey began in the high-stakes world of SaaS Product Management, 
                where I mastered the art of aligning market needs with technical roadmaps. 
                As a Senior PM, I didn't just manage backlogs; I architected experiences 
                for thousands of users, learning that the best products are built at the 
                intersection of empathy and data.
              </p>
              <p>
                The rise of Large Language Models marked a turning point. Moving into AI PM 
                roles, I realized that to truly push the boundaries of what's possible, I 
                needed to get under the hood. I transitioned from defining the "what" to 
                engineering the "how."
              </p>
              <p>
                Today, as an AI Engineer, I bridge the gap between strategic foresight and 
                technical execution. I spend my days building RAG pipelines, fine-tuning 
                models, and designing agentic workflows that solve complex problems with 
                mathematical precision.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {["AI STRATEGY", "NEURAL ARCHITECTURES", "PRODUCT ECOSYSTEMS"].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <span className="text-[#47f0f4] text-sm">◈</span>
                  <span className="text-xs font-mono tracking-widest">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Learning Bento */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Technical Proficiency */}
            <div className="md:col-span-2 rounded-xl p-8 border border-white/10 bg-[#13140f66] backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-semibold text-[#e4e2db] mb-8 tracking-tight">
                  Technical Proficiency
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { label: "AI PM", desc: "Roadmapping, Prompt Eng, Data Strategy, UX for AI" },
                    { label: "PRODUCT", desc: "SaaS Lifecycle, Agile, GTM, Market Analysis" },
                    { label: "CODING", desc: "Python, PyTorch, LangChain, React, SQL" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <p className="text-xs font-mono text-[#47f0f4] tracking-widest">{item.label}</p>
                      <p className="text-[#c7c5d0] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 flex gap-8">
                {["CSPO", "CSM"].map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <span className="text-[#ffb955] text-xl">✓</span>
                    <div>
                      <p className="text-[10px] font-mono text-[#91909a] uppercase tracking-widest">Certified</p>
                      <p className="font-bold text-[#e4e2db]">{cert}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Vector */}
            <div className="rounded-xl p-8 border border-[#47f0f4]/20 bg-[#353530]/30 relative overflow-hidden">
              <h3 className="text-3xl font-semibold text-[#e4e2db] mb-8 tracking-tight">
                Learning Vector
              </h3>
              <div className="space-y-8">
                {skills.map((skill) => (
                  <div key={skill.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-mono text-xs tracking-widest">{skill.label}</span>
                      <span className="text-[#47f0f4] font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-[#2a2a25] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#47f0f4] rounded-full shadow-[0_0_10px_rgba(71,240,244,0.5)]"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 text-[#D97757]">
                <span className="animate-pulse text-sm">●</span>
                <p className="text-[10px] font-mono uppercase tracking-widest">
                  Processing New Insights Daily
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Timeline */}
        <section className="mb-32">
          <h2 className="font-bold text-5xl text-center mb-16 tracking-tight">
            The Professional{" "}
            <span className="text-[#47f0f4] italic">Trajectory</span>
          </h2>
          <div className="relative max-w-4xl mx-auto py-12">
            
            {/* Vertical line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-30"
              style={{ background: "linear-gradient(to bottom, #47f0f4 0%, #1a1f4e 100%)" }}
            ></div>

            {/* Timeline Events */}
            {[
              {
                period: "2018 - 2020",
                title: "SaaS Product Foundation",
                desc: "Developing core PM skills, user research frameworks, and high-growth SaaS strategies.",
                side: "left",
                color: "#47f0f4",
                size: "w-4 h-4",
              },
              {
                period: "2021 - 2023",
                title: "The AI PM Shift",
                desc: "Integrating ML models into user-facing products. Translating complex model behavior into business value.",
                side: "right",
                color: "#bec2fc",
                size: "w-4 h-4",
              },
              {
                period: "2024 - PRESENT",
                title: "AI Engineering Frontier",
                desc: "Hands-on model development, optimization, and deploying resilient AI agents at scale.",
                side: "left",
                color: "#47f0f4",
                size: "w-6 h-6",
                pulse: true,
              },
            ].map((event, idx) => (
              <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                {event.side === "left" ? (
                  <>
                    <div className="md:text-right flex flex-col items-center md:items-end justify-center">
                      <span className="text-xs font-mono text-[#47f0f4] mb-2 tracking-widest">{event.period}</span>
                      <h4 className="text-xl font-semibold text-[#e4e2db] mb-2">{event.title}</h4>
                      <p className="text-[#c7c5d0] text-sm max-w-xs md:ml-auto leading-relaxed">{event.desc}</p>
                    </div>
                    <div className="hidden md:block"></div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block"></div>
                    <div className="flex flex-col items-center md:items-start justify-center">
                      <span className="text-xs font-mono text-[#47f0f4] mb-2 tracking-widest">{event.period}</span>
                      <h4 className="text-xl font-semibold text-[#e4e2db] mb-2">{event.title}</h4>
                      <p className="text-[#c7c5d0] text-sm max-w-xs leading-relaxed">{event.desc}</p>
                    </div>
                  </>
                )}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${event.size} rounded-full border-4 border-[#0a0c1f] ${event.pulse ? "animate-pulse" : ""}`}
                  style={{
                    backgroundColor: event.color,
                    boxShadow: `0 0 ${event.pulse ? "25px" : "15px"} ${event.color}`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Marquee */}
        <section className="mb-32">
          <div className="rounded-2xl border-y border-white/10 bg-[#13140f66] backdrop-blur-xl py-12 overflow-hidden relative">
            <div className="flex whitespace-nowrap gap-12 animate-marquee">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="text-3xl font-semibold text-[#91909a] opacity-40 hover:opacity-100 hover:text-[#47f0f4] cursor-default transition-all tracking-tight"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-8">
          <h3 className="font-bold text-5xl tracking-tight">
            Let's build the{" "}
            <span className="text-[#47f0f4]">next iteration</span>.
          </h3>
          <p className="text-[#c7c5d0] max-w-xl mx-auto leading-relaxed">
            I'm always open to discussing technical architecture, product strategy, 
            or the ethical implications of the AI revolution.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="bg-[#47f0f4] text-[#003738] px-8 py-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(71,240,244,0.4)] transition-all active:scale-95"
            >
              Send a Message
            </Link>
            <Link
              href="/case-studies"
              className="border border-white/10 text-[#e4e2db] px-8 py-4 rounded-lg font-bold hover:bg-[#1b1c17] transition-all"
            >
              View Project Hub
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}