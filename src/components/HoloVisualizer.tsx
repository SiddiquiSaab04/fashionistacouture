import React, { useState } from "react";
import { Sparkles, Scissors, Shirt, Crown, ArrowUpRight, Eye, Play, Pause, Compass, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import StaggeredHeading from "./StaggeredHeading";

interface CarouselImage {
  id: string;
  url: string;
  title: string;
  category: string;
  designer: string;
  fabric: string;
  drapeAngle: string;
  elasticity: string;
  flowSpeed: string;
  description: string;
}

export default function HoloVisualizer() {
  const [selectedItem, setSelectedItem] = useState<CarouselImage | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Exquisite Unsplash royal colorful fashion lookbook photos
  const track1: CarouselImage[] = [
    {
      id: "track1-1",
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
      title: "Royal Crimson Silhouette",
      category: "Haute Gowns",
      designer: "Alessia Varon // Milano",
      fabric: "100% Raw Mulberry Silk Tulle",
      drapeAngle: "78° Flow-Curve",
      elasticity: "94% Fluidity",
      flowSpeed: "0.22m/sec",
      description: "Crafted to curve smoothly over the shoulder line, cascading into an architectural ocean of translucent crimson plissé layers."
    },
    {
      id: "track1-2",
      url: "https://plus.unsplash.com/premium_photo-1740409496384-07281358a2a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZyUyMGNvYXQlMjBmYXNoaW9ufGVufDB8fDB8fHww",
      title: "Crimson Pleated Cascade",
      category: "Sculptural Draping",
      designer: "Studio Kaelen // Paris",
      fabric: "Luxury Plissé Taffeta",
      drapeAngle: "45° Structural Fold",
      elasticity: "65% Tension Rigidity",
      flowSpeed: "0.12m/sec",
      description: "Generous deep plissé folds featuring layered scarlet hues that shift dynamically when capturing low warm lighting coordinates."
    },
    {
      id: "track1-3",
      url: "https://images.unsplash.com/photo-1701119527218-ceed8ec844e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb24lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      title: "Flowing Sunset Chiffon",
      category: "Avant-Garde",
      designer: "Elena Rostova // Tokyo",
      fabric: "Refractive Synthetic Organza",
      drapeAngle: "55° Lift-Drape",
      elasticity: "82% Resilient Bend",
      flowSpeed: "0.45m/sec",
      description: "A playful, dramatic structural puff-shoulder concept designed using digital skeletal stress frameworks to float effortlessly."
    },
    {
      id: "track1-4",
      url: "https://images.unsplash.com/photo-1555836721-6fec17bd948a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb24lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      title: "Imperial Gold Lace Bodice",
      category: "Rigid Corsetry",
      designer: "HoloFabric Labs // Tokyo",
      fabric: "Hybrid Polymer Cotton Blend",
      drapeAngle: "12° Form Fitting",
      elasticity: "20% High-Stiffness",
      flowSpeed: "0.05m/sec",
      description: "Pre-molded structured evening armor woven in pure metallic gold thread, highlighting extreme sharp geometric lines in perfect symmetry."
    }
  ];

  const track2: CarouselImage[] = [
    {
      id: "track2-1",
      url: "https://images.unsplash.com/photo-1562347174-7370ad83dc47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGRyZXNzZXN8ZW58MHx8MHx8fDA%3D",
      title: "Vibrant Fuchsia Oversized Tux",
      category: "Tailored Luxury",
      designer: "Savile Digital // London",
      fabric: "Satin Double-Faced Silk",
      drapeAngle: "90° Clean Fall",
      elasticity: "48% Soft Hold",
      flowSpeed: "0.08m/sec",
      description: "Reimagined tailored suiting with dramatic fluid sleeves that break perfectly at the wrist to showcase geometric accessories."
    },
    {
      id: "track2-2",
      url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
      title: "Iridescent Glass Organza",
      category: "Romantic Silk",
      designer: "Maison de Fleurs // Lyon",
      fabric: "French Silk Chiffon Weave",
      drapeAngle: "115° Airy Flutter",
      elasticity: "98% Feather-Light",
      flowSpeed: "0.85m/sec",
      description: "A dreamy, double-layered petal dress that flutters at the slightest kinetic motion, simulating digital butterflies."
    },
    {
      id: "track2-3",
      url: "https://images.unsplash.com/photo-1610312774212-6bde94e8c0b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      title: "Emerald Silk Satin Veil",
      category: "Haute Gowns",
      designer: "Alessia Varon // Milano",
      fabric: "Lustrous Heavy Satin Silk",
      drapeAngle: "62° Weighty Slither",
      elasticity: "79% Liquid Flow",
      flowSpeed: "0.32m/sec",
      description: "Constructed with bias-cut panels in royal emerald that cling beautifully to organic shapes while generating heavy molten-metallic reflections."
    },
    {
      id: "track2-4",
      url: "https://images.unsplash.com/photo-1583433306546-ded68847fd0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb24lMjBkcmVzc2VzfGVufDB8fDB8fHww",
      title: "Majestic Magenta Tulle Gown",
      category: "Minimalist",
      designer: "Sora Takahashi // Kyoto",
      fabric: "Organic Crepe de Chine",
      drapeAngle: "88° Floating Edge",
      elasticity: "72% Soft Pleat",
      flowSpeed: "0.19m/sec",
      description: "Draped flat patterns merging traditional Kimono silhouettes with contemporary Western flowing hemlines."
    }
  ];

  return (
    <div
      id="haute-drape-visualizer"
      className="glass-panel w-full max-w-5xl rounded-3xl border-pink-500/10 p-6 md:p-8 flex flex-col shadow-[0_20px_60px_rgba(255,0,127,0.05)] overflow-hidden z-10 mx-auto bg-black/40 relative"
    >
      {/* 1. Custom CSS style for continuous looping marquee marquee scrolling */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-loop-left {
          display: flex;
          width: max-content;
          animation: scroll-left var(--speed, 35s) linear infinite;
        }
        .animate-loop-right {
          display: flex;
          width: max-content;
          animation: scroll-right var(--speed, 35s) linear infinite;
        }
        .marquee-container:hover .animate-loop-left,
        .marquee-container:hover .animate-loop-right {
          animation-play-state: paused;
        }
        .paused-marquee .animate-loop-left,
        .paused-marquee .animate-loop-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* 2. Top Header section with supreme editorial layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/5 mb-8 gap-4 select-none">
        <StaggeredHeading
          badgeText="Silhouette Motion Showcase"
          title="Haute Drape Coordinates"
          subtitle="Explore flowing digital fabrics and signature runway structures. Hover over any piece to halt the rotation, and tap to zoom into interactive fabric specifications."
          align="left"
        />

        {/* Carousel Control Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10 text-pink-300 hover:text-white font-mono text-[8px] tracking-widest uppercase transition-all duration-300 cursor-pointer"
          >
            {isPaused ? <Play size={10} className="fill-pink-300" /> : <Pause size={10} />}
            <span>{isPaused ? "RESUME MARQUEE" : "PAUSE MARQUEE"}</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.015] border border-white/5 rounded-full font-mono text-[7.5px] tracking-widest text-[#ffe3e9]/60">
            <Activity size={10} className="text-pink-400 animate-pulse" />
            <span>FABRIC_STRESS: PASS</span>
          </div>
        </div>
      </div>

      {/* 3. Sliding Marquee loop container */}
      <div className={`marquee-container relative space-y-5 overflow-hidden py-2 ${isPaused ? "paused-marquee" : ""}`}>
        
        {/* Track 1: Leftward infinite marquee scroll */}
        <div className="overflow-hidden w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/30 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/30 to-transparent z-20 pointer-events-none" />
          
          <div className="animate-loop-left" style={{ "--speed": "32s" } as React.CSSProperties}>
            {/* Double the array elements to ensure absolute fluid seamless lookbook loop */}
            {[...track1, ...track1].map((image, index) => (
              <div
                key={`${image.id}-loop-${index}`}
                onClick={() => setSelectedItem(image)}
                className="w-[200px] sm:w-[250px] aspect-[3/4] mr-5 rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/30 bg-[#030305] group cursor-pointer relative transition-all duration-500 hover:scale-[1.02] shadow-lg shrink-0"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-[1.25] group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Floating text details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[7px] tracking-wider text-pink-300 uppercase block mb-0.5">
                    {image.category}
                  </span>
                  <h4 className="font-wide text-[10px] font-bold tracking-wider text-white uppercase truncate">
                    {image.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 font-mono text-[6.5px] text-white/50 uppercase">
                    <span>{image.designer}</span>
                    <ArrowUpRight size={10} className="text-pink-400" />
                  </div>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 border border-white/10 rounded font-mono text-[7px] text-[#ffedf1]/70 group-hover:border-pink-500/40 uppercase tracking-widest">
                  {image.drapeAngle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Rightward infinite marquee scroll */}
        <div className="overflow-hidden w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/30 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/30 to-transparent z-20 pointer-events-none" />

          <div className="animate-loop-right" style={{ "--speed": "38s" } as React.CSSProperties}>
            {[...track2, ...track2].map((image, index) => (
              <div
                key={`${image.id}-loop-${index}`}
                onClick={() => setSelectedItem(image)}
                className="w-[200px] sm:w-[250px] aspect-[3/4] mr-5 rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/30 bg-[#030305] group cursor-pointer relative transition-all duration-500 hover:scale-[1.02] shadow-lg shrink-0"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-[1.25] group-hover:scale-105 transition-all duration-700"
                />

                {/* Floating text details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[7px] tracking-wider text-pink-300 uppercase block mb-0.5">
                    {image.category}
                  </span>
                  <h4 className="font-wide text-[10px] font-bold tracking-wider text-white uppercase truncate">
                    {image.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 font-mono text-[6.5px] text-white/50 uppercase">
                    <span>{image.designer}</span>
                    <ArrowUpRight size={10} className="text-pink-400" />
                  </div>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 border border-white/10 rounded font-mono text-[7px] text-[#ffedf1]/70 group-hover:border-pink-500/40 uppercase tracking-widest">
                  {image.drapeAngle}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Elegant Interactive Spec Sheet Modal on Click */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-[#010103]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#050409] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 select-none cursor-default grid grid-cols-1 md:grid-cols-2 gap-6 relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white/30 hover:text-white font-mono text-[9px] uppercase tracking-widest border border-white/10 rounded-full px-2.5 py-1 hover:bg-white/5 cursor-pointer z-20"
              >
                [ ESC CLOSE ]
              </button>

              {/* Photo spotlight side */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-black shadow-inner">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/10 to-transparent p-4 flex flex-col justify-end">
                  <span className="font-mono text-[7px] tracking-widest text-pink-400 uppercase">
                    ACTIVE SELECTION FOR COUTURE ARCHITECTURE
                  </span>
                  <h3 className="font-wide text-xs sm:text-sm font-bold tracking-tight text-white uppercase mt-0.5">
                    {selectedItem.title}
                  </h3>
                </div>
              </div>

              {/* Specs and interactive controls side */}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.2em] font-bold text-pink-300 uppercase">
                      Couture Specification Card
                    </span>
                    <h2 className="font-wide text-base font-extrabold text-white uppercase mt-1 leading-none">
                      {selectedItem.title}
                    </h2>
                  </div>

                  <p className="font-sans text-[11px] text-slate-400 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                      <span className="text-white/40 uppercase">DESIGNER:</span>
                      <span className="text-white font-semibold">{selectedItem.designer}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                      <span className="text-white/40 uppercase">FABRIC MATERIAL:</span>
                      <span className="text-pink-300">{selectedItem.fabric}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                      <span className="text-white/40 uppercase">DRAPE ANGLE:</span>
                      <span className="text-[#ffd0d9]">{selectedItem.drapeAngle}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                      <span className="text-white/40 uppercase">COMPUTE ELASTICITY:</span>
                      <span className="text-pink-300">{selectedItem.elasticity}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                      <span className="text-white/40 uppercase">MOTION FALL RATE:</span>
                      <span className="text-[#ffd0d9]">{selectedItem.flowSpeed}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      const targetEl = document.getElementById("consult-sector");
                      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 font-mono text-[9px] text-white font-bold tracking-widest uppercase rounded-xl transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <Eye size={12} />
                    <span>SECURE THIS STYLE FORM</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
