import { createClient } from '@/lib/supabase/server';
import EventCard from '@/components/events/EventCard';
import { FloatingDock } from "@/components/ui/FloatingDock";
import UserNav from "@/components/UserNav";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Legacy", href: "/legacy" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
];

export default async function EventsPage() {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    let userRole: 'student' | 'member' | 'lead' | 'admin' | null = null;
    const registrationMap = new Map<string, string>();

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        userRole = profile?.role || null;

        const { data: registrations } = await supabase
            .from('event_registrations')
            .select('event_id, status')
            .eq('user_id', user.id);

        if (registrations) {
            registrations.forEach(reg => {
                registrationMap.set(reg.event_id, reg.status);
            });
        }
    }

    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('start_date', { ascending: true });

    if (error) {
        console.error('Error fetching events:', error);
    }

    return (
        <main className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8 pb-32">
            <FloatingDock items={navItems} action={<UserNav />} />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 font-clash">
                    Upcoming Events
                </h1>
                <p className="text-muted max-w-2xl mb-12 text-lg">
                    Discover workshops, hackathons, and seminars designed to forge the next generation of leaders.
                </p>

                {!events || events.length === 0 ? (
                    <div className="text-center py-20 border border-card-border rounded-2xl glass shadow-lg">
                        <p className="text-muted text-xl">No upcoming events at the moment.</p>
                        {userRole === 'admin' && (
                            <p className="mt-2 text-primary text-sm font-medium">Admins can create events in the dashboard.</p>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {events.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                userRole={userRole}
                                registrationStatus={registrationMap.get(event.id) as any || null}
                                isLoggedIn={!!user}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
