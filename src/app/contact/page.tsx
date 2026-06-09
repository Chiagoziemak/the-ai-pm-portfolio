"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#13140f] text-[#e4e2db] flex flex-col overflow-x-hidden">
      <Navbar />

      <main
        className="flex-grow pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto w-full"
        style={{
          background: `radial-gradient(at 0% 0%, rgba(190, 194, 252, 0.1) 0px, transparent 50%),
                       radial-gradient(at 100% 100%, rgba(71, 240, 244, 0.05) 0px, transparent 50%)`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#47f0f4] tracking-widest uppercase">
                Get in touch
              </span>
              <h1 className="font-bold text-4xl md:text-5xl text-[#e4e2db] leading-tight tracking-tight">
                Architecting the future,{" "}
                <br />
                <span className="text-[#47f0f4]">one interaction</span> at a time.
              </h1>
              <p className="text-[#c7c5d0] text-base max-w-md leading-relaxed">
                Whether you are looking to discuss product strategy, AI implementation,
                or just want to talk about technical architecture — I am always open to
                new connections and ambitious projects.
              </p>
            </div>

            {/* Contact Links */}
              <div className="space-y-6">

                <a
                  href="mailto:hello@chiagoziem.ai"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-[#47f0f4] group-hover:bg-[#47f0f4]/10 transition-colors text-lg">
                  <span role="img" aria-label="email">@</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#91909a] uppercase tracking-widest">
                    Direct Email
                  </p>
                  <span className="text-[#e4e2db] font-semibold hover:text-[#47f0f4] transition-colors">
                    hello@chiagoziem.ai
                  </span>
                </div>

                </a>

              
                <a
                  href="https://linkedin.com/in/chiagoziem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-[#47f0f4] group-hover:bg-[#47f0f4]/10 transition-colors font-bold text-sm">
                  <span>in</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#91909a] uppercase tracking-widest">
                    LinkedIn Network
                  </p>
                  <span className="text-[#e4e2db] font-semibold hover:text-[#47f0f4] transition-colors">
                    linkedin.com/in/chiagoziem
                  </span>
                </div>
                </a>
            </div>

            {/* Status Badge */}
            <div className="border border-white/10 border-l-4 border-l-[#47f0f4] bg-white/5 backdrop-blur-xl p-6 rounded-2xl inline-block">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#47f0f4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#47f0f4]"></span>
                </div>
                <span className="text-xs font-mono text-[#21dce0]">
                  System Status: Active &amp; accepting inquiries
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#47f0f4]/5 rounded-full blur-3xl"></div>

              {isSuccess ? (
                <div className="text-center py-16 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#47f0f4]/10 flex items-center justify-center text-[#47f0f4] text-3xl">
                    <span>&#10003;</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#e4e2db]">
                    Message Sent!
                  </h3>
                  <p className="text-[#c7c5d0] text-base">
                    Thank you for reaching out. I will get back to you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-mono text-[#c7c5d0] uppercase tracking-widest"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Jane Doe"
                        required
                        className="w-full bg-[#0e0f0a] border border-white/10 rounded-xl px-6 py-4 text-[#e4e2db] placeholder:text-[#91909a] focus:outline-none focus:ring-2 focus:ring-[#47f0f4]/50 focus:border-[#47f0f4] transition-all text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-mono text-[#c7c5d0] uppercase tracking-widest"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@example.com"
                        required
                        className="w-full bg-[#0e0f0a] border border-white/10 rounded-xl px-6 py-4 text-[#e4e2db] placeholder:text-[#91909a] focus:outline-none focus:ring-2 focus:ring-[#47f0f4]/50 focus:border-[#47f0f4] transition-all text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-mono text-[#c7c5d0] uppercase tracking-widest"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      className="w-full bg-[#0e0f0a] border border-white/10 rounded-xl px-6 py-4 text-[#e4e2db] placeholder:text-[#91909a] focus:outline-none focus:ring-2 focus:ring-[#47f0f4]/50 focus:border-[#47f0f4] transition-all text-base resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#47f0f4] text-[#003738] font-bold text-lg py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(0,212,216,0.4)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <span>Initiate Contact</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Decorative placeholders */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-gradient-to-br from-[#1a1f4e] via-[#0a0c1f] to-[#13140f] flex items-center justify-center"
                >
                  <span className="text-[#47f0f4]/20 text-4xl">&#10022;</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}