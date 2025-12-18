"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        if (!cursor || !dot) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.dataset.hover === "true"
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            gsap.set(cursor, {
                x: cursorX - 20,
                y: cursorY - 20,
            });

            gsap.set(dot, {
                x: mouseX - 4,
                y: mouseY - 4,
            });
        };

        gsap.ticker.add(animate);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            gsap.ticker.remove(animate);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        if (isHovering) {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                borderColor: "#D4AF37",
                duration: 0.3,
                ease: "power2.out",
            });
        } else {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(212, 175, 55, 0.5)",
                duration: 0.3,
                ease: "power2.out",
            });
        }
    }, [isHovering]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[200] mix-blend-difference hidden md:block"
                style={{ borderColor: "rgba(212, 175, 55, 0.5)" }}
            />
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-elite-gold pointer-events-none z-[200] hidden md:block"
            />
        </>
    );
}

interface MagneticWrapperProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

export function MagneticWrapper({ children, className = "", strength = 0.3 }: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
            });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className={className} data-hover="true">
            {children}
        </div>
    );
}

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({ children, className = "", delay = 0, as: Tag = "p" }: TextRevealProps) {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const words = children.split(" ");
        container.innerHTML = words
            .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`)
            .join(" ");

        const innerSpans = container.querySelectorAll("span > span");

        gsap.to(innerSpans, {
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
            },
        });
    }, [children, delay]);

    return <Tag ref={containerRef as RefObject<HTMLHeadingElement & HTMLParagraphElement>} className={className}>{children}</Tag>;
}

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export function Counter({ end, duration = 2, suffix = "", className = "" }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const obj = { value: 0 };

        gsap.to(obj, {
            value: end,
            duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
            onUpdate: () => {
                element.textContent = Math.round(obj.value) + suffix;
            },
        });
    }, [end, duration, suffix]);

    return <span ref={ref} className={className}>0{suffix}</span>;
}
