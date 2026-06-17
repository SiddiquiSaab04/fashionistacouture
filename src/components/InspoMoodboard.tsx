import React, { useState } from "react";
import { Sparkles, Heart, Eye, ArrowUpRight, Share2, Layers, Compass, Wind } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import StaggeredHeading from "./StaggeredHeading";

interface InspoItem {
  id: string;
  category: string;
  title: string;
  image: string;
  designer: string;
  spec: string;
  drapeFactor: number;
  tags: string[];
  description: string;
  promptSuggestion: string;
}

export default function InspoMoodboard() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeItem, setActiveItem] = useState<InspoItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: "all", name: "All Inspiration" },
    { id: "avant-garde", name: "Avant-Garde" },
    { id: "drapery", name: "Liquid Drapery" },
    { id: "cyber-couture", name: "Cyber Couture" }
  ];

  const inspoData: InspoItem[] = [
    {
      id: "insp-01",
      category: "avant-garde",
      title: "Royal Crimson Silhouette",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      designer: "Alessia Varon // Milano",
      spec: "64% Refractive Tulle, 36% Organza Mesh",
      drapeFactor: 94,
      tags: ["Structural", "Crimson Glam", "Royal Silk"],
      description: "A spectacular royal crimson sculptural gown capturing ultimate editorial luxury. Features majestic contours draped using a proprietary physical stress simulator.",
      promptSuggestion: "Generate an avant-garde royal asymmetrical crimson gown with pleated silk drapery mapping extreme gravity curves and dynamic volume."
    },
    {
      id: "insp-02",
      category: "drapery",
      title: "Flowing Sunset Chiffon",
      image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      designer: "Studio Kaelen // Paris",
      spec: "100% Regenerative Organic Chiffon Silk",
      drapeFactor: 88,
      tags: ["Asymmetric", "Sunset Pastel", "Organic Weave"],
      description: "Breath-taking multi-layered sunset gradient chiffon drapes responding actively to runway wind-forces, delivering absolute elegance.",
      promptSuggestion: "Structure a premium sunset-hued layered chiffon gown with micro-pleated asymmetrical folds and light wind-force movement profiles."
    },
    {
      id: "insp-03",
      category: "cyber-couture",
      title: "Imperial Gold Lace Bodice",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      designer: "HoloFabric Labs // Tokyo",
      spec: "Electromagnetic Gold Threading, Liquid Polymers",
      drapeFactor: 42,
      tags: ["Imperial Gold", "Neon Lacing", "Cyber Form"],
      description: "A gorgeous cybernetic digital corset combining highly detailed gold filigree lace with neon responsive micro-particles that light up dynamically.",
      promptSuggestion: "Synthesize an imperial gold lace-clad rigid corset with glowing cyberpunk neon pink highlights, overlaid onto flowing satin drapes."
    },
    {
      id: "insp-04",
      category: "avant-garde",
      title: "Iridescent Glass Organza",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      designer: "Reine Atelier // London",
      spec: "Synthetic Poly-Chiffon, Iridescent Filaments",
      drapeFactor: 76,
      tags: ["Iridescent Volume", "Neon Fuchsia", "High-Couture"],
      description: "A stunning iridescent glass-like gown featuring brilliant neon pink reflections and architectural balloon folds that elevate virtual prestige.",
      promptSuggestion: "Model an avant-garde iridescent neon pink glass-like couture gown with architectural cascading volume and light-refractive pleats."
    },
    {
      id: "insp-05",
      category: "drapery",
      title: "Emerald Silk Satin Veil",
      image: "https://plus.unsplash.com/premium_photo-1663013425512-23e2050e694d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      designer: "Atelier Chronos // Berlin",
      spec: "100% Pure Crêpe de Chine Emerald Silk",
      drapeFactor: 98,
      tags: ["Emerald Forest", "Satin Shine", "Zero Tension"],
      description: "Exquisite heavyweight emerald satin folds styled with flawless precision around the collar. Translates physical gravity directly into regal kinetic curves.",
      promptSuggestion: "Draft a high-fidelity pure emerald forest satin veil with multi-layered organic wind drag profiles and luxurious light-scattering bloom."
    },
    {
      id: "insp-06",
      category: "cyber-couture",
      title: "Majestic Magenta Tulle Gown",
      image: "https://plus.unsplash.com/premium_photo-1713586580802-854a58542159?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      designer: "NeoCouture Team // New York",
      spec: "Digital Luminescent Tulle, Satin Backing",
      drapeFactor: 82,
      tags: ["Luminescent Seams", "Vibrant Magenta", "Regal Pomp"],
      description: "Immersive futuristic runway gown combining hot magenta layered tulle with electromagnetic coordinates to guarantee an authentic couture look.",
      promptSuggestion: "Generate a majestic royal magenta digital tulle gown with glowing pink mesh lining and an exaggerated architectural silhouette."
    }
  ];

  const filteredInspo = selectedCategory === "all"
    ? inspoData
    : inspoData.filter((item) => item.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-0 select-none relative" id="fashion-inspo-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/5 pb-8">
        <div>
          <StaggeredHeading
            badgeText="2026 Collection Moodboard"
            title="Fashion Inspo & Visual Trends"
            subtitle="Explore haute couture design directions, fabric specifications, and 3D simulation guidelines. Select a garment silhouette below to reveal styling parameters and generate AI prompts."
            align="left"
          />
        </div>

        {/* Category Filters */}
        <ScrollReveal animationType="fade" delay={200} className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-[8.5px] uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-pink-500/10 border-pink-500/40 text-pink-300 shadow-[0_2px_15px_rgba(255,0,127,0.06)] scale-[1.02]"
                  : "bg-white/[0.015] border-white/5 text-slate-400 hover:border-pink-500/10 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </ScrollReveal>
      </div>

      {/* Grid Layout of Inspo Lookbooks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInspo.map((item, idx) => {
          const isFav = favorites.includes(item.id);
          return (
            <ScrollReveal
              key={item.id}
              animationType="slide-up"
              delay={idx * 50} // Very low to avoid delays
              className="group cursor-pointer rounded-2xl border border-white/5 bg-[#05050a]/40 overflow-hidden hover:border-pink-500/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div onClick={() => setActiveItem(item)}>
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] saturate-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Floating Action Icons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`p-2.5 rounded-full border backdrop-blur-md transition-all duration-350 cursor-pointer ${
                        isFav
                          ? "bg-pink-500/20 border-pink-500/40 text-pink-400 scale-110"
                          : "bg-black/40 border-white/10 text-white/60 hover:border-pink-500/30 hover:text-white"
                      }`}
                      title={isFav ? "Inspo saved to collection" : "Save this inspo"}
                    >
                      <Heart size={12} className={isFav ? "fill-pink-500 text-pink-400" : ""} />
                    </button>
                  </div>

                  {/* Aesthetic Category Pill */}
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#010103]/80 backdrop-blur-md border border-white/5 rounded-full font-mono text-[7px] tracking-widest text-pink-200/60 uppercase">
                    {item.category.replace("-", " ")}
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] tracking-wider text-pink-400/50 uppercase font-semibold">
                      {item.designer}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[8.5px] text-pink-300/60">
                      <Wind size={8} />
                      <span>DF: {item.drapeFactor}%</span>
                    </div>
                  </div>

                  <h3 className="font-wide text-xs sm:text-sm font-bold tracking-wider text-white uppercase group-hover:text-pink-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[11px] leading-relaxed text-slate-450 font-light line-clamp-2">
                    {item.description}
                  </p>

                  {/* Spec labels */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.012] border border-white/5 font-mono text-[7.5px] uppercase text-slate-450 font-light">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Expand Trigger */}
              <div
                onClick={() => setActiveItem(item)}
                className="mx-5 py-3 border-t border-white/5 flex items-center justify-between font-mono text-[8px] tracking-widest text-pink-300/40 uppercase group-hover:text-pink-300 transition-colors"
              >
                <span>OPEN INSPO SPECIFICATIONS</span>
                <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Styled Modal Drawer Overlay for Deep Inspo Spec Analysis */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen bg-black/90 backdrop-blur-xl transition-all duration-300" onClick={() => setActiveItem(null)}>
          <div
            className="w-full max-w-3xl rounded-2xl border border-pink-500/10 bg-[#04040a]/95 shadow-[0_20px_60px_rgba(255,0,127,0.12)] overflow-hidden flex flex-col md:flex-row relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            {/* Left side Image with dynamic glow */}
            <div className="md:w-1/2 relative bg-black/30 aspect-[4/5] md:aspect-auto">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover saturate-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 md:hidden">
                <span className="font-mono text-[8px] tracking-[0.2em] text-pink-400 font-bold uppercase block mb-1">
                  {activeItem.designer}
                </span>
                <h3 className="font-wide text-base font-extrabold text-white uppercase">
                  {activeItem.title}
                </h3>
              </div>
            </div>

            {/* Right side Deep Spec Data */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex select-none items-center justify-between border-b border-white/5 pb-3">
                  <div className="hidden md:block">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-pink-450 font-bold uppercase block">
                      {activeItem.designer}
                    </span>
                    <h3 className="font-wide text-sm sm:text-lg font-bold tracking-wider text-white uppercase mt-0.5">
                      {activeItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="font-mono text-[9px] tracking-widest text-slate-400 hover:text-white uppercase transition-colors px-2 py-1 bg-white/5 rounded-full border border-white/5 cursor-pointer ml-auto"
                  >
                    CLOSE [esc]
                  </button>
                </div>

                {/* Summary Text */}
                <div className="space-y-1.5 font-mono text-[9px] tracking-widest text-[#fce7ec]">
                  <div className="text-white/40 border-b border-white/5 pb-1 flex items-center gap-1.5 font-bold">
                    <Layers size={11} className="text-pink-400 animate-pulse" />
                    <span>TEXTILE PARAMETERS</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/40">FIBRE CONSTITUENT:</span>
                    <span className="text-white text-right truncate max-w-[160px]">{activeItem.spec}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-white/[0.03]">
                    <span className="text-white/40">GRAVITY RIPPLE DRAPE:</span>
                    <span className="text-pink-400 font-bold">{activeItem.drapeFactor}% FORCE</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-white/[0.03]">
                    <span className="text-white/40">RECOMMENDED SHADER:</span>
                    <span className="text-fuchsia-400 font-semibold font-mono">LIQUID_ORGANZA_GLOW</span>
                  </div>
                </div>

                {/* Editorial Body */}
                <div className="space-y-2 mt-4">
                  <span className="font-mono text-[8px] tracking-wider text-slate-400 uppercase block font-bold">Design Direction & Concept:</span>
                  <p className="font-sans text-[11px] text-slate-350 leading-relaxed font-light">
                    {activeItem.description}
                  </p>
                </div>

                {/* AI Prompts Generator for Copy */}
                <div className="p-3.5 bg-pink-500/[0.02] border border-pink-500/10 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={11} className="text-pink-400 animate-pulse" />
                    <span className="font-mono text-[8px] tracking-wider font-bold text-pink-300 uppercase">Interactive Loom Prompt Idea</span>
                  </div>
                  <p className="font-mono text-[9.5px] leading-relaxed text-pink-200/90 bg-black/40 p-2.5 rounded border border-white/5 select-all cursor-pointer hover:border-pink-500/20 transition-all font-light" title="Click to select and copy">
                    {activeItem.promptSuggestion}
                  </p>
                  <span className="font-mono text-[7px] text-pink-400/50 uppercase block tracking-widest">
                    *Tip: Copy and enter this into Couture Chat below to simulate drapes.
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={(e) => toggleFavorite(activeItem.id, e)}
                  className={`flex-1 py-3 rounded-xl border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    favorites.includes(activeItem.id)
                      ? "bg-pink-500/10 border-pink-500/45 text-pink-400"
                      : "bg-white/[0.01] border-white/5 text-slate-300 hover:border-pink-500/20 hover:text-white"
                  }`}
                >
                  <Heart size={11} className={favorites.includes(activeItem.id) ? "fill-pink-500" : ""} />
                  <span>{favorites.includes(activeItem.id) ? "Inspo Saved" : "Save Inspo"}</span>
                </button>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(activeItem.promptSuggestion);
                    alert("Couture prompt copied successfully!");
                  }}
                  className="px-4 bg-pink-500/10 border border-pink-500/20 text-pink-300 rounded-xl hover:bg-pink-500/20 hover:border-pink-400 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-mono text-[9px] uppercase tracking-wider"
                >
                  <Share2 size={11} />
                  <span>Copy Spec</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
