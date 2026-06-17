import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import { ArrowDownRight, Wind, Eye, Sparkles, Shirt } from "lucide-react";

interface LandingHeroProps {
  onExploreClick: () => void;
  onDocsClick: () => void;
}

export default function LandingHero({ onExploreClick, onDocsClick }: LandingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRefs = useRef<HTMLDivElement>(null);
  const visualizerBoxRef = useRef<HTMLDivElement>(null);
  const drapeCanvasRef = useRef<HTMLCanvasElement>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);

  const words = ["FASHIONISTA", "COUTURE"];

  // Digital mannequin controls
  const [drapeDensity, setDrapeDensity] = useState(18);
  const [windForce, setWindForce] = useState(0.4);
  const [wireframeOnly, setWireframeOnly] = useState(false);

  useEffect(() => {
    // 1. Sleek word stagger entrance reveal with 3D rotations & glamorous tracking expansion
    if (headlineWordsRef.current.length > 0) {
      gsap.fromTo(
        headlineWordsRef.current,
        {
          y: "135%",
          rotateX: -85,
          opacity: 0,
          scale: 0.9,
          letterSpacing: "0.02em"
        },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          scale: 1,
          letterSpacing: "0.15em",
          duration: 1.05,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    }

    // 2. Subtitle slide up & fade fast
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.45,
        }
      );
    }

    // 3. CTA Buttons stagger
    if (btnGroupRef.current) {
      gsap.fromTo(
        btnGroupRef.current.children,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.65,
        }
      );
    }

    // 4. Subtle telemetry fade-in
    if (telemetryRefs.current) {
      gsap.fromTo(
        telemetryRefs.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: "sine.out", delay: 0.8 }
      );
    }

    // 5. Visualizer box entrance animation (snappier transition) & floating loop
    if (visualizerBoxRef.current) {
      gsap.fromTo(
        visualizerBoxRef.current,
        { scale: 0.93, opacity: 0, y: 40 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.0, 
          ease: "power3.out", 
          delay: 0.15,
          onComplete: () => {
            // Initiate perpetual organic floating loop for high-fidelity 3D impact
            gsap.to(visualizerBoxRef.current, {
              y: "-=12",
              rotationY: "+=2",
              duration: 3.8,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
          }
        }
      );
    }
  }, []);

  // 3D Generative Drapery Canvas Simulation
  useEffect(() => {
    const canvas = drapeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // 3D Vertex Definition
    interface Point3D {
      x: number;
      y: number;
      z: number;
      originY: number;
      originX: number;
    }

    const rows = 28;
    const cols = 22;
    const grid: Point3D[][] = [];

    // Seed cloth grid mesh vertices
    for (let r = 0; r < rows; r++) {
      const rowList: Point3D[] = [];
      for (let c = 0; c < cols; c++) {
        // Form an elegant 3D hourglass draping dress/skirt silhouette
        const u = r / (rows - 1);
        const v = c / (cols - 1);
        
        // Hourglass shape calculation (cyber garment silhouette)
        const radiusFactor = 0.55 + 0.45 * Math.cos(u * Math.PI * 1.5 - 0.5) * (1 - 0.25 * Math.sin(u * Math.PI));
        const theta = v * Math.PI * 2;
        
        const x = Math.cos(theta) * 75 * radiusFactor;
        const z = Math.sin(theta) * 75 * radiusFactor;
        const y = -140 + u * 280;

        rowList.push({
          x,
          y,
          z,
          originX: x,
          originY: y,
        });
      }
      grid.push(rowList);
    }

    // Interactive mouse movement physics
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let angle = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Centering matrices
      ctx.save();
      ctx.translate(width / 2, height / 2 + 10);

      time += 0.035 * (windForce + 0.1);
      angle += 0.008; // Slow rotation of the virtual dress form

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // We'll compute 2D projection on each vertex, and apply organic ripple waving forces
      const projected: { x: number; y: number; z: number; r: number; c: number }[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];

          // Wave equation for luxury fabric ripples (simulates cloth in micro-gravity)
          const ripple = Math.sin(r * 0.22 - time * 2.5 + c * 0.15) * 12 * windForce +
                         Math.cos(c * 0.35 + time * 1.8) * 8 * windForce;

          // Hourglass silhouette morphing
          const localY = pt.originY + ripple * 0.4;
          const radialDist = Math.sqrt(pt.originX * pt.originX + pt.z * pt.z) + ripple * 0.85;
          const theta = Math.atan2(pt.z, pt.originX);
          
          const localX = Math.cos(theta) * radialDist;
          const localZ = Math.sin(theta) * radialDist;

          // Rotate 3D vertices nicely
          const rx1 = localX * cosA - localZ * sinA;
          const rz1 = localX * sinA + localZ * cosA;

          // Tilt slightly downwards for 3D aerial overview
          const ry2 = localY * 0.94 - rz1 * 0.18;
          const rz2 = localY * 0.18 + rz1 * 0.94;

          // Dynamic projection scale factor
          const dFactor = 350 / (350 + rz2);
          const px = rx1 * dFactor;
          const py = ry2 * dFactor;

          projected.push({ x: px, y: py, z: rz2, r, c });
        }
      }

      // 3A. Draw underlay aesthetic 3D structure glow core (the laser mannequin shape)
      ctx.beginPath();
      ctx.arc(0, -120, 15, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 0, 127, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.lineTo(0, 140);
      ctx.strokeStyle = "rgba(255, 183, 197, 0.1)";
      ctx.stroke();

      // 3B. Render horizontal silk loops / weave fibers
      for (let r = 0; r < rows; r += 2) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const pt = projected[idx];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        // Connect loop ends beautifully
        const first = projected[r * cols];
        ctx.lineTo(first.x, first.y);

        const u = r / (rows - 1);
        ctx.strokeStyle = wireframeOnly 
          ? `rgba(255, 0, 127, ${0.15 + (1 - u) * 0.3})`
          : `rgba(255, 183, 197, ${0.4 + (1 - u) * 0.4})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 3C. Render premium vertical flowing rib contours
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const pt = projected[idx];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `rgba(255, 0, 127, ${wireframeOnly ? 0.35 : 0.25})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 3D. Render luxury glowing micro-particles floating near the fabric contours
      if (!wireframeOnly) {
        projected.forEach((pt, i) => {
          if (i % 25 === 0) {
            ctx.beginPath();
            ctx.arc(pt.x + Math.sin(time + i) * 6, pt.y + Math.cos(time - i) * 4, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 0, 127, 0.8)";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#ff007f";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [drapeDensity, windForce, wireframeOnly]);

  return (
    <section
      ref={containerRef}
      id="hero-cinematic-section"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 px-6 md:px-12 lg:px-20 select-none z-10 overflow-hidden"
    >
      {/* Background looping fashion video with luxury baby pink, neon pink, and black theme overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-neon-makeup-40187-large.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 scale-105 filter saturate-150 contrast-125 select-none"
        />
        {/* Luxury Vignette and Gradients combining neon pink and black */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#010103] via-transparent to-[#ff007f]/10 mix-blend-color-burn" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010103]/60 via-transparent to-[#010103]" />
      </div>

      {/* Upper Brand Telemetry */}
      <div
        ref={telemetryRefs}
        className="flex items-center justify-between border-b border-white/[0.04] pb-4 font-mono text-[9px] tracking-[0.25em] text-cyber-indigo uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-pulse" />
          <span>FASHIONISTA ATELIER SYSTEM // STYLED STATE: CALIBRATED</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>RUNWAY_MODEL: 3D_FABRIC_LOOP</span>
          <span>FPS: 60/SEC</span>
        </div>
      </div>

      {/* Main Grid Content Area: Left for details, Right for 3D Video Loop Mannequin */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto py-8">
        
        {/* Left Side: Brand presentation texts */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-30">
          
          {/* Haute Couture Sub-Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-cyber-purple/[0.04] border border-cyber-purple/20 rounded-full mb-6">
            <Sparkles size={11} className="text-cyber-purple animate-pulse" />
            <span className="font-mono text-[9.5px] tracking-[0.35em] font-extrabold text-cyber-purple uppercase">
              Haute Couture 3.0 // Virtual Atelier
            </span>
          </div>

          {/* Animated Large Typography Heading - highly responsive to avoid overlap */}
          <h1 className="font-wide text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.9] text-white overflow-hidden uppercase max-w-full sm:max-w-[800px] perspective-[1000px]">
            {words.map((word, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden mr-2 sm:mr-4 pb-1 sm:pb-2.5 select-none"
              >
                <span
                  ref={(el) => {
                    if (el) headlineWordsRef.current[index] = el;
                  }}
                  className="inline-block transform origin-bottom will-change-transform opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffdce5] to-[#ffa3ba]"
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Beautiful Editorial Vibe Description paragraphs */}
          <p
            ref={subtitleRef}
            className=" font-sans text-sm sm:text-lg text-white/50 leading-relaxed max-w-xl font-light opacity-0"
          >
            Redefining luxury through generative 3D fabric mechanics. This is a digital laboratory operating at the intersection of haute couture and neural sculpting, weaving neon pink arrays and baby pink silk codes into gorgeous physical and virtual fits.
          </p>

          {/* Magnetic Interactive Actions */}
          <div ref={btnGroupRef} className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto opacity-0">
            <MagneticButton
              primary
              onClick={onExploreClick}
              cursorLabel="ENTER"
              id="hero-cta-explore"
            >
              <span className="flex items-center justify-center gap-2.5 font-bold font-sans">
                <Shirt size={14} className="stroke-[2.5] text-white" />
                Initialize Atelier
              </span>
            </MagneticButton>

            <MagneticButton
              onClick={onDocsClick}
              cursorLabel="VIP"
              id="hero-cta-docs"
            >
              <span className="flex items-center justify-center gap-2 text-white/80">
                Private Collection
                <ArrowDownRight size={13} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: High-Fashion Luxury Portrait Display */}
        <div className="lg:col-span-5 flex justify-center w-full z-20">
          <div
            ref={visualizerBoxRef}
            className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-3xl border border-pink-500/20 bg-stone-950/40 backdrop-blur-md p-2 shadow-[0_30px_60px_rgba(255,0,127,0.06)] overflow-hidden scale-95 opacity-0 group"
          >
            {/* Elegant high-contrast pink-to-gold ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-pink-500/10" />
            
            {/* Realtime Canvas Container with High Fashion Editorial Backdrop */}
            <div className="absolute inset-2 rounded-2xl border border-white/5 bg-black/20 overflow-hidden backdrop-blur-xl">
              <img
                src="https://plus.unsplash.com/premium_photo-1740409496384-07281358a2a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZyUyMGNvYXQlMjBmYXNoaW9ufGVufDB8fDB8fHww"
                alt="Haute Couture Silhouette Model"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-100 hover:scale-[1.03] transition-all duration-1000 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent pointer-events-none" />

              {/* Minimalist Editorial Labels and Designers */}
              <div className="absolute top-4 left-4 flex gap-1.5 items-center bg-black/85 px-3 py-1.5 border border-pink-500/20 rounded-full font-mono text-[8px] tracking-widest text-pink-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>FALL LOOKBOOK COLLECTION</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center bg-black/80 px-3 py-1.5 border border-white/10 rounded-full font-mono text-[8px] text-white/50">
                ACTIVE
              </div>

              {/* Elegant designer signature label at bottom */}
              <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md px-4 py-3 border border-white/10 rounded-xl flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-pink-300 font-extrabold">
                    CREATIVE DIRECTION
                  </span>
                  <span className="font-mono text-[7px] text-white/40">© 2026</span>
                </div>
                <div className="flex items-center justify-between text-white mt-1">
                  <span className="font-wide text-xs font-black tracking-wider uppercase">ALESSIO VARON // MILANO</span>
                  <span className="text-[10px] text-pink-400 font-semibold uppercase font-mono">NEW SEASON</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lower scroll indicators */}
      <div className="flex items-end justify-between text-white/30 font-mono text-[9px] tracking-[0.2em] uppercase pt-4 border-t border-white/[0.04]">
        <div className="flex items-center gap-3">
          <span>COUTURE PROTOCOL // DIGITAL_FAB_3D</span>
        </div>
        
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 hover:text-white transition-colors duration-300 group cursor-pointer text-cyber-indigo"
          data-cursor-label="SCROLL"
        >
          <span>PROCEED TO LOOKBOOK</span>
          <ArrowDownRight size={12} className="opacity-50 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300 text-cyber-purple" />
        </button>
      </div>
    </section>
  );
}
