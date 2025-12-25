"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { CustomCursor } from "@/components/ui/Cursor";
import UserNav from "@/components/UserNav";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

const coreTeam = [
    { name: "Anu G Kumar", role: "Faculty Coordinator", image: "/team/Anu G Kumar (faculty coordinator).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
    { name: "Anish Visakan", role: "President", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
    { name: "Korukonda L K M Prem Chand", role: "Vice President", image: "/team/Korukonda L K M PremChand (Vice_President).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
    { name: "Kunapuli Chandra Mouli", role: "Treasurer", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
];

const departments = [
    {
        name: "Research",
        members: [
            { name: "Kamal", role: "Head", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Pavan", role: "Co-Head", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Jishnu", role: "Member", image: "/team/Jishnu Teja Dandamudi (Research).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Nishrutha", role: "Member", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Sricharan", role: "Member", image: "/team/Sricharan_A_[Research-Team]..webp", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
    {
        name: "Technical",
        members: [
            { name: "Sri Krishna V", role: "Head", image: "/team/Sri-Krishna-V-Tech-Head.webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Sudharsana Saravanan S", role: "Co-Head (Backend)", image: "/team/Sudharsana Saravanan S (Co-Head Technical team).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Samith Reddy", role: "Frontend", image: "/team/Samith Reddy (Technical team Frontend).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Swetha C", role: "Frontend", image: "/team/SWETHA C (Technical team Frontend).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Hari Prasath", role: "Backend", image: "/team/Hari Prasath K [Technical team - Backend].webp", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
    {
        name: "Event Management - Execution",
        members: [
            { name: "Arjun Gopal", role: "Head", image: "/team/Arjungopal_Anilkumar_[Event Management Executive Head].webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Minoti", role: "Co-Head", image: "/team/Minoti K (Event management co head).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Meghana", role: "Member", image: "/team/Meghana kotharu _ EventManagement- executive.webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Meera", role: "Member", image: "/team/Meera S Raj Event Management_.webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Hemanth", role: "Member", image: "/team/PAIDI HEMANTH [EVENT MANAGEMENT].webp", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
    {
        name: "Event Management - Curation",
        members: [
            { name: "Lokesh", role: "Head", image: "/team/Lokesh (Curation Head).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Jayanth", role: "Co-Head", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "P. Tarun", role: "Member", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Sukanthan", role: "Member", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Sumedh", role: "Member", image: "/team/sai sumedh pedarla (team curation).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Madhubala Murugesan", role: "Member", image: "/team/Madhubala Murugesan ( Curation).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
    {
        name: "Public Relations",
        members: [
            { name: "Sanjit", role: "Head", image: "/team/Sanjith M (Public Relations).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Noha", role: "Co-Head", image: "/team/Noha Joshy Menachery ( PR Co-head).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Ishwarya", role: "Co-Head", image: "/team/Ishwarya_Murugesan_Public_Relation_CoHead.webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Ganesh", role: "Member", image: "/team/Ganesh C ( PR TEAM ).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Harsha", role: "Member", image: "/team/Chinnagundam Harshavardhan (Public Relations).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Thoshan", role: "Member", image: "/team/Raja Thoshan (Public Relations).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
    {
        name: "Media",
        members: [
            { name: "Sandheep", role: "Head", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Surya", role: "Co-Head", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Anagha", role: "Member", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Jethin M S", role: "Member", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
    {
        name: "ELITE Ambassadors",
        members: [
            { name: "Bhavesh", role: "Ambassador", image: "/team/BHAVESH K (ELITE BRAND AMBASSADOR).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Kushal", role: "Ambassador", image: "/team/RV KUSHAL(Brand_ambassador).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Amitha", role: "Ambassador", image: "", linkedin: "https://linkedin.com", email: "test@example.com" },
            { name: "Srisha Satish Kanna", role: "Ambassador", image: "/team/Srisha Satish Kanna(Brand Ambassador).webp", linkedin: "https://linkedin.com", email: "test@example.com" },
        ],
    },
];
export default function TeamPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const title = headerRef.current?.querySelector("h1");
            const subtitle = headerRef.current?.querySelector("p");

            if (title) {
                gsap.set(title, { opacity: 0, y: 80 });
                gsap.to(title, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power4.out" });
            }
            if (subtitle) {
                gsap.set(subtitle, { opacity: 0, y: 40 });
                gsap.to(subtitle, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
            }
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = coreRef.current?.querySelectorAll(".core-card");
            if (!cards) return;

            gsap.set(cards, { opacity: 0, y: 60, scale: 0.9 });

            ScrollTrigger.batch(cards, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                    });
                },
                start: "top 85%",
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const depts = gridRef.current?.querySelectorAll(".department");
            if (!depts) return;

            gsap.set(depts, { opacity: 0, y: 60 });

            ScrollTrigger.batch(depts, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                    });
                },
                start: "top 85%",
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen pt-24 pb-32">
            <CustomCursor />
            <FloatingDock items={navItems} action={<UserNav />} />

            <section ref={headerRef} className="container mx-auto px-8 mb-16 text-center">
                <h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
                    style={{
                        fontFamily: "Clash Display, sans-serif",
                        background: "linear-gradient(180deg, #D4AF37 0%, #8a701e 70%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Our Team
                </h1>
                <p className="text-xl text-elite-silver/50 max-w-2xl mx-auto leading-relaxed">
                    The constellation of minds driving ELITE forward. Leaders, innovators, and dreamers united by a common vision.
                </p>
            </section>

            <section ref={coreRef} className="container mx-auto px-8 mb-24">
                <div className="text-center mb-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-elite-gold mb-4"
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        Core Leadership
                    </h2>
                    <div className="w-24 h-0.5 bg-elite-gold mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coreTeam.map((member, index) => (
                        <div
                            key={member.name}
                            className="core-card group relative p-8 rounded-2xl bg-gradient-to-b from-[#f5f5f0c2] to-[#e8e8e0] border border-[#d0d0c8]/50 hover:border-[#c0c0b8] transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,200,190,0.3)] overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle at 50% 0%, rgba(220, 220, 210, 0.3) 0%, transparent 70%)",
                                }}
                            />

                            <div className="relative z-10 text-center pointer-events-none">
                                <div
                                    className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 border-2 border-[#a8a8a0]/50 group-hover:border-[#8a8a80] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(160,160,150,0.4)] group-hover:opacity-0 overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(200, 200, 190, 0.3) 0%, rgba(180, 180, 170, 0.15) 100%)",
                                    }}
                                >
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-12 h-12 text-[#8a8a80]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    )}
                                </div>

                                <h3
                                    className="text-2xl font-bold text-[#3a3a30] group-hover:opacity-0 transition-opacity duration-300 mb-2"
                                    style={{ fontFamily: "Clash Display, sans-serif" }}
                                >
                                    {member.name}
                                </h3>

                                <p className="text-lg font-semibold text-[#6a6a60] uppercase tracking-wider mb-3 group-hover:opacity-0 transition-opacity duration-300">
                                    {member.role}
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#a8a8a0]/50 to-transparent pointer-events-none" />

                            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0c2] to-[#e8e8e0] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-center gap-4 rounded-2xl">
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:scale-110 transform transition-transform cursor-pointer"
                                >
                                    <svg className="w-6 h-6 text-[#4a4a40]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a
                                    href={`mailto:${member.email}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:scale-110 transform transition-transform cursor-pointer"
                                >
                                    <svg className="w-6 h-6 text-[#4a4a40]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section ref={gridRef} className="container mx-auto px-8">
                <div className="space-y-16">
                    {departments.map((dept) => (
                        <div key={dept.name} className="department">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-3 h-3 rounded-full bg-elite-gold" />
                                <h2
                                    className="text-2xl md:text-3xl font-bold text-elite-silver"
                                    style={{ fontFamily: "Clash Display, sans-serif" }}
                                >
                                    {dept.name}
                                </h2>
                                <div className="flex-1 h-px bg-elite-graphite/30" />
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                                {dept.members.map((member) => (
                                    <div
                                        key={member.name}
                                        className="group p-4 rounded-xl border transition-all duration-500 relative overflow-hidden bg-gradient-to-b from-[#f5f5f0] to-[#e8e8e0] border-[#d0d0c8]/50 hover:border-[#c0c0b8]"
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at 50% 0%, rgba(220, 220, 210, 0.4) 0%, transparent 70%)",
                                            }}
                                        />

                                        <div className="relative z-10 text-center pointer-events-none">
                                            <div
                                                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 border transition-colors duration-300 bg-gradient-to-br from-[#e8e8e0] to-[#d8d8d0] border-[#c0c0b8]/50 group-hover:opacity-0 overflow-hidden"
                                            >
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <svg className="w-8 h-8 text-[#8a8a80]" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                    </svg>
                                                )}
                                            </div>

                                            <h3 className="text-base sm:text-lg font-semibold text-[#3a3a30] group-hover:opacity-0 transition-opacity duration-300 truncate px-1">
                                                {member.name}
                                            </h3>

                                            <p className="text-[10px] sm:text-xs font-medium mt-1 group-hover:opacity-0 transition-opacity duration-300 text-[#6a6a60] truncate px-1">
                                                {member.role}
                                            </p>
                                        </div>

                                        <div
                                            className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0] to-[#e8e8e0] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-center gap-3 rounded-xl"
                                        >
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="hover:scale-110 transform transition-transform cursor-pointer"
                                            >
                                                <svg className="w-5 h-5 text-[#4a4a40]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                            <a
                                                href={`mailto:${member.email}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="hover:scale-110 transform transition-transform cursor-pointer"
                                            >
                                                <svg className="w-5 h-5 text-[#4a4a40]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-8 mt-24">
                <div className="text-center p-12 rounded-3xl bg-gradient-to-b from-[#0C4160]/70 to-[#0C4160]/50 border border-[#D3AF37]/30">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[#D3AF37] mb-4"
                        style={{ fontFamily: "Clash Display, sans-serif" }}
                    >
                        Want to Join Us?
                    </h2>
                    <p className="text-lg text-[#E2E6E8]/70 max-w-xl mx-auto mb-8">
                        We are always looking for passionate individuals to join our team.
                    </p>
                    <button className="px-10 py-4 bg-[#D3AF37] text-[#0C4160] font-semibold rounded-full hover:scale-105 transition-transform duration-300">
                        Apply Now
                    </button>
                </div>
            </section>
        </main>
    );
}