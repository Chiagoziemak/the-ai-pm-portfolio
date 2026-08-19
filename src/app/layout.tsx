import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Chiagoziem Melvin Akobundu | AI Product Manager Portfolio",
  description: "Portfolio of Chiagoziem Melvin Akobundu - Experienced SaaS Product Manager & Certified Scrum Product Owner (CSPO) transitioning into AI Product Management & AI Engineering. Builder of ResumeGenie.",
  keywords: ["AI Product Manager", "AI Engineer", "Product Management Portfolio", "SaaS PM", "ResumeGenie", "CSPO", "CSM", "Chiagoziem Melvin Akobundu"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
