'use client';

import { useState } from 'react';
import { promoteUserAction } from './actions';

export default function ManageUsersPage() {
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            const result = await promoteUserAction(formData);
            if (result.error) {
                setMessage({ type: 'error', text: result.error });
            } else {
                setMessage({ type: 'success', text: 'User promoted successfully! They are now an Admin.' });
            }
        } catch (e) {
            setMessage({ type: 'error', text: 'Unexpected error.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8 font-clash">Manage Admins</h1>

            <div className="glass border border-card-border p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">Add New Admin</h3>
                <p className="text-sm text-muted mb-6">
                    Enter the email of an existing user to promote them to the Admin role.
                </p>

                {message && (
                    <div className={`p-4 rounded-xl text-sm mb-4 ${message.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                        {message.text}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-primary font-bold mb-2">User Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="user@example.com"
                            required
                            className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-foreground font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-md">
                        {loading ? 'Promoting...' : 'Promote to Admin'}
                    </button>
                </form>
            </div>
        </div>
    );
}
