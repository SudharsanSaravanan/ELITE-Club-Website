"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor } from "@/components/ui/Cursor";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

export default function LegacyPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const decorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(titleRef.current, { opacity: 0, y: 100, scale: 0.9 });
            gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
            gsap.set(decorRef.current, { opacity: 0, scale: 0.5, rotation: -180 });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to(decorRef.current, {
                opacity: 0.1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                ease: "expo.out",
            });

            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "expo.out",
            }, "-=1");

            tl.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }, "-=0.7");

            gsap.to(decorRef.current, {
                y: -20,
                rotation: 5,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="bg-elite-black min-h-screen relative overflow-hidden">
            <CustomCursor />
            <FloatingDock items={navItems} />

            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
          `,
                    backgroundSize: "100px 100px",
                }}
            />

            <div
                ref={decorRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] pointer-events-none"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D4AF37" />
                            <stop offset="100%" stopColor="#8a701e" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="url(#goldGradient)"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke="url(#goldGradient)"
                        strokeWidth="0.3"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="50"
                        fill="none"
                        stroke="url(#goldGradient)"
                        strokeWidth="0.2"
                        strokeDasharray="2 6"
                    />
                </svg>
            </div>

            <div
                ref={containerRef}
                className="relative z-10 h-screen flex flex-col items-center justify-center px-6"
            >
                <h1
                    ref={titleRef}
                    className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-bold text-center leading-none"
                    style={{
                        fontFamily: "Clash Display, sans-serif",
                        background: "linear-gradient(180deg, #D4AF37 0%, #8a701e 70%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    COMING
                    <br />
                    SOON
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-elite-silver/60 text-center mt-6 sm:mt-8 max-w-sm sm:max-w-md md:max-w-lg px-4"
                >
                    Our legacy is being written. Something extraordinary is on its way.
                </p>

                <button className="mt-10 sm:mt-12 md:mt-16 px-6 sm:px-8 py-3 sm:py-4 border border-elite-gold text-elite-gold rounded-full hover:bg-elite-gold hover:text-elite-black transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest min-h-[44px]">
                    Notify Me
                </button>
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-elite-silver/20 text-xs sm:text-sm uppercase tracking-widest">
                Legacy
            </div>
        </main>
    );
}
