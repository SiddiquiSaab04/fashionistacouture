import React from "react";
import { motion } from "motion/react";

interface StaggeredHeadingProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function StaggeredHeading({
  title,
  subtitle,
  badgeText,
  className = "",
  align = "left",
}: StaggeredHeadingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      filter: "blur(8px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 1.2,
      }
    },
  };

  const alignmentClass = 
    align === "center" 
      ? "items-center text-center mx-auto" 
      : align === "right" 
      ? "items-end text-right ml-auto" 
      : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignmentClass} ${className} select-none w-full`}>
      {/* Premium Glowing Badge */}
      {badgeText && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="inline-flex items-center gap-2 px-3.5 py-1 bg-pink-500/10 rounded-full border border-pink-500/25 mb-4 shadow-[0_0_15px_rgba(255,0,127,0.1)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-pink-300 font-extrabold uppercase">
            {badgeText}
          </span>
        </motion.div>
      )}

      {/* Main Staggered Title with elegant uppercase tracking and gorgeous royal baby pink gradient */}
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="font-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight flex flex-wrap"
      >
        {title.split(" ").map((word, wordIdx) => (
          <span key={wordIdx} className="mr-2.5 mb-1.5 inline-flex flex-wrap">
            {word.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={letterVariants}
                className="inline-block origin-bottom-left text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fcdce4] to-[#ffa3ba] drop-shadow-[0_2px_12px_rgba(255,182,193,0.15)] hover:text-pink-400 hover:scale-110 transition-transform duration-200"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>

      {/* Modern Royal Subtitle Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-xs sm:text-sm md:text-base text-slate-300/80 font-sans tracking-wide font-light max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
