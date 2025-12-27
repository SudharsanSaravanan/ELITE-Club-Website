"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor, MagneticWrapper } from "@/components/ui/Cursor";
import TiltCard from "@/components/ui/TiltCard";
import MegaFooter from "@/components/ui/MegaFooter";
import UserNav from "@/components/UserNav";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

const acronymData = [
    {
        letter: "E",
        word: "Entrepreneurship",
        description: "Building ventures from zero.",
        image: "/images/entrepreneurship_bg.png"
    },
    {
        letter: "L",
        word: "Leadership",
        description: "Guiding teams and inspiring change.",
        image: "/images/leadership_bg.png"
    },
    {
        letter: "I",
        word: "Innovation",
        description: "Creating solutions that reshape industries.",
        image: "/images/innovation_bg.png"
    },
    {
        letter: "T",
        word: "Training",
        description: "Developing skills and expertise.",
        image: "/images/training_bg.png"
    },
    {
        letter: "E",
        word: "Exposure",
        description: "Connecting with industry leaders.",
        image: "/images/exposure_bg.png"
    },
];

// CSS-based Expand Letter component with mobile tap support
function ExpandLetter({
    letter,
    word,
    index,
    isExpanded,
    onTap
}: {
    letter: string;
    word: string;
    index: number;
    isExpanded: boolean;
    onTap: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`expand-letter-container group ${isExpanded ? 'expanded' : ''}`}
            onClick={onTap}
        >
            {/* The letter/word that expands */}
            <span className="expand-letter font-clash font-bold text-gold cursor-pointer select-none">
                {/* First letter (always visible) */}
                <span className="first-letter">{letter}</span>
                {/* Rest of word (hidden, revealed on hover/tap) */}
                <span className="rest-of-word">{word.slice(1)}</span>
            </span>
        </motion.div>
    );
}

function BentoGrid() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-clash font-bold text-3xl md:text-4xl text-foreground text-center mb-12"
            >
                Inside the Corps
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* Card 1: Legacy & Achievements */}
                <motion.div
                    className="md:col-span-2 md:row-span-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <TiltCard className="h-full glass rounded-3xl p-8">
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <span className="text-gold text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                                    Our Mission
                                </span>
                                <h3 className="font-clash font-semibold text-2xl md:text-3xl text-foreground mt-3">
                                    Innovation finds its true value when it serves the community.
                                </h3>
                                <p className="text-muted mt-4 leading-relaxed text-sm md:text-base">
                                    We are a network of innovators at Amrita School of Engineering,
                                    dedicated to fostering growth — not just as technologists, but as creators
                                    and responsible leaders striving to elevate humanity.
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="h-1 flex-1 bg-gold/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gold rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-muted uppercase tracking-[0.18em]">
                                        Amrita Vishwa Vidyapeetham
                                    </span>
                                    <span className="text-sm text-foreground font-medium">
                                        Deep Tech Focus
                                    </span>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Card 2: Upcoming Events */}
                <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <TiltCard className="h-full glass rounded-3xl p-6 flex flex-col justify-between">
                        <div>
                            <span className="text-gold text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                                Flagship Event
                            </span>
                            <h3 className="font-clash font-semibold text-xl md:text-2xl text-foreground mt-3">
                                Learn from Leaders 3.0
                            </h3>
                            <p className="text-muted mt-2 text-sm">
                                An inspiring interactive session bridging aspiring minds with accomplished
                                professionals through keynote talks, fireside chats, and open Q&A.
                            </p>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-xs text-muted uppercase tracking-[0.18em]">
                                    At Anokha Techfest
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs md:text-sm text-foreground">
                                <span className="font-medium">Coming Soon</span>
                                <span className="h-4 w-px bg-muted/40" />
                                <span className="text-muted">Amrita Campus</span>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                <motion.div
                    className="col-span-1"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <TiltCard className="h-full glass rounded-3xl p-6 flex flex-col justify-between">
                        <div>
                            <span className="text-gold text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                                Team Corps
                            </span>
                            <p className="text-muted text-sm mt-2">
                                Strategy, tech, events, research, and PR — an interdisciplinary squad shipping in sync.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex -space-x-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 border border-white/60" />
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 border border-white/60" />
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 border border-white/60 flex items-center justify-center text-[0.65rem] font-medium text-foreground/80">
                                    +20
                                </div>
                            </div>
                            <a
                                href="/team"
                                className="text-xs md:text-sm font-medium text-foreground underline-offset-4 hover:underline"
                            >
                                Meet the corps
                            </a>
                        </div>
                    </TiltCard>
                </motion.div>

                <motion.div
                    className="col-span-1"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <TiltCard className="h-full glass rounded-3xl p-6 flex flex-col items-center justify-center group">
                        <MagneticWrapper strength={0.3}>
                            <a
                                href="/events"
                                className="px-6 py-3 bg-foreground text-background font-semibold rounded-full 
                                           transition-all duration-300 group-hover:bg-gold group-hover:text-foreground
                                           text-sm md:text-base relative z-20"
                            >
                                Join the Corps →
                            </a>
                        </MagneticWrapper>
                        <span className="text-muted text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            Start with the next meetup
                        </span>
                    </TiltCard>
                </motion.div>
            </div>
        </section>
    );
}

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleTap = (index: number) => {
        if (isMobile) {
            setExpandedIndex(expandedIndex === index ? null : index);
        }
    };

    return (
        <main className="min-h-screen relative">
            {/* Preloader REMOVED from here */}
            <CustomCursor />
            <FloatingDock items={navItems} action={<UserNav />} />

            {/* Section 1: ELITE Expand Hero */}
            <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-0 relative z-10">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:gap-12">
                    <motion.p
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[0.6rem] md:text-xs tracking-[0.25em] md:tracking-[0.35em] uppercase text-muted text-center px-2"
                    >
                        Amrita School of Engineering • ELITE Innovation Corps
                    </motion.p>

                    {/* The Expand Letters in Glass Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-subtle rounded-2xl md:rounded-3xl border border-white/60 px-3 py-5 md:px-8 md:py-10 shadow-[0_22px_60px_rgba(15,23,42,0.12)] w-full max-w-5xl"
                    >
                        <div className="mb-4 md:mb-6 flex items-center justify-between gap-2">
                            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.24em] text-muted">
                                Decode E.L.I.T.E
                            </p>
                            <p className="text-[0.6rem] md:text-xs text-muted/80">
                                {isMobile ? "Tap to expand" : "Hover to expand"}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-1 md:gap-4">
                            {acronymData.map((item, index) => (
                                <ExpandLetter
                                    key={`${item.letter}-${index}`}
                                    letter={item.letter}
                                    word={item.word}
                                    index={index}
                                    isExpanded={expandedIndex === index}
                                    onTap={() => handleTap(index)}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-xs md:text-base text-foreground text-center max-w-2xl font-medium italic px-4"
                    >
                        "Innovation finds its true value when it serves the community."
                    </motion.p>
                </div>
            </section>

            {/* Section 2: Live Ticker - Natural section divider */}
            <section className="border-y border-black/5 bg-black text-gold uppercase text-[0.65rem] md:text-xs py-3 overflow-hidden">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <span key={idx} className="tracking-[0.35em]">
                            LEARN FROM LEADERS 3.0 • PITCH CRAFT 2.0 • AMRITA SHARK TANK • INNOVATION CAFE •{" "}
                        </span>
                    ))}
                </motion.div>
            </section>

            {/* Section 3: Bento Grid */}
            <BentoGrid />

            {/* Section 4: Mega Footer */}
            <MegaFooter />
        </main>
    );
}