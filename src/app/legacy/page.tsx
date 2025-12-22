"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor } from "@/components/ui/Cursor";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    images: string[];
    category: string;
    detailedDescription?: string;
    structure?: string[];
    logistics?: string[];
    objectives?: string[];
}

const legacyEvents: Event[] = [
    {
        id: 1,
        title: "Learn from Leaders",
        description: "Flagship event featuring inspiring interactive sessions with visionary leaders from diverse industries.",
        detailedDescription: `"Learn from Leaders" is ELITE's flagship event organised every year at Anokha Techfest Amrita Vishwa Vidyapeetham. It is an inspiring interactive session designed to bridge the gap between aspiring minds and accomplished professionals. The event brings together visionary leaders from diverse industries to share their journeys, challenges, and lessons learned along the way.

Through keynote talks, fireside chats, and open Q&A, participants gain valuable insights into leadership, innovation, and personal growth. This event provides a unique platform to understand what it truly takes to create impact, make decisions under pressure, and lead with purpose in today's fast-evolving world.

Whether you are a student, a young professional, or someone eager to grow, "Learn from Leaders" offers an opportunity to learn directly from those who've walked the path of success and are shaping the future.`,
        date: "17 October 2024",
        images: [
            "/events/learn-from-leaders/img1.jpg",
            "/events/learn-from-leaders/img2.jpg",
            "/events/learn-from-leaders/img3.jpg",
            "/events/learn-from-leaders/img4.jpg",
            "/events/learn-from-leaders/img5.jpg"
        ],
        category: "Flagship Event"
    },
    {
        id: 2,
        title: "Investor Tycoon Challenge",
        description: "Strategic immersive event simulating real-world economic dynamics at IGNITE 2024.",
        detailedDescription: `This strategic and immersive event is designed to simulate real-world economic dynamics, promoting resource management, adaptability, and collaboration. Participants act as city tycoons, competing to achieve the highest net worth by making investments, trading, and navigating dynamic market conditions.

The mechanics of the challenge: participants start with virtual capital and compete by investing in real estate, businesses, and infrastructure while adapting to dynamic events and market conditions. Random events, trading opportunities, and auctions create a vibrant simulation of real-world economic activity.`,
        date: "20 December 2024",
        images: [
            "/events/investor-tycoon/1.jpg",
            "/events/investor-tycoon/2.jpg",
            "/events/investor-tycoon/3.jpg",
            "/events/investor-tycoon/4.jpg",
            "/events/investor-tycoon/5.jpg"
        ],
        category: "Competition",
        structure: [
            "Session 1 (9:30 - 10:00): Roll call, briefing on rules, and initial capital allocation",
            "Session 2 (10:10 - 12:00): Initial investments and strategic planning with first wave of random events",
            "Session 3 (1:00 - 3:00): Trading, alliances, further investments, and auctions",
            "Session 4 (3:10 - 4:15): Final transactions, decision-making, and market adjustments",
            "Session 5 (4:30 - 5:15): Strategy presentations, result declaration and prize distribution"
        ],
        logistics: [
            "City Map: Large printed map divided into districts with physical markers",
            "Cards/Placards: Representing assets (properties, businesses, infrastructure)",
            "Statistics and Live Data Tools: Projector for showing market fluctuations",
            "Venue: Spacious hall for participant interaction",
            "25 Teams (2 members each) with tables and chairs"
        ],
        objectives: [
            "Build the most valuable portfolio through investments, trading, and strategy",
            "Promote resource management and adaptability",
            "Encourage collaboration and strategic thinking",
            "Simulate real-world economic dynamics"
        ]
    }
];

const coreValues = [
    { 
        title: "Integrity", 
        description: "Upholding honesty and strong moral principles in all endeavours.",
        image: "/values/Integrity.png"
    },
    { 
        title: "Collaboration", 
        description: "Fostering teamwork and open communication among members.",
        image: "/values/Collaboration.png"
    },
    { 
        title: "Inclusivity", 
        description: "Ensuring a welcoming environment for individuals of all backgrounds.",
        image: "/values/Inclusivity.png"
    },
    { 
        title: "Excellence", 
        description: "Striving for the highest standards in projects and initiatives.",
        image: "/values/Excellence.png"
    },
    { 
        title: "Responsibility", 
        description: "Being accountable for actions and their impact on the community.",
        image: "/values/Responsibility.png"
    }
];

