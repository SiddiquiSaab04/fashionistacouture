import React from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animationType?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom-in" | "skew-up" | "scale-up";
  duration?: number; // in ms
  delay?: number; // in ms
  className?: string;
  key?: React.Key | string | number;
}

export default function ScrollReveal({
  children,
  animationType = "slide-up",
  duration = 800,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  
  const getVariants = () => {
    switch (animationType) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "slide-up":
        return {
          hidden: { opacity: 0, y: 55 },
          visible: { opacity: 1, y: 0 }
        };
      case "slide-down":
        return {
          hidden: { opacity: 0, y: -55 },
          visible: { opacity: 1, y: 0 }
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: -70 },
          visible: { opacity: 1, x: 0 }
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: 70 },
          visible: { opacity: 1, x: 0 }
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.9, y: 25 },
          visible: { opacity: 1, scale: 1, y: 0 }
        };
      case "skew-up":
        return {
          hidden: { opacity: 0, y: 65, rotate: 1.5 },
          visible: { opacity: 1, y: 0, rotate: 0 }
        };
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 55 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={getVariants()}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 17,
        mass: 1.05,
        duration: duration / 1000,
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
