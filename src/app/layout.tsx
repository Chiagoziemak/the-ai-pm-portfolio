import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DEFAULT_SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_SITE_URL),
  title: {
    template: "%s | Chiagoziem Melvin Akobundu",
    default: "Chiagoziem Melvin Akobundu | AI Product Manager & Engineer",
  },
  description:
    "Portfolio of Chiagoziem Melvin Akobundu - Experienced SaaS Product Manager & Certified Scrum Product Owner (CSPO) transitioning into AI Product Management & AI Engineering. Builder of ResumeGenie.",
  keywords: [
    "AI Product Manager",
    "AI Engineer",
    "Product Management Portfolio",
    "Product Strategy Teardowns",
    "Agentic Workflows",
    "SaaS PM",
    "ResumeGenie",
    "CSPO",
    "CSM",
    "Chiagoziem Melvin Akobundu",
  ],
  authors: [{ name: "Chiagoziem Melvin Akobundu", url: DEFAULT_SITE_URL }],
  creator: "Chiagoziem Melvin Akobundu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: DEFAULT_SITE_URL,
    title: "Chiagoziem Melvin Akobundu | AI Product Manager & Engineer",
    description:
      "Architecting and evaluating agentic AI workflows, LLM applications, and high-growth consumer products. CSPO certified with expertise in technical product management.",
    siteName: "Chiagoziem Melvin Akobundu Portfolio",
    images: [
      {
        url: "/profile-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Chiagoziem Melvin Akobundu — AI Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiagoziem Melvin Akobundu | AI Product Manager & Engineer",
    description:
      "Architecting and evaluating agentic AI workflows, LLM applications, and high-growth consumer products.",
    images: ["/profile-hero.jpg"],
    creator: "@chiagoziemak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
