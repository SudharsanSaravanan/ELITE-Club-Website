"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const easing = {
    smooth: "power2.out",
    elastic: "elastic.out(1, 0.5)",
    expo: "expo.out",
    apple: "power3.inOut",
    snappy: "power4.out",
};

export function useSplitText(ref: RefObject<HTMLElement>, trigger?: RefObject<HTMLElement>) {
    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const text = element.textContent || "";

        element.innerHTML = text
            .split("")
            .map((char) =>
                char === " "
                    ? "<span>&nbsp;</span>"
                    : `<span class="inline-block opacity-0 translate-y-full">${char}</span>`
            )
            .join("");

        const chars = element.querySelectorAll("span");

        const tl = gsap.timeline({
            scrollTrigger: trigger?.current
                ? {
                    trigger: trigger.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
                : undefined,
        });

        tl.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: easing.expo,
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [ref, trigger]);
}

export function useFadeUp(ref: RefObject<HTMLElement>, delay: number = 0) {
    useEffect(() => {
        if (!ref.current) return;

        gsap.set(ref.current, { opacity: 0, y: 60 });

        const animation = gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay,
            ease: easing.expo,
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        return () => {
            animation.kill();
        };
    }, [ref, delay]);
}

export function useParallax(ref: RefObject<HTMLElement>, speed: number = 0.5) {
    useEffect(() => {
        if (!ref.current) return;

        const animation = gsap.to(ref.current, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        return () => {
            animation.kill();
        };
    }, [ref, speed]);
}

export function useMagnetic(ref: RefObject<HTMLElement>, strength: number = 0.4) {
    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

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
                ease: easing.smooth,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: easing.elastic,
            });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref, strength]);
}

export function useReveal(ref: RefObject<HTMLElement>, direction: "up" | "left" | "right" = "up") {
    useEffect(() => {
        if (!ref.current) return;

        const initial = {
            opacity: 0,
            x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
            y: direction === "up" ? 80 : 0,
        };

        gsap.set(ref.current, initial);

        const animation = gsap.to(ref.current, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: easing.expo,
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        return () => {
            animation.kill();
        };
    }, [ref, direction]);
}

export function useStaggerChildren(containerRef: RefObject<HTMLElement>, childSelector: string) {
    useEffect(() => {
        if (!containerRef.current) return;

        const children = containerRef.current.querySelectorAll(childSelector);

        gsap.set(children, { opacity: 0, y: 40, scale: 0.95 });

        const animation = gsap.to(children, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: easing.expo,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        return () => {
            animation.kill();
        };
    }, [containerRef, childSelector]);
}

export function useLineDraw(ref: RefObject<SVGPathElement>) {
    useEffect(() => {
        if (!ref.current) return;

        const path = ref.current;
        const length = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });

        const animation = gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: easing.expo,
            scrollTrigger: {
                trigger: path,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        return () => {
            animation.kill();
        };
    }, [ref]);
}

export function useScaleReveal(ref: RefObject<HTMLElement>, delay: number = 0) {
    useEffect(() => {
        if (!ref.current) return;

        gsap.set(ref.current, {
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
        });

        const animation = gsap.to(ref.current, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            delay,
            ease: easing.expo,
        });

        return () => {
            animation.kill();
        };
    }, [ref, delay]);
}