const guidingPrinciples = [
    "Empowerment: Encouraging members to take initiative and lead projects.",
    "Continuous Learning: Promoting ongoing education and skill development.",
    "Community Engagement: Actively participating in initiatives that benefit society.",
    "Innovation: Embracing creative solutions and novel approaches to problem-solving."
];

interface EventImageSliderProps {
    images: string[];
    title: string;
}

const EventImageSlider = ({ images, title }: EventImageSliderProps) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isAutoPlaying && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
            }, 3000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isAutoPlaying, images.length]);

    const handlePrevious = () => {
        setIsAutoPlaying(false);
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentImage((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const handleDotClick = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentImage(index);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    return (
        <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-2xl group">
            <div className="absolute inset-0">
                <Image
                    src={images[currentImage]}
                    alt={`${title} - Image ${currentImage + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-20"
                    >
                        ←
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-20"
                    >
                        →
                    </button>
                </>
            )}

            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentImage 
                                    ? 'bg-primary w-6' 
                                    : 'bg-white/50 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            )}

            {images.length > 1 && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80 z-20">
                    {currentImage + 1}/{images.length}
                </div>
            )}
        </div>
    );
};

export default function LegacyPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const pageRevealRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.set(pageRevealRef.current, {
            scaleY: 1,
            transformOrigin: "bottom center"
        })
        .to(pageRevealRef.current, {
            scaleY: 0,
            duration: 1.2,
            ease: "power3.inOut",
            delay: 0.2
        });

        const ctx = gsap.context(() => {
            gsap.from(".bg-pattern", {
                opacity: 0,
                scale: 1.1,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.5
            });

            gsap.from(heroRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.6
            });

            const letters = titleRef.current
  ? Array.from(titleRef.current.querySelectorAll('.letter'))
  : [];

if (letters.length === 0) return;

gsap.from(letters, {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.02,
  ease: "power2.out",
  delay: 0.8,
});

            gsap.utils.toArray(".section-container").forEach((section: any, i) => {
                gsap.from(section, {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                });
            });

            gsap.utils.toArray(".stagger-card").forEach((cards: any, i) => {
                gsap.from(cards.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cards,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        });

        return () => {
            tl.kill();
            ctx.revert();
        };
    }, []);

    const filteredEvents = activeFilter === "All" 
        ? legacyEvents 
        : legacyEvents.filter(event => event.category === activeFilter);

    const categories = ["All", ...Array.from(new Set(legacyEvents.map(event => event.category)))];

    return (
        <>
            <div 
                ref={pageRevealRef}
                className="fixed inset-0 bg-gradient-to-b from-white to-gray-50 z-[100] pointer-events-none"
                style={{
                    boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.1)"
                }}
            />

            <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
                <CustomCursor />
                <FloatingDock items={navItems} />

                <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-pattern">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 40%),
                            radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.12) 0%, transparent 40%)
                        `,
                    }} />
                </div>

                <section ref={heroRef} className="relative z-10 pt-28 pb-16 px-6 md:px-12 lg:px-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center">
                            <div ref={titleRef} className="mb-6">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-clash font-bold tracking-tight">
                                    {"OUR LEGACY".split('').map((letter, index) => (
                                        <span key={index} className="letter inline-block text-gold-gradient">
                                            {letter === ' ' ? '\u00A0' : letter}
                                        </span>
                                    ))}
                                </h1>
                            </div>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-8 italic"
                            >
                                Our journey through innovation, leadership, and entrepreneurship shaping the future of the Indian deep-tech ecosystem.
                            </motion.p>
                        </div>
                    </div>
                </section>

                <section className="section-container relative z-10 px-6 md:px-12 lg:px-24 mb-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg transition-all duration-500 group-hover:border-primary/60"></div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg transition-all duration-500 group-hover:border-primary/60"></div>
                            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg transition-all duration-500 group-hover:border-primary/60"></div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg transition-all duration-500 group-hover:border-primary/60"></div>
                            
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                            
                            <div className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 md:p-12 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-20"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                                        <div className="md:w-2/5">
                                            <div className="mb-6">
                                                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full mb-6 border border-primary/30 shadow-sm">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                                    <span className="text-sm font-medium text-primary font-clash">ABOUT ELITE</span>
                                                </div>
                                                
                                                <div className="relative">
                                                    <div className="absolute -left-4 top-0 text-5xl text-primary/20 font-serif">"</div>
                                                    <div className="relative pl-6 md:pl-8 border-l-2 border-primary/40">
                                                        <p className="text-lg md:text-xl italic text-primary leading-relaxed font-light">
                                                            "Innovation finds its true value when it serves the community."
                                                        </p>
                                                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-primary to-primary/70 rounded-full shadow-sm"></div>
                                                    </div>
                                                    <div className="absolute -right-4 bottom-0 text-5xl text-primary/20 font-serif">"</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="md:w-3/5">
                                            <div className="space-y-5">
                                                <p className="text-foreground leading-relaxed text-base md:text-lg">
                                                    The acronym <span className="text-primary font-semibold font-clash">"ELITE"</span> encapsulates our core principles: 
                                                    <span className="text-primary font-medium font-clash"> Entrepreneurship, Leadership, Innovation, Training, and Exposure.</span>
                                                </p>
                                                <p className="text-foreground leading-relaxed">
                                                    We are a network of innovators dedicated to leading ideas that catalyze real-world impact. Our mission is to foster growth not just as technologists or industrialists, but as creators and responsible leaders striving to elevate humanity.
                                                </p>
                                                <p className="text-foreground leading-relaxed">
                                                    Every event, project, and activity we undertake is influenced by our ideology of holistic growth. We aim to create an ecosystem where responsibilities are upheld without exception, and moral obligations guide our pursuit of sustainable development.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-container relative z-10 py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-black/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-clash font-bold mb-4 text-gold-gradient">
                                Our Foundation
                            </h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto italic">
                                The principles that guide our journey and define our purpose
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 stagger-card">
                            <div className="glass p-8 rounded-2xl border border-white/5 hover-lift transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-lg"></div>
                                        </div>
                                        <h3 className="text-xl font-clash font-semibold text-primary">Our Mission</h3>
                                    </div>
                                    <p className="text-muted leading-relaxed flex-grow">
                                        To immerse students in dynamic environments that demand innovation, adaptability, and problem-solving. By embracing rapid execution, constructive failure, and iterative improvement, we cultivate a strong passion for entrepreneurship.
                                    </p>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-2xl border border-white/5 hover-lift transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-full"></div>
                                        </div>
                                        <h3 className="text-xl font-clash font-semibold text-primary">Our Vision</h3>
                                    </div>
                                    <p className="text-muted leading-relaxed flex-grow">
                                        To transform into a hub that offers students a safe, low-risk environment for learning through action and experience, exploring ideas, embracing challenges, and developing leadership qualities to build impactful ventures in the Indian deep-tech ecosystem.
                                    </p>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-2xl border border-white/5 hover-lift transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rotate-45"></div>
                                        </div>
                                        <h3 className="text-xl font-clash font-semibold text-primary">Our Objective</h3>
                                    </div>
                                    <p className="text-muted leading-relaxed flex-grow">
                                        To instill appreciation for Entrepreneurship, Leadership, Business Fundamentals, Ethical Professionalism, and Startup culture. We nurture entrepreneurs who enrich the Indian economy and catalyze self-sufficiency, reducing dependence on foreign corporations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-container relative z-10 py-16 px-6 md:px-12 lg:px-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-clash font-bold mb-4 text-gold-gradient">
                                Our Core Values
                            </h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto italic">
                                The fundamental beliefs that shape our culture and drive our actions
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 stagger-card">
                            {coreValues.map((value, index) => (
                                <div key={index} className="group relative">
                                    <div className="glass p-6 rounded-2xl text-center hover-lift transition-all duration-300 h-full border border-white/5 hover:border-primary/20">
                                        <div className="relative w-24 h-24 mx-auto mb-5">
                                            <Image
                                                src={value.image}
                                                alt={value.title}
                                                width={96}
                                                height={96}
                                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <h4 className="font-clash font-semibold text-lg mb-2 text-primary transition-colors">
                                            {value.title}
                                        </h4>
                                        <p className="text-sm text-muted leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-container relative z-10 py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-black/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-clash font-bold mb-4 text-gold-gradient">
                                Previous Events
                            </h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto italic">
                                Milestones that shaped our journey towards fostering entrepreneurship and innovation
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category
                                            ? 'bg-gradient-to-r from-primary to-primary/80 text-background shadow-lg shadow-primary/25'
                                            : 'glass text-muted hover:text-foreground hover:bg-white/5 border border-white/10'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 stagger-card">
                        {filteredEvents.map((event) => (
                            <div key={event.id} className="group">
                                <div className="relative glass overflow-hidden rounded-2xl h-full border border-white/10 hover-lift transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                               <EventImageSlider
                                    key={event.id}
                                    images={event.images}
                                    title={event.title}
                                    />

                                <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-primary text-xs font-medium border border-primary/90">
                                    {event.category}
                                </span>
                                </div>

                                <div className="p-6">
                                <h3 className="text-2xl font-clash font-semibold mb-2">
                                    {event.title}
                                </h3>

                                <p className="text-sm text-primary/90 mb-3">
                                    {event.date}
                                </p>

                                <p className="text-muted mb-5 line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                                    <span className="text-sm text-primary/70 font-medium">
                                    
                                    </span>

                                    <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(event);
                                    }}
                                    className="text-sm font-medium text-primary hover:translate-x-1 transition-transform"
                                    >
                                    Learn more →
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>

                <section className="section-container relative z-10 py-12 px-6 md:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="glass p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl md:text-3xl font-clash font-bold mb-2 text-gold-gradient">
                                    Our Guiding Principles
                                </h3>
                                <p className="text-muted text-sm italic">The compass that directs our decisions and actions</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {guidingPrinciples.map((principle, index) => (
                                    <div key={index} className="group relative overflow-hidden">
                                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-primary/20">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-primary mb-1 text-sm md:text-base leading-tight">
                                                    {principle.split(':')[0]}
                                                </h4>
                                                <p className="text-xs md:text-sm text-muted leading-relaxed">
                                                    {principle.split(':')[1].trim()}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-gradient-to-br from-primary via-primary to-primary/70 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-primary/30 shadow-2xl shadow-primary/20"
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="px-3 py-1.5 rounded-full bg-white/20 text-black text-sm font-medium mb-3 inline-block border border-primary/50">
                                            {selectedEvent.category}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-clash font-bold text-black">{selectedEvent.title}</h2>
                                        <p className="text-black/80 mt-1 text-sm">
                                            {selectedEvent.date}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="p-2 rounded-lg hover:bg-primary/30 transition-colors text-black hover:text-black"
                                    >
                                        <span className="text-xl">✕</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-black">
                                            Description
                                        </h3>
                                        <div className="text-black/90 leading-relaxed whitespace-pre-line bg-white/80 p-4 rounded-xl border border-white">
                                            {selectedEvent.detailedDescription || selectedEvent.description}
                                        </div>
                                    </div>

                                    {selectedEvent.objectives && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 text-black">
                                                Objectives
                                            </h3>
                                            <div className="text-black/90 leading-relaxed whitespace-pre-line bg-white/80 p-4 rounded-xl border border-primary/30">
                                                {selectedEvent.objectives.map((objective, idx) => (
                                                    <div key={idx} className="mb-2 last:mb-0">
                                                        • {objective}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="mt-8 pt-6 border-t border-primary/30">
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <span className="text-sm text-white/70">ELITE Club Organized Event</span>
                                        <button
                                            onClick={() => setSelectedEvent(null)}
                                            className="px-6 py-2.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
                                        >
                                            Close Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                <footer className="relative z-10 py-12 px-6 md:px-12 lg:px-24 border-t border-white/10 bg-gradient-to-b from-transparent to-black/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
                            <p className="text-muted text-sm">
                                © {new Date().getFullYear()} The ELITE Club. All rights reserved.<br />
                                <span className="text-primary/60">Shaping the entrepreneurs of tomorrow, today.</span>
                            </p>
                        </div>
                    </div>
                </footer>

                <div className="fixed bottom-10 left-10 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                <div className="fixed top-10 right-10 w-64 h-64 bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </main>
        </>
    );
}