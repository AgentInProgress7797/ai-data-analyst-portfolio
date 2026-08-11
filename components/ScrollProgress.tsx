"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0%",
      }}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        h-[2px]
        w-full
        bg-gradient-to-r
        from-signal-500
        via-cyan-300
        to-signal-400
        shadow-[0_0_12px_rgba(45,212,191,0.8)]
      "
    />
  );
}