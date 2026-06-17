import React, { useEffect, useRef } from "react";

interface RibbonPath {
  points: { x: number; y: number; baseX: number; baseY: number; phase: number }[];
  color: string;
  width: number;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let ribbons: RibbonPath[] = [];
    const ribbonCount = 5;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initRibbons();
    };

    const gradientColors = [
      "rgba(255, 0, 127, 0.08)",   // Glowing Neon Pink
      "rgba(217, 70, 239, 0.05)",  // Soft Imperial Purple
      "rgba(244, 63, 94, 0.07)",   // Luxurious Rose Red
      "rgba(255, 183, 197, 0.06)", // Soft Silk Pink
      "rgba(251, 113, 133, 0.05)"  // Delicate Coral Pink
    ];

    const initRibbons = () => {
      ribbons = [];
      const w = canvas.width;
      const h = canvas.height;
      
      for (let r = 0; r < ribbonCount; r++) {
        const points = [];
        // Define continuous horizontal waving paths to simulate threads of textiles
        const segmentCount = 14;
        const spacing = w / (segmentCount - 1);
        const baseY = h * (0.2 + r * 0.15); // Stagger horizontally
        
        for (let i = 0; i < segmentCount; i++) {
          points.push({
            x: i * spacing,
            y: baseY,
            baseX: i * spacing,
            baseY: baseY,
            phase: Math.random() * Math.PI * 2
          });
        }
        
        ribbons.push({
          points,
          color: gradientColors[r % gradientColors.length],
          width: 1.5 + r * 0.5
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      // Lerp mouse coordinates
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      // Dynamic textile coordinate indicators (subtle fashion specs in grid)
      ctx.strokeStyle = "rgba(255, 183, 197, 0.015)";
      ctx.lineWidth = 0.5;
      const step = 60;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw and animate wavy silk ribbon fibers
      ribbons.forEach((ribbon, index) => {
        ctx.beginPath();
        
        // Dynamic waviness factors
        const waveScale = 25 + index * 10;
        const windSpeed = time * (1 + index * 0.2);

        ribbon.points.forEach((pt, i) => {
          // Drifting sine coordinates to make paths feel fluid and floating like silk tulle
          const waveOffsetY = Math.sin(pt.phase + windSpeed + i * 0.5) * waveScale;
          let targetY = pt.baseY + waveOffsetY;
          let targetX = pt.baseX + Math.cos(pt.phase + windSpeed) * 12;

          // Drag effect around cursor
          if (m.x > 0) {
            const dx = targetX - m.x;
            const dy = targetY - m.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const drapeInfluence = 220; // Radius where threads bend

            if (dist < drapeInfluence) {
              const force = (drapeInfluence - dist) / drapeInfluence;
              // Bends threads smoothly towards or away from cursor to feel interactive
              targetY += (dy / dist) * force * 45;
              targetX += (dx / dist) * force * 30;
            }
          }

          pt.x += (targetX - pt.x) * 0.1;
          pt.y += (targetY - pt.y) * 0.1;
        });

        // Draw curved lines with bezier joins for smooth organic curves
        ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y);
        for (let i = 0; i < ribbon.points.length - 1; i++) {
          const xc = (ribbon.points[i].x + ribbon.points[i + 1].x) / 2;
          const yc = (ribbon.points[i].y + ribbon.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(ribbon.points[i].x, ribbon.points[i].y, xc, yc);
        }
        
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;
        ctx.stroke();

        // Draw subtle measurement nodes along the threads
        ribbon.points.forEach((pt, i) => {
          if (i % 3 === 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 183, 197, 0.15)";
            ctx.fill();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-[1]"
      id="silk-thread-canvas"
    />
  );
}
