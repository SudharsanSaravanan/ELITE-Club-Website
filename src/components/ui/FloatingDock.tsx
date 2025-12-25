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
    action?: React.ReactNode;
}

// Hamburger menu icon component
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <motion.span
                className="block w-4 h-0.5 bg-elite-silver rounded-full origin-center"
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 3 : 0,
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.span
                className="block w-4 h-0.5 bg-elite-silver rounded-full"
                animate={{
                    opacity: isOpen ? 0 : 1,
                    scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.span
                className="block w-4 h-0.5 bg-elite-silver rounded-full origin-center"
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -3 : 0,
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}

export function FloatingDock({ items, className = "", action }: FloatingDockProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMobileMenuOpen) {
            const handleClickOutside = () => setIsMobileMenuOpen(false);
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [isMobileMenuOpen]);

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div
            className={`fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 ${className}`}
        >
            {/* Mobile expanded menu */}
            <AnimatePresence>
                {isMobile && isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                        }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-3 rounded-2xl bg-elite-dark/95 backdrop-blur-xl border border-elite-graphite/50 shadow-2xl min-w-[200px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-3 rounded-xl text-sm font-medium text-elite-silver hover:text-elite-gold hover:bg-elite-graphite/50 transition-all duration-200 text-center"
                                style={{ fontFamily: "Satoshi, sans-serif" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {action && (
                            <>
                                <div className="h-px bg-elite-silver/20 my-1" />
                                <div className="flex justify-center py-2">
                                    {action}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main dock - always visible */}
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-full bg-elite-dark/80 backdrop-blur-xl border border-elite-graphite/50 shadow-2xl"
            >
                {/* Mobile: hamburger menu button */}
                {isMobile ? (
                    <motion.button
                        onClick={handleMenuToggle}
                        className="px-3 py-2 rounded-full cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-elite-graphite/50 transition-colors"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        <HamburgerIcon isOpen={isMobileMenuOpen} />
                    </motion.button>
                ) : (
                    /* Desktop: show all nav items */
                    items.map((item, index) => (
                        <DockItem key={item.href} item={item} index={index} />
                    ))
                )}

                {/* Action area (UserNav) - shown on tablets and up */}
                {!isMobile && action && (
                    <>
                        <div className="w-px h-8 bg-elite-silver/20 mx-1" />
                        {action}
                    </>
                )}
            </motion.nav>
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
                    className={`relative z-10 text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${isHovered ? "text-elite-gold" : "text-elite-silver"
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
