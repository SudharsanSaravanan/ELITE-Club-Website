'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors disabled:opacity-50 whitespace-nowrap"
        >
            <span className="hidden sm:inline">{loading ? 'Signing out...' : 'Sign Out'}</span>
            <span className="sm:hidden">{loading ? '...' : 'Out'}</span>
        </button>
    );
}
