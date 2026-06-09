import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
