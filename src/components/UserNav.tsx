'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { User } from '@supabase/supabase-js';

export default function UserNav() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', user.id)
                    .single();
                setProfile(data);
            }
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (!session?.user) {
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    if (loading) {
        return <div className="w-8 h-8 rounded-full bg-muted/20 animate-pulse" />;
    }

    if (!user) {
        // We want the generic button style but triggering the login
        // LoginButton has its own styling, let's see if we can use it or wrap it
        // The user wants it "exactly beside the team section"
        // LoginButton renders a big "Continue with Microsoft" button. 
        // We might want a smaller version for the dock if space is tight, 
        // but for now let's use LoginButton and see. 
        // Actually, LoginButton renders a big button. For the dock, we might want a simpler icon or text.
        // However, the request asked for "Continue with Microsoft button". 
        // Let's use LoginButton but maybe we need to adjust styling if it's too big.
        // LoginButton has `className="px-6 py-3..."` which is quite large.
        // I will use LoginButton but maybe I should modify LoginButton to accept className prop?
        // Let's check LoginButton again.
        return <LoginButton />;
    }

    return (
        <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
            {(profile?.role === 'admin' || profile?.role === 'lead') && (
                <Link
                    href="/admin/events"
                    className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-foreground text-background font-semibold rounded-full hover:scale-105 transition-transform whitespace-nowrap"
                >
                    Admin
                </Link>
            )}
            <div className="text-xs sm:text-sm hidden sm:block">
                <span className="text-muted">Hi, </span>
                <span className="text-foreground font-medium">
                    {profile?.full_name?.split(' ')[0] || 'User'}
                </span>
            </div>
            <LogoutButton />
        </div>
    );
}
