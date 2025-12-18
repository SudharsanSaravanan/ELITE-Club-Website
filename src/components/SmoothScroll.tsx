"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                syncTouch: true,
            }}
        >
            <ScrollTriggerSync />
            {children}
        </ReactLenis>
    );
}

function ScrollTriggerSync() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const onScroll = () => {
            ScrollTrigger.update();
        };

        lenis.on("scroll", onScroll);

        const raf = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.off("scroll", onScroll);
            gsap.ticker.remove(raf);
        };
    }, [lenis]);

    return null;
}
