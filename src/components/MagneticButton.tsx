import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  cursorLabel?: string;
  primary?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  id,
  cursorLabel,
  primary = false,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Detect touch support to bypass magnetic pulling on mob/tablets
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Calculate cursor relative coordinates from container center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Organic magnetic pulling thresholds
      gsap.to(container, {
        x: mouseX * 0.35,
        y: mouseY * 0.35,
        scale: 1.05,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(text, {
        x: mouseX * 0.18,
        y: mouseY * 0.18,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      // Elastic spring snapback to default state
      gsap.to(container, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      });

      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      id={id}
      data-cursor-label={cursorLabel}
      className={`
        relative overflow-hidden group px-10 py-4.5 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase
        transition-all duration-300 backdrop-blur-[10px] will-change-transform active:scale-[0.97]
        ${primary 
          ? "bg-white text-black font-semibold shadow-[0_3px_25px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:bg-slate-100" 
          : "border border-white/10 bg-white/[0.03] text-white/90 hover:border-white/30 hover:bg-white/[0.07]"
        }
        ${className}
      `}
    >
      {/* Glow highlight trail */}
      <div className="absolute inset-x-0 -top-full bottom-full group-hover:top-0 group-hover:bottom-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent transition-all duration-500 pointer-events-none" />
      
      {/* Button content */}
      <span ref={textRef} className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </button>
  );
}
