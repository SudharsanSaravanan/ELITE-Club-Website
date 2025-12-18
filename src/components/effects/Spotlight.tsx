"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";

interface SpotlightProps {
    className?: string;
    fill?: string;
}

export function Spotlight({ className = "", fill = "#D4AF37" }: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setOpacity(1), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`absolute inset-0 overflow-hidden ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute"
                animate={{
                    x: position.x - 300,
                    y: position.y - 300,
                    opacity: isHovering ? opacity : opacity * 0.3,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
                style={{
                    width: 600,
                    height: 600,
                }}
            >
                <svg
                    viewBox="0 0 600 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <defs>
                        <radialGradient
                            id="spotlight-gradient"
                            cx="50%"
                            cy="50%"
                            r="50%"
                        >
                            <stop offset="0%" stopColor={fill} stopOpacity="0.3" />
                            <stop offset="50%" stopColor={fill} stopOpacity="0.1" />
                            <stop offset="100%" stopColor={fill} stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="300" cy="300" r="300" fill="url(#spotlight-gradient)" />
                </svg>
            </motion.div>
        </div>
    );
}

interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
}

interface SparklesProps {
    children: React.ReactNode;
    className?: string;
    sparkleColor?: string;
}

export function Sparkles({
    children,
    className = "",
    sparkleColor = "#D4AF37",
}: SparklesProps) {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const generateSparkle = (): Sparkle => ({
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 2,
        });

        setSparkles(Array.from({ length: 20 }, generateSparkle));

        const interval = setInterval(() => {
            setSparkles((prev) =>
                prev.map((sparkle) =>
                    Math.random() > 0.7 ? generateSparkle() : sparkle
                )
            );
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative ${className}`}>
            {sparkles.map((sparkle) => (
                <motion.span
                    key={sparkle.id}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        width: sparkle.size,
                        height: sparkle.size,
                        backgroundColor: sparkleColor,
                        boxShadow: `0 0 ${sparkle.size * 2}px ${sparkleColor}`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: sparkle.delay,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                    }}
                />
            ))}
            {children}
        </div>
    );
}
