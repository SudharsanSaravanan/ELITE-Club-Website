'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormField = {
    id: string;
    field_name: string;
    field_label: string;
    field_type: string;
    placeholder?: string;
    is_required: boolean;
    options?: string[];
    auto_fill_from?: string;
    is_editable: boolean;
};

type Profile = Record<string, any>;

interface DynamicFormProps {
    eventId: string;
    fields: FormField[];
    userProfile: Profile;
    eventName: string;
    submitAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export default function DynamicForm({ eventId, fields, userProfile, eventName, submitAction }: DynamicFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        const result = await submitAction(formData);

        if (result.success) {
            router.push('/events?success=true');
        } else {
            setError(result.error || 'Failed to submit application.');
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="glass border border-card-border rounded-2xl p-6 sm:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6 font-clash">Application Details</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    {fields.map((field) => {
                        const defaultValue = field.auto_fill_from ? userProfile?.[field.auto_fill_from] : '';
                        const isDisabled = !!(field.auto_fill_from && !field.is_editable);

                        return (
                            <div key={field.id} className="flex flex-col gap-2">
                                <label htmlFor={field.id} className="text-sm font-medium text-foreground">
                                    {field.field_label} {field.is_required && <span className="text-primary">*</span>}
                                </label>

                                {renderInput(field, defaultValue, isDisabled)}

                                {isDisabled && <input type="hidden" name={field.id} value={defaultValue || ''} />}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 pt-6 border-t border-card-border flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-primary text-foreground font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </div>
        </form>
    );
}

function renderInput(field: FormField, defaultValue: any, isDisabled: boolean) {
    const commonProps = {
        id: field.id,
        name: field.id,
        defaultValue: defaultValue || '',
        placeholder: field.placeholder || '',
        required: field.is_required,
        disabled: isDisabled,
        className: "w-full px-4 py-3 bg-white/50 border border-card-border rounded-xl text-foreground focus:border-primary outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    };

    switch (field.field_type) {
        case 'textarea':
            return <textarea {...commonProps} rows={4} />;
        case 'select':
            return (
                <div className="relative">
                    <select {...commonProps} className={`${commonProps.className} appearance-none`}>
                        <option value="">Select an option</option>
                        {field.options?.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                        ▼
                    </div>
                </div>
            );
        default:
            return <input type="text" {...commonProps} />;
    }
}
