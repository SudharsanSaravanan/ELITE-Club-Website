'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'azure',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
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
            {error && <p className="text-red-500 text-xs whitespace-nowrap">{error}</p>}
            <button
                onClick={handleLogin}
                disabled={loading}
                className="px-6 py-2 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50 whitespace-nowrap shadow-md"
            >
                {loading ? 'Redirecting...' : 'Continue with Microsoft'}
            </button>
        </div>
    );
}
