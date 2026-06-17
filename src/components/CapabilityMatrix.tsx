import React, { useRef, useState } from "react";
import { Scissors, Shirt, Crown, Layers, RefreshCw, Sparkles, Sliders, Cpu, Compass, Flame } from "lucide-react";
import { motion } from "motion/react";

interface CapabilityProps {
  title: string;
  description: string;
  metrics: string;
  icon: React.ReactNode;
  accentColor: string;
}

function CapabilityCard({ title, description, metrics, icon, accentColor }: CapabilityProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -12, 
        scale: 1.025, 
        rotateX: -2,
        rotateY: 2,
        boxShadow: `0 20px 40px rgba(255, 0, 127, 0.12)`
      }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative rounded-3xl bg-[#030308]/65 border-2 border-white/5 hover:border-pink-500/25 p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300 select-none pb-10 h-full min-h-[250px]"
    >
      {/* 1. Dynamic border glow cursor-tracker */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-550 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 0, 127, 0.16), transparent 70%)`,
        }}
      />

      {/* 2. Card Content */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center justify-between mb-6">
          {/* Enhanced Dual-Tone Glowing Badge for Icons */}
          <div className={`w-14 h-14 rounded-2xl bg-white/[0.02] border-2 border-white/10 flex items-center justify-center text-slate-300 group-hover:text-pink-400 group-hover:border-pink-500/55 group-hover:bg-pink-500/[0.04] group-hover:shadow-[0_0_20px_rgba(255,0,127,0.35)] transition-all duration-500`}>
            {icon}
          </div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-pink-300/40 uppercase font-black group-hover:text-pink-400/80 transition-colors">
            {metrics}
          </span>
        </div>

        <h3 className="font-wide text-sm sm:text-base tracking-[0.16em] uppercase font-black text-white mb-3 group-hover:text-pink-200 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="font-sans text-[12px] sm:text-[13px] text-slate-400 tracking-wide font-light leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* 3. Subtle corner tech bracket decorations */}
      <div className="absolute top-3 right-3 font-mono text-[8px] tracking-widest text-pink-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">[ COUTURE_PILLAR ]</div>
    </motion.div>
  );
}

export default function CapabilityMatrix() {
  const cards: CapabilityProps[] = [
    {
      title: "NEURAL WEAVE TECHNOLOGY",
      description: "Autonomous high-precision loom synchronization utilizing molecular fiber geometry for multi-region, zero-defect luxurious synthetic silks.",
      metrics: "FIBER_CURVE_WEAVE // LOOM_01",
      icon: <Cpu size={24} className="stroke-[1.5] group-hover:rotate-45 transition-transform duration-500" />,
      accentColor: "pink"
    },
    {
      title: "KINETIC PATTERN SCULPTING",
      description: "Dynamic stress-load algorithms projecting real-time organic draped layouts and kinetic wind-resistance lookbook formulations.",
      metrics: "DRAPE_FORCE < 0.15N // SPEED_MAX",
      icon: <Sliders size={24} className="stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />,
      accentColor: "pink"
    },
    {
      title: "REFRACTIVE CHROMATIC YARN",
      description: "Infusing physical threads with glowing electromagnetic micro-particles to achieve an exquisite premium sunset and neon luster.",
      metrics: "GLOW_INDEX_COUTURE // INTENSITY",
      icon: <Flame size={24} className="stroke-[1.5] group-hover:animate-bounce transition-transform duration-500" />,
      accentColor: "pink"
    },
    {
      title: "HOMOMORPHIC 3D FIT MATRIX",
      description: "Bespoke body blueprint skeletal garment mapping analyzing dimensional sizing coordinates, fully preserving wearer privacy.",
      metrics: "FIT_STAB_SYNC_MATRIX // TRUE_DIMS",
      icon: <Compass size={24} className="stroke-[1.5] group-hover:-rotate-45 transition-transform duration-500" />,
      accentColor: "pink"
    }
  ];

  return (
    <div id="capability-matrix-section" className="w-full max-w-5xl mx-auto z-10 relative select-none">
      {/* Title block */}
      <div className="flex flex-col items-start mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 mb-3.5 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
          <RefreshCw size={12} className="text-pink-450 animate-spin" style={{ animationDuration: "14s" }} />
          <span className="font-mono text-[9px] tracking-[0.25em] text-pink-300 uppercase font-black">Atelier Manifesto Core</span>
        </div>
        <h2 className="font-wide text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
          Virtual Couture Pillars
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-slate-400 font-sans tracking-wide font-light max-w-lg leading-relaxed">
          The foundational technological and creative frameworks driving digital couture fabrication and modern haute-couture dress modeling.
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <CapabilityCard
              title={card.title}
              description={card.description}
              metrics={card.metrics}
              icon={card.icon}
              accentColor={card.accentColor}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

