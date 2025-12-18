'use client';

import { useState } from 'react';

interface Application {
    id: string;
    user_id: string;
    status: string;
    registered_at: string;
    profiles: {
        full_name: string;
        roll_number: string;
        email: string;
    };
    registration_responses: {
        question: string;
        answer: string;
    }[];
}

interface ApplicationsTableProps {
    applications: Application[];
    updateStatusAction: (regId: string, status: string) => Promise<void>;
}

export default function ApplicationsTable({ applications, updateStatusAction }: ApplicationsTableProps) {
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    return (
        <div className="glass border border-card-border rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-left text-sm text-foreground">
                <thead className="bg-white/40 text-primary uppercase tracking-wider font-semibold">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Roll No</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-card-border">
                    {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-foreground">{app.profiles?.full_name || 'N/A'}</td>
                            <td className="px-6 py-4 font-mono text-muted">{app.profiles?.roll_number || 'N/A'}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs uppercase font-bold
                  ${app.status === 'approved' ? 'bg-green-500/20 text-green-600' :
                                        app.status === 'rejected' ? 'bg-red-500/20 text-red-600' :
                                            'bg-yellow-500/20 text-yellow-600'}`}>
                                    {app.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-muted">
                                {new Date(app.registered_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button
                                    onClick={() => updateStatusAction(app.id, 'approved')}
                                    className="text-green-600 hover:text-green-500 font-bold text-xs uppercase"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => updateStatusAction(app.id, 'rejected')}
                                    className="text-red-600 hover:text-red-500 font-bold text-xs uppercase"
                                >
                                    Reject
                                </button>
                                <button onClick={() => setSelectedApp(app)} className="text-primary hover:text-muted text-xs underline ml-2">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedApp(null)}>
                    <div className="glass border border-card-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-primary mb-4 font-clash">Application Details</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <span className="text-xs text-muted uppercase">Name</span>
                                <p className="text-foreground font-medium">{selectedApp.profiles?.full_name}</p>
                            </div>
                            <div>
                                <span className="text-xs text-muted uppercase">Roll No</span>
                                <p className="text-foreground font-medium">{selectedApp.profiles?.roll_number}</p>
                            </div>
                            <div>
                                <span className="text-xs text-muted uppercase">Email</span>
                                <p className="text-foreground font-medium">{selectedApp.profiles?.email}</p>
                            </div>
                        </div>

                        <h4 className="font-bold text-foreground mb-2 border-b border-card-border pb-2">Responses</h4>
                        <div className="space-y-4">
                            <p className="text-muted italic">Response details would appear here.</p>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-white/50 hover:bg-white/70 rounded-xl text-sm font-medium transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
