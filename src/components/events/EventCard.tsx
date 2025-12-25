'use client';

import Link from 'next/link';

type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
type UserRole = 'student' | 'member' | 'lead' | 'admin' | null;
type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted' | 'cancelled' | 'attended' | null;

interface EventCardProps {
    event: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        start_date: string;
        end_date: string | null;
        banner_url: string | null;
        status: EventStatus;
        application_type?: 'form' | 'external';
        application_link?: string | null;
    };
    userRole: UserRole;
    registrationStatus: RegistrationStatus;
    isLoggedIn: boolean;
}

export default function EventCard({ event, userRole, registrationStatus, isLoggedIn }: EventCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getButton = () => {
        if (userRole === 'admin') {
            return (
                <Link
                    href="/admin/events"
                    className="inline-block px-4 py-2 bg-foreground text-background font-semibold rounded-full text-sm hover:scale-105 transition-transform shadow-md"
                >
                    Manage Event
                </Link>
            );
        }

        if (event.application_type === 'external' && event.application_link) {
            return (
                <a
                    href={event.application_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform text-sm shadow-md flex items-center gap-2"
                >
                    Apply Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            );
        }

        if (!isLoggedIn) {
            return (
                <span className="text-muted text-sm">Login to Apply</span>
            );
        }

        if (registrationStatus) {
            const statusColors = {
                pending: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50',
                approved: 'bg-green-500/20 text-green-600 border-green-500/50',
                rejected: 'bg-red-500/20 text-red-600 border-red-500/50',
                waitlisted: 'bg-orange-500/20 text-orange-600 border-orange-500/50',
                cancelled: 'bg-gray-500/20 text-gray-600 border-gray-500/50',
                attended: 'bg-blue-500/20 text-blue-600 border-blue-500/50',
            };

            const style = statusColors[registrationStatus] || 'bg-muted/20 text-muted';

            return (
                <span className={`px-3 py-1 rounded-full text-xs border ${style} uppercase tracking-wider font-bold`}>
                    {registrationStatus}
                </span>
            );
        }

        return (
            <Link
                href={`/events/${event.slug}/apply`}
                className="px-6 py-2 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform text-sm shadow-md"
            >
                Apply Now
            </Link>
        );
    };

    return (
        <div className="group relative glass border border-card-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col h-full shadow-lg hover-lift">
            <div className="aspect-video w-full bg-muted/10 relative overflow-hidden">
                {event.banner_url ? (
                    <img
                        src={event.banner_url}
                        alt={event.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted/30">
                        <span className="text-xl font-bold">ELITE</span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <span className="text-primary text-xs tracking-wider uppercase font-bold">
                        {formatDate(event.start_date)}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1 font-clash group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>
                </div>

                <p className="text-muted text-sm line-clamp-3 mb-6 flex-grow">
                    {event.description || 'No description available.'}
                </p>

                <div className="flex items-center justify-center sm:justify-end">
                    {getButton()}
                </div>
            </div>
        </div>
    );
}
