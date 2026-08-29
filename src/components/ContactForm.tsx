"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

    // Client-side validation
    if (!formData.firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setErrorMessage("Please enter your last name.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[\d\s().-]{7,25}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        setErrorMessage("Please enter a valid phone number (e.g. +1 555 123 4567) or leave it blank.");
        setIsSubmitting(false);
        return;
      }
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
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
    <div className="border border-card-border glass-panel p-6 sm:p-8 md:p-12 rounded-[2rem] relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl pointer-events-none"></div>

      {isSuccess ? (
        <div className="text-center py-12 sm:py-16 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal text-3xl">
            <span>&#10003;</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Message Sent!
          </h3>
          <p className="text-foreground/80 text-sm sm:text-base max-w-md">
            Thank you for reaching out. Your inquiry has been transmitted successfully.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-4 px-6 py-3 rounded-xl border border-card-border bg-card hover:bg-card-border/20 text-foreground text-sm font-semibold transition-all min-h-[44px]"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
          {errorMessage && (
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* First Name & Last Name (Side by Side on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold block"
              >
                First Name <span className="text-accent-teal">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Jane"
                required
                className="w-full bg-card border border-card-border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base min-h-[48px]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold block"
              >
                Last Name <span className="text-accent-teal">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                required
                className="w-full bg-card border border-card-border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base min-h-[48px]"
              />
            </div>
          </div>

          {/* Email Address & Phone Number (Side by Side on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold block"
              >
                Email Address <span className="text-accent-teal">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jane@example.com"
                required
                className="w-full bg-card border border-card-border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base min-h-[48px]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold flex items-center justify-between"
              >
                <span>Phone Number</span>
                <span className="text-[10px] text-foreground/50 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-card border border-card-border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base min-h-[48px]"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-xs font-mono text-foreground/75 uppercase tracking-widest font-semibold block"
            >
              Message <span className="text-accent-teal">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project, team, or opportunity..."
              required
              rows={5}
              className="w-full bg-card border border-card-border rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all text-base resize-none min-h-[140px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-teal text-background font-bold text-base sm:text-lg py-4 sm:py-5 rounded-2xl hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(0,212,216,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 shadow-sm min-h-[52px]"
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
  );
}
