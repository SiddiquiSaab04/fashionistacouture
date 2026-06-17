import React, { useState, useEffect, useRef } from "react";
import { Scissors, Send, Sparkles, Shirt, Crown, Trash2, Info, User, HelpCircle, Activity, Globe } from "lucide-react";
import { motion } from "motion/react";

interface TerminalLog {
  id: string;
  type: "system" | "user" | "engine" | "error";
  text: string;
  timestamp: string;
}

export default function AIWorkspace() {
  const [prompt, setPrompt] = useState("");
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: "1",
      type: "system",
      text: "Atelier design studio calibrated for custom silken silhouettes.",
      timestamp: "10:30 AM"
    },
    {
      id: "2",
      type: "engine",
      text: "Welcome to Fashionista Atelier. Specify a signature silhouette, textile density, or drape prompt, and our generative design engine will draft a bespoke preview.",
      timestamp: "10:31 AM"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates logic for dynamic layout parallax scrolling text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Calculate smooth shifting offset ratio for parallax text layers
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 60;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x: xOffset, y: yOffset });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Auto-scroll logs to bottom on additions
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTimestamp = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userPrompt = textToSend;
    setPrompt("");
    setLoading(true);

    // 1. Append user input log
    const userLogId = Math.random().toString();
    setLogs((prev) => [
      ...prev,
      {
        id: userLogId,
        type: "user",
        text: userPrompt,
        timestamp: getTimestamp(),
      },
    ]);

    try {
      // 2. Fetch from full-stack api route
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Inference returned status code: ${response.status}`);
      }

      const data = await response.json();
      
      // 3. Append core output log
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "engine",
          text: data.text || "No callback text returned from the design studio.",
          timestamp: getTimestamp(),
        },
      ]);
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "error",
          text: `Unable to sync with digital looms: ${err.message || "Loss of atelier connection."}`,
          timestamp: getTimestamp(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([
      {
        id: "clear-1",
        type: "system",
        text: "Fabric pattern queue refreshed. Standard drafts backup stored.",
        timestamp: getTimestamp(),
      },
    ]);
  };

  // Pre-configured fashion/design prompts
  const PresetButtons = [
    {
      title: "Neon Lace Silk Weave",
      prompt: "Describe an exquisite neon pink silk gown featuring structural floral lace borders made using zero-defect synthetic threads.",
      icon: <Shirt size={12} className="text-black group-hover:rotate-12 transition-transform" />
    },
    {
      title: "Flowing organza drape",
      prompt: "Detail the motion profile of an asymmetric organza drape with fluid structural folds that adapt gracefully to light wind resistance.",
      icon: <Scissors size={12} className="text-black group-hover:scale-110 transition-transform" />
    },
    {
      title: "Zero-Gravity silhouette",
      prompt: "Draft an elegant design specification sheet for a structured, layered trench garment built around zero-gravity silhouette points.",
      icon: <Crown size={12} className="text-black group-hover:animate-pulse" />
    }
  ];

  return (
    <div
      id="ai-workspace-panel"
      className="w-full max-w-6xl mx-auto select-none py-12 md:py-16 relative px-4 text-black"
    >
      {/* 1. STICKY PARALLAX BOLD FASHION OUTLINE TEXT LAYER */}
      <div className="absolute inset-x-0 top-6 select-none pointer-events-none z-0 overflow-hidden h-[160px] flex items-center justify-center">
        <div 
          style={{ 
            transform: `translate(${mousePos.x}px, ${mousePos.y * 0.5}px)`,
            transition: "transform 0.15s ease-out"
          }}
          className="font-wide text-5xl sm:text-7xl md:text-8xl font-black text-center uppercase tracking-tighter whitespace-nowrap opacity-25 leading-none select-none"
        >
          {/* Neon Pink stroke outlined style */}
          <span 
            className="text-transparent" 
            style={{ WebkitTextStroke: "2.5px #ff007f", textShadow: "3px 3px 0px #000" }}
          >
            FASHIONISTA
          </span>
          <span className="text-black px-4" style={{ WebkitTextStroke: "2px #000" }}>
            STUDIO
          </span>
          <span 
            className="text-transparent" 
            style={{ WebkitTextStroke: "2.5px #ff007f" }}
          >
            GENERATIVE
          </span>
        </div>
      </div>

      {/* 2. PREMIUM BABY PINK EDITORIAL CARD GRID & LAYOUT */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gradient-to-br from-[#ffdce7] via-[#fcd2e2] to-[#ffc5da] p-6 md:p-10 rounded-[36px] border-4 border-black shadow-[15px_15px_0px_#ff007f]">
        
        {/* Full width fashion header section */}
        <div className="lg:col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-black pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white border-2 border-[#ff007f]">
              <Crown size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-wide text-base sm:text-lg tracking-[0.25em] font-extrabold text-black uppercase">
                DIGITAL ATELIER WORKSPACE
              </h2>
              <p className="font-mono text-[9px] tracking-[0.16em] text-black/60 uppercase">
                AI DESIGN LAB // MODELED IN THE CLOUD
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black border border-black rounded-full text-[#ffd1e2]">
              <Activity size={11} className="text-pink-400 animate-pulse" />
              <span className="font-mono text-[7px] sm:text-[8px] tracking-widest uppercase font-bold text-pink-300">
                ACTIVE COUTURE INTEGRATION
              </span>
            </div>
          </div>
        </div>

        {/* 3. STICKY SIDEBAR FOR PRESETS & RECOMMENDATIONS */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
          <div className="p-5 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_#000] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[#ff007f]" />
              <span className="font-mono text-[9px] tracking-[0.2em] font-extrabold text-black uppercase">
                COUTURE COMMANDS
              </span>
            </div>
            <p className="font-sans text-[11px] text-slate-800 leading-relaxed font-light">
              Inject interactive creative prompts directly into our generative layout engine to start crafting custom textures, patterns, and virtual looks.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {PresetButtons.map((btn, i) => (
              <button
                key={i}
                onClick={() => handleSendPrompt(btn.prompt)}
                disabled={loading}
                className="group flex items-center gap-3.5 px-4 py-3.5 border-2 border-black bg-white hover:bg-[#ffedf2] rounded-xl text-left shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-40"
              >
                <div className="p-2 rounded-lg bg-[#ffd5e2] border border-black group-hover:bg-[#ffc6db] text-black shrink-0 transition-colors">
                  {btn.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-wide text-[9.5px] font-black tracking-wider uppercase text-black">
                    {btn.title}
                  </span>
                  <span className="font-sans text-[8.5px] text-slate-650 truncate max-w-[180px] sm:max-w-none mt-0.5 text-wrap">
                    {btn.prompt}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={clearLogs}
              className="w-full py-2.5 border-2 border-black bg-black text-white hover:bg-[#ff007f] font-mono text-[9px] font-extrabold rounded-lg uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[4px_4px_0px_#ffa3cd]"
            >
              <Trash2 size={11} />
              <span>Purge Pattern Buffer</span>
            </button>
          </div>
        </div>

        {/* 4. CHAT AND LOG MONITOR FEED WITH DYNAMIC BACKDROP GRID */}
        <div className="lg:col-span-8 flex flex-col h-[400px] lg:h-[450px] bg-white border-2 border-black rounded-3xl p-4 overflow-hidden relative shadow-[8px_8px_0px_#000]">
          
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1 select-text scroll-smooth relative z-10"
          >
            {logs.map((log) => (
              <div
                key={log.id}
                className={`flex gap-3 text-[12px] leading-relaxed transition-all duration-300 max-w-[85%] ${
                  log.type === "user"
                    ? "ml-auto flex-row-reverse"
                    : "mr-auto"
                }`}
              >
                {/* Profile circles with beautiful modern dark pink / black themes */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 select-none border-2 border-black ${
                  log.type === "user"
                    ? "bg-[#ff007f] text-white font-bold"
                    : log.type === "system"
                    ? "bg-slate-200 text-slate-750"
                    : "bg-black text-[#ffd0dd] font-bold"
                }`}>
                  {log.type === "user" ? <User size={13} /> : <Crown size={12} />}
                </div>

                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl leading-relaxed border-2 border-black ${
                    log.type === "user"
                      ? "bg-[#ff007f]/10 text-right rounded-tr-none text-black font-semibold selection:bg-[#ffc2dd]"
                      : log.type === "system"
                      ? "bg-slate-50 border-dashed text-slate-700 italic font-mono text-[10px]"
                      : "bg-[#fcfcff] rounded-tl-none font-medium selection:bg-[#ffaec9] text-black"
                  }`}>
                    {log.text}
                  </div>
                  <span className={`block font-mono text-[7.5px] text-slate-600 font-semibold ${log.type === "user" ? "text-right" : "text-left"}`}>
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 text-xs leading-relaxed mr-auto max-w-[85%] animate-pulse">
                <div className="w-8 h-8 rounded-full bg-black text-pink-300 border-2 border-black flex items-center justify-center shrink-0">
                  <Crown size={12} className="animate-spin text-pink-400" style={{ animationDuration: "2.5s" }} />
                </div>
                <div className="bg-[#fff3f6] border-2 border-black p-4 rounded-2xl rounded-tl-none text-[#ff007f] font-mono text-[11px] font-bold">
                  Synthesizing custom fabric coordinates...
                </div>
              </div>
            )}
          </div>

          {/* Faint luxury background watermarks */}
          <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none grid grid-cols-12 grid-rows-12 gap-1 text-black font-mono text-[8px]">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center border border-black/10">+</div>
            ))}
          </div>
        </div>

        {/* 5. USER CHAT TEXT AREA */}
        <div className="lg:col-span-12 pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(prompt);
            }}
            className="flex items-center gap-2 relative bg-white border-2 border-black p-2.5 rounded-full hover:border-[#ff007f] transition-all focus-within:ring-2 focus-within:ring-pink-400 shadow-[6px_6px_0px_#000]"
          >
            <span className="pl-4 text-[#ff007f] font-mono text-xs font-bold leading-none shrink-0 select-none">
              prompt:
            </span>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Specify fabric patterns, asymmetrical drape options, style layers, colors, etc..."
              disabled={loading}
              className="bg-transparent text-black font-mono text-[11.5px] h-9 focus:ring-0 outline-none w-full border-none px-2 placeholder:text-black/30 select-text disabled:opacity-45"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || loading}
              className="w-10 h-10 rounded-full bg-black text-white hover:bg-[#ff007f] border-2 border-black flex items-center justify-center transition-all duration-350 cursor-pointer disabled:opacity-30"
            >
              <Send size={14} className="stroke-[2.5]" />
            </button>
          </form>

          {/* Subtitle Help Ribbon */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-black text-[#ffddec] rounded-2xl font-mono text-[8.5px] tracking-wider border border-black">
            <div className="flex items-center gap-2">
              <Info size={12} className="text-[#ff55a3] shrink-0" />
              <span>DIRECT ATELIER LACE INPUT PORT // CONNECTED TO GEMINI-3.5-FLASH INFRASTRUCTURE</span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[#fca0ca]">OUTLINE LAYOUT: COMPLIANT</span>
              <span className="text-[#ffd6e6]">MODEL: SILHOUETTE_3D</span>
            </div>
          </div>
        </div>

      </div>

      {/* 6. FULL WIDTH SHOW-STOPPER FASHION MODEL IMAGE BANNER BELOW WORKSPACE */}
      <div className="mt-12 rounded-[36px] overflow-hidden border-4 border-black shadow-[15px_15px_0px_#000] relative aspect-[21/9] bg-stone-900 group">
        <img
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoaW5nfGVufDB8fDB8fHww"
          alt="Haute Couture Silhouette Loop"
          referrerPolicy="no-referrer"
          className="absolute inset-0 min-w-full h-full object-cover saturate-[1.25] brightness-95 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/45 to-transparent p-6 md:p-8 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-1 select-none">
            <Globe size={12} className="text-[#ff007f]" />
            <span className="font-mono text-[8px] sm:text-[9.5px] tracking-[0.25em] text-[#ffdbe6] uppercase font-bold">
              AUTONOMOUS LOOM PATTERN GENERATION
            </span>
          </div>
          <h2 className="font-wide text-lg sm:text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider leading-none select-none">
            Digital Fabrication Studio
          </h2>
        </div>
      </div>
    </div>
  );
}
