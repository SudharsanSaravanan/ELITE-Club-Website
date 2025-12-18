"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    magnetStrength?: number;
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className = "",
    magnetStrength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * magnetStrength;
        const distanceY = (e.clientY - centerY) * magnetStrength;

        setPosition({ x: distanceX, y: distanceY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            className={`relative overflow-hidden ${className}`}
        >
            {children}
        </motion.button>
    );
}

interface GlowButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function GlowButton({
    children,
    className = "",
    onClick,
}: GlowButtonProps) {
    return (
        <MagneticButton
            onClick={onClick}
            className={`group relative px-8 py-4 ${className}`}
        >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-elite-gold via-elite-gold-dim to-elite-gold opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-[1px] rounded-full bg-elite-black" />

            <span className="relative z-10 flex items-center gap-2 font-medium text-elite-silver group-hover:text-elite-gold transition-colors duration-300">
                {children}
            </span>
        </MagneticButton>
    );
}
