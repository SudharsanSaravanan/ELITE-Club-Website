"use client";

import { motion } from "framer-motion";

export default function BackgroundLayers() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base dot grid / graph pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[140%] w-[140%]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 85%)",
            }}
          />
        </div>
      </div>

      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl"
        animate={{ x: [-20, 10, -10], y: [0, 15, -5] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-[#94A3B8]/12 blur-3xl"
        animate={{ x: [0, -25, 10], y: [-10, 10, -5] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-6rem] left-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/8 blur-3xl"
        animate={{ x: [10, -10, 20], y: [0, -15, 5] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}


