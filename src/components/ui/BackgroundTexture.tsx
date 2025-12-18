"use client";

import Image from "next/image";

export function BackgroundTexture() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {/* Layer 1: Maximum Visibility (Normal Blend, 100% Opacity) */}
            <div className="absolute inset-0 opacity-100">
                <Image
                    src="/images/texture_bg.png"
                    alt="Cinematic Background Texture"
                    fill
                    priority
                    className="object-cover grayscale"
                    quality={100}
                />
            </div>

            {/* Layer 2: Soft Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(circle at center, transparent 0%, #F5F5F7 100%)",
                    opacity: 0.5
                }}
            />
        </div>
    );
}
