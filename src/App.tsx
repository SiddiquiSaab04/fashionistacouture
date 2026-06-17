import React, { useEffect } from "react";
import Lenis from "lenis";
import AmbientBackground from "./components/AmbientBackground";
import NetworkCanvas from "./components/NetworkCanvas";
import CustomCursor from "./components/CustomCursor";
import LandingHero from "./components/LandingHero";
import AIWorkspace from "./components/AIWorkspace";
import HoloVisualizer from "./components/HoloVisualizer";
import CapabilityMatrix from "./components/CapabilityMatrix";
import ArchitectureSection from "./components/ArchitectureSection";
import NetworkHubSection from "./components/NetworkHubSection";
import ContactPortal from "./components/ContactPortal";
import InspoMoodboard from "./components/InspoMoodboard";
import ScrollReveal from "./components/ScrollReveal";
import { Terminal, Scissors, Shirt, Sparkles, Crown, Mail, RefreshCw, Cpu, Layers, Globe, Compass } from "lucide-react";

export default function App() {
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    // Initialize Lenis Smooth Scroll immediately with high responsiveness & zero input delay
    const lenis = new Lenis({
      duration: 1.0, // snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential
      infinite: false,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#010103] text-[#fce7ec]" id="root-portal-view">
      {/* 1. Cinematic Background System */}
      <AmbientBackground />
      <NetworkCanvas />
      <CustomCursor />

      {/* 2. Premium Upper Floating Header Navigation Menu */}
      <header className="fixed top-0 inset-x-0 h-16 bg-gradient-to-b from-[#010103]/80 to-transparent backdrop-blur-md z-50 border-b border-white/[0.03] select-none flex items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Cinematic Wide Logo branding */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-wide text-xs tracking-[0.45em] font-extrabold uppercase text-white hover:text-pink-400 transition-colors duration-300 flex items-center gap-2.5 cursor-pointer"
          data-cursor-label="GO-TOP"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-pink-500 to-fuchsia-500 animate-pulse shrink-0" />
          <span>F A S H I O N I S T A</span>
        </button>

        {/* Links to sections */}
        <nav className="hidden lg:flex items-center gap-0.5 font-mono text-[8.5px] tracking-[0.2em] uppercase text-white/50">
          <button
            onClick={() => scrollTo("inspo-sector")}
            className="px-2.5 py-2 text-pink-300 hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer font-semibold"
            data-cursor-label="NAV-INSPO"
          >
            <Compass size={9} className="text-pink-400 animate-pulse" />
            <span>FASHION INSPO</span>
          </button>

          <button
            onClick={() => scrollTo("workspace-sector")}
            className="px-2.5 py-2 hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer"
            data-cursor-label="NAV-CLI"
          >
            <Sparkles size={10} className="text-pink-400 rotate-12" />
            <span>COUTURE CHAT</span>
          </button>
          
          <button
            onClick={() => scrollTo("visualizer-sector")}
            className="px-2.5 py-2 hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer"
            data-cursor-label="NAV-GRID"
          >
            <Shirt size={10} className="text-pink-300" />
            <span>DRAPING LAB</span>
          </button>

          <button
            onClick={() => scrollTo("architecture-sector")}
            className="px-2.5 py-2 hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer"
            data-cursor-label="NAV-ARCH"
          >
            <Layers size={10} className="text-fuchsia-400" />
            <span>ATELIER BLUEPRINTS</span>
          </button>

          <button
            onClick={() => scrollTo("network-hub-sector")}
            className="px-2.5 py-2 hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer"
            data-cursor-label="NAV-EDGE"
          >
            <Globe size={10} className="text-pink-400" />
            <span>GLOBAL SHOWROOM</span>
          </button>

          <button
            onClick={() => scrollTo("consult-sector")}
            className="px-2.5 py-2 text-fuchsia-300 hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer font-semibold"
            data-cursor-label="NAV-POST"
          >
            <Crown size={10} className="text-pink-500" />
            <span>RESERVATIONS</span>
          </button>
        </nav>

        {/* Dynamic Telemetry Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/[0.015] border border-white/5 rounded-full font-mono text-[8px] tracking-[0.18em] text-pink-300/80 uppercase">
          <Cpu size={10} className="animate-spin text-pink-400 shrink-0" style={{ animationDuration: "8s" }} />
          <span className="hidden xs:inline">DESIGN_SYNC:</span>
          <span className="font-semibold text-white animate-pulse">OPTIMIZED</span>
        </div>
      </header>

      {/* 3. Page Content Core Layout */}
      <main className="relative z-10 w-full overflow-hidden">
        
        {/* Full Screen Cinematic Hero Module */}
        <LandingHero
          onExploreClick={() => scrollTo("inspo-sector")}
          onDocsClick={() => scrollTo("architecture-sector")}
        />

        {/* Modular Interactive Sections */}
        {/* Section: Rich Fashion Lookbook & Inspiration Boards */}
        <section
          id="inspo-sector"
          className="relative py-10 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/[0.03] bg-[#020205] bg-gradient-to-b from-[#010103]/0 via-[#ff007f]/5 to-[#010103]/0"
        >
          <ScrollReveal animationType="slide-right" duration={800}>
            <InspoMoodboard />
          </ScrollReveal>
        </section>

        {/* Section A: Real-Time server-side proxied terminal workspace */}
        <section
          id="workspace-sector"
          className="relative py-12 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/[0.03] bg-gradient-to-b from-[#030303]/0 via-[#070712]/35 to-[#030303]/0"
        >
          <ScrollReveal animationType="slide-left" duration={850}>
            <AIWorkspace />
          </ScrollReveal>
        </section>

        {/* Section B: Holographic synpatic pathway circuit visualizer */}
        <section
          id="visualizer-sector"
          className="relative py-10 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/[0.03] bg-gradient-to-b from-[#030303]/0 via-[#090515]/30 to-[#030303]/0"
        >
          <ScrollReveal animationType="slide-right" duration={900}>
            <HoloVisualizer />
          </ScrollReveal>
        </section>

        {/* New Section E: Cognitive Architecture with gorgeous blueprints */}
        <section
          id="architecture-sector"
          className="relative py-10 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/[0.03] bg-gradient-to-b from-[#030303]/0 via-[#03040b]/40 to-[#030303]/0"
        >
          <ScrollReveal animationType="slide-left" duration={950}>
            <ArchitectureSection />
          </ScrollReveal>
        </section>

        {/* New Section F: Global synchronous distribution network map */}
        <section
          id="network-hub-sector"
          className="relative py-10 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/[0.03] bg-gradient-to-b from-[#030303]/0 via-[#05030c]/35 to-[#030303]/0"
        >
          <ScrollReveal animationType="slide-right" duration={1000}>
            <NetworkHubSection />
          </ScrollReveal>
        </section>

        {/* Section D: Direct consultation secure request portal */}
        <section
          id="consult-sector"
          className="relative py-12 md:py-16 px-6 md:px-12 lg:px-24 border-y border-white/[0.03] bg-gradient-to-b from-[#030303]/0 via-[#060714]/30 to-[#03030b]"
        >
          <ScrollReveal animationType="zoom-in" duration={1100}>
            <ContactPortal />
          </ScrollReveal>
        </section>

      </main>

      {/* 4. Elite Technical Footer */}
      <footer className="relative bg-[#020204]/90 border-t border-white/[0.04] py-8 px-6 md:px-12 lg:px-20 text-white/30 font-mono text-[9px] tracking-[0.16em] uppercase z-20 select-none flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span>© 1999—2026 FASHIONISTA DIGITAL ATELIER. ALL LOOKBOOK BLUEPRINTS CONFIGURABLE.</span>
        </div>
        <div className="flex gap-4">
          <span>SPDX-License: MIT</span>
          <span>DRAPING_FPS: 60/SEC</span>
        </div>
      </footer>
    </div>
  );
}
