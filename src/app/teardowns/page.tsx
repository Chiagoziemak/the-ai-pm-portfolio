import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeardownsList from "./TeardownsList";
import { getTeardowns } from "@/sanity/queries";
import { mockTeardowns } from "@/data/mockData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeardownsPage() {
  const data = await getTeardowns();
  const teardowns = data.length > 0 ? data : mockTeardowns;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] glow-bg opacity-30 z-0"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full blur-[120px] glow-bg opacity-30 z-0"></div>

      <Navbar />

      <TeardownsList initialTeardowns={teardowns} />

      <Footer />
    </div>
  );
}
