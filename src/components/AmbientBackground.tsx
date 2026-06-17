import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Slow organic floating animation for each orb
    const animateOrb = (el: HTMLDivElement | null, rx: number, ry: number, delay = 0) => {
      if (!el) return;
      
      // Infinite organic floating timeline using physics-like eases
      gsap.to(el, {
        x: `+=${rx}`,
        y: `+=${ry}`,
        duration: 18 + Math.random() * 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay,
      });

      gsap.to(el, {
        scale: "random(0.85, 1.25)",
        opacity: "random(0.35, 0.65)",
        duration: 10 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    animateOrb(orb1Ref.current, 140, -160, 0);
    animateOrb(orb2Ref.current, -160, 120, 1.5);
    animateOrb(orb3Ref.current, 90, 140, 3.5);

    // 2. Parallax mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Mouse position normalized between -0.5 and 0.5
      const mouseXNorm = (clientX / width) - 0.5;
      const mouseYNorm = (clientY / height) - 0.5;

      targetMouseX = clientX;
      targetMouseY = clientY;

      // Parallax shifts with dynamic responsiveness for deep organic feel
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          xPercent: mouseXNorm * 28,
          yPercent: mouseYNorm * 28,
          duration: 3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          xPercent: mouseXNorm * -38,
          yPercent: mouseYNorm * -38,
          duration: 3.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          xPercent: mouseXNorm * 18,
          yPercent: mouseYNorm * -18,
          duration: 3.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Parallax on the premium grid layer
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: mouseXNorm * 12,
          y: mouseYNorm * 12,
          duration: 2.2,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3. High-fidelity Fluid Canvas System
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Airy Moving Particle Blueprint
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      opacity: number;
      color: string;
      glow: number;
      phase: number;
      phaseSpeed: number;
    }

    const particles: Particle[] = [];
    const colors = [
      "rgba(255, 0, 127, ",    // Neon Pink
      "rgba(255, 183, 197, ",  // Baby Pink
      "rgba(244, 63, 94, ",    // Rose Pink
      "rgba(255, 255, 255, ",  // Pure white glimmer
    ];

    // Seed 75 particles for a dense yet subtle floating airy look
    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.4, // float upwards continuously
        radius: Math.random() * 3.2 + 1,
        baseOpacity: Math.random() * 0.35 + 0.15,
        opacity: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() * 12 + 4,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.015 + 0.003,
      });
    }

    // Wavy high-precision silk filaments
    interface WavyLine {
      color: string;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;
    }

    const lines: WavyLine[] = [
      {
        color: "rgba(255, 0, 127, 0.06)",
        speed: 0.0015,
        amplitude: 50,
        frequency: 0.0012,
        offset: 0,
      },
      {
        color: "rgba(255, 183, 197, 0.04)",
        speed: 0.001,
        amplitude: 70,
        frequency: 0.0008,
        offset: Math.PI / 2.5,
      },
    ];

    // Canvas animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse coords
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // 3A. Draw silky waving neural waves in the background
      lines.forEach((line) => {
        line.offset += line.speed;
        ctx.beginPath();
        for (let x = 0; x < width + 15; x += 15) {
          const y =
            height * 0.5 +
            Math.sin(x * line.frequency + line.offset) * line.amplitude +
            Math.cos((x + line.offset * 80) * 0.0018) * (line.amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // 3B. Draw and update interactive particles
      particles.forEach((p) => {
        p.phase += p.phaseSpeed;

        // Apply slow organic wind drift + upward rising animation
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.phase) * 0.12;

        // Interactive mouse repel (makes particles flow elegantly around mouse)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;
        }

        // Keep inside boundaries
        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;

        // Elegant glow alpha pulsation
        p.opacity = p.baseOpacity + Math.sin(p.phase) * 0.1;
        if (p.opacity < 0.05) p.opacity = 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Highlight larger particles with gorgeous radial light blooms
        if (p.radius > 2.2) {
          const radialGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
          radialGlow.addColorStop(0, p.color + p.opacity + ")");
          radialGlow.addColorStop(0.25, p.color + p.opacity * 0.35 + ")");
          radialGlow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = radialGlow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.glow, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color + p.opacity + ")";
          ctx.fill();
        }
      });

      // 3C. Render ultra-delicate lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if close
          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.045;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(255, 0, 127, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#020205] overflow-hidden select-none pointer-events-none z-0"
      id="ambient-background-container"
    >
      {/* 1. Base Mesh Gradient Glow & Subtle Radial Light Accent */}
      <div 
        className="absolute inset-0 opacity-100" 
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(255, 0, 127, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 15% 85%, rgba(255, 183, 197, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(3, 1, 4, 1) 0%, transparent 100%)
          `
        }}
      />

      {/* Dynamic Animated Atmospheric Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* 2. Floating Animated Orbs in Deep Luxury Pink / Neon tones */}
      {/* Orb 1: Neon Pink */}
      <div
        ref={orb1Ref}
        id="bg-orb-primary"
        className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-[#9d174d] to-[#ff007f] opacity-[0.24] blur-[120px] sm:blur-[160px] mix-blend-screen will-change-transform"
      />

      {/* Orb 2: Elegant Soft Baby Pink */}
      <div
        ref={orb2Ref}
        id="bg-orb-secondary"
        className="absolute bottom-[10%] right-[10%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-br from-[#831843] via-[#ff007f] to-[#ffb7c5] opacity-[0.2] blur-[130px] sm:blur-[170px] mix-blend-screen will-change-transform"
      />

      {/* Orb 3: Rose Cyber Sparkle */}
      <div
        ref={orb3Ref}
        id="bg-orb-tertiary"
        className="absolute top-[45%] left-[40%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#be185d] opacity-[0.14] blur-[100px] sm:blur-[135px] mix-blend-screen will-change-transform"
      />

      {/* 3. Futuristic Subtle Holographic Tech Grid Layer */}
      <div
        ref={gridRef}
        id="bg-tech-grid"
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ff007f_1px,transparent_1px),linear-gradient(to_bottom,#ff007f_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] mix-blend-color-dodge will-change-transform"
      />

      {/* 4. Elegant Minimal Opacity Modern Fashion Faces Backdrop Overlays */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
          alt="Fashion Silhouette backdrop 1"
          referrerPolicy="no-referrer"
          className="absolute top-[15%] left-[6%] w-[350px] md:w-[480px] aspect-[3/4] object-cover rounded-[80px] opacity-[0.035] mix-blend-luminosity blur-[1px] saturate-150 rotate-3 scale-110 transform-gpu"
        />
        <img
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
          alt="Fashion Silhouette backdrop 2"
          referrerPolicy="no-referrer"
          className="absolute top-[52%] right-[5%] w-[340px] md:w-[450px] aspect-[3/4] object-cover rounded-[70px] opacity-[0.03] mix-blend-screen blur-[1.5px] -rotate-6 scale-105 transform-gpu"
        />
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
          alt="Fashion Silhouette backdrop 3"
          referrerPolicy="no-referrer"
          className="absolute top-[78%] left-[7%] w-[360px] md:w-[460px] aspect-[4/5] object-cover rounded-[80px] opacity-[0.035] mix-blend-color-dodge blur-[0.5px] rotate-2 scale-110 transform-gpu"
        />
      </div>

      {/* Subtle Scan Lines for Retro-Futurism vibe */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] mix-blend-overlay opacity-50" />

      {/* 5. Film Grain / Noise Texture Overlay */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-overlay z-[100]">
        <filter id="cinematicNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematicNoise)" />
      </svg>

      {/* 6. Depth Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(1,1,3,0.85)_100%)]" />
    </div>
  );
}
