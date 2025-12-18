
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import ApplicationsTable from '@/components/admin/ApplicationsTable';

export default async function AdminEventsPage({ searchParams }: { searchParams: Promise<{ event_id?: string }> }) {
    const supabase = await createClient();
    const { event_id } = await searchParams;
    const selectedEventId = event_id;

    const { data: events } = await supabase
        .from('events')
        .select('id, title, status, start_date')
        .order('start_date', { ascending: false });

    let applications: any[] = [];
    if (selectedEventId) {
        const { data: apps } = await supabase
            .from('event_registrations')
            .select(`
        *,
        profiles:user_id (full_name, roll_number, email)
      `)
            .eq('event_id', selectedEventId)
            .order('registered_at', { ascending: false });

        applications = apps || [];
    }

    async function updateStatus(regId: string, status: string) {
        'use server';
        const supabase = await createClient();
        await supabase
            .from('event_registrations')
            .update({ status })
            .eq('id', regId);

        revalidatePath('/admin/events');
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-foreground mb-8 font-clash">Manage Events</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Event List */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Select Event</h3>
                    {events?.map(event => (
                        <a
                            key={event.id}
                            href={`/admin/events?event_id=${event.id}`}
                            className={`block p-4 rounded-xl border transition-all shadow-sm ${selectedEventId === event.id
                                ? 'bg-primary text-foreground border-primary font-bold'
                                : 'glass border-card-border text-foreground hover:border-primary/50'
                                }`}
                        >
                            <div className="text-sm font-medium">{event.title}</div>
                            <div className="text-xs opacity-70 mt-1 uppercase">{event.status}</div>
                        </a>
                    ))}
                </div>

                {/* Application List */}
                <div className="lg:col-span-3">
                    {selectedEventId ? (
                        <>
                            <h2 className="text-xl font-bold text-foreground mb-4">
                                Applications ({applications.length})
                            </h2>
                            <ApplicationsTable
                                applications={applications}
                                updateStatusAction={updateStatus}
                            />
                        </>
                    ) : (
                        <div className="h-64 flex items-center justify-center border border-dashed border-muted/30 rounded-xl text-muted glass">
                            Select an event to view applications
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
