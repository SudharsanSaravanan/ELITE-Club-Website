'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface LoginButtonProps {
    redirectTo?: string;
}

export default function LoginButton({ redirectTo, className }: LoginButtonProps & { className?: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            // Build redirect URL with optional next path
            const callbackUrl = new URL('/auth/callback', window.location.origin);
            if (redirectTo) {
                callbackUrl.searchParams.set('next', redirectTo);
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'azure',
                options: {
                    redirectTo: callbackUrl.toString(),
                    scopes: 'openid profile email',
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            }
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            {error && <p className="text-red-500 text-xs whitespace-nowrap max-w-[200px] truncate">{error}</p>}
            <button
                onClick={handleLogin}
                disabled={loading}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50 whitespace-nowrap shadow-md flex items-center gap-2 text-xs sm:text-sm ${className}`}
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 21 21" fill="currentColor">
                    <rect x="1" y="1" width="9" height="9" />
                    <rect x="11" y="1" width="9" height="9" />
                    <rect x="1" y="11" width="9" height="9" />
                    <rect x="11" y="11" width="9" height="9" />
                </svg>
                <span className={`${className?.includes('p-') ? 'hidden' : ''}`}>
                    {loading ? 'Redirecting...' : 'Login'}
                </span>
            </button>
        </div>
    );
}
