"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const scrollContent = scrollContentRef.current;

        if (!container || !scrollContent) return;

        const scrollWidth = scrollContent.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = scrollWidth - viewportWidth;

        const tween = gsap.to(scrollContent, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={scrollContentRef} className="flex">
                {children}
            </div>
        </div>
    );
}

interface AcronymLetterProps {
    letter: string;
    word: string;
    description: string;
    index: number;
}

export function AcronymLetter({ letter, word, description, index }: AcronymLetterProps) {
    return (
        <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
            <div className="max-w-4xl mx-auto text-center">
                <div
                    className="text-[20rem] md:text-[30rem] font-bold leading-none"
                    style={{
                        fontFamily: "Clash Display, sans-serif",
                        background: "linear-gradient(to bottom, #D4AF37, #8a701e)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 100px rgba(212, 175, 55, 0.3)",
                    }}
                >
                    {letter}
                </div>

                <h2
                    className="text-4xl md:text-5xl font-bold text-elite-silver mt-8"
                    style={{ fontFamily: "Clash Display, sans-serif" }}
                >
                    {word}
                </h2>

                <p className="text-xl text-elite-silver/70 mt-4 max-w-lg mx-auto">
                    {description}
                </p>
            </div>
        </div>
    );
}
