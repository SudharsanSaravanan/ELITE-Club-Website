"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface TracingBeamProps {
    children: ReactNode;
    className?: string;
    beamColor?: string;
}

export function TracingBeam({
    children,
    className = "",
    beamColor = "#D4AF37",
}: TracingBeamProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
                <div className="absolute inset-0 bg-elite-graphite" />

                <motion.div
                    className="absolute top-0 left-0 w-full origin-top"
                    style={{
                        scaleY: smoothProgress,
                        background: `linear-gradient(to bottom, ${beamColor}, ${beamColor}80)`,
                        boxShadow: `0 0 20px ${beamColor}40, 0 0 40px ${beamColor}20`,
                    }}
                />

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                    style={{
                        top: 0,
                        y: smoothProgress.get() * 100 + "%",
                        backgroundColor: beamColor,
                        boxShadow: `0 0 10px ${beamColor}, 0 0 20px ${beamColor}80`,
                    }}
                />
            </div>

            <div className="relative z-10 pl-16 md:pl-0">{children}</div>
        </div>
    );
}

interface MilestoneProps {
    children: ReactNode;
    year?: string;
    title?: string;
    align?: "left" | "right";
}

export function Milestone({
    children,
    year,
    title,
    align = "left",
}: MilestoneProps) {
    const milestoneRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={milestoneRef}
            initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative py-12 ${align === "left" ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:text-left"
                }`}
        >
            <div
                className={`absolute top-12 w-4 h-4 rounded-full bg-elite-dark border-2 border-elite-gold
          ${align === "left" ? "left-0 md:left-1/2 md:-translate-x-1/2" : "left-0 md:left-1/2 md:-translate-x-1/2"}`}
            />

            {year && (
                <span className="inline-block px-3 py-1 mb-2 text-sm font-medium text-elite-gold bg-elite-gold/10 rounded-full">
                    {year}
                </span>
            )}

            {title && (
                <h3
                    className="text-2xl font-bold text-elite-silver mb-4"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                    {title}
                </h3>
            )}

            <div className="text-elite-silver/70">{children}</div>
        </motion.div>
    );
}
