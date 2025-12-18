'use client';

import { useState } from 'react';
import EventFormBuilder, { FormFieldConfig } from '@/components/admin/EventFormBuilder';
import { createEventAction } from './actions';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formFields, setFormFields] = useState<FormFieldConfig[]>([]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        try {
            const result = await createEventAction(formData, formFields);
            if (result.success) {
                router.push('/admin/events');
            } else {
                setError(result.error || 'Failed to create event');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8">
            {/* Basic Details */}
            <div className="glass border border-card-border p-6 rounded-2xl space-y-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground font-clash">Event Details</h3>

                {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Event Title</label>
                        <input name="title" required type="text" className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Short Description</label>
                        <input name="short_description" required type="text" className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Full Description</label>
                        <textarea name="description" required rows={4} className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Event Type</label>
                        <select name="event_type" className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors">
                            <option value="other">Other</option>
                            <option value="workshop">Workshop</option>
                            <option value="hackathon">Hackathon</option>
                            <option value="seminar">Seminar</option>
                            <option value="competition">Competition</option>
                            <option value="meetup">Meetup</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                        <select name="status" className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors">
                            <option value="draft">Draft (Hidden)</option>
                            <option value="published">Published (Visible)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                        <input name="start_date" required type="datetime-local" className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                        <input name="end_date" required type="datetime-local" className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-2">Banner URL</label>
                        <input name="banner_url" type="url" placeholder="https://..." className="w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors" />
                    </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input name="is_registration_open" type="checkbox" defaultChecked className="rounded border-card-border bg-white/50 text-primary focus:ring-primary" />
                        <span className="text-sm text-foreground">Registration Open</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input name="is_online" type="checkbox" className="rounded border-card-border bg-white/50 text-primary focus:ring-primary" />
                        <span className="text-sm text-foreground">Online Event</span>
                    </label>
                </div>
            </div>

            {/* Custom Form Builder */}
            <EventFormBuilder fields={formFields} onChange={setFormFields} />

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-primary text-foreground font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 shadow-lg"
                >
                    {loading ? 'Creating Event...' : 'Create Event'}
                </button>
            </div>
        </form>
    );
}
