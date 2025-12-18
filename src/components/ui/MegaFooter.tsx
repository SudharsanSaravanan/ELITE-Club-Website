"use client";

import { motion } from "framer-motion";
import { MagneticWrapper } from "@/components/ui/Cursor";

export default function MegaFooter() {
    return (
        <footer className="relative w-full overflow-hidden bg-[#D4AF37] px-4 py-16 md:py-32">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-clash text-3xl font-bold uppercase leading-none text-[#111827] sm:text-5xl md:text-7xl lg:text-[10rem]">
                        Ready to Lead?
                    </h2>
                </motion.div>

                <p className="mt-6 md:mt-8 max-w-lg text-sm md:text-lg lg:text-xl font-medium text-[#111827]/80 px-4">
                    Join a brotherhood of visionaries, builders, and future industry titans.
                    Your journey to the top starts here.
                </p>

                <div className="mt-12">
                    <MagneticWrapper strength={0.4}>
                        <a
                            href="/join"
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#111827] px-8 py-4 text-white transition-all hover:scale-105 hover:bg-black"
                        >
                            <span className="relative z-10 font-clash text-lg font-semibold tracking-wide">
                                APPLY NOW
                            </span>
                            <motion.span
                                className="relative z-10"
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                            >
                                →
                            </motion.span>
                        </a>
                    </MagneticWrapper>
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 text-xs font-bold uppercase tracking-widest text-[#111827]/40">
                    <span>Est. 2018</span>
                    <span>Forging Leaders</span>
                </div>
            </div>
        </footer>
    );
}
