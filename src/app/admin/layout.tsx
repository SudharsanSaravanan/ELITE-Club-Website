import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect('/');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'lead')) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 glass border-r border-card-border p-6 flex flex-col shadow-lg">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-primary font-clash">ELITE Admin</h2>
                    <p className="text-sm text-muted">Club Management</p>
                </div>

                <nav className="flex-grow space-y-2">
                    <ul>
                        <li>
                            <Link href="/admin/events" className="block py-3 px-4 hover:bg-card rounded-xl transition-colors text-foreground hover:text-primary font-medium">
                                Manage Events
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/events/create" className="block py-3 px-4 hover:bg-card rounded-xl transition-colors text-foreground hover:text-primary font-medium">
                                Create Event
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className="block py-3 px-4 hover:bg-card rounded-xl transition-colors text-foreground hover:text-primary font-medium">
                                Manage Users
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="mt-auto pt-6 border-t border-card-border">
                    <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                        ← Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
