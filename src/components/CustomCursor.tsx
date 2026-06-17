import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverLabel, setHoverLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Show custom cursor and keep default responsive browser feedback
    setIsVisible(true);
    document.documentElement.style.cursor = "auto";
    
    // QuickTo operators for ultimate sub-pixel rendering performance
    const xDotTo = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });

    const xRingTo = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseEnterWindow = () => setIsVisible(true);
    const handleMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    // Dynamic hover bindings for interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine if target or any of its ancestors are clickable
      const clickable = target.closest("button, a, [role='button'], input, textarea, select, .interactive-card");
      if (clickable) {
        setIsHovered(true);
        
        // Grab custom cursor label override if it exists
        const customLabel = clickable.getAttribute("data-cursor-label");
        setHoverLabel(customLabel || "");
        
        // Animating custom cursor ring on hover
        gsap.to(ringRef.current, {
          scale: customLabel ? 3.2 : 2.0,
          backgroundColor: customLabel ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.1)",
          borderColor: customLabel ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.8)",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(dotRef.current, {
          scale: 0.5,
          opacity: 0.3,
          duration: 0.2,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickableBefore = target.closest("button, a, [role='button'], input, textarea, select, .interactive-card");
      
      const relatedTarget = e.relatedTarget as HTMLElement;
      const clickableAfter = relatedTarget ? relatedTarget.closest("button, a, [role='button'], input, textarea, select, .interactive-card") : null;
      
      // If we left a clickable area or transitioned to normal state
      if (clickableBefore && !clickableAfter) {
        setIsHovered(false);
        setHoverLabel("");
        
        gsap.to(ringRef.current, {
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(dotRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.documentElement.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing soft-inertia feedback ring */}
      <div
        ref={ringRef}
         id="custom-cursor-ring"
         className="fixed top-0 left-0 w-8 h-8 border border-indigo-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] flex items-center justify-center transition-colors duration-250 bg-indigo-500/[0.01]"
      >
        {hoverLabel && (
          <span
            id="cursor-label-text"
            className="text-[6px] tracking-[0.15em] font-sans font-medium uppercase text-indigo-300 opacity-90 select-none animate-fade-in absolute leading-none w-max max-w-[45px] text-center"
          >
            {hoverLabel}
          </span>
        )}
      </div>
    </>
  );
}
