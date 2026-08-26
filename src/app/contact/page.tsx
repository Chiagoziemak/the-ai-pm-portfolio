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
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-5 md:px-16 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-accent-teal tracking-widest uppercase font-bold">
                Get in touch
              </span>
              <h1 className="font-bold text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
                Architecting the future,{" "}
                <br />
                <span className="text-accent-teal">one interaction</span> at a time.
              </h1>
              <p className="text-foreground/80 text-base max-w-md leading-relaxed">
                Whether you are looking to discuss product strategy, AI implementation,
                or just want to talk about technical architecture — I am always open to
                new connections and ambitious projects.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-6">
              <a
                href="mailto:melvynmatthews19@gmail.com"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl border border-card-border glass-panel flex items-center justify-center text-accent-teal group-hover:bg-accent-teal/10 transition-colors text-lg">
                  <span role="img" aria-label="email">@</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    Direct Email
                  </p>
                  <span className="text-foreground font-semibold hover:text-accent-teal transition-colors">
                    melvynmatthews19@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/chiagoziem-melvin-akobundu-cspo%E2%93%A1-b546b4206"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl border border-card-border glass-panel flex items-center justify-center text-accent-teal group-hover:bg-accent-teal/10 transition-colors font-bold text-sm">
                  <span>in</span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    LinkedIn Network
                  </p>
                  <span className="text-foreground font-semibold hover:text-accent-teal transition-colors">
                    Chiagoziem Melvin Akobundu
                  </span>
                </div>
              </a>
            </div>

            {/* Status Badge */}
            <div className="border border-card-border border-l-4 border-l-accent-teal glass-panel p-6 rounded-2xl inline-block">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-teal"></span>
                </div>
                <span className="text-xs font-mono text-accent-teal font-bold">
                  System Status: Active &amp; accepting inquiries
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <div className="border border-card-border glass-panel p-8 md:p-12 rounded-[2rem] relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl pointer-events-none"></div>

              {isSuccess ? (
                <div className="text-center py-16 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal text-3xl">
                    <span>&#10003;</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-foreground/80 text-base">
                    Thank you for reaching out. Your inquiry has been transmitted successfully.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2 rounded-xl border border-card-border bg-card hover:bg-card-border/20 text-foreground text-sm font-semibold transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {errorMessage && (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold"
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
                        className="w-full bg-card border border-card-border rounded-xl px-6 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold"
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
                        className="w-full bg-card border border-card-border rounded-xl px-6 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold"
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
                      className="w-full bg-card border border-card-border rounded-xl px-6 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-teal text-background font-bold text-lg py-5 rounded-2xl hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(0,212,216,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <span>Initiate Contact</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}