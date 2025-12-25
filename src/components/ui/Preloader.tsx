"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 200);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F7]"
                    exit={{
                        clipPath: "inset(0% 0% 100% 0%)",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="flex flex-col items-center">
                        <motion.h1
                            className="font-clash text-6xl sm:text-7xl md:text-9xl font-bold text-[#D4AF37]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {count}%
                        </motion.h1>
                        <motion.p
                            className="mt-4 font-satoshi text-stone-500 uppercase tracking-[0.3em] text-xs md:text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Forging Leaders
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
