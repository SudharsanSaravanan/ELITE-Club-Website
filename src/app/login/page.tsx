'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FloatingDock } from "@/components/ui/FloatingDock";
import LoginButton from "@/components/LoginButton";
import UserNav from "@/components/UserNav";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

function LoginContent() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    return (
        <div className="glass border border-card-border rounded-2xl p-8 sm:p-12 max-w-md w-full text-center shadow-2xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary font-clash mb-2">ELITE</h1>
                <p className="text-muted text-sm">Sign in to access your account</p>
            </div>

            {redirect && (
                <div className="mb-6 p-3 bg-primary/10 border border-primary/30 rounded-xl text-primary text-sm">
                    Please sign in to continue
                </div>
            )}

            <div className="space-y-6">
                <LoginButton redirectTo={redirect || undefined} />

                <p className="text-xs text-muted mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-card-border">
                <p className="text-xs text-muted">
                    Exclusive access for University students and faculty
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <FloatingDock items={navItems} action={<UserNav />} />
            <Suspense fallback={
                <div className="glass border border-card-border rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                    <div className="animate-pulse">Loading...</div>
                </div>
            }>
                <LoginContent />
            </Suspense>
        </main>
    );
}
