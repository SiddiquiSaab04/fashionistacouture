import React, { useState } from "react";
import { Compass, Sparkles, MapPin, Eye, ArrowUpRight, ArrowLeft } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import StaggeredHeading from "./StaggeredHeading";

interface ShowroomItem {
  id: string;
  city: string;
  title: string;
  image: string;
  address: string;
  specialty: string;
  vibetone: string;
  description: string;
}

export default function NetworkHubSection() {
  const [selectedCity, setSelectedCity] = useState("paris");

  const showrooms: ShowroomItem[] = [
    {
      id: "paris",
      city: "Paris Showroom",
      title: "Atelier de Couture Parisienne",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
      address: "Rue du Faubourg Saint-Honoré, 75008 Paris",
      specialty: "High-Drape Fluidity Silks & Organzas",
      vibetone: "Romantic Haute Modernism",
      description: "Our historic Paris studio serves as the absolute epicenter of drape engineering, combining centuries of local artisanal lace techniques with live, simulated silk mapping."
    },
    {
      id: "tokyo",
      city: "Tokyo Showroom",
      title: "Neon Loom Cybertech Gallery",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80",
      address: "Aoyama, Minato City, Tokyo 107-0062",
      specialty: "Rigid Structural Armor & Luminescent Fibers",
      vibetone: "Tokyo Cyber Avant-Garde",
      description: "Hidden within the architectural heart of Aoyama, this studio develops flexible liquid polymer corsets and glowing structural fibers engineered to defy 3D gravity limits."
    },
    {
      id: "newyork",
      city: "New York Showroom",
      title: "Manhattan Flatiron Design Hub",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80",
      address: "Fifth Avenue, Flatiron, New York 10010",
      specialty: "Minimalist Geometric Linework & Daywear",
      vibetone: "High-Contrast Manhattan Luxury",
      description: "Servicing private clients with bespoke digital sizing profiles, our Manhattan loft translates raw digital blueprints into custom physical eveningwear."
    }
  ];

  const currentShowroom = showrooms.find((s) => s.id === selectedCity) || showrooms[0];

  return (
    <div className="w-full max-w-6xl mx-auto select-none pt-4 pb-12 md:pt-8 md:pb-20 relative px-4 border-t border-white/[0.03] bg-black/30 md:bg-transparent" id="global-showroom-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Beautiful Global selection map thumbnail */}
        <div className="lg:col-span-7 order-2 lg:order-1 relative">
          <ScrollReveal animationType="zoom-in" delay={155}>
            <div className="relative group rounded-3xl border border-white/5 bg-[#05050a]/60 shadow-[0_20px_50px_rgba(255,0,127,0.03)] p-4 overflow-hidden">
              
              {/* Image box showing selected city's lookbook */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 bg-[#030308]/95 group-hover:border-pink-500/20 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D"                  alt={currentShowroom.city}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover saturate-[1.1] group-hover:scale-[1.03] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/20 to-transparent p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-widest text-pink-300 uppercase mb-1">
                    <MapPin size={9} className="text-pink-400 animate-bounce" />
                    <span>{currentShowroom.city}</span>
                  </div>
                  <h3 className="font-wide text-xs sm:text-base font-extrabold text-white uppercase tracking-wider">
                    {currentShowroom.title}
                  </h3>
                </div>
              </div>

              {/* Showroom Specs Board instead of raw latency nodes */}
              <div className="absolute top-8 right-8 flex flex-col gap-1.5 bg-[#04040a]/80 backdrop-blur-md p-3.5 border border-white/5 rounded-2xl font-mono text-[8.5px] tracking-wider text-[#ffd3dc]/90">
                <div className="text-white/40 border-b border-white/5 pb-1 select-none font-bold">SHOWROOM_SPECS</div>
                <div>THEME: <span className="text-white font-semibold">{currentShowroom.vibetone}</span></div>
                <div className="mt-1">LOCAL TIME: <span className="text-pink-400 font-bold">RUNWAY ACTIVE</span></div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* Right column: Dynamic listings of global nodes */}
        <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
          <div>
            <StaggeredHeading
              badgeText="Global Showroom Grid"
              title="Decentralized Design Capitals"
              subtitle="Connecting our physical custom textile looms and digital virtual lookbooks across the globe. Select a capital to preview local design parameters and directions."
              align="left"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {showrooms.map((showroom) => (
              <ScrollReveal
                key={showroom.id}
                animationType="slide-right"
                delay={200}
                className="w-full"
              >
                <button
                  onClick={() => setSelectedCity(showroom.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    selectedCity === showroom.id
                      ? "bg-pink-500/10 border-pink-500/30 shadow-[0_4px_20px_rgba(255,0,127,0.06)]"
                      : "bg-white/[0.005] border-white/5 hover:border-pink-500/10 hover:bg-white/[0.015]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 bg-pink-500/5 border border-pink-500/20 text-pink-450 rounded-lg ${
                      selectedCity === showroom.id ? "text-pink-400 border-pink-400" : "text-slate-500"
                    }`}>
                      <MapPin size={12} />
                    </div>
                    <div>
                      <h4 className="font-wide text-[10px] sm:text-[11px] font-bold tracking-wider text-white uppercase">
                        {showroom.city}
                      </h4>
                      <span className="font-mono text-[7.5px] tracking-widest text-[#fce7ec]/40 uppercase block mt-0.5">
                        {showroom.specialty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 h-full">
                    {selectedCity === showroom.id ? (
                      <span className="font-mono text-[7px] tracking-wider text-pink-400 font-bold border border-pink-500/30 px-2 py-0.5 rounded uppercase">
                        ACTIVE VIEW
                      </span>
                    ) : (
                      <ArrowUpRight size={11} className="text-white/20" />
                    )}
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Active Description Editorial Card */}
          <ScrollReveal animationType="fade" delay={250}>
            <div className="p-5 rounded-2xl border border-white/5 bg-[#05050c]/30 text-slate-400 space-y-2">
              <span className="font-mono text-[8px] tracking-wider text-pink-400 font-bold block">EDITORIAL SYNOPSIS:</span>
              <p className="font-sans text-[11.5px] leading-relaxed font-light text-slate-350">
                {currentShowroom.description}
              </p>
              <div className="pt-2 border-t border-white/[0.03] flex items-center justify-between font-mono text-[8px] text-[#ffd1da]/40 uppercase select-none">
                <span>ADDRESS: {currentShowroom.address}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
