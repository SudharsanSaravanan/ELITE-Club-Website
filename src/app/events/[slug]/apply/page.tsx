
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DynamicForm from '@/components/events/DynamicForm';
import { submitApplication } from './actions';
import { FloatingDock } from "@/components/ui/FloatingDock";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
    const supabase = await createClient();
    const { slug } = await params;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect('/');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (!profile) {
        return (
            <div className="min-h-screen bg-background pt-32 px-4 flex flex-col items-center justify-center text-center">
                <FloatingDock items={navItems} />
                <div className="glass border border-card-border rounded-2xl p-8 shadow-lg max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-primary mb-4 font-clash">Profile Missing</h1>
                    <p className="text-muted mb-8">
                        We couldn&apos;t find your profile information. This might happen if your account setup wasn&apos;t completed properly.
                    </p>
                    <p className="text-sm text-muted mb-6">
                        <strong>Tip:</strong> An administrator may need to run the profile backfill script.
                    </p>
                    <a href="/" className="px-6 py-3 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform shadow-md inline-block">
                        Return Home
                    </a>
                </div>
            </div>
        );
    }

    const { data: event } = await supabase
        .from('events')
        .select('id, title, status')
        .eq('slug', slug)
        .single();

    if (!event || event.status !== 'published') {
        redirect('/events');
    }

    const { data: fields } = await supabase
        .from('event_form_fields')
        .select('*')
        .eq('event_id', event.id)
        .order('display_order', { ascending: true });

    const submitAction = submitApplication.bind(null, event.id);

    return (
        <main className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8 pb-32">
            <FloatingDock items={navItems} />
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-clash">
                    Apply for {event.title}
                </h1>
                <p className="text-muted mb-8">
                    Please review your details and answer the following questions.
                </p>

                <DynamicForm
                    eventId={event.id}
                    eventName={event.title}
                    fields={fields || []}
                    userProfile={profile}
                    submitAction={submitAction}
                />
            </div>
        </main>
    );
}
