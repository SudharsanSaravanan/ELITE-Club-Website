"use client";

import { useRef, useState, useEffect, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface GlowingBorderProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    borderRadius?: string;
}

export function GlowingBorder({
    children,
    className = "",
    glowColor = "#D4AF37",
    borderRadius = "1rem",
}: GlowingBorderProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative ${className}`}
            style={{ borderRadius }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    borderRadius,
                    background: isHovered
                        ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}20, transparent 40%)`
                        : "transparent",
                }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    borderRadius,
                    border: "1px solid transparent",
                    background: isHovered
                        ? `linear-gradient(#0a0a0a, #0a0a0a) padding-box, radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%) border-box`
                        : "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(#2A2A2A, #2A2A2A) border-box",
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

interface GlowingGridProps {
    children: ReactNode;
    className?: string;
}

export function GlowingGrid({ children, className = "" }: GlowingGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!gridRef.current) return;

            const rect = gridRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const grid = gridRef.current;
        if (grid) {
            grid.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (grid) {
                grid.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <div
            ref={gridRef}
            className={`relative ${className}`}
            style={
                {
                    "--mouse-x": `${mousePosition.x}px`,
                    "--mouse-y": `${mousePosition.y}px`,
                } as React.CSSProperties
            }
        >
            {children}
        </div>
    );
}
