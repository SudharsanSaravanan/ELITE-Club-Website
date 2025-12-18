'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const code = searchParams.get('error_code');
    const desc = searchParams.get('error_description');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <div className="max-w-md w-full glass rounded-2xl p-8 text-center shadow-lg">
                <h1 className="text-3xl font-bold text-red-500 mb-4 font-clash">Authentication Error</h1>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm font-mono text-red-500 mb-2">
                        Code: <span className="text-red-400">{code || error || 'Unknown'}</span>
                    </p>
                    <p className="text-base text-foreground">{desc || 'An unexpected error occurred during sign in.'}</p>
                </div>

                <p className="text-sm text-muted mb-8">
                    This usually happens due to a configuration issue with the Microsoft provider or restricted access scopes.
                </p>

                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform shadow-md"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>}>
            <ErrorContent />
        </Suspense>
    );
}
