import React, { useState } from "react";
import { Scissors, Shirt, Sparkles, Layers, ChevronRight, Eye, Sparkle, Compass, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import StaggeredHeading from "./StaggeredHeading";

interface TechComponent {
  id: string;
  name: string;
  type: string;
  status: string;
  load: string;
  image: string;
  designer: string;
  description: string;
}

export default function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState("gowns");

  const components: TechComponent[] = [
    {
      id: "gowns",
      name: "Avant-Garde Gown Silhouettes",
      type: "Liquid Silk Collection",
      status: "STYLISH",
      load: "Light Silk (DF 94%)",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
      designer: "Alessia Varon // Milano",
      description: "Asymmetrical structures built using a signature synthetic silk matrix. It calculates gravity stress coordinates relative to the wearer's motion curves, resulting in unparalleled fluid drape dynamics.",
    },
    {
      id: "corsets",
      name: "Sculptural Corsetry Models",
      type: "3D Geometric Architecture",
      status: "DEFINED",
      load: "Rigid Shell (DF 42%)",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
      designer: "HoloFabric Labs // Tokyo",
      description: "Structured high-fashion bodices merging digital structural framing with luxurious protective fabrics. It molds perfectly to organic contours while maintaining ultra-clean geometric boundaries.",
    },
    {
      id: "drapes",
      name: "Asymmetrical Draped Tulle",
      type: "Organic Drape Concept",
      status: "NOMINAL",
      load: "Flowing Mesh (DF 88%)",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      designer: "Studio Kaelen // Paris",
      description: "Generous multi-layered drapes crafted with extreme micro-pleating and ultra-light organic fibers. Designed to respond dynamically to natural wind-force resistance curves.",
    },
  ];

  const currentComp = components.find((c) => c.id === activeTab) || components[0];

  return (
    <div className="w-full max-w-6xl mx-auto select-none py-12 md:py-24 relative px-4 overflow-hidden" id="atelier-blueprints-section">
      
      {/* 1. LAYERED MINIMAL OPACITY FASHION IMAGE OVERLAY BACKGROUND - Hidden on mobile to avoid text clashing/overlapping */}
      <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0 overflow-hidden hidden md:flex justify-around items-center opacity-[0.035]">
        {components.map((comp) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: activeTab === comp.id ? 0.35 : 0.08, 
              scale: activeTab === comp.id ? 1.05 : 0.9,
              rotate: comp.id === "gowns" ? -6 : comp.id === "corsets" ? 4 : -2
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="w-[280px] h-[380px] relative rounded-[40px] overflow-hidden border-2 border-white/20 shadow-2xl shrink-0"
          >
            <img
              src={comp.image}
              alt="Couture Layered Overlay"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: High-fidelity info list & Interactive selectors */}
        <div className="lg:col-span-5 space-y-8">
          <div>
          <StaggeredHeading
            badgeText="Atelier Composition"
            title="Virtual Couture Collections"
            subtitle="Interact with our primary silhouette frameworks. Select a category below to preview organic movement and drape parameters modeled in our active digital atelier."
            align="left"
          />
          </div>

          {/* Interactive Stack list with Framer Motion hover properties */}
          <div className="space-y-3.5">
            {components.map((comp) => (
              <motion.button
                key={comp.id}
                onClick={() => setActiveTab(comp.id)}
                whileHover={{ scale: 1.015, x: 5 }}
                whileTap={{ scale: 0.995 }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  activeTab === comp.id
                    ? "bg-gradient-to-r from-pink-500/15 to-fuchsia-500/5 border-pink-500/40 shadow-[0_4px_25px_rgba(255,0,127,0.1)]"
                    : "bg-[#04040a]/40 border-white/5 hover:bg-white/[0.02] hover:border-pink-500/15"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-xl border transition-all ${
                    activeTab === comp.id
                      ? "bg-pink-500/20 border-pink-400 text-pink-400"
                      : "bg-white/[0.04] border-white/10 text-slate-400"
                  }`}>
                    {comp.id === "gowns" && <Shirt size={15} />}
                    {comp.id === "corsets" && <Scissors size={15} />}
                    {comp.id === "drapes" && <Layers size={15} />}
                  </div>
                  <div>
                    <h4 className="font-wide text-[11px] sm:text-[12px] font-black tracking-wider text-white uppercase">
                      {comp.name}
                    </h4>
                    <span className="font-mono text-[8.5px] tracking-widest text-pink-300/60 uppercase block mt-0.5">
                      {comp.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeTab === comp.id && (
                    <span className="font-mono text-[8px] tracking-widest text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/25 uppercase">
                      MODEL ACTIVE
                    </span>
                  )}
                  <ChevronRight size={14} className={`transition-transform duration-350 text-white/30 ${
                    activeTab === comp.id ? "translate-x-1 text-pink-400" : ""
                  }`} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right column: High-Fashion Lookbook Frame with smooth layout image transitions */}
        <div className="lg:col-span-7 relative">
          <ScrollReveal animationType="zoom-in" delay={150}>
            <div className="relative group rounded-[32px] border-2 border-white/10 bg-black/40 shadow-[0_30px_70px_rgba(255,0,127,0.05)] p-5 overflow-hidden">
              
              {/* Image Frame with Spring animation based on active state */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-[#030308]/95 group-hover:border-pink-500/30 transition-all duration-500">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={currentComp.image}
                    alt={currentComp.name}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05, filter: "brightness(0.5)" }}
                    animate={{ opacity: 1, scale: 1, filter: "brightness(1) saturate(1.15)" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Ambient dynamic gold lines */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/20 to-transparent p-6 flex flex-col justify-end">
                  <span className="font-mono text-[8.5px] tracking-[0.25em] text-pink-300 font-bold uppercase">
                    STUDIO STYLING // {currentComp.designer.toUpperCase()}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="font-wide text-sm font-black text-white uppercase tracking-wider">
                      {currentComp.type}
                    </h3>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-500/20 border border-pink-500/35 rounded-md font-mono text-[7.5px] tracking-widest text-pink-300 font-bold uppercase">
                      <Sparkle size={9} className="animate-spin" style={{ animationDuration: "6s" }} />
                      <span>{currentComp.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic technical spec metric cards */}
              <div className="mt-6 space-y-4 px-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-[#ffaec1] uppercase">
                      SILHOUETTE SPECIFICATION // CAD_PRO:{activeTab.toUpperCase()}
                    </span>
                    <h3 className="font-wide text-xs sm:text-base font-black tracking-wider text-pink-300 uppercase mt-0.5">
                      {currentComp.name}
                    </h3>
                  </div>
                  <div className="flex gap-4 font-mono text-[9px] text-slate-350 tracking-wider">
                    <div className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      THREAD: <span className="text-white font-bold">{currentComp.status}</span>
                    </div>
                    <div className="bg-pink-500/10 px-2.5 py-1 rounded border border-pink-500/20">
                      FLOW: <span className="text-pink-300 font-bold">{currentComp.load}</span>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-[12px] text-slate-400 leading-relaxed font-light">
                  {currentComp.description}
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}

