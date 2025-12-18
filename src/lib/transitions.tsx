"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function usePageTransition() {
    useEffect(() => {
        const tl = gsap.timeline();

        gsap.set("main", { opacity: 0 });

        tl.to("main", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        });

        return () => {
            tl.kill();
        };
    }, []);
}

export function TransitionOverlay() {
    return (
        <div
            id="page-transition"
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{ opacity: 0 }}
        >
            <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full bg-elite-dark origin-left transform scale-x-0" />
                <div className="w-1/2 h-full bg-elite-dark origin-right transform scale-x-0" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-elite-gold border-t-transparent rounded-full animate-spin opacity-0" />
            </div>
        </div>
    );
}

export function animatePageOut(): Promise<void> {
    return new Promise((resolve) => {
        const overlay = document.getElementById("page-transition");
        if (!overlay) {
            resolve();
            return;
        }

        const panels = overlay.querySelectorAll("div > div");
        const spinner = overlay.querySelector(".animate-spin");

        const tl = gsap.timeline({
            onComplete: resolve,
        });

        tl.set(overlay, { opacity: 1, pointerEvents: "auto" })
            .to(panels[0], { scaleX: 1, duration: 0.5, ease: "power4.inOut" }, 0)
            .to(panels[1], { scaleX: 1, duration: 0.5, ease: "power4.inOut" }, 0)
            .to(spinner, { opacity: 1, duration: 0.3 }, 0.3);
    });
}

export function animatePageIn(): void {
    const overlay = document.getElementById("page-transition");
    if (!overlay) return;

    const panels = overlay.querySelectorAll("div > div");
    const spinner = overlay.querySelector(".animate-spin");

    const tl = gsap.timeline();

    tl.to(spinner, { opacity: 0, duration: 0.2 })
        .to(panels[0], { scaleX: 0, duration: 0.5, ease: "power4.inOut" }, 0.1)
        .to(panels[1], { scaleX: 0, duration: 0.5, ease: "power4.inOut" }, 0.1)
        .set(overlay, { opacity: 0, pointerEvents: "none" });
}
