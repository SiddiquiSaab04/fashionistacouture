import React, { useState } from "react";
import { Mail, Briefcase, Cpu, CheckCircle2, Send, Activity } from "lucide-react";

interface Submission {
  name: string;
  email: string;
  classification: string;
  message: string;
  timestamp: string;
}

export default function ContactPortal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [classification, setClassification] = useState("bespoke-silhouette");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<Submission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate luxury loom reservation authorization delay
    setTimeout(() => {
      const entry: Submission = {
        name,
        email,
        classification,
        message,
        timestamp: new Date().toUTCString(),
      };

      // Store in localStorage for absolute single-session state
      const existing = localStorage.getItem("in_cognita_commissions");
      const list = existing ? JSON.parse(existing) : [];
      list.push(entry);
      localStorage.setItem("in_cognita_commissions", JSON.stringify(list));

      setSuccess(entry);
      setIsSubmitting(false);

      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
    }, 1800);
  };

  return (
    <div
      id="inquiry-portal-section"
      className="glass-panel w-full max-w-4xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 mx-auto border-pink-500/10 shadow-[0_20px_50px_rgba(255,0,127,0.06)] relative overflow-hidden z-10 select-none mb-12 bg-black/40"
    >
      {/* 1. Left branding and statistics column */}
      <div className="md:w-[320px] flex flex-col justify-between shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-pink-300 font-bold uppercase">
              Secure Couture Channel Established
            </span>
          </div>
          
          <h2 className="font-wide text-lg sm:text-xI font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffdce5] to-[#ffa3ba]">
            Commission Custom Design
          </h2>
          
          <p className="font-sans text-xs text-slate-400 font-light leading-relaxed mt-3">
            Initiate a direct bespoke request with our luxury generative atelier. All measurements, fits, and custom dress parameters are safely processed and isolated.
          </p>
        </div>

        {/* Real-time status indicators */}
        <div className="space-y-3 mt-6 border-t border-white/5 pt-6">
          <div className="flex items-center gap-2.5 font-mono text-[9px] text-[#ffb7c5]/50 tracking-wider uppercase">
            <Activity size={10} className="text-pink-400" />
            <span>ATELIER STATUS: ACTIVE</span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[9px] text-[#ffb7c5]/50 tracking-wider uppercase">
            <Cpu size={10} className="text-pink-300" />
            <span>DRAPING STABILITY: NOMINAL</span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[9px] text-[#ffb7c5]/50 tracking-wider uppercase">
            <Mail size={10} className="text-pink-400" />
            <span>SOCIETY GATEWAYS: DECRYPTED</span>
          </div>
        </div>
      </div>

      {/* 2. Main Form Block */}
      <div className="flex-1 relative">
        {success ? (
          <div className="absolute inset-0 bg-black/92 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-4 rounded-sm border border-pink-500/10 animate-fade-in animate-duration-300">
            <div className="w-12 h-12 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 animate-bounce">
              <CheckCircle2 size={24} />
            </div>
            
            <h4 className="font-wide text-xs tracking-[0.2em] uppercase font-bold text-white mb-2">
              Registration Confirmed
            </h4>
            
            <p className="font-mono text-[10px] text-slate-450 max-w-sm tracking-wide leading-relaxed">
              Couture request submitted. Order parameters successfully cataloged under digital identity: <span className="text-pink-400 font-semibold">{success.email}</span>.
            </p>

            <button
              onClick={() => setSuccess(null)}
              className="mt-6 px-4 py-2 border border-pink-500/20 bg-pink-500/5 text-pink-400 hover:border-pink-500/45 hover:text-white font-mono text-[9px] rounded-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              Flush Channel Buffer
            </button>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] tracking-widest text-[#ffb7c5]/40 uppercase font-medium">
                Identity / Brand Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Celine Vance"
                className="bg-white/[0.015] border border-white/5 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 rounded-xl px-4 py-3 text-xs font-mono text-white tracking-wide placeholder:text-pink-300/15 outline-none transition-all select-text"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] tracking-widest text-[#ffb7c5]/40 uppercase font-medium">
                Secure Contact Coordinates
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="celine@couture-matrix.com"
                className="bg-white/[0.015] border border-white/5 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 rounded-xl px-4 py-3 text-xs font-mono text-white tracking-wide placeholder:text-pink-300/15 outline-none transition-all select-text"
              />
            </div>
          </div>

          {/* Classification Selection dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-widest text-[#ffb7c5]/40 uppercase font-medium">
              Virtual Commission Classification
            </label>
            <div className="relative">
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="bg-[#090911] border border-white/5 focus:border-pink-500/50 rounded-xl w-full px-4 py-3.5 text-xs font-mono tracking-wider outline-none cursor-pointer appearance-none transition-all text-white/80"
              >
                <option value="bespoke-silhouette" className="text-white/80 bg-[#090911]">Bespoke 3D Silhouette Design</option>
                <option value="couture-drape" className="text-white/80 bg-[#090911]">Virtual Drapery Dynamics Configuration</option>
                <option value="neon-fiber-print" className="text-white/80 bg-[#090911]">Glowing Neon Print Fiber Loom Reservation</option>
                <option value="vip-fitting" className="text-white/80 bg-[#090911]">VIP Realtime Interactive Holographic Fitting Room</option>
              </select>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-300/35 font-mono text-[9px]">▼</div>
            </div>
          </div>

          {/* Message Payload text block */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-widest text-[#ffb7c5]/40 uppercase font-medium">
              Apparel Design Prompt & Details
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Outline dress parameters (e.g. asymmetrical pink tulle with molecular neon silk cords)..."
              className="bg-white/[0.015] border border-white/5 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 rounded-xl px-4 py-3 text-xs font-mono text-white tracking-wide placeholder:text-pink-300/15 outline-none resize-none transition-all select-text"
            />
          </div>

          {/* Submission button with diagnostic animations */}
          <button
            type="submit"
            disabled={isSubmitting}
            data-cursor-label={isSubmitting ? "TRANSMITTING" : "TRANSMIT"}
            className="w-full py-4 border border-pink-500/30 bg-pink-500/10 text-white font-mono text-[11px] tracking-[0.2em] uppercase rounded-full hover:border-pink-400 hover:bg-pink-500/25 disabled:opacity-40 select-none cursor-pointer transition-all duration-350 flex items-center justify-center gap-2 font-bold"
          >
            {isSubmitting ? (
              <>
                <span className="w-2.5 h-2.5 border-2 border-pink-100 border-t-transparent rounded-full animate-spin" />
                <span>Calibrating Atelier Patterns...</span>
              </>
            ) : (
              <>
                <Send size={15} className="stroke-[2.5]" />
                <span>Transmit Commission Brief</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
