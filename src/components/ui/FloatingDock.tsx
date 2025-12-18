"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface FloatingDockProps {
    items: NavItem[];
    className?: string;
}

export function FloatingDock({ items, className = "" }: FloatingDockProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsVisible(true);

            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            const timeout = setTimeout(() => {
                if (!isHovering) {
                    setIsVisible(false);
                }
            }, 2000);

            setScrollTimeout(timeout);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [scrollTimeout, isHovering, lastScrollY]);

    return (
        <div
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 ${className}`}
            onMouseEnter={() => {
                setIsHovering(true);
                setIsVisible(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
        >
            <AnimatePresence>
                {(isVisible || isHovering) && (
                    <motion.nav
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-full bg-elite-dark/80 backdrop-blur-xl border border-elite-graphite/50 shadow-2xl"
                    >
                        {items.map((item, index) => (
                            <DockItem key={item.href} item={item} index={index} />
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>

            {!isVisible && !isHovering && (
                <div className="w-48 h-16 absolute bottom-0 left-1/2 -translate-x-1/2" />
            )}
        </div>
    );
}

interface DockItemProps {
    item: NavItem;
    index: number;
}

function DockItem({ item, index }: DockItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={item.href}>
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ scale: 1 }}
                animate={{
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                }}
                className="relative px-2 sm:px-3 md:px-4 py-2 rounded-full cursor-pointer min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-elite-graphite"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />

                <span
                    className={`relative z-10 text-xs sm:text-sm font-medium transition-colors duration-200 ${isHovered ? "text-elite-gold" : "text-elite-silver"
                        }`}
                    style={{ fontFamily: "Satoshi, sans-serif" }}
                >
                    {item.label}
                </span>

                <motion.span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-elite-gold"
                    initial={{ scale: 0 }}
                    animate={{ scale: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </Link>
    );
}
