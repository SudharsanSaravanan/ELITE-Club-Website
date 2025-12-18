"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;

            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
            return;
        }

        const overlay = overlayRef.current;
        const content = contentRef.current;
        if (!overlay || !content) return;

        const tl = gsap.timeline();

        tl.fromTo(
            content,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );

    }, [pathname]);

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[100] pointer-events-none flex"
                style={{ opacity: 0 }}
            >
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="transition-column flex-1 h-full bg-elite-dark origin-bottom"
                        style={{ transform: "scaleY(0)" }}
                    />
                ))}
            </div>

            <div ref={contentRef}>
                {children}
            </div>
        </>
    );
}

export function usePageExit() {
    const triggerExit = async (callback: () => void) => {
        const overlay = document.querySelector(".transition-overlay");
        if (!overlay) {
            callback();
            return;
        }

        const columns = overlay.querySelectorAll(".transition-column");

        const tl = gsap.timeline({
            onComplete: callback,
        });

        tl.set(overlay, { opacity: 1, pointerEvents: "auto" });
        tl.to(columns, {
            scaleY: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power4.inOut",
        });
    };

    return { triggerExit };
}
